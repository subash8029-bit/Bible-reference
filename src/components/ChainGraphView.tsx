import React from 'react';
import { Network, ArrowRight, ArrowUpRight, Sparkles, BookOpen } from 'lucide-react';
import { VerseCrossReferenceData } from '../types';
import { getRelationshipMeta } from '../utils/textFormatters';

interface ChainGraphViewProps {
  data: VerseCrossReferenceData;
  onNavigateVerse: (ref: string) => void;
}

export const ChainGraphView: React.FC<ChainGraphViewProps> = ({
  data,
  onNavigateVerse,
}) => {
  const primary = data.primaryVerse.reference;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-heading flex items-center gap-2">
              <Network className="w-5 h-5 text-amber-800" />
              <span>Scriptural Cross-Reference Flow</span>
            </h2>
            <p className="text-xs sm:text-sm font-telugu text-stone-600">
              వాక్య లంకెల దర్శనము • Visualizing canonical connections across the scriptures
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-stone-600">
            <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200">
              Center: <strong className="text-amber-950 font-heading">{primary.refStringEn}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900">
              {data.crossReferences.length} Links
            </span>
          </div>
        </div>

        {/* Visual Network Flow Layout */}
        <div className="py-8">
          {/* Central Anchor Node */}
          <div className="flex justify-center mb-8">
            <div className="p-5 sm:p-6 bg-gradient-to-br from-amber-900 to-stone-900 text-amber-50 rounded-2xl border-2 border-amber-700/50 shadow-lg text-center max-w-md w-full">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-amber-800/80 text-amber-200 mb-2">
                Focal Scripture / కేంద్ర వాక్యము
              </span>
              <h3 className="text-2xl font-bold font-heading text-white">
                {primary.refStringEn}
              </h3>
              <p className="text-base font-telugu font-semibold text-amber-200 mt-0.5">
                {primary.refStringTe}
              </p>
              <p className="mt-3 text-xs sm:text-sm font-scripture text-amber-100/90 italic line-clamp-3">
                &ldquo;{data.primaryVerse.textEn}&rdquo;
              </p>
            </div>
          </div>

          {/* Connection Lines & Grid of Spoke Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.crossReferences.map((item, idx) => {
              const meta = getRelationshipMeta(item.relationship);
              const target = item.targetRef;

              return (
                <div
                  key={idx}
                  onClick={() => onNavigateVerse(target.refStringEn)}
                  className="group cursor-pointer p-4 bg-stone-50 hover:bg-white rounded-xl border border-stone-200 hover:border-amber-700 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Relationship badge */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${meta.badgeColor}`}>
                        <span>{meta.icon}</span>
                        <span>{item.relationshipLabelEn}</span>
                      </span>
                      <span className="text-[11px] font-telugu text-stone-500 font-medium">
                        {meta.defaultTe}
                      </span>
                    </div>

                    {/* Reference Title */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <h4 className="text-base font-bold text-stone-900 font-heading group-hover:text-amber-900 transition-colors">
                        {target.refStringEn}
                      </h4>
                      <span className="text-xs font-telugu font-semibold text-amber-950">
                        {target.refStringTe}
                      </span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-xs font-telugu text-stone-700 line-clamp-2 mb-1">
                      {item.textTe}
                    </p>
                    <p className="text-xs font-scripture text-stone-600 line-clamp-2">
                      &ldquo;{item.textEn}&rdquo;
                    </p>
                  </div>

                  {/* Foot action */}
                  <div className="mt-3 pt-2.5 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 group-hover:text-amber-900 font-medium">
                    <span>Pivot & study verse</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
