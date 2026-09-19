import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Shuffle,
  Palette,
  BookOpen,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Quote,
} from 'lucide-react';
import { DailyVerseItem, getTodaysVerse, getRandomDailyVerse } from '../data/dailyVerses';
import { LanguageView, FontSize } from '../types';
import { copyToClipboard } from '../utils/textFormatters';

interface DailyVerseCardProps {
  onStudyVerse: (refQuery: string) => void;
  onOpenWallpaper: (verse: {
    refStringEn: string;
    refStringTe: string;
    textEn: string;
    textTe: string;
    themeLabelEn?: string;
    themeLabelTe?: string;
  }) => void;
  langView?: LanguageView;
  fontSize?: FontSize;
  isSaved?: (refEn: string) => boolean;
  onToggleSaveDaily?: (daily: DailyVerseItem) => void;
}

export const DailyVerseCard: React.FC<DailyVerseCardProps> = ({
  onStudyVerse,
  onOpenWallpaper,
  langView = 'dual',
  fontSize = 'base',
  isSaved,
  onToggleSaveDaily,
}) => {
  const [currentVerse, setCurrentVerse] = useState<DailyVerseItem>(getTodaysVerse);
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // Format today's human-friendly date
  const todayDateStr = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date());

  const handleShuffle = () => {
    const next = getRandomDailyVerse(currentVerse.id);
    setCurrentVerse(next);
  };

  const handleCopy = async () => {
    const textToCopy = `📖 Daily Verse / నేటి వాక్యం
${currentVerse.refEn} (${currentVerse.refTe})
${currentVerse.themeEn ? `[ ${currentVerse.themeEn} • ${currentVerse.themeTe} ]` : ''}

తెలుగు (BSI):
"${currentVerse.textTe}"

English (KJV):
"${currentVerse.textEn}"

Devotional Reflection:
${currentVerse.reflectionTe}
${currentVerse.reflectionEn}`;

    const success = await copyToClipboard(textToCopy);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleLaunchWallpaper = () => {
    onOpenWallpaper({
      refStringEn: currentVerse.refEn,
      refStringTe: currentVerse.refTe,
      textEn: currentVerse.textEn,
      textTe: currentVerse.textTe,
      themeLabelEn: currentVerse.themeEn,
      themeLabelTe: currentVerse.themeTe,
    });
  };

  // Font scale helper
  const textScaleClass = {
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
  }[fontSize || 'base'];

  const bookmarked = isSaved ? isSaved(currentVerse.refEn) : false;

  return (
    <div
      id="daily-verse-banner"
      className="mb-6 rounded-2xl border border-amber-200/80 dark:border-amber-900/60 bg-gradient-to-br from-amber-50/90 via-stone-50 to-amber-100/40 dark:from-stone-900/90 dark:via-stone-900 dark:to-amber-950/30 p-5 sm:p-6 shadow-xs relative overflow-hidden transition-all duration-200"
    >
      {/* Subtle decorative background watermarks */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
      <Quote className="absolute right-4 bottom-4 w-28 h-28 text-amber-900/[0.04] dark:text-amber-100/[0.03] pointer-events-none -rotate-12" />

      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-amber-200/60 dark:border-stone-800">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Daily Verse Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-900 text-amber-50 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Daily Verse • నేటి వాక్యం</span>
          </span>

          {/* Date Indicator */}
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-stone-400 bg-white/70 dark:bg-stone-800/80 px-2.5 py-1 rounded-full border border-stone-200 dark:border-stone-700">
            <Calendar className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>{todayDateStr}</span>
          </span>

          {/* Theme Pill */}
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-amber-900 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-300/60 dark:border-amber-900/60">
            <span>{currentVerse.themeEn}</span>
            <span className="font-telugu font-normal text-[11px] opacity-90">
              ({currentVerse.themeTe})
            </span>
          </span>
        </div>

        {/* Shuffle & Collapse toggles */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleShuffle}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 dark:border-stone-700 bg-white/80 dark:bg-stone-800/80 hover:bg-amber-100/60 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-all shadow-2xs"
            title="Show another uplifting scripture verse / మరొక వాక్యం"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400" />
            <span className="hidden sm:inline">Another Verse</span>
            <span className="font-telugu text-[11px] sm:hidden">మరొక వాక్యం</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-white/60 dark:hover:bg-stone-800 transition-colors"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Verse Content */}
      {isExpanded && (
        <div className="pt-4 space-y-4 animate-in fade-in duration-150">
          {/* Reference Headline */}
          <div className="flex flex-wrap items-baseline gap-2">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-stone-900 dark:text-stone-100 tracking-tight">
              {currentVerse.refEn}
            </h2>
            <span className="text-lg sm:text-xl font-telugu font-bold text-amber-900 dark:text-amber-400">
              {currentVerse.refTe}
            </span>
          </div>

          {/* Scripture Texts */}
          <div className="space-y-3">
            {/* Telugu BSI Text */}
            {langView !== 'english' && (
              <p
                className={`font-telugu ${textScaleClass} text-stone-900 dark:text-stone-100 font-medium leading-relaxed`}
              >
                &ldquo;{currentVerse.textTe}&rdquo;
              </p>
            )}

            {/* English KJV Text */}
            {langView !== 'telugu' && (
              <p
                className={`font-scripture italic ${textScaleClass} text-stone-700 dark:text-stone-300 leading-relaxed`}
              >
                &ldquo;{currentVerse.textEn}&rdquo;
              </p>
            )}
          </div>

          {/* Devotional Reflection Thought */}
          <div className="p-3.5 rounded-xl bg-white/60 dark:bg-stone-800/50 border border-amber-200/50 dark:border-stone-800 text-xs sm:text-sm text-stone-600 dark:text-stone-400 space-y-1">
            <p className="font-telugu text-stone-800 dark:text-stone-200">
              <span className="font-semibold text-amber-900 dark:text-amber-400">
                నేటి ధ్యానము:{' '}
              </span>
              {currentVerse.reflectionTe}
            </p>
            <p className="text-stone-600 dark:text-stone-400">
              <span className="font-semibold text-stone-800 dark:text-stone-300">
                Daily Reflection:{' '}
              </span>
              {currentVerse.reflectionEn}
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5">
            {/* Left Action buttons: Study & Wallpaper */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Study Cross References button */}
              <button
                type="button"
                onClick={() => onStudyVerse(currentVerse.refEn)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs sm:text-sm font-semibold transition-colors shadow-2xs"
                title="Search and examine cross-references for this passage"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Study Cross-References</span>
                <span className="font-telugu text-xs font-normal opacity-90 hidden md:inline">
                  (పరస్పర లంకెలు)
                </span>
              </button>

              {/* Wallpaper Share Button with custom background colors */}
              <button
                type="button"
                onClick={handleLaunchWallpaper}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-amber-300/90 dark:border-amber-800/80 bg-gradient-to-r from-amber-100 to-amber-200/60 dark:from-amber-950/70 dark:to-stone-900 hover:from-amber-200 hover:to-amber-300/70 text-amber-950 dark:text-amber-200 text-xs sm:text-sm font-semibold transition-all shadow-2xs"
                title="Create and share scripture wallpaper with custom background colors"
              >
                <Palette className="w-4 h-4 text-amber-800 dark:text-amber-400" />
                <span>Share as Wallpaper</span>
                <span className="font-telugu text-xs font-normal opacity-90 hidden sm:inline">
                  (వాల్‌పేపర్ షేర్)
                </span>
              </button>
            </div>

            {/* Right utility buttons: Copy & Bookmark */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/90 dark:bg-stone-800/90 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium transition-colors shadow-2xs"
                title="Copy verse text"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              {onToggleSaveDaily && (
                <button
                  type="button"
                  onClick={() => onToggleSaveDaily(currentVerse)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-colors shadow-2xs ${
                    bookmarked
                      ? 'border-amber-800 bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-semibold'
                      : 'border-stone-300 dark:border-stone-700 bg-white/90 dark:bg-stone-800/90 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                  title={bookmarked ? 'Remove bookmark' : 'Bookmark this verse'}
                >
                  {bookmarked ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5 text-stone-500" />
                      <span>Save</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
