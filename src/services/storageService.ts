import { TripPlan, AppSettings, AIProvider } from '../types/travel';

const STORAGE_KEYS = {
  SAVED_TRIPS: 'voyage_ai_saved_trips',
  ACTIVE_TRIP: 'voyage_ai_active_trip',
  AI_PROVIDER: 'voyage_ai_provider',
  GEMINI_API_KEY: 'voyage_ai_gemini_api_key',
  OPENAI_API_KEY: 'voyage_ai_openai_api_key',
  GEMINI_MODEL: 'voyage_ai_gemini_model',
  OPENAI_MODEL: 'voyage_ai_openai_model',
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

export function getAiProvider(): AIProvider {
  return (localStorage.getItem(STORAGE_KEYS.AI_PROVIDER) as AIProvider) || 'gemini';
}

export function setAiProvider(provider: AIProvider): void {
  localStorage.setItem(STORAGE_KEYS.AI_PROVIDER, provider);
}

export function getStoredGeminiApiKey(): string {
  return localStorage.getItem(STORAGE_KEYS.GEMINI_API_KEY) || '';
}

export function setStoredGeminiApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEYS.GEMINI_API_KEY, key.trim());
}

export function getStoredOpenAiApiKey(): string {
  return localStorage.getItem(STORAGE_KEYS.OPENAI_API_KEY) || '';
}

export function setStoredOpenAiApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEYS.OPENAI_API_KEY, key.trim());
}

// Backward compatibility helper
export function getStoredApiKey(): string {
  const provider = getAiProvider();
  return provider === 'openai' ? getStoredOpenAiApiKey() : getStoredGeminiApiKey();
}

export function setStoredApiKey(key: string): void {
  const provider = getAiProvider();
  if (provider === 'openai') {
    setStoredOpenAiApiKey(key);
  } else {
    setStoredGeminiApiKey(key);
  }
}

export function getStoredGeminiModel(): string {
  return localStorage.getItem(STORAGE_KEYS.GEMINI_MODEL) || 'gemini-2.0-flash';
}

export function setStoredGeminiModel(model: string): void {
  localStorage.setItem(STORAGE_KEYS.GEMINI_MODEL, model);
}

export function getStoredOpenAiModel(): string {
  return localStorage.getItem(STORAGE_KEYS.OPENAI_MODEL) || 'gpt-4o-mini';
}

export function setStoredOpenAiModel(model: string): void {
  localStorage.setItem(STORAGE_KEYS.OPENAI_MODEL, model);
}

export function getStoredModel(): string {
  const provider = getAiProvider();
  return provider === 'openai' ? getStoredOpenAiModel() : getStoredGeminiModel();
}

export function setStoredModel(model: string): void {
  const provider = getAiProvider();
  if (provider === 'openai') {
    setStoredOpenAiModel(model);
  } else {
    setStoredGeminiModel(model);
  }
}

export function hasAnyApiKey(): boolean {
  return !!getStoredGeminiApiKey() || !!getStoredOpenAiApiKey();
}

export function getAppSettings(): AppSettings {
  const provider = getAiProvider();
  return {
    aiProvider: provider,
    geminiApiKey: getStoredGeminiApiKey(),
    openaiApiKey: getStoredOpenAiApiKey(),
    selectedGeminiModel: getStoredGeminiModel(),
    selectedOpenAIModel: getStoredOpenAiModel(),
    selectedModel: getStoredModel(),
    theme: (localStorage.getItem(STORAGE_KEYS.THEME) as any) || 'dark',
    language: 'pl'
  };
}

export function saveAppSettings(settings: Partial<AppSettings>): void {
  if (settings.aiProvider !== undefined) setAiProvider(settings.aiProvider);
  if (settings.geminiApiKey !== undefined) setStoredGeminiApiKey(settings.geminiApiKey);
  if (settings.openaiApiKey !== undefined) setStoredOpenAiApiKey(settings.openaiApiKey);
  if (settings.selectedGeminiModel !== undefined) setStoredGeminiModel(settings.selectedGeminiModel);
  if (settings.selectedOpenAIModel !== undefined) setStoredOpenAiModel(settings.selectedOpenAIModel);
  if (settings.theme !== undefined) localStorage.setItem(STORAGE_KEYS.THEME, settings.theme);
}
