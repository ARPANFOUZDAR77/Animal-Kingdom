import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Heart,
  Share2,
  Shuffle,
  BookOpen,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AnimalFact } from '../types';

export const FactsView: React.FC = () => {
  const { factsData, showToast, addFavorite } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentFact, setCurrentFact] = useState<AnimalFact>(() => factsData[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const categories = ['All', 'Dogs', 'Cats', 'Wildlife', 'Ocean Animals', 'Birds', 'Reptiles', 'Insects'];

  const filteredFacts = factsData.filter(
    (f) => selectedCategory === 'All' || f.category === selectedCategory
  );

  const handleShuffleFact = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);

    const pool = filteredFacts.length > 0 ? filteredFacts : factsData;
    let picked = pool[Math.floor(Math.random() * pool.length)];
    if (picked.id === currentFact.id && pool.length > 1) {
      picked = pool[(pool.indexOf(picked) + 1) % pool.length];
    }
    setCurrentFact(picked);
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      showToast('Text-to-speech is not supported in this browser', 'warning');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentFact.fact);
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyFact = () => {
    navigator.clipboard.writeText(currentFact.fact);
    showToast('Educational fact copied to clipboard!', 'success');
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold border border-sky-500/20">
          <BookOpen className="w-3.5 h-3.5" /> Educational Wildlife Facts
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Animal Facts Hub
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Learn astonishing facts about dogs, cats, ocean creatures, birds, and wild animals with audio speech!
        </p>
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              const pool = factsData.filter((f) => cat === 'All' || f.category === cat);
              if (pool.length > 0) setCurrentFact(pool[0]);
            }}
            className={`px-3.5 py-1.5 rounded-2xl font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Big Fact Card */}
      <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-sky-950 via-zinc-900 to-emerald-950 text-white shadow-2xl border border-sky-500/20 space-y-6 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase tracking-widest">
            {currentFact.category} Fact
          </span>

          <button
            onClick={handleSpeak}
            className={`p-2.5 rounded-full transition-colors cursor-pointer ${
              isSpeaking ? 'bg-amber-500 text-white animate-pulse' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title="Read fact aloud"
          >
            {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        <p className="text-xl sm:text-2xl font-bold leading-relaxed text-zinc-100">
          "{currentFact.fact}"
        </p>

        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyFact}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
            >
              <Copy className="w-4 h-4" /> Copy
            </button>

            <button
              onClick={() => {
                addFavorite({
                  type: 'fact',
                  title: `${currentFact.category} Fact`,
                  subtitle: currentFact.fact.substring(0, 50) + '...',
                  data: currentFact
                });
              }}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
            >
              <Heart className="w-4 h-4" /> Save Fact
            </button>
          </div>

          <button
            onClick={handleShuffleFact}
            className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
          >
            <Shuffle className="w-4 h-4" /> Another Fact
          </button>
        </div>
      </div>
    </div>
  );
};
