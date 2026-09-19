import React from 'react';
import { Bookmark, Trash2, ArrowRight, BookOpen, Copy, Check } from 'lucide-react';
import { VerseCrossReferenceData } from '../types';
import { copyToClipboard } from '../utils/textFormatters';

interface SavedBookmarksProps {
  savedList: Array<{
    refEn: string;
    savedAt: string;
    data: VerseCrossReferenceData;
  }>;
  onSelectVerse: (refQuery: string) => void;
  onRemoveSaved: (refEn: string) => void;
  onClearAll: () => void;
}

export const SavedBookmarks: React.FC<SavedBookmarksProps> = ({
  savedList,
  onSelectVerse,
  onRemoveSaved,
  onClearAll,
}) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const handleCopy = async (refEn: string, item: VerseCrossReferenceData) => {
    const text = `[${item.primaryVerse.reference.refStringEn} / ${item.primaryVerse.reference.refStringTe}]
Telugu BSI: ${item.primaryVerse.textTe}
English KJV: ${item.primaryVerse.textEn}
Cross References:
${item.crossReferences.map((c) => `- ${c.targetRef.refStringEn} (${c.targetRef.refStringTe}): ${c.relationshipLabelEn}`).join('\n')}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(refEn);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  if (savedList.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 text-center shadow-xs">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto mb-3">
          <Bookmark className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-stone-900 font-heading">
          No Saved Studies Yet
        </h3>
        <p className="text-xs sm:text-sm font-telugu text-stone-600 max-w-sm mx-auto mt-1">
          మీరు ధ్యానించిన వచనములను లేదా పరస్పర ప్రస్తావనలను సేవ్ చేసుకొనుటకు &quot;Save&quot; బటన్‌ను ఉపయోగించండి.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-stone-900 font-heading flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-800" />
            <span>Saved Scripture Studies</span>
          </h2>
          <p className="text-xs font-telugu text-stone-600">
            సేవ్ చేసిన వచనాలు మరియు పరస్పర ప్రస్తావనలు ({savedList.length})
          </p>
        </div>

        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-medium text-red-600 hover:text-red-800 transition-colors flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-200 hover:bg-red-50"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {savedList.map(({ refEn, savedAt, data }) => {
          const p = data.primaryVerse.reference;
          return (
            <div
              key={refEn}
              className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 shadow-xs hover:border-amber-700/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-stone-900 font-heading">
                    {p.refStringEn}
                  </h3>
                  <span className="text-sm font-telugu font-semibold text-amber-900">
                    {p.refStringTe}
                  </span>
                  <span className="text-[11px] text-stone-400 ml-2">
                    {new Date(savedAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-xs font-telugu text-stone-800 line-clamp-1">
                  {data.primaryVerse.textTe}
                </p>
                <p className="text-xs font-scripture text-stone-600 line-clamp-1 italic">
                  &ldquo;{data.primaryVerse.textEn}&rdquo;
                </p>

                <div className="flex items-center gap-1.5 pt-1 text-[11px] text-stone-500">
                  <span>{data.crossReferences.length} Connected Cross-References</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopy(refEn, data)}
                  className="p-2 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
                  title="Copy study content"
                >
                  {copiedKey === refEn ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onRemoveSaved(refEn)}
                  className="p-2 rounded-lg border border-stone-200 text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectVerse(refEn)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <span>Open Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
