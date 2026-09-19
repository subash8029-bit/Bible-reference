import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  X,
  BookOpen,
  Filter,
  Bookmark,
  Share2,
  Copy,
  Check,
  Sparkles,
  FileText,
  ArrowRight,
  Palette,
  ExternalLink,
  Info,
} from 'lucide-react';
import {
  LanguageView,
  FontSize,
  BibleWordSearchResult,
  BibleWordOccurrence,
  VerseCrossReferenceData,
} from '../types';
import { POPULAR_BIBLE_WORDS, searchBibleWordsLocally } from '../data/wordSearchIndex';

interface BibleWordSearchProps {
  langView: LanguageView;
  fontSize: FontSize;
  onNavigateVerse: (ref: string) => void;
  onOpenWallpaper: (data: {
    refStringEn: string;
    refStringTe: string;
    textEn: string;
    textTe: string;
    themeLabelEn?: string;
    themeLabelTe?: string;
  }) => void;
  onCreateNote: (refEn?: string, refTe?: string, defaultContent?: string) => void;
  isSaved?: (refEn: string) => boolean;
  onToggleSave?: (refEn: string, data: VerseCrossReferenceData) => void;
}

export const BibleWordSearch: React.FC<BibleWordSearchProps> = ({
  langView,
  fontSize,
  onNavigateVerse,
  onOpenWallpaper,
  onCreateNote,
  isSaved,
  onToggleSave,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [testamentFilter, setTestamentFilter] = useState<'all' | 'OT' | 'NT'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeepSearching, setIsDeepSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<BibleWordSearchResult | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'canonical' | 'relevance'>('canonical');

  // Input ref for keyboard focus
  const inputRef = useRef<HTMLInputElement>(null);

  // Execute word search
  const executeSearch = async (query: string, deep: boolean = false) => {
    const q = query.trim();
    if (!q) return;

    setActiveQuery(q);
    if (deep) {
      setIsDeepSearching(true);
    } else {
      setIsLoading(true);
    }

    try {
      // 1. Check local index first for instant results
      const local = searchBibleWordsLocally(q, testamentFilter, categoryFilter);
      if (local.occurrences.length > 0 && !deep) {
        setSearchResult(local);
      }

      // 2. Fetch from backend API to query Gemini for deeper Bible coverage across all 66 books
      const res = await fetch('/api/word-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          testament: testamentFilter,
          category: categoryFilter,
          deep,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.occurrences) {
          setSearchResult(json.data);
        }
      } else if (!searchResult && local.occurrences.length > 0) {
        setSearchResult(local);
      }
    } catch (err) {
      console.warn('Word search API error, using local fallback:', err);
      const fallback = searchBibleWordsLocally(q, testamentFilter, categoryFilter);
      setSearchResult(fallback);
    } finally {
      setIsLoading(false);
      setIsDeepSearching(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      executeSearch(searchInput);
    }
  };

  const handleSelectPopularWord = (word: typeof POPULAR_BIBLE_WORDS[0]) => {
    setSearchInput(word.wordEn);
    executeSearch(word.wordEn);
  };

  const handleCopyVerse = (occurrence: BibleWordOccurrence) => {
    const copyText = `${occurrence.reference.refStringEn} (${occurrence.reference.refStringTe})\n\n[తెలుగు BSI]\n${occurrence.textTe}\n\n[English KJV]\n${occurrence.textEn}\n\n— Bible Cross Reference & Concordance`;
    navigator.clipboard.writeText(copyText);
    setCopiedId(occurrence.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleToggleBookmark = (occurrence: BibleWordOccurrence) => {
    if (!onToggleSave) return;
    const dummyCrossRefData: VerseCrossReferenceData = {
      primaryVerse: {
        reference: occurrence.reference,
        textEn: occurrence.textEn,
        textTe: occurrence.textTe,
      },
      contextSummaryEn: occurrence.contextNoteEn || `Bible occurrence for: "${activeQuery}"`,
      contextSummaryTe: occurrence.contextNoteTe || `బైబిల్ పద ప్రస్తావన: "${activeQuery}"`,
      relatedThemes: [
        {
          id: 'word-search',
          nameEn: activeQuery || 'Word Search',
          nameTe: activeQuery || 'పద శోధన',
        },
      ],
      crossReferences: [],
    };
    onToggleSave(occurrence.reference.refStringEn, dummyCrossRefData);
  };

  // Helper to highlight matching words in text safely
  const renderHighlightedText = (text: string, highlightWord?: string) => {
    if (!highlightWord || !highlightWord.trim()) {
      return text;
    }

    const cleanWord = highlightWord.trim();
    // Case-insensitive replacement
    const regex = new RegExp(`(${cleanWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === cleanWord.toLowerCase() ? (
        <mark
          key={i}
          className="bg-amber-200 dark:bg-amber-900/60 text-amber-950 dark:text-amber-100 font-semibold px-1 py-0.5 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Font size class
  const textScaleClass = {
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
  }[fontSize || 'base'];

  // Filtered and sorted occurrences
  const filteredOccurrences = useMemo(() => {
    if (!searchResult?.occurrences) return [];
    let list = [...searchResult.occurrences];

    if (testamentFilter !== 'all') {
      list = list.filter((item) => item.testament === testamentFilter);
    }

    if (categoryFilter !== 'all') {
      list = list.filter(
        (item) =>
          item.category?.toLowerCase() === categoryFilter.toLowerCase() ||
          item.categoryTe?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    return list;
  }, [searchResult, testamentFilter, categoryFilter]);

  return (
    <div id="bible-word-search-container" className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-amber-50 rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 text-xs font-semibold mb-3">
            <Search className="w-3.5 h-3.5" />
            <span>Bible Word & Concordance Search • బైబిల్ పద శోధన</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-white mb-2">
            Search Scripture by Word & Term
          </h2>
          <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed font-telugu">
            పరిశుద్ధ గ్రంథము (Telugu BSI) మరియు English KJV లోని ఏ పదమునైనా, వాక్య భావననైనా సులభముగా శోధించి,
            సంబంధిత సమస్త లేఖన ప్రస్తావనలను పరిశోధించండి.
          </p>

          {/* Search Form */}
          <form onSubmit={handleFormSubmit} className="mt-6 flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search word in Telugu or English (e.g. ప్రేమ, grace, శాంతి, faith, shepherd)..."
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white/20 text-sm sm:text-base font-medium transition-all"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white p-1 rounded-md"
                  title="Clear"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isLoading || !searchInput.trim()}
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>Search Word</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Quick Keywords Cloud */}
      <div className="bg-white dark:bg-stone-900 rounded-xl p-4 sm:p-5 border border-stone-200 dark:border-stone-800 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Popular Biblical Terms (ముఖ్యమైన బైబిల్ పదాలు)
          </span>
          <span className="text-xs text-stone-400">Click to search</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {POPULAR_BIBLE_WORDS.map((item) => {
            const isSelected = activeQuery.toLowerCase() === item.wordEn.toLowerCase();
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectPopularWord(item)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-amber-900 text-amber-50 border-amber-900 font-semibold shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800/80 hover:bg-amber-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                }`}
              >
                <span className="font-telugu font-semibold">{item.wordTe}</span>
                <span className="opacity-60 text-xs">/ {item.wordEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Results or Empty State */}
      {isLoading ? (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-12 text-center shadow-xs">
          <div className="w-10 h-10 border-3 border-amber-900/30 border-t-amber-900 rounded-full animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-heading">
            Searching Biblical Concordance...
          </h3>
          <p className="text-xs sm:text-sm font-telugu text-stone-600 dark:text-stone-400 mt-1">
            పరిశుద్ధ గ్రంథము (Telugu BSI) మరియు English KJV లోని పద ప్రస్తావనలను లెక్కిస్తున్నది...
          </p>
        </div>
      ) : searchResult ? (
        <div className="space-y-4">
          {/* Results Summary Bar */}
          <div className="bg-white dark:bg-stone-900 rounded-xl p-4 sm:p-5 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-heading">
                  Results for &ldquo;{searchResult.searchQuery}&rdquo;
                </h3>
                {searchResult.canonicalWordTe && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold font-telugu bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    {searchResult.canonicalWordTe}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                  {filteredOccurrences.length} of {searchResult.totalOccurrences} scripture verses
                </span>
              </div>

              {(searchResult.meaningTe || searchResult.meaningEn) && (
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 font-telugu">
                  <span className="font-semibold text-amber-900 dark:text-amber-400">భావార్థము: </span>
                  {searchResult.meaningTe || searchResult.meaningEn}
                </p>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {/* Testament Filter */}
              <div className="inline-flex rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800 p-0.5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setTestamentFilter('all')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    testamentFilter === 'all'
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  All ({searchResult.totalOccurrences})
                </button>
                <button
                  type="button"
                  onClick={() => setTestamentFilter('OT')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    testamentFilter === 'OT'
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  OT ({searchResult.otCount})
                </button>
                <button
                  type="button"
                  onClick={() => setTestamentFilter('NT')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    testamentFilter === 'NT'
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  NT ({searchResult.ntCount})
                </button>
              </div>

              {/* Deep AI Search Button */}
              <button
                type="button"
                onClick={() => executeSearch(searchResult.searchQuery, true)}
                disabled={isDeepSearching}
                className="px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 hover:bg-amber-100 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
                title="Search all 66 books of the Bible deeply with Gemini 3.8 Flash"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{isDeepSearching ? 'Searching 66 Books...' : 'Deep Biblical Search'}</span>
              </button>
            </div>
          </div>

          {/* List of Occurrence Cards */}
          {filteredOccurrences.length === 0 ? (
            <div className="bg-white dark:bg-stone-900 rounded-xl p-8 text-center border border-stone-200 dark:border-stone-800">
              <Info className="w-8 h-8 text-amber-600 mx-auto mb-2 opacity-80" />
              <h4 className="text-base font-bold text-stone-800 dark:text-stone-200">
                No verses found in the selected filter ({testamentFilter}).
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Try switching to &ldquo;All Scriptures&rdquo; or click &ldquo;Deep Biblical Search&rdquo; above.
              </p>
              <button
                type="button"
                onClick={() => setTestamentFilter('all')}
                className="mt-3 px-4 py-1.5 text-xs font-semibold bg-amber-900 text-white rounded-lg hover:bg-amber-800"
              >
                Show All Scriptures
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOccurrences.map((occurrence, index) => {
                const bookmarked = isSaved ? isSaved(occurrence.reference.refStringEn) : false;

                return (
                  <div
                    key={occurrence.id || index}
                    className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow"
                  >
                    {/* Header: Book, Chapter:Verse, Testament Badge */}
                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-3 mb-4">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-bold text-xs flex items-center justify-center border border-amber-200 dark:border-amber-800">
                          {index + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                              {occurrence.reference.refStringEn}
                            </h4>
                            <span className="text-xs sm:text-sm font-semibold font-telugu text-amber-900 dark:text-amber-400">
                              ({occurrence.reference.refStringTe})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Testament & Category badges */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            occurrence.testament === 'NT'
                              ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-900 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
                              : 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          }`}
                        >
                          {occurrence.testament === 'NT' ? 'New Testament' : 'Old Testament'}
                        </span>
                        {occurrence.category && (
                          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-medium">
                            {occurrence.categoryTe || occurrence.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Scripture Text in Dual / Single view */}
                    <div className="space-y-3 mb-4">
                      {/* Telugu BSI Text */}
                      {langView !== 'english' && (
                        <p
                          className={`font-telugu ${textScaleClass} text-stone-900 dark:text-stone-100 font-medium leading-relaxed`}
                        >
                          {renderHighlightedText(occurrence.textTe, occurrence.highlightWordTe || searchResult.canonicalWordTe || activeQuery)}
                        </p>
                      )}

                      {/* English KJV Text */}
                      {langView !== 'telugu' && (
                        <p
                          className={`font-scripture italic ${textScaleClass} text-stone-700 dark:text-stone-300 leading-relaxed`}
                        >
                          &ldquo;
                          {renderHighlightedText(occurrence.textEn, occurrence.highlightWordEn || searchResult.canonicalWordEn || activeQuery)}
                          &rdquo;
                        </p>
                      )}
                    </div>

                    {/* Context / Theological insight */}
                    {(occurrence.contextNoteTe || occurrence.contextNoteEn) && (
                      <div className="bg-stone-50 dark:bg-stone-800/50 rounded-lg p-3 border border-stone-200/70 dark:border-stone-700/60 text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-telugu mb-4">
                        <span className="font-semibold text-amber-900 dark:text-amber-400">సందర్భ సూచిక: </span>
                        {occurrence.contextNoteTe || occurrence.contextNoteEn}
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                      {/* Quick Study Cross-Reference Button */}
                      <button
                        type="button"
                        onClick={() => onNavigateVerse(occurrence.reference.refStringEn)}
                        className="px-3 py-1.5 rounded-lg bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                        title="Analyze all cross-references for this passage"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Study Cross-References</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                      </button>

                      {/* Utility buttons */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Wallpaper Studio */}
                        <button
                          type="button"
                          onClick={() =>
                            onOpenWallpaper({
                              refStringEn: occurrence.reference.refStringEn,
                              refStringTe: occurrence.reference.refStringTe,
                              textEn: occurrence.textEn,
                              textTe: occurrence.textTe,
                              themeLabelEn: searchResult.canonicalWordEn || activeQuery,
                              themeLabelTe: searchResult.canonicalWordTe || activeQuery,
                            })
                          }
                          className="px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium flex items-center gap-1 transition-all"
                          title="Generate Wallpaper or Instagram Story Image"
                        >
                          <Palette className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                          <span className="hidden sm:inline">Wallpaper</span>
                        </button>

                        {/* Copy Verse */}
                        <button
                          type="button"
                          onClick={() => handleCopyVerse(occurrence)}
                          className="px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium flex items-center gap-1 transition-all"
                          title="Copy verse to clipboard"
                        >
                          {copiedId === occurrence.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Copy</span>
                            </>
                          )}
                        </button>

                        {/* Bookmark / Save */}
                        {onToggleSave && (
                          <button
                            type="button"
                            onClick={() => handleToggleBookmark(occurrence)}
                            className={`p-1.5 rounded-lg border transition-all ${
                              bookmarked
                                ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                                : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                            }`}
                            title={bookmarked ? 'Saved to Bookmarks' : 'Save verse study'}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                          </button>
                        )}

                        {/* Add Study Note */}
                        <button
                          type="button"
                          onClick={() =>
                            onCreateNote(
                              occurrence.reference.refStringEn,
                              occurrence.reference.refStringTe,
                              `Word Study on "${activeQuery}":\n\nTelugu: ${occurrence.textTe}\n\nEnglish: "${occurrence.textEn}"\n\nReflection:`
                            )
                          }
                          className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
                          title="Add Study Note for this scripture"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Empty / Intro State */
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-8 border border-stone-200 dark:border-stone-800 shadow-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800">
            <Search className="w-8 h-8" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-stone-900 dark:text-stone-100">
              Discover Scripture by Words & Themes
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 font-telugu leading-relaxed">
              బైబిల్ గ్రంథములో దేవుని వాక్యమైన ఏ పదము ఎక్కడెక్కడ ఉపయోగించబడిందో పరిశీలించండి.
              పైనున్న పదాలపై క్లిక్ చేయండి లేదా మీకు కావలసిన పదమును టైప్ చేసి శోధించండి.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left pt-4">
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800">
              <div className="font-bold text-sm text-stone-900 dark:text-stone-100 mb-1">
                Bilingual Concordance
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 font-telugu">
                తెలుగు BSI & English KJV రెండింటిలోనూ పదాల లంకెలను ఒకేసారి పొందండి.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800">
              <div className="font-bold text-sm text-stone-900 dark:text-stone-100 mb-1">
                Keyword Highlighting
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 font-telugu">
                వాక్యములో మీరు వెతికిన పదం ప్రస్ఫుటముగా హైలైట్ చేయబడుతుంది.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800">
              <div className="font-bold text-sm text-stone-900 dark:text-stone-100 mb-1">
                Cross-Reference Bridge
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 font-telugu">
                ఏ వచనమునైనా ఒకే క్లిక్‌తో సమగ్ర క్రాస్-రిఫరెన్స్ పరిశోధనలోనికి మార్చండి.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
