import React, { useState, useMemo } from 'react';
import {
  Dog,
  Search,
  Grid,
  List,
  Sparkles,
  Heart,
  GitCompare,
  Share2,
  Copy,
  ChevronRight,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DogBreed } from '../types';
import { fetchRandomDogImage } from '../services/api';

export const DogBreedsView: React.FC = () => {
  const {
    dogsData,
    setSelectedDetailItem,
    addFavorite,
    removeFavorite,
    isFavorite,
    addToComparison,
    showToast
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [randomDogImg, setRandomDogImg] = useState<string | null>(null);
  const [isGeneratingRandom, setIsGeneratingRandom] = useState(false);

  // Group options
  const groups = ['all', 'Sporting', 'Herding', 'Working', 'Hound', 'Non-Sporting'];

  const filteredBreeds = useMemo(() => {
    return dogsData.filter((dog) => {
      const matchesSearch =
        dog.name.toLowerCase().includes(search.toLowerCase()) ||
        dog.origin.toLowerCase().includes(search.toLowerCase()) ||
        dog.temperament.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesGroup =
        selectedGroup === 'all' ||
        dog.breedGroup?.toLowerCase() === selectedGroup.toLowerCase();

      return matchesSearch && matchesGroup;
    });
  }, [dogsData, search, selectedGroup]);

  const handleGenerateRandomDog = async () => {
    setIsGeneratingRandom(true);
    const img = await fetchRandomDogImage();
    setRandomDogImg(img);
    setIsGeneratingRandom(false);
    showToast('Fetched fresh random dog image!', 'success');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Dog className="w-4 h-4" /> Domestic Canine Encyclopedia
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">
            Dog Breeds Explorer
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Browse through dog breeds with temperaments, weights, origins, and stats.
          </p>
        </div>

        {/* Random Dog Button */}
        <button
          onClick={handleGenerateRandomDog}
          disabled={isGeneratingRandom}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all cursor-pointer self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          {isGeneratingRandom ? 'Fetching Dog...' : 'Random Dog Generator'}
        </button>
      </div>

      {/* Random Dog Showcase Banner if generated */}
      {randomDogImg && (
        <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center gap-4">
          <img
            src={randomDogImg}
            alt="Random Dog"
            className="w-24 h-24 rounded-2xl object-cover shadow-md shrink-0 bg-zinc-200"
          />
          <div className="flex-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
              Random Dog Photo Generated
            </span>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5">
              A surprise pup fetched straight from the public Dog API!
            </p>
          </div>
          <button
            onClick={() => {
              window.open(randomDogImg, '_blank');
            }}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
          >
            Open Fullscreen
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dog by breed, temperament, or origin..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl text-xs font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {/* Grid / List Switcher */}
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-2xl shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-zinc-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-zinc-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Group Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-zinc-400 font-semibold uppercase text-[10px] shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Group:
          </span>
          {groups.map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer shrink-0 ${
                selectedGroup.toLowerCase() === grp.toLowerCase()
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {grp === 'all' ? 'All Groups' : grp}
            </button>
          ))}
        </div>
      </div>

      {/* Breeds List Display */}
      {filteredBreeds.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8">
          <Dog className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">No Dog Breeds Found</h3>
          <p className="text-xs text-zinc-500 mt-1">Try resetting your search query or group filter.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedGroup('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBreeds.map((dog) => {
            const favId = `dog-${dog.id}`;
            const favorited = isFavorite(favId);

            return (
              <div
                key={dog.id}
                className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div
                  onClick={() => setSelectedDetailItem({ type: 'dog', data: dog })}
                  className="relative aspect-4/3 bg-zinc-200 overflow-hidden cursor-pointer"
                >
                  <img
                    src={dog.imageUrl}
                    alt={dog.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {dog.breedGroup && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md">
                      {dog.breedGroup}
                    </span>
                  )}

                  {/* Favorite Quick Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (favorited) {
                        removeFavorite(favId);
                      } else {
                        addFavorite({
                          type: 'dog',
                          title: dog.name,
                          subtitle: dog.origin,
                          imageUrl: dog.imageUrl,
                          data: dog
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
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => setSelectedDetailItem({ type: 'dog', data: dog })}
                      className="text-base font-bold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 transition-colors cursor-pointer"
                    >
                      {dog.name}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Origin: {dog.origin}
                    </p>

                    {/* Temperament Tags */}
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {dog.temperament.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 text-[11px] font-medium">{dog.lifeExpectancy}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => addToComparison(dog)}
                        className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-600 dark:text-zinc-300 cursor-pointer"
                        title="Compare Breed"
                      >
                        <GitCompare className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedDetailItem({ type: 'dog', data: dog })}
                        className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 font-bold cursor-pointer"
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
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredBreeds.map((dog) => (
            <div
              key={dog.id}
              onClick={() => setSelectedDetailItem({ type: 'dog', data: dog })}
              className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all flex items-center gap-4 cursor-pointer"
            >
              <img
                src={dog.imageUrl}
                alt={dog.name}
                className="w-16 h-16 rounded-xl object-cover bg-zinc-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {dog.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                  {dog.origin} • {dog.temperament.join(', ')}
                </p>
              </div>
              <div className="hidden sm:block text-xs font-semibold text-zinc-500 shrink-0">
                {dog.lifeExpectancy}
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
