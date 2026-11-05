import React, { useEffect, useState } from 'react';
import { Locale, PORTFOLIO_I18N } from '../data/portfolioData';
import { ArrowDown, Pause, Play, RotateCw } from 'lucide-react';
import { motion } from 'motion/react';

interface ProcessLoopSectionProps {
  locale: Locale;
}

interface LoopBezierLobe {
  p0: [number, number];
  p1: [number, number];
  p2: [number, number];
  p3: [number, number];
}

// 4 cubic Bezier lobes forming the exact figure-8 infinity loop:
// M 300 110 -> Top-Left -> Bottom-Left -> Top-Right -> Bottom-Right -> 300 110
const LOOP_LOBES: LoopBezierLobe[] = [
  { p0: [300, 110], p1: [200, 10], p2: [60, 10], p3: [60, 110] },
  { p0: [60, 110], p1: [60, 210], p2: [200, 210], p3: [300, 110] },
  { p0: [300, 110], p1: [400, 10], p2: [540, 10], p3: [540, 110] },
  { p0: [540, 110], p1: [540, 210], p2: [400, 210], p3: [300, 110] },
];

const INFINITY_SVG_PATH =
  'M 300 110 C 200 10, 60 10, 60 110 C 60 210, 200 210, 300 110 C 400 10, 540 10, 540 110 C 540 210, 400 210, 300 110 Z';

// Exact coordinates on the cubic Bezier curve for nodes 1..5:
// Lobe 0 at t=0.5 -> (142.5, 35)
// Lobe 1 at t=0.5 -> (142.5, 185)
// Center crossover at t=0.5 of full loop -> (300, 110)
// Lobe 2 at t=0.5 -> (457.5, 35)
// Lobe 3 at t=0.5 -> (457.5, 185)
const LOOP_NODE_POINTS = [
  { cx: 142.5, cy: 35, progressT: 0.125 },
  { cx: 142.5, cy: 185, progressT: 0.375 },
  { cx: 300, cy: 110, progressT: 0.5 },
  { cx: 457.5, cy: 35, progressT: 0.625 },
  { cx: 457.5, cy: 185, progressT: 0.875 },
];

function evalPointOnInfinityLoop(normProgress: number): { x: number; y: number } {
  const wrapped = ((normProgress % 1) + 1) % 1;
  const scaled = wrapped * 4;
  const lobeIndex = Math.min(3, Math.floor(scaled));
  const localT = scaled - lobeIndex;
  const seg = LOOP_LOBES[lobeIndex];

  const u = 1 - localT;
  const tt = localT * localT;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * localT;

  const x =
    uuu * seg.p0[0] +
    3 * uu * localT * seg.p1[0] +
    3 * u * tt * seg.p2[0] +
    ttt * seg.p3[0];
  const y =
    uuu * seg.p0[1] +
    3 * uu * localT * seg.p1[1] +
    3 * u * tt * seg.p2[1] +
    ttt * seg.p3[1];

  return { x, y };
}

function getActiveStepFromLoopProgress(normProgress: number): number {
  const p = ((normProgress % 1) + 1) % 1;
  if (p < 0.25) return 0; // Node 1: Top-left lobe
  if (p < 0.45) return 1; // Node 2: Bottom-left lobe
  if (p < 0.55) return 2; // Node 3: Center crossover
  if (p < 0.75) return 3; // Node 4: Top-right lobe
  return 4; // Node 5: Bottom-right lobe
}

