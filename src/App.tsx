import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { VerseSelector } from './components/VerseSelector';
import { VerseDisplayCard } from './components/VerseDisplayCard';
import { ThemeExplorer } from './components/ThemeExplorer';
import { ChainGraphView } from './components/ChainGraphView';
import { SavedBookmarks } from './components/SavedBookmarks';
import { NotesView } from './components/NotesView';
import { NoteEditorModal } from './components/NoteEditorModal';
import { ShareModal } from './components/ShareModal';
import { SettingsModal } from './components/SettingsModal';
import { BottomMenu } from './components/BottomMenu';
import { DailyVerseCard } from './components/DailyVerseCard';
import { WallpaperModal, WallpaperData } from './components/WallpaperModal';
import { BibleWordSearch } from './components/BibleWordSearch';
import { AndroidAppModal } from './components/AndroidAppModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { DailyVerseItem } from './data/dailyVerses';
import { CURATED_VERSES, getCuratedReference } from './data/curatedReferences';
import {
  VerseCrossReferenceData,
  ViewMode,
  LanguageView,
  AppSettings,
  StudyNote,
} from './types';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface SavedItem {
  refEn: string;
  savedAt: string;
  data: VerseCrossReferenceData;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'parchment',
  defaultLang: 'dual',
  fontSize: 'base',
  showConnectionNotes: true,
  showBadges: true,
  showThematicTags: true,
};

