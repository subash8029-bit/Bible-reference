import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Download,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  Zap,
  Terminal,
  Share2,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AndroidAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidAppModal: React.FC<AndroidAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isAndroid, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'install' | 'apk' | 'developer'>('install');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  // Use production / current origin URL
  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-7z44lharprl65l7pyzzgot-668411321916.asia-east1.run.app';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(appUrl)}&margin=8&color=45-26-3`;
  const pwaBuilderUrl = `https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(appUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const capacitorCommands = `# 1. Build the web app
npm run build

# 2. Add Android platform with Capacitor
npx @capacitor/cli init "Bible Cross Reference" "com.bibleref.app" --web-dir dist
npx @capacitor/core
npm install @capacitor/android
npx cap add android

# 3. Build & run APK in Android Studio
npx cap open android`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(capacitorCommands);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-white dark:bg-stone-900 rounded-2xl w-full max-w-xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 p-5 sm:p-6 text-white flex items-center justify-between relative shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-200 shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-heading">
                  Android App & APK
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Android & WebAPK
                </span>
              </div>
              <p className="text-xs text-amber-100/80 font-telugu mt-0.5">
                మీ ఆండ్రాయిడ్ ఫోన్‌లో యాప్‌ను ఇన్‌స్టాల్ చేసుకోండి లేదా APK తయారు చేసుకోండి
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 px-4 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('install')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'install'
                ? 'border-amber-900 dark:border-amber-400 text-amber-950 dark:text-amber-300'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Install on Phone (WebAPK)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('apk')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'apk'
                ? 'border-amber-900 dark:border-amber-400 text-amber-950 dark:text-amber-300'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Generate .APK File</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('developer')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'developer'
                ? 'border-amber-900 dark:border-amber-400 text-amber-950 dark:text-amber-300'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Android Studio Build</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* TAB 1: Direct Android Phone Install (WebAPK) */}
          {activeTab === 'install' && (
            <div className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 space-y-1">
                  <p className="font-semibold text-amber-950 dark:text-amber-200">
                    Official Android WebAPK Technology
                  </p>
                  <p className="leading-relaxed">
                    Android automatically compiles this PWA into an official <strong>WebAPK</strong> registered in your phone’s app drawer. It requires <strong>no sideloading permissions</strong>, opens in full screen, and caches scriptures for offline use.
                  </p>
                </div>
              </div>

              {/* Install Button if prompted directly */}
              {isInstallable && !isInstalled && (
                <button
                  type="button"
                  onClick={async () => {
                    await install();
                  }}
                  className="w-full py-3.5 px-4 bg-amber-900 hover:bg-amber-800 text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm transition-all active:scale-98"
                >
                  <Download className="w-5 h-5" />
                  <span>Install Bible App on this Device Now</span>
                </button>
              )}

              {isInstalled && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs sm:text-sm flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>This app is already installed on this device!</span>
                </div>
              )}

              {/* Scan on Mobile Phone with QR Code */}
              <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-4 bg-stone-50 dark:bg-stone-800/40 text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-stone-800 dark:text-stone-200 font-bold text-sm">
                  <QrCode className="w-4 h-4 text-amber-700" />
                  <span>Open on your Android Phone</span>
                </div>

                <div className="inline-block p-2 bg-white rounded-xl shadow-xs border border-stone-200">
                  <img
                    src={qrCodeUrl}
                    alt="Scan with Android camera to install"
                    className="w-40 h-40 object-contain mx-auto"
                  />
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto">
                  Scan this QR code with your Android phone&apos;s camera to open the app, then tap <strong>&ldquo;Add to Home screen&rdquo;</strong> or <strong>&ldquo;Install app&rdquo;</strong> in Chrome.
                </p>

                {/* Direct Link Share */}
                <div className="flex items-center gap-2 max-w-md mx-auto pt-2">
                  <input
                    type="text"
                    readOnly
                    value={appUrl}
                    className="flex-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs px-3 py-2 rounded-lg text-stone-600 dark:text-stone-300 font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-3 py-2 rounded-lg bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Generate .APK / Google Play Package (PWABuilder) */}
          {activeTab === 'apk' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                  Generate Standalone .APK File for Android
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  You can generate a standalone <strong>.apk</strong> file (for sideloading, sharing via WhatsApp, or test installing) or an <strong>.aab (Android App Bundle)</strong> for the Google Play Store using the official open-source <strong>PWABuilder</strong> tool.
                </p>
              </div>

              {/* Steps Card */}
              <div className="bg-stone-50 dark:bg-stone-800/40 rounded-xl p-4 border border-stone-200 dark:border-stone-800 space-y-3">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-amber-900 text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">Open PWABuilder with your live app URL</span>
                    <p className="text-stone-500 text-xs mt-0.5">
                      The URL is already configured with Web App Manifest, 512x512 icons, and Service Worker.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-amber-900 text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">Click &ldquo;Package for Stores&rdquo; &rarr; Android</span>
                    <p className="text-stone-500 text-xs mt-0.5">
                      Select Android package to generate both APK and Google Play AAB.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-amber-900 text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">Download your signed/unsigned .APK file</span>
                    <p className="text-stone-500 text-xs mt-0.5">
                      Transfer to any Android device or publish directly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct PWABuilder Action Button */}
              <a
                href={pwaBuilderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-amber-900 hover:bg-amber-800 text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Launch PWABuilder to Generate APK</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <p className="text-[11px] text-stone-500 text-center">
                PWABuilder is Microsoft and Google&apos;s recommended tool to package web applications into production Android APKs.
              </p>
            </div>
          )}

          {/* TAB 3: Android Studio / Capacitor CLI Build */}
          {activeTab === 'developer' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                  Build Custom APK with Android Studio & Capacitor
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  If you exported the project code (via Settings &rarr; Export to GitHub or ZIP), you can compile a custom native APK in Android Studio using Capacitor:
                </p>
              </div>

              <div className="relative">
                <pre className="bg-stone-950 text-amber-200 text-xs font-mono p-4 rounded-xl overflow-x-auto border border-stone-800 leading-relaxed">
                  {capacitorCommands}
                </pre>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="absolute top-2.5 right-2.5 px-2.5 py-1.5 rounded-md bg-stone-800 hover:bg-stone-700 text-white text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs text-stone-500 space-y-1">
                <p>
                  <strong>Output APK location:</strong> In Android Studio, select <em>Build &rarr; Build Bundle(s) / APK(s) &rarr; Build APK(s)</em>. The generated APK will be in <code>android/app/build/outputs/apk/debug/app-debug.apk</code>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 flex items-center justify-between shrink-0">
          <span className="text-xs text-stone-500 font-medium">
            Telugu BSI & English KJV Bible App
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
