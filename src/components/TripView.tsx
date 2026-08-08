import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calendar, MapPin, Compass, Users, Printer, Bookmark, 
  Share2, ArrowLeft, Utensils, Map as MapIcon, CheckSquare, 
  Check
} from 'lucide-react';
import { TripPlan } from '../types/travel';
import { DayTimeline } from './DayTimeline';
import { InteractiveMap } from './InteractiveMap';
import { CulinaryGuide } from './CulinaryGuide';
import { TravelEssentials } from './TravelEssentials';

interface TripViewProps {
  trip: TripPlan;
  onBackToPlanner: () => void;
  onSaveTrip: (trip: TripPlan) => void;
  onUpdateTrip: (updatedTrip: TripPlan) => void;
  isTripSaved: boolean;
}

type TabKey = 'timeline' | 'map' | 'culinary' | 'essentials';

export const TripView: React.FC<TripViewProps> = ({
  trip,
  onBackToPlanner,
  onSaveTrip,
  onUpdateTrip,
  isTripSaved
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('timeline');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleTriggerSave = () => {
    onSaveTrip(trip);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleShare = () => {
    const summaryText = `✈️ Plan podróży: ${trip.title}\n📍 Cel: ${trip.destination} (${trip.days.length} dni)\n🌟 Wygenerowano przez VoyageAI!`;
    navigator.clipboard.writeText(summaryText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="trip-view-container">
      <div className="trip-action-bar no-print">
        <button className="btn btn-secondary btn-back" onClick={onBackToPlanner}>
          <ArrowLeft size={16} />
          <span>Powrót do konfiguratora</span>
        </button>

        <div className="action-buttons-group">
          <button
            className={`btn ${isTripSaved ? 'btn-secondary is-saved' : 'btn-primary'}`}
            onClick={handleTriggerSave}
          >
            <Bookmark size={16} />
            <span>{isTripSaved ? 'Zapisano w Ulubionych' : 'Zapisz Plan Podróży'}</span>
          </button>

          <button className="btn btn-secondary" onClick={handleShare}>
            {copiedLink ? <Check size={16} className="text-emerald" /> : <Share2 size={16} />}
            <span>{copiedLink ? 'Skopiowano!' : 'Udostępnij'}</span>
          </button>

          <button className="btn btn-secondary" onClick={handlePrint}>
            <Printer size={16} />
            <span>Eksportuj do PDF / Drukuj</span>
          </button>
        </div>
      </div>

      <div className="trip-hero-banner glass-panel">
        <div className="hero-banner-image-box">
          <img src={trip.heroImage} alt={trip.destination} className="hero-banner-img" />
          <div className="hero-banner-gradient-overlay" />
        </div>

        <div className="hero-banner-content">
          <div className="hero-pills-row">
            <span className="badge badge-cyan">
              <MapPin size={13} /> {trip.destination}, {trip.country}
            </span>
            <span className="badge badge-emerald">
              <Calendar size={13} /> {trip.days.length} {trip.days.length === 1 ? 'Dzień' : 'Dni'}
            </span>
            <span className="badge badge-amber">
              <Compass size={13} /> Tempo: {trip.preferences.pace === 'intense' ? 'Intensywne' : trip.preferences.pace === 'relaxed' ? 'Relaks' : 'Zbalansowane'}
            </span>
            <span className="badge badge-purple">
              <Users size={13} /> {trip.preferences.group === 'couple' ? 'We dwoje' : trip.preferences.group === 'solo' ? 'Solo' : trip.preferences.group === 'family' ? 'Rodzina' : 'Grupa'}
            </span>
          </div>

          <h1 className="trip-hero-title">{trip.title}</h1>
          <p className="trip-hero-tagline">{trip.tagline}</p>
          <p className="trip-hero-summary">{trip.summary}</p>
        </div>
      </div>

      <div className="trip-tabs-container glass-panel no-print">
        {[
          { key: 'timeline', label: 'Harmonogram Dzień po Dniu', icon: Calendar, count: `${trip.days.length} dni` },
          { key: 'map', label: 'Interaktywna Mapa i Trasy', icon: MapIcon },
          { key: 'culinary', label: 'Przewodnik Kulinarny & Restauracje', icon: Utensils, count: `${trip.culinaryGuide?.dishes?.length || 0} smaków` },
          { key: 'essentials', label: 'Lista do Spakowania & Kosztorys', icon: CheckSquare }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              className={`trip-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key as TabKey)}
            >
              <Icon size={18} />
              <span className="tab-label-text">{tab.label}</span>
              {tab.count && <span className="tab-pill-count">{tab.count}</span>}
            </button>
          );
        })}
      </div>

      <div className="trip-tab-content animate-fade-in">
        {activeTab === 'timeline' && (
          <DayTimeline trip={trip} onUpdateTrip={onUpdateTrip} />
        )}
        {activeTab === 'map' && (
          <InteractiveMap trip={trip} />
        )}
        {activeTab === 'culinary' && (
          <CulinaryGuide trip={trip} />
        )}
        {activeTab === 'essentials' && (
          <TravelEssentials trip={trip} onUpdateTrip={onUpdateTrip} />
        )}
      </div>

      <style>{`
        .trip-view-container {
          max-width: 1200px;
          margin: 0 auto 80px auto;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .trip-action-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .action-buttons-group {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .is-saved {
          color: var(--accent-cyan);
          border-color: rgba(56, 189, 248, 0.4);
        }

        /* Hero Banner */
        .trip-hero-banner {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          padding: 48px;
          min-height: 360px;
          display: flex;
          align-items: flex-end;
        }

        .hero-banner-image-box {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.65);
        }

        .hero-banner-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10, 15, 29, 0.2) 0%, rgba(10, 15, 29, 0.95) 100%);
        }

        .hero-banner-content {
          position: relative;
          z-index: 1;
          max-width: 860px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .hero-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 4px;
        }

        .trip-hero-title {
          font-size: 2.6rem;
          color: #ffffff;
          line-height: 1.15;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .trip-hero-tagline {
          font-size: 1.15rem;
          color: var(--accent-cyan);
          font-weight: 500;
        }

        .trip-hero-summary {
          font-size: 1rem;
          color: #cbd5e1;
          line-height: 1.6;
        }

        /* Tabs Navigation */
        .trip-tabs-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          padding: 8px;
        }

        .trip-tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 16px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.92rem;
          transition: all 0.2s ease;
        }

        .trip-tab-btn:hover {
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-primary);
        }

        .trip-tab-btn.active {
          background: var(--gradient-brand);
          color: #ffffff;
          box-shadow: 0 4px 18px rgba(56, 189, 248, 0.35);
        }

        .tab-pill-count {
          font-size: 0.72rem;
          background: rgba(255, 255, 255, 0.15);
          padding: 2px 8px;
          border-radius: var(--radius-full);
        }

        @media (max-width: 900px) {
          .trip-tabs-container {
            grid-template-columns: 1fr 1fr;
          }
          .trip-hero-banner {
            padding: 24px;
          }
          .trip-hero-title {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 600px) {
          .trip-tabs-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
