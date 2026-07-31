import React from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  Sparkles,
  Dog,
  Cat,
  Trees,
  ImageIcon,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  TrendingUp,
  HelpCircle,
  BarChart2,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HomeView: React.FC = () => {
  const { setView, setSelectedDetailItem, dogsData, catsData, wildlifeData, factsData } = useApp();

  const featuredDog = dogsData[0];
  const featuredCat = catsData[0];
  const featuredWild = wildlifeData[0];

  const randomFact = factsData[Math.floor(Math.random() * factsData.length)];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B1A0A] via-[#0E1013] to-[#1A1508] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-[#2D5A27]/40">
        {/* Subtle Background Glow Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2D5A27]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F2C94C]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2C94C]/10 border border-[#F2C94C]/30 text-[#F2C94C] text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Ultimate Wildlife & Pet Encyclopedia</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic font-bold tracking-tight leading-tight">
            Explore the Amazing <br />
            <span className="bg-gradient-to-r from-[#F2C94C] via-[#F5D573] to-emerald-400 bg-clip-text text-transparent not-italic font-sans font-extrabold">
              World of Animals
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-sans">
            Discover thousands of fascinating dog breeds, domestic cat species, wild animal classifications, educational facts, and high-definition photography powered by public APIs.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setView('wildlife')}
              className="px-6 py-3.5 rounded-2xl bg-[#2D5A27] hover:bg-[#397232] text-white font-bold text-sm shadow-lg shadow-[#2D5A27]/40 border border-[#2D5A27]/60 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#F2C94C]" /> Explore Wildlife
            </button>

            <button
              onClick={() => setView('random')}
              className="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm backdrop-blur-md border border-white/15 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F2C94C]" /> Random Discovery
            </button>
          </div>
        </div>
      </section>

      {/* Live Statistics Section */}
      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Dog Breeds', val: dogsData.length, icon: <Dog className="w-5 h-5 text-emerald-400" />, viewTarget: 'dogs' },
          { label: 'Cat Breeds', val: catsData.length, icon: <Cat className="w-5 h-5 text-[#F2C94C]" />, viewTarget: 'cats' },
          { label: 'Wild Animals', val: wildlifeData.length, icon: <Trees className="w-5 h-5 text-teal-400" />, viewTarget: 'wildlife' },
          { label: 'Educational Facts', val: factsData.length, icon: <BookOpen className="w-5 h-5 text-sky-400" />, viewTarget: 'facts' },
          { label: 'Gallery Photos', val: '500+', icon: <ImageIcon className="w-5 h-5 text-amber-300" />, viewTarget: 'gallery' }
        ].map((stat, idx) => (
          <button
            key={idx}
            onClick={() => setView(stat.viewTarget as any)}
            className="p-5 rounded-2xl bg-[#0E1013]/90 border border-white/10 hover:border-[#2D5A27]/50 shadow-md hover:shadow-[#2D5A27]/20 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#F2C94C] group-hover:translate-x-1 transition-all" />
            </div>
            <span className="text-2xl font-bold text-white block font-serif">{stat.val}</span>
            <span className="text-xs font-medium text-zinc-400 mt-0.5 block">{stat.label}</span>
          </button>
        ))}
      </section>

      {/* Featured Categories Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif italic font-bold text-white">
              Featured Categories
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Browse top categories with rich specs, images, and temperaments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dogs Card */}
          <div
            onClick={() => setView('dogs')}
            className="group relative rounded-3xl overflow-hidden bg-[#0E1013]/90 border border-white/10 hover:border-[#2D5A27]/60 p-6 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between min-h-[280px]"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2D5A27]/30 border border-[#2D5A27]/50 text-emerald-400 flex items-center justify-center">
                <Dog className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white group-hover:text-[#F2C94C] transition-colors">
                Dog Breeds
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Explore popular working, sporting, and companion dogs with weight, height, lifespan, and temperaments.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs font-semibold text-emerald-400">
                {dogsData.length} Breeds Available
              </span>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#2D5A27] group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Cats Card */}
          <div
            onClick={() => setView('cats')}
            className="group relative rounded-3xl overflow-hidden bg-[#0E1013]/90 border border-white/10 hover:border-[#F2C94C]/40 p-6 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between min-h-[280px]"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F2C94C]/15 border border-[#F2C94C]/30 text-[#F2C94C] flex items-center justify-center">
                <Cat className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white group-hover:text-[#F2C94C] transition-colors">
                Cat Breeds
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Discover domesticated felines with interactive rating bars for intelligence, affection, energy, and friendliness.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs font-semibold text-[#F2C94C]">
                {catsData.length} Breeds Available
              </span>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#F2C94C] group-hover:text-[#08090A] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Wildlife Card */}
          <div
            onClick={() => setView('wildlife')}
            className="group relative rounded-3xl overflow-hidden bg-[#0E1013]/90 border border-white/10 hover:border-teal-500/40 p-6 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between min-h-[280px]"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center">
                <Trees className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white group-hover:text-teal-400 transition-colors">
                Wildlife Explorer
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Learn about lions, pandas, eagles, turtles, and wild species with scientific names, habitats, and diets.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs font-semibold text-teal-400">
                {wildlifeData.length} Species Cataloged
              </span>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Discoveries Showcase */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif italic font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#F2C94C]" /> Trending Discoveries
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Hand-picked animals featuring rich facts and high-res photography.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dog Item */}
          {featuredDog && (
            <div
              onClick={() => {
                setSelectedDetailItem({ type: 'dog', data: featuredDog });
              }}
              className="group rounded-3xl overflow-hidden bg-[#0E1013] border border-white/10 hover:border-[#2D5A27]/60 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-zinc-900">
                <img
                  src={featuredDog.imageUrl}
                  alt={featuredDog.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-[#2D5A27] text-white shadow-md border border-[#2D5A27]/50">
                  Dog Breed
                </span>
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#F2C94C] transition-colors">
                    {featuredDog.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                    {featuredDog.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-medium text-zinc-400">
                  <span>{featuredDog.origin}</span>
                  <span className="text-emerald-400 font-bold">View Specs →</span>
                </div>
              </div>
            </div>
          )}

          {/* Cat Item */}
          {featuredCat && (
            <div
              onClick={() => {
                setSelectedDetailItem({ type: 'cat', data: featuredCat });
              }}
              className="group rounded-3xl overflow-hidden bg-[#0E1013] border border-white/10 hover:border-[#F2C94C]/50 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-zinc-900">
                <img
                  src={featuredCat.imageUrl}
                  alt={featuredCat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-[#F2C94C] text-[#08090A] shadow-md font-semibold">
                  Cat Breed
                </span>
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#F2C94C] transition-colors">
                    {featuredCat.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                    {featuredCat.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-medium text-zinc-400">
                  <span>Intelligence: {featuredCat.intelligence}/5</span>
                  <span className="text-[#F2C94C] font-bold">View Specs →</span>
                </div>
              </div>
            </div>
          )}

          {/* Wild Item */}
          {featuredWild && (
            <div
              onClick={() => {
                setSelectedDetailItem({ type: 'wildlife', data: featuredWild });
              }}
              className="group rounded-3xl overflow-hidden bg-[#0E1013] border border-white/10 hover:border-teal-500/50 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-zinc-900">
                <img
                  src={featuredWild.imageUrl}
                  alt={featuredWild.commonName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-teal-600 text-white shadow-md border border-teal-500/40">
                  Wildlife
                </span>
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-teal-400 transition-colors">
                    {featuredWild.commonName}
                  </h3>
                  <p className="text-xs font-serif italic text-zinc-400">
                    {featuredWild.scientificName}
                  </p>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                    {featuredWild.habitat}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-medium text-zinc-400">
                  <span>{featuredWild.conservationStatus}</span>
                  <span className="text-teal-400 font-bold">View Specs →</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Did You Know Ticker Banner */}
      {randomFact && (
        <section className="rounded-3xl bg-gradient-to-r from-[#2D5A27]/25 via-[#0E1013] to-[#F2C94C]/15 border border-[#2D5A27]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#2D5A27] text-[#F2C94C] border border-[#2D5A27]/60 flex items-center justify-center shrink-0 shadow-lg">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="space-y-1 flex-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F2C94C]">
              Did You Know? ({randomFact.category})
            </span>
            <p className="text-sm sm:text-base font-medium text-zinc-200">
              "{randomFact.fact}"
            </p>
          </div>
          <button
            onClick={() => setView('facts')}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 shadow-sm hover:shadow transition-all shrink-0 cursor-pointer"
          >
            More Facts
          </button>
        </section>
      )}
    </div>
  );
};
