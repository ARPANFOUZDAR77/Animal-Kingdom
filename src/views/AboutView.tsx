import React from 'react';
import { PawPrint, ShieldCheck, Database, Globe, Heart, Code, ExternalLink } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center text-white shadow-xl mx-auto">
          <PawPrint className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          About Animal Kingdom
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          An open, modern encyclopedia dedicated to animal conservation and education.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Our Mission</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Animal Kingdom aims to inspire empathy, wildlife conservation, and pet care education by providing intuitive visual access to animal taxonomies and photography.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Open Data & Public APIs</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Built using free public APIs including Dog API (dog.ceo), The Cat API (thecatapi.com), and Unsplash wildlife photography. Works 100% client-side with offline cache support.
          </p>
        </div>
      </div>
    </div>
  );
};
