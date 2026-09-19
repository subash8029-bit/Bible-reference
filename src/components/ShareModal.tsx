import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  Mail,
  Link2,
  MessageCircle,
  ExternalLink,
  Palette,
} from 'lucide-react';
import { VerseCrossReferenceData, LanguageView } from '../types';
import { copyToClipboard } from '../utils/textFormatters';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: VerseCrossReferenceData;
  langView: LanguageView;
  onOpenWallpaper?: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  data,
  langView,
  onOpenWallpaper,
}) => {
  const [copiedType, setCopiedType] = useState<'text' | 'link' | null>(null);

  if (!isOpen) return null;

  const primaryRef = data.primaryVerse.reference;
  const primaryVerse = data.primaryVerse;

  // Build formatted text for sharing
  const crossRefSnippets = data.crossReferences
    .slice(0, 3)
    .map(
      (cr, idx) =>
        `${idx + 1}. ${cr.targetRef.refStringEn} (${cr.targetRef.refStringTe}) - [${cr.relationshipLabelEn}]\n   "${cr.textTe}"\n   "${cr.textEn}"`
    )
    .join('\n\n');

  const shareText = `📖 Bible Cross-Reference Study
━━━━━━━━━━━━━━━━━━━━
[ ${primaryRef.refStringEn} | ${primaryRef.refStringTe} ]

తెలుగు (Telugu BSI):
"${primaryVerse.textTe}"

English (KJV):
"${primaryVerse.textEn}"

🔗 Key Cross-References / సంబంధిత వచనాలు:
${crossRefSnippets}

Study with Telugu BSI & English KJV Bible Cross Reference Tool`;

  const appWebUrl = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'https://ais-pre-7z44lharprl65l7pyzzgot-668411321916.asia-east1.run.app';

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?verse=${encodeURIComponent(primaryRef.refStringEn)}`
    : `${appWebUrl}?verse=${encodeURIComponent(primaryRef.refStringEn)}`;

  const handleCopyText = async () => {
    const success = await copyToClipboard(shareText);
    if (success) {
      setCopiedType('text');
      setTimeout(() => setCopiedType(null), 2200);
    }
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopiedType('link');
      setTimeout(() => setCopiedType(null), 2200);
    }
  };

  const handleCopyAppUrl = async () => {
    const success = await copyToClipboard(appWebUrl);
    if (success) {
      setCopiedType('link');
      setTimeout(() => setCopiedType(null), 2200);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Bible Cross-Reference: ${primaryRef.refStringEn}`,
          text: `${primaryRef.refStringEn} (${primaryRef.refStringTe})\n\n"${primaryVerse.textTe}"\n\n"${primaryVerse.textEn}"`,
          url: shareUrl,
        });
      } catch (e) {
        // User cancelled or share failed, fallback
        console.log('Share dismissed or failed', e);
      }
    } else {
      handleCopyText();
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `📖 *${primaryRef.refStringEn}* (${primaryRef.refStringTe})\n\n` +
    `*తెలుగు:* "${primaryVerse.textTe}"\n\n` +
    `*English:* "${primaryVerse.textEn}"\n\n` +
    `🔗 Cross-References:\n` +
    data.crossReferences.slice(0, 2).map(c => `• ${c.targetRef.refStringEn}: "${c.textTe}"`).join('\n') +
    `\n\n${shareUrl}`
  )}`;

  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
    `📖 ${primaryRef.refStringEn} (${primaryRef.refStringTe})\n\n"${primaryVerse.textTe}"\n\n"${primaryVerse.textEn}"`
  )}`;

  const mailtoUrl = `mailto:?subject=${encodeURIComponent(
    `Bible Scripture Study: ${primaryRef.refStringEn} / ${primaryRef.refStringTe}`
  )}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div
      id="share-modal-backdrop"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="share-modal-container"
        className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-heading">
                Share Scripture Study
              </h3>
              <p className="text-xs text-stone-500 font-telugu">
                వాక్యాన్ని &amp; పరస్పర లంకెలను ఇతరులతో పంచుకోండి
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
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Passage Preview Box */}
          <div className="bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/60 rounded-xl p-4 text-xs sm:text-sm space-y-2">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
              <span className="font-heading font-bold text-stone-900 dark:text-stone-100 text-sm">
                {primaryRef.refStringEn}
              </span>
              <span className="font-telugu font-semibold text-amber-900 dark:text-amber-400">
                {primaryRef.refStringTe}
              </span>
            </div>

            <p className="font-telugu text-stone-800 dark:text-stone-200 line-clamp-3">
              {primaryVerse.textTe}
            </p>

            <p className="font-scripture italic text-stone-600 dark:text-stone-400 line-clamp-2">
              &ldquo;{primaryVerse.textEn}&rdquo;
            </p>

            <div className="pt-1 flex items-center gap-2 text-[11px] text-stone-500">
              <span>{data.crossReferences.length} cross references included</span>
            </div>
          </div>

          {/* Wallpaper Share Option Banner */}
          {onOpenWallpaper && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenWallpaper();
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-gradient-to-r from-amber-100/90 via-amber-50 to-amber-100/60 dark:from-amber-950/70 dark:via-stone-900 dark:to-amber-950/40 hover:from-amber-200 hover:to-amber-100 text-amber-950 dark:text-amber-200 transition-all shadow-2xs group"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-lg bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                    Share with Background Colors as Wallpaper
                  </div>
                  <div className="text-[11px] text-amber-900/80 dark:text-amber-300/80 font-telugu">
                    రంగురంగుల నేపథ్యాలతో వాల్‌పేపర్ లేదా స్టేటస్ కార్డ్‌గా రూపొందించండి
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-900 text-amber-50 shrink-0">
                Open Studio
              </span>
            </button>
          )}

          {/* Quick Action Buttons Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Copy Full Text */}
            <button
              id="share-copy-full-text"
              type="button"
              onClick={handleCopyText}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700/60 text-stone-800 dark:text-stone-200 font-medium text-xs transition-colors shadow-2xs"
            >
              {copiedType === 'text' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Copied Text!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-500" />
                  <span>Copy Scripture Text</span>
                </>
              )}
            </button>

            {/* Copy Share Link */}
            <button
              id="share-copy-link"
              type="button"
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700/60 text-stone-800 dark:text-stone-200 font-medium text-xs transition-colors shadow-2xs"
            >
              {copiedType === 'link' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4 text-stone-500" />
                  <span>Copy Study Link</span>
                </>
              )}
            </button>
          </div>

          {/* Web App Link Box */}
          <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>Web App Link (Live Preview & Access)</span>
              </label>
              <a
                href={appWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1 font-medium"
              >
                <span>Open in Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={appWebUrl}
                className="flex-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-stone-700 dark:text-stone-300 font-mono select-all"
              />
              <button
                type="button"
                onClick={handleCopyAppUrl}
                className="px-3 py-1.5 rounded-lg bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-xs font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1 transition-colors shrink-0"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
            </div>
          </div>

          {/* Social / Messaging Direct Share */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2">
              Share directly to apps:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {/* WhatsApp */}
              <a
                id="share-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-950/30 hover:bg-emerald-100/60 text-emerald-900 dark:text-emerald-300 transition-colors text-center"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[11px] font-semibold">WhatsApp</span>
              </a>

              {/* Telegram */}
              <a
                id="share-telegram-btn"
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-sky-200 dark:border-sky-900/50 bg-sky-50/60 dark:bg-sky-950/30 hover:bg-sky-100/60 text-sky-900 dark:text-sky-300 transition-colors text-center"
              >
                <Send className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <span className="text-[11px] font-semibold">Telegram</span>
              </a>

              {/* Email */}
              <a
                id="share-email-btn"
                href={mailtoUrl}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-800 hover:bg-stone-200/70 text-stone-800 dark:text-stone-200 transition-colors text-center"
              >
                <Mail className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                <span className="text-[11px] font-semibold">Email</span>
              </a>
            </div>
          </div>

          {/* Native OS Share Sheet (Mobile / Supported Browsers) */}
          {hasNativeShare && (
            <button
              id="share-native-sheet-btn"
              type="button"
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 font-medium text-xs sm:text-sm transition-colors shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Open Device Share Menu (వాట్సాప్, మెసేజ్‌లు, ఫేస్‌బుక్)</span>
            </button>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 flex items-center justify-between text-xs text-stone-500">
          <span>Telugu BSI &amp; English KJV</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
