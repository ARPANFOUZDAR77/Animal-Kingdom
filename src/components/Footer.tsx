import React from 'react';
import {
  PawPrint,
  ArrowUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setView, apiStatus, dogsData, catsData, wildlifeData } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-white/10 bg-[#060708] text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2D5A27] to-[#1a3818] border border-[#F2C94C]/30 flex items-center justify-center text-[#F2C94C] shadow-md">
                <PawPrint className="w-5 h-5" />
              </div>
              <span className="text-xl font-serif italic font-bold text-white">
                Animal Kingdom
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Discover thousands of fascinating domestic pets, wild animals, scientific classifications, educational facts, and high-resolution photography on a modern, client-side encyclopedia.
            </p>

            {/* API Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#0E1013] border border-white/10">
              <span
                className={`w-2 h-2 rounded-full ${
                  apiStatus === 'online'
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-[#F2C94C]'
                }`}
              />
              <span className="text-zinc-300">
                API Services: {apiStatus === 'online' ? '100% Operational' : 'Degraded (Using Local Cache)'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F2C94C] uppercase tracking-wider">
              Discovery
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setView('dogs')} className="hover:text-white transition-colors cursor-pointer">
                  Dog Breeds ({dogsData.length})
                </button>
              </li>
              <li>
                <button onClick={() => setView('cats')} className="hover:text-white transition-colors cursor-pointer">
                  Cat Breeds ({catsData.length})
                </button>
              </li>
              <li>
                <button onClick={() => setView('wildlife')} className="hover:text-white transition-colors cursor-pointer">
                  Wildlife Encyclopedia ({wildlifeData.length})
                </button>
              </li>
              <li>
                <button onClick={() => setView('random')} className="hover:text-white transition-colors cursor-pointer">
                  Random Animal Shuffle
                </button>
              </li>
              <li>
                <button onClick={() => setView('gallery')} className="hover:text-white transition-colors cursor-pointer">
                  High-Res Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F2C94C] uppercase tracking-wider">
              Tools & Games
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setView('compare')} className="hover:text-white transition-colors cursor-pointer">
                  Animal Comparison Tool
                </button>
              </li>
              <li>
                <button onClick={() => setView('quiz')} className="hover:text-white transition-colors cursor-pointer">
                  Interactive Wildlife Quiz
                </button>
              </li>
              <li>
                <button onClick={() => setView('stats')} className="hover:text-white transition-colors cursor-pointer">
                  Statistics Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setView('facts')} className="hover:text-white transition-colors cursor-pointer">
                  Educational Facts Hub
                </button>
              </li>
              <li>
                <button onClick={() => setView('about')} className="hover:text-white transition-colors cursor-pointer">
                  About & License
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p className="flex items-center gap-1 font-medium text-zinc-300">
            made with ♥️ by Arpan
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setView('about')}
              className="hover:text-zinc-200 cursor-pointer"
            >
              Privacy & Legal
            </button>
            <span className="text-zinc-700">•</span>
            <span>© 2026 Animal Kingdom</span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#0E1013] text-zinc-300 hover:bg-[#15191F] border border-white/10 transition-colors cursor-pointer ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
