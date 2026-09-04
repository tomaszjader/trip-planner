import { describe, expect, it } from 'vitest';
import { validateChatResponse, validateTripPlan } from './aiResponseValidation';

describe('AI response validation', () => {
  it('accepts a valid chat response and removes null preferences', () => {
    const response = validateChatResponse({
      reply: 'Gotowe',
      extractedPreferences: { destination: 'Rzym', durationDays: 3, pace: null },
      suggestions: ['Wygeneruj plan'],
      readyToGenerate: true
    });

    expect(response.reply).toBe('Gotowe');
    expect(response.extractedPreferences).toEqual({ destination: 'Rzym', durationDays: 3 });
  });

  it('rejects malformed chat responses', () => {
    expect(() => validateChatResponse({ reply: '', readyToGenerate: 'yes' })).toThrow();
  });

  it('rejects trip plans with invalid coordinates', () => {
    expect(() => validateTripPlan({ centerCoordinates: { lat: 999, lng: 0 } }, {} as never)).toThrow();
  });
});
