import React, { useState } from 'react';
import { 
  MapPin, Calendar, Compass, Users, Sparkles, Utensils, Landmark, Mountain, 
  Palmtree, Palette, Moon, Gem, ShoppingBag, Footprints, DollarSign, 
  ArrowRight, ArrowLeft, Loader2, Check
} from 'lucide-react';
import { TravelPreferences, TravelPace, TravelGroup, BudgetLevel, TransportMode, DietaryPreference, InterestTag } from '../types/travel';

interface FormWizardProps {
  onGeneratePlan: (preferences: TravelPreferences) => void;
  isGeneratingPlan: boolean;
}

export const FormWizard: React.FC<FormWizardProps> = ({
  onGeneratePlan,
  isGeneratingPlan
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [durationDays, setDurationDays] = useState(4);
  const [season, setSeason] = useState('Wiosna / Jesień (najlepsza pogoda)');
  const [pace, setPace] = useState<TravelPace>('balanced');
  const [group, setGroup] = useState<TravelGroup>('couple');
  const [interests, setInterests] = useState<InterestTag[]>(['history', 'food', 'hidden_gems']);
  const [budget, setBudget] = useState<BudgetLevel>('medium');
  const [transport, setTransport] = useState<TransportMode>('walking_transit');
  const [dietary, setDietary] = useState<DietaryPreference>('traditional');
  const [customNotes, setCustomNotes] = useState('');

  const popularDestinations = ['Rzym', 'Barcelona', 'Tokio', 'Paryż', 'Lizbona', 'Islandia', 'Nowy Jork', 'Bali', 'Kraków/Tatry'];

  const toggleInterest = (tag: InterestTag) => {
    if (interests.includes(tag)) {
      if (interests.length > 1) {
        setInterests(interests.filter(i => i !== tag));
      }
    } else {
      setInterests([...interests, tag]);
    }
  };

  const handleFinish = () => {
    const preferences: TravelPreferences = {
      destination: destination.trim() || 'Rzym',
      durationDays,
      season,
      pace,
      group,
      interests,
      budget,
      transport,
      dietary,
      customNotes
    };
    onGeneratePlan(preferences);
  };

  return (
    <div className="form-wizard-container">
      {/* Wizard Progress Steps Header */}
      <div className="wizard-progress-bar glass-panel">
        {[
          { num: 1, label: 'Destynacja & Czas' },
          { num: 2, label: 'Styl & Grupa' },
          { num: 3, label: 'Atrakcje & Priorytety' },
          { num: 4, label: 'Budżet & Dieta' }
        ].map(step => (
          <div
            key={step.num}
            className={`step-item ${currentStep === step.num ? 'active' : currentStep > step.num ? 'completed' : ''}`}
            onClick={() => currentStep > step.num && setCurrentStep(step.num)}
          >
            <div className="step-number">
              {currentStep > step.num ? <Check size={14} /> : step.num}
            </div>
            <span className="step-label">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Wizard Card Content */}
      <div className="wizard-card glass-panel animate-fade-in">
        {/* STEP 1 */}
        {currentStep === 1 && (
          <div className="step-content">
            <div className="step-title-group">
              <span className="badge badge-cyan">Krok 1 z 4</span>
              <h2>Dokąd i na jak długo chcesz wyruszyć?</h2>
              <p>Wpisz dowolne miasto, region lub kraj na świecie albo wybierz z popularnych kierunków.</p>
            </div>

            <div className="form-group">
              <label className="form-label">
                <MapPin size={16} className="label-icon" />
                Cel podróży:
              </label>
              <input
                type="text"
                placeholder="np. Rzym, Barcelona, Tokio, Islandia, Madera..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                autoFocus
              />

              <div className="quick-picks-label">Popularne propozycje:</div>
              <div className="quick-picks-list">
                {popularDestinations.map(city => (
                  <button
                    key={city}
                    type="button"
                    className={`quick-pick-btn ${destination.toLowerCase() === city.toLowerCase() ? 'selected' : ''}`}
                    onClick={() => setDestination(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <div className="duration-header">
                <label className="form-label">
                  <Calendar size={16} className="label-icon" />
                  Czas trwania podróży:
                </label>
                <span className="duration-value-badge">{durationDays} {durationDays === 1 ? 'dzień' : durationDays < 5 ? 'dni' : 'dni'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="14"
                value={durationDays}
                onChange={(e) => setDurationDays(parseInt(e.target.value, 10))}
                className="range-slider"
              />
              <div className="range-presets">
                {[
                  { days: 3, label: 'Weekend (3 dni)' },
                  { days: 5, label: 'Przedłużony (5 dni)' },
                  { days: 7, label: 'Tydzień (7 dni)' },
                  { days: 10, label: 'Wyprawa (10 dni)' }
                ].map(p => (
                  <button
                    key={p.days}
                    type="button"
                    className={`preset-btn ${durationDays === p.days ? 'active' : ''}`}
                    onClick={() => setDurationDays(p.days)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Pora roku / Termin wyjazdu:</label>
              <select value={season} onChange={(e) => setSeason(e.target.value)}>
                <option value="Wiosna (Kwiecień - Czerwiec)">Wiosna (Kwiecień - Czerwiec – przyjemne słońce)</option>
                <option value="Lato (Lipiec - Sierpień)">Lato (Lipiec - Sierpień – plaża i ciepłe wieczory)</option>
                <option value="Jesień (Wrzesień - Listopad)">Jesień (Wrzesień - Listopad – mniej tłumów)</option>
                <option value="Zima (Grudzień - Marzec)">Zima (Grudzień - Marzec – jarmarki, narty lub ucieczka do słońca)</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div className="step-content">
            <div className="step-title-group">
              <span className="badge badge-cyan">Krok 2 z 4</span>
              <h2>Jaki styl podróżowania preferujesz?</h2>
              <p>Dopasujemy liczbę atrakcji dziennie i tempo przemieszczania się do Twoich preferencji.</p>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Compass size={16} className="label-icon" />
                Tempo i intensywność dnia:
              </label>
              <div className="selection-grid-3">
                {[
                  {
                    id: 'relaxed',
                    title: 'Leniwe & Chillout',
                    desc: '1-2 atrakcje dziennie, długie posiłki, dużo wolnego czasu na kawę i relaks.',
                    badge: 'Slow Travel'
                  },
                  {
                    id: 'balanced',
                    title: 'Zbalansowane',
                    desc: '3-4 atrakcje dziennie, idealny miks zwiedzania, spacerów i przerw na jedzenie.',
                    badge: 'Rekomendowane'
                  },
                  {
                    id: 'intense',
                    title: 'Intensywne',
                    desc: 'Od świtu do nocy, maksymalne wykorzystanie czasu, bogaty grafik zwiedzania.',
                    badge: 'Dla Aktywnych'
                  }
                ].map(item => (
                  <div
                    key={item.id}
                    className={`card-selector ${pace === item.id ? 'selected' : ''}`}
                    onClick={() => setPace(item.id as TravelPace)}
                  >
                    <span className="card-badge">{item.badge}</span>
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Users size={16} className="label-icon" />
                Z kim podróżujesz?
              </label>
              <div className="selection-grid-4">
                {[
                  { id: 'solo', title: 'Solo', icon: '🎒', desc: 'Samodzielna przygoda' },
                  { id: 'couple', title: 'We dwoje', icon: '❤️', desc: 'Romantyczny wyjazd' },
                  { id: 'friends', title: 'Ekipa znajomych', icon: '🥂', desc: 'Wspólna zabawa' },
                  { id: 'family', title: 'Rodzina z dziećmi', icon: '👨‍👩‍👧', desc: 'Przyjazne dla dzieci' }
                ].map(item => (
                  <div
                    key={item.id}
                    className={`card-selector-compact ${group === item.id ? 'selected' : ''}`}
                    onClick={() => setGroup(item.id as TravelGroup)}
                  >
                    <span className="compact-icon">{item.icon}</span>
                    <strong className="compact-title">{item.title}</strong>
                    <span className="compact-desc">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div className="step-content">
            <div className="step-title-group">
              <span className="badge badge-cyan">Krok 3 z 4</span>
              <h2>Co najbardziej Cię interesuje?</h2>
              <p>Zaznacz wszystkie obszary, które chcesz uwzględnić w swoim planie.</p>
            </div>

            <div className="interests-grid">
              {[
                { tag: 'history', label: 'Zabytki & Historia', icon: Landmark, color: 'cyan' },
                { tag: 'food', label: 'Kulinaria & Gastro', icon: Utensils, color: 'amber' },
                { tag: 'nature', label: 'Natura & Trekking', icon: Mountain, color: 'emerald' },
                { tag: 'beaches', label: 'Plaża & Woda', icon: Palmtree, color: 'cyan' },
                { tag: 'museums', label: 'Sztuka & Muzea', icon: Palette, color: 'purple' },
                { tag: 'nightlife', label: 'Życie Nocne & Bary', icon: Moon, color: 'rose' },
                { tag: 'hidden_gems', label: 'Ukryte Perełki (Off-beat)', icon: Gem, color: 'amber' },
                { tag: 'shopping', label: 'Zakupy & Targi', icon: ShoppingBag, color: 'emerald' },
                { tag: 'entertainment', label: 'Rozrywka & Parki', icon: Sparkles, color: 'purple' }
              ].map(item => {
                const IconComponent = item.icon;
                const isSelected = interests.includes(item.tag as InterestTag);
                return (
                  <button
                    key={item.tag}
                    type="button"
                    className={`interest-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleInterest(item.tag as InterestTag)}
                  >
                    <div className="interest-icon-box">
                      <IconComponent size={22} />
                    </div>
                    <span className="interest-label">{item.label}</span>
                    {isSelected && <div className="interest-check"><Check size={14} /></div>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {currentStep === 4 && (
          <div className="step-content">
            <div className="step-title-group">
              <span className="badge badge-cyan">Krok 4 z 4</span>
              <h2>Budżet, Dieta & Dodatkowe życzenia</h2>
              <p>Ostatnie szczegóły, aby wygenerowany plan był w 100% dostosowany do Twojego portfela i stylu.</p>
            </div>

            <div className="form-group">
              <label className="form-label">
                <DollarSign size={16} className="label-icon" />
                Przedział budżetowy:
              </label>
              <div className="selection-grid-3">
                {[
                  { id: 'budget', title: 'Ekonomiczny', desc: 'Tani street food, darmowe atrakcje, hostel/tanie noclegi', icon: '$' },
                  { id: 'medium', title: 'Średni / Zbalansowany', desc: 'Przyjemne hotele 3-4*, dobre restauracje i płatne muzea', icon: '$$' },
                  { id: 'luxury', title: 'Premium / Luksus', desc: 'Hotele 5*, restauracje fine dining, prywatne wycieczki', icon: '$$$' }
                ].map(item => (
                  <div
                    key={item.id}
                    className={`card-selector ${budget === item.id ? 'selected' : ''}`}
                    onClick={() => setBudget(item.id as BudgetLevel)}
                  >
                    <span className="budget-symbol">{item.icon}</span>
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid-2-cols">
              <div className="form-group">
                <label className="form-label">
                  <Footprints size={16} className="label-icon" />
                  Sposób poruszania się:
                </label>
                <select value={transport} onChange={(e) => setTransport(e.target.value as TransportMode)}>
                  <option value="walking_transit">Pieszo + Komunikacja miejska</option>
                  <option value="car_rental">Wynajęty samochód</option>
                  <option value="bicycle">Rower / Hulajnoga</option>
                  <option value="mixed">Mieszany / Taksówki</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Utensils size={16} className="label-icon" />
                  Preferencje kulinarne / Dieta:
                </label>
                <select value={dietary} onChange={(e) => setDietary(e.target.value as DietaryPreference)}>
                  <option value="traditional">Tradycyjna / Wszystkożerna</option>
                  <option value="vegetarian">Wegetariańska</option>
                  <option value="vegan">Wegańska</option>
                  <option value="seafood">Owoce morza & Ryby</option>
                  <option value="fine_dining">Wykwintna / Fine dining</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Dodatkowe uwagi / Marzenia (opcjonalnie):</label>
              <textarea
                rows={2}
                placeholder="np. Zależy mi na odwiedzeniu punktów widokowych o zachodzie słońca, mam lęk wysokości, chcemy spróbować lokalnego wina..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div className="wizard-footer">
          {currentStep > 1 ? (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={isGeneratingPlan}
            >
              <ArrowLeft size={16} />
              <span>Wstecz</span>
            </button>
          ) : <div></div>}

          {currentStep < 4 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setCurrentStep(prev => prev + 1)}
            >
              <span>Dalej</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-warm"
              onClick={handleFinish}
              disabled={isGeneratingPlan}
            >
              {isGeneratingPlan ? (
                <>
                  <Loader2 size={18} className="spinner" />
                  <span>AI tworzy Twój plan...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Wygeneruj Kompletny Plan Podróży</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <style>{`
        .form-wizard-container {
          max-width: 900px;
          margin: 0 auto 60px auto;
          padding: 0 20px;
        }

        .wizard-progress-bar {
          display: flex;
          justify-content: space-between;
          padding: 14px 24px;
          margin-bottom: 24px;
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-muted);
          cursor: default;
          transition: all 0.2s ease;
        }

        .step-item.active {
          color: var(--text-primary);
          font-weight: 700;
        }

        .step-item.completed {
          color: var(--accent-cyan);
          cursor: pointer;
        }

        .step-number {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .step-item.active .step-number {
          background: var(--gradient-brand);
          color: #ffffff;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
        }

        .step-item.completed .step-number {
          background: rgba(56, 189, 248, 0.2);
          color: var(--accent-cyan);
        }

        .step-label {
          font-size: 0.88rem;
        }

        .wizard-card {
          padding: 36px;
        }

        .step-title-group {
          margin-bottom: 28px;
        }

        .step-title-group h2 {
          font-size: 1.8rem;
          margin: 10px 0 6px 0;
        }

        .step-title-group p {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 0.92rem;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .label-icon {
          color: var(--accent-cyan);
        }

        .quick-picks-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: 10px;
          margin-bottom: 6px;
        }

        .quick-picks-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .quick-pick-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 6px 12px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-pick-btn:hover, .quick-pick-btn.selected {
          background: rgba(56, 189, 248, 0.15);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        .duration-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .duration-value-badge {
          background: var(--gradient-brand);
          color: #ffffff;
          padding: 3px 12px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
        }

        .range-slider {
          width: 100%;
          margin: 12px 0;
          accent-color: var(--accent-cyan);
        }

        .range-presets {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .preset-btn {
          padding: 6px 12px;
          font-size: 0.8rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          cursor: pointer;
        }

        .preset-btn.active {
          background: rgba(56, 189, 248, 0.15);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        /* Selection Grids */
        .selection-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .selection-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .card-selector {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 18px;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .card-selector:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .card-selector.selected {
          background: rgba(56, 189, 248, 0.1);
          border-color: var(--accent-cyan);
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.2);
        }

        .card-badge {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--accent-cyan);
          margin-bottom: 8px;
        }

        .card-title {
          font-size: 1.05rem;
          margin-bottom: 6px;
        }

        .card-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .card-selector-compact {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 14px;
          text-align: center;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transition: all 0.2s ease;
        }

        .card-selector-compact.selected {
          background: rgba(56, 189, 248, 0.1);
          border-color: var(--accent-cyan);
        }

        .compact-icon {
          font-size: 1.6rem;
          margin-bottom: 4px;
        }

        .compact-title {
          font-size: 0.88rem;
        }

        .compact-desc {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        /* Interests Grid */
        .interests-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .interest-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          cursor: pointer;
          position: relative;
          text-align: left;
          transition: all 0.2s ease;
        }

        .interest-card:hover {
          background: rgba(255, 255, 255, 0.07);
        }

        .interest-card.selected {
          background: rgba(56, 189, 248, 0.12);
          border-color: var(--accent-cyan);
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.2);
        }

        .interest-icon-box {
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
        }

        .interest-label {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 600;
        }

        .interest-check {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 20px;
          height: 20px;
          background: var(--accent-cyan);
          color: #0b132b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .budget-symbol {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--accent-amber);
          margin-bottom: 4px;
          display: block;
        }

        .grid-2-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .wizard-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @media (max-width: 768px) {
          .wizard-card {
            padding: 20px;
          }
          .selection-grid-3, .selection-grid-4, .interests-grid {
            grid-template-columns: 1fr;
          }
          .grid-2-cols {
            grid-template-columns: 1fr;
          }
          .step-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
