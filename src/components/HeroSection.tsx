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
    { key: 'rzym', name: 'Rzym', duration: '3 dni', tag: 'Kulinaria & Antyk' },
    { key: 'barcelona', name: 'Barcelona', duration: '4 dni', tag: 'Gaudí & Tapas' },
    { key: 'tokio', name: 'Tokio', duration: '5 dni', tag: 'Miasto & Tradycja' }
  ];

  const inlineImage = PRESET_TRIPS.barcelona?.heroImage;

  return (
    <section className="hero-section">
      <div className="hero-copy">
        <div className="hero-badge-wrapper">
          <span className="badge badge-cyan">
            <Sparkles size={13} />
            Osobisty planer podróży
          </span>
        </div>

        <h1 className="hero-title">
          Dokąd wyruszasz?
          {inlineImage && <img className="hero-inline-image" src={inlineImage} alt="Barcelona" />}
          <span className="hero-title-highlight">Ułóżmy plan, który ma sens.</span>
        </h1>

        <p className="hero-description">
          Opowiedz o swoim wyjeździe w rozmowie albo wybierz konkretne parametry. Otrzymasz przejrzysty harmonogram, mapę i praktyczne wskazówki.
        </p>
      </div>

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
              <span className="pill-index">{String(quickDestinations.indexOf(item) + 1).padStart(2, '0')}</span>
              <span className="pill-name">{item.name}</span>
              <span className="pill-meta">({item.duration} • {item.tag})</span>
              <ArrowRight size={13} className="pill-arrow" />
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .hero-section {
          text-align: left;
          padding: clamp(64px, 9vw, 112px) 24px 32px;
          max-width: 1120px;
          margin: 0 auto;
          position: relative;
        }

        .hero-copy {
          max-width: 920px;
        }

        .hero-badge-wrapper {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 26px;
        }

        .hero-title {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.16em 0.28em;
          max-width: 880px;
          font-size: clamp(3rem, 7vw, 6.6rem);
          line-height: 0.94;
          margin-bottom: 28px;
          letter-spacing: -0.065em;
          font-weight: 700;
        }

        .hero-inline-image {
          width: clamp(112px, 15vw, 190px);
          height: 0.72em;
          min-height: 58px;
          object-fit: cover;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .hero-title-highlight {
          color: var(--text-secondary);
          font-weight: 500;
        }

        .hero-description {
          font-size: clamp(1rem, 1.7vw, 1.2rem);
          color: var(--text-secondary);
          max-width: 60ch;
          margin: 0 0 44px;
          line-height: 1.75;
        }

        .mode-toggle-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 8px;
          max-width: 680px;
          margin: 0 0 44px;
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
          background: var(--accent-soft);
          border-color: var(--accent-color);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
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
          background: var(--accent-color);
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
          justify-content: flex-start;
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
          justify-content: flex-start;
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
          border-color: var(--accent-color);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .pill-index {
          font-family: var(--font-mono);
          color: var(--accent-color);
          font-size: 0.72rem;
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
          .mode-toggle-container {
            grid-template-columns: 1fr;
          }

          .hero-inline-image {
            order: 3;
            width: min(100%, 220px);
            height: 76px;
          }

          .inspiration-wrapper,
          .inspiration-pills {
            align-items: stretch;
            flex-direction: column;
          }

          .inspiration-pill {
            min-height: 48px;
            border-radius: var(--radius-md);
          }
        }
      `}</style>
    </section>
  );
};
