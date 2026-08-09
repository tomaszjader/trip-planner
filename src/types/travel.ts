export type TravelPace = 'relaxed' | 'balanced' | 'intense';
export type TravelGroup = 'solo' | 'couple' | 'family' | 'friends';
export type BudgetLevel = 'budget' | 'medium' | 'luxury';
export type TransportMode = 'walking_transit' | 'car_rental' | 'bicycle' | 'mixed';
export type DietaryPreference = 'any' | 'traditional' | 'vegetarian' | 'vegan' | 'seafood' | 'fine_dining';

export type InterestTag = 
  | 'history' 
  | 'nature' 
  | 'food' 
  | 'museums' 
  | 'beaches' 
  | 'nightlife' 
  | 'hidden_gems' 
  | 'shopping' 
  | 'entertainment';

export interface TravelPreferences {
  destination: string;
  durationDays: number;
  season?: string;
  pace: TravelPace;
  group: TravelGroup;
  interests: InterestTag[];
  budget: BudgetLevel;
  transport: TransportMode;
  dietary: DietaryPreference;
  customNotes?: string;
  startingLocation?: string;
}

export interface ActivitySpot {
  id: string;
  timeSlot: 'morning' | 'afternoon' | 'evening';
  time: string;
  title: string;
  category: string;
  description: string;
  practicalTip?: string;
  estimatedCost?: string;
  durationHours?: number;
  coordinates: { lat: number; lng: number };
  address?: string;
  imageUrl?: string;
  transitToNext?: string;
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  theme: string;
  summary: string;
  activities: ActivitySpot[];
}

export interface CulinaryItem {
  id: string;
  name: string;
  type: 'dish' | 'drink' | 'dessert' | 'street_food';
  description: string;
  mustTryWhy: string;
  typicalPrice: string;
  imageUrl?: string;
}

export interface RestaurantSpot {
  id: string;
  name: string;
  category: 'traditional' | 'street_food' | 'cafe' | 'view_bar' | 'fine_dining';
  categoryLabel: string;
  description: string;
  recommendedDish: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  address: string;
  coordinates: { lat: number; lng: number };
}

export interface TravelBudgetBreakdown {
  currency: string;
  accommodationPerDay: string;
  foodPerDay: string;
  activitiesPerDay: string;
  localTransportPerDay: string;
  estimatedTotalPerPerson: string;
  moneySavingTips: string[];
}

export interface PackingChecklistItem {
  id: string;
  category: 'documents' | 'clothing' | 'electronics' | 'cosmetics' | 'special';
  categoryLabel: string;
  item: string;
  isChecked: boolean;
}

export interface PracticalAdvice {
  bestSeason: string;
  localCurrency: string;
  languageAndPhrases: { phrase: string; translation: string }[];
  transportTips: string;
  safetyTips: string;
  culturalEtiquette: string;
  emergencyNumber: string;
}

export interface TripPlan {
  id: string;
  createdAt: string;
  title: string;
  destination: string;
  country: string;
  tagline: string;
  heroImage: string;
  summary: string;
  preferences: TravelPreferences;
  centerCoordinates: { lat: number; lng: number };
  defaultZoom: number;
  days: DayPlan[];
  culinaryGuide: {
    dishes: CulinaryItem[];
    restaurants: RestaurantSpot[];
  };
  budget: TravelBudgetBreakdown;
  packingList: PackingChecklistItem[];
  practicalAdvice: PracticalAdvice;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestions?: string[];
  extractedPreferences?: Partial<TravelPreferences>;
  isGenerating?: boolean;
}

export type AIProvider = 'gemini' | 'openai';

export interface AppSettings {
  aiProvider: AIProvider;
  geminiApiKey: string;
  openaiApiKey: string;
  selectedGeminiModel: string;
  selectedOpenAIModel: string;
  selectedModel: string;
  theme: 'dark' | 'light';
  language: 'pl' | 'en';
}
