import React, { useState, useEffect } from 'react';
import {
  X,
  FileText,
  Bookmark,
  Tag,
  Save,
  Palette,
} from 'lucide-react';
import { StudyNote } from '../types';

interface NoteEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (noteData: {
    title: string;
    content: string;
    verseRefEn?: string;
    verseRefTe?: string;
    tags: string[];
    color?: string;
  }, id?: string) => void;
  initialNote?: StudyNote | null;
  defaultVerseRef?: { refEn: string; refTe: string } | null;
}

const PRESET_TAGS = [
  'Sermon Prep / ప్రసంగము',
  'Devotional / ధ్యానము',
  'Theology / వేదాంతము',
  'Prayer / ప్రార్థన',
  'Cross-Reference / సమాంతర వాక్యాలు',
  'Personal / వ్యక్తిగత ఆలోచన',
];

const NOTE_COLORS = [
  { id: 'amber', bg: 'bg-amber-50 dark:bg-amber-950/40', border: 'border-amber-300 dark:border-amber-800', dot: 'bg-amber-500' },
  { id: 'emerald', bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-300 dark:border-emerald-800', dot: 'bg-emerald-500' },
  { id: 'sky', bg: 'bg-sky-50 dark:bg-sky-950/40', border: 'border-sky-300 dark:border-sky-800', dot: 'bg-sky-500' },
  { id: 'purple', bg: 'bg-purple-50 dark:bg-purple-950/40', border: 'border-purple-300 dark:border-purple-800', dot: 'bg-purple-500' },
  { id: 'stone', bg: 'bg-stone-100 dark:bg-stone-800/50', border: 'border-stone-300 dark:border-stone-700', dot: 'bg-stone-500' },
];

export const NoteEditorModal: React.FC<NoteEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialNote,
  defaultVerseRef,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [verseRefEn, setVerseRefEn] = useState('');
  const [verseRefTe, setVerseRefTe] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState('');
  const [color, setColor] = useState('amber');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || '');
      setContent(initialNote.content || '');
      setVerseRefEn(initialNote.verseRefEn || '');
      setVerseRefTe(initialNote.verseRefTe || '');
      setSelectedTags(initialNote.tags || []);
      setColor(initialNote.color || 'amber');
    } else {
      setTitle('');
      setContent('');
      if (defaultVerseRef) {
        setVerseRefEn(defaultVerseRef.refEn);
        setVerseRefTe(defaultVerseRef.refTe);
        setTitle(`Study Notes on ${defaultVerseRef.refEn} (${defaultVerseRef.refTe})`);
      } else {
        setVerseRefEn('');
        setVerseRefTe('');
        setTitle('');
      }
      setSelectedTags(['Devotional / ధ్యానము']);
      setColor('amber');
    }
    setValidationError('');
  }, [initialNote, defaultVerseRef, isOpen]);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAddCustomTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const trimmed = customTagInput.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags((prev) => [...prev, trimmed]);
      setCustomTagInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) {
      setValidationError('Please enter a note title or reflection content.');
      return;
    }

    onSave(
      {
        title: title.trim() || (verseRefEn ? `Notes on ${verseRefEn}` : 'Scripture Study Note'),
        content: content.trim(),
        verseRefEn: verseRefEn.trim() || undefined,
        verseRefTe: verseRefTe.trim() || undefined,
        tags: selectedTags,
        color,
      },
      initialNote ? initialNote.id : undefined
    );
    onClose();
  };

  return (
    <div
      id="note-editor-backdrop"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="note-editor-container"
        className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-heading">
                {initialNote ? 'Edit Study Note' : 'Create Scripture Study Note'}
              </h3>
              <p className="text-xs text-stone-500 font-telugu">
                పరిశుద్ధ గ్రంథ ధ్యానము &amp; పరిశోధనా నోట్స్
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
          {validationError && (
            <p className="text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
              {validationError}
            </p>
          )}

          {/* Note Title */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
              Title / శీర్షిక
            </label>
            <input
              id="note-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. God's Love in John 3:16 / దేవుని ప్రేమ ధ్యానం"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-800/40 focus:border-amber-800"
            />
          </div>

          {/* Linked Verse Reference (Optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                <Bookmark className="w-3.5 h-3.5 text-amber-800 dark:text-amber-500" />
                <span>Linked Verse (English)</span>
              </label>
              <input
                type="text"
                value={verseRefEn}
                onChange={(e) => setVerseRefEn(e.target.value)}
                placeholder="e.g. John 3:16"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-800/40"
              />
            </div>
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                <Bookmark className="w-3.5 h-3.5 text-amber-800 dark:text-amber-500" />
                <span>సంబంధిత వచనము (Telugu)</span>
              </label>
              <input
                type="text"
                value={verseRefTe}
                onChange={(e) => setVerseRefTe(e.target.value)}
                placeholder="ఉదా: యోహాను 3:16"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-telugu focus:outline-hidden focus:ring-2 focus:ring-amber-800/40"
              />
            </div>
          </div>

          {/* Content / Reflection */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                Reflections &amp; Study Notes / వివరణ &amp; అంతరార్థం
              </label>
              <span className="text-[11px] text-stone-400">Supports English &amp; తెలుగు</span>
            </div>
            <textarea
              id="note-content-input"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your study observations, sermon points, Greek/Hebrew insights, or prayer notes here...&#10;&#10;మీ ధ్యాన భావాలు, ప్రసంగ ముఖ్య విభాగములు లేదా ప్రార్థన అంశాలను ఇక్కడ నమోదు చేసుకోండి..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm leading-relaxed font-sans focus:outline-hidden focus:ring-2 focus:ring-amber-800/40 focus:border-amber-800"
            />
          </div>

          {/* Note Color Accent */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
              <Palette className="w-3.5 h-3.5 text-stone-500" />
              Note Color / వర్ణము
            </label>
            <div className="flex items-center gap-2.5">
              {NOTE_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColor(c.id)}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                    color === c.id
                      ? 'ring-2 ring-stone-900 dark:ring-stone-100 ring-offset-2 scale-110'
                      : 'hover:scale-105 border-transparent'
                  }`}
                  style={{
                    backgroundColor:
                      c.id === 'amber'
                        ? '#f59e0b'
                        : c.id === 'emerald'
                        ? '#10b981'
                        : c.id === 'sky'
                        ? '#0284c7'
                        : c.id === 'purple'
                        ? '#8b5cf6'
                        : '#78716c',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
              <Tag className="w-3.5 h-3.5 text-stone-500" />
              Category Tags / ట్యాగులు
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {PRESET_TAGS.map((t) => {
                const isSelected = selectedTags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTag(t)}
                    className={`px-2.5 py-1 text-[11px] rounded-full transition-all ${
                      isSelected
                        ? 'bg-amber-900 text-amber-50 font-medium'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Custom Tag Add */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                onKeyDown={handleAddCustomTag}
                placeholder="Add custom tag (e.g. 'Youth Fellowship')..."
                className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
              />
              <button
                type="button"
                onClick={handleAddCustomTag}
                className="px-3 py-1.5 rounded-lg bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-medium hover:bg-stone-300"
              >
                + Add Tag
              </button>
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 text-xs font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            id="save-note-submit-btn"
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold shadow-sm transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{initialNote ? 'Update Note' : 'Save Study Note'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
