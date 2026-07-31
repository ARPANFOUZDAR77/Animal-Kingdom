import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Heart,
  GitCompare,
  Copy,
  ExternalLink,
  Download,
  Share2,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DetailModal: React.FC = () => {
  const {
    selectedDetailItem,
    setSelectedDetailItem,
    addFavorite,
    removeFavorite,
    isFavorite,
    addToComparison,
    showToast
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Lock background scroll when detail modal is open
  useEffect(() => {
    if (selectedDetailItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setActiveImageIndex(0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedDetailItem]);

  if (!selectedDetailItem) return null;

  const { type, data } = selectedDetailItem;

  const images: string[] = [
    data.imageUrl,
    ...(data.additionalImages || [])
  ].filter(Boolean);

  const favId = `${type}-${data.id || data.name?.toLowerCase().replace(/\s+/g, '-')}`;
  const favorited = isFavorite(favId);

  const handleFavoriteToggle = () => {
    if (favorited) {
      removeFavorite(favId);
    } else {
      addFavorite({
        type: type as any,
        title: data.name || data.commonName,
        subtitle: data.origin || data.habitat || data.breedGroup || 'Animal Discovery',
        imageUrl: data.imageUrl,
        data
      });
    }
  };

  const handleCopyInfo = () => {
    const text = `🐾 ${data.name || data.commonName}\n` +
      `• Origin/Habitat: ${data.origin || data.habitat}\n` +
      `• Lifespan: ${data.lifeExpectancy || data.lifeSpan || data.lifespan}\n` +
      `• Weight: ${data.weight}\n` +
      `• Description: ${data.description || data.behavior || ''}\n` +
      `Discovered on Animal Kingdom Platform.`;

    navigator.clipboard.writeText(text);
    showToast('Animal info copied to clipboard!', 'success');
  };

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = images[activeImageIndex] || data.imageUrl;
    link.target = '_blank';
    link.download = `${data.name || data.commonName}_photo.jpg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Opening image download...', 'info');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="w-full max-w-4xl bg-[#0E1013] text-zinc-100 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative h-[92vh] sm:h-auto sm:max-h-[90vh] flex flex-col"
        >
          {/* Sticky Close & Action Header for Mobile & Desktop */}
          <div className="sticky top-0 z-30 px-4 py-3 bg-[#08090A]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2 truncate">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#2D5A27] text-white uppercase shrink-0 border border-[#2D5A27]/50">
                {type === 'dog' && (data.breedGroup || 'Dog Breed')}
                {type === 'cat' && 'Cat Breed'}
                {type === 'wildlife' && (data.animalClass || 'Wild Species')}
              </span>
              <span className="text-sm font-serif font-bold text-white truncate">
                {data.name || data.commonName}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  favorited ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : 'bg-white/10 text-white border-white/10'
                }`}
                title="Favorite"
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              <button
                onClick={() => setSelectedDetailItem(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer active:scale-95"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Unified Scroll Container for Mobile / Desktop Modal Body */}
          <div className="overflow-y-auto overscroll-contain flex-1 p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              {/* Image Column */}
              <div className="bg-[#08090A] p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-zinc-950 border border-white/5">
                  <img
                    src={images[activeImageIndex] || data.imageUrl}
                    alt={data.name || data.commonName}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  {data.conservationStatus && (
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold shadow-md backdrop-blur-md ${
                        data.conservationStatus === 'Endangered' || data.conservationStatus === 'Critically Endangered'
                          ? 'bg-rose-500/80 text-white border border-rose-400/30'
                          : data.conservationStatus === 'Vulnerable'
                          ? 'bg-amber-500/80 text-white border border-amber-400/30'
                          : 'bg-emerald-600/80 text-white border border-emerald-400/30'
                      }`}
                    >
                      {data.conservationStatus}
                    </span>
                  )}
                </div>

                {/* Gallery Thumbnails */}
                {images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                          activeImageIndex === idx ? 'border-[#F2C94C] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Action Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
                  <button
                    onClick={handleDownloadImage}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#F2C94C]" /> Download Photo
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyInfo}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title="Copy specs"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addToComparison(data)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title="Compare"
                    >
                      <GitCompare className="w-4 h-4 text-emerald-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Specs & Details Column */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif italic font-bold text-white">
                    {data.name || data.commonName}
                  </h2>
                  {data.scientificName && (
                    <p className="text-xs sm:text-sm font-serif italic text-zinc-400 mt-0.5">
                      {data.scientificName}
                    </p>
                  )}
                </div>

                {/* Quick Metric Badges Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-[#F2C94C] block tracking-wider">
                      Origin / Habitat
                    </span>
                    <span className="text-xs font-semibold text-zinc-200 mt-0.5 block truncate">
                      {data.origin || data.habitat || 'Global'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-[#F2C94C] block tracking-wider">
                      Lifespan
                    </span>
                    <span className="text-xs font-semibold text-zinc-200 mt-0.5 block truncate">
                      {data.lifeExpectancy || data.lifeSpan || data.lifespan || '10 - 15 years'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-[#F2C94C] block tracking-wider">
                      Weight
                    </span>
                    <span className="text-xs font-semibold text-zinc-200 mt-0.5 block truncate">
                      {data.weight || 'N/A'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-[#F2C94C] block tracking-wider">
                      {type === 'wildlife' ? 'Diet' : 'Height / Size'}
                    </span>
                    <span className="text-xs font-semibold text-zinc-200 mt-0.5 block truncate">
                      {data.diet || data.height || 'Medium'}
                    </span>
                  </div>
                </div>

                {/* Overview */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Overview</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    {data.description || data.behavior}
                  </p>
                </div>

                {/* Dog Temperament */}
                {type === 'dog' && data.temperament && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Temperament Traits</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {data.temperament.map((t: string) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#2D5A27]/30 text-emerald-300 border border-[#2D5A27]/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cat Characteristic Ratings */}
                {type === 'cat' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Breed Characteristics</h4>
                    <div className="space-y-2">
                      {[
                        { label: 'Intelligence', val: data.intelligence },
                        { label: 'Affection Level', val: data.affectionLevel },
                        { label: 'Energy Level', val: data.energyLevel },
                        { label: 'Dog Friendliness', val: data.dogFriendliness },
                        { label: 'Child Friendliness', val: data.childFriendliness }
                      ].map((stat) => (
                        <div key={stat.label} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-400">{stat.label}</span>
                            <span className="font-bold text-[#F2C94C]">{stat.val} / 5</span>
                          </div>
                          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-[#F2C94C] h-full rounded-full transition-all duration-500"
                              style={{ width: `${((stat.val || 3) / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {data.wikipediaUrl && (
                      <a
                        href={data.wikipediaUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:underline mt-2"
                      >
                        Read more on Wikipedia <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}

                {/* Wildlife Facts */}
                {type === 'wildlife' && data.interestingFacts && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Fascinating Facts</h4>
                    <ul className="space-y-1.5">
                      {data.interestingFacts.map((fact: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bottom Share & Close Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={handleCopyInfo}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2D5A27] text-white font-bold text-xs hover:bg-[#397232] transition-colors cursor-pointer shadow-md border border-[#2D5A27]/60"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#F2C94C]" /> Share Specs
                  </button>

                  <button
                    onClick={() => setSelectedDetailItem(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 text-zinc-300 text-xs font-medium hover:bg-white/20 transition-colors cursor-pointer border border-white/10"
                  >
                    Close Window
                  </button>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

