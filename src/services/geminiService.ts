import { TripPlan, TripGenerationResult, TravelPreferences, ChatMessage, ActivitySpot } from '../types/travel';
import { generateDynamicTrip } from './presetTrips';
import { validateChatResponse, validateTripPlan, ValidatedChatResponse } from './aiResponseValidation';
import {
  getAiProvider,
  getStoredGeminiModel,
  getStoredOpenAiModel,
  getAppSettings
} from './storageService';

const OUTPUT_LANGUAGE_NAMES: Record<ReturnType<typeof getAppSettings>['language'], string> = {
  pl: 'Polish',
  en: 'English',
  de: 'German',
  ru: 'Russian'
};

function getOutputLanguage(): string {
  return OUTPUT_LANGUAGE_NAMES[getAppSettings().language];
}

/**
 * Validates and ensures coordinates are realistic GPS numbers.
 */
function sanitizeCoordinates(coords: any, fallbackCenter: { lat: number; lng: number }): { lat: number; lng: number } {
  if (coords && typeof coords.lat === 'number' && typeof coords.lng === 'number' && !isNaN(coords.lat) && !isNaN(coords.lng)) {
    if (coords.lat >= -90 && coords.lat <= 90 && coords.lng >= -180 && coords.lng <= 180 && (coords.lat !== 0 || coords.lng !== 0)) {
      return { lat: coords.lat, lng: coords.lng };
    }
  }
  return fallbackCenter;
}

/**
 * Builds the comprehensive prompt for generating a detailed trip plan.
 */
