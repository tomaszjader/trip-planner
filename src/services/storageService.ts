import { TripPlan, AppSettings } from '../types/travel';

const STORAGE_KEYS = {
  SAVED_TRIPS: 'voyage_ai_saved_trips',
  ACTIVE_TRIP: 'voyage_ai_active_trip',
  API_KEY: 'voyage_ai_gemini_api_key',
  SELECTED_MODEL: 'voyage_ai_model',
  THEME: 'voyage_ai_theme'
};

export function getSavedTrips(): TripPlan[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SAVED_TRIPS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTrip(trip: TripPlan): void {
  try {
    const existing = getSavedTrips();
    const index = existing.findIndex(t => t.id === trip.id);
    if (index >= 0) {
      existing[index] = trip;
    } else {
      existing.unshift(trip);
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_TRIPS, JSON.stringify(existing));
    setActiveTrip(trip);
  } catch (err) {
    console.error('Failed to save trip to localStorage', err);
  }
}

export function deleteSavedTrip(id: string): void {
  try {
    const existing = getSavedTrips().filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.SAVED_TRIPS, JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to delete trip from localStorage', err);
  }
}

export function getActiveTrip(): TripPlan | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_TRIP);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setActiveTrip(trip: TripPlan | null): void {
  try {
    if (trip) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_TRIP, JSON.stringify(trip));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_TRIP);
    }
  } catch (err) {
    console.error('Failed to set active trip', err);
  }
}

export function getStoredApiKey(): string {
  return localStorage.getItem(STORAGE_KEYS.API_KEY) || '';
}

export function setStoredApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEYS.API_KEY, key.trim());
}

export function getStoredModel(): string {
  return localStorage.getItem(STORAGE_KEYS.SELECTED_MODEL) || 'gemini-1.5-flash';
}

export function setStoredModel(model: string): void {
  localStorage.setItem(STORAGE_KEYS.SELECTED_MODEL, model);
}

export function getAppSettings(): AppSettings {
  return {
    geminiApiKey: getStoredApiKey(),
    selectedModel: (getStoredModel() as any) || 'gemini-1.5-flash',
    theme: (localStorage.getItem(STORAGE_KEYS.THEME) as any) || 'dark',
    language: 'pl'
  };
}

export function saveAppSettings(settings: Partial<AppSettings>): void {
  if (settings.geminiApiKey !== undefined) setStoredApiKey(settings.geminiApiKey);
  if (settings.selectedModel !== undefined) setStoredModel(settings.selectedModel);
  if (settings.theme !== undefined) localStorage.setItem(STORAGE_KEYS.THEME, settings.theme);
}
