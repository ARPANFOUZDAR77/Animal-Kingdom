import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Download,
  Copy,
  Maximize2,
  X,
  Filter,
  Check,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fetchGalleryItems } from '../services/api';
import { AnimalGalleryItem } from '../types';

export const GalleryView: React.FC = () => {
  const { showToast } = useApp();

  const [items, setItems] = useState<AnimalGalleryItem[]>([]);
  const [filter, setFilter] = useState<'All' | 'Dog' | 'Cat' | 'Wildlife'>('All');
  const [activeLightbox, setActiveLightbox] = useState<AnimalGalleryItem | null>(null);

  useEffect(() => {
    fetchGalleryItems().then(setItems);
  }, []);

  const filteredItems = items.filter(
    (item) => filter === 'All' || item.category === filter
  );

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Image URL copied to clipboard!', 'success');
  };

  const handleDownload = (url: string, title: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.download = `${title.toLowerCase().replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast('Downloading high-res photo...', 'info');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <ImageIcon className="w-4 h-4" /> National Geographic Visual Aesthetic
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">
          Animal Photography Gallery
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          High-definition wildlife, canine, and feline imagery ready for exploration or wallpapers.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3 text-xs">
        {['All', 'Dog', 'Cat', 'Wildlife'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              filter === cat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {cat === 'All' ? 'All Photography' : cat}
          </button>
        ))}
      </div>

      {/* Masonry / Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-end min-h-[260px]"
            onClick={() => setActiveLightbox(item)}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

            <div className="relative p-5 text-white space-y-2 z-10">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white uppercase">
                {item.category}
              </span>
              <h3 className="text-sm font-bold line-clamp-1">{item.title}</h3>

              <div className="flex items-center justify-between text-[11px] text-zinc-300 pt-2 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>By {item.photographer || 'Unsplash'}</span>
                <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-5xl w-full bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col max-h-[90vh]">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[350px]">
              <img
                src={activeLightbox.imageUrl}
                alt={activeLightbox.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-zinc-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800">
              <div>
                <span className="text-xs font-bold uppercase text-indigo-400">
                  {activeLightbox.category} Photography
                </span>
                <h3 className="text-lg font-bold">{activeLightbox.title}</h3>
                <p className="text-xs text-zinc-400">Source: {activeLightbox.source} • Photographer: {activeLightbox.photographer}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleCopyUrl(activeLightbox.imageUrl)}
                  className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Image URL
                </button>
                <button
                  onClick={() => handleDownload(activeLightbox.imageUrl, activeLightbox.title)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5" /> Download HD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