function buildTripPrompt(preferences: TravelPreferences): string {
  const outputLanguage = getOutputLanguage();
  return `
Jesteś elitarnym przewodnikiem i planistą podróży w aplikacji VoyageAI.
Stwórz perfekcyjny, niesamowicie szczegółowy i realistyczny plan podróży. Wszystkie treści przeznaczone dla użytkownika (tytuły, opisy, porady, etykiety i tłumaczenia) napisz w języku: ${outputLanguage}.
Format odpowiedzi: CZYSTY JSON bez żadnych znaczników Markdown wokół (bez \`\`\`json).

Wymogi dla planu podróży:
- Destynacja: ${preferences.destination}
- Czas trwania: ${preferences.durationDays} dni
- Pora roku/Termin: ${preferences.season || 'optymalna pora'}
- Tempo podróży: ${preferences.pace === 'intense' ? 'intensywne (bogaty program od rana do nocy)' : preferences.pace === 'relaxed' ? 'spokojne / chillout' : 'zbalansowane'}
- Towarzysze: ${preferences.group}
- Zainteresowania: ${preferences.interests.join(', ')}
- Budżet: ${preferences.budget}
- Transport: ${preferences.transport}
- Dieta: ${preferences.dietary}
${preferences.customNotes ? `- Dodatkowe życzenia: ${preferences.customNotes}` : ''}
${preferences.startingLocation ? `- Punkt startowy: ${preferences.startingLocation}` : ''}

KRYTYCZNIE WAŻNE DLA MAPY:
Każda atrakcja (activity) i restauracja (restaurant) MUSI posiadać DOKŁADNE, PRAWDZIWE współrzędne geograficzne GPS ("coordinates": { "lat": number, "lng": number }) odpowiadające rzeczywistej lokalizacji tego miejsca na Ziemi.
Również "centerCoordinates" musi być dokładnym centrum ${preferences.destination}.
Jeśli znasz oficjalną stronę atrakcji lub restauracji, dodaj "sourceUrl" z pełnym adresem https://. Nie wymyślaj linków: jeśli nie masz pewnego źródła, pomiń to pole. Ceny, godziny i dostępność zawsze oznacz jako orientacyjne w opisie lub poradzie.

Struktura JSON:
{
  "id": "trip-${Date.now()}",
  "createdAt": "${new Date().toISOString()}",
  "title": "Chwytliwy, autentyczny tytuł wycieczki",
  "destination": "${preferences.destination}",
  "country": "Kraj",
  "tagline": "Poetycki jednozdaniowy podtytuł",
  "heroImage": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
  "summary": "Inspirujące 2-3 zdaniowe podsumowanie całego wyjazdu",
  "preferences": (przekazany obiekt preferencji),
  "centerCoordinates": { "lat": 48.8566, "lng": 2.3522 },
  "defaultZoom": 13,
  "days": [
    {
      "dayNumber": 1,
      "title": "Dzień 1: Tytuł pierwszego dnia",
      "theme": "Motyw przewodni dnia",
      "summary": "Opis planu i nastroju tego dnia",
      "activities": [
        {
          "id": "act-1-1",
          "timeSlot": "morning",
          "time": "09:00 - 12:00",
          "title": "Dokładna nazwa prawdziwego zabytku / punktu",
          "category": "Zabytki UNESCO / Muzea / Plaża / Widok / Kulinaria itp.",
          "description": "Fascynujący, konkretny opis co tam zobaczymy i zrobimy",
          "practicalTip": "Konkretna porada (bilety, kolejki, godziny otwarcia, kody zniżkowe)",
          "estimatedCost": "np. 15 EUR lub Wstęp bezpłatny",
          "durationHours": 3,
          "coordinates": { "lat": 48.8584, "lng": 2.2945 },
          "address": "Prawdziwy adres lub nazwa ulicy/dzielnicy",
          "transitToNext": "Wskazówka jak dotrzeć do następnego punktu"
        }
      ]
    }
  ],
  "culinaryGuide": {
    "dishes": [
      {
        "id": "dish-1",
        "name": "Nazwa autentycznego dania regionalnego",
        "type": "dish",
        "description": "Składniki, sposób przyrządzenia i profil smakowy",
        "mustTryWhy": "Dlaczego absolutnie warto spróbować",
        "typicalPrice": "np. 12 - 18 EUR",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "restaurants": [
      {
        "id": "rest-1",
        "name": "Prawdziwa nazwa istniejącego, kultowego lokalu",
        "category": "traditional",
        "categoryLabel": "Tradycyjna Tawerna / Bistro / Osteria",
        "description": "Dlaczego to miejsce jest wyjątkowe i uwielbiane",
        "recommendedDish": "Polecane danie flagowe",
        "priceRange": "$$",
        "address": "Prawdziwy adres lokalu",
        "coordinates": { "lat": 48.8530, "lng": 2.3499 }
      }
    ]
  },
  "budget": {
    "currency": "EUR / USD / PLN / itp.",
    "accommodationPerDay": "szacowany koszt noclegu/dzień",
    "foodPerDay": "szacowany koszt wyżywienia/dzień",
    "activitiesPerDay": "szacowany koszt biletów/dzień",
    "localTransportPerDay": "szacowany koszt transportu/dzień",
    "estimatedTotalPerPerson": "łączny szacowany koszt na 1 osobę",
    "moneySavingTips": ["3 praktyczne porady jak zaoszczędzić na miejscu"]
  },
  "packingList": [
    { "id": "p1", "category": "clothing", "categoryLabel": "Ubrania", "item": "Co spakować", "isChecked": false },
    { "id": "p2", "category": "documents", "categoryLabel": "Dokumenty", "item": "Wymagane dokumenty", "isChecked": false },
    { "id": "p3", "category": "electronics", "categoryLabel": "Elektronika", "item": "Sprzęt i przejściówki", "isChecked": false }
  ],
  "practicalAdvice": {
    "bestSeason": "Najlepszy termin na wizytę",
    "localCurrency": "Waluta i wskazówki płatności bezgotówkowych",
    "languageAndPhrases": [
      { "phrase": "Zwrot lokalny", "translation": "Tłumaczenie na polski" }
    ],
    "transportTips": "Wskazówki dot. metra, autobusów, biletów dziennych",
    "safetyTips": "Kwestie bezpieczeństwa i unikanie pułapek turystycznych",
    "culturalEtiquette": "Zwyczaje kulturowe i napiwki",
    "emergencyNumber": "Numer alarmowy"
  }
}
`;
}

/**
 * Generates trip via OpenAI API (GPT-4o, GPT-4o-mini, GPT-4.5, o3-mini).
 */
async function generateTripWithOpenAI(apiKey: string, model: string, preferences: TravelPreferences): Promise<TripPlan> {
  const prompt = buildTripPrompt(preferences);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Jesteś ekspertem podróżniczym i zwracasz wyłącznie poprawny obiekt JSON zgodny ze strukturą TripPlan.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const rawText = data?.choices?.[0]?.message?.content;
  if (!rawText) throw new Error('Brak odpowiedzi od OpenAI');

  const parsed: unknown = JSON.parse(rawText);
  const validated = validateTripPlan(parsed, preferences);
  return postProcessTripPlan(validated, preferences);
}

