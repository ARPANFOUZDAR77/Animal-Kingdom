export type ViewName =
  | 'home'
  | 'dogs'
  | 'cats'
  | 'wildlife'
  | 'random'
  | 'gallery'
  | 'favorites'
  | 'compare'
  | 'facts'
  | 'quiz'
  | 'stats'
  | 'learning'
  | 'about'
  | 'settings';

export type ConservationStatus =
  | 'Critically Endangered'
  | 'Endangered'
  | 'Vulnerable'
  | 'Near Threatened'
  | 'Least Concern'
  | 'Domesticated';

export type AnimalClass =
  | 'Mammal'
  | 'Bird'
  | 'Reptile'
  | 'Amphibian'
  | 'Fish / Marine'
  | 'Insect / Invertebrate';

export interface DogBreed {
  id: string;
  name: string;
  subBreeds?: string[];
  breedGroup?: string;
  temperament: string[];
  lifeExpectancy: string;
  weight: string; // e.g. "20 - 30 kg"
  height: string; // e.g. "45 - 55 cm"
  origin: string;
  bredFor?: string;
  imageUrl: string;
  additionalImages?: string[];
  description: string;
  popularityRank?: number;
  energyLevel?: number; // 1-5
  trainability?: number; // 1-5
}

export interface CatBreed {
  id: string;
  name: string;
  origin: string;
  temperament: string[];
  lifeSpan: string;
  weight: string;
  intelligence: number; // 1-5
  affectionLevel: number; // 1-5
  energyLevel: number; // 1-5
  dogFriendliness: number; // 1-5
  childFriendliness: number; // 1-5
  imageUrl: string;
  additionalImages?: string[];
  description: string;
  wikipediaUrl?: string;
}

export interface WildAnimal {
  id: string;
  commonName: string;
  scientificName: string;
  animalClass: AnimalClass;
  family: string;
  species: string;
  habitat: string;
  diet: 'Carnivore' | 'Herbivore' | 'Omnivore' | 'Insectivore';
  predators: string[];
  lifespan: string;
  weight: string;
  height: string;
  conservationStatus: ConservationStatus;
  geographicRange: string;
  imageUrl: string;
  additionalImages?: string[];
  interestingFacts: string[];
  behavior: string;
  speed?: string;
}

export interface AnimalGalleryItem {
  id: string;
  title: string;
  category: 'Dog' | 'Cat' | 'Wildlife';
  imageUrl: string;
  photographer?: string;
  source: string;
  tags: string[];
}

export interface AnimalFact {
  id: string;
  category: 'Dogs' | 'Cats' | 'Wildlife' | 'Ocean Animals' | 'Birds' | 'Mammals' | 'Reptiles' | 'Amphibians' | 'Insects';
  fact: string;
  source?: string;
  isDidYouKnow?: boolean;
}

export interface QuizQuestion {
  id: string;
  mode: 'Easy' | 'Medium' | 'Hard' | 'Timed';
  type: 'breed_guess' | 'image_quiz' | 'multiple_choice' | 'fact_check';
  question: string;
  imageUrl?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  mode: string;
  date: string;
  timeSpentSeconds: number;
}

export interface FavoriteItem {
  id: string;
  type: 'dog' | 'cat' | 'wildlife' | 'gallery' | 'fact' | 'article';
  title: string;
  subtitle: string;
  imageUrl?: string;
  data: any; // stores full object for offline instant access
  addedAt: string;
}

export interface LearningArticle {
  id: string;
  title: string;
  category: 'Classification' | 'Habitats' | 'Evolution' | 'Food Chains' | 'Conservation' | 'Pet Care';
  summary: string;
  readTimeMinutes: number;
  coverImage: string;
  content: {
    heading: string;
    body: string;
  }[];
  author: string;
  publishedDate: string;
  keyTakeaways: string[];
}

export interface AppSettings {
  theme: 'dark' | 'light';
  reducedMotion: boolean;
  imageQuality: 'low' | 'medium' | 'high';
  gridSize: 'compact' | 'standard' | 'large';
  soundEnabled: boolean;
  autoplayAnimations: boolean;
}

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  type: 'dog' | 'cat' | 'wildlife' | 'article' | 'fact';
  imageUrl?: string;
  targetView: ViewName;
  itemData?: any;
}
