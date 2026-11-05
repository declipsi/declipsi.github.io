import React, { useState } from 'react';
import {
  CATEGORY_KEYS,
  Locale,
  PORTFOLIO_I18N,
  ProjectCase,
  ProjectCategoryKey,
} from '../data/portfolioData';
import { filterProjectsByKey } from '../utils/portfolioLogic';
import { ArrowUpRight, Play, Sparkles, X, CheckCircle2, ArrowDownRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface SelectedWorksSectionProps {
  locale: Locale;
  onOpenBriefWithProject: (projectTitle: string) => void;
}

export const SelectedWorksSection: React.FC<SelectedWorksSectionProps> = ({
  locale,
  onOpenBriefWithProject,
}) => {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<ProjectCategoryKey>('all');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const content = PORTFOLIO_I18N[locale];
  const t = content.works;
  const projects = content.projects;

  const filteredProjects = filterProjectsByKey(projects, selectedCategoryKey);
  const activeCaseModal: ProjectCase | null =
    projects.find((p) => p.id === activeCaseId) || null;

  const handleSmoothResume = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById('resume');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="works" className="py-24 px-6 paper-grain">
      <div className="max-w-[1360px] mx-auto">
        {/* Section Header + Category Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00] mb-2">
              {t.kicker}
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141413] dark:text-[#F4F2ED]">
              {t.headlinePart1}
              <span className="font-serif italic font-normal text-[#FF4D2D] dark:text-[#C6FF00]">
                {t.headlineItalic}
              </span>
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div
            role="tablist"
            aria-label={t.filterAria}
            className="flex flex-nowrap overflow-x-auto max-w-full items-center gap-1 p-1.5 rounded-xl bg-[#141413]/6 dark:bg-white/10 shrink-0"
          >
            {CATEGORY_KEYS.map((catKey) => {
              const isSelected = selectedCategoryKey === catKey;
              return (
                <button
                  key={catKey}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategoryKey(catKey)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#141413] text-[#F8F6F1] dark:bg-[#C6FF00] dark:text-[#141413] font-semibold shadow-sm'
                      : 'text-[#141413]/75 dark:text-[#F4F2ED]/75 hover:text-[#141413] dark:hover:text-white'
                  }`}
                >
                  [{t.categories[catKey]}]
                </button>
              );
            })}
          </div>
        </div>

        {/* 2x2 Editorial Showcase Grid with Layout & Hover Animations */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isHovered = hoveredCardId === project.id;
              const hasImgError = imageErrorMap[project.id];

              return (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -5 }}
                  key={project.id}
                  onMouseEnter={() => setHoveredCardId(project.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="group rounded-3xl border border-[#141413]/15 dark:border-white/15 bg-[#FAF8F5] dark:bg-[#151519] overflow-hidden flex flex-col justify-between transition-colors duration-200 hover:border-[#FF4D2D] dark:hover:border-[#C6FF00] hover:shadow-xl"
                >
                  {/* Media Preview Container */}
                  <div>
                    <div
                      onClick={() => setActiveCaseId(project.id)}
                      className="relative aspect-video w-full overflow-hidden bg-[#141413] cursor-pointer"
                    >
                      {!hasImgError ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setImageErrorMap((prev) => ({ ...prev, [project.id]: true }))
                          }
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#141413] to-[#2c1915] text-white">
                          <Sparkles className="w-8 h-8 text-[#FF4D2D] mb-2" />
                          <span className="font-mono text-sm">{project.codeTitle}</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/75 text-white text-xs font-mono flex items-center gap-1.5">
                        <Play className="w-3 h-3 fill-[#FF4D2D] text-[#FF4D2D]" />
                        <span>{isHovered ? t.reelActive : t.reelHover}</span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs font-mono text-white/90 tabular-nums">
                          <span>{project.codeTitle}</span>
                          <span className="text-[#C6FF00] font-semibold">
                            {project.metrics.ctr} · {project.metrics.retention3s}
                          </span>
                        </div>
                        <div className="w-full h-1 bg-white/25 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-[#FF4D2D] transition-all duration-700 ${
                              isHovered ? 'w-full' : 'w-1/4'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card Text Body */}
                    <div className="p-6 sm:p-8">
                      <div className="text-xs font-mono text-[#141413]/60 dark:text-[#F4F2ED]/60 mb-2">
                        {project.tools.join(' · ')}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#141413] dark:text-[#F4F2ED] mb-2 leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#141413]/80 dark:text-[#F4F2ED]/80 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="text-xs font-mono text-[#141413]/75 dark:text-[#F4F2ED]/75 py-2.5 px-3.5 rounded-xl bg-[#141413]/5 dark:bg-white/5">
                        <strong className="text-[#FF4D2D] dark:text-[#C6FF00]">
                          {t.hookFormulaLabel}
                        </strong>{' '}
                        {project.hookFormula}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-[#141413]/10 dark:border-white/10 flex items-center justify-between gap-4">
                    <span className="text-xs font-mono tabular-nums text-[#141413]/70 dark:text-[#F4F2ED]/70">
                      {t.outcomeLabel} <strong>{project.metrics.outcome}</strong>
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveCaseId(project.id)}
                      className="text-xs sm:text-sm font-mono font-semibold text-[#FF4D2D] dark:text-[#C6FF00] hover:underline inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>{t.caseDetailsBtn}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* TikTok Influencer & Trend-Sensing Strip (#tiktok-pulse) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          id="tiktok-pulse"
          className="mt-14 rounded-3xl border border-[#141413]/15 dark:border-white/15 bg-[#141413] text-[#F8F6F1] p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-[#C6FF00] mb-2">
              {t.tiktokKicker}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              {t.tiktokTitle}
            </h3>
            <p className="text-sm sm:text-base text-[#F8F6F1]/80 leading-relaxed">
              {t.tiktokDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => onOpenBriefWithProject('TikTok / Reels Creatives')}
              className="px-5 py-3 rounded-xl bg-[#FF4D2D] text-white font-semibold text-sm hover:bg-[#ff6549] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.tiktokCta}
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom CTA Button to Scroll/Expand Full Resume */}
        <div className="mt-12 flex justify-center">
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="#resume"
            onClick={handleSmoothResume}
            className="px-7 py-4 rounded-2xl border border-[#141413]/25 dark:border-white/25 bg-[#FAF8F5] dark:bg-[#16161B] text-[#141413] dark:text-[#F4F2ED] font-semibold text-sm sm:text-base hover:border-[#FF4D2D] hover:text-[#FF4D2D] dark:hover:border-[#C6FF00] dark:hover:text-[#C6FF00] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <span>{t.moreRabbitHolesBtn}</span>
            <ArrowDownRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      {/* Fullscreen Lightbox / Case Study Modal */}
      <AnimatePresence>
        {activeCaseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-modal-title"
            className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setActiveCaseId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl w-full rounded-3xl bg-[#FAF8F5] dark:bg-[#16161B] text-[#141413] dark:text-[#F4F2ED] border border-[#141413]/20 dark:border-white/20 overflow-hidden shadow-2xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full bg-[#141413]">
                <img
                  src={activeCaseModal.image}
                  alt={activeCaseModal.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActiveCaseId(null)}
                  aria-label={t.modal.closeAria}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-[#FF4D2D] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00] mb-1">
                  {activeCaseModal.codeTitle}
                </div>
                <h3 id="case-modal-title" className="text-2xl sm:text-3xl font-extrabold mb-2">
                  {activeCaseModal.title}
                </h3>
                <p className="text-sm sm:text-base opacity-85 mb-6 leading-relaxed">
                  {activeCaseModal.description}
                </p>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-4 py-4 px-5 rounded-2xl bg-[#141413]/5 dark:bg-white/5 mb-6 font-mono tabular-nums">
                  <div>
                    <div className="text-xs opacity-65">{t.modal.ctrLabel}</div>
                    <div className="text-lg font-bold text-[#FF4D2D] dark:text-[#C6FF00]">
                      {activeCaseModal.metrics.ctr}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs opacity-65">{t.modal.retentionLabel}</div>
                    <div className="text-lg font-bold">{activeCaseModal.metrics.retention3s}</div>
                  </div>
                  <div>
                    <div className="text-xs opacity-65">{t.modal.effectLabel}</div>
                    <div className="text-sm font-bold">{activeCaseModal.metrics.outcome}</div>
                  </div>
                </div>

                {/* Pipeline Breakdown */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider opacity-65 mb-3">
                    {t.modal.stagesTitle}
                  </h4>
                  <ul className="space-y-2">
                    {activeCaseModal.pipelineSteps.map((step) => (
                      <li key={step} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#FF4D2D] dark:text-[#C6FF00] shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#141413]/12 dark:border-white/12">
                  <span className="text-xs font-mono opacity-75">
                    {t.modal.deliverablesPrefix} {activeCaseModal.deliverables}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const title = activeCaseModal.title;
                        setActiveCaseId(null);
                        onOpenBriefWithProject(title);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#FF4D2D] text-white text-xs sm:text-sm font-semibold hover:bg-[#141413] transition-colors cursor-pointer"
                    >
                      {t.modal.wantSimilarBtn}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