export const ProcessLoopSection: React.FC<ProcessLoopSectionProps> = ({ locale }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [loopProgress, setLoopProgress] = useState(0.125);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const t = PORTFOLIO_I18N[locale].loop;
  const steps = PORTFOLIO_I18N[locale].processLoopSteps;

  useEffect(() => {
    if (!isAutoPlaying) return;

    let rafId = 0;
    let lastTime = performance.now();
    const cycleDurationMs = 6500; // Full figure-8 revolution in 6.5s

    const tick = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;

      setLoopProgress((prev) => {
        const next = (prev + dt / cycleDurationMs) % 1;
        setActiveStepIndex(getActiveStepFromLoopProgress(next));
        return next;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isAutoPlaying]);

  const handleSelectStep = (idx: number) => {
    setActiveStepIndex(idx);
    setLoopProgress(LOOP_NODE_POINTS[idx].progressT);
  };

  const cycleNextStep = () => {
    const nextIdx = (activeStepIndex + 1) % steps.length;
    handleSelectStep(nextIdx);
  };

  const handleSmoothWorks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById('works');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const runnerPt = evalPointOnInfinityLoop(loopProgress);
  const trailPt1 = evalPointOnInfinityLoop(loopProgress - 0.022);
  const trailPt2 = evalPointOnInfinityLoop(loopProgress - 0.044);

  return (
    <section
      id="process-loop"
      className="relative py-24 px-6 border-y border-[#141413]/12 dark:border-white/12 bg-[#FAF8F5] dark:bg-[#121216] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
        {/* Top Vertical Thread Connector with Flowing Pulse */}
        <div className="relative w-[3px] h-16 bg-[#FF4D2D]/25 mb-6 overflow-hidden rounded-full" aria-hidden="true">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
            className="w-full h-8 bg-gradient-to-b from-transparent via-[#FF4D2D] to-[#C6FF00]"
          />
        </div>

        <div className="text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00] mb-3">
          {t.kicker}
        </div>

        <h2
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141413] dark:text-[#F4F2ED] max-w-3xl mb-6"
          style={{ textWrap: 'balance' }}
        >
          {t.headlinePart1}
          <span className="font-serif italic font-normal text-[#FF4D2D] dark:text-[#C6FF00]">
            {t.headlineItalic}
          </span>
        </h2>

        {/* Interactive Animated SVG Infinity Loop Knot */}
        <div
          className="relative w-full max-w-[700px] my-6"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <svg
            viewBox="0 0 600 220"
            className="w-full h-auto overflow-visible"
            aria-label={t.kicker}
          >
            {/* Outer Soft Track Shadow */}
            <path
              d={INFINITY_SVG_PATH}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.12"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* Secondary Continuous Inner Guide */}
            <path
              d={INFINITY_SVG_PATH}
              fill="none"
              stroke="#FF4D2D"
              strokeOpacity="0.22"
              strokeWidth="4"
            />

            {/* Animated Flowing Dashed Coral Thread */}
            <path
              d={INFINITY_SVG_PATH}
              fill="none"
              stroke="#FF4D2D"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray="16 8"
              className="animate-dash-flow"
            />

            {/* Highlighted Active Segment Arc on the Infinity Loop */}
            <path
              d={INFINITY_SVG_PATH}
              fill="none"
              stroke="#C6FF00"
              strokeWidth="5"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="18 82"
              strokeDashoffset={-((loopProgress * 100 - 9 + 100) % 100)}
            />

            {/* Comet Trail Particles Behind the Main Runner Bead */}
            <circle
              cx={trailPt2.x}
              cy={trailPt2.y}
              r="3.5"
              fill="#FF4D2D"
              opacity="0.45"
            />
            <circle
              cx={trailPt1.x}
              cy={trailPt1.y}
              r="5"
              fill="#C6FF00"
              opacity="0.65"
            />

            {/* 5 Interactive Numbered Stage Nodes Seated Directly on the Curve */}
            {LOOP_NODE_POINTS.map((pt, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <g
                  key={idx}
                  onClick={() => handleSelectStep(idx)}
                  onMouseEnter={() => handleSelectStep(idx)}
                  className="cursor-pointer"
                >
                  {/* Animated Ripple Ring on the Active Node */}
                  {isSelected && (
                    <circle
                      cx={pt.cx}
                      cy={pt.cy}
                      r="22"
                      fill="none"
                      stroke="#C6FF00"
                      strokeWidth="2"
                      strokeOpacity="0.55"
                      strokeDasharray="4 4"
                      className="animate-spin-slow"
                      style={{ transformOrigin: `${pt.cx}px ${pt.cy}px` }}
                    />
                  )}

                  <circle
                    cx={pt.cx}
                    cy={pt.cy}
                    r={isSelected ? 15 : 10}
                    fill={isSelected ? '#C6FF00' : '#FAF8F5'}
                    stroke="#141413"
                    strokeWidth="3"
                    className="transition-all duration-200"
                  />
                  <text
                    x={pt.cx}
                    y={pt.cy + 4}
                    textAnchor="middle"
                    className="text-[11px] font-mono font-extrabold fill-[#141413] select-none"
                  >
                    {idx + 1}
                  </text>
                </g>
              );
            })}

            {/* Live Traveling Energy Bead Gliding Along the Figure-8 */}
            <circle
              cx={runnerPt.x}
              cy={runnerPt.y}
              r="7.5"
              fill="#C6FF00"
              stroke="#141413"
              strokeWidth="2.8"
            />
          </svg>
        </div>

        {/* Interactive Pipeline Sequence Steps */}
        <div
          className="w-full grid grid-cols-1 md:grid-cols-5 gap-3 my-6 text-left"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {steps.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <motion.button
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                key={step.id}
                type="button"
                onClick={() => handleSelectStep(idx)}
                onMouseEnter={() => handleSelectStep(idx)}
                className={`p-4 rounded-2xl border transition-colors duration-200 cursor-pointer flex flex-col justify-between text-left ${
                  isSelected
                    ? 'bg-[#141413] text-[#F8F6F1] dark:bg-[#F4F2ED] dark:text-[#141413] border-[#FF4D2D] dark:border-[#C6FF00] shadow-lg -translate-y-1'
                    : 'bg-[#F8F6F1] dark:bg-[#18181E] text-[#141413] dark:text-[#F4F2ED] border-[#141413]/12 dark:border-white/12 hover:border-[#FF4D2D]'
                }`}
              >
                <div>
                  <div className="text-xs font-mono text-[#FF4D2D] font-bold mb-1 flex items-center justify-between">
                    <span>{step.stepNumber} →</span>
                    {isSelected && (
                      <span className="inline-block w-2 h-2 rounded-full bg-[#C6FF00]" />
                    )}
                  </div>
                  <div className="text-sm font-bold leading-snug mb-1.5">{step.title}</div>
                </div>
                <div className="text-xs opacity-75 leading-relaxed">{step.caption}</div>
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 mb-8">
          <button
            type="button"
            onClick={cycleNextStep}
            className="text-xs font-mono text-[#141413]/75 dark:text-[#F4F2ED]/75 hover:text-[#FF4D2D] dark:hover:text-[#C6FF00] flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>
              {t.cycleBtn} ({activeStepIndex + 1}/5)
            </span>
          </button>

          <span className="text-[#141413]/25 dark:text-white/25" aria-hidden="true">
            ·
          </span>

          <button
            type="button"
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className="text-xs font-mono text-[#141413]/75 dark:text-[#F4F2ED]/75 hover:text-[#FF4D2D] dark:hover:text-[#C6FF00] flex items-center gap-1 cursor-pointer"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Auto-loop</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Resume loop</span>
              </>
            )}
          </button>
        </div>

        {/* Transition Lead-in to Selected Works */}
        <p className="font-serif italic text-xl sm:text-2xl text-[#141413]/80 dark:text-[#F4F2ED]/80 mb-6">
          {t.leadIn}
        </p>

        <motion.a
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          href="#works"
          onClick={handleSmoothWorks}
          className="px-7 py-3.5 rounded-xl bg-[#FF4D2D] text-white font-semibold text-sm sm:text-base hover:bg-[#141413] dark:hover:bg-[#C6FF00] dark:hover:text-[#141413] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 shadow-md"
        >
          <span>{t.ctaWorks}</span>
          <ArrowDown className="w-4 h-4" />
        </motion.a>
      </div>
    </section>
  );
};
