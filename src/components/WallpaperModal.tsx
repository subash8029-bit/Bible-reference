import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  Download,
  Share2,
  Copy,
  Check,
  Smartphone,
  Square,
  Maximize2,
  Palette,
  Eye,
  Type,
  Sparkles,
} from 'lucide-react';
import { LanguageView } from '../types';

export interface WallpaperData {
  refStringEn: string;
  refStringTe: string;
  textEn: string;
  textTe: string;
  themeLabelEn?: string;
  themeLabelTe?: string;
}

interface WallpaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WallpaperData | null;
  initialLang?: LanguageView;
}

type AspectRatioType = '9:16' | '1:1' | '16:9';
type FontSizePreset = 'sm' | 'md' | 'lg';

interface ColorPreset {
  id: string;
  name: string;
  nameTe: string;
  type: 'gradient' | 'solid';
  colors: string[]; // For canvas gradient stops or solid
  cssBg: string; // For CSS preview
  textColor: string; // Canvas text color
  accentColor: string; // Accent/gold color
  isDark: boolean;
}

const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'celestial-night',
    name: 'Celestial Night',
    nameTe: 'రాత్రి నీలిమ',
    type: 'gradient',
    colors: ['#090d16', '#0f172a', '#1e1b4b', '#0369a1'],
    cssBg: 'linear-gradient(135deg, #090d16 0%, #0f172a 40%, #1e1b4b 75%, #0369a1 100%)',
    textColor: '#ffffff',
    accentColor: '#38bdf8',
    isDark: true,
  },
  {
    id: 'warm-amber',
    name: 'Sunset Amber',
    nameTe: 'స్వర్ణ సాయంకాలం',
    type: 'gradient',
    colors: ['#291004', '#451a03', '#78350f', '#b45309'],
    cssBg: 'linear-gradient(135deg, #291004 0%, #451a03 40%, #78350f 75%, #b45309 100%)',
    textColor: '#fffbeb',
    accentColor: '#fbbf24',
    isDark: true,
  },
  {
    id: 'emerald-sanctuary',
    name: 'Emerald Sanctuary',
    nameTe: 'మరకత పచ్చిక',
    type: 'gradient',
    colors: ['#022019', '#022c22', '#064e3b', '#047857'],
    cssBg: 'linear-gradient(135deg, #022019 0%, #022c22 40%, #064e3b 75%, #047857 100%)',
    textColor: '#f0fdf4',
    accentColor: '#34d399',
    isDark: true,
  },
  {
    id: 'crimson-grace',
    name: 'Crimson Grace',
    nameTe: 'రాజసం అరుణోదయం',
    type: 'gradient',
    colors: ['#2b020d', '#4c0519', '#881337', '#be123c'],
    cssBg: 'linear-gradient(135deg, #2b020d 0%, #4c0519 40%, #881337 75%, #be123c 100%)',
    textColor: '#fff1f2',
    accentColor: '#fda4af',
    isDark: true,
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    nameTe: 'రాచరిక ధ్యానం',
    type: 'gradient',
    colors: ['#190433', '#2e1065', '#581c87', '#7e22ce'],
    cssBg: 'linear-gradient(135deg, #190433 0%, #2e1065 40%, #581c87 75%, #7e22ce 100%)',
    textColor: '#faf5ff',
    accentColor: '#c084fc',
    isDark: true,
  },
  {
    id: 'obsidian-gold',
    name: 'Obsidian & Gold',
    nameTe: 'కృష్ణ వర్ణ స్వర్ణం',
    type: 'gradient',
    colors: ['#050505', '#121212', '#1c1917', '#292524'],
    cssBg: 'linear-gradient(135deg, #050505 0%, #121212 50%, #1c1917 100%)',
    textColor: '#f5f5f4',
    accentColor: '#f59e0b',
    isDark: true,
  },
  {
    id: 'parchment-cream',
    name: 'Antique Parchment',
    nameTe: 'తాళపత్ర శాంతి',
    type: 'gradient',
    colors: ['#fffbeb', '#fef3c7', '#fde68a', '#f59e0b'],
    cssBg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 45%, #fde68a 85%, #f59e0b 100%)',
    textColor: '#1c1917',
    accentColor: '#78350f',
    isDark: false,
  },
  {
    id: 'deep-ocean',
    name: 'Ocean Depths',
    nameTe: 'సముద్ర లోతులు',
    type: 'gradient',
    colors: ['#041e30', '#082f49', '#0369a1', '#0284c7'],
    cssBg: 'linear-gradient(135deg, #041e30 0%, #082f49 45%, #0369a1 80%, #0284c7 100%)',
    textColor: '#f0f9ff',
    accentColor: '#38bdf8',
    isDark: true,
  },
];

