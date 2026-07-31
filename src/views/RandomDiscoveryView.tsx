import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Shuffle,
  Heart,
  Download,
  Copy,
  ChevronRight,
  Dog,
  Cat,
  Trees,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RandomDiscoveryView: React.FC = () => {
  const {
    dogsData,
    catsData,
    wildlifeData,
    setSelectedDetailItem,
    addFavorite,
    removeFavorite,
    isFavorite,
    showToast
  } = useApp();

  const [category, setCategory] = useState<'all' | 'dog' | 'cat' | 'wildlife'>('all');
  const [currentRandom, setCurrentRandom] = useState<any>(() => {
    const combined = [...dogsData, ...catsData, ...wildlifeData];
    return combined[Math.floor(Math.random() * combined.length)];
  });
  const [isShuffling, setIsShuffling] = useState(false);

  const determineType = (item: any) => {
    if (item.breedGroup || item.trainability !== undefined) return 'dog';
    if (item.intelligence !== undefined) return 'cat';
    return 'wildlife';
  };

  const handleShuffle = () => {
    setIsShuffling(true);

    // Fire celebratory confetti!
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      let pool: any[] = [];
      if (category === 'dog') pool = dogsData;
      else if (category === 'cat') pool = catsData;
      else if (category === 'wildlife') pool = wildlifeData;
      else pool = [...dogsData, ...catsData, ...wildlifeData];

      let picked = pool[Math.floor(Math.random() * pool.length)];
      if (picked.id === currentRandom?.id && pool.length > 1) {
        picked = pool[(pool.indexOf(picked) + 1) % pool.length];
      }
      setCurrentRandom(picked);
      setIsShuffling(false);
    }, 250);
  };

  if (!currentRandom) return null;

  const currentType = determineType(currentRandom);
  const favId = `${currentType}-${currentRandom.id}`;
  const favorited = isFavorite(favId);

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5" /> Random Animal Discovery
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Surprise Animal Generator
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Click shuffle to discover unexpected animals, rare breeds, and fascinating facts!
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2">
        {[
          { id: 'all', label: 'All Animals', icon: <Sparkles className="w-3.5 h-3.5" /> },
          { id: 'dog', label: 'Dogs Only', icon: <Dog className="w-3.5 h-3.5" /> },
          { id: 'cat', label: 'Cats Only', icon: <Cat className="w-3.5 h-3.5" /> },
          { id: 'wildlife', label: 'Wildlife Only', icon: <Trees className="w-3.5 h-3.5" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategory(tab.id as any)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
              category === tab.id
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Big Card Display */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRandom.id}
            initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.95, rotate: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl grid grid-cols-1 md:grid-cols-2"
          >
            {/* Image */}
            <div className="relative aspect-4/3 md:aspect-auto bg-zinc-950">
              <img
                src={currentRandom.imageUrl}
                alt={currentRandom.name || currentRandom.commonName}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-md uppercase">
                {currentType}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400">
                  {currentRandom.origin || currentRandom.habitat || 'Global'}
                </span>

                <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mt-1">
                  {currentRandom.name || currentRandom.commonName}
                </h2>

                {currentRandom.scientificName && (
                  <p className="text-xs font-serif italic text-zinc-400">
                    {currentRandom.scientificName}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-4">
                  {currentRandom.description || currentRandom.behavior}
                </p>

                {currentRandom.interestingFacts && (
                  <div className="mt-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
                    <strong>Fact:</strong> {currentRandom.interestingFacts[0]}
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    if (favorited) {
                      removeFavorite(favId);
                    } else {
                      addFavorite({
                        type: currentType as any,
                        title: currentRandom.name || currentRandom.commonName,
                        subtitle: currentRandom.origin || currentRandom.habitat,
                        imageUrl: currentRandom.imageUrl,
                        data: currentRandom
                      });
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    favorited ? 'bg-rose-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-white' : ''}`} />
                  <span>{favorited ? 'Favorited' : 'Save'}</span>
                </button>

                <button
                  onClick={() => setSelectedDetailItem({ type: currentType as any, data: currentRandom })}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors flex items-center gap-1 cursor-pointer shadow-md"
                >
                  View Deep Specs <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Big Shuffle Button */}
      <div className="text-center pt-4">
        <button
          onClick={handleShuffle}
          disabled={isShuffling}
          className="px-8 py-4 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-base shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto cursor-pointer"
        >
          <Shuffle className={`w-5 h-5 ${isShuffling ? 'animate-spin' : ''}`} />
          <span>Shuffle Another Animal!</span>
        </button>
      </div>
    </div>
  );
};
