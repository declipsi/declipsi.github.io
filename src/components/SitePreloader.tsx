import React, { useEffect, useState } from 'react';
import { Locale } from '../data/portfolioData';
import { getThreadPointAtProgress, getStoryThreadSvgPath } from '../utils/portfolioLogic';

interface SitePreloaderProps {
  locale: Locale;
}

const PRELOADER_COPY: Record<
  Locale,
  {
    subtitle: string;
    stages: [string, string, string];
    skipLabel: string;
  }
> = {
  en: {
    subtitle: 'Visual Ad Specialist · 2D/3D Motion · AI Creator',
    stages: [
      'Untangling creative thread...',
      'Warming up 3D & AI pipeline...',
      'Ready to scroll the story.',
    ],
    skipLabel: 'Skip intro →',
  },
  de: {
    subtitle: 'Visual Ad Specialist · 2D/3D Motion · AI Creator',
    stages: [
      'Kreativer Faden wird entwirrt...',
      '3D- & KI-Pipeline wird geladen...',
      'Bereit für die Story.',
    ],
    skipLabel: 'Überspringen →',
  },
  ru: {
    subtitle: 'Специалист по видеорекламе · 2D/3D Motion · AI-креатор',
    stages: [
      'Распутываем клубок идей...',
      'Запускаем 3D и AI-пайплайн...',
      'Готово к скроллу истории.',
    ],
    skipLabel: 'Пропустить →',
  },
};

const PREVIEW_PATH = getStoryThreadSvgPath();

export const SitePreloader: React.FC<SitePreloaderProps> = ({ locale }) => {
  const [progress, setProgress] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1';
    }
    return false;
  });

  useEffect(() => {
    if (isUnmounted) return;

    let rafId = 0;
    let closeTimer: ReturnType<typeof setTimeout> | null = null;
    const durationMs = 1150;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const rawRatio = Math.min(1, Math.max(0, elapsed / durationMs));
      // Smooth easeOutCubic curve
      const eased = 1 - Math.pow(1 - rawRatio, 3);
      setProgress(eased);

      if (rawRatio < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setIsClosing(true);
        closeTimer = setTimeout(() => {
          setIsUnmounted(true);
        }, 420);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [isUnmounted]);

  if (isUnmounted) return null;

  const copy = PRELOADER_COPY[locale];
  const percentInt = Math.round(progress * 100);
  const stageIndex = progress < 0.45 ? 0 : progress < 0.88 ? 1 : 2;
  const pt = getThreadPointAtProgress(progress);

  const handleSkip = () => {
    setIsClosing(true);
    setTimeout(() => setIsUnmounted(true), 220);
  };

  return (
    <div
      data-testid="site-preloader"
      aria-label="Loading Diana Palii portfolio"
      className={`fixed inset-0 z-[100] bg-[#141413] text-[#F8F6F1] flex flex-col justify-between p-6 sm:p-10 transition-all duration-400 ease-out select-none ${
        isClosing ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Top Bar */}
      <div className="max-w-[1360px] w-full mx-auto flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#C6FF00]" />
          <span className="font-bold tracking-tight text-sm text-[#F8F6F1]">Diana Palii</span>
          <span className="text-[#F8F6F1]/50 hidden sm:inline">· {copy.subtitle}</span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="px-3 py-1.5 rounded-lg border border-white/15 text-[#F8F6F1]/75 hover:text-[#C6FF00] hover:border-[#C6FF00] transition-colors cursor-pointer"
        >
          {copy.skipLabel}
        </button>
      </div>

      {/* Center Self-Drawing Thread & Follower Bead */}
      <div className="max-w-[920px] w-full mx-auto my-auto flex flex-col items-center text-center">
        <div className="relative w-full h-36 sm:h-44 mb-6">
          <svg
            viewBox="0 0 3600 500"
            preserveAspectRatio="none"
            className="w-full h-full overflow-visible"
            aria-hidden="true"
          >
            <path
              d={PREVIEW_PATH}
              fill="none"
              stroke="#F8F6F1"
              strokeOpacity="0.14"
              strokeWidth="6"
              strokeDasharray="12 10"
            />
            <path
              d={PREVIEW_PATH}
              fill="none"
              stroke="#FF4D2D"
              strokeWidth="8"
              strokeLinecap="round"
              pathLength={pt.totalLength}
              strokeDasharray={pt.totalLength}
              strokeDashoffset={Math.max(0, pt.totalLength - pt.drawnLength)}
            />
          </svg>

          {/* Yellow Bead Riding the Exact Preloader Curve */}
          <div
            aria-hidden="true"
            className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C6FF00] border-2 border-[#141413] shadow-[0_0_0_5px_rgba(198,255,0,0.3)]"
            style={{
              left: `${(pt.x / 3600) * 100}%`,
              top: `${(pt.y / 500) * 100}%`,
            }}
          />
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-[#FF4D2D] mb-2">
          {copy.stages[stageIndex]}
        </div>

        <div className="text-6xl sm:text-8xl font-extrabold tracking-tight font-mono tabular-nums text-[#F8F6F1]">
          {String(percentInt).padStart(2, '0')}
          <span className="text-[#C6FF00] text-4xl sm:text-6xl">%</span>
        </div>
      </div>

      {/* Bottom Progress Rail */}
      <div className="max-w-[1360px] w-full mx-auto">
        <div className="w-full h-1 bg-white/12 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FF4D2D] to-[#C6FF00]"
            style={{ width: `${percentInt}%` }}
          />
        </div>
      </div>
    </div>
  );
};
