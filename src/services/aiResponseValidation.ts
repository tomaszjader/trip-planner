import { z } from 'zod';
import { TripPlan, TravelPreferences } from '../types/travel';

const text = z.string().trim().min(1).max(5000);
const shortText = z.string().trim().min(1).max(500);
const optionalText = z.string().trim().max(2000).optional();

const coordinatesSchema = z.object({
  lat: z.number().finite().min(-90).max(90),
  lng: z.number().finite().min(-180).max(180)
});

const activitySchema = z.object({
  id: z.string().trim().max(200).optional().default(''),
  timeSlot: z.enum(['morning', 'afternoon', 'evening']),
  time: shortText,
  title: shortText,
  category: shortText,
  description: text,
  practicalTip: optionalText,
  estimatedCost: optionalText,
  durationHours: z.number().finite().positive().max(24).optional(),
  coordinates: coordinatesSchema,
  address: optionalText,
  imageUrl: z.string().url().optional(),
  transitToNext: optionalText
});

const tripPlanSchema = z.object({
  id: shortText,
  createdAt: z.string().datetime({ offset: true }),
  title: shortText,
  destination: shortText,
  country: shortText,
  tagline: text,
  heroImage: z.string().url(),
  summary: text,
  // Preferences are replaced with the trusted user input after parsing.
  preferences: z.unknown().optional(),
  centerCoordinates: coordinatesSchema,
  defaultZoom: z.number().int().min(1).max(20),
  days: z.array(z.object({
    dayNumber: z.number().int().positive().max(60),
    title: shortText,
    theme: shortText,
    summary: text,
    activities: z.array(activitySchema).min(1).max(20)
  })).min(1).max(60),
  culinaryGuide: z.object({
    dishes: z.array(z.object({
      id: shortText,
      name: shortText,
      type: z.enum(['dish', 'drink', 'dessert', 'street_food']),
      description: text,
      mustTryWhy: text,
      typicalPrice: shortText,
      imageUrl: z.string().url().optional()
    })).max(30),
    restaurants: z.array(z.object({
      id: shortText,
      name: shortText,
      category: z.enum(['traditional', 'street_food', 'cafe', 'view_bar', 'fine_dining']),
      categoryLabel: shortText,
      description: text,
      recommendedDish: shortText,
      priceRange: z.enum(['$', '$$', '$$$', '$$$$']),
      address: shortText,
      coordinates: coordinatesSchema
    })).max(30)
  }),
  budget: z.object({
    currency: shortText,
    accommodationPerDay: shortText,
    foodPerDay: shortText,
    activitiesPerDay: shortText,
    localTransportPerDay: shortText,
    estimatedTotalPerPerson: shortText,
    moneySavingTips: z.array(text).max(20)
  }),
  packingList: z.array(z.object({
    id: shortText,
    category: z.enum(['documents', 'clothing', 'electronics', 'cosmetics', 'special']),
    categoryLabel: shortText,
    item: shortText,
    isChecked: z.boolean()
  })).max(100),
  practicalAdvice: z.object({
    bestSeason: text,
    localCurrency: text,
    languageAndPhrases: z.array(z.object({
      phrase: shortText,
      translation: shortText
    })).max(30),
    transportTips: text,
    safetyTips: text,
    culturalEtiquette: text,
    emergencyNumber: shortText
  })
});

const partialPreferencesSchema = z.object({
  destination: shortText.nullable().optional(),
  durationDays: z.number().int().min(1).max(60).nullable().optional(),
  season: shortText.nullable().optional(),
  pace: z.enum(['relaxed', 'balanced', 'intense']).nullable().optional(),
  group: z.enum(['solo', 'couple', 'family', 'friends']).nullable().optional(),
  interests: z.array(z.enum([
    'history', 'nature', 'food', 'museums', 'beaches', 'nightlife',
    'hidden_gems', 'shopping', 'entertainment'
  ])).max(20).optional(),
  budget: z.enum(['budget', 'medium', 'luxury']).nullable().optional(),
  transport: z.enum(['walking_transit', 'car_rental', 'bicycle', 'mixed']).nullable().optional(),
  dietary: z.enum(['any', 'traditional', 'vegetarian', 'vegan', 'seafood', 'fine_dining']).nullable().optional(),
  customNotes: optionalText,
  startingLocation: shortText.nullable().optional()
});

const chatResponseSchema = z.object({
  reply: text,
  extractedPreferences: partialPreferencesSchema.optional(),
  suggestions: z.array(shortText).max(5).optional(),
  readyToGenerate: z.boolean().optional()
});

export type ValidatedChatResponse = {
  reply: string;
  extractedPreferences?: Partial<TravelPreferences>;
  suggestions?: string[];
  readyToGenerate?: boolean;
};

function validationError(label: string, error: z.ZodError): Error {
  const details = error.issues
    .slice(0, 5)
    .map(issue => `${issue.path.join('.') || 'root'}: ${issue.message}`)
    .join('; ');
  return new Error(`${label} ma nieprawidłową strukturę (${details})`);
}

export function validateTripPlan(value: unknown, preferences: TravelPreferences): TripPlan {
  const result = tripPlanSchema.safeParse(value);
  if (!result.success) throw validationError('Odpowiedź z planem', result.error);

  return { ...result.data, preferences } as TripPlan;
}

export function validateChatResponse(value: unknown): ValidatedChatResponse {
  const result = chatResponseSchema.safeParse(value);
  if (!result.success) throw validationError('Odpowiedź czatu', result.error);

  const extractedPreferences = result.data.extractedPreferences
    ? Object.fromEntries(
        Object.entries(result.data.extractedPreferences).filter(([, value]) => value != null)
      ) as Partial<TravelPreferences>
    : undefined;

  return { ...result.data, extractedPreferences };
}
