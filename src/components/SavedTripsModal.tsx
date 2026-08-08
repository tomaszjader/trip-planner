import React from 'react';
import { X, Bookmark, Calendar, MapPin, Trash2, ArrowRight, Compass } from 'lucide-react';
import { TripPlan } from '../types/travel';

interface SavedTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTrips: TripPlan[];
  onSelectTrip: (trip: TripPlan) => void;
  onDeleteTrip: (id: string) => void;
}

export const SavedTripsModal: React.FC<SavedTripsModalProps> = ({
  isOpen,
  onClose,
  savedTrips,
  onSelectTrip,
  onDeleteTrip
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="saved-modal-content glass-panel animate-fade-in">
        <div className="modal-header">
          <div className="modal-header-left">
            <Bookmark size={20} className="text-cyan" />
            <h2 className="modal-title">Moje Zapisane Plany Podróży</h2>
            <span className="badge badge-cyan">{savedTrips.length}</span>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {savedTrips.length === 0 ? (
            <div className="empty-saved-state">
              <Compass size={48} className="empty-icon" />
              <h3>Brak zapisanych planów</h3>
              <p>Wygeneruj swój pierwszy plan podróży za pomocą Czatu AI lub Kreatora i kliknij "Zapisz Plan Podróży".</p>
            </div>
          ) : (
            <div className="saved-trips-list">
              {savedTrips.map(trip => (
                <div key={trip.id} className="saved-trip-item glass-panel">
                  <img src={trip.heroImage} alt={trip.destination} className="saved-trip-thumb" />

                  <div className="saved-trip-info">
                    <h3 className="saved-trip-title">{trip.title}</h3>
                    <div className="saved-trip-meta">
                      <span><MapPin size={12} /> {trip.destination}, {trip.country}</span>
                      <span><Calendar size={12} /> {trip.days.length} dni</span>
                      <span><Compass size={12} /> Tempo: {trip.preferences.pace}</span>
                    </div>
                  </div>

                  <div className="saved-trip-actions">
                    <button
                      className="btn btn-primary btn-open-trip"
                      onClick={() => {
                        onSelectTrip(trip);
                        onClose();
                      }}
                    >
                      <span>Otwórz</span>
                      <ArrowRight size={14} />
                    </button>

                    <button
                      className="btn btn-icon btn-delete-saved"
                      onClick={() => onDeleteTrip(trip.id)}
                      title="Usuń z zapisanych"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .saved-modal-content {
          max-width: 720px;
          width: 100%;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          padding: 28px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .modal-title {
          font-size: 1.3rem;
        }

        .btn-close-modal {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 6px;
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
        }

        .btn-close-modal:hover {
          color: var(--text-primary);
        }

        .modal-body {
          flex: 1;
          overflow-y: auto;
        }

        .empty-saved-state {
          text-align: center;
          padding: 48px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .empty-icon {
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .empty-saved-state h3 {
          font-size: 1.2rem;
        }

        .empty-saved-state p {
          max-width: 420px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .saved-trips-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .saved-trip-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
        }

        .saved-trip-thumb {
          width: 80px;
          height: 60px;
          object-fit: cover;
          border-radius: var(--radius-sm);
          flex-shrink: 0;
        }

        .saved-trip-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow: hidden;
        }

        .saved-trip-title {
          font-size: 1.05rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .saved-trip-meta {
          display: flex;
          gap: 14px;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .saved-trip-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .saved-trip-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .btn-open-trip {
          padding: 8px 14px;
          font-size: 0.84rem;
        }

        .btn-delete-saved:hover {
          color: var(--accent-rose);
        }

        @media (max-width: 600px) {
          .saved-trip-item {
            flex-direction: column;
            align-items: flex-start;
          }
          .saved-trip-thumb {
            width: 100%;
            height: 120px;
          }
          .saved-trip-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
};
