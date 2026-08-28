import React, { useEffect, useState } from 'react';
import { 
  Clock, MapPin, Lightbulb, DollarSign, Navigation, Plus, Trash2, 
  CheckCircle2, Sun, Sunset, Moon, Sparkles
} from 'lucide-react';
import { TripPlan, ActivitySpot } from '../types/travel';

interface DayTimelineProps {
  trip: TripPlan;
  onUpdateTrip: (updatedTrip: TripPlan) => void;
}

export const DayTimeline: React.FC<DayTimelineProps> = ({
  trip,
  onUpdateTrip
}) => {
  const [selectedDayNum, setSelectedDayNum] = useState<number | 'all'>('all');
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});
  const [showAddModalForDay, setShowAddModalForDay] = useState<number | null>(null);

  // New activity form state
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('14:00 - 16:00');
  const [newCategory] = useState('Zwiedzanie');
  const [newDescription, setNewDescription] = useState('');
  const [newTip, setNewTip] = useState('');
  const [newCost] = useState('Darmowe');
  const [newSlot, setNewSlot] = useState<'morning' | 'afternoon' | 'evening'>('afternoon');

  useEffect(() => {
    if (showAddModalForDay === null) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowAddModalForDay(null);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAddModalForDay]);

  const toggleCompleted = (id: string) => {
    setCompletedActivities(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleRemoveActivity = (dayIndex: number, actId: string) => {
    const updated = JSON.parse(JSON.stringify(trip)) as TripPlan;
    updated.days[dayIndex].activities = updated.days[dayIndex].activities.filter(a => a.id !== actId);
    onUpdateTrip(updated);
  };

  const handleAddActivity = (dayNumber: number) => {
    if (!newTitle.trim()) return;

    const updated = JSON.parse(JSON.stringify(trip)) as TripPlan;
    const dayIndex = updated.days.findIndex(d => d.dayNumber === dayNumber);
    if (dayIndex >= 0) {
      const newAct: ActivitySpot = {
        id: `custom-act-${Date.now()}`,
        timeSlot: newSlot,
        time: newTime,
        title: newTitle.trim(),
        category: newCategory,
        description: newDescription || 'Własny punkt w planie podróży',
        practicalTip: newTip,
        estimatedCost: newCost,
        coordinates: trip.centerCoordinates
      };
      updated.days[dayIndex].activities.push(newAct);
      onUpdateTrip(updated);
    }

    // Reset
    setNewTitle('');
    setNewDescription('');
    setNewTip('');
    setShowAddModalForDay(null);
  };

  const displayedDays = selectedDayNum === 'all'
    ? trip.days
    : trip.days.filter(d => d.dayNumber === selectedDayNum);

  const getSlotIcon = (slot: string) => {
    switch (slot) {
      case 'morning': return <Sun size={15} className="slot-icon morning" />;
      case 'afternoon': return <Sunset size={15} className="slot-icon afternoon" />;
      case 'evening': return <Moon size={15} className="slot-icon evening" />;
      default: return <Clock size={15} />;
    }
  };

  const getSlotLabel = (slot: string) => {
    switch (slot) {
      case 'morning': return 'Poranek';
      case 'afternoon': return 'Popołudnie';
      case 'evening': return 'Wieczór';
      default: return 'Plan';
    }
  };

  return (
    <div className="timeline-container">
      {/* Day Selector Navigation */}
      <div className="day-filter-bar glass-panel">
        <button
          className={`day-filter-btn ${selectedDayNum === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedDayNum('all')}
        >
          Wszystkie Dni ({trip.days.length})
        </button>
        {trip.days.map(day => (
          <button
            key={day.dayNumber}
            className={`day-filter-btn ${selectedDayNum === day.dayNumber ? 'active' : ''}`}
            onClick={() => setSelectedDayNum(day.dayNumber)}
          >
            Dzień {day.dayNumber}
          </button>
        ))}
      </div>

      {/* Days List */}
      <div className="days-list">
        {displayedDays.map((day) => (
          <div key={day.dayNumber} className="day-block glass-panel">
            {/* Day Header */}
            <div className="day-header">
              <div className="day-header-left">
                <div className="day-badge-large">
                  <span>Dzień</span>
                  <strong>{day.dayNumber}</strong>
                </div>
                <div>
                  <h3 className="day-title">{day.title}</h3>
                  <div className="day-theme-tag">
                    <Sparkles size={13} />
                    <span>Motyw: {day.theme}</span>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-secondary btn-add-spot"
                onClick={() => setShowAddModalForDay(day.dayNumber)}
              >
                <Plus size={15} />
                <span>Dodaj punkt</span>
              </button>
            </div>

            {day.summary && (
              <p className="day-summary-text">{day.summary}</p>
            )}

            {/* Activities Timeline */}
            <div className="activities-timeline">
              {day.activities.map((activity) => {
                const isCompleted = completedActivities[activity.id];
                return (
                  <div
                    key={activity.id}
                    className={`activity-card ${isCompleted ? 'completed' : ''}`}
                  >
                    <div className="activity-time-col">
                      <div className="activity-slot-badge">
                        {getSlotIcon(activity.timeSlot)}
                        <span>{getSlotLabel(activity.timeSlot)}</span>
                      </div>
                      <div className="activity-exact-time">
                        <Clock size={12} />
                        <span>{activity.time}</span>
                      </div>
                    </div>

                    <div className="activity-content-col">
                      <div className="activity-content-header">
                        <div className="activity-title-row">
                          <h4 className="activity-name">{activity.title}</h4>
                          <span className="badge badge-cyan">{activity.category}</span>
                        </div>

                        <div className="activity-actions">
                          <button
                            className={`btn-check-action ${isCompleted ? 'active' : ''}`}
                            onClick={() => toggleCompleted(activity.id)}
                            title={isCompleted ? 'Odznacz' : 'Oznacz jako odwiedzone'}
                          >
                            <CheckCircle2 size={18} />
                          </button>
                          <button
                            className="btn-delete-action"
                            onClick={() => handleRemoveActivity(trip.days.findIndex(item => item.dayNumber === day.dayNumber), activity.id)}
                            title="Usuń z planu"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <p className="activity-desc">{activity.description}</p>

                      {activity.practicalTip && (
                        <div className="practical-tip-box">
                          <Lightbulb size={16} className="tip-icon" />
                          <div>
                            <strong>Wskazówka: </strong>
                            <span>{activity.practicalTip}</span>
                          </div>
                        </div>
                      )}

                      <div className="activity-meta-footer">
                        {activity.estimatedCost && (
                          <div className="meta-item">
                            <DollarSign size={14} className="meta-icon" />
                            <span>Koszt: {activity.estimatedCost}</span>
                          </div>
                        )}
                        {activity.address && (
                          <div className="meta-item">
                            <MapPin size={14} className="meta-icon" />
                            <span>{activity.address}</span>
                          </div>
                        )}
                        {activity.sourceUrl && (
                          <a className="meta-item source-link" href={activity.sourceUrl} target="_blank" rel="noreferrer">
                            Oficjalne źródło ↗
                          </a>
                        )}
                      </div>

                      {activity.transitToNext && (
                        <div className="transit-indicator">
                          <Navigation size={13} className="transit-icon" />
                          <span>Przejście: {activity.transitToNext}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Spot Modal */}
      {showAddModalForDay !== null && (
        <div className="modal-backdrop" onMouseDown={() => setShowAddModalForDay(null)}>
          <div
            className="modal-content glass-panel animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-activity-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <h3 className="modal-title" id="add-activity-title">Dodaj własny punkt do Dnia {showAddModalForDay}</h3>
            
            <div className="form-group">
              <label className="form-label">Nazwa miejsca / atrakcji:</label>
              <input
                type="text"
                placeholder="np. Kawiarnia z kotami, Wizyta w galerii, Wieczorny rejs..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
              />
            </div>

            <div className="grid-2-cols">
              <div className="form-group">
                <label className="form-label">Pora dnia:</label>
                <select value={newSlot} onChange={(e) => setNewSlot(e.target.value as any)}>
                  <option value="morning">Poranek</option>
                  <option value="afternoon">Popołudnie</option>
                  <option value="evening">Wieczór</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Godziny:</label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  placeholder="np. 14:00 - 16:00"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Krótki opis:</label>
              <textarea
                rows={2}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Co ciekawego tam zrobisz?"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Wskazówka / Uwaga (opcjonalnie):</label>
              <input
                type="text"
                value={newTip}
                onChange={(e) => setNewTip(e.target.value)}
                placeholder="np. Wymagana wcześniejsza rezerwacja online"
              />
            </div>

            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowAddModalForDay(null)}
              >
                Anuluj
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleAddActivity(showAddModalForDay)}
                disabled={!newTitle.trim()}
              >
                Dodaj do harmonogramu
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .timeline-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .day-filter-bar {
          display: flex;
          gap: 8px;
          padding: 8px;
          overflow-x: auto;
        }

        .day-filter-btn {
          padding: 8px 18px;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-secondary);
          border-radius: var(--radius-md);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .day-filter-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .day-filter-btn.active {
          background: var(--gradient-brand);
          color: #ffffff;
          box-shadow: 0 2px 10px rgba(56, 189, 248, 0.3);
        }

        .days-list {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .day-block {
          padding: 28px;
        }

        .day-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .day-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .day-badge-large {
          width: 54px;
          height: 54px;
          border-radius: var(--radius-md);
          background: var(--gradient-brand);
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(56, 189, 248, 0.35);
        }

        .day-badge-large span {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .day-badge-large strong {
          font-size: 1.35rem;
          line-height: 1;
        }

        .day-title {
          font-size: 1.35rem;
          margin-bottom: 4px;
        }

        .day-theme-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--accent-cyan);
          font-size: 0.82rem;
          font-weight: 600;
        }

        .btn-add-spot {
          padding: 8px 14px;
          font-size: 0.82rem;
        }

        .day-summary-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .activities-timeline {
          display: flex;
          flex-direction: column;
          gap: 18px;
          position: relative;
        }

        .activity-card {
          display: flex;
          gap: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 20px;
          transition: all 0.2s ease;
        }

        .activity-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(56, 189, 248, 0.3);
        }

        .activity-card.completed {
          opacity: 0.55;
          filter: grayscale(0.6);
        }

        .activity-time-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 110px;
          flex-shrink: 0;
        }

        .activity-slot-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .slot-icon.morning { color: #f59e0b; }
        .slot-icon.afternoon { color: #38bdf8; }
        .slot-icon.evening { color: #c084fc; }

        .activity-exact-time {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .activity-content-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .activity-content-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .activity-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .activity-name {
          font-size: 1.15rem;
          color: var(--text-primary);
        }

        .activity-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-check-action, .btn-delete-action {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .btn-check-action:hover, .btn-check-action.active {
          color: var(--accent-emerald);
        }

        .btn-delete-action:hover {
          color: var(--accent-rose);
        }

        .activity-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        .practical-tip-box {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.25);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          font-size: 0.85rem;
          color: #fde68a;
          line-height: 1.45;
        }

        .tip-icon {
          color: var(--accent-amber);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .activity-meta-footer {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .meta-icon {
          color: var(--accent-cyan);
        }

        .transit-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: var(--accent-emerald);
          background: rgba(16, 185, 129, 0.08);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          width: fit-content;
          margin-top: 4px;
        }

        /* Modal Styles */
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

        .modal-content {
          max-width: 500px;
          width: 100%;
          padding: 28px;
        }

        .modal-title {
          font-size: 1.25rem;
          margin-bottom: 20px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }

        @media (max-width: 640px) {
          .activity-card {
            flex-direction: column;
            gap: 12px;
          }
          .day-block {
            padding: 18px;
          }
        }
      `}</style>
    </div>
  );
};
