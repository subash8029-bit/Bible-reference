import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Book, Sparkles, Filter } from 'lucide-react';
import { BIBLE_BOOKS, findBook } from '../data/bibleBooks';
import { BibleBook, Testament } from '../types';

interface VerseSelectorProps {
  onSelectVerse: (refQuery: string) => void;
  currentQuery: string;
  isLoading?: boolean;
}

const POPULAR_ANCHOR_VERSES = [
  { refEn: 'John 3:16', refTe: 'యోహాను 3:16', labelEn: 'God\'s Love', labelTe: 'దేవుని ప్రేమ' },
  { refEn: 'Romans 8:28', refTe: 'రోమీయులకు 8:28', labelEn: 'All Things for Good', labelTe: 'సమకూడి మేలు' },
  { refEn: 'Genesis 1:1', refTe: 'ఆదికాండము 1:1', labelEn: 'The Beginning', labelTe: 'ఆదియందు సృష్టి' },
  { refEn: 'Psalms 23:1', refTe: 'కీర్తనలు 23:1', labelEn: 'The Lord is My Shepherd', labelTe: 'యెహోవా నా కాపరి' },
  { refEn: 'Isaiah 53:5', refTe: 'యెషయా 53:5', labelEn: 'Suffering Servant', labelTe: 'గాయపరచబడిన దాసుడు' },
  { refEn: 'Ephesians 2:8', refTe: 'ఎఫెసీయులకు 2:8', labelEn: 'Saved by Grace', labelTe: 'కృపచేత రక్షణ' },
  { refEn: 'Proverbs 3:5', refTe: 'సామెతలు 3:5', labelEn: 'Trust with All Heart', labelTe: 'పూర్ణహృదయముతో నమ్ముము' },
  { refEn: 'Galatians 2:20', refTe: 'గలతీయులకు 2:20', labelEn: 'Crucified with Christ', labelTe: 'క్రీస్తుతో సిలువ' },
  { refEn: 'Hebrews 11:1', refTe: 'హెబ్రీయులకు 11:1', labelEn: 'Definition of Faith', labelTe: 'విశ్వాసము' },
];

