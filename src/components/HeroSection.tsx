import React from 'react';
import { MessageSquareText, SlidersHorizontal, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { PRESET_TRIPS } from '../services/presetTrips';
import { TripPlan } from '../types/travel';

interface HeroSectionProps {
  inputMode: 'chat' | 'form';
  onSelectMode: (mode: 'chat' | 'form') => void;
  onSelectPresetTrip: (trip: TripPlan) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  inputMode,
  onSelectMode,
  onSelectPresetTrip
}) => {
  const quickDestinations = [
    { key: 'rzym', name: 'Rzym', duration: '3 dni', tag: 'Kulinaria & Antyk', icon: '🏛️' },
    { key: 'barcelona', name: 'Barcelona', duration: '4 dni', tag: 'Gaudí & Tapas', icon: '🌊' },
    { key: 'tokio', name: 'Tokio', duration: '5 dni', tag: 'Cyberpunk & Tradycja', icon: '⛩️' }
  ];

  return (
    <section className="hero-section">
      <div className="hero-badge-wrapper">
        <span className="badge badge-cyan">
          <Sparkles size={13} />
          Generator Podróży Nowej Generacji
        </span>
      </div>

      <h1 className="hero-title">
        Dokąd wyruszasz? <br />
        <span className="hero-title-highlight">AI ułoży Twój idealny plan</span>
      </h1>

      <p className="hero-description">
        Wybierz wygodny sposób planowania: opowiedz asystentowi o swoich marzeniach w swobodnej rozmowie lub skorzystaj z precyzyjnego kreatora parametrów.
      </p>

      {/* Mode Selector Tabs */}
      <div className="mode-toggle-container glass-panel">
        <button
          className={`mode-toggle-btn ${inputMode === 'chat' ? 'active' : ''}`}
          onClick={() => onSelectMode('chat')}
        >
          <div className="mode-btn-icon">
            <MessageSquareText size={20} />
          </div>
          <div className="mode-btn-text">
            <span className="mode-btn-title">Czat z Asystentem AI</span>
            <span className="mode-btn-desc">Rozmowa w języku naturalnym</span>
          </div>
        </button>

        <button
          className={`mode-toggle-btn ${inputMode === 'form' ? 'active' : ''}`}
          onClick={() => onSelectMode('form')}
        >
          <div className="mode-btn-icon">
            <SlidersHorizontal size={20} />
          </div>
          <div className="mode-btn-text">
            <span className="mode-btn-title">Kreator Podróży</span>
            <span className="mode-btn-desc">Formularz krok po kroku</span>
          </div>
        </button>
      </div>

      {/* Quick Inspiration Pills */}
      <div className="inspiration-wrapper">
        <span className="inspiration-label">
          <MapPin size={15} /> Szybkie inspiracje:
        </span>
        <div className="inspiration-pills">
          {quickDestinations.map(item => (
            <button
              key={item.key}
              className="inspiration-pill glass-panel"
              onClick={() => {
                const preset = PRESET_TRIPS[item.key];
                if (preset) onSelectPresetTrip(preset);
              }}
            >
              <span className="pill-emoji">{item.icon}</span>
              <span className="pill-name">{item.name}</span>
              <span className="pill-meta">({item.duration} • {item.tag})</span>
              <ArrowRight size={13} className="pill-arrow" />
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .hero-section {
          text-align: center;
          padding: 48px 20px 24px 20px;
          max-width: 900px;
          margin: 0 auto;
          position: relative;
        }

        .hero-badge-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .hero-title {
          font-size: 3rem;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.03em;
        }

        .hero-title-highlight {
          background: var(--gradient-brand);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 1.15rem;
          color: var(--text-secondary);
          max-width: 680px;
          margin: 0 auto 36px auto;
          line-height: 1.6;
        }

        .mode-toggle-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 8px;
          max-width: 620px;
          margin: 0 auto 36px auto;
          border-radius: var(--radius-lg);
        }

        .mode-toggle-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-normal);
          text-align: left;
        }

        .mode-toggle-btn.active {
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(59, 130, 246, 0.2));
          border-color: rgba(56, 189, 248, 0.4);
          color: var(--text-primary);
          box-shadow: 0 4px 20px rgba(56, 189, 248, 0.2);
        }

        .mode-btn-icon {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-cyan);
          flex-shrink: 0;
        }

        .mode-toggle-btn.active .mode-btn-icon {
          background: var(--gradient-brand);
          color: #ffffff;
        }

        .mode-btn-text {
          display: flex;
          flex-direction: column;
        }

        .mode-btn-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          line-height: 1.2;
        }

        .mode-btn-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: 3px;
        }

        .inspiration-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .inspiration-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .inspiration-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }

        .inspiration-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          font-size: 0.85rem;
          color: var(--text-primary);
          cursor: pointer;
          border-radius: var(--radius-full);
          transition: all var(--transition-normal);
        }

        .inspiration-pill:hover {
          background: var(--bg-card-hover);
          border-color: var(--accent-cyan);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(56, 189, 248, 0.2);
        }

        .pill-name {
          font-weight: 600;
        }

        .pill-meta {
          color: var(--text-muted);
          font-size: 0.78rem;
        }

        .pill-arrow {
          color: var(--accent-cyan);
          opacity: 0.7;
          transition: transform 0.2s ease;
        }

        .inspiration-pill:hover .pill-arrow {
          transform: translateX(3px);
          opacity: 1;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem;
          }
          .mode-toggle-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
