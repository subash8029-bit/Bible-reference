import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  BookOpen,
  Copy,
  Check,
  Tag,
  Compass,
  Layers,
} from 'lucide-react';
import { THEMATIC_TOPICS, searchThemes } from '../data/thematicChains';
import { ThematicTopic, LanguageView } from '../types';
import { copyToClipboard } from '../utils/textFormatters';

interface ThemeExplorerProps {
  langView: LanguageView;
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  onNavigateVerse: (refQuery: string) => void;
  selectedThemeId?: string | null;
}

export const ThemeExplorer: React.FC<ThemeExplorerProps> = ({
  langView,
  fontSize,
  onNavigateVerse,
  selectedThemeId,
}) => {
  const [themeSearch, setThemeSearch] = useState('');
  const [activeTopic, setActiveTopic] = useState<ThematicTopic>(() => {
    if (selectedThemeId) {
      const match = THEMATIC_TOPICS.find((t) => t.id === selectedThemeId);
      if (match) return match;
    }
    return THEMATIC_TOPICS[0];
  });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filteredTopics = searchThemes(themeSearch);

  const fontClass = {
    sm: 'text-sm sm:text-base leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-relaxed',
    xl: 'text-xl sm:text-2xl leading-relaxed',
  }[fontSize];

  const handleCopyStep = async (index: number, text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Theme Search & Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-heading flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-800" />
              <span>Biblical Themes & Cross-Reference Chains</span>
            </h2>
            <p className="text-xs sm:text-sm font-telugu text-stone-600">
              అంశాల వారీగా దేవుని వాక్య శృంఖలము • Trace God&apos;s revelation across the testaments
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={themeSearch}
              onChange={(e) => setThemeSearch(e.target.value)}
              placeholder="Search theme e.g. Grace, ప్రేమ, రక్షణ..."
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-800/30"
            />
          </div>
        </div>

        {/* Theme Pills Grid */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filteredTopics.map((topic) => {
            const isActive = activeTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setActiveTopic(topic)}
                className={`px-3.5 py-2 rounded-xl border text-left transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-900 text-white border-amber-900 shadow-xs font-semibold'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm font-medium">{topic.titleEn}</div>
                  <div className={`text-[11px] font-telugu ${isActive ? 'text-amber-200' : 'text-stone-500'}`}>
                    {topic.titleTe}
                  </div>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-amber-800 text-amber-100' : 'bg-stone-200 text-stone-700'
                }`}>
                  {topic.verses.length} verses
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Theme Detail Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-5 sm:p-7">
        <div className="pb-5 border-b border-stone-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
              {activeTopic.category}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 font-heading">
            {activeTopic.titleEn}
            <span className="ml-3 text-xl font-telugu text-amber-900">
              {activeTopic.titleTe}
            </span>
          </h3>
          <p className="mt-2 text-sm text-stone-600 font-telugu">
            {activeTopic.descriptionTe}
          </p>
          <p className="mt-1 text-xs sm:text-sm text-stone-500">
            {activeTopic.descriptionEn}
          </p>
        </div>

        {/* Ordered Theological Progression Chain */}
        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-stone-700 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-800" />
            <span>Scripture Chain of Revelation</span>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-800/30 space-y-6">
            {activeTopic.verses.map((step, idx) => {
              const copyText = `[${step.refEn} / ${step.refTe}] (${step.stageEn})
Telugu BSI: ${step.textTe}
English KJV: ${step.textEn}
Theological Note: ${step.theologicalNoteEn}`;

              return (
                <div key={idx} className="relative group">
                  {/* Step Dot Marker on Timeline */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-amber-800 flex items-center justify-center text-xs font-bold text-amber-900 shadow-xs">
                    {idx + 1}
                  </div>

                  {/* Step Card */}
                  <div className="bg-stone-50/90 hover:bg-stone-50 rounded-xl border border-stone-200 p-4 sm:p-5 transition-all">
                    {/* Stage Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-stone-200">
                      <div>
                        <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider">
                          {step.stageEn}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-base sm:text-lg font-bold text-stone-900 font-heading">
                            {step.refEn}
                          </span>
                          <span className="text-sm font-telugu font-semibold text-stone-700">
                            {step.refTe}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyStep(idx, copyText)}
                          className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-md transition-colors"
                          title="Copy verse and note"
                        >
                          {copiedIndex === idx ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => onNavigateVerse(step.refEn)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-white hover:bg-amber-900 hover:text-white border border-stone-200 text-stone-700 transition-colors shadow-2xs"
                        >
                          <span>Cross-Reference</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Scripture Text */}
                    <div className="py-3 space-y-2.5">
                      {(langView === 'dual' || langView === 'telugu') && (
                        <div className="pl-3 border-l-2 border-amber-700/50">
                          <p className={`font-telugu text-stone-900 ${fontClass}`}>
                            {step.textTe}
                          </p>
                        </div>
                      )}

                      {(langView === 'dual' || langView === 'english') && (
                        <div className="pl-3 border-l-2 border-stone-300">
                          <p className={`font-scripture text-stone-800 ${fontClass}`}>
                            &ldquo;{step.textEn}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Theological significance note */}
                    <div className="pt-2 border-t border-stone-200 text-xs sm:text-sm text-stone-600 space-y-1">
                      <p className="font-telugu text-stone-700">
                        <span className="font-semibold text-amber-950">ఆత్మీయ సత్యము: </span>
                        {step.theologicalNoteTe}
                      </p>
                      <p className="text-stone-600">
                        <span className="font-semibold text-stone-800">Significance: </span>
                        {step.theologicalNoteEn}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
