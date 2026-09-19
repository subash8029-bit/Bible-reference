import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Tag,
  Trash2,
  Edit3,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  Share2,
  Calendar,
} from 'lucide-react';
import { StudyNote } from '../types';
import { copyToClipboard } from '../utils/textFormatters';

interface NotesViewProps {
  notes: StudyNote[];
  onCreateNote: () => void;
  onEditNote: (note: StudyNote) => void;
  onDeleteNote: (noteId: string) => void;
  onNavigateVerse: (refStr: string) => void;
  onShareNote?: (note: StudyNote) => void;
}

export const NotesView: React.FC<NotesViewProps> = ({
  notes,
  onCreateNote,
  onEditNote,
  onDeleteNote,
  onNavigateVerse,
  onShareNote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract unique tags
  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags || [])));

  // Filter notes
  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      !searchQuery.trim() ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.verseRefEn && n.verseRefEn.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (n.verseRefTe && n.verseRefTe.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = !selectedTag || (n.tags && n.tags.includes(selectedTag));

    return matchesSearch && matchesTag;
  });

  const handleCopyNote = async (note: StudyNote) => {
    const text = `📝 ${note.title}\n` +
      (note.verseRefEn ? `Passage: ${note.verseRefEn} (${note.verseRefTe || ''})\n` : '') +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `${note.content}\n` +
      (note.tags.length > 0 ? `\nTags: #${note.tags.join(' #')}` : '');

    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(note.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const colorStyles: Record<string, { bg: string; border: string; badge: string }> = {
    amber: {
      bg: 'bg-white dark:bg-stone-800/80',
      border: 'border-amber-200 dark:border-amber-900/60',
      badge: 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300',
    },
    emerald: {
      bg: 'bg-white dark:bg-stone-800/80',
      border: 'border-emerald-200 dark:border-emerald-900/60',
      badge: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300',
    },
    sky: {
      bg: 'bg-white dark:bg-stone-800/80',
      border: 'border-sky-200 dark:border-sky-900/60',
      badge: 'bg-sky-100 text-sky-900 dark:bg-sky-950/60 dark:text-sky-300',
    },
    purple: {
      bg: 'bg-white dark:bg-stone-800/80',
      border: 'border-purple-200 dark:border-purple-900/60',
      badge: 'bg-purple-100 text-purple-900 dark:bg-purple-950/60 dark:text-purple-300',
    },
    stone: {
      bg: 'bg-white dark:bg-stone-800/80',
      border: 'border-stone-200 dark:border-stone-700',
      badge: 'bg-stone-100 text-stone-800 dark:bg-stone-700 dark:text-stone-200',
    },
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Toolbar */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300">
              <FileText className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wider">
              Personal Bible Journal
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-heading">
            Scripture Study Notes
            <span className="ml-2.5 text-base sm:text-lg font-telugu text-stone-600 dark:text-stone-400 font-normal">
              వ్యక్తిగత అధ్యయన నోట్స్ ({notes.length})
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Capture devotional reflections, cross-reference insights, and sermon points alongside Telugu &amp; English scriptures.
          </p>
        </div>

        <button
          id="notes-create-btn"
          type="button"
          onClick={onCreateNote}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs sm:text-sm font-semibold shadow-sm active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ New Study Note / కొత్త నోట్</span>
        </button>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by keyword, topic, or verse (e.g. John 3:16, Grace, ప్రేమ)..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-amber-800/40"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
            >
              Clear
            </button>
          )}
        </div>

        {allTags.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap ${
                selectedTag === null
                  ? 'bg-amber-900 text-amber-50 font-semibold'
                  : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50'
              }`}
            >
              All Tags ({notes.length})
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap ${
                  selectedTag === tag
                    ? 'bg-amber-900 text-amber-50 font-semibold'
                    : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-100/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-400 flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-heading">
            {searchQuery || selectedTag ? 'No matching study notes found' : 'No Study Notes Created Yet'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 font-telugu max-w-md mx-auto mt-1 mb-5">
            {searchQuery || selectedTag
              ? 'Try adjusting your search terms or selecting another tag.'
              : 'మీ పరిశుద్ధ గ్రంథ ధ్యానములను, ప్రసంగ అంశాలను ఇక్కడ నమోదు చేసుకొని భద్రపరచండి.'}
          </p>
          <button
            type="button"
            onClick={onCreateNote}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create Your First Study Note</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredNotes.map((note) => {
            const style = colorStyles[note.color || 'amber'] || colorStyles.amber;
            const dateStr = new Date(note.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <div
                key={note.id}
                className={`rounded-2xl border ${style.border} ${style.bg} p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}
              >
                <div>
                  {/* Top row: Linked Verse & Date */}
                  <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-100 dark:border-stone-700/60">
                    {note.verseRefEn ? (
                      <button
                        type="button"
                        onClick={() => onNavigateVerse(note.verseRefEn!)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${style.badge} hover:opacity-85 transition-opacity group`}
                        title="Jump to verse cross-references"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{note.verseRefEn}</span>
                        {note.verseRefTe && (
                          <span className="font-telugu text-[11px] font-medium opacity-90">
                            • {note.verseRefTe}
                          </span>
                        )}
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform ml-0.5" />
                      </button>
                    ) : (
                      <span className="text-xs text-stone-400 font-medium">General Reflection</span>
                    )}

                    <div className="flex items-center gap-1 text-[11px] text-stone-400">
                      <Calendar className="w-3 h-3" />
                      <span>{dateStr}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-heading mb-2 leading-snug">
                    {note.title}
                  </h3>

                  {/* Content */}
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans whitespace-pre-line line-clamp-6 mb-4">
                    {note.content}
                  </p>
                </div>

                {/* Bottom Row: Tags & Actions */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-700/60 flex items-center justify-between gap-2 flex-wrap">
                  {/* Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {note.tags &&
                      note.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300"
                        >
                          #{t}
                        </span>
                      ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 ml-auto">
                    {/* Copy */}
                    <button
                      type="button"
                      onClick={() => handleCopyNote(note)}
                      className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                      title="Copy note text"
                    >
                      {copiedId === note.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => onEditNote(note)}
                      className="p-1.5 text-stone-400 hover:text-amber-800 dark:hover:text-amber-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                      title="Edit note"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => onDeleteNote(note.id)}
                      className="p-1.5 text-stone-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                      title="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Add Note Action Button */}
      <button
        id="notes-fab-create-btn"
        type="button"
        onClick={onCreateNote}
        className="fixed right-5 bottom-20 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-900 hover:bg-amber-800 text-amber-50 shadow-lg active:scale-95 transition-all text-xs sm:text-sm font-semibold border border-amber-700"
        title="Create New Study Note / కొత్త నోట్ రాయండి"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>+ New Note</span>
      </button>
    </div>
  );
};
