import React, { useState } from 'react';
import { ArrowDownRight, Sparkles, Play, Mail, Box } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Locale, PORTFOLIO_I18N } from '../data/portfolioData';

interface HeroSectionProps {
  locale: Locale;
  onOpenBrief: () => void;
}

const KNOT_SVG_PATH =
  'M 190 155 C 110 40, 290 30, 220 165 C 140 290, 60 120, 195 95 C 330 70, 290 265, 165 215 C 55 170, 155 35, 255 125 C 345 205, 130 275, 135 145 C 140 45, 285 95, 235 195 C 195 275, 275 180, 395 185';

export const HeroSection: React.FC<HeroSectionProps> = ({ locale, onOpenBrief }) => {
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [activeMiniNode, setActiveMiniNode] = useState<'cube' | 'keyframe' | 'ai'>('cube');
  const [knotPulseCount, setKnotPulseCount] = useState(0);

  const t = PORTFOLIO_I18N[locale].hero;

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseTilt({ x: nx * 12, y: ny * 12 });
  };

  const handlePointerLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  const handleSmoothAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 px-6 flex flex-col justify-between overflow-hidden paper-grain"
    >
      <div className="max-w-[1360px] w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Scrollytelling Typography */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-left z-10"
        >
          {/* Regional & Availability Kicker */}
          <div className="text-xs sm:text-sm font-mono tracking-tight text-[#141413]/75 dark:text-[#F4F2ED]/75 mb-6 flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[#FF4D2D] dark:text-[#C6FF00]">
              {t.statusOpen}
            </span>
            <span aria-hidden="true">·</span>
            <span>{t.location}</span>
            <span aria-hidden="true">·</span>
            <span>{t.specialty}</span>
          </div>

          {/* Main Display Headline */}
          <h1
            className="text-4xl sm:text-6xl xl:text-[4.15rem] leading-[1.06] tracking-tight font-extrabold text-[#141413] dark:text-[#F4F2ED] mb-6"
            style={{ textWrap: 'balance' }}
          >
            <span>{t.headlinePart1}</span>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-serif italic font-normal text-[#FF4D2D] dark:text-[#C6FF00] inline-block"
            >
              {t.headlineItalic}
            </motion.span>{' '}
            <span>{t.headlinePart2}</span>
          </h1>

          {/* Subtitle Quote */}
          <p className="text-lg sm:text-2xl text-[#141413]/85 dark:text-[#F4F2ED]/85 font-medium leading-relaxed max-w-2xl mb-2">
            {t.subtitle}
          </p>
          <p className="font-serif italic text-base sm:text-xl text-[#141413]/65 dark:text-[#F4F2ED]/65 mb-8">
            {t.subtitleAside}
          </p>

          {/* Unboxed Metadata Discipline Line */}
          <div className="text-xs sm:text-sm font-mono text-[#141413]/70 dark:text-[#F4F2ED]/70 mb-9 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-y border-[#141413]/12 dark:border-white/12 py-3 w-full max-w-2xl">
            <span className="font-semibold text-[#141413] dark:text-[#F4F2ED]">
              2D/3D Motion Design
            </span>
            <span aria-hidden="true">·</span>
            <span>AI Visuals</span>
            <span aria-hidden="true">·</span>
            <span>Conversion Web</span>
            <span aria-hidden="true">·</span>
            <span>TikTok Influencer</span>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="#works"
              onClick={(e) => handleSmoothAnchor(e, 'works')}
              className="px-6 py-3.5 rounded-xl bg-[#141413] dark:bg-[#F4F2ED] text-[#F8F6F1] dark:text-[#141413] font-semibold text-sm sm:text-base hover:bg-[#FF4D2D] dark:hover:bg-[#C6FF00] dark:hover:text-[#141413] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 shadow-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t.ctaWorks}</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={onOpenBrief}
              className="px-6 py-3.5 rounded-xl border border-[#141413]/25 dark:border-white/25 text-[#141413] dark:text-[#F4F2ED] font-semibold text-sm sm:text-base hover:border-[#FF4D2D] hover:text-[#FF4D2D] dark:hover:border-[#C6FF00] dark:hover:text-[#C6FF00] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{t.ctaContact}</span>
            </motion.button>

            <a
              href="#mind-story"
              onClick={(e) => handleSmoothAnchor(e, 'mind-story')}
              className="group px-4 py-3.5 text-sm font-mono text-[#141413]/70 dark:text-[#F4F2ED]/70 hover:text-[#FF4D2D] dark:hover:text-[#C6FF00] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.ctaDive}</span>
              <ArrowDownRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Interactive SVG Thread Knot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative flex flex-col items-center justify-center perspective-1000"
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
        >
          <div
            className="relative w-full max-w-[460px] aspect-square rounded-3xl border border-[#141413]/12 dark:border-white/12 bg-[#FAF8F5] dark:bg-[#16161A] p-6 flex flex-col justify-between transition-transform duration-300 ease-out shadow-lg"
            style={{
              transform: `rotateY(${mouseTilt.x}deg) rotateX(${-mouseTilt.y}deg)`,
            }}
          >
            {/* Top label inside Sketchbook Frame */}
            <div className="flex items-center justify-between text-xs font-mono text-[#141413]/60 dark:text-[#F4F2ED]/60">
              <span>{t.knotLabel}</span>
              <button
                type="button"
                onClick={() => setKnotPulseCount((c) => c + 1)}
                className="text-[#FF4D2D] dark:text-[#C6FF00] hover:underline cursor-pointer font-medium"
              >
                {t.knotPulseBtn} ({knotPulseCount + 1})
              </button>
            </div>

            {/* Animated Tangled SVG Knot with exiting thread & traveling pulse */}
            <div className="relative flex-1 flex items-center justify-center my-2">
              <svg
                viewBox="0 0 400 320"
                className="w-full h-full overflow-visible"
                aria-label={t.knotLabel}
              >
                {/* Shadow / Sketch under-stroke */}
                <path
                  d={KNOT_SVG_PATH}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.12"
                  strokeWidth="7"
                  strokeLinecap="round"
                  transform={`translate(${mouseTilt.x * 0.45}, ${mouseTilt.y * 0.45})`}
                />

                {/* Secondary Graphite Thread Loop */}
                <path
                  d="M 155 135 C 95 210, 285 245, 245 120 C 205 15, 95 130, 200 185 C 280 220, 325 185, 395 185"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.7"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />

                {/* Main Hand-drawn Knot Path with Continuous Flowing Dash */}
                <path
                  id="hero-knot-main-path"
                  key={knotPulseCount}
                  d={KNOT_SVG_PATH}
                  fill="none"
                  stroke="#FF4D2D"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="16 8"
                  className="animate-dash-flow"
                />

                {/* Traveling Energy Bead Gliding Along the Tangled Knot */}
                <circle
                  r="6.5"
                  fill="#C6FF00"
                  stroke="#141413"
                  strokeWidth="2.5"
                >
                  <animateMotion
                    key={knotPulseCount}
                    dur="4.5s"
                    repeatCount="indefinite"
                    path={KNOT_SVG_PATH}
                  />
                </circle>

                {/* Exiting Thread Arrow Cue */}
                <circle cx="385" cy="185" r="6" fill="#FF4D2D" />
                <text
                  x="295"
                  y="170"
                  className="fill-[#141413] dark:fill-[#F4F2ED] text-[11px] font-mono"
                >
                  {t.knotThreadArrow}
                </text>
              </svg>

              {/* Floating Interactive Mini-Element 1: 3D Cube */}
              <div
                className="absolute top-5 left-5 animate-float-slow"
                style={{
                  transform: `translate3d(${mouseTilt.x * -0.6}px, ${mouseTilt.y * -0.6}px, 24px)`,
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.08, rotate: -3 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setActiveMiniNode('cube')}
                  onMouseEnter={() => setActiveMiniNode('cube')}
                  className={`px-3.5 py-2 rounded-xl border transition-colors duration-200 cursor-pointer flex items-center gap-2 ${
                    activeMiniNode === 'cube'
                      ? 'bg-[#FF4D2D] text-white border-[#FF4D2D] shadow-lg'
                      : 'bg-[#F8F6F1] dark:bg-[#1E1E24] text-[#141413] dark:text-[#F4F2ED] border-[#141413]/20 dark:border-white/20'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span className="font-mono text-xs font-bold">3D Cube</span>
                </motion.button>
              </div>

              {/* Floating Interactive Mini-Element 2: Keyframe Diamond */}
              <div
                className="absolute bottom-7 left-7 animate-float-reverse"
                style={{
                  transform: `translate3d(${mouseTilt.x * 0.7}px, ${mouseTilt.y * 0.5}px, 30px)`,
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setActiveMiniNode('keyframe')}
                  onMouseEnter={() => setActiveMiniNode('keyframe')}
                  className={`px-3.5 py-2 rounded-xl border transition-colors duration-200 cursor-pointer flex items-center gap-2 ${
                    activeMiniNode === 'keyframe'
                      ? 'bg-[#141413] dark:bg-[#C6FF00] text-white dark:text-[#141413] border-[#141413] dark:border-[#C6FF00] shadow-lg'
                      : 'bg-[#F8F6F1] dark:bg-[#1E1E24] text-[#141413] dark:text-[#F4F2ED] border-[#141413]/20 dark:border-white/20'
                  }`}
                >
                  <span className="font-mono text-xs font-bold">◆ Keyframe</span>
                </motion.button>
              </div>

              {/* Floating Interactive Mini-Element 3: AI Spark */}
              <div
                className="absolute top-7 right-5 animate-float-slow"
                style={{
                  transform: `translate3d(${mouseTilt.x * 0.5}px, ${mouseTilt.y * -0.7}px, 28px)`,
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setActiveMiniNode('ai')}
                  onMouseEnter={() => setActiveMiniNode('ai')}
                  className={`px-3.5 py-2 rounded-xl border transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                    activeMiniNode === 'ai'
                      ? 'bg-[#FF4D2D] text-white border-[#FF4D2D] shadow-lg'
                      : 'bg-[#F8F6F1] dark:bg-[#1E1E24] text-[#141413] dark:text-[#F4F2ED] border-[#141413]/20 dark:border-white/20'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-mono text-xs font-bold">AI Spark</span>
                </motion.button>
              </div>
            </div>

            {/* Active Mini-Node Speech Bubble inside Knot Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMiniNode}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl bg-[#F8F6F1] dark:bg-[#0E0E10] border border-[#141413]/12 dark:border-white/12 p-3.5 text-xs sm:text-sm font-mono text-[#141413]/85 dark:text-[#F4F2ED]/85"
              >
                {t.miniNodes[activeMiniNode]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Full-width Bottom Metric & Proof Strip below the Hero Split */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.22 }}
        className="max-w-[1360px] w-full mx-auto mt-12 pt-6 border-t border-[#141413]/12 dark:border-white/12 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-[#141413] dark:text-[#F4F2ED]">
            {t.metrics.m1Val}
          </div>
          <div className="text-xs sm:text-sm text-[#141413]/65 dark:text-[#F4F2ED]/65">
            {t.metrics.m1Label}
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-[#FF4D2D] dark:text-[#C6FF00]">
            {t.metrics.m2Val}
          </div>
          <div className="text-xs sm:text-sm text-[#141413]/65 dark:text-[#F4F2ED]/65">
            {t.metrics.m2Label}
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-[#141413] dark:text-[#F4F2ED]">
            {t.metrics.m3Val}
          </div>
          <div className="text-xs sm:text-sm text-[#141413]/65 dark:text-[#F4F2ED]/65">
            {t.metrics.m3Label}
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-[#141413] dark:text-[#F4F2ED]">
            {t.metrics.m4Val}
          </div>
          <div className="text-xs sm:text-sm text-[#141413]/65 dark:text-[#F4F2ED]/65">
            {t.metrics.m4Label}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
