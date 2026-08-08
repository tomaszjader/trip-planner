import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Layers, Eye } from 'lucide-react';
import { TripPlan, ActivitySpot } from '../types/travel';

interface InteractiveMapProps {
  trip: TripPlan;
}

const DAY_COLORS = ['#38bdf8', '#10b981', '#f59e0b', '#f43f5e', '#a855f7', '#06b6d4', '#ec4899'];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ trip }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const polylinesLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeDayFilter, setActiveDayFilter] = useState<number | 'all'>('all');
  const [selectedSpot, setSelectedSpot] = useState<ActivitySpot | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [trip.centerCoordinates.lat, trip.centerCoordinates.lng],
        zoom: trip.defaultZoom || 13,
        zoomControl: false
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
        maxZoom: 19
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      polylinesLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersLayerRef.current || !polylinesLayerRef.current) return;

    markersLayerRef.current.clearLayers();
    polylinesLayerRef.current.clearLayers();

    const bounds: L.LatLngExpression[] = [];

    const daysToRender = activeDayFilter === 'all'
      ? trip.days
      : trip.days.filter(d => d.dayNumber === activeDayFilter);

    daysToRender.forEach((day) => {
      const dayColor = DAY_COLORS[(day.dayNumber - 1) % DAY_COLORS.length];
      const dayLatLngs: L.LatLngExpression[] = [];

      day.activities.forEach((act, actIdx) => {
        const coords = act.coordinates;
        if (!coords || !coords.lat || !coords.lng) return;

        const pos: L.LatLngTuple = [coords.lat, coords.lng];
        bounds.push(pos);
        dayLatLngs.push(pos);

        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: `
            <div style="
              background-color: ${dayColor};
              width: 32px;
              height: 32px;
              border-radius: 50%;
              border: 3px solid #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ffffff;
              font-family: 'Outfit', sans-serif;
              font-weight: 800;
              font-size: 13px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.45);
              cursor: pointer;
            ">
              ${actIdx + 1}
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -16]
        });

        const popupContent = `
          <div style="padding: 6px; font-family: 'Plus Jakarta Sans', sans-serif;">
            <span style="font-size: 11px; font-weight: 700; color: ${dayColor}; text-transform: uppercase;">
              Dzień ${day.dayNumber} • Punkt ${actIdx + 1}
            </span>
            <h4 style="margin: 4px 0 6px 0; font-size: 14px; font-weight: 700; color: #f8fafc;">
              ${act.title}
            </h4>
            <div style="font-size: 12px; color: #94a3b8; margin-bottom: 6px;">
              ⏱️ ${act.time} (${act.category})
            </div>
            ${act.practicalTip ? `
              <div style="font-size: 11px; color: #fde68a; background: rgba(245,158,11,0.15); padding: 4px 8px; border-radius: 6px; margin-top: 4px;">
                💡 ${act.practicalTip}
              </div>
            ` : ''}
          </div>
        `;

        L.marker(pos, { icon: customIcon })
          .bindPopup(popupContent)
          .on('click', () => setSelectedSpot(act))
          .addTo(markersLayerRef.current!);
      });

      if (dayLatLngs.length > 1) {
        const polyline = L.polyline(dayLatLngs, {
          color: dayColor,
          weight: 4,
          opacity: 0.8,
          dashArray: '8, 8'
        });
        polylinesLayerRef.current?.addLayer(polyline);
      }
    });

    if (bounds.length > 0) {
      map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40], maxZoom: 15 });
    }
  }, [activeDayFilter, trip]);

  const handleFocusSpot = (act: ActivitySpot) => {
    if (!mapInstanceRef.current || !act.coordinates) return;
    mapInstanceRef.current.flyTo([act.coordinates.lat, act.coordinates.lng], 16, { duration: 1.2 });
    setSelectedSpot(act);
  };

  return (
    <div className="interactive-map-wrapper">
      <div className="map-filter-bar glass-panel">
        <div className="map-filter-left">
          <Layers size={16} className="text-cyan" />
          <span className="filter-title">Trasa na mapie:</span>
          <button
            className={`map-day-pill ${activeDayFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveDayFilter('all')}
          >
            Wszystkie dni
          </button>
          {trip.days.map(day => (
            <button
              key={day.dayNumber}
              className={`map-day-pill ${activeDayFilter === day.dayNumber ? 'active' : ''}`}
              style={{
                borderColor: activeDayFilter === day.dayNumber ? DAY_COLORS[(day.dayNumber - 1) % DAY_COLORS.length] : undefined
              }}
              onClick={() => setActiveDayFilter(day.dayNumber)}
            >
              <span
                className="day-dot"
                style={{ backgroundColor: DAY_COLORS[(day.dayNumber - 1) % DAY_COLORS.length] }}
              />
              Dzień {day.dayNumber}
            </button>
          ))}
        </div>

        <div className="map-meta-info">
          <Navigation size={14} />
          <span>Punkty połączone w optymalnej kolejności zwiedzania</span>
        </div>
      </div>

      <div className="map-layout-grid">
        <div className="map-container-box glass-panel">
          <div ref={mapContainerRef} className="leaflet-map-root" />
        </div>

        <div className="map-sidebar glass-panel">
          <h4 className="sidebar-title">
            <MapPin size={16} className="text-cyan" />
            Przystanki ({activeDayFilter === 'all' ? 'Wszystkie' : `Dzień ${activeDayFilter}`})
          </h4>

          <div className="spots-scroll-list">
            {(activeDayFilter === 'all' ? trip.days : trip.days.filter(d => d.dayNumber === activeDayFilter)).map(day => (
              <div key={day.dayNumber} className="sidebar-day-group">
                <div className="sidebar-day-header">
                  <span
                    className="day-tag-pill"
                    style={{ backgroundColor: DAY_COLORS[(day.dayNumber - 1) % DAY_COLORS.length] }}
                  >
                    Dzień {day.dayNumber}
                  </span>
                  <span className="sidebar-day-theme">{day.theme}</span>
                </div>

                {day.activities.map((act, idx) => (
                  <div
                    key={act.id}
                    className={`sidebar-spot-item ${selectedSpot?.id === act.id ? 'active' : ''}`}
                    onClick={() => handleFocusSpot(act)}
                  >
                    <div
                      className="spot-number-circle"
                      style={{ borderColor: DAY_COLORS[(day.dayNumber - 1) % DAY_COLORS.length] }}
                    >
                      {idx + 1}
                    </div>
                    <div className="spot-info">
                      <strong>{act.title}</strong>
                      <span>{act.time} • {act.category}</span>
                    </div>
                    <Eye size={14} className="spot-eye-icon" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .interactive-map-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .map-filter-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .map-filter-left {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          margin-right: 4px;
        }

        .map-day-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .map-day-pill:hover, .map-day-pill.active {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }

        .day-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .map-meta-info {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .map-layout-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 16px;
          height: 600px;
        }

        .map-container-box {
          height: 100%;
          overflow: hidden;
          padding: 4px;
        }

        .leaflet-map-root {
          width: 100%;
          height: 100%;
          border-radius: var(--radius-md);
        }

        .map-sidebar {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 20px;
          overflow: hidden;
        }

        .sidebar-title {
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
        }

        .spots-scroll-list {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .sidebar-day-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sidebar-day-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .day-tag-pill {
          padding: 2px 8px;
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 700;
          color: #ffffff;
        }

        .sidebar-day-theme {
          font-size: 0.78rem;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar-spot-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sidebar-spot-item:hover, .sidebar-spot-item.active {
          background: rgba(56, 189, 248, 0.12);
          border-color: var(--accent-cyan);
        }

        .spot-number-circle {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-primary);
          flex-shrink: 0;
        }

        .spot-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .spot-info strong {
          font-size: 0.85rem;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .spot-info span {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .spot-eye-icon {
          color: var(--text-muted);
          opacity: 0.5;
        }

        .sidebar-spot-item:hover .spot-eye-icon {
          color: var(--accent-cyan);
          opacity: 1;
        }

        @media (max-width: 900px) {
          .map-layout-grid {
            grid-template-columns: 1fr;
            height: auto;
          }
          .map-container-box {
            height: 400px;
          }
          .map-sidebar {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
};
