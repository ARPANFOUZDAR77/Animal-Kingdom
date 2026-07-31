import React, { useState, useMemo } from 'react';
import {
  Trees,
  Search,
  Filter,
  ShieldAlert,
  Heart,
  GitCompare,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WildAnimal, AnimalClass, ConservationStatus } from '../types';

export const WildlifeView: React.FC = () => {
  const {
    wildlifeData,
    setSelectedDetailItem,
    addFavorite,
    removeFavorite,
    isFavorite,
    addToComparison
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const animalClasses: (AnimalClass | 'all')[] = ['all', 'Mammal', 'Bird', 'Reptile', 'Amphibian', 'Fish / Marine'];
  const statuses: (ConservationStatus | 'all')[] = ['all', 'Endangered', 'Vulnerable', 'Least Concern', 'Near Threatened'];

  const filteredAnimals = useMemo(() => {
    return wildlifeData.filter((animal) => {
      const matchesSearch =
        animal.commonName.toLowerCase().includes(search.toLowerCase()) ||
        animal.scientificName.toLowerCase().includes(search.toLowerCase()) ||
        animal.habitat.toLowerCase().includes(search.toLowerCase()) ||
        animal.diet.toLowerCase().includes(search.toLowerCase());

      const matchesClass =
        selectedClass === 'all' || animal.animalClass === selectedClass;

      const matchesStatus =
        selectedStatus === 'all' || animal.conservationStatus === selectedStatus;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [wildlifeData, search, selectedClass, selectedStatus]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
          <Trees className="w-4 h-4" /> Global Wildlife Encyclopedia
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">
          Wildlife Explorer
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Discover wild animals, scientific names, habitats, conservation statuses, and diets.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        {/* Search */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search wild animals, scientific name, habitat..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl text-xs font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-400 font-semibold uppercase text-[10px] shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Class:
          </span>
          {animalClasses.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                selectedClass === cls
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cls === 'all' ? 'All Classes' : cls}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
          <span className="text-zinc-400 font-semibold uppercase text-[10px] shrink-0 mr-1 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" /> Status:
          </span>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                selectedStatus === st
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {st === 'all' ? 'All Statuses' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Wildlife Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimals.map((animal) => {
          const favId = `wildlife-${animal.id}`;
          const favorited = isFavorite(favId);

          return (
            <div
              key={animal.id}
              className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div
                onClick={() => setSelectedDetailItem({ type: 'wildlife', data: animal })}
                className="relative aspect-4/3 bg-zinc-200 overflow-hidden cursor-pointer"
              >
                <img
                  src={animal.imageUrl}
                  alt={animal.commonName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Conservation Badge */}
                <span
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md ${
                    animal.conservationStatus === 'Endangered' || animal.conservationStatus === 'Critically Endangered'
                      ? 'bg-rose-600 text-white'
                      : animal.conservationStatus === 'Vulnerable'
                      ? 'bg-amber-500 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {animal.conservationStatus}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (favorited) {
                      removeFavorite(favId);
                    } else {
                      addFavorite({
                        type: 'wildlife',
                        title: animal.commonName,
                        subtitle: animal.scientificName,
                        imageUrl: animal.imageUrl,
                        data: animal
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

              {/* Content */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-teal-600 dark:text-teal-400">
                      {animal.animalClass} • {animal.diet}
                    </span>
                    {animal.speed && (
                      <span className="text-[10px] font-semibold text-zinc-400 flex items-center gap-0.5">
                        <Zap className="w-3 h-3 text-amber-500" /> {animal.speed}
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => setSelectedDetailItem({ type: 'wildlife', data: animal })}
                    className="text-lg font-bold text-zinc-900 dark:text-zinc-100 hover:text-teal-600 transition-colors cursor-pointer mt-1"
                  >
                    {animal.commonName}
                  </h3>
                  <p className="text-xs font-serif italic text-zinc-400">
                    {animal.scientificName}
                  </p>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-2">
                    {animal.habitat}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-400 text-[11px] font-medium">{animal.lifespan}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => addToComparison(animal)}
                      className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-600 dark:text-zinc-300 cursor-pointer"
                      title="Compare"
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setSelectedDetailItem({ type: 'wildlife', data: animal })}
                      className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 hover:bg-teal-500/20 font-bold cursor-pointer"
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
