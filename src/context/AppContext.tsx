import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ViewName,
  AppSettings,
  FavoriteItem,
  DogBreed,
  CatBreed,
  WildAnimal,
  AnimalFact
} from '../types';
import { INITIAL_DOG_BREEDS } from '../data/dogBreeds';
import { INITIAL_CAT_BREEDS } from '../data/catBreeds';
import { INITIAL_WILD_ANIMALS } from '../data/wildAnimals';
import { INITIAL_ANIMAL_FACTS } from '../data/facts';
import { fetchLiveDogBreeds, fetchLiveCatBreeds } from '../services/api';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  view: ViewName;
  setView: (v: ViewName) => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  
  // Data
  dogsData: DogBreed[];
  catsData: CatBreed[];
  wildlifeData: WildAnimal[];
  factsData: AnimalFact[];
  isLoadingData: boolean;
  apiStatus: 'online' | 'degraded' | 'offline';
  refreshAPIData: () => void;

  // Favorites
  favorites: FavoriteItem[];
  addFavorite: (item: Omit<FavoriteItem, 'id' | 'addedAt'>) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  importFavorites: (jsonData: string) => boolean;
  exportFavorites: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchHistory: string[];
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;

  // Comparison
  comparisonList: any[];
  addToComparison: (item: any) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Selected item detail modal
  selectedDetailItem: { type: 'dog' | 'cat' | 'wildlife'; data: any } | null;
  setSelectedDetailItem: (item: { type: 'dog' | 'cat' | 'wildlife'; data: any } | null) => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  reducedMotion: false,
  imageQuality: 'high',
  gridSize: 'standard',
  soundEnabled: true,
  autoplayAnimations: true
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setViewState] = useState<ViewName>('home');
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('ak_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [dogsData, setDogsData] = useState<DogBreed[]>(INITIAL_DOG_BREEDS);
  const [catsData, setCatsData] = useState<CatBreed[]>(INITIAL_CAT_BREEDS);
  const [wildlifeData] = useState<WildAnimal[]>(INITIAL_WILD_ANIMALS);
  const [factsData] = useState<AnimalFact[]>(INITIAL_ANIMAL_FACTS);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [apiStatus, setApiStatus] = useState<'online' | 'degraded' | 'offline'>('online');

  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const saved = localStorage.getItem('ak_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ak_search_history');
      return saved ? JSON.parse(saved) : ['Tiger', 'Golden Retriever', 'Siamese', 'Antarctica'];
    } catch {
      return ['Tiger', 'Golden Retriever'];
    }
  });

  const [comparisonList, setComparisonList] = useState<any[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedDetailItem, setSelectedDetailItem] = useState<{ type: 'dog' | 'cat' | 'wildlife'; data: any } | null>(null);

  // Sync settings to document class
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('ak_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
  }, [settings]);

  // Sync favorites
  useEffect(() => {
    try {
      localStorage.setItem('ak_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites:', e);
    }
  }, [favorites]);

  // Sync search history
  useEffect(() => {
    try {
      localStorage.setItem('ak_search_history', JSON.stringify(searchHistory));
    } catch (e) {
      console.warn('Failed to save search history:', e);
    }
  }, [searchHistory]);

  // Fetch live API data on mount
  const loadAPIData = async () => {
    setIsLoadingData(true);
    try {
      const [liveDogs, liveCats] = await Promise.all([
        fetchLiveDogBreeds(),
        fetchLiveCatBreeds()
      ]);
      setDogsData(liveDogs);
      setCatsData(liveCats);
      setApiStatus('online');
    } catch {
      setApiStatus('degraded');
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    loadAPIData();
  }, []);

  const setView = (v: ViewName) => {
    setViewState(v);
    window.scrollTo({ top: 0, behavior: settings.reducedMotion ? 'auto' : 'smooth' });
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Settings updated successfully', 'success');
  };

  const addFavorite = (item: Omit<FavoriteItem, 'id' | 'addedAt'>) => {
    const id = `${item.type}-${item.data?.id || item.title.toLowerCase().replace(/\s+/g, '-')}`;
    if (favorites.some((f) => f.id === id)) {
      showToast('Item is already in your favorites', 'info');
      return;
    }
    const newItem: FavoriteItem = {
      ...item,
      id,
      addedAt: new Date().toISOString()
    };
    setFavorites((prev) => [newItem, ...prev]);
    showToast(`Added ${item.title} to Favorites!`, 'success');
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
    showToast('Removed from Favorites', 'info');
  };

  const isFavorite = (id: string) => {
    return favorites.some((f) => f.id === id || f.id.includes(id));
  };

  const clearFavorites = () => {
    setFavorites([]);
    showToast('All favorites cleared', 'warning');
  };

  const exportFavorites = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(favorites, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `animal_kingdom_favorites_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Favorites exported to JSON', 'success');
  };

  const importFavorites = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (Array.isArray(parsed)) {
        setFavorites(parsed);
        showToast(`Imported ${parsed.length} favorites!`, 'success');
        return true;
      }
    } catch {
      showToast('Invalid JSON file format', 'error');
    }
    return false;
  };

  const addSearchHistory = (q: string) => {
    if (!q.trim()) return;
    setSearchHistory((prev) => [q, ...prev.filter((item) => item.toLowerCase() !== q.toLowerCase())].slice(0, 8));
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    showToast('Search history cleared', 'info');
  };

  const addToComparison = (item: any) => {
    if (comparisonList.length >= 3) {
      showToast('Maximum 3 items can be compared at once', 'warning');
      return;
    }
    if (comparisonList.some((i) => i.id === item.id)) {
      showToast('Item already added to comparison', 'info');
      return;
    }
    setComparisonList((prev) => [...prev, item]);
    showToast(`Added ${item.name || item.commonName} to Comparison`, 'success');
  };

  const removeFromComparison = (id: string) => {
    setComparisonList((prev) => prev.filter((i) => i.id !== id));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        view,
        setView,
        settings,
        updateSettings,
        dogsData,
        catsData,
        wildlifeData,
        factsData,
        isLoadingData,
        apiStatus,
        refreshAPIData: loadAPIData,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
        importFavorites,
        exportFavorites,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        searchHistory,
        addSearchHistory,
        clearSearchHistory,
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        toasts,
        showToast,
        removeToast,
        selectedDetailItem,
        setSelectedDetailItem
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
