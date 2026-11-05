/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { Locale, PORTFOLIO_I18N } from './data/portfolioData';
import { stepSmoothScrollProgress } from './utils/portfolioLogic';
import { SitePreloader } from './components/SitePreloader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HorizontalStoryTrack } from './components/HorizontalStoryTrack';
import { ProcessLoopSection } from './components/ProcessLoopSection';
import { SelectedWorksSection } from './components/SelectedWorksSection';
import { ResumeSection } from './components/ResumeSection';
import { FooterSection } from './components/FooterSection';
import { ProjectBriefModal } from './components/ProjectBriefModal';

export default function App() {
  // Primary language is English ('en'), with German ('de') and Russian ('ru') support
  const [locale, setLocale] = useState<Locale>('en');
  const [isDark, setIsDark] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [briefInitialType, setBriefInitialType] = useState<string | undefined>(undefined);

  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const rafIdRef = useRef(0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = PORTFOLIO_I18N[locale].metaTitle;
  }, [locale]);

  useEffect(() => {
    const startGlobalSmoothLoop = () => {
      if (rafIdRef.current) return;
      const tick = () => {
        const next = stepSmoothScrollProgress(
          currentScrollRef.current,
          targetScrollRef.current,
          0.15
        );
        currentScrollRef.current = next;
        setScrollProgress(next);

        if (Math.abs(targetScrollRef.current - next) > 0.0005) {
          rafIdRef.current = requestAnimationFrame(tick);
        } else {
          rafIdRef.current = 0;
        }
      };
      rafIdRef.current = requestAnimationFrame(tick);
    };

    const handleScroll = () => {
      const docHeight = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      targetScrollRef.current = Math.max(0, Math.min(1, window.scrollY / docHeight));
      startGlobalSmoothLoop();
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenBrief = (projectType?: string) => {
    setBriefInitialType(projectType);
    setBriefModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#141413] dark:bg-[#0E0E10] dark:text-[#F4F2ED] transition-colors duration-200">
      {/* Site Loading Animation (Preloader) */}
      <SitePreloader locale={locale} />

      <Navbar
        locale={locale}
        onChangeLocale={setLocale}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onOpenBrief={() => handleOpenBrief()}
        scrollProgress={scrollProgress}
      />

      <main>
        {/* Screen 1: Hero */}
        <HeroSection locale={locale} onOpenBrief={() => handleOpenBrief()} />

        {/* Screens 2–4: Hybrid Horizontal Scrollytelling Track */}
        <HorizontalStoryTrack locale={locale} />

        {/* Screen 5: Process Loop */}
        <ProcessLoopSection locale={locale} />

        {/* Section 7: Selected Works & TikTok Influencer */}
        <SelectedWorksSection
          locale={locale}
          onOpenBriefWithProject={(title) => handleOpenBrief(title)}
        />

        {/* Section 8: Full Resume / Anatomy of Skills */}
        <ResumeSection locale={locale} />
      </main>

      {/* Section 9: Finale & Footer with Elastic Cutout Sticker */}
      <FooterSection locale={locale} onOpenBrief={() => handleOpenBrief()} />

      {/* Project Brief Modal */}
      <ProjectBriefModal
        locale={locale}
        isOpen={briefModalOpen}
        initialProjectType={briefInitialType}
        onClose={() => setBriefModalOpen(false)}
      />
    </div>
  );
}