/**
 * Generates trip via Google Gemini API (Gemini 2.5 Pro, 2.5 Flash, 2.0 Flash, 1.5 Pro).
 */
async function generateTripWithGemini(apiKey: string, model: string, preferences: TravelPreferences): Promise<TripPlan> {
  const prompt = buildTripPrompt(preferences);
  const targetModel = model || 'gemini-2.0-flash';

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('Brak odpowiedzi od Gemini');

  const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
  const parsed: unknown = JSON.parse(cleanedText);
  const validated = validateTripPlan(parsed, preferences);
  return postProcessTripPlan(validated, preferences);
}

/**
 * Post-processes the generated trip plan, verifying coordinates and fallback fields.
 */
function postProcessTripPlan(plan: TripPlan, preferences: TravelPreferences): TripPlan {
  plan.preferences = preferences;
  const center = sanitizeCoordinates(plan.centerCoordinates, { lat: 48.8566, lng: 2.3522 });
  plan.centerCoordinates = center;

  if (plan.days) {
    plan.days.forEach((day, dIdx) => {
      if (day.activities) {
        day.activities.forEach((act, aIdx) => {
          act.id = act.id || `act-${dIdx + 1}-${aIdx + 1}`;
          act.coordinates = sanitizeCoordinates(act.coordinates, center);
        });
      }
    });
  }

  if (plan.culinaryGuide?.restaurants) {
    plan.culinaryGuide.restaurants.forEach(rest => {
      rest.coordinates = sanitizeCoordinates(rest.coordinates, center);
    });
  }

  return plan;
}

/**
 * Main entry point: Generates a full TripPlan using the active AI provider (Gemini or OpenAI),
 * or falls back gracefully to the rich offline verified travel database.
 */
export async function generateTripWithAI(preferences: TravelPreferences): Promise<TripGenerationResult> {
  const provider = getAiProvider();
  const model = provider === 'openai' ? getStoredOpenAiModel() : getStoredGeminiModel();

  try {
    const response = await fetch('/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, model, prompt: buildTripPrompt(preferences) })
    });

    if (!response.ok) throw new Error(`Backend AI error ${response.status}`);
    const parsed: unknown = await response.json();
    const validated = validateTripPlan(parsed, preferences);
    return { plan: postProcessTripPlan(validated, preferences), source: 'ai' };
  } catch (err) {
    console.warn('Backend AI unavailable, using offline generator:', err);
  }

  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    plan: generateDynamicTrip(preferences),
    source: 'offline',
    notice: 'Serwer AI jest niedostępny lub nie ma skonfigurowanego klucza. Utworzono plan w trybie offline.'
  };
}

/**
 * Handles conversational chat flow with Gemini or OpenAI or intelligent local assistant.
 */
