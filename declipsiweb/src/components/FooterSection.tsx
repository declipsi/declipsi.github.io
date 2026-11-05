import React, { useRef, useState } from 'react';
import { Locale, PORTFOLIO_I18N } from '../data/portfolioData';
import { computeSpringPullOffset } from '../utils/portfolioLogic';
import { Copy, Check, Sparkles, ArrowUpRight, Move } from 'lucide-react';

interface FooterSectionProps {
  locale: Locale;
  onOpenBrief: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ locale, onOpenBrief }) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [avatarLoadError, setAvatarLoadError] = useState(false);
  const dragOriginRef = useRef<{ x: number; y: number } | null>(null);

  const t = PORTFOLIO_I18N[locale].footer;
  const springState = computeSpringPullOffset(dragOffset.x, dragOffset.y);
  const showEasterBubble = easterEggTriggered || springState.shouldShowEasterEgg;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragOriginRef.current = { x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragOriginRef.current) return;
    const dx = e.clientX - dragOriginRef.current.x;
    const dy = e.clientY - dragOriginRef.current.y;
    setDragOffset({ x: dx, y: dy });
    if (Math.hypot(dx, dy) >= 20) {
      setEasterEggTriggered(true);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const triggerSpringPullDemo = () => {
    setEasterEggTriggered(true);
    setDragOffset({ x: 48, y: 36 });
    setTimeout(() => {
      setDragOffset({ x: -18, y: -12 });
    }, 240);
    setTimeout(() => {
      setDragOffset({ x: 0, y: 0 });
    }, 450);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('dianapaliij@gmail.com');
    } catch {
      // Fallback if clipboard API restricted
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  return (
    <footer
      id="footer"
      className="relative pt-16 pb-20 px-6 border-t border-[#141413]/12 dark:border-white/12 overflow-hidden paper-grain"
    >
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (5 cols): The Thread Ending in Diana's Cutout Sticker Hand */}
          <div className="lg:col-span-5 flex flex-col items-center relative">
            <svg
              viewBox="0 0 300 130"
              className="w-72 h-28 overflow-visible pointer-events-none -mb-3 z-20"
              aria-hidden="true"
            >
              <path
                d={`M 150 0 C 150 45, ${185 + springState.clampedX * 0.5} ${
                  75 + springState.clampedY * 0.5
                }, ${196 + springState.clampedX} ${126 + springState.clampedY}`}
                fill="none"
                stroke="#FF4D2D"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="10 5"
                className="animate-dash-flow"
              />
              <circle
                cx={196 + springState.clampedX}
                cy={126 + springState.clampedY}
                r="7"
                fill="#C6FF00"
                stroke="#141413"
                strokeWidth="2.5"
              />
            </svg>

            {/* Draggable Cutout Sticker Portrait of Diana */}
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl p-3 bg-white shadow-2xl border-4 border-white select-none touch-none cursor-grab active:cursor-grabbing ${
                isDragging
                  ? ''
                  : springState.distance === 0
                  ? 'animate-sticker-idle transition-transform duration-300 ease-out'
                  : 'transition-transform duration-300 ease-out'
              }`}
              style={{
                transform: `translate3d(${springState.clampedX}px, ${springState.clampedY}px, 0) rotate(${springState.rotationDeg}deg) scale(${springState.stretchScale})`,
              }}
            >
              {!avatarLoadError ? (
                <img
                  src="/src/assets/images/diana_cutout_avatar_1793833488351.jpg"
                  alt="Diana Palii 3D cutout sticker avatar holding the story thread"
                  referrerPolicy="no-referrer"
                  draggable={false}
                  onError={() => setAvatarLoadError(true)}
                  className="w-full h-full object-cover rounded-2xl pointer-events-none"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-[#FAF8F5] flex flex-col items-center justify-center p-4 text-center text-[#141413]">
                  <Sparkles className="w-10 h-10 text-[#FF4D2D] mb-2" />
                  <span className="font-bold text-lg">Diana Palii</span>
                  <span className="text-xs font-mono">Cutout Sticker</span>
                </div>
              )}

              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#141413] text-white text-[11px] font-mono whitespace-nowrap flex items-center gap-1 shadow-md">
                <Move className="w-3 h-3 text-[#C6FF00]" />
                <span>{t.dragBadge}</span>
              </div>
            </div>

            {/* Easter Egg Speech Cloud */}
            <div
              role="status"
              aria-live="polite"
              className={`mt-6 max-w-xs rounded-2xl p-3.5 border transition-all duration-200 text-center ${
                showEasterBubble
                  ? 'bg-[#FF4D2D] text-white border-[#141413] shadow-xl scale-100 opacity-100'
                  : 'bg-[#FAF8F5] dark:bg-[#191920] text-[#141413]/85 dark:text-[#F4F2ED]/85 border-[#141413]/15 dark:border-white/15 scale-95 opacity-95'
              }`}
            >
              <p className="font-hand text-xl sm:text-2xl font-bold leading-snug">
                {showEasterBubble ? t.bubblePulled : t.bubbleIdle}
              </p>
            </div>

            <button
              type="button"
              onClick={triggerSpringPullDemo}
              className="mt-3 px-4 py-2 rounded-xl border border-[#141413]/20 dark:border-white/20 text-xs font-mono text-[#141413]/80 dark:text-[#F4F2ED]/80 hover:border-[#FF4D2D] hover:text-[#FF4D2D] transition-colors cursor-pointer"
            >
              {t.pullBtn}
            </button>
          </div>

          {/* Right Column (7 cols): Editorial Sign-off & One-Click Email */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00] mb-3">
              {t.kicker}
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141413] dark:text-[#F4F2ED] mb-4">
              {t.headlinePart1}
              <span className="font-serif italic font-normal text-[#FF4D2D] dark:text-[#C6FF00]">
                {t.headlineItalic}
              </span>
            </h2>

            <div className="space-y-1.5 text-lg sm:text-xl text-[#141413]/80 dark:text-[#F4F2ED]/80 font-medium mb-6">
              <p>{t.line1}</p>
              <p>{t.line2}</p>
              <p>{t.line3}</p>
              <p className="text-[#141413] dark:text-[#F4F2ED] font-extrabold pt-2">
                {t.line4Bold}
              </p>
            </div>

            {/* Giant Clickable Email with One-Click Copy */}
            <div className="w-full my-4 p-5 sm:p-6 rounded-2xl border border-[#141413]/15 dark:border-white/15 bg-[#FAF8F5] dark:bg-[#16161B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-[#141413]/60 dark:text-[#F4F2ED]/60 mb-1">
                  {t.emailHint}
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-xl sm:text-3xl font-mono font-extrabold text-[#141413] dark:text-[#F4F2ED] hover:text-[#FF4D2D] dark:hover:text-[#C6FF00] transition-colors flex items-center gap-3 cursor-pointer break-all text-left"
                >
                  <span>dianapaliij@gmail.com</span>
                  {copiedEmail ? (
                    <Check className="w-6 h-6 text-[#FF4D2D] dark:text-[#C6FF00] shrink-0" />
                  ) : (
                    <Copy className="w-5 h-5 opacity-60 shrink-0" />
                  )}
                </button>
                {copiedEmail && (
                  <div className="text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00] mt-1">
                    {t.emailCopied}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onOpenBrief}
                className="px-5 py-3 rounded-xl bg-[#FF4D2D] text-white font-semibold text-xs sm:text-sm hover:bg-[#141413] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.briefBtn}
              </button>
            </div>

            {/* Social & Location Links */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-mono text-[#141413]/80 dark:text-[#F4F2ED]/80 mt-4">
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF4D2D] dark:hover:text-[#C6FF00] inline-flex items-center gap-1 underline-offset-4 hover:underline"
              >
                <span>TikTok (Influencer)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="mailto:dianapaliij@gmail.com"
                className="hover:text-[#FF4D2D] dark:hover:text-[#C6FF00] inline-flex items-center gap-1 underline-offset-4 hover:underline"
              >
                <span>Telegram / LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span aria-hidden="true">·</span>
              <span>{t.locationText}</span>
            </div>

            {/* Fun Fact with 3D Star */}
            <div className="mt-8 p-4 rounded-2xl border border-[#141413]/12 dark:border-white/12 bg-[#FAF8F5]/70 dark:bg-[#151519]/70 flex items-center gap-3.5">
              <svg viewBox="0 0 48 48" className="w-9 h-9 shrink-0" aria-hidden="true">
                <polygon
                  points="24,2 30,17 46,18 34,29 38,45 24,36 10,45 14,29 2,18 18,17"
                  fill="#FF4D2D"
                  stroke="#141413"
                  strokeWidth="2"
                />
              </svg>
              <p className="text-xs sm:text-sm font-mono text-[#141413]/80 dark:text-[#F4F2ED]/80">
                <strong>Fun fact:</strong> {t.funFact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
