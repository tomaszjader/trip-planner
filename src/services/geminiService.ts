import { TripPlan, TravelPreferences, ChatMessage } from '../types/travel';
import { generateDynamicTrip } from './presetTrips';
import { getStoredApiKey, getStoredModel } from './storageService';

/**
 * Generates a full TripPlan using Gemini AI API if API key is provided,
 * otherwise falls back seamlessly to the offline intelligent trip generator.
 */
export async function generateTripWithAI(preferences: TravelPreferences): Promise<TripPlan> {
  const apiKey = getStoredApiKey();
  const model = getStoredModel() || 'gemini-1.5-flash';

  if (!apiKey) {
    // Graceful offline dynamic generation
    await new Promise(resolve => setTimeout(resolve, 800)); // natural micro-delay
    return generateDynamicTrip(preferences);
  }

  const prompt = `
Jesteś elitarnym ekspertem podróżniczym i przewodnikiem AI o nazwie VoyageAI.
Wygeneruj niesamowicie szczegółowy, spersonalizowany i zachwycający plan podróży w języku polskim w formacie czystego JSON (bez markdownu wokół, tylko JSON zgodny ze strukturą).

Oto preferencje użytkownika:
- Destynacja: ${preferences.destination}
- Liczba dni: ${preferences.durationDays}
- Pora roku/Miesiąc: ${preferences.season || 'optymalna pora'}
- Tempo podróży: ${preferences.pace === 'intense' ? 'intensywne (od świtu do nocy)' : preferences.pace === 'relaxed' ? 'spokojne / relaks' : 'zbalansowane'}
- Skład grupy: ${preferences.group}
- Główne zainteresowania i priorytety: ${preferences.interests.join(', ')}
- Budżet: ${preferences.budget}
- Transport: ${preferences.transport}
- Preferencje żywieniowe: ${preferences.dietary}
${preferences.customNotes ? `- Dodatkowe uwagi: ${preferences.customNotes}` : ''}
${preferences.startingLocation ? `- Miejsce startowe: ${preferences.startingLocation}` : ''}

Zwróć obiekt JSON o strukturze:
{
  "id": "trip-${Date.now()}",
  "createdAt": "${new Date().toISOString()}",
  "title": "Chwytliwy, piękny tytuł planu (np. Magia Rzymu...)",
  "destination": "${preferences.destination}",
  "country": "Kraj",
  "tagline": "Jednozdaniowy poetycki podtytuł",
  "heroImage": "URL do zdjęcia z Unsplash na temat tej destynacji",
  "summary": "2-3 zdaniowe inspirujące podsumowanie planu",
  "preferences": (przekaż otrzymany obiekt preferencji),
  "centerCoordinates": { "lat": number, "lng": number },
  "defaultZoom": 13,
  "days": [
    {
      "dayNumber": 1,
      "title": "Dzień 1: Tytuł dnia",
      "theme": "Motyw przewodni dnia",
      "summary": "Krótki opis dnia",
      "activities": [
        {
          "id": "act-1-1",
          "timeSlot": "morning" | "afternoon" | "evening",
          "time": "np. 09:00 - 11:30",
          "title": "Nazwa miejsca lub atrakcji",
          "category": "Kategoria (np. Zabytki, Plaża, Kulinaria)",
          "description": "Fascynujący opis miejsca i dlaczego warto je odwiedzić",
          "practicalTip": "Konkretna, bezcenna porada praktyczna (bilety, godziny, kolejki)",
          "estimatedCost": "np. 15 EUR lub wstęp bezpłatny",
          "durationHours": 2.5,
          "coordinates": { "lat": number, "lng": number },
          "address": "Adres lub okolica",
          "transitToNext": "Wskazówka jak dotrzeć do kolejnego punktu"
        }
      ]
    }
  ],
  "culinaryGuide": {
    "dishes": [
      {
        "id": "dish-1",
        "name": "Nazwa tradycyjnego dania",
        "type": "dish" | "drink" | "dessert" | "street_food",
        "description": "Z czego się składa i jak smakuje",
        "mustTryWhy": "Dlaczego absolutnie trzeba tego spróbować",
        "typicalPrice": "np. 10 - 15 EUR"
      }
    ],
    "restaurants": [
      {
        "id": "rest-1",
        "name": "Nazwa konkretnego polecanego lokalu",
        "category": "traditional" | "street_food" | "cafe" | "view_bar" | "fine_dining",
        "categoryLabel": "np. Tradycyjna tawerna",
        "description": "Dlaczego to miejsce jest kultowe",
        "recommendedDish": "Polecane danie",
        "priceRange": "$" | "$$" | "$$$" | "$$$$",
        "address": "Adres lokalu",
        "coordinates": { "lat": number, "lng": number }
      }
    ]
  },
  "budget": {
    "currency": "EUR / PLN / USD / itp.",
    "accommodationPerDay": "szacowany koszt noclegu/dzień",
    "foodPerDay": "szacowany koszt jedzenia/dzień",
    "activitiesPerDay": "szacowany koszt atrakcji/dzień",
    "localTransportPerDay": "szacowany koszt transportu/dzień",
    "estimatedTotalPerPerson": "łączny szacunek za cały wyjazd",
    "moneySavingTips": ["3 konkretne porady jak zaoszczędzić"]
  },
  "packingList": [
    { "id": "p1", "category": "documents" | "clothing" | "electronics" | "cosmetics" | "special", "categoryLabel": "Kategoria", "item": "Co spakować", "isChecked": false }
  ],
  "practicalAdvice": {
    "bestSeason": "Najlepsza pora na wyjazd",
    "localCurrency": "Waluta i porady płatnicze",
    "languageAndPhrases": [
      { "phrase": "Zwrot w lokalnym języku", "translation": "Tłumaczenie na polski" }
    ],
    "transportTips": "Wskazówki dot. poruszania się",
    "safetyTips": "Wskazówki dot. bezpieczeństwa",
    "culturalEtiquette": "Zwyczaje kulturowe i savoir-vivre",
    "emergencyNumber": "Numer alarmowy"
  }
}
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
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
      console.warn('Gemini API response error, falling back to local engine:', response.statusText);
      return generateDynamicTrip(preferences);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return generateDynamicTrip(preferences);
    }

    const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedPlan = JSON.parse(cleanedText) as TripPlan;
    parsedPlan.preferences = preferences;
    return parsedPlan;
  } catch (error) {
    console.error('Error generating trip with Gemini API, fallback used:', error);
    return generateDynamicTrip(preferences);
  }
}

/**
 * Handles conversational chat flow with Gemini or an intelligent local dialogue agent.
 */
export async function sendChatMessage(
  history: ChatMessage[],
  userMessage: string,
  currentPreferences: Partial<TravelPreferences>
): Promise<{ reply: string; extractedPreferences?: Partial<TravelPreferences>; suggestions?: string[]; readyToGenerate?: boolean }> {
  const apiKey = getStoredApiKey();

  if (apiKey) {
    try {
      const systemInstruction = `
Jesteś przyjaznym, profesjonalnym doradcą i asystentem podróżniczym w aplikacji VoyageAI.
Rozmawiasz po polsku. Twoim zadaniem jest pomóc użytkownikowi zaplanować idealną podróż poprzez naturalny dialog.
Zadawaj celne pytania, jeśli brakuje kluczowych informacji (dokąd, na ile dni, jaki styl: relaks vs zwiedzanie vs kulinaria vs trekking, jaki budżet, z kim podróżuje).
Gdy masz już wystarczająco dużo szczegółów (lub gdy użytkownik wprost poprosi o plan), podsumuj jego wybory i zaproponuj wygenerowanie planu.

Zwróć odpowiedź w czystym formacie JSON:
{
  "reply": "Twoja miła, konwersacyjna odpowiedź po polsku",
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

      const prompt = `Historia rozmowy:\n${history.map(m => `${m.sender}: ${m.text}`).join('\n')}\nUżytkownik: ${userMessage}\nAktualnie zebrane preferencje: ${JSON.stringify(currentPreferences)}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: `${systemInstruction}\n\n${prompt}` }] }
          ],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: 'application/json'
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText.replace(/```json/g, '').replace(/```/g, '').trim());
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Gemini chat failed, using local assistant logic', e);
    }
  }

  // Local Intelligent Chatbot Logic (Polish)
  await new Promise(r => setTimeout(r, 600));

  const lower = userMessage.toLowerCase();
  const updatedPrefs: Partial<TravelPreferences> = { ...currentPreferences };

  // Detect Destination
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
    { key: 'londyn', name: 'Londyn' },
    { key: 'prag', name: 'Praga' },
    { key: 'wiedeń', name: 'Wiedeń' },
    { key: 'amsterdam', name: 'Amsterdam' }
  ];

  for (const c of knownCities) {
    if (lower.includes(c.key)) {
      updatedPrefs.destination = c.name;
      break;
    }
  }

  // Detect Duration
  const dayMatch = lower.match(/(\d+)\s*(dni|dzień|dniowy|dniowa|days)/);
  if (dayMatch) {
    updatedPrefs.durationDays = parseInt(dayMatch[1], 10);
  } else if (lower.includes('weekend') || lower.includes('weekendu')) {
    updatedPrefs.durationDays = 3;
  } else if (lower.includes('tydzień') || lower.includes('tygodnia')) {
    updatedPrefs.durationDays = 7;
  }

  // Detect Pace
  if (lower.includes('relaks') || lower.includes('spokoj') || lower.includes('chill') || lower.includes('leniwie')) {
    updatedPrefs.pace = 'relaxed';
  } else if (lower.includes('intensyw') || lower.includes('aktywnie') || lower.includes('dużo zwiedzać') || lower.includes('świtu do nocy')) {
    updatedPrefs.pace = 'intense';
  } else if (lower.includes('zbalans') || lower.includes('umiarkowan')) {
    updatedPrefs.pace = 'balanced';
  }

  // Detect Group
  if (lower.includes('dziewczyn') || lower.includes('chłopak') || lower.includes('żon') || lower.includes('męż') || lower.includes('parą') || lower.includes('we dwoje')) {
    updatedPrefs.group = 'couple';
  } else if (lower.includes('znajom') || lower.includes('przyjaciół') || lower.includes('ekip') || lower.includes('grup')) {
    updatedPrefs.group = 'friends';
  } else if (lower.includes('dziećmi') || lower.includes('rodzin')) {
    updatedPrefs.group = 'family';
  } else if (lower.includes('sam') || lower.includes('solo') || lower.includes('samodzielnie')) {
    updatedPrefs.group = 'solo';
  }

  // Detect Interests
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

  // Decide response logic
  if (!updatedPrefs.destination) {
    return {
      reply: 'Świetnie! Z przyjemnością zaplanuję dla Ciebie niezapomnianą podróż. Dokąd chciałbyś wyruszyć? Masz już upatrzone konkretne miasto lub kraj (np. Rzym, Barcelona, Tokio, Islandia), czy szukasz inspiracji?',
      extractedPreferences: updatedPrefs,
      suggestions: ['3 dni w Rzymie dla dwojga', 'Weekend w Barcelonie (kulinaria i plaża)', '5 dni w Tokio – popkultura i zabytki'],
      readyToGenerate: false
    };
  }

  if (!updatedPrefs.durationDays) {
    return {
      reply: `Wspaniały wybór! ${updatedPrefs.destination} to fascynujące miejsce. Na ile dni planujesz wyjazd? (np. weekend 3 dni, 5 dni, czy pełen tydzień?)`,
      extractedPreferences: updatedPrefs,
      suggestions: ['Na przedłużony weekend (3 dni)', 'Na 5 dni', 'Na pełen tydzień (7 dni)'],
      readyToGenerate: false
    };
  }

  if (!updatedPrefs.pace && !updatedPrefs.interests?.length) {
    return {
      reply: `Zapowiada się genialna wyprawa do: **${updatedPrefs.destination}** na **${updatedPrefs.durationDays} dni**! Jaki styl najbardziej Ci odpowiada? Wolisz intensywne zwiedzanie od rana do nocy, zbalansowany program, czy raczej leniwy chillout i skupienie na kulinariach?`,
      extractedPreferences: updatedPrefs,
      suggestions: ['Zbalansowane tempo + dobre jedzenie', 'Intensywne zwiedzanie i najważniejsze zabytki', 'Spokojny chillout, kawiarnie i plaża'],
      readyToGenerate: false
    };
  }

  // Ready state
  return {
    reply: `Mamy już wszystko, czego potrzeba do stworzenia fantastycznego planu! 🌟\n\n- **Cel:** ${updatedPrefs.destination}\n- **Czas trwania:** ${updatedPrefs.durationDays} dni\n- **Tempo:** ${updatedPrefs.pace === 'intense' ? 'Intensywne' : updatedPrefs.pace === 'relaxed' ? 'Relaks / Chill' : 'Zbalansowane'}\n- **Towarzysze:** ${updatedPrefs.group || 'Para / Znajomi'}\n\nKliknij przycisk poniżej, a natychmiast ułożę dla Ciebie kompletny harmonogram dzień po dniu, mapę, listę lokalnych przysmaków i praktyczny kosztorys!`,
    extractedPreferences: updatedPrefs,
    suggestions: ['🚀 Wygeneruj kompletny plan podróży', 'Chcę jeszcze doprecyzować budżet', 'Dodaj więcej ukrytych perełek'],
    readyToGenerate: true
  };
}
