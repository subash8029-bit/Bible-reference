import React from 'react';
import {
  X,
  Settings as SettingsIcon,
  Sun,
  Moon,
  Scroll,
  Languages,
  Type,
  Eye,
  Download,
  RotateCcw,
  Check,
} from 'lucide-react';
import { AppSettings, AppTheme, LanguageView, StudyNote } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  notes: StudyNote[];
  savedList: any[];
  onResetSettings: () => void;
  onOpenAppModal?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  notes,
  savedList,
  onResetSettings,
  onOpenAppModal,
}) => {
  if (!isOpen) return null;

  const handleExportData = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      notes,
      savedStudies: savedList,
      settings,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bible_study_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div
      id="settings-modal-backdrop"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="settings-modal-container"
        className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center">
              <SettingsIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-heading">
                Study Settings &amp; Preferences
              </h3>
              <p className="text-xs text-stone-500 font-telugu">
                అధ్యయన అమరికలు &amp; పఠన విధానము
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

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {/* 1. Theme / Reading Atmosphere */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2.5">
              <Scroll className="w-4 h-4 text-amber-800 dark:text-amber-500" />
              Reading Atmosphere / పఠన నేపథ్యము
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Parchment */}
              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: 'parchment' })}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all text-center ${
                  settings.theme === 'parchment'
                    ? 'border-amber-700 bg-amber-50/70 text-amber-950 font-semibold shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-amber-50/20 text-stone-700'
                }`}
              >
                <Scroll className="w-5 h-5 text-amber-800 mb-1" />
                <span className="text-xs font-medium">Parchment</span>
                <span className="text-[10px] text-amber-900/70 font-telugu">పురాతన పత్రము</span>
              </button>

              {/* Clean Light */}
              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: 'light' })}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all text-center ${
                  settings.theme === 'light'
                    ? 'border-stone-800 bg-stone-100 text-stone-900 font-semibold shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
                }`}
              >
                <Sun className="w-5 h-5 text-amber-600 mb-1" />
                <span className="text-xs font-medium">Clean Light</span>
                <span className="text-[10px] text-stone-500 font-telugu">శ్వేత వర్ణము</span>
              </button>

              {/* Night Study Mode */}
              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: 'dark' })}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all text-center ${
                  settings.theme === 'dark'
                    ? 'border-amber-500 bg-stone-800 text-amber-400 font-semibold shadow-xs'
                    : 'border-stone-700 bg-stone-800/80 text-stone-300'
                }`}
              >
                <Moon className="w-5 h-5 text-amber-400 mb-1" />
                <span className="text-xs font-medium">Night Dark</span>
                <span className="text-[10px] text-stone-400 font-telugu">రాత్రి పఠనం</span>
              </button>
            </div>
          </div>

          {/* 2. Default Translation Mode */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2.5">
              <Languages className="w-4 h-4 text-amber-800 dark:text-amber-500" />
              Default Bible Translation / అనువాద ప్రాధాన్యత
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'dual', label: 'Dual Bilingual', sub: 'ద్విభాషా (BSI + KJV)' },
                { id: 'telugu', label: 'Telugu BSI', sub: 'తెలుగు మాత్రమే' },
                { id: 'english', label: 'English KJV', sub: 'English Only' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onUpdateSettings({ defaultLang: opt.id as LanguageView })}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    settings.defaultLang === opt.id
                      ? 'border-amber-800 bg-amber-100/70 dark:bg-amber-950/60 text-amber-950 dark:text-amber-300 font-semibold'
                      : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <p className="text-xs font-medium">{opt.label}</p>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 font-telugu">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Scripture Text Size */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2.5">
              <Type className="w-4 h-4 text-amber-800 dark:text-amber-500" />
              Scripture Font Size / అక్షర పరిమాణము
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'sm', label: 'Small', preview: 'A' },
                { id: 'base', label: 'Medium', preview: 'A+' },
                { id: 'lg', label: 'Large', preview: 'A++' },
                { id: 'xl', label: 'X-Large', preview: 'A+++' },
              ].map((sz) => (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => onUpdateSettings({ fontSize: sz.id as any })}
                  className={`py-2 px-1 rounded-xl border text-center transition-all ${
                    settings.fontSize === sz.id
                      ? 'border-amber-800 bg-amber-100/70 dark:bg-amber-950/60 text-amber-950 dark:text-amber-300 font-semibold'
                      : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className="text-sm font-bold block">{sz.preview}</span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">{sz.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Display Toggles */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2.5">
              <Eye className="w-4 h-4 text-amber-800 dark:text-amber-500" />
              Study Elements Visibility / వివరాల ప్రదర్శన
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 cursor-pointer">
                <div>
                  <p className="text-xs font-medium text-stone-800 dark:text-stone-200">
                    Connection Theological Notes
                  </p>
                  <p className="text-[11px] text-stone-500 font-telugu">
                    వచనాల మధ్య గల వేదాంత సంబంధిత వివరణలు
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showConnectionNotes}
                  onChange={(e) => onUpdateSettings({ showConnectionNotes: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-900 focus:ring-amber-800 border-stone-300 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 cursor-pointer">
                <div>
                  <p className="text-xs font-medium text-stone-800 dark:text-stone-200">
                    Theological Classification Badges
                  </p>
                  <p className="text-[11px] text-stone-500 font-telugu">
                    ప్రవచన నెరవేర్పు, సమాంతర వచనాలు మొదలైన వర్గీకరణ గుర్తులు
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showBadges}
                  onChange={(e) => onUpdateSettings({ showBadges: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-900 focus:ring-amber-800 border-stone-300 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 cursor-pointer">
                <div>
                  <p className="text-xs font-medium text-stone-800 dark:text-stone-200">
                    Thematic Topic Tags
                  </p>
                  <p className="text-[11px] text-stone-500 font-telugu">
                    సంబంధిత అంశాల ట్యాగులు (Love, Faith, Grace, etc.)
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showThematicTags}
                  onChange={(e) => onUpdateSettings({ showThematicTags: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-900 focus:ring-amber-800 border-stone-300 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* 4. Data & Backup */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
              Data &amp; Backup / సేవ్ చేసిన సమాచారం
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleExportData}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-medium transition-colors"
              >
                <Download className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                <span>Export Notes &amp; Studies (JSON)</span>
              </button>

              <button
                type="button"
                onClick={onResetSettings}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-red-50 dark:hover:bg-red-950/30 text-stone-600 hover:text-red-700 dark:text-stone-400 text-xs transition-colors"
                title="Reset all preferences to default"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 flex items-center justify-between text-xs text-stone-500">
          <span>Settings automatically saved</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-900 hover:bg-amber-800 text-amber-50 font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
