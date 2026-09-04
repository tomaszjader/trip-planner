import { beforeEach, describe, expect, it } from 'vitest';
import { deleteSavedTrip, getSavedTrips, saveAppSettings, saveTrip, setActiveTrip, getActiveTrip } from './storageService';
import type { TripPlan } from '../types/travel';

const values = new Map<string, string>();
Object.defineProperty(globalThis, 'localStorage', {
  value: {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
    clear: () => values.clear()
  },
  configurable: true
});

const trip = { id: 'trip-1', title: 'Test', destination: 'Rzym' } as Partial<TripPlan>;

describe('storageService', () => {
  beforeEach(() => values.clear());

  it('saves, updates and deletes trips', () => {
    saveTrip(trip as TripPlan);
    expect(getSavedTrips()).toHaveLength(1);
    saveTrip({ ...trip, title: 'Updated' } as TripPlan);
    expect(getSavedTrips()[0].title).toBe('Updated');
    deleteSavedTrip('trip-1');
    expect(getSavedTrips()).toEqual([]);
  });

  it('stores and clears the active trip', () => {
    setActiveTrip(trip as TripPlan);
    expect(getActiveTrip()?.id).toBe('trip-1');
    setActiveTrip(null);
    expect(getActiveTrip()).toBeNull();
  });

  it('persists application settings', () => {
    saveAppSettings({ theme: 'light', language: 'en' });
    expect(values.get('voyage_ai_theme')).toBe('light');
    expect(values.get('voyage_ai_language')).toBe('en');
  });
});
