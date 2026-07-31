import React, { useRef } from 'react';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Zap,
  Trash2,
  Download,
  Upload,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, showToast, clearFavorites } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClearCache = () => {
    try {
      localStorage.removeItem('ak_settings');
      localStorage.removeItem('ak_favorites');
      localStorage.removeItem('ak_search_history');
      localStorage.removeItem('ak_quiz_history');
      showToast('Cache cleared successfully. Reloading...', 'success');
      setTimeout(() => window.location.reload(), 1000);
    } catch {
      showToast('Failed to clear cache', 'error');
    }
  };

  const handleExportSettings = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(settings, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `animal_kingdom_settings.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast('Settings exported', 'success');
  };

  return (
    <div className="space-y-8 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider">
          <SettingsIcon className="w-4 h-4" /> Preferences & Customization
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Customize visual theme, motion animations, audio settings, and manage local storage.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        {/* Theme Setting */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Visual Theme</h3>
            <p className="text-xs text-zinc-500">Switch between dark mode and light mode.</p>
          </div>

          <button
            onClick={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800 font-semibold text-xs text-zinc-800 dark:text-zinc-200 cursor-pointer"
          >
            {settings.theme === 'dark' ? (
              <>
                <Moon className="w-4 h-4 text-emerald-400" /> Dark Mode
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-500" /> Light Mode
              </>
            )}
          </button>
        </div>

        {/* Reduced Motion Setting */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Reduced Motion</h3>
            <p className="text-xs text-zinc-500">Disable smooth transitions for accessibility preference.</p>
          </div>

          <button
            onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
            className={`px-4 py-2 rounded-2xl font-bold text-xs cursor-pointer transition-colors ${
              settings.reducedMotion ? 'bg-emerald-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
            }`}
          >
            {settings.reducedMotion ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Sound Effects Setting */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Audio Feedback</h3>
            <p className="text-xs text-zinc-500">Enable text-to-speech and audio cues.</p>
          </div>

          <button
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            className={`px-4 py-2 rounded-2xl font-bold text-xs cursor-pointer transition-colors ${
              settings.soundEnabled ? 'bg-emerald-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
            }`}
          >
            {settings.soundEnabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Cache Management */}
        <div className="pt-2 space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Data & Storage</h3>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportSettings}
              className="px-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold hover:bg-zinc-200 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Export Preferences
            </button>

            <button
              onClick={handleClearCache}
              className="px-4 py-2.5 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" /> Reset All App Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