export const WallpaperModal: React.FC<WallpaperModalProps> = ({
  isOpen,
  onClose,
  data,
  initialLang = 'dual',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [selectedPreset, setSelectedPreset] = useState<ColorPreset>(COLOR_PRESETS[0]);
  const [customSolidColor, setCustomSolidColor] = useState<string>('#1e1b4b');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('9:16');
  const [langChoice, setLangChoice] = useState<LanguageView>(initialLang);
  const [fontSizePreset, setFontSizePreset] = useState<FontSizePreset>('md');
  const [showCross, setShowCross] = useState<boolean>(true);
  const [showBorder, setShowBorder] = useState<boolean>(true);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [fullscreenPreview, setFullscreenPreview] = useState<boolean>(false);

  // Sync langChoice if initialLang changes
  useEffect(() => {
    if (initialLang) {
      setLangChoice(initialLang);
    }
  }, [initialLang]);

  // Dimensions based on aspect ratio
  const getCanvasDimensions = useCallback((): { width: number; height: number } => {
    switch (aspectRatio) {
      case '9:16':
        return { width: 1080, height: 1920 };
      case '1:1':
        return { width: 1080, height: 1080 };
      case '16:9':
        return { width: 1920, height: 1080 };
      default:
        return { width: 1080, height: 1920 };
    }
  }, [aspectRatio]);

  // Helper to wrap text for canvas
  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  };

  // Draw on canvas whenever options change
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data) return;

    const { width, height } = getCanvasDimensions();
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Draw Background
    if (isCustomMode) {
      ctx.fillStyle = customSolidColor;
      ctx.fillRect(0, 0, width, height);
    } else {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      const stops = selectedPreset.colors;
      if (stops.length === 2) {
        grad.addColorStop(0, stops[0]);
        grad.addColorStop(1, stops[1]);
      } else if (stops.length === 3) {
        grad.addColorStop(0, stops[0]);
        grad.addColorStop(0.5, stops[1]);
        grad.addColorStop(1, stops[2]);
      } else if (stops.length >= 4) {
        grad.addColorStop(0, stops[0]);
        grad.addColorStop(0.35, stops[1]);
        grad.addColorStop(0.7, stops[2]);
        grad.addColorStop(1, stops[3]);
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    // Radial lighting/vignette glow overlay
    const radial = ctx.createRadialGradient(
      width / 2,
      height / 2,
      width * 0.1,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.85
    );
    radial.addColorStop(0, 'rgba(255, 255, 255, 0.07)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);

    const textColor = isCustomMode ? '#ffffff' : selectedPreset.textColor;
    const accentColor = isCustomMode ? '#fbbf24' : selectedPreset.accentColor;

    // 2. Draw Decorative Border if enabled
    if (showBorder) {
      const margin = width * 0.055;
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = Math.max(2, width * 0.002);
      ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

      // Inner thin frame
      const innerMargin = margin + width * 0.012;
      ctx.strokeStyle = `${accentColor}55`;
      ctx.lineWidth = Math.max(1, width * 0.001);
      ctx.strokeRect(
        innerMargin,
        innerMargin,
        width - innerMargin * 2,
        height - innerMargin * 2
      );

      // Corner gold corner diamonds
      const corners = [
        { x: margin, y: margin },
        { x: width - margin, y: margin },
        { x: margin, y: height - margin },
        { x: width - margin, y: height - margin },
      ];
      ctx.fillStyle = accentColor;
      corners.forEach((c) => {
        ctx.beginPath();
        const dSize = width * 0.008;
        ctx.moveTo(c.x, c.y - dSize);
        ctx.lineTo(c.x + dSize, c.y);
        ctx.lineTo(c.x, c.y + dSize);
        ctx.lineTo(c.x - dSize, c.y);
        ctx.closePath();
        ctx.fill();
      });
    }

    // 3. Layout Content
    const contentMaxWidth = width * 0.78;

    // Text size scales
    let teFontSize = width * 0.042;
    let enFontSize = width * 0.034;
    let refFontSize = width * 0.038;

    if (fontSizePreset === 'sm') {
      teFontSize *= 0.85;
      enFontSize *= 0.85;
      refFontSize *= 0.88;
    } else if (fontSizePreset === 'lg') {
      teFontSize *= 1.15;
      enFontSize *= 1.15;
      refFontSize *= 1.12;
    }

    // Measure Telugu and English lines
    ctx.font = `600 ${teFontSize}px 'Noto Sans Telugu', system-ui, sans-serif`;
    const teluguLines =
      langChoice !== 'english' ? wrapText(ctx, data.textTe, contentMaxWidth) : [];

    ctx.font = `italic 400 ${enFontSize}px 'Newsreader', Georgia, serif`;
    const englishLines =
      langChoice !== 'telugu'
        ? wrapText(ctx, `\u201C${data.textEn}\u201D`, contentMaxWidth)
        : [];

    const teLineHeight = teFontSize * 1.65;
    const enLineHeight = enFontSize * 1.6;
    const blockGap = width * 0.04;

    const teBlockHeight = teluguLines.length * teLineHeight;
    const enBlockHeight = englishLines.length * enLineHeight;

    const totalTextHeight =
      (teluguLines.length > 0 ? teBlockHeight : 0) +
      (teluguLines.length > 0 && englishLines.length > 0 ? blockGap : 0) +
      (englishLines.length > 0 ? enBlockHeight : 0);

    // Center starting Y calculation
    const centerY = height * 0.5;
    let currentY = centerY - totalTextHeight / 2;

    // Adjust for cross & reference pill
    const topElementSpace = showCross ? height * 0.12 : height * 0.07;
    if (currentY < topElementSpace + height * 0.1) {
      currentY = topElementSpace + height * 0.1;
    }

    // Draw Top Cross Ornament if enabled
    if (showCross) {
      const crossY = height * 0.14;
      ctx.fillStyle = accentColor;
      ctx.font = `${width * 0.055}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✝', width / 2, crossY);

      // Subtle horizontal divider lines around cross
      const divWidth = width * 0.12;
      ctx.strokeStyle = `${accentColor}88`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(width / 2 - divWidth - 30, crossY);
      ctx.lineTo(width / 2 - 30, crossY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width / 2 + 30, crossY);
      ctx.lineTo(width / 2 + divWidth + 30, crossY);
      ctx.stroke();
    }

    // Top Category / Theme Pill if available
    if (data.themeLabelEn || data.themeLabelTe) {
      const themeY = showCross ? height * 0.2 : height * 0.14;
      const themeLabel =
        data.themeLabelTe && data.themeLabelEn
          ? `${data.themeLabelTe} • ${data.themeLabelEn}`
          : data.themeLabelTe || data.themeLabelEn || '';

      ctx.fillStyle = `${accentColor}dd`;
      ctx.font = `600 ${width * 0.022}px 'Plus Jakarta Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(themeLabel.toUpperCase(), width / 2, themeY);
    }

    // Draw Telugu Text Lines
    if (teluguLines.length > 0) {
      ctx.fillStyle = textColor;
      ctx.font = `600 ${teFontSize}px 'Noto Sans Telugu', system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      teluguLines.forEach((line) => {
        ctx.fillText(line, width / 2, currentY);
        currentY += teLineHeight;
      });
    }

    // Draw Divider or Gap between languages
    if (teluguLines.length > 0 && englishLines.length > 0) {
      currentY += blockGap * 0.4;
      // Decorative small gold dot divider
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(width / 2, currentY + 10, width * 0.005, 0, Math.PI * 2);
      ctx.fill();
      currentY += blockGap * 0.6;
    }

    // Draw English Text Lines
    if (englishLines.length > 0) {
      ctx.fillStyle = `${textColor}ee`;
      ctx.font = `italic 400 ${enFontSize}px 'Newsreader', Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      englishLines.forEach((line) => {
        ctx.fillText(line, width / 2, currentY);
        currentY += enLineHeight;
      });
    }

    // Draw Scripture Reference Below Text
    currentY += height * 0.045;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Reference banner background pill
    const refText =
      langChoice === 'telugu'
        ? data.refStringTe
        : langChoice === 'english'
        ? data.refStringEn
        : `${data.refStringEn} • ${data.refStringTe}`;

    ctx.font = `bold ${refFontSize}px 'Cinzel', 'Noto Sans Telugu', serif`;
    const refMetrics = ctx.measureText(refText);
    const pillPaddingX = width * 0.04;
    const pillPaddingY = width * 0.018;
    const pillWidth = refMetrics.width + pillPaddingX * 2;
    const pillHeight = refFontSize + pillPaddingY * 2;
    const pillX = width / 2 - pillWidth / 2;
    const pillY = currentY - pillHeight / 2;

    // Draw reference pill background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillWidth, pillHeight, pillHeight / 2);
    ctx.fill();

    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Draw reference text
    ctx.fillStyle = accentColor;
    ctx.fillText(refText, width / 2, currentY);

    // Bottom Watermark / Translation Note if enabled
    if (showWatermark) {
      const bottomY = height - (showBorder ? width * 0.085 : width * 0.05);
      ctx.fillStyle = `${textColor}77`;
      ctx.font = `500 ${width * 0.019}px 'Plus Jakarta Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        'TELUGU BSI & ENGLISH KJV • BIBLE CROSS REFERENCE',
        width / 2,
        bottomY
      );
    }
  }, [
    data,
    getCanvasDimensions,
    isCustomMode,
    customSolidColor,
    selectedPreset,
    showBorder,
    fontSizePreset,
    langChoice,
    showCross,
    showWatermark,
  ]);

  useEffect(() => {
    if (isOpen && data) {
      // Small timeout to allow canvas element to mount
      const timer = setTimeout(() => {
        renderCanvas();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, data, renderCanvas]);

  if (!isOpen || !data) return null;

  // Actions: Download PNG
  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDownloading(true);
    try {
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      const safeName = data.refStringEn.replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `Bible_Wallpaper_${safeName}_${aspectRatio.replace(':', 'x')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error('Download failed:', e);
    } finally {
      setIsDownloading(false);
    }
  };

  // Actions: Copy Image to Clipboard
  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        if (navigator.clipboard && (window as any).ClipboardItem) {
          await navigator.clipboard.write([
            new (window as any).ClipboardItem({ 'image/png': blob }),
          ]);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2200);
        } else {
          // Fallback
          handleDownloadImage();
        }
      }, 'image/png');
    } catch (e) {
      console.error('Copy to clipboard failed:', e);
      handleDownloadImage();
    }
  };

  // Actions: Share Image File via Native Share API
  const handleShareImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const safeName = data.refStringEn.replace(/[^a-zA-Z0-9]/g, '_');
      const file = new File([blob], `Bible_Wallpaper_${safeName}.png`, {
        type: 'image/png',
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: `Scripture Wallpaper: ${data.refStringEn}`,
            text: `${data.refStringEn} (${data.refStringTe})\n"${data.textTe}"\n\n"${data.textEn}"`,
            files: [file],
          });
        } catch (e) {
          console.log('Share dismissed', e);
        }
      } else {
        // Fallback to copy or download
        handleDownloadImage();
      }
    }, 'image/png');
  };

  const hasNativeShare =
    typeof navigator !== 'undefined' &&
    typeof navigator.canShare === 'function';

  return (
    <div
      id="wallpaper-modal-backdrop"
      className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="wallpaper-modal-container"
        className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl max-w-4xl w-full max-h-[94vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-heading">
                Scripture Wallpaper Studio
              </h3>
              <p className="text-xs text-stone-500 font-telugu">
                వాక్య వాల్‌పేపర్ రూపకల్పన &amp; పంపకం ({data.refStringEn} • {data.refStringTe})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFullscreenPreview(!fullscreenPreview)}
              className="p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Toggle full screen preview"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* LEFT: Live Wallpaper Canvas Preview */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-950/60 rounded-2xl p-4 sm:p-6 border border-stone-200 dark:border-stone-800">
            <div
              className={`relative shadow-2xl rounded-xl overflow-hidden transition-all duration-300 flex items-center justify-center ${
                aspectRatio === '9:16'
                  ? 'w-[240px] sm:w-[280px] h-[426px] sm:h-[498px]'
                  : aspectRatio === '1:1'
                  ? 'w-[280px] sm:w-[320px] h-[280px] sm:h-[320px]'
                  : 'w-[320px] sm:w-[400px] h-[180px] sm:h-[225px]'
              }`}
            >
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>

            <div className="mt-3 text-center">
              <span className="text-[11px] font-medium text-stone-600 dark:text-stone-400">
                {aspectRatio === '9:16'
                  ? 'Phone Wallpaper / Story (1080 × 1920)'
                  : aspectRatio === '1:1'
                  ? 'Square Social Post / DP (1080 × 1080)'
                  : 'Desktop / Wide Banner (1920 × 1080)'}
              </span>
            </div>
          </div>

          {/* RIGHT: Controls & Customization */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            {/* Aspect Ratio Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
                Aspect Ratio / పరిమాణం:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAspectRatio('9:16')}
                  className={`flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-xl border text-xs font-semibold transition-all ${
                    aspectRatio === '9:16'
                      ? 'border-amber-800 bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 shadow-2xs'
                      : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Story 9:16</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('1:1')}
                  className={`flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-xl border text-xs font-semibold transition-all ${
                    aspectRatio === '1:1'
                      ? 'border-amber-800 bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 shadow-2xs'
                      : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <Square className="w-4 h-4" />
                  <span>Square 1:1</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('16:9')}
                  className={`flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-xl border text-xs font-semibold transition-all ${
                    aspectRatio === '16:9'
                      ? 'border-amber-800 bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 shadow-2xs'
                      : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Wide 16:9</span>
                </button>
              </div>
            </div>

            {/* Background Color Themes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                  Background Color / రంగులు:
                </label>
                <span className="text-[11px] text-stone-600 font-telugu">
                  {!isCustomMode ? selectedPreset.nameTe : 'సొంత రంగు'}
                </span>
              </div>

              {/* Preset swatches grid */}
              <div className="grid grid-cols-4 gap-2 mb-2.5">
                {COLOR_PRESETS.map((preset) => {
                  const isSelected = !isCustomMode && selectedPreset.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setIsCustomMode(false);
                        setSelectedPreset(preset);
                      }}
                      className={`h-11 rounded-xl relative overflow-hidden transition-all flex items-end p-1 text-[10px] font-semibold border ${
                        isSelected
                          ? 'ring-2 ring-amber-600 ring-offset-2 dark:ring-offset-stone-900 scale-105 shadow-sm'
                          : 'opacity-80 hover:opacity-100 hover:scale-102 border-stone-300 dark:border-stone-700'
                      }`}
                      style={{ background: preset.cssBg }}
                      title={`${preset.name} (${preset.nameTe})`}
                    >
                      <span
                        className={`text-[9px] font-medium leading-none px-1 py-0.5 rounded truncate ${
                          preset.isDark
                            ? 'text-white bg-black/40'
                            : 'text-stone-900 bg-white/60'
                        }`}
                      >
                        {preset.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Solid Color Picker */}
              <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                <div className="relative">
                  <input
                    type="color"
                    value={customSolidColor}
                    onChange={(e) => {
                      setCustomSolidColor(e.target.value);
                      setIsCustomMode(true);
                    }}
                    className="w-7 h-7 rounded-lg cursor-pointer border-0 p-0 overflow-hidden"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Custom Solid Color (సొంత రంగు)
                  </span>
                  <p className="text-[10px] text-stone-600 dark:text-stone-400">
                    {customSolidColor.toUpperCase()}
                  </p>
                </div>
                {isCustomMode && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold">
                    Active
                  </span>
                )}
              </div>
            </div>

            {/* Language & Font Controls */}
            <div className="grid grid-cols-2 gap-3">
              {/* Language Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                  Language / భాష:
                </label>
                <div className="inline-flex w-full rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setLangChoice('dual')}
                    className={`flex-1 py-1 rounded-md transition-all font-semibold ${
                      langChoice === 'dual'
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    Dual
                  </button>
                  <button
                    type="button"
                    onClick={() => setLangChoice('telugu')}
                    className={`flex-1 py-1 rounded-md transition-all font-semibold ${
                      langChoice === 'telugu'
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    తెలుగు
                  </button>
                  <button
                    type="button"
                    onClick={() => setLangChoice('english')}
                    className={`flex-1 py-1 rounded-md transition-all font-semibold ${
                      langChoice === 'english'
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    KJV
                  </button>
                </div>
              </div>

              {/* Font Size Preset */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                  Text Size / పరిమాణం:
                </label>
                <div className="inline-flex w-full rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setFontSizePreset('sm')}
                    className={`flex-1 py-1 rounded-md transition-all font-semibold ${
                      fontSizePreset === 'sm'
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    Small
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSizePreset('md')}
                    className={`flex-1 py-1 rounded-md transition-all font-semibold ${
                      fontSizePreset === 'md'
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSizePreset('lg')}
                    className={`flex-1 py-1 rounded-md transition-all font-semibold ${
                      fontSizePreset === 'lg'
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    Large
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative Toggles */}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-700 dark:text-stone-300 font-medium">
                  Cross Motif (✝️ చిహ్నం)
                </span>
                <input
                  type="checkbox"
                  checked={showCross}
                  onChange={(e) => setShowCross(e.target.checked)}
                  className="rounded text-amber-900 focus:ring-amber-800"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-700 dark:text-stone-300 font-medium">
                  Gold Ornamental Frame (అలంకరణ సరిహద్దు)
                </span>
                <input
                  type="checkbox"
                  checked={showBorder}
                  onChange={(e) => setShowBorder(e.target.checked)}
                  className="rounded text-amber-900 focus:ring-amber-800"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-700 dark:text-stone-300 font-medium">
                  Translation Citation Watermark
                </span>
                <input
                  type="checkbox"
                  checked={showWatermark}
                  onChange={(e) => setShowWatermark(e.target.checked)}
                  className="rounded text-amber-900 focus:ring-amber-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-5 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {/* Copy Image Button */}
            <button
              type="button"
              onClick={handleCopyImage}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold transition-colors shadow-2xs"
              title="Copy wallpaper image to clipboard"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-500" />
                  <span>Copy Image</span>
                </>
              )}
            </button>

            {/* Native Mobile Share if supported */}
            {hasNativeShare && (
              <button
                type="button"
                onClick={handleShareImage}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold transition-colors shadow-2xs"
                title="Share directly into WhatsApp Status, Stories or Messages"
              >
                <Share2 className="w-4 h-4 text-amber-800 dark:text-amber-400" />
                <span>Share Status / Story</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium transition-colors"
            >
              Close
            </button>

            {/* Primary Download Button */}
            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Download Wallpaper (PNG)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
