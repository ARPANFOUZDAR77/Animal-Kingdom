import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  History,
  Trash2,
  Dog,
  Cat,
  Trees,
  BookOpen,
  Sparkles,
  ChevronRight,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SearchResultItem, ViewName } from '../types';
import { LEARNING_ARTICLES } from '../data/learningArticles';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    dogsData,
    catsData,
    wildlifeData,
    factsData,
    setView,
    searchHistory,
    addSearchHistory,
    clearSearchHistory,
    setSelectedDetailItem
  } = useApp();

  const [query, setQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (!isSearchOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  // Aggregate search results
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase().trim();
    const results: SearchResultItem[] = [];

    // Dog Breeds
    if (filterCategory === 'all' || filterCategory === 'dogs') {
      dogsData.forEach((dog) => {
        if (
          dog.name.toLowerCase().includes(q) ||
          dog.origin.toLowerCase().includes(q) ||
          dog.temperament.some((t) => t.toLowerCase().includes(q)) ||
          dog.breedGroup?.toLowerCase().includes(q)
        ) {
          results.push({
            id: `dog-${dog.id}`,
            title: dog.name,
            subtitle: `${dog.origin} • ${dog.temperament.slice(0, 3).join(', ')}`,
            category: 'Dog Breed',
            type: 'dog',
            imageUrl: dog.imageUrl,
            targetView: 'dogs',
            itemData: dog
          });
        }
      });
    }

    // Cat Breeds
    if (filterCategory === 'all' || filterCategory === 'cats') {
      catsData.forEach((cat) => {
        if (
          cat.name.toLowerCase().includes(q) ||
          cat.origin.toLowerCase().includes(q) ||
          cat.temperament.some((t) => t.toLowerCase().includes(q))
        ) {
          results.push({
            id: `cat-${cat.id}`,
            title: cat.name,
            subtitle: `${cat.origin} • ${cat.temperament.slice(0, 3).join(', ')}`,
            category: 'Cat Breed',
            type: 'cat',
            imageUrl: cat.imageUrl,
            targetView: 'cats',
            itemData: cat
          });
        }
      });
    }

    // Wildlife
    if (filterCategory === 'all' || filterCategory === 'wildlife') {
      wildlifeData.forEach((wild) => {
        if (
          wild.commonName.toLowerCase().includes(q) ||
          wild.scientificName.toLowerCase().includes(q) ||
          wild.habitat.toLowerCase().includes(q) ||
          wild.diet.toLowerCase().includes(q) ||
          wild.animalClass.toLowerCase().includes(q)
        ) {
          results.push({
            id: `wild-${wild.id}`,
            title: wild.commonName,
            subtitle: `${wild.scientificName} • ${wild.habitat}`,
            category: 'Wildlife',
            type: 'wildlife',
            imageUrl: wild.imageUrl,
            targetView: 'wildlife',
            itemData: wild
          });
        }
      });
    }

    // Facts
    if (filterCategory === 'all' || filterCategory === 'facts') {
      factsData.forEach((fact) => {
        if (fact.fact.toLowerCase().includes(q) || fact.category.toLowerCase().includes(q)) {
          results.push({
            id: `fact-${fact.id}`,
            title: `${fact.category} Fact`,
            subtitle: fact.fact,
            category: 'Educational Fact',
            type: 'fact',
            targetView: 'facts',
            itemData: fact
          });
        }
      });
    }

    // Learning Articles
    if (filterCategory === 'all' || filterCategory === 'articles') {
      LEARNING_ARTICLES.forEach((art) => {
        if (
          art.title.toLowerCase().includes(q) ||
          art.summary.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q)
        ) {
          results.push({
            id: `art-${art.id}`,
            title: art.title,
            subtitle: art.summary,
            category: 'Learning Center',
            type: 'article',
            imageUrl: art.coverImage,
            targetView: 'learning',
            itemData: art
          });
        }
      });
    }

    return results.slice(0, 15);
  }, [query, filterCategory, dogsData, catsData, wildlifeData, factsData]);

  // Handle selection
  const handleSelectResult = (result: SearchResultItem) => {
    addSearchHistory(query || result.title);
    setIsSearchOpen(false);

    if (result.type === 'dog' || result.type === 'cat' || result.type === 'wildlife') {
      setSelectedDetailItem({ type: result.type, data: result.itemData });
      setView(result.targetView);
    } else {
      setView(result.targetView);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter' && searchResults[selectedIndex]) {
      e.preventDefault();
      handleSelectResult(searchResults[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 sm:px-6 bg-zinc-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-2xl bg-[#0E1013] text-zinc-100 rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Search Header Input */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#F2C94C] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search animals, breeds, origins, habitats, facts..."
              className="w-full bg-transparent text-base font-medium text-white placeholder-zinc-500 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="px-2.5 py-1 text-xs rounded-lg bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/10 font-mono"
            >
              ESC
            </button>
          </div>

          {/* Filter Chips */}
          <div className="px-4 py-2 bg-[#08090A]/80 border-b border-white/10 flex items-center gap-1.5 overflow-x-auto text-xs">
            {[
              { id: 'all', label: 'All Results', icon: <Sparkles className="w-3 h-3" /> },
              { id: 'dogs', label: 'Dogs', icon: <Dog className="w-3 h-3" /> },
              { id: 'cats', label: 'Cats', icon: <Cat className="w-3 h-3" /> },
              { id: 'wildlife', label: 'Wildlife', icon: <Trees className="w-3 h-3" /> },
              { id: 'facts', label: 'Facts', icon: <Tag className="w-3 h-3" /> },
              { id: 'articles', label: 'Articles', icon: <BookOpen className="w-3 h-3" /> }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
                  filterCategory === cat.id
                    ? 'bg-[#2D5A27] text-white border border-[#2D5A27]/50'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-transparent'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* If no query, display recent history & quick links */}
            {!query.trim() ? (
              <div className="space-y-6">
                {searchHistory.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <History className="w-3.5 h-3.5" /> Recent Searches
                      </span>
                      <button
                        onClick={clearSearchHistory}
                        className="text-zinc-400 hover:text-rose-500 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" /> Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {searchHistory.map((item) => (
                        <button
                          key={item}
                          onClick={() => setQuery(item)}
                          className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="mb-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Popular Categories
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { label: 'Golden Retriever', query: 'Golden Retriever' },
                      { label: 'Bengal Tiger', query: 'Tiger' },
                      { label: 'Siamese Cat', query: 'Siamese' },
                      { label: 'Rainforest Wildlife', query: 'Rainforest' },
                      { label: 'Endangered Species', query: 'Endangered' },
                      { label: 'Fastest Animals', query: 'Speed' }
                    ].map((pop) => (
                      <button
                        key={pop.label}
                        onClick={() => setQuery(pop.query)}
                        className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left text-xs font-medium text-zinc-800 dark:text-zinc-200 border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between cursor-pointer"
                      >
                        <span>{pop.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Results List */
              <div className="space-y-1">
                {searchResults.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      No matching animals or facts found for "{query}".
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Try searching by breed, country, habitat, or class name.
                    </p>
                  </div>
                ) : (
                  searchResults.map((res, idx) => (
                    <button
                      key={res.id}
                      onClick={() => handleSelectResult(res)}
                      className={`w-full text-left p-3 rounded-xl flex items-center gap-3.5 transition-all cursor-pointer ${
                        idx === selectedIndex
                          ? 'bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/30'
                          : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/70 border border-transparent'
                      }`}
                    >
                      {res.imageUrl ? (
                        <img
                          src={res.imageUrl}
                          alt={res.title}
                          className="w-12 h-12 rounded-lg object-cover bg-zinc-200 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <Tag className="w-5 h-5" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                            {res.title}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 shrink-0">
                            {res.category}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                          {res.subtitle}
                        </p>
                      </div>

                      <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