export const VerseSelector: React.FC<VerseSelectorProps> = ({
  onSelectVerse,
  currentQuery,
  isLoading = false,
}) => {
  const [inputVal, setInputVal] = useState(currentQuery || 'John 3:16');
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTestament, setSelectedTestament] = useState<Testament>('NT');
  const [selectedBook, setSelectedBook] = useState<BibleBook>(
    BIBLE_BOOKS.find((b) => b.id === 'JHN') || BIBLE_BOOKS[42]
  );
  const [selectedChapter, setSelectedChapter] = useState(3);
  const [selectedVerse, setSelectedVerse] = useState(16);

  // Filter books by selected testament
  const filteredBooks = useMemo(() => {
    return BIBLE_BOOKS.filter((b) => b.testament === selectedTestament);
  }, [selectedTestament]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputVal.trim()) {
      onSelectVerse(inputVal.trim());
    }
  };

  const handleApplyPicker = () => {
    const formatted = `${selectedBook.nameEn} ${selectedChapter}:${selectedVerse}`;
    setInputVal(formatted);
    setShowPicker(false);
    onSelectVerse(formatted);
  };

  const handleQuickChip = (refEn: string) => {
    setInputVal(refEn);
    onSelectVerse(refEn);
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 shadow-xs mb-6">
      {/* Search Input Bar */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 mb-3.5">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type verse e.g. John 3:16 or యోహాను 3:16, Rom 8:28, Isa 53:5..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800 text-sm sm:text-base font-medium transition-all"
          />
        </div>

        <div className="flex gap-2">
          {/* Visual Picker Toggle Button */}
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap"
            title="Open visual book, chapter & verse picker"
          >
            <Book className="w-4 h-4 text-amber-800" />
            <span className="hidden sm:inline">Select Book</span>
            <span className="sm:hidden">Picker</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showPicker ? 'rotate-180' : ''}`} />
          </button>

          {/* Search Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 rounded-lg bg-amber-900 hover:bg-amber-950 text-amber-50 text-sm font-semibold transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-300" />
            )}
            <span>Cross-Reference</span>
          </button>
        </div>
      </form>

      {/* Interactive Visual Book & Chapter & Verse Selector */}
      {showPicker && (
        <div className="mt-4 pt-4 border-t border-stone-200 bg-stone-50/80 -mx-4 -mb-4 p-4 sm:p-5 rounded-b-xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-stone-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Bible Book Explorer
              </span>
            </div>

            {/* Testament Toggle */}
            <div className="inline-flex rounded-lg border border-stone-300 bg-stone-200 p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSelectedTestament('OT')}
                className={`px-3 py-1 rounded-md transition-all ${
                  selectedTestament === 'OT'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Old Testament (పాత 39)
              </button>
              <button
                type="button"
                onClick={() => setSelectedTestament('NT')}
                className={`px-3 py-1 rounded-md transition-all ${
                  selectedTestament === 'NT'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                New Testament (క్రొత్త 27)
              </button>
            </div>
          </div>

          {/* Book Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5 max-h-48 overflow-y-auto pr-1 mb-4">
            {filteredBooks.map((book) => {
              const isSelected = selectedBook.id === book.id;
              return (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => {
                    setSelectedBook(book);
                    setSelectedChapter(1);
                    setSelectedVerse(1);
                  }}
                  className={`text-left p-2 rounded-lg border text-xs transition-all ${
                    isSelected
                      ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-xs font-semibold'
                      : 'bg-white text-stone-800 border-stone-200 hover:border-amber-700/50 hover:bg-stone-50'
                  }`}
                >
                  <div className="font-semibold truncate">{book.nameEn}</div>
                  <div className={`text-[11px] font-telugu truncate ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                    {book.nameTe}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Chapter & Verse selection row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200">
            <div className="flex items-center gap-4">
              {/* Chapter input / dropdown */}
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-medium text-stone-700">Chapter / అధ్యాయం:</label>
                <select
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(Number(e.target.value))}
                  className="bg-white border border-stone-300 rounded-md px-2.5 py-1 text-xs font-semibold text-stone-800 focus:ring-1 focus:ring-amber-800"
                >
                  {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map((ch) => (
                    <option key={ch} value={ch}>
                      {ch}
                    </option>
                  ))}
                </select>
              </div>

              {/* Verse input */}
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-medium text-stone-700">Verse / వచనం:</label>
                <input
                  type="number"
                  min="1"
                  max="176"
                  value={selectedVerse}
                  onChange={(e) => setSelectedVerse(Math.max(1, Number(e.target.value)))}
                  className="w-16 bg-white border border-stone-300 rounded-md px-2 py-1 text-xs font-semibold text-stone-800 focus:ring-1 focus:ring-amber-800"
                />
              </div>
            </div>

            {/* Quick Preview & Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-700">
                {selectedBook.nameEn} ({selectedBook.nameTe}) {selectedChapter}:{selectedVerse}
              </span>
              <button
                type="button"
                onClick={handleApplyPicker}
                className="px-4 py-1.5 bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
              >
                Go to Verse
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Anchor Verse Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 scrollbar-none">
        <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider whitespace-nowrap mr-1">
          Quick Cross-Refs:
        </span>
        {POPULAR_ANCHOR_VERSES.map((verse) => (
          <button
            key={verse.refEn}
            type="button"
            onClick={() => handleQuickChip(verse.refEn)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-stone-100 hover:bg-amber-100 hover:text-amber-900 border border-stone-200 text-stone-700 transition-colors whitespace-nowrap"
            title={`${verse.labelEn} - ${verse.labelTe}`}
          >
            <span className="font-semibold">{verse.refEn}</span>
            <span className="text-[10px] text-stone-600 font-telugu">({verse.refTe})</span>
          </button>
        ))}
      </div>
    </div>
  );
};
