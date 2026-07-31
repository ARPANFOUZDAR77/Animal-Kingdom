import React, { useState, useMemo } from 'react';
import {
  Cat,
  Search,
  Sparkles,
  Heart,
  GitCompare,
  ExternalLink,
  ChevronRight,
  BarChart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fetchRandomCatImage } from '../services/api';

export const CatBreedsView: React.FC = () => {
  const {
    catsData,
    setSelectedDetailItem,
    addFavorite,
    removeFavorite,
    isFavorite,
    addToComparison,
    showToast
  } = useApp();

  const [search, setSearch] = useState('');
  const [randomCatImg, setRandomCatImg] = useState<string | null>(null);
  const [isGeneratingRandom, setIsGeneratingRandom] = useState(false);

  const filteredCats = useMemo(() => {
    return catsData.filter(
      (cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase()) ||
        cat.origin.toLowerCase().includes(search.toLowerCase()) ||
        cat.temperament.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );
  }, [catsData, search]);

  const handleGenerateRandomCat = async () => {
    setIsGeneratingRandom(true);
    const img = await fetchRandomCatImage();
    setRandomCatImg(img);
    setIsGeneratingRandom(false);
    showToast('Fetched fresh random cat photo!', 'success');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Cat className="w-4 h-4" /> Domestic Feline Encyclopedia
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">
            Cat Breeds Explorer
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Explore cat breeds with affection levels, intelligence ratings, origins, and stats.
          </p>
        </div>

        {/* Random Cat Generator */}
        <button
          onClick={handleGenerateRandomCat}
          disabled={isGeneratingRandom}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all cursor-pointer self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-200 animate-spin-slow" />
          {isGeneratingRandom ? 'Fetching Cat...' : 'Random Cat Generator'}
        </button>
      </div>

      {/* Random Cat Banner */}
      {randomCatImg && (
        <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center gap-4">
          <img
            src={randomCatImg}
            alt="Random Cat"
            className="w-24 h-24 rounded-2xl object-cover shadow-md shrink-0 bg-zinc-200"
          />
          <div className="flex-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400">
              Random Feline Photo Fetched
            </span>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5">
              Fetched from The Cat API live image database.
            </p>
          </div>
          <button
            onClick={() => window.open(randomCatImg, '_blank')}
            className="px-3.5 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 cursor-pointer"
          >
            Open Fullscreen
          </button>
        </div>
      )}

      {/* Search Input */}
      <div className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cat breed, origin, temperament..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl text-xs font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>
      </div>

      {/* Cat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCats.map((cat) => {
          const favId = `cat-${cat.id}`;
          const favorited = isFavorite(favId);

          return (
            <div
              key={cat.id}
              className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div
                onClick={() => setSelectedDetailItem({ type: 'cat', data: cat })}
                className="relative aspect-4/3 bg-zinc-200 overflow-hidden cursor-pointer"
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md">
                  {cat.origin}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (favorited) {
                      removeFavorite(favId);
                    } else {
                      addFavorite({
                        type: 'cat',
                        title: cat.name,
                        subtitle: cat.origin,
                        imageUrl: cat.imageUrl,
                        data: cat
                      });
                    }
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                    favorited ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Info Content */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => setSelectedDetailItem({ type: 'cat', data: cat })}
                    className="text-base font-bold text-zinc-900 dark:text-zinc-100 hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    {cat.name}
                  </h3>

                  {/* Rating Progress Bars */}
                  <div className="space-y-2 mt-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-zinc-500">
                        <span>Intelligence</span>
                        <span className="text-amber-500 font-bold">{cat.intelligence}/5</span>
                      </div>
                      <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full"
                          style={{ width: `${(cat.intelligence / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-zinc-500">
                        <span>Affection</span>
                        <span className="text-amber-500 font-bold">{cat.affectionLevel}/5</span>
                      </div>
                      <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full"
                          style={{ width: `${(cat.affectionLevel / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-medium text-[11px]">{cat.lifeSpan}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => addToComparison(cat)}
                      className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-600 dark:text-zinc-300 cursor-pointer"
                      title="Compare Breed"
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setSelectedDetailItem({ type: 'cat', data: cat })}
                      className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 font-bold cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
