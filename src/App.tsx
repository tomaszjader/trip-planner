import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ChatPlanner } from './components/ChatPlanner';
import { FormWizard } from './components/FormWizard';
import { TripView } from './components/TripView';
import { SavedTripsModal } from './components/SavedTripsModal';
import { SettingsModal } from './components/SettingsModal';
import { TripPlan, TravelPreferences } from './types/travel';
import { generateTripWithAI } from './services/geminiService';
import { 
  getSavedTrips, saveTrip, deleteSavedTrip, 
  getActiveTrip, setActiveTrip, getAppSettings, saveAppSettings 
} from './services/storageService';

export const App: React.FC = () => {
  const [inputMode, setInputMode] = useState<'chat' | 'form'>('chat');
  const [activeTrip, setActiveTripState] = useState<TripPlan | null>(null);
  const [savedTrips, setSavedTrips] = useState<TripPlan[]>([]);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = getSavedTrips();
    setSavedTrips(saved);

    const storedActive = getActiveTrip();
    if (storedActive) {
      setActiveTripState(storedActive);
    }

    const settings = getAppSettings();
    setCurrentTheme(settings.theme || 'dark');
    document.documentElement.setAttribute('data-theme', settings.theme || 'dark');
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    saveAppSettings({ theme: nextTheme });
  };

  const handleGeneratePlan = async (preferences: TravelPreferences) => {
    setIsGeneratingPlan(true);
    try {
      const plan = await generateTripWithAI(preferences);
      setActiveTripState(plan);
      setActiveTrip(plan);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to generate trip plan:', err);
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
        {activeTrip ? (
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

      <style>{`
        .app-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
        }

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
