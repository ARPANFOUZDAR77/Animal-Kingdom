import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { DetailModal } from './components/DetailModal';

// Views
import { HomeView } from './views/HomeView';
import { DogBreedsView } from './views/DogBreedsView';
import { CatBreedsView } from './views/CatBreedsView';
import { WildlifeView } from './views/WildlifeView';
import { RandomDiscoveryView } from './views/RandomDiscoveryView';
import { GalleryView } from './views/GalleryView';
import { FavoritesView } from './views/FavoritesView';
import { CompareView } from './views/CompareView';
import { FactsView } from './views/FactsView';
import { QuizView } from './views/QuizView';
import { StatisticsView } from './views/StatisticsView';
import { LearningView } from './views/LearningView';
import { AboutView } from './views/AboutView';
import { SettingsView } from './views/SettingsView';

const MainContent: React.FC = () => {
  const { view } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 min-h-[calc(100vh-16rem)]">
      {view === 'home' && <HomeView />}
      {view === 'dogs' && <DogBreedsView />}
      {view === 'cats' && <CatBreedsView />}
      {view === 'wildlife' && <WildlifeView />}
      {view === 'random' && <RandomDiscoveryView />}
      {view === 'gallery' && <GalleryView />}
      {view === 'favorites' && <FavoritesView />}
      {view === 'compare' && <CompareView />}
      {view === 'facts' && <FactsView />}
      {view === 'quiz' && <QuizView />}
      {view === 'stats' && <StatisticsView />}
      {view === 'learning' && <LearningView />}
      {view === 'about' && <AboutView />}
      {view === 'settings' && <SettingsView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#08090A] text-zinc-100 transition-colors duration-300 font-sans selection:bg-[#2D5A27] selection:text-white">
        <Navbar />
        <MainContent />
        <Footer />
        <GlobalSearchModal />
        <DetailModal />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
