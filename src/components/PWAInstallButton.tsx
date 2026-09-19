import React, { useState } from 'react';
import { Smartphone, Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  onOpenAppModal: () => void;
  className?: string;
  variant?: 'compact' | 'full';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  onOpenAppModal,
  className = '',
  variant = 'compact',
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [isInstalling, setIsInstalling] = useState(false);

  const handleClick = async () => {
    if (isInstallable) {
      setIsInstalling(true);
      try {
        const success = await install();
        if (!success) {
          onOpenAppModal();
        }
      } catch {
        onOpenAppModal();
      } finally {
        setIsInstalling(false);
      }
    } else {
      onOpenAppModal();
    }
  };

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={isInstalling}
        className={`w-full py-2.5 px-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs active:scale-98 ${className}`}
        title="Install Android App or Generate APK"
      >
        <Smartphone className="w-4 h-4 text-amber-300" />
        <span>{isInstalled ? 'Android App & APK Info' : 'Install App / Get APK'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isInstalling}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/80 text-xs font-semibold transition-all shadow-2xs ${className}`}
      title="Install on Android (WebAPK) or Generate APK"
    >
      <Smartphone className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
      <span className="hidden sm:inline">Install App / APK</span>
      <span className="sm:hidden">APK</span>
    </button>
  );
};
