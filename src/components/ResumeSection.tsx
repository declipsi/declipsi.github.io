import React, { useState } from 'react';
import { Locale, PORTFOLIO_I18N } from '../data/portfolioData';
import { Download, FileText, GraduationCap, Globe, Check, X } from 'lucide-react';

interface ResumeSectionProps {
  locale: Locale;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ locale }) => {
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [downloadedNotice, setDownloadedNotice] = useState(false);

  const content = PORTFOLIO_I18N[locale];
  const t = content.resume;
  const competencies = content.competencies;
  const languages = content.languages;
  const milestones = content.timelineMilestones;

  const handleDownloadCVText = () => {
    const compLines = competencies
      .map((c) => `${c.number}. ${c.title}: ${c.description}`)
      .join('\n');
    const langLines = languages.map((l) => `${l.name} (${l.level})`).join(' · ');
    const histLines = milestones
      .slice()
      .reverse()
      .map((m) => `- ${m.period}: ${m.title} (${m.role}) — ${m.description}`)
      .join('\n');

    const cvContent = `${content.nav.brandName.toUpperCase()} (DIANA PALII)
${t.cvModal.roleLine}
${t.cvModal.locationLine}

${t.summaryKicker.toUpperCase()}:
${t.summaryTitle}
${t.summaryBody}

${t.kicker.toUpperCase()}:
${compLines}

${t.cvModal.historyTitle.toUpperCase()}:
${histLines}

${t.educationLabel.toUpperCase()}:
${t.educationTitle} — ${t.educationBody}

${t.languagesLabel.toUpperCase()}:
${langLines}
`;

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Diana_Palii_CV_${locale.toUpperCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedNotice(true);
    setTimeout(() => setDownloadedNotice(false), 3500);
  };

  return (
    <section
      id="resume"
      className="py-24 px-6 border-t border-[#141413]/12 dark:border-white/12 bg-[#FAF8F5] dark:bg-[#121216]"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Section Header + Download CV Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
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

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setCvModalOpen(true)}
              className="px-5 py-3 rounded-xl border border-[#141413]/25 dark:border-white/25 text-xs sm:text-sm font-semibold text-[#141413] dark:text-[#F4F2ED] hover:border-[#FF4D2D] hover:text-[#FF4D2D] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{t.previewBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadCVText}
              className="px-5 py-3 rounded-xl bg-[#141413] dark:bg-[#FF4D2D] text-white text-xs sm:text-sm font-semibold hover:bg-[#FF4D2D] dark:hover:bg-[#ff6347] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {downloadedNotice ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              <span>{downloadedNotice ? t.downloadedBtn : t.downloadBtn}</span>
            </button>
          </div>
        </div>

        {/* Bento-Grid Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Summary Card (col-span-7) */}
          <div className="lg:col-span-7 rounded-3xl p-8 border border-[#141413]/15 dark:border-white/15 bg-[#F8F6F1] dark:bg-[#17171C] flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00] mb-3">
                {t.summaryKicker}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#141413] dark:text-[#F4F2ED] mb-4 leading-snug">
                {t.summaryTitle}
              </h3>
              <p className="text-base text-[#141413]/80 dark:text-[#F4F2ED]/80 leading-relaxed">
                {t.summaryBody}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#141413]/10 dark:border-white/10 text-xs font-mono text-[#141413]/70 dark:text-[#F4F2ED]/70 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{content.nav.brandName}</span>
              <span aria-hidden="true">·</span>
              <span>{t.summaryLocation}</span>
              <span aria-hidden="true">·</span>
              <span>dianapaliij@gmail.com</span>
              <span aria-hidden="true">·</span>
              <span>Full-Cycle Creative</span>
            </div>
          </div>

          {/* Education & Languages Card (col-span-5) */}
          <div className="lg:col-span-5 rounded-3xl p-8 border border-[#141413]/15 dark:border-white/15 bg-[#F8F6F1] dark:bg-[#17171C] flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00] mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>{t.educationLabel}</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#141413] dark:text-[#F4F2ED] mb-1">
                {t.educationTitle}
              </h3>
              <p className="text-sm text-[#141413]/75 dark:text-[#F4F2ED]/75">
                {t.educationBody}
              </p>
            </div>

            <div className="pt-6 border-t border-[#141413]/10 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00] mb-3">
                <Globe className="w-4 h-4" />
                <span>{t.languagesLabel}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className="p-3 rounded-xl border border-[#141413]/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#121216]"
                  >
                    <div className="text-xs font-mono opacity-60">{lang.code}</div>
                    <div className="text-sm font-bold">{lang.name}</div>
                    <div className="text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00]">
                      {lang.level}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5 Key Competencies Grid */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {competencies.map((comp) => (
              <div
                key={comp.id}
                className="rounded-2xl p-6 border border-[#141413]/15 dark:border-white/15 bg-[#F8F6F1] dark:bg-[#17171C] flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-[#FF4D2D] dark:text-[#C6FF00] mb-2">
                    {comp.number}. {t.competencyPrefix}
                  </div>
                  <h3 className="text-lg font-extrabold text-[#141413] dark:text-[#F4F2ED] mb-2 leading-snug">
                    {comp.title}
                  </h3>
                  <p className="text-sm text-[#141413]/80 dark:text-[#F4F2ED]/80 leading-relaxed">
                    {comp.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#141413]/10 dark:border-white/10 text-[11px] font-mono text-[#141413]/60 dark:text-[#F4F2ED]/60">
                  {comp.keywords}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Printable / Formatted CV Sheet Modal */}
      {cvModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-sheet-title"
          className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setCvModalOpen(false)}
        >
          <div
            className="max-w-3xl w-full rounded-3xl bg-[#FAF8F5] dark:bg-[#16161B] text-[#141413] dark:text-[#F4F2ED] border border-[#141413]/20 dark:border-white/20 p-6 sm:p-10 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#141413]/15 dark:border-white/15 pb-6 mb-6">
              <div>
                <h3 id="cv-sheet-title" className="text-2xl sm:text-3xl font-extrabold">
                  {content.nav.brandName} (Diana Palii)
                </h3>
                <p className="text-sm font-mono text-[#FF4D2D] dark:text-[#C6FF00] mt-1">
                  {t.cvModal.roleLine}
                </p>
                <p className="text-xs font-mono opacity-70 mt-1">
                  {t.cvModal.locationLine}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCvModalOpen(false)}
                aria-label={t.cvModal.closeAria}
                className="p-2 rounded-full hover:bg-[#141413]/10 dark:hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider opacity-60 mb-2">
                  {t.cvModal.historyTitle}
                </h4>
                <div className="space-y-3">
                  {milestones
                    .slice()
                    .reverse()
                    .map((tm) => (
                      <div key={tm.id} className="border-b border-[#141413]/10 dark:border-white/10 pb-2">
                        <div className="font-bold">
                          {tm.period} — {tm.title} ({tm.role})
                        </div>
                        <div className="opacity-80 text-xs mt-0.5">{tm.description}</div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleDownloadCVText}
                  className="px-5 py-2.5 rounded-xl bg-[#FF4D2D] text-white font-semibold text-xs sm:text-sm hover:bg-[#141413] transition-colors cursor-pointer"
                >
                  {t.cvModal.downloadTxtBtn}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl border border-[#141413]/25 dark:border-white/25 font-semibold text-xs sm:text-sm hover:border-[#FF4D2D] transition-colors cursor-pointer"
                >
                  {t.cvModal.printPdfBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
