import React, { useEffect, useRef, useState } from 'react';
import {
  Locale,
  PORTFOLIO_I18N,
  HeartPillar,
} from '../data/portfolioData';
import {
  calculateHorizontalScrollProgress,
  getStoryThreadSvgPath,
  getThreadPointAtProgress,
  progressToHorizontalState,
  stepSmoothScrollProgress,
} from '../utils/portfolioLogic';
import { Interactive3DObject } from './Interactive3DObject';
import { ArrowDown, ArrowRight, Compass, Layers, Milestone } from 'lucide-react';

interface HorizontalStoryTrackProps {
  locale: Locale;
}

const STORY_SVG_PATH = getStoryThreadSvgPath();

export const HorizontalStoryTrack: React.FC<HorizontalStoryTrackProps> = ({ locale }) => {
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafLoopIdRef = useRef(0);

  const [scrollState, setScrollState] = useState({
    progress: 0,
    activeSceneIndex: 0 as 0 | 1 | 2,
    translateXPercent: 0,
  });

  const content = PORTFOLIO_I18N[locale];
  const t = content.story;
  const rabbitHoles = content.rabbitHoles;
  const heartPillars = content.heartPillars;
  const timelineMilestones = content.timelineMilestones;

  const [activeRabbitId, setActiveRabbitId] = useState<string>(rabbitHoles[0].id);
  const [activePillarId, setActivePillarId] = useState<string>(heartPillars[0].id);
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(timelineMilestones[2].id);

  // Exact point and arc-length along the 6-segment Cubic Bezier thread curve
  const threadPt = getThreadPointAtProgress(scrollState.progress);

  useEffect(() => {
    const startSmoothingLoop = () => {
      if (rafLoopIdRef.current) return;

      const tick = () => {
        const nextProgress = stepSmoothScrollProgress(
          currentProgressRef.current,
          targetProgressRef.current,
          0.14
        );
        currentProgressRef.current = nextProgress;
        setScrollState(progressToHorizontalState(nextProgress, 3));

        if (Math.abs(targetProgressRef.current - nextProgress) > 0.0004) {
          rafLoopIdRef.current = requestAnimationFrame(tick);
        } else {
          rafLoopIdRef.current = 0;
        }
      };

      rafLoopIdRef.current = requestAnimationFrame(tick);
    };

    const computeTargetFromWindow = (immediate = false) => {
      if (!trackContainerRef.current) return;
      const rect = trackContainerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const trackTop = scrollY + rect.top;
      const trackHeight = trackContainerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const rawState = calculateHorizontalScrollProgress(
        scrollY,
        trackTop,
        trackHeight,
        viewportHeight,
        3
      );
      targetProgressRef.current = rawState.progress;

      if (immediate) {
        currentProgressRef.current = rawState.progress;
        setScrollState(rawState);
      } else {
        startSmoothingLoop();
      }
    };

    const onScroll = () => computeTargetFromWindow(false);
    const onResize = () => computeTargetFromWindow(true);

    computeTargetFromWindow(true);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      if (rafLoopIdRef.current) {
        cancelAnimationFrame(rafLoopIdRef.current);
        rafLoopIdRef.current = 0;
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const jumpToScene = (sceneIndex: 0 | 1 | 2) => {
    if (!trackContainerRef.current) return;
    const rect = trackContainerRef.current.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const scrollable = Math.max(1, trackContainerRef.current.offsetHeight - window.innerHeight);
    const targetRatios = [0, 0.5, 1];
    const targetY = trackTop + scrollable * targetRatios[sceneIndex];
    targetProgressRef.current = targetRatios[sceneIndex];
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const renderPillar3DArtifact = (pillar: HeartPillar) => {
    switch (pillar.artifactType) {
      case 'target-brain':
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 animate-float-slow">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 5"
              className="animate-spin-slow"
              style={{ transformOrigin: '50px 50px' }}
            />
            <circle cx="50" cy="50" r="28" fill="none" stroke="#FF4D2D" strokeWidth="3" />
            <circle cx="50" cy="50" r="12" fill="#FF4D2D" />
            <line x1="50" y1="2" x2="50" y2="22" stroke="currentColor" strokeWidth="2" />
            <line x1="50" y1="78" x2="50" y2="98" stroke="currentColor" strokeWidth="2" />
            <line x1="2" y1="50" x2="22" y2="50" stroke="currentColor" strokeWidth="2" />
            <line x1="78" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      case 'orbit-camera':
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 animate-float-reverse">
            <ellipse
              cx="50"
              cy="50"
              rx="45"
              ry="18"
              fill="none"
              stroke="#FF4D2D"
              strokeWidth="2.4"
              strokeDasharray="10 5"
              transform="rotate(-24 50 50)"
              className="animate-dash-flow"
            />
            <rect
              x="28"
              y="32"
              width="44"
              height="34"
              rx="8"
              fill="#141413"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="50" cy="49" r="11" fill="#C6FF00" />
            <circle cx="50" cy="49" r="4" fill="#141413" />
          </svg>
        );
      case 'ai-prism':
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 animate-float-slow">
            <polygon
              points="50,12 88,82 12,82"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <polygon points="50,26 74,76 26,76" fill="#FF4D2D" fillOpacity="0.88" />
            <line
              x1="8"
              y1="54"
              x2="42"
              y2="48"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              className="animate-dash-flow"
            />
            <line
              x1="58"
              y1="48"
              x2="94"
              y2="34"
              stroke="#FF4D2D"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              className="animate-dash-flow"
            />
            <line
              x1="58"
              y1="54"
              x2="94"
              y2="56"
              stroke="#C6FF00"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              className="animate-dash-flow"
            />
          </svg>
        );
    }
  };

  return (
    <section id="mind-story" aria-label={t.threadLabel}>
      {/* =====================================================================
          DESKTOP HYBRID HORIZONTAL SCROLL CONTAINER (lg:block)
      ===================================================================== */}
      <div ref={trackContainerRef} className="hidden lg:block relative h-[320vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-20 pb-6 paper-grain">
          {/* Scene Switcher & Progress Bar HUD */}
          <div className="max-w-[1360px] w-full mx-auto px-6 z-20 flex items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#141413]/70 dark:text-[#F4F2ED]/70">
              <span className="font-bold text-[#FF4D2D] dark:text-[#C6FF00]">
                {t.threadLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {t.threadHint} ({Math.round(scrollState.progress * 100)}%)
              </span>
            </div>

            {/* Interactive Scene Jump Controls */}
            <div
              role="tablist"
              aria-label={t.threadLabel}
              className="flex items-center gap-1 p-1 rounded-xl bg-[#141413]/6 dark:bg-white/10"
            >
              <button
                type="button"
                role="tab"
                aria-selected={scrollState.activeSceneIndex === 0}
                onClick={() => jumpToScene(0)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  scrollState.activeSceneIndex === 0
                    ? 'bg-[#141413] text-[#F8F6F1] dark:bg-[#F4F2ED] dark:text-[#141413] font-semibold'
                    : 'text-[#141413]/70 dark:text-[#F4F2ED]/70 hover:text-[#141413] dark:hover:text-white'
                }`}
              >
                {t.tab1}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={scrollState.activeSceneIndex === 1}
                onClick={() => jumpToScene(1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  scrollState.activeSceneIndex === 1
                    ? 'bg-[#141413] text-[#F8F6F1] dark:bg-[#F4F2ED] dark:text-[#141413] font-semibold'
                    : 'text-[#141413]/70 dark:text-[#F4F2ED]/70 hover:text-[#141413] dark:hover:text-white'
                }`}
              >
                {t.tab2}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={scrollState.activeSceneIndex === 2}
                onClick={() => jumpToScene(2)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  scrollState.activeSceneIndex === 2
                    ? 'bg-[#141413] text-[#F8F6F1] dark:bg-[#F4F2ED] dark:text-[#141413] font-semibold'
                    : 'text-[#141413]/70 dark:text-[#F4F2ED]/70 hover:text-[#141413] dark:hover:text-white'
                }`}
              >
                {t.tab3}
              </button>
            </div>
          </div>

          {/* 300vw Horizontal Moving Track with Damped Interpolation */}
          <div
            className="relative flex-1 flex items-center w-[300vw] will-change-transform"
            style={{
              transform: `translate3d(${scrollState.translateXPercent}%, 0, 0)`,
            }}
          >
            {/* Continuous Hand-Drawn SVG Thread Spanning All 3 Scenes & Diving Down at Scene 3 End */}
            <svg
              viewBox="0 0 3600 500"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              aria-hidden="true"
            >
              {/* Faint Sketch Guide Path */}
              <path
                d={STORY_SVG_PATH}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.16"
                strokeWidth="3.5"
                strokeDasharray="8 8"
              />
              {/* Active Drawn Coral Thread */}
              <path
                d={STORY_SVG_PATH}
                fill="none"
                stroke="#FF4D2D"
                strokeWidth="4.5"
                strokeLinecap="round"
                pathLength={threadPt.totalLength}
                strokeDasharray={threadPt.totalLength}
                strokeDashoffset={Math.max(0, threadPt.totalLength - threadPt.drawnLength)}
              />
              {/* Downward Exit Arrowhead at (3475, 494) */}
              <path
                d="M 3465 480 L 3475 498 L 3485 480"
                fill="none"
                stroke="#FF4D2D"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={scrollState.progress > 0.85 ? 1 : 0.25}
              />
            </svg>

            {/* Yellow/Lime Follower Bead Locked Strictly to the Thread Curve (x, y) Behind Cards (z-0) */}
            <div
              data-testid="story-thread-bead"
              aria-hidden="true"
              className="absolute pointer-events-none z-0 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C6FF00] border-[3px] border-[#141413] shadow-[0_0_0_5px_rgba(198,255,0,0.22)]"
              style={{
                left: `${(threadPt.x / 3600) * 100}%`,
                top: `${(threadPt.y / 500) * 100}%`,
              }}
            />

            {/* Downward Thread Exit Badge at Bottom Right of Scene 3 */}
            <div
              aria-hidden="true"
              className="absolute pointer-events-none z-0 -translate-x-1/2 flex flex-col items-center gap-1 text-[11px] font-mono text-[#FF4D2D] dark:text-[#C6FF00]"
              style={{
                left: `${(3475 / 3600) * 100}%`,
                bottom: '8px',
              }}
            >
              <span className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#141418] border border-[#FF4D2D]/35">
                ↓
              </span>
            </div>

            {/* ===============================================================
                PANEL 1 (100vw): SCENE 1 — MY RABBIT HOLES (6 3D OBJECTS)
            =============================================================== */}
            <div className="w-screen h-full px-10 xl:px-16 flex flex-col justify-center relative z-10">
              <div className="max-w-[1360px] w-full mx-auto">
                <div className="mb-6 max-w-2xl">
                  <div className="text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00] mb-1">
                    {t.scene1.kicker}
                  </div>
                  <h2 className="text-2xl xl:text-4xl font-extrabold tracking-tight text-[#141413] dark:text-[#F4F2ED]">
                    {t.scene1.headlineBold}{' '}
                    <span className="font-normal text-[#141413]/75 dark:text-[#F4F2ED]/75">
                      {t.scene1.headlineNormal}
                    </span>
                  </h2>
                  <p className="font-serif italic text-lg xl:text-xl text-[#141413]/75 dark:text-[#F4F2ED]/75 mt-1">
                    {t.scene1.subheadItalic}
                  </p>
                </div>

                <div className="grid grid-cols-6 gap-4 items-center pt-2">
                  {rabbitHoles.map((item) => (
                    <Interactive3DObject
                      key={item.id}
                      item={item}
                      nodePrefix={t.nodePrefix}
                      isActive={activeRabbitId === item.id}
                      onSelect={setActiveRabbitId}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ===============================================================
                PANEL 2 (100vw): SCENE 2 — WHAT STOLE MY HEART (3 PILLARS)
            =============================================================== */}
            <div className="w-screen h-full px-10 xl:px-16 flex flex-col justify-center relative z-10">
              <div className="max-w-[1360px] w-full mx-auto">
                <div className="mb-6 max-w-2xl">
                  <div className="text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00] mb-1">
                    {t.scene2.kicker}
                  </div>
                  <h2 className="text-2xl xl:text-4xl font-extrabold tracking-tight text-[#141413] dark:text-[#F4F2ED]">
                    {t.scene2.headlinePart1}
                    <span className="font-serif italic font-normal text-[#FF4D2D] dark:text-[#C6FF00]">
                      {t.scene2.headlineItalic}
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-3 gap-7">
                  {heartPillars.map((pillar) => {
                    const selected = activePillarId === pillar.id;
                    return (
                      <div
                        key={pillar.id}
                        onMouseEnter={() => setActivePillarId(pillar.id)}
                        onClick={() => setActivePillarId(pillar.id)}
                        className={`rounded-3xl p-6 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          selected
                            ? 'bg-[#FAF8F5] dark:bg-[#191920] border-[#FF4D2D] dark:border-[#C6FF00] shadow-xl -translate-y-1.5'
                            : 'bg-[#FAF8F5] dark:bg-[#141418] border-[#141413]/15 dark:border-white/15 hover:border-[#FF4D2D]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-4 mb-4">
                            <div>
                              <div className="text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00]">
                                {pillar.stepLabel}
                              </div>
                              <div className="text-xs font-mono text-[#141413]/60 dark:text-[#F4F2ED]/60">
                                {t.scene2.accentPrefix} {pillar.artifactName}
                              </div>
                            </div>
                            {renderPillar3DArtifact(pillar)}
                          </div>

                          <h3 className="text-xl xl:text-2xl font-extrabold text-[#141413] dark:text-[#F4F2ED] mb-2.5">
                            {pillar.title}
                          </h3>
                          <p className="text-sm xl:text-base text-[#141413]/80 dark:text-[#F4F2ED]/80 leading-relaxed">
                            {pillar.description}
                          </p>
                        </div>

                        <div className="mt-5 pt-3.5 border-t border-[#141413]/10 dark:border-white/10 text-xs font-mono text-[#141413]/70 dark:text-[#F4F2ED]/70">
                          {pillar.proofMetric}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ===============================================================
                PANEL 3 (100vw): SCENE 3 — TIMELINE ON THE THREAD
            =============================================================== */}
            <div className="w-screen h-full px-10 xl:px-16 flex flex-col justify-center relative z-10">
              <div className="max-w-[1360px] w-full mx-auto">
                <div className="mb-6 max-w-3xl">
                  <div className="text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00] mb-1">
                    {t.scene3.kicker}
                  </div>
                  <h2 className="text-2xl xl:text-4xl font-extrabold tracking-tight text-[#141413] dark:text-[#F4F2ED]">
                    {t.scene3.headlinePart1}
                    <span className="font-serif italic font-normal text-[#FF4D2D] dark:text-[#C6FF00]">
                      {t.scene3.headlineItalic}
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-4 gap-5">
                  {timelineMilestones.map((milestone, idx) => {
                    const isCurrent = activeMilestoneId === milestone.id;
                    return (
                      <div
                        key={milestone.id}
                        onMouseEnter={() => setActiveMilestoneId(milestone.id)}
                        onClick={() => setActiveMilestoneId(milestone.id)}
                        className={`rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isCurrent
                            ? 'bg-[#141413] text-[#F8F6F1] dark:bg-[#F4F2ED] dark:text-[#141413] border-[#FF4D2D] -translate-y-1.5 shadow-xl'
                            : 'bg-[#FAF8F5] dark:bg-[#16161B] text-[#141413] dark:text-[#F4F2ED] border-[#141413]/15 dark:border-white/15'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                            <span className="font-bold text-[#FF4D2D] dark:text-[#FF4D2D]">
                              {milestone.period}
                            </span>
                            <span className="opacity-60">0{idx + 1}/04</span>
                          </div>
                          <h3 className="text-lg xl:text-xl font-extrabold mb-1.5 leading-snug">
                            {milestone.title}
                          </h3>
                          <div className="text-xs font-mono opacity-75 mb-2.5">
                            {milestone.role}
                          </div>
                          <p className="text-sm leading-relaxed opacity-85">
                            {milestone.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-current/15 text-xs font-mono flex items-center justify-between">
                          <span>{milestone.highlightTag}</span>
                          {idx === 3 ? (
                            <ArrowDown className="w-3.5 h-3.5 text-[#FF4D2D]" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Scrollytelling Hint */}
          <div className="max-w-[1360px] w-full mx-auto px-6 flex items-center justify-between text-xs font-mono text-[#141413]/60 dark:text-[#F4F2ED]/60">
            <span>
              {t.activeNodeLabel}{' '}
              <strong className="text-[#141413] dark:text-[#F4F2ED]">
                {rabbitHoles.find((r) => r.id === activeRabbitId)?.title}
              </strong>
            </span>
            <span>{t.scrollBelowHint}</span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MOBILE & TABLET VERTICAL WINDING THREAD STREAM (< lg)
      ===================================================================== */}
      <div className="lg:hidden relative py-16 px-6 overflow-hidden paper-grain">
        <svg
          viewBox="0 0 60 1800"
          preserveAspectRatio="none"
          className="absolute top-0 left-3 w-10 h-full pointer-events-none opacity-65"
          aria-hidden="true"
        >
          <path
            d="M 30 0 Q 55 150, 20 300 T 35 600 T 20 900 T 35 1200 T 25 1500 T 30 1800"
            fill="none"
            stroke="#FF4D2D"
            strokeWidth="3.5"
            strokeDasharray="10 6"
          />
        </svg>

        <div className="max-w-2xl mx-auto pl-6 space-y-16">
          {/* Mobile Scene 1: Rabbit Holes */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00] mb-2">
              <Compass className="w-4 h-4" />
              <span>{t.scene1.kicker}</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#141413] dark:text-[#F4F2ED]">
              {t.scene1.headlineBold}
            </h2>
            <p className="font-serif italic text-lg text-[#141413]/75 dark:text-[#F4F2ED]/75 mt-1 mb-6">
              {t.scene1.headlineNormal} {t.scene1.subheadItalic}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {rabbitHoles.map((item) => (
                <div key={item.id} className="flex justify-center">
                  <Interactive3DObject
                    item={{ ...item, yOffset: 0 }}
                    nodePrefix={t.nodePrefix}
                    isActive={activeRabbitId === item.id}
                    onSelect={setActiveRabbitId}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Scene 2: Heart Pillars */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00] mb-2">
              <Layers className="w-4 h-4" />
              <span>{t.scene2.kicker}</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#141413] dark:text-[#F4F2ED] mb-6">
              {t.scene2.headlinePart1}
              <span className="font-serif italic font-normal text-[#FF4D2D] dark:text-[#C6FF00]">
                {t.scene2.headlineItalic}
              </span>
            </h2>

            <div className="space-y-4">
              {heartPillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="rounded-2xl p-6 border border-[#141413]/15 dark:border-white/15 bg-[#FAF8F5] dark:bg-[#16161B]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00]">
                      {pillar.stepLabel} · {pillar.artifactName}
                    </span>
                    {renderPillar3DArtifact(pillar)}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                  <p className="text-sm text-[#141413]/80 dark:text-[#F4F2ED]/80 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Scene 3: Timeline */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00] mb-2">
              <Milestone className="w-4 h-4" />
              <span>{t.scene3.kicker}</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#141413] dark:text-[#F4F2ED] mb-6">
              {t.scene3.headlinePart1} {t.scene3.headlineItalic}
            </h2>

            <div className="space-y-4">
              {timelineMilestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="rounded-2xl p-5 border border-[#141413]/15 dark:border-white/15 bg-[#FAF8F5] dark:bg-[#16161B]"
                >
                  <div className="text-xs font-mono font-bold text-[#FF4D2D] mb-1">
                    {milestone.period}
                  </div>
                  <h3 className="text-lg font-bold">{milestone.title}</h3>
                  <div className="text-xs font-mono opacity-70 mb-2">{milestone.role}</div>
                  <p className="text-sm opacity-85 leading-relaxed">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
