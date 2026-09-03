import React, { lazy, Suspense, useState, useEffect } from 'react';
import { AlertTriangle, Info, RefreshCw, X } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ChatPlanner } from './components/ChatPlanner';
import { FormWizard } from './components/FormWizard';
import { TripPlan, TravelPreferences } from './types/travel';
import { generateTripWithAI } from './services/geminiService';
import { 
  getSavedTrips, saveTrip, deleteSavedTrip, 
  getActiveTrip, setActiveTrip, getAppSettings, saveAppSettings, clearLegacyApiKeys
} from './services/storageService';

// Cięższe widoki (szczególnie TripView z Leaflet) nie są potrzebne na ekranie startowym.
// Ładujemy je dopiero po wygenerowaniu planu lub otwarciu modala.
const TripView = lazy(() => import('./components/TripView').then(module => ({ default: module.TripView })));
const SavedTripsModal = lazy(() => import('./components/SavedTripsModal').then(module => ({ default: module.SavedTripsModal })));
const SettingsModal = lazy(() => import('./components/SettingsModal').then(module => ({ default: module.SettingsModal })));

export const App: React.FC = () => {
  const [inputMode, setInputMode] = useState<'chat' | 'form'>('chat');
  const [activeTrip, setActiveTripState] = useState<TripPlan | null>(null);
  const [savedTrips, setSavedTrips] = useState<TripPlan[]>([]);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');
  const [generationMessage, setGenerationMessage] = useState<{ type: 'warning' | 'error'; text: string } | null>(null);
  const [lastPreferences, setLastPreferences] = useState<TravelPreferences | null>(null);

  useEffect(() => {
    clearLegacyApiKeys();
    const saved = getSavedTrips();
    setSavedTrips(saved);

    const storedActive = getActiveTrip();
    if (storedActive) {
      setActiveTripState(storedActive);
    }

    const settings = getAppSettings();
    setCurrentTheme(settings.theme || 'dark');
    document.documentElement.setAttribute('data-theme', settings.theme || 'dark');
    document.documentElement.lang = settings.language || 'pl';
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    saveAppSettings({ theme: nextTheme });
  };

  const handleGeneratePlan = async (preferences: TravelPreferences) => {
    setLastPreferences(preferences);
    setGenerationMessage(null);
    setIsGeneratingPlan(true);
    try {
      const result = await generateTripWithAI(preferences);
      setActiveTripState(result.plan);
      setActiveTrip(result.plan);
      if (result.source === 'offline') {
        setGenerationMessage({
          type: 'warning',
          text: result.notice || 'Plan utworzono w trybie offline.'
        });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to generate trip plan:', err);
      setGenerationMessage({
        type: 'error',
        text: 'Nie udało się utworzyć planu. Sprawdź połączenie i spróbuj ponownie.'
      });
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleSelectPresetTrip = (trip: TripPlan) => {
    setActiveTripState(trip);
    setActiveTrip(trip);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveTrip = (trip: TripPlan) => {
    saveTrip(trip);
    setSavedTrips(getSavedTrips());
  };

  const handleDeleteSavedTrip = (id: string) => {
    deleteSavedTrip(id);
    setSavedTrips(getSavedTrips());
  };

  const handleUpdateTrip = (updatedTrip: TripPlan) => {
    setActiveTripState(updatedTrip);
    setActiveTrip(updatedTrip);
    const isSaved = savedTrips.some(t => t.id === updatedTrip.id);
    if (isSaved) {
      saveTrip(updatedTrip);
      setSavedTrips(getSavedTrips());
    }
  };

  const isCurrentTripSaved = activeTrip
    ? savedTrips.some(t => t.id === activeTrip.id)
    : false;

  return (
    <div className="app-layout">
      <Navbar
        activeTrip={activeTrip}
        savedTripsCount={savedTrips.length}
        onNewTripClick={() => {
          setActiveTripState(null);
          setActiveTrip(null);
        }}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        currentTheme={currentTheme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="main-content">
        {generationMessage && (
          <div className={`generation-alert ${generationMessage.type}`} role="alert" aria-live="polite">
            {generationMessage.type === 'error' ? <AlertTriangle size={20} /> : <Info size={20} />}
            <span>{generationMessage.text}</span>
            {lastPreferences && (
              <button
                type="button"
                className="alert-retry"
                onClick={() => handleGeneratePlan(lastPreferences)}
                disabled={isGeneratingPlan}
              >
                <RefreshCw size={15} className={isGeneratingPlan ? 'spinner' : ''} />
                {isGeneratingPlan ? 'Ponawiam…' : 'Spróbuj AI ponownie'}
              </button>
            )}
            <button type="button" className="alert-dismiss" onClick={() => setGenerationMessage(null)} aria-label="Zamknij komunikat">
              <X size={17} />
            </button>
          </div>
        )}
        {activeTrip ? (
          <Suspense fallback={<div className="route-loading" role="status">Ładowanie planu…</div>}>
            <TripView
            trip={activeTrip}
            onBackToPlanner={() => {
              setActiveTripState(null);
              setActiveTrip(null);
            }}
            onSaveTrip={handleSaveTrip}
            onUpdateTrip={handleUpdateTrip}
            isTripSaved={isCurrentTripSaved}
            />
          </Suspense>
        ) : (
          <>
            <HeroSection
              inputMode={inputMode}
              onSelectMode={setInputMode}
              onSelectPresetTrip={handleSelectPresetTrip}
            />

            {inputMode === 'chat' ? (
              <ChatPlanner
                onGeneratePlan={handleGeneratePlan}
                isGeneratingPlan={isGeneratingPlan}
              />
            ) : (
              <FormWizard
                onGeneratePlan={handleGeneratePlan}
                isGeneratingPlan={isGeneratingPlan}
              />
            )}
          </>
        )}
      </main>

      <footer className="app-footer no-print">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} VoyageAI • Twój inteligentny asystent i generator podróży</p>
          <span className="footer-tagline">Zaplanuj niezapomniane chwile w dowolnym zakątku świata 🌍</span>
        </div>
      </footer>

      <Suspense fallback={null}>
        <SavedTripsModal
          isOpen={isSavedModalOpen}
          onClose={() => setIsSavedModalOpen(false)}
          savedTrips={savedTrips}
          onSelectTrip={(trip) => {
            setActiveTripState(trip);
            setActiveTrip(trip);
          }}
          onDeleteTrip={handleDeleteSavedTrip}
        />

        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
        />
      </Suspense>

      <style>{`
        .app-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
        }

        .route-loading {
          min-height: 50vh;
          display: grid;
          place-items: center;
          color: var(--text-secondary);
        }

        .generation-alert {
          width: min(920px, calc(100% - 40px));
          margin: 18px auto 0;
          padding: 13px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(245, 158, 11, 0.4);
          border-radius: var(--radius-md);
          background: rgba(245, 158, 11, 0.12);
          color: var(--text-primary);
          font-size: 0.88rem;
        }

        .generation-alert.error {
          border-color: rgba(244, 63, 94, 0.45);
          background: rgba(244, 63, 94, 0.12);
        }

        .generation-alert > span { flex: 1; }
        .alert-retry, .alert-dismiss {
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
        }
        .alert-retry { display: inline-flex; align-items: center; gap: 6px; font-weight: 700; }
        .alert-dismiss { display: inline-flex; padding: 4px; }

        .app-footer {
          background: var(--bg-glass);
          border-top: 1px solid var(--border-color);
          padding: 24px 20px;
          text-align: center;
          margin-top: auto;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.84rem;
          color: var(--text-muted);
        }

        .footer-tagline {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};
