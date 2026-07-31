import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Clock,
  ChevronRight,
  X,
  Check,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Heart,
  Share2
} from 'lucide-react';
import { LEARNING_ARTICLES } from '../data/learningArticles';
import { LearningArticle } from '../types';
import { useApp } from '../context/AppContext';

export const LearningView: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<LearningArticle | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const { addFavorite, removeFavorite, isFavorite } = useApp();

  // Prevent background scroll when modal is open on mobile
  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      setIsPaused(false);
    }
    return () => {
      document.body.style.overflow = '';
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeArticle]);

  // Handle Speech Synthesis (Read Aloud)
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window) || !activeArticle) return;

    if (isSpeaking) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    } else {
      window.speechSynthesis.cancel();
      const fullText = `${activeArticle.title}. Category: ${activeArticle.category}. ${activeArticle.summary}. Key Takeaways: ${activeArticle.keyTakeaways.join('. ')}. ${activeArticle.content.map((c) => `${c.heading}. ${c.body}`).join('. ')}`;

      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };

      speechUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      setIsPaused(false);
    }
  };

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const articleFavId = activeArticle ? `art-${activeArticle.id}` : '';
  const isArticleFavorited = articleFavId ? isFavorite(articleFavId) : false;

  const handleToggleFavorite = () => {
    if (!activeArticle) return;
    if (isArticleFavorited) {
      removeFavorite(articleFavId);
    } else {
      addFavorite({
        id: articleFavId,
        type: 'article',
        title: activeArticle.title,
        subtitle: `${activeArticle.category} • ${activeArticle.readTimeMinutes} min read`,
        imageUrl: activeArticle.coverImage,
        data: activeArticle
      } as any);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[#F2C94C] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" /> Educational Wildlife Library
        </div>
        <h1 className="text-3xl font-serif italic font-bold text-white mt-1">
          Learning Center
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          In-depth articles covering taxonomy, biomes, pet health, and wildlife conservation biology.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LEARNING_ARTICLES.map((art) => (
          <div
            key={art.id}
            onClick={() => setActiveArticle(art)}
            className="group rounded-3xl overflow-hidden bg-[#0E1013] border border-white/10 hover:border-[#2D5A27]/60 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-16/9 bg-zinc-900 overflow-hidden">
              <img
                src={art.coverImage}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-[#2D5A27] text-white uppercase shadow-md border border-[#2D5A27]/50">
                {art.category}
              </span>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#F2C94C]" /> {art.readTimeMinutes} min read • By {art.author}
                </div>
                <h3 className="text-base font-serif font-bold text-white group-hover:text-[#F2C94C] transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-3 mt-1.5 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>Read Article</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal (Mobile & Desktop Optimized) */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden">
          <div className="bg-[#0E1013] text-zinc-100 max-w-3xl w-full rounded-t-3xl sm:rounded-3xl border border-white/10 shadow-2xl relative h-[92vh] sm:h-auto sm:max-h-[88vh] flex flex-col overflow-hidden">
            
            {/* Modal Controls Top Bar */}
            <div className="sticky top-0 z-30 px-4 py-3 bg-[#08090A]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 truncate">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#2D5A27] text-white uppercase shrink-0">
                  {activeArticle.category}
                </span>
                <span className="text-xs font-serif font-bold text-white truncate hidden sm:inline">
                  {activeArticle.title}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Audio Read Aloud Control */}
                <button
                  onClick={handleToggleSpeech}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    isSpeaking
                      ? 'bg-[#F2C94C] text-[#08090A] border-[#F2C94C] shadow-md animate-pulse'
                      : 'bg-white/10 hover:bg-white/15 text-white border-white/10'
                  }`}
                  title={isSpeaking ? (isPaused ? 'Resume Audio' : 'Pause Audio') : 'Listen to Article Aloud'}
                >
                  {isSpeaking ? (
                    isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-[#F2C94C]" />
                  )}
                  <span className="hidden sm:inline">
                    {isSpeaking ? (isPaused ? 'Paused' : 'Playing') : 'Listen'}
                  </span>
                </button>

                {isSpeaking && (
                  <button
                    onClick={handleStopSpeech}
                    className="p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30 transition-colors cursor-pointer"
                    title="Stop Audio"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                  </button>
                )}

                {/* Bookmark Favorite Button */}
                <button
                  onClick={handleToggleFavorite}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isArticleFavorited
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                      : 'bg-white/10 text-zinc-300 hover:bg-white/15 border-white/10'
                  }`}
                  title={isArticleFavorited ? 'Remove from Favorites' : 'Save Article'}
                >
                  <Heart className={`w-4 h-4 ${isArticleFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                {/* Close Button (Touch Friendly) */}
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 cursor-pointer active:scale-95 transition-transform"
                  title="Close Reader"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Article Body (Single Scroll Container for Mobile) */}
            <div className="p-5 sm:p-8 overflow-y-auto overscroll-contain flex-1 space-y-6">
              
              {/* Cover Image */}
              <div className="relative aspect-16/9 sm:aspect-21/9 bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Metadata */}
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#F2C94C] uppercase tracking-wider">
                  <span>{activeArticle.category}</span>
                  <span>•</span>
                  <span className="text-zinc-400">{activeArticle.readTimeMinutes} min read</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1 leading-tight">
                  {activeArticle.title}
                </h1>
                <p className="text-xs text-zinc-400 mt-1.5">
                  Published by <span className="text-zinc-200 font-medium">{activeArticle.author}</span> on {activeArticle.publishedDate}
                </p>
              </div>

              {/* Key Takeaways Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#2D5A27]/20 border border-[#2D5A27]/50 space-y-2.5">
                <strong className="text-[#F2C94C] text-xs uppercase tracking-wider block font-bold">
                  Key Takeaways
                </strong>
                <ul className="space-y-2">
                  {activeArticle.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Paragraph Sections */}
              <div className="space-y-6 pt-2">
                {activeArticle.content.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                      {sec.heading}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};
