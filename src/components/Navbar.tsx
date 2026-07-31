import React, { useState, useEffect } from 'react';
import {
  PawPrint,
  Search,
  Moon,
  Sun,
  Heart,
  GitCompare,
  Sparkles,
  Menu,
  X,
  Settings,
  Compass,
  Dog,
  Cat,
  Trees,
  Image as ImageIcon,
  HelpCircle,
  BarChart2,
  BookOpen,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ViewName } from '../types';

export const Navbar: React.FC = () => {
  const {
    view,
    setView,
    settings,
    updateSettings,
    setIsSearchOpen,
    favorites,
    comparisonList
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  const navItems: { name: string; view: ViewName; icon: React.ReactNode; badge?: number }[] = [
    { name: 'Home', view: 'home', icon: <Compass className="w-4 h-4" /> },
    { name: 'Dogs', view: 'dogs', icon: <Dog className="w-4 h-4" /> },
    { name: 'Cats', view: 'cats', icon: <Cat className="w-4 h-4" /> },
    { name: 'Wildlife', view: 'wildlife', icon: <Trees className="w-4 h-4" /> },
    { name: 'Random', view: 'random', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Gallery', view: 'gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { name: 'Favorites', view: 'favorites', icon: <Heart className="w-4 h-4" />, badge: favorites.length },
    { name: 'Compare', view: 'compare', icon: <GitCompare className="w-4 h-4" />, badge: comparisonList.length },
    { name: 'Quiz', view: 'quiz', icon: <HelpCircle className="w-4 h-4" /> },
    { name: 'Stats', view: 'stats', icon: <BarChart2 className="w-4 h-4" /> },
    { name: 'Learning', view: 'learning', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'About', view: 'about', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? 'bg-[#08090A]/90 border-b border-white/10 shadow-lg shadow-black/40'
          : 'bg-[#08090A]/70 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => {
              setView('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D5A27] to-[#1a3818] flex items-center justify-center text-[#F2C94C] shadow-md border border-[#F2C94C]/30 group-hover:scale-105 transition-transform">
              <PawPrint className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-serif italic font-bold text-white tracking-wide group-hover:text-[#F2C94C] transition-colors">
                Animal Kingdom
              </span>
              <span className="block text-[9px] uppercase tracking-[0.2em] text-[#F2C94C] font-semibold -mt-1">
                Discovery Platform
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const active = view === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => setView(item.view)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all relative cursor-pointer ${
                    active
                      ? 'bg-[#2D5A27]/25 text-[#F2C94C] font-semibold border border-[#2D5A27]/50'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {Boolean(item.badge) && item.badge! > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#F2C94C] text-[#08090A] leading-none">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Global Search Bar Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0E1013] hover:bg-[#15191F] text-zinc-400 border border-white/10 text-xs transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#F2C94C]" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white/5 border border-white/10 rounded text-zinc-500 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
              className="p-2 rounded-xl bg-[#0E1013] text-zinc-300 hover:bg-[#15191F] border border-white/10 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {settings.theme === 'dark' ? <Sun className="w-4 h-4 text-[#F2C94C]" /> : <Moon className="w-4 h-4 text-[#6EE7B7]" />}
            </button>

            {/* Settings View Button */}
            <button
              onClick={() => setView('settings')}
              className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                view === 'settings'
                  ? 'bg-[#2D5A27]/30 text-[#F2C94C] border-[#2D5A27]/60'
                  : 'bg-[#0E1013] text-zinc-300 hover:bg-[#15191F] border-white/10'
              }`}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-[#0E1013] text-zinc-300 hover:bg-[#15191F] border border-white/10 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#08090A]/95 border-b border-white/10 px-4 pt-2 pb-6 space-y-1 shadow-2xl max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => {
                setView(item.view);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                view === item.view
                  ? 'bg-[#2D5A27]/30 text-[#F2C94C] font-semibold border border-[#2D5A27]/50'
                  : 'text-zinc-300 hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {Boolean(item.badge) && item.badge! > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-[#F2C94C] text-[#08090A] font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
