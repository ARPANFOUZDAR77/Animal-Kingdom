import React, { useState } from 'react';
import {
  GitCompare,
  X,
  Plus,
  Trash2,
  Check,
  Scale,
  Ruler,
  Clock,
  Globe,
  Zap,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CompareView: React.FC = () => {
  const {
    comparisonList,
    removeFromComparison,
    clearComparison,
    dogsData,
    catsData,
    wildlifeData,
    addToComparison
  } = useApp();

  const [pickerOpen, setPickerOpen] = useState(false);

  const allAvailable = [...dogsData, ...catsData, ...wildlifeData];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
            <GitCompare className="w-4 h-4" /> Animal Specifications Tool
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">
            Animal Comparison Tool
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Compare weight, height, lifespan, origin, intelligence, and temperaments side by side.
          </p>
        </div>

        {comparisonList.length > 0 && (
          <button
            onClick={clearComparison}
            className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-200 cursor-pointer self-start md:self-auto flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Matrix
          </button>
        )}
      </div>

      {/* Comparison Grid */}
      {comparisonList.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-4">
          <GitCompare className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto" />
          <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">No Animals Selected for Comparison</h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            Select up to 3 animals from the list below or from any breed/wildlife card to compare their traits!
          </p>
          <button
            onClick={() => setPickerOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 cursor-pointer shadow-md inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Animals to Compare
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Quick Add Button if < 3 */}
          {comparisonList.length < 3 && (
            <div className="flex justify-end">
              <button
                onClick={() => setPickerOpen(true)}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Another Animal ({comparisonList.length}/3)
              </button>
            </div>
          )}

          {/* Side-by-Side Comparison Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparisonList.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 flex flex-col justify-between relative space-y-6"
              >
                {/* Remove button */}
                <button
                  onClick={() => removeFromComparison(item.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer text-zinc-400"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-4">
                  {/* Photo & Name */}
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name || item.commonName}
                      className="w-16 h-16 rounded-2xl object-cover bg-zinc-200 shrink-0"
                    />
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {item.name || item.commonName}
                      </h3>
                      <p className="text-xs text-zinc-500">
                        {item.origin || item.habitat || 'Global'}
                      </p>
                    </div>
                  </div>

                  {/* Attribute Specs Table */}
                  <div className="space-y-3 pt-2 text-xs">
                    <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 block flex items-center gap-1">
                        <Scale className="w-3 h-3 text-teal-500" /> Weight
                      </span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 block">
                        {item.weight || 'N/A'}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 block flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" /> Lifespan
                      </span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 block">
                        {item.lifeExpectancy || item.lifeSpan || item.lifespan || 'N/A'}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 block flex items-center gap-1">
                        <Globe className="w-3 h-3 text-sky-500" /> Habitat / Origin
                      </span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 block">
                        {item.origin || item.habitat || 'Global'}
                      </span>
                    </div>

                    {/* Additional metrics */}
                    {item.intelligence && (
                      <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
                        <span className="text-[10px] uppercase font-bold text-zinc-400 block flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-500" /> Intelligence Rating
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-amber-500 h-full rounded-full"
                              style={{ width: `${(item.intelligence / 5) * 100}%` }}
                            />
                          </div>
                          <span className="font-bold text-amber-500 text-xs">{item.intelligence}/5</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Picker Modal */}
      {pickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-xl w-full p-6 space-y-4 border border-zinc-200 dark:border-zinc-800 shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Select Animal to Add
              </h3>
              <button
                onClick={() => setPickerOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {allAvailable.slice(0, 25).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    addToComparison(item);
                    setPickerOpen(false);
                  }}
                  className="w-full text-left p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 hover:bg-teal-500/10 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name || item.commonName}
                      className="w-10 h-10 rounded-xl object-cover bg-zinc-200"
                    />
                    <div>
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                        {item.name || item.commonName}
                      </span>
                      <span className="text-[10px] text-zinc-500 block">
                        {item.origin || item.habitat}
                      </span>
                    </div>
                  </div>
                  <Plus className="w-4 h-4 text-teal-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
