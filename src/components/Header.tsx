import React from 'react';
import {
  BookOpen,
  Search,
  Layers,
  Network,
  Bookmark,
  Languages,
  FileText,
} from 'lucide-react';
import { ViewMode, LanguageView } from '../types';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  langView: LanguageView;
  setLangView: (lang: LanguageView) => void;
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  setFontSize: (size: 'sm' | 'base' | 'lg' | 'xl') => void;
  savedCount: number;
  notesCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  langView,
  setLangView,
  fontSize,
  setFontSize,
  savedCount,
  notesCount = 0,
}) => {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-xs">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Title & Brand */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-11 h-11 rounded-xl bg-amber-900/90 text-amber-100 flex items-center justify-center shadow-xs border border-amber-800">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-heading text-stone-900 tracking-wide whitespace-nowrap">
                Bible Cross Reference
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-900 border border-amber-200 whitespace-nowrap">
                BSI & KJV
              </span>
            </div>
          </div>
        </div>

        {/* View Controls: Language Toggle & Font Resizer */}
        <div className="flex items-center flex-wrap gap-2 justify-center">
          {/* Language Mode Toggle */}
          <div className="inline-flex rounded-lg border border-stone-200 bg-stone-100 p-0.5 text-xs font-medium text-stone-700">
            <button
              type="button"
              onClick={() => setLangView('dual')}
              className={`px-2.5 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                langView === 'dual'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'hover:text-stone-900'
              }`}
              title="View Telugu BSI and English KJV side-by-side"
            >
              <Languages className="w-3.5 h-3.5 text-amber-700" />
              <span>ద్విభాషా (Dual)</span>
            </button>
            <button
              type="button"
              onClick={() => setLangView('telugu')}
              className={`px-2.5 py-1.5 rounded-md transition-all font-telugu ${
                langView === 'telugu'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'hover:text-stone-900'
              }`}
              title="Telugu BSI only"
            >
              తెలుగు BSI
            </button>
            <button
              type="button"
              onClick={() => setLangView('english')}
              className={`px-2.5 py-1.5 rounded-md transition-all ${
                langView === 'english'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'hover:text-stone-900'
              }`}
              title="English KJV only"
            >
              English KJV
            </button>
          </div>

          {/* Font Size Adjuster */}
          <div className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-50 px-2 py-1 text-xs text-stone-600">
            <span className="text-[11px] font-medium text-stone-400 mr-1">Font</span>
            <button
              type="button"
              onClick={() => setFontSize('sm')}
              className={`px-1.5 py-0.5 rounded ${fontSize === 'sm' ? 'bg-stone-200 font-bold text-stone-900' : 'hover:bg-stone-200/60'}`}
              title="Small text"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setFontSize('base')}
              className={`px-1.5 py-0.5 rounded ${fontSize === 'base' ? 'bg-stone-200 font-bold text-stone-900' : 'hover:bg-stone-200/60'}`}
              title="Default text"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSize('lg')}
              className={`px-1.5 py-0.5 rounded ${fontSize === 'lg' ? 'bg-stone-200 font-bold text-stone-900' : 'hover:bg-stone-200/60'}`}
              title="Large text"
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => setFontSize('xl')}
              className={`px-1.5 py-0.5 rounded ${fontSize === 'xl' ? 'bg-stone-200 font-bold text-stone-900' : 'hover:bg-stone-200/60'}`}
              title="Extra large text"
            >
              A++
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-100">
        <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
          <button
            type="button"
            onClick={() => setViewMode('verse')}
            className={`inline-flex items-center gap-2 py-2 px-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              viewMode === 'verse'
                ? 'border-amber-800 text-amber-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Search by Verse</span>
            <span className="font-telugu text-xs opacity-75">(వచన పరిశోధన)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('word')}
            className={`inline-flex items-center gap-2 py-2 px-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              viewMode === 'word'
                ? 'border-amber-800 text-amber-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Search by Word</span>
            <span className="font-telugu text-xs opacity-75">(పద శోధన)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('theme')}
            className={`inline-flex items-center gap-2 py-2 px-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              viewMode === 'theme'
                ? 'border-amber-800 text-amber-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Search by Theme</span>
            <span className="font-telugu text-xs opacity-75">(అంశాల పరిశోధన)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('network')}
            className={`inline-flex items-center gap-2 py-2 px-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              viewMode === 'network'
                ? 'border-amber-800 text-amber-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Cross-Reference Flow</span>
            <span className="font-telugu text-xs opacity-75">(గ్రంథ లంకెలు)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('notes')}
            className={`inline-flex items-center gap-2 py-2 px-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              viewMode === 'notes'
                ? 'border-amber-800 text-amber-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Study Notes</span>
            <span className="font-telugu text-xs opacity-75">(నోట్స్)</span>
            {notesCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs bg-amber-100 text-amber-800 font-semibold">
                {notesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setViewMode('saved')}
            className={`inline-flex items-center gap-2 py-2 px-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              viewMode === 'saved'
                ? 'border-amber-800 text-amber-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Studies</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs bg-amber-100 text-amber-800 font-semibold">
                {savedCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