const INITIAL_NOTE_SAMPLE: StudyNote = {
  id: 'sample-note-1',
  title: "The Heart of the Gospel: God's Agape Love",
  content: "John 3:16 captures the fullness of God's sacrificial love. Notice the connection to Genesis 22:2 (Abraham and Isaac)—the Father offering His only begotten Son. Through faith, we pass from eternal death into everlasting life.\n\nతెలుగు ధ్యానం: దేవుడు లోకమును ఎంతగానో ప్రేమించెను. ఈ ప్రేమ క్రియారూపమైనది. తన అద్వితీయ కుమారుని మన కొరకు బలిగా అనుగ్రహించెను.",
  verseRefEn: 'John 3:16',
  verseRefTe: 'యోహాను 3:16',
  tags: ['Devotional / ధ్యానము', 'Theology / వేదాంతము'],
  createdAt: new Date(Date.now() - 86400000).toISOString(),
  updatedAt: new Date(Date.now() - 86400000).toISOString(),
  color: 'amber',
};

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('verse');

  // Application Settings
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem('bible_app_settings');
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Failed to parse settings', e);
    }
    return DEFAULT_SETTINGS;
  });

  const [currentQuery, setCurrentQuery] = useState('John 3:16');
  const [verseData, setVerseData] = useState<VerseCrossReferenceData>(
    CURATED_VERSES['john 3:16']
  );
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Modals state
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isWallpaperOpen, setIsWallpaperOpen] = useState(false);
  const [wallpaperData, setWallpaperData] = useState<WallpaperData | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isNoteEditorOpen, setIsNoteEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null);
  const [defaultVerseForNote, setDefaultVerseForNote] = useState<{
    refEn: string;
    refTe: string;
  } | null>(null);

  const handleOpenWallpaperForData = (data: WallpaperData) => {
    setWallpaperData(data);
    setIsWallpaperOpen(true);
  };

  // In-memory cache for queries
  const [queryCache, setQueryCache] = useState<Record<string, VerseCrossReferenceData>>({
    'john 3:16': CURATED_VERSES['john 3:16'],
    'romans 8:28': CURATED_VERSES['romans 8:28'],
    'genesis 1:1': CURATED_VERSES['genesis 1:1'],
    'psalms 23:1': CURATED_VERSES['psalms 23:1'],
    'isaiah 53:5': CURATED_VERSES['isaiah 53:5'],
    'ephesians 2:8': CURATED_VERSES['ephesians 2:8'],
  });

  // Saved bookmarks
  const [savedList, setSavedList] = useState<SavedItem[]>(() => {
    try {
      const stored = localStorage.getItem('bible_saved_studies');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Study Notes
  const [notes, setNotes] = useState<StudyNote[]>(() => {
    try {
      const stored = localStorage.getItem('bible_study_notes');
      return stored ? JSON.parse(stored) : [INITIAL_NOTE_SAMPLE];
    } catch {
      return [INITIAL_NOTE_SAMPLE];
    }
  });

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem('bible_app_settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  }, [settings]);

  // Apply dark mode class to document
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Persist saved list
  useEffect(() => {
    try {
      localStorage.setItem('bible_saved_studies', JSON.stringify(savedList));
    } catch (e) {
      console.error('Failed to save savedList', e);
    }
  }, [savedList]);

  // Persist notes
  useEffect(() => {
    try {
      localStorage.setItem('bible_study_notes', JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save notes', e);
    }
  }, [notes]);

  // Search function for a verse
  const fetchVerseCrossReferences = useCallback(
    async (queryStr: string) => {
      setErrorMsg(null);
      const cleanKey = queryStr.trim().toLowerCase();

      // 1. Check in-memory query cache
      if (queryCache[cleanKey]) {
        setVerseData(queryCache[cleanKey]);
        setCurrentQuery(queryStr);
        setViewMode('verse');
        return;
      }

      // 2. Check curated instant dictionary
      const curated = getCuratedReference(queryStr);
      if (curated) {
        setVerseData(curated);
        setCurrentQuery(queryStr);
        setQueryCache((prev) => ({ ...prev, [cleanKey]: curated }));
        setViewMode('verse');
        return;
      }

      // 3. Fall back to backend endpoint for any arbitrary scripture
      setIsLoading(true);
      try {
        const res = await fetch('/api/cross-reference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: queryStr, type: 'verse' }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Server returned ${res.status}`);
        }

        const json = await res.json();
        if (json.data && json.data.primaryVerse) {
          setVerseData(json.data);
          setCurrentQuery(queryStr);
          setQueryCache((prev) => ({ ...prev, [cleanKey]: json.data }));
          setViewMode('verse');
        } else {
          throw new Error('Could not find cross references for this verse reference.');
        }
      } catch (err: any) {
        console.error('Error fetching cross-references:', err);
        setErrorMsg(
          err.message || 'Unable to retrieve cross-reference data. Please verify the verse format.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [queryCache]
  );

  // Check URL query on initial load for deep linking (e.g. ?verse=John+3:16)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('verse');
      if (v) {
        fetchVerseCrossReferences(v);
      }
    }
  }, [fetchVerseCrossReferences]);

  // Bookmark toggling
  const handleToggleSave = (refEn: string, dataToSave: VerseCrossReferenceData) => {
    setSavedList((prev) => {
      const exists = prev.some((item) => item.refEn === refEn);
      if (exists) {
        return prev.filter((item) => item.refEn !== refEn);
      } else {
        return [
          {
            refEn,
            savedAt: new Date().toISOString(),
            data: dataToSave,
          },
          ...prev,
        ];
      }
    });
  };

  const handleToggleSaveDaily = (daily: DailyVerseItem) => {
    const existing = savedList.find(
      (item) => item.refEn.toLowerCase() === daily.refEn.toLowerCase()
    );
    if (existing) {
      setSavedList((prev) =>
        prev.filter((item) => item.refEn.toLowerCase() !== daily.refEn.toLowerCase())
      );
    } else {
      const curated = getCuratedReference(daily.refEn);
      const itemData: VerseCrossReferenceData = curated || {
        primaryVerse: {
          reference: {
            bookEn: daily.refEn.split(' ')[0],
            bookTe: daily.refTe.split(' ')[0],
            chapter: 1,
            verse: 1,
            refStringEn: daily.refEn,
            refStringTe: daily.refTe,
          },
          textEn: daily.textEn,
          textTe: daily.textTe,
        },
        crossReferences: [],
        relatedThemes: daily.themeEn
          ? [
              {
                id: daily.themeEn.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                nameEn: daily.themeEn,
                nameTe: daily.themeTe,
              },
            ]
          : [],
      };
      setSavedList((prev) => [
        {
          refEn: daily.refEn,
          savedAt: new Date().toISOString(),
          data: itemData,
        },
        ...prev,
      ]);
    }
  };

  const isSaved = (refEn: string) => savedList.some((item) => item.refEn.toLowerCase() === refEn.toLowerCase());

  const handleSelectTheme = (themeId: string) => {
    setSelectedThemeId(themeId);
    setViewMode('theme');
  };

  // Note actions
  const handleOpenCreateNote = (verseRefEn?: string, verseRefTe?: string) => {
    setEditingNote(null);
    if (verseRefEn) {
      setDefaultVerseForNote({ refEn: verseRefEn, refTe: verseRefTe || '' });
    } else {
      const primary = verseData?.primaryVerse?.reference;
      if (primary) {
        setDefaultVerseForNote({ refEn: primary.refStringEn, refTe: primary.refStringTe });
      } else {
        setDefaultVerseForNote(null);
      }
    }
    setIsNoteEditorOpen(true);
  };

  const handleOpenEditNote = (note: StudyNote) => {
    setEditingNote(note);
    setDefaultVerseForNote(null);
    setIsNoteEditorOpen(true);
  };

  const handleSaveNote = (
    noteData: {
      title: string;
      content: string;
      verseRefEn?: string;
      verseRefTe?: string;
      tags: string[];
      color?: string;
    },
    id?: string
  ) => {
    const now = new Date().toISOString();
    if (id) {
      // Edit existing
      setNotes((prev) =>
        prev.map((n) =>
          n.id === id
            ? {
                ...n,
                ...noteData,
                updatedAt: now,
              }
            : n
        )
      );
    } else {
      // Create new
      const newNote: StudyNote = {
        id: `note-${Date.now()}`,
        ...noteData,
        createdAt: now,
        updatedAt: now,
      };
      setNotes((prev) => [newNote, ...prev]);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  // Settings update
  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  // Theme-specific container background class
  const themeBgClass = {
    parchment: 'bg-[#faf7f0] dark:bg-stone-950 text-stone-900 dark:text-stone-100',
    light: 'bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100',
    dark: 'bg-stone-950 text-stone-100',
  }[settings.theme];

  return (
    <div className={`min-h-screen ${themeBgClass} flex flex-col transition-colors duration-200`}>
      {/* Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        langView={settings.defaultLang}
        setLangView={(lang) => handleUpdateSettings({ defaultLang: lang })}
        fontSize={settings.fontSize}
        setFontSize={(size) => handleUpdateSettings({ fontSize: size })}
        savedCount={savedList.length}
        notesCount={notes.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 sm:pb-32">
        {/* Error notification banner if any */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-900 dark:text-red-200 flex items-start justify-between gap-3 animate-in fade-in">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold">{errorMsg}</p>
                <p className="text-xs text-red-700 dark:text-red-300 mt-0.5">
                  Try standard book names like &ldquo;John 3:16&rdquo;, &ldquo;రోమీయులకు 8:28&rdquo;, &ldquo;Genesis 1:1&rdquo;, &ldquo;Psalms 23:1&rdquo;.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => fetchVerseCrossReferences(currentQuery)}
              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-stone-800 border border-red-200 dark:border-red-800 hover:bg-red-50 text-red-800 dark:text-red-200 flex items-center gap-1 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* VIEW MODE 1: SEARCH BY VERSE */}
        {viewMode === 'verse' && (
          <div>
            {/* Daily Scripture Feature Card with Wallpapers & Reflections */}
            <DailyVerseCard
              onStudyVerse={(ref) => fetchVerseCrossReferences(ref)}
              onOpenWallpaper={handleOpenWallpaperForData}
              langView={settings.defaultLang}
              fontSize={settings.fontSize}
              isSaved={isSaved}
              onToggleSaveDaily={handleToggleSaveDaily}
            />

            <VerseSelector
              onSelectVerse={fetchVerseCrossReferences}
              currentQuery={currentQuery}
              isLoading={isLoading}
            />

            {isLoading ? (
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-12 text-center shadow-xs">
                <div className="w-10 h-10 border-3 border-amber-900/30 border-t-amber-900 rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-heading">
                  Searching Scripture Cross-References...
                </h3>
                <p className="text-xs sm:text-sm font-telugu text-stone-600 dark:text-stone-400 mt-1">
                  పరిశుద్ధ గ్రంథము (BSI) మరియు English KJV లంకెలను శోధిస్తున్నది...
                </p>
              </div>
            ) : (
              <VerseDisplayCard
                data={verseData}
                langView={settings.defaultLang}
                fontSize={settings.fontSize}
                onNavigateVerse={fetchVerseCrossReferences}
                onSelectTheme={handleSelectTheme}
                isSaved={isSaved}
                onToggleSave={handleToggleSave}
                onOpenShare={() => setIsShareOpen(true)}
                onOpenWallpaper={handleOpenWallpaperForData}
                onCreateNote={(refEn, refTe) => handleOpenCreateNote(refEn, refTe)}
                showConnectionNotes={settings.showConnectionNotes}
                showBadges={settings.showBadges}
                showThematicTags={settings.showThematicTags}
              />
            )}
          </div>
        )}

        {/* VIEW MODE 2: SEARCH BY WORD */}
        {viewMode === 'word' && (
          <BibleWordSearch
            langView={settings.defaultLang}
            fontSize={settings.fontSize}
            onNavigateVerse={(ref) => {
              fetchVerseCrossReferences(ref);
              setViewMode('verse');
            }}
            onOpenWallpaper={handleOpenWallpaperForData}
            onCreateNote={(refEn, refTe) => handleOpenCreateNote(refEn, refTe)}
            isSaved={isSaved}
            onToggleSave={handleToggleSave}
          />
        )}

        {/* VIEW MODE 2: SEARCH BY THEME */}
        {viewMode === 'theme' && (
          <ThemeExplorer
            langView={settings.defaultLang}
            fontSize={settings.fontSize}
            onNavigateVerse={fetchVerseCrossReferences}
            selectedThemeId={selectedThemeId}
          />
        )}

        {/* VIEW MODE 3: CANONICAL NETWORK FLOW */}
        {viewMode === 'network' && (
          <ChainGraphView
            data={verseData}
            onNavigateVerse={fetchVerseCrossReferences}
          />
        )}

        {/* VIEW MODE 4: STUDY NOTES & JOURNAL */}
        {viewMode === 'notes' && (
          <NotesView
            notes={notes}
            onCreateNote={() => handleOpenCreateNote()}
            onEditNote={handleOpenEditNote}
            onDeleteNote={handleDeleteNote}
            onNavigateVerse={(ref) => {
              fetchVerseCrossReferences(ref);
              setViewMode('verse');
            }}
          />
        )}

        {/* VIEW MODE 5: SAVED STUDIES */}
        {viewMode === 'saved' && (
          <SavedBookmarks
            savedList={savedList}
            onSelectVerse={(ref) => {
              fetchVerseCrossReferences(ref);
              setViewMode('verse');
            }}
            onRemoveSaved={(ref) => {
              setSavedList((prev) => prev.filter((item) => item.refEn !== ref));
            }}
            onClearAll={() => setSavedList([])}
          />
        )}
      </main>

      {/* Bottom Floating Navigation Menu */}
      <BottomMenu
        viewMode={viewMode}
        setViewMode={setViewMode}
        savedCount={savedList.length}
        notesCount={notes.length}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onCreateNote={() => handleOpenCreateNote()}
      />

      {/* Share Scripture Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        data={verseData}
        langView={settings.defaultLang}
        onOpenWallpaper={() => {
          if (verseData?.primaryVerse) {
            handleOpenWallpaperForData({
              refStringEn: verseData.primaryVerse.reference.refStringEn,
              refStringTe: verseData.primaryVerse.reference.refStringTe,
              textEn: verseData.primaryVerse.textEn,
              textTe: verseData.primaryVerse.textTe,
              themeLabelEn: verseData.relatedThemes?.[0]?.nameEn,
              themeLabelTe: verseData.relatedThemes?.[0]?.nameTe,
            });
          }
        }}
      />

      {/* Wallpaper & Image Studio Modal */}
      <WallpaperModal
        isOpen={isWallpaperOpen}
        onClose={() => setIsWallpaperOpen(false)}
        data={wallpaperData}
        initialLang={settings.defaultLang}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        notes={notes}
        savedList={savedList}
        onResetSettings={handleResetSettings}
        onOpenAppModal={() => setIsAppModalOpen(true)}
      />

      {/* Note Editor Modal */}
      <NoteEditorModal
        isOpen={isNoteEditorOpen}
        onClose={() => setIsNoteEditorOpen(false)}
        onSave={handleSaveNote}
        initialNote={editingNote}
        defaultVerseRef={defaultVerseForNote}
      />

      {/* Android App & APK Installation Modal */}
      <AndroidAppModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
      />

      {/* Offline Status Toast Indicator */}
      <OfflineIndicator />
    </div>
  );
}
