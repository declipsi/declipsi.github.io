import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Locale, PORTFOLIO_I18N } from '../data/portfolioData';

interface NavbarProps {
  locale: Locale;
  onChangeLocale: (next: Locale) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenBrief: () => void;
  scrollProgress: number;
}

const LOCALES: { code: Locale; label: string; aria: string }[] = [
  { code: 'en', label: 'EN', aria: 'Switch language to English' },
  { code: 'de', label: 'DE', aria: 'Sprache auf Deutsch umstellen' },
  { code: 'ru', label: 'RU', aria: 'Переключить язык на русский' },
];

export const Navbar: React.FC<NavbarProps> = ({
  locale,
  onChangeLocale,
  isDark,
  onToggleTheme,
  onOpenBrief,
  scrollProgress,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = PORTFOLIO_I18N[locale].nav;

  const navItems = [
    { label: t.mind, href: '#mind-story' },
    { label: t.works, href: '#works' },
    { label: t.resume, href: '#resume' },
    { label: t.tiktok, href: '#tiktok-pulse' },
  ];

  const handleSmoothNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F6F1]/90 dark:bg-[#0E0E10]/90 border-b border-[#141413]/10 dark:border-white/10 transition-colors duration-200">
      {/* Subtle top thread progress bar */}
      <div className="h-[2px] w-full bg-transparent overflow-hidden">
        <div
          className="h-full bg-[#FF4D2D] transition-transform duration-150 ease-out origin-left"
          style={{ transform: `scaleX(${Math.max(0.02, scrollProgress)})` }}
        />
      </div>

      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-[1360px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title, single line */}
        <a
          href="#hero"
          onClick={(e) => handleSmoothNavClick(e, '#hero')}
          className="text-lg font-extrabold tracking-tight text-[#141413] dark:text-[#F4F2ED] whitespace-nowrap shrink-0 hover:text-[#FF4D2D] dark:hover:text-[#FF4D2D] transition-colors"
        >
          {t.brandName}
        </a>

        {/* Zone 2: Concise single-line nav links + Language & Theme controls */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#141413]/75 dark:text-[#F4F2ED]/75"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleSmoothNavClick(e, item.href)}
              className="hover:text-[#FF4D2D] dark:hover:text-[#C6FF00] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}

          {/* Language Switcher (EN / DE / RU) */}
          <div
            role="group"
            aria-label="Language switcher"
            className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#141413]/6 dark:bg-white/10 text-xs font-mono shrink-0"
          >
            {LOCALES.map((loc) => {
              const active = locale === loc.code;
              return (
                <button
                  key={loc.code}
                  type="button"
                  onClick={() => onChangeLocale(loc.code)}
                  aria-label={loc.aria}
                  aria-pressed={active}
                  className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#141413] text-[#F8F6F1] dark:bg-[#C6FF00] dark:text-[#141413] font-bold'
                      : 'text-[#141413]/70 dark:text-[#F4F2ED]/70 hover:text-[#FF4D2D] dark:hover:text-white'
                  }`}
                >
                  {loc.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? t.lightAria : t.darkAria}
            className="text-sm font-medium text-[#141413]/75 dark:text-[#F4F2ED]/75 hover:text-[#FF4D2D] dark:hover:text-[#C6FF00] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isDark ? t.lightMode : t.darkMode}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBrief}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#141413] dark:bg-[#FF4D2D] dark:text-white rounded-lg hover:bg-[#FF4D2D] dark:hover:bg-[#ff6247] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.cta}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 rounded-lg text-[#141413] dark:text-[#F4F2ED] hover:bg-[#141413]/5 dark:hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#141413]/10 dark:border-white/10 bg-[#F8F6F1] dark:bg-[#0E0E10] px-6 py-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#141413]/10 dark:border-white/10">
            {LOCALES.map((loc) => (
              <button
                key={loc.code}
                type="button"
                onClick={() => {
                  onChangeLocale(loc.code);
                  setMobileMenuOpen(false);
                }}
                aria-label={loc.aria}
                className={`px-3 py-1 rounded-md text-xs font-mono ${
                  locale === loc.code
                    ? 'bg-[#141413] text-white dark:bg-[#C6FF00] dark:text-[#141413] font-bold'
                    : 'bg-[#141413]/5 dark:bg-white/10'
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>

          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleSmoothNavClick(e, item.href)}
              className="py-2 text-base font-medium text-[#141413] dark:text-[#F4F2ED] hover:text-[#FF4D2D]"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              onToggleTheme();
              setMobileMenuOpen(false);
            }}
            className="py-2 text-left text-base font-medium text-[#FF4D2D] dark:text-[#C6FF00]"
          >
            {t.mobileThemePrefix}: {isDark ? t.lightMode : t.darkMode}
          </button>
        </div>
      )}
    </header>
  );
};
