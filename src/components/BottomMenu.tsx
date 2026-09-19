import React from 'react';
import {
  BookOpen,
  Search,
  Bookmark,
  FileText,
  Share2,
  Settings,
} from 'lucide-react';
import { ViewMode } from '../types';

interface BottomMenuProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  savedCount: number;
  notesCount: number;
  onOpenSettings: () => void;
  onOpenShare: () => void;
  onCreateNote?: () => void;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({
  viewMode,
  setViewMode,
  savedCount,
  notesCount,
  onOpenSettings,
  onOpenShare,
}) => {
  return (
    <div
      id="bible-bottom-menu"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 shadow-lg px-2 sm:px-6 py-2 transition-colors"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-1 sm:gap-2">
        {/* 1. Verses Cross-Reference */}
        <button
          id="bottom-nav-verse"
          type="button"
          onClick={() => setViewMode('verse')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            viewMode === 'verse'
              ? 'text-amber-900 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 font-semibold'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800/50'
          }`}
          title="Search by Verse / వచన పరిశోధన"
        >
          <BookOpen className={`w-5 h-5 ${viewMode === 'verse' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] sm:text-xs mt-1 whitespace-nowrap">Verses</span>
        </button>

        {/* 2. Word Search */}
        <button
          id="bottom-nav-word"
          type="button"
          onClick={() => setViewMode('word')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            viewMode === 'word'
              ? 'text-amber-900 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 font-semibold'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800/50'
          }`}
          title="Word & Concordance Search / పద శోధన"
        >
          <Search className={`w-5 h-5 ${viewMode === 'word' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] sm:text-xs mt-1 whitespace-nowrap">Words</span>
        </button>

        {/* 3. Study Notes */}
        <button
          id="bottom-nav-notes"
          type="button"
          onClick={() => setViewMode('notes')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all relative ${
            viewMode === 'notes'
              ? 'text-amber-900 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 font-semibold'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800/50'
          }`}
          title="Study Notes & Journal / అధ్యయన నోట్స్"
        >
          <div className="relative">
            <FileText className={`w-5 h-5 ${viewMode === 'notes' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {notesCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 px-1 min-w-3.5 h-3.5 text-[9px] font-bold rounded-full bg-amber-700 text-white flex items-center justify-center leading-none">
                {notesCount}
              </span>
            )}
          </div>
          <span className="text-[11px] sm:text-xs mt-1 whitespace-nowrap">Notes</span>
        </button>

        {/* 5. Share Button */}
        <button
          id="bottom-nav-share-btn"
          type="button"
          onClick={onOpenShare}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-all active:scale-95"
          title="Share Scripture Study / వాక్యాన్ని షేర్ చేయండి"
        >
          <Share2 className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[11px] sm:text-xs mt-1 whitespace-nowrap">Share</span>
        </button>

        {/* 6. Saved Bookmarks */}
        <button
          id="bottom-nav-saved"
          type="button"
          onClick={() => setViewMode('saved')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all relative ${
            viewMode === 'saved'
              ? 'text-amber-900 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 font-semibold'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800/50'
          }`}
          title="Saved Bookmarks / సేవ్ చేసినవి"
        >
          <div className="relative">
            <Bookmark className={`w-5 h-5 ${viewMode === 'saved' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {savedCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 px-1 min-w-3.5 h-3.5 text-[9px] font-bold rounded-full bg-amber-800 text-white flex items-center justify-center leading-none">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[11px] sm:text-xs mt-1 whitespace-nowrap">Saved</span>
        </button>

        {/* 7. Settings Button */}
        <button
          id="bottom-nav-settings-btn"
          type="button"
          onClick={onOpenSettings}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-all active:scale-95"
          title="Settings & Reading Preferences / సెట్టింగ్స్"
        >
          <Settings className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[11px] sm:text-xs mt-1 whitespace-nowrap">Settings</span>
        </button>
      </div>
    </div>
  );
};
