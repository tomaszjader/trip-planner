import React, { useState } from 'react';
import { 
  CheckSquare, Square, Plus, ShieldAlert, Sparkles, 
  Languages, CreditCard, Calendar, PhoneCall, PiggyBank 
} from 'lucide-react';
import { TripPlan, PackingChecklistItem } from '../types/travel';

interface TravelEssentialsProps {
  trip: TripPlan;
  onUpdateTrip: (updatedTrip: TripPlan) => void;
}

export const TravelEssentials: React.FC<TravelEssentialsProps> = ({
  trip,
  onUpdateTrip
}) => {
  const [newItemText, setNewItemText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'documents' | 'clothing' | 'electronics' | 'cosmetics' | 'special'>('clothing');

  const { packingList = [], practicalAdvice, budget } = trip;

  const togglePackingItem = (id: string) => {
    const updated = JSON.parse(JSON.stringify(trip)) as TripPlan;
    const item = updated.packingList.find(p => p.id === id);
    if (item) {
      item.isChecked = !item.isChecked;
      onUpdateTrip(updated);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const catLabels: Record<string, string> = {
      documents: 'Dokumenty',
      clothing: 'Ubrania',
      electronics: 'Elektronika',
      cosmetics: 'Kosmetyki',
      special: 'Akcesoria'
    };

    const newItem: PackingChecklistItem = {
      id: `pack-${Date.now()}`,
      category: selectedCategory,
      categoryLabel: catLabels[selectedCategory],
      item: newItemText.trim(),
      isChecked: false
    };

    const updated = JSON.parse(JSON.stringify(trip)) as TripPlan;
    updated.packingList.push(newItem);
    onUpdateTrip(updated);
    setNewItemText('');
  };

  const checkedCount = packingList.filter(p => p.isChecked).length;
  const progressPercent = packingList.length > 0
    ? Math.round((checkedCount / packingList.length) * 100)
    : 0;

  return (
    <div className="essentials-container">
      <div className="essentials-card glass-panel">
        <div className="essentials-header">
          <div className="header-icon-box">
            <CheckSquare size={22} className="text-cyan" />
          </div>
          <div className="header-text-flex">
            <div>
              <h2 className="essentials-title">Interaktywna Lista do Spakowania</h2>
              <p className="essentials-subtitle">Zaznaczaj spakowane rzeczy, aby o niczym nie zapomnieć przed wyjazdem.</p>
            </div>
            <div className="pack-progress-badge">
              <span>Spakowano: {checkedCount} / {packingList.length} ({progressPercent}%)</span>
            </div>
          </div>
        </div>

        <div className="packing-progress-track">
          <div className="packing-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        <form className="add-packing-form" onSubmit={handleAddItem}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="category-select"
          >
            <option value="documents">📄 Dokumenty</option>
            <option value="clothing">👕 Ubrania</option>
            <option value="electronics">🔌 Elektronika</option>
            <option value="cosmetics">🧴 Kosmetyki</option>
            <option value="special">🎒 Akcesoria</option>
          </select>
          <input
            type="text"
            placeholder="Dodaj własną rzecz do listy (np. okulary przeciwsłoneczne, leki...)"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            className="item-input"
          />
          <button type="submit" className="btn btn-primary btn-add-pack" disabled={!newItemText.trim()}>
            <Plus size={16} />
            <span>Dodaj</span>
          </button>
        </form>

        <div className="packing-items-grid">
          {packingList.map((item) => (
            <div
              key={item.id}
              className={`packing-item-card ${item.isChecked ? 'checked' : ''}`}
              onClick={() => togglePackingItem(item.id)}
            >
              <div className="pack-checkbox">
                {item.isChecked ? (
                  <CheckSquare size={18} className="check-active" />
                ) : (
                  <Square size={18} className="check-inactive" />
                )}
              </div>
              <div className="pack-text-wrapper">
                <span className="pack-item-name">{item.item}</span>
                <span className="pack-item-cat">{item.categoryLabel || item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="essentials-card glass-panel">
        <div className="essentials-header">
          <div className="header-icon-box amber">
            <PiggyBank size={22} className="text-amber" />
          </div>
          <div>
            <h2 className="essentials-title">Szacunkowy Kosztorys & Finanse</h2>
            <p className="essentials-subtitle">Przewidywane koszty w przeliczeniu na 1 osobę.</p>
          </div>
        </div>

        <div className="budget-grid-4">
          <div className="budget-col-card">
            <span className="budget-label">🏨 Noclegi / dzień</span>
            <strong className="budget-val">{budget?.accommodationPerDay || '80 - 150 EUR'}</strong>
          </div>
          <div className="budget-col-card">
            <span className="budget-label">🍕 Jedzenie / dzień</span>
            <strong className="budget-val">{budget?.foodPerDay || '35 - 60 EUR'}</strong>
          </div>
          <div className="budget-col-card">
            <span className="budget-label">🎟️ Atrakcje & Bilety</span>
            <strong className="budget-val">{budget?.activitiesPerDay || '15 - 30 EUR'}</strong>
          </div>
          <div className="budget-col-card highlight">
            <span className="budget-label">💰 Szacunek Łączny</span>
            <strong className="budget-val-total">{budget?.estimatedTotalPerPerson || '450 - 750 EUR'}</strong>
          </div>
        </div>

        {budget?.moneySavingTips && budget.moneySavingTips.length > 0 && (
          <div className="saving-tips-box">
            <div className="saving-tips-title">
              <Sparkles size={16} className="text-amber" />
              <strong>Jak zaoszczędzić na tym wyjeździe:</strong>
            </div>
            <ul className="saving-tips-list">
              {budget.moneySavingTips.map((tip, idx) => (
                <li key={idx}>• {tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {practicalAdvice && (
        <div className="essentials-card glass-panel">
          <div className="essentials-header">
            <div className="header-icon-box emerald">
              <Languages size={22} className="text-emerald" />
            </div>
            <div>
              <h2 className="essentials-title">Niezbędnik Praktyczny & Zwroty</h2>
              <p className="essentials-subtitle">Najważniejsze informacje przed podróżą.</p>
            </div>
          </div>

          <div className="practical-grid-2">
            <div className="practical-info-col">
              <div className="practical-bullet">
                <Calendar size={16} className="text-cyan" />
                <div>
                  <strong>Najlepsza pora na wyjazd: </strong>
                  <span>{practicalAdvice.bestSeason}</span>
                </div>
              </div>

              <div className="practical-bullet">
                <CreditCard size={16} className="text-cyan" />
                <div>
                  <strong>Płatności & Waluta: </strong>
                  <span>{practicalAdvice.localCurrency}</span>
                </div>
              </div>

              <div className="practical-bullet">
                <ShieldAlert size={16} className="text-amber" />
                <div>
                  <strong>Bezpieczeństwo & Wskazówki: </strong>
                  <span>{practicalAdvice.safetyTips}</span>
                </div>
              </div>

              <div className="practical-bullet">
                <PhoneCall size={16} className="text-rose" />
                <div>
                  <strong>Numer alarmowy: </strong>
                  <span>{practicalAdvice.emergencyNumber}</span>
                </div>
              </div>
            </div>

            {practicalAdvice.languageAndPhrases && practicalAdvice.languageAndPhrases.length > 0 && (
              <div className="phrases-box">
                <span className="phrases-header-title">Przydatne lokalne zwroty:</span>
                <div className="phrases-list">
                  {practicalAdvice.languageAndPhrases.map((phrase, idx) => (
                    <div key={idx} className="phrase-card">
                      <strong className="phrase-foreign">{phrase.phrase}</strong>
                      <span className="phrase-pl">{phrase.translation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .essentials-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .essentials-card {
          padding: 28px;
        }

        .essentials-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .header-icon-box {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-md);
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .header-icon-box.amber {
          background: rgba(245, 158, 11, 0.15);
          border-color: rgba(245, 158, 11, 0.3);
        }

        .header-icon-box.emerald {
          background: rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .header-text-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
          flex-wrap: wrap;
          gap: 12px;
        }

        .essentials-title {
          font-size: 1.35rem;
          margin-bottom: 2px;
        }

        .essentials-subtitle {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .pack-progress-badge {
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: var(--accent-cyan);
          padding: 4px 14px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 700;
        }

        .packing-progress-track {
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: 24px;
        }

        .packing-progress-fill {
          height: 100%;
          background: var(--gradient-brand);
          transition: width 0.3s ease;
        }

        .add-packing-form {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .category-select {
          width: auto;
          min-width: 140px;
        }

        .item-input {
          flex: 1;
          min-width: 220px;
        }

        .btn-add-pack {
          padding: 10px 18px;
        }

        .packing-items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 12px;
        }

        .packing-item-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }

        .packing-item-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(56, 189, 248, 0.3);
        }

        .packing-item-card.checked {
          opacity: 0.55;
          text-decoration: line-through;
          background: rgba(16, 185, 129, 0.05);
          border-color: rgba(16, 185, 129, 0.2);
        }

        .check-active {
          color: var(--accent-emerald);
        }

        .check-inactive {
          color: var(--text-muted);
        }

        .pack-text-wrapper {
          display: flex;
          flex-direction: column;
        }

        .pack-item-name {
          font-size: 0.88rem;
          color: var(--text-primary);
        }

        .pack-item-cat {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .budget-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 20px;
        }

        .budget-col-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .budget-col-card.highlight {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(244, 63, 94, 0.12));
          border-color: rgba(245, 158, 11, 0.4);
        }

        .budget-label {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .budget-val {
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .budget-val-total {
          font-size: 1.25rem;
          color: var(--accent-amber);
        }

        .saving-tips-box {
          background: rgba(245, 158, 11, 0.06);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: var(--radius-sm);
          padding: 16px 20px;
        }

        .saving-tips-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--accent-amber);
          margin-bottom: 8px;
        }

        .saving-tips-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .saving-tips-list li {
          font-size: 0.85rem;
          color: #fde68a;
          line-height: 1.45;
        }

        .practical-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .practical-info-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .practical-bullet {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          font-size: 0.85rem;
          line-height: 1.5;
        }

        .text-rose { color: var(--accent-rose); }

        .phrases-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 16px;
        }

        .phrases-header-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 12px;
          display: block;
        }

        .phrases-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .phrase-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
        }

        .phrase-foreign {
          font-size: 0.88rem;
          color: var(--accent-cyan);
        }

        .phrase-pl {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .budget-grid-4, .practical-grid-2, .phrases-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
