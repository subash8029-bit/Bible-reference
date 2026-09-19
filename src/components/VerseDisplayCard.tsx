import React, { useState } from 'react';
import {
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Share2,
  ExternalLink,
  BookOpen,
  Tag,
  Sparkles,
  FileText,
  Palette,
} from 'lucide-react';
import {
  VerseCrossReferenceData,
  CrossReferenceItem,
  LanguageView,
} from '../types';
import { getRelationshipMeta, copyToClipboard } from '../utils/textFormatters';

interface VerseDisplayCardProps {
  data: VerseCrossReferenceData;
  langView: LanguageView;
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  onNavigateVerse: (refQuery: string) => void;
  onSelectTheme?: (themeId: string) => void;
  isSaved?: (refEn: string) => boolean;
  onToggleSave?: (refEn: string, verseData: VerseCrossReferenceData) => void;
  onOpenShare?: () => void;
  onOpenWallpaper?: (verse: {
    refStringEn: string;
    refStringTe: string;
    textEn: string;
    textTe: string;
    themeLabelEn?: string;
    themeLabelTe?: string;
  }) => void;
  onCreateNote?: (refEn: string, refTe: string) => void;
  showConnectionNotes?: boolean;
  showBadges?: boolean;
  showThematicTags?: boolean;
}

