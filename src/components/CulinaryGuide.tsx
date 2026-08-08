import React, { useState } from 'react';
import { Utensils, Award, MapPin, Sparkles, HeartHandshake, Wine } from 'lucide-react';
import { TripPlan } from '../types/travel';

interface CulinaryGuideProps {
  trip: TripPlan;
}

export const CulinaryGuide: React.FC<CulinaryGuideProps> = ({ trip }) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const { dishes = [], restaurants = [] } = trip.culinaryGuide || {};

  const filteredRestaurants = activeCategoryFilter === 'all'
    ? restaurants
    : restaurants.filter(r => r.category === activeCategoryFilter);

  return (
    <div className="culinary-guide-container">
      <div className="culinary-section">
        <div className="section-title-wrapper">
          <div className="section-title-icon">
            <Utensils size={22} />
          </div>
          <div>
            <h2 className="section-heading">Lokalne Smaki & Kultowe Dania</h2>
            <p className="section-subheading">
              Kulinarne perełki {trip.destination}, których absolutnie musisz spróbować podczas pobytu.
            </p>
          </div>
        </div>

        <div className="dishes-grid">
          {dishes.map((dish) => (
            <div key={dish.id} className="dish-card glass-panel">
              {dish.imageUrl && (
                <div className="dish-image-wrapper">
                  <img src={dish.imageUrl} alt={dish.name} className="dish-image" loading="lazy" />
                  <span className="dish-type-badge">
                    {dish.type === 'dish' ? 'Danie Główne' : dish.type === 'street_food' ? 'Street Food' : dish.type === 'dessert' ? 'Deser' : 'Napój'}
                  </span>
                </div>
              )}

              <div className="dish-card-body">
                <div className="dish-card-header">
                  <h3 className="dish-title">{dish.name}</h3>
                  <span className="dish-price">{dish.typicalPrice}</span>
                </div>

                <p className="dish-desc">{dish.description}</p>

                <div className="must-try-box">
                  <div className="must-try-header">
                    <Award size={14} className="must-try-icon" />
                    <strong>Dlaczego warto spróbować:</strong>
                  </div>
                  <span>{dish.mustTryWhy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="culinary-section">
        <div className="section-title-wrapper">
          <div className="section-title-icon">
            <Wine size={22} />
          </div>
          <div>
            <h2 className="section-heading">Polecane Restauracje, Bary & Kawiarnie</h2>
            <p className="section-subheading">
              Starannie wyselekcjonowane lokale uwielbiane przez mieszkańców i koneserów.
            </p>
          </div>
        </div>

        <div className="restaurant-filter-pills">
          {[
            { key: 'all', label: 'Wszystkie Lokale' },
            { key: 'traditional', label: 'Tradycyjne Tawerny / Osterie' },
            { key: 'street_food', label: 'Street Food & Bary' },
            { key: 'fine_dining', label: 'Wykwintne / Fine Dining' },
            { key: 'cafe', label: 'Kawiarnie & Lodziarnie' }
          ].map(cat => (
            <button
              key={cat.key}
              className={`filter-pill ${activeCategoryFilter === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategoryFilter(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="restaurants-grid">
          {filteredRestaurants.map((rest) => (
            <div key={rest.id} className="restaurant-card glass-panel">
              <div className="rest-header">
                <div>
                  <h3 className="rest-name">{rest.name}</h3>
                  <span className="badge badge-amber">{rest.categoryLabel || rest.category}</span>
                </div>
                <span className="rest-price-tier">{rest.priceRange}</span>
              </div>

              <p className="rest-desc">{rest.description}</p>

              <div className="rest-signature-dish">
                <Sparkles size={14} className="sparkle-icon" />
                <div>
                  <strong>Polecane danie: </strong>
                  <span>{rest.recommendedDish}</span>
                </div>
              </div>

              {rest.address && (
                <div className="rest-address">
                  <MapPin size={13} className="address-icon" />
                  <span>{rest.address}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="dining-etiquette-box glass-panel">
        <div className="etiquette-header">
          <HeartHandshake size={20} className="text-cyan" />
          <h3>Kulinarny Savoir-Vivre w {trip.destination}</h3>
        </div>
        <div className="etiquette-grid">
          <div className="etiquette-item">
            <span className="etiquette-title">🕒 Godziny posiłków</span>
            <p>Zwróć uwagę na lokalne pory lunchu i kolacji – w krajach południowych kuchnie bywają zamknięte między 16:00 a 19:30.</p>
          </div>
          <div className="etiquette-item">
            <span className="etiquette-title">💶 Napiwki i rachunek</span>
            <p>W Europie często doliczane jest drobne coperto / service charge (1-3 EUR). W Azji (np. Japonia) napiwków się nie zostawia.</p>
          </div>
          <div className="etiquette-item">
            <span className="etiquette-title">☕ Kawa i desery</span>
            <p>Najlepszą kawę dostaniesz przy barze – we Włoszech kawa wypita przy ladzie kosztuje ułamek ceny stolika na zewnątrz.</p>
          </div>
        </div>
      </div>

      <style>{`
        .culinary-guide-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .culinary-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section-title-wrapper {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .section-title-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(244, 63, 94, 0.2));
          border: 1px solid rgba(245, 158, 11, 0.4);
          color: var(--accent-amber);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .section-heading {
          font-size: 1.5rem;
          margin-bottom: 4px;
        }

        .section-subheading {
          font-size: 0.92rem;
          color: var(--text-secondary);
        }

        .dishes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .dish-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .dish-card:hover {
          transform: translateY(-4px);
          border-color: rgba(245, 158, 11, 0.4);
        }

        .dish-image-wrapper {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .dish-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .dish-card:hover .dish-image {
          transform: scale(1.05);
        }

        .dish-type-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .dish-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 12px;
        }

        .dish-card-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
        }

        .dish-title {
          font-size: 1.2rem;
          color: var(--text-primary);
        }

        .dish-price {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--accent-amber);
          white-space: nowrap;
        }

        .dish-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .must-try-box {
          margin-top: auto;
          background: rgba(56, 189, 248, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          font-size: 0.82rem;
          color: #e0f2fe;
          line-height: 1.4;
        }

        .must-try-header {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--accent-cyan);
          margin-bottom: 2px;
        }

        .restaurant-filter-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .filter-pill {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-pill:hover, .filter-pill.active {
          background: rgba(245, 158, 11, 0.15);
          border-color: var(--accent-amber);
          color: var(--accent-amber);
          font-weight: 600;
        }

        .restaurants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .restaurant-card {
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .rest-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
        }

        .rest-name {
          font-size: 1.15rem;
          margin-bottom: 4px;
        }

        .rest-price-tier {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--accent-amber);
          letter-spacing: 0.05em;
        }

        .rest-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .rest-signature-dish {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          font-size: 0.82rem;
          color: var(--text-primary);
        }

        .sparkle-icon {
          color: var(--accent-amber);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .rest-address {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: auto;
        }

        .address-icon {
          color: var(--accent-cyan);
        }

        .dining-etiquette-box {
          padding: 24px 28px;
        }

        .etiquette-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .etiquette-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .etiquette-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--text-primary);
          display: block;
          margin-bottom: 6px;
        }

        .etiquette-item p {
          font-size: 0.84rem;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .etiquette-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