export async function sendChatMessage(
  history: ChatMessage[],
  userMessage: string,
  currentPreferences: Partial<TravelPreferences>
): Promise<ValidatedChatResponse> {
  const provider = getAiProvider();

  const outputLanguage = getOutputLanguage();
  const systemInstruction = `
Jesteś przyjaznym, profesjonalnym doradcą i asystentem podróżniczym w aplikacji VoyageAI.
Rozmawiasz z użytkownikiem wyłącznie w języku ${outputLanguage}. Twoim zadaniem jest pomóc użytkownikowi zaplanować idealną podróż poprzez naturalny dialog.
Zadawaj celne pytania, jeśli brakuje kluczowych informacji (dokąd, na ile dni, jaki styl: relaks vs zwiedzanie vs kulinaria vs trekking, jaki budżet, z kim podróżuje).
Gdy masz już wystarczająco dużo szczegółów (lub gdy użytkownik wprost poprosi o plan), podsumuj jego wybory i zaproponuj wygenerowanie planu.

Zwróć odpowiedź w czystym formacie JSON:
{
  "reply": "Twoja miła, konwersacyjna odpowiedź w języku ${outputLanguage}",
  "extractedPreferences": {
    "destination": "wykryte miasto/kraj lub null",
    "durationDays": "liczba dni lub null",
    "pace": "relaxed | balanced | intense lub null",
    "group": "solo | couple | family | friends lub null",
    "budget": "budget | medium | luxury lub null",
    "interests": ["history", "nature", "food", "museums", "beaches", "nightlife", "hidden_gems"] lub []
  },
  "suggestions": ["3 krótkie klikalne podpowiedzi dla użytkownika jako szybkie odpowiedzi"],
  "readyToGenerate": true/false (true jeśli znana jest destynacja i liczba dni/styl)
}
`;

  const conversationContext = `Historia rozmowy:\n${history.map(m => `${m.sender}: ${m.text}`).join('\n')}\nUżytkownik: ${userMessage}\nAktualnie zebrane preferencje: ${JSON.stringify(currentPreferences)}`;

  try {
    const model = provider === 'openai' ? getStoredOpenAiModel() : getStoredGeminiModel();
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, model, systemInstruction, conversationContext })
    });
    if (!response.ok) throw new Error(`Backend AI error ${response.status}`);
    return validateChatResponse(await response.json());
  } catch (e) {
    console.warn('Backend chat unavailable, using local assistant:', e);
  }

  // Local Intelligent Chatbot Fallback
  await new Promise(r => setTimeout(r, 500));
  const lower = userMessage.toLowerCase();
  const updatedPrefs: Partial<TravelPreferences> = { ...currentPreferences };

  const knownCities = [
    { key: 'rzym', name: 'Rzym' },
    { key: 'barcelon', name: 'Barcelona' },
    { key: 'tokio', name: 'Tokio' },
    { key: 'tokyo', name: 'Tokio' },
    { key: 'paryż', name: 'Paryż' },
    { key: 'paris', name: 'Paryż' },
    { key: 'islandi', name: 'Islandia' },
    { key: 'nowy jork', name: 'Nowy Jork' },
    { key: 'bali', name: 'Bali' },
    { key: 'lizbon', name: 'Lizbona' },
    { key: 'kraków', name: 'Kraków' },
    { key: 'zakopan', name: 'Zakopane' },
    { key: 'gdańsk', name: 'Gdańsk' },
    { key: 'wrocław', name: 'Wrocław' },
    { key: 'warszaw', name: 'Warszawa' },
    { key: 'londyn', name: 'Londyn' },
    { key: 'prag', name: 'Praga' },
    { key: 'wiedeń', name: 'Wiedeń' },
    { key: 'amsterdam', name: 'Amsterdam' },
    { key: 'madryt', name: 'Madryt' },
    { key: 'berlin', name: 'Berlin' },
    { key: 'wenecj', name: 'Wenecja' },
    { key: 'florencj', name: 'Florencja' }
  ];

  for (const c of knownCities) {
    if (lower.includes(c.key)) {
      updatedPrefs.destination = c.name;
      break;
    }
  }

  const dayMatch = lower.match(/(\d+)\s*(dni|dzień|dniowy|dniowa|days)/);
  if (dayMatch) {
    updatedPrefs.durationDays = parseInt(dayMatch[1], 10);
  } else if (lower.includes('weekend') || lower.includes('weekendu')) {
    updatedPrefs.durationDays = 3;
  } else if (lower.includes('tydzień') || lower.includes('tygodnia')) {
    updatedPrefs.durationDays = 7;
  }

  if (lower.includes('relaks') || lower.includes('spokoj') || lower.includes('chill') || lower.includes('leniwie')) {
    updatedPrefs.pace = 'relaxed';
  } else if (lower.includes('intensyw') || lower.includes('aktywnie') || lower.includes('dużo zwiedzać') || lower.includes('świtu do nocy')) {
    updatedPrefs.pace = 'intense';
  } else if (lower.includes('zbalans') || lower.includes('umiarkowan')) {
    updatedPrefs.pace = 'balanced';
  }

  if (lower.includes('dziewczyn') || lower.includes('chłopak') || lower.includes('żon') || lower.includes('męż') || lower.includes('parą') || lower.includes('we dwoje')) {
    updatedPrefs.group = 'couple';
  } else if (lower.includes('znajom') || lower.includes('przyjaciół') || lower.includes('ekip') || lower.includes('grup')) {
    updatedPrefs.group = 'friends';
  } else if (lower.includes('dziećmi') || lower.includes('rodzin')) {
    updatedPrefs.group = 'family';
  } else if (lower.includes('sam') || lower.includes('solo') || lower.includes('samodzielnie')) {
    updatedPrefs.group = 'solo';
  }

  const interests: string[] = updatedPrefs.interests || [];
  if (lower.includes('jedzeni') || lower.includes('gastro') || lower.includes('kuchn') || lower.includes('kulinari') || lower.includes('restaurac') || lower.includes('smak')) {
    if (!interests.includes('food')) interests.push('food');
  }
  if (lower.includes('zabytek') || lower.includes('zabytk') || lower.includes('histori') || lower.includes('starożytn') || lower.includes('katedr')) {
    if (!interests.includes('history')) interests.push('history');
  }
  if (lower.includes('natur') || lower.includes('gór') || lower.includes('trekking') || lower.includes('krajobraz')) {
    if (!interests.includes('nature')) interests.push('nature');
  }
  if (lower.includes('plaż') || lower.includes('morz') || lower.includes('kąpiel') || lower.includes('słońc')) {
    if (!interests.includes('beaches')) interests.push('beaches');
  }
  if (lower.includes('imprez') || lower.includes('klub') || lower.includes('bar') || lower.includes('nocn')) {
    if (!interests.includes('nightlife')) interests.push('nightlife');
  }
  if (lower.includes('muze') || lower.includes('sztuk') || lower.includes('galeri')) {
    if (!interests.includes('museums')) interests.push('museums');
  }
  updatedPrefs.interests = interests as any;

  if (!updatedPrefs.destination) {
    return {
      reply: 'Świetnie! Z przyjemnością zaplanuję dla Ciebie wymarzoną podróż. ✈️🌍 Dokąd chciałbyś wyruszyć? (np. Paryż, Lizbona, Nowy Jork, Tokio, Rzym, Barcelona, Islandia)',
      extractedPreferences: updatedPrefs,
      suggestions: ['3 dni w Paryżu z rejsem po Sekwanie', '4 dni w Lizbonie (owoce morza i punkty widokowe)', '5 dni w Tokio – popkultura i tradycja'],
      readyToGenerate: false
    };
  }

  if (!updatedPrefs.durationDays) {
    return {
      reply: `Wspaniały wybór! **${updatedPrefs.destination}** kryje mnóstwo niezwykłych miejsc. Na ile dni planujesz ten wyjazd?`,
      extractedPreferences: updatedPrefs,
      suggestions: ['Na weekend (3 dni)', 'Na 4-5 dni', 'Na pełen tydzień (7 dni)'],
      readyToGenerate: false
    };
  }

  if (!updatedPrefs.pace && !updatedPrefs.interests?.length) {
    return {
      reply: `Świetnie! Mamy wybrane: **${updatedPrefs.destination}** na **${updatedPrefs.durationDays} dni**. Jaki styl najbardziej Ci odpowiada? Wolisz intensywne zwiedzanie zabytków, relaks i dobre jedzenie, czy zbalansowane tempo?`,
      extractedPreferences: updatedPrefs,
      suggestions: ['Zbalansowane tempo + dobre jedzenie', 'Intensywne zwiedzanie od rana do nocy', 'Spokojny chillout, kawiarnie i plaża'],
      readyToGenerate: false
    };
  }

  return {
    reply: `Wszystko gotowe do wygenerowania planu! 🌟\n\n- **Destynacja:** ${updatedPrefs.destination}\n- **Liczba dni:** ${updatedPrefs.durationDays} dni\n- **Tempo:** ${updatedPrefs.pace === 'intense' ? 'Intensywne' : updatedPrefs.pace === 'relaxed' ? 'Relaks' : 'Zbalansowane'}\n- **Towarzysze:** ${updatedPrefs.group || 'Para'}\n\nKliknij przycisk poniżej, a natychmiast ułożę dla Ciebie kompletny harmonogram dzień po dniu z mapą, trasami, lokalną kuchnią i kosztorysem!`,
    extractedPreferences: updatedPrefs,
    suggestions: ['🚀 Wygeneruj kompletny plan podróży', 'Doprecyzuj budżet', 'Dodaj więcej ukrytych perełek'],
    readyToGenerate: true
  };
}