export const VerseDisplayCard: React.FC<VerseDisplayCardProps> = ({
  data,
  langView,
  fontSize,
  onNavigateVerse,
  onSelectTheme,
  isSaved,
  onToggleSave,
  onOpenShare,
  onOpenWallpaper,
  onCreateNote,
  showConnectionNotes = true,
  showBadges = true,
  showThematicTags = true,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Font size mapping for scripture body
  const fontClass = {
    sm: 'text-sm sm:text-base leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-relaxed',
    xl: 'text-xl sm:text-2xl leading-relaxed',
  }[fontSize];

  const handleCopy = async (id: string, text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const primaryRef = data.primaryVerse.reference;
  const isPrimarySaved = isSaved ? isSaved(primaryRef.refStringEn) : false;

  const copyPrimaryText = `[${primaryRef.refStringEn} / ${primaryRef.refStringTe}]
Telugu BSI: ${data.primaryVerse.textTe}
English KJV: ${data.primaryVerse.textEn}`;

  return (
    <div className="space-y-6">
      {/* Primary Anchor Verse Card */}
      <div className="bg-white rounded-2xl border-2 border-amber-900/20 shadow-md p-5 sm:p-7 relative overflow-hidden">
        {/* Subtle decorative banner */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900" />

        {/* Card Header with Ref and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Primary Verse / మూల వాక్యము</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-heading">
              {primaryRef.refStringEn}
              <span className="ml-3 text-lg sm:text-xl font-telugu text-amber-900 font-semibold">
                {primaryRef.refStringTe}
              </span>
            </h2>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <button
              type="button"
              onClick={() => handleCopy('primary', copyPrimaryText)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 transition-colors"
              title="Copy verse text in Telugu and English"
            >
              {copiedId === 'primary' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy / కాపీ</span>
                </>
              )}
            </button>

            {onCreateNote && (
              <button
                type="button"
                onClick={() => onCreateNote(primaryRef.refStringEn, primaryRef.refStringTe)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 transition-colors"
                title="Add personal study note to this passage"
              >
                <FileText className="w-3.5 h-3.5 text-amber-800" />
                <span>+ Note</span>
              </button>
            )}

            {onOpenWallpaper && (
              <button
                type="button"
                onClick={() =>
                  onOpenWallpaper({
                    refStringEn: primaryRef.refStringEn,
                    refStringTe: primaryRef.refStringTe,
                    textEn: data.primaryVerse.textEn,
                    textTe: data.primaryVerse.textTe,
                    themeLabelEn: data.relatedThemes?.[0]?.nameEn,
                    themeLabelTe: data.relatedThemes?.[0]?.nameTe,
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 transition-colors"
                title="Create and share scripture wallpaper with custom background colors"
              >
                <Palette className="w-3.5 h-3.5 text-amber-800" />
                <span>Wallpaper</span>
              </button>
            )}

            {onOpenShare && (
              <button
                type="button"
                onClick={onOpenShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 transition-colors"
                title="Share this scripture passage and cross-references"
              >
                <Share2 className="w-3.5 h-3.5 text-stone-500" />
                <span>Share</span>
              </button>
            )}

            {onToggleSave && (
              <button
                type="button"
                onClick={() => onToggleSave(primaryRef.refStringEn, data)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  isPrimarySaved
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-semibold'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-300'
                }`}
                title="Save this verse study"
              >
                {isPrimarySaved ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5 text-amber-800" />
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

        {/* Primary Scripture Text Display */}
        <div className="py-5 space-y-4">
          {/* Telugu BSI Version */}
          {(langView === 'dual' || langView === 'telugu') && (
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-900 mb-2 font-telugu">
                <span>పరిశుద్ధ గ్రంథము (BSI Version)</span>
                <span className="text-stone-600 font-normal">తెలుగు</span>
              </div>
              <p className={`font-telugu text-stone-900 ${fontClass}`}>
                {data.primaryVerse.textTe}
              </p>
            </div>
          )}

          {/* English KJV Version */}
          {(langView === 'dual' || langView === 'english') && (
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
                <span>King James Version (KJV)</span>
                <span className="text-stone-600 font-normal">English</span>
              </div>
              <p className={`font-scripture text-stone-900 ${fontClass}`}>
                &ldquo;{data.primaryVerse.textEn}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Context Summary */}
        {(data.contextSummaryEn || data.contextSummaryTe) && (
          <div className="pt-3 border-t border-stone-200 text-xs sm:text-sm text-stone-600 space-y-1.5">
            {data.contextSummaryTe && (
              <p className="font-telugu text-stone-700">
                <span className="font-semibold text-amber-950">సందర్భోచిత వివరణ: </span>
                {data.contextSummaryTe}
              </p>
            )}
            {data.contextSummaryEn && (
              <p className="text-stone-600">
                <span className="font-semibold text-stone-800">Context: </span>
                {data.contextSummaryEn}
              </p>
            )}
          </div>
        )}

        {/* Related Thematic Tags */}
        {data.relatedThemes && data.relatedThemes.length > 0 && (
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center flex-wrap gap-2">
            <span className="text-xs font-semibold text-stone-600 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              Themes:
            </span>
            {data.relatedThemes.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => onSelectTheme && onSelectTheme(theme.id)}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 border border-stone-200 transition-colors"
              >
                <span>{theme.nameEn}</span>
                <span className="ml-1 text-[11px] font-telugu text-stone-600">({theme.nameTe})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Cross-References Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-700" />
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-heading">
            Connected Cross-References
          </h3>
          <span className="font-telugu text-sm text-stone-600">
            ({data.crossReferences.length} సంబంధిత వచనములు)
          </span>
        </div>
      </div>

      {/* Cross-Reference Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {data.crossReferences.map((item, index) => {
          const meta = getRelationshipMeta(item.relationship);
          const itemRef = item.targetRef;
          const copyItemText = `[${itemRef.refStringEn} / ${itemRef.refStringTe}]
Telugu BSI: ${item.textTe}
English KJV: ${item.textEn}
Relationship: ${item.relationshipLabelEn} (${item.relationshipLabelTe})
Connection: ${item.connectionNoteEn}`;

          return (
            <div
              key={item.id || index}
              className="bg-white rounded-xl border border-stone-200 hover:border-amber-700/40 p-5 shadow-xs transition-all hover:shadow-md"
            >
              {/* Reference Header & Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-stone-150">
                <div className="flex items-center flex-wrap gap-2.5">
                  <span className="text-lg sm:text-xl font-bold text-stone-900 font-heading">
                    {itemRef.refStringEn}
                  </span>
                  <span className="text-base font-telugu font-semibold text-amber-900">
                    {itemRef.refStringTe}
                  </span>

                  {/* Relationship Badge */}
                  {showBadges && (
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${meta.badgeColor}`}
                    >
                      <span>{meta.icon}</span>
                      <span>{item.relationshipLabelEn || meta.defaultEn}</span>
                      <span className="font-telugu text-[11px] opacity-90">
                        ({item.relationshipLabelTe || meta.defaultTe})
                      </span>
                    </span>
                  )}
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(item.id || `item-${index}`, copyItemText)}
                    className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-md transition-colors"
                    title="Copy cross-reference"
                  >
                    {copiedId === (item.id || `item-${index}`) ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {/* Pivot to this verse button */}
                  <button
                    type="button"
                    onClick={() => onNavigateVerse(itemRef.refStringEn)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-stone-100 hover:bg-amber-900 hover:text-white text-stone-700 transition-colors shadow-2xs"
                    title={`Explore cross-references starting from ${itemRef.refStringEn}`}
                  >
                    <span>Cross-Reference this</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scripture text display */}
              <div className="py-3.5 space-y-3">
                {/* Telugu BSI */}
                {(langView === 'dual' || langView === 'telugu') && (
                  <div className="pl-3 border-l-2 border-amber-700/50">
                    <p className={`font-telugu text-stone-900 ${fontClass}`}>
                      {item.textTe}
                    </p>
                  </div>
                )}

                {/* English KJV */}
                {(langView === 'dual' || langView === 'english') && (
                  <div className="pl-3 border-l-2 border-stone-300">
                    <p className={`font-scripture text-stone-800 ${fontClass}`}>
                      &ldquo;{item.textEn}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Connection theological explanation note */}
              {(showConnectionNotes || (showThematicTags && item.thematicTags?.length > 0)) && (
                <div className="mt-2 pt-3 border-t border-stone-100 bg-stone-50/70 -mx-5 -mb-5 p-4 rounded-b-xl text-xs sm:text-sm text-stone-600 space-y-1">
                  {showConnectionNotes && item.connectionNoteTe && (
                    <p className="font-telugu text-stone-800">
                      <span className="font-semibold text-amber-950">సంబంధం / భావం: </span>
                      {item.connectionNoteTe}
                    </p>
                  )}
                  {showConnectionNotes && item.connectionNoteEn && (
                    <p className="text-stone-600">
                      <span className="font-semibold text-stone-800">Connection Note: </span>
                      {item.connectionNoteEn}
                    </p>
                  )}

                  {showThematicTags && item.thematicTags && item.thematicTags.length > 0 && (
                    <div className="pt-2 flex items-center flex-wrap gap-1.5">
                      {item.thematicTags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-white text-stone-600 border border-stone-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
