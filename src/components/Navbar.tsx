import React from 'react';
import { Compass, Sparkles, Bookmark, Settings, PlusCircle, Sun, Moon } from 'lucide-react';
import { TripPlan } from '../types/travel';

interface NavbarProps {
  activeTrip: TripPlan | null;
  savedTripsCount: number;
  onNewTripClick: () => void;
  onOpenSavedModal: () => void;
  onOpenSettingsModal: () => void;
  currentTheme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTrip,
  savedTripsCount,
  onNewTripClick,
  onOpenSavedModal,
  onOpenSettingsModal,
  currentTheme,
  onToggleTheme
}) => {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Logo */}
        <div className="navbar-brand" onClick={onNewTripClick} style={{ cursor: 'pointer' }}>
          <div className="logo-icon-wrapper">
            <Compass className="logo-icon" size={26} />
            <Sparkles className="logo-sparkle" size={14} />
          </div>
          <div className="brand-text">
            <span className="brand-title">Voyage<span className="brand-highlight">AI</span></span>
            <span className="brand-subtitle">Inteligentny Planer Podróży</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="navbar-actions">
          {activeTrip && (
            <button 
              className="btn btn-secondary btn-nav-action"
              onClick={onNewTripClick}
              title="Stwórz nowy plan od zera"
            >
              <PlusCircle size={17} />
              <span className="hide-mobile">Nowy Plan</span>
            </button>
          )}

          <button 
            className="btn btn-secondary btn-nav-action relative"
            onClick={onOpenSavedModal}
            title="Zapisane plany podróży"
          >
            <Bookmark size={17} />
            <span className="hide-mobile">Moje Plany</span>
            {savedTripsCount > 0 && (
              <span className="counter-badge">{savedTripsCount}</span>
            )}
          </button>

          <button 
            className="btn btn-icon"
            onClick={onOpenSettingsModal}
            title="Ustawienia AI & Klucz API"
          >
            <Settings size={18} />
          </button>

          <button 
            className="btn btn-icon"
            onClick={onToggleTheme}
            title={currentTheme === 'dark' ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'}
          >
            {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <style>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: var(--bg-glass);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          padding: 12px 24px;
        }

        .navbar-content {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          user-select: none;
        }

        .logo-icon-wrapper {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(59, 130, 246, 0.3));
          border: 1px solid rgba(56, 189, 248, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-cyan);
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.25);
        }

        .logo-sparkle {
          position: absolute;
          top: -2px;
          right: -2px;
          color: #f59e0b;
          animation: pulseGlow 2s infinite ease-in-out;
        }

        .brand-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
          display: block;
        }

        .brand-highlight {
          background: var(--gradient-brand);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-subtitle {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
          display: block;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-nav-action {
          padding: 8px 16px;
          font-size: 0.88rem;
          position: relative;
        }

        .counter-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--accent-cyan);
          color: #0b132b;
          font-size: 0.7rem;
          font-weight: 800;
          width: 19px;
          height: 19px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        }

        @media (max-width: 640px) {
          .navbar-container {
            padding: 10px 16px;
          }
          .hide-mobile {
            display: none;
          }
          .brand-subtitle {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
