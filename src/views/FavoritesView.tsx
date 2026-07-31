import React, { useState, useRef } from 'react';
import {
  Heart,
  Search,
  Trash2,
  Download,
  Upload,
  ChevronRight,
  Dog,
  Cat,
  Trees,
  Bookmark
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FavoritesView: React.FC = () => {
  const {
    favorites,
    removeFavorite,
    clearFavorites,
    exportFavorites,
    importFavorites,
    setSelectedDetailItem,
    showToast
  } = useApp();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = favorites.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === 'all' || item.type === filterType;

    return matchesSearch && matchesType;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importFavorites(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" /> Saved Collections
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">
            Your Favorites ({favorites.length})
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Access saved dogs, cats, wildlife species, and photography offline anywhere.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" /> Import JSON
          </button>

          <button
            onClick={exportFavorites}
            disabled={favorites.length === 0}
            className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
          >
            <Download className="w-3.5 h-3.5" /> Export JSON
          </button>

          {favorites.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all favorites?')) {
                  clearFavorites();
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search saved favorites..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl text-xs font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {['all', 'dog', 'cat', 'wildlife'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer capitalize ${
                filterType === t
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {t === 'all' ? 'All Types' : `${t}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Favorites List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8">
          <Bookmark className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">No Favorites Saved Yet</h3>
          <p className="text-xs text-zinc-500 mt-1">
            Click the heart icon on any dog breed, cat, or wild animal card to save it here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((fav) => (
            <div
              key={fav.id}
              className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              {fav.imageUrl && (
                <div
                  onClick={() => fav.data && setSelectedDetailItem({ type: fav.type as any, data: fav.data })}
                  className="relative aspect-4/3 bg-zinc-200 overflow-hidden cursor-pointer"
                >
                  <img
                    src={fav.imageUrl}
                    alt={fav.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-600 text-white uppercase shadow-md">
                    {fav.type}
                  </span>
                </div>
              )}

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => fav.data && setSelectedDetailItem({ type: fav.type as any, data: fav.data })}
                    className="text-base font-bold text-zinc-900 dark:text-zinc-100 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    {fav.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {fav.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-zinc-400">
                    Saved {new Date(fav.addedAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => removeFavorite(fav.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 cursor-pointer"
                      title="Remove Favorite"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {fav.data && (
                      <button
                        onClick={() => setSelectedDetailItem({ type: fav.type as any, data: fav.data })}
                        className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-600 dark:text-zinc-300 font-bold cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
