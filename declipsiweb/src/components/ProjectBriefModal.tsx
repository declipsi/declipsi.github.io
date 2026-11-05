import React, { useState, useEffect } from 'react';
import { Locale, PORTFOLIO_I18N } from '../data/portfolioData';
import { validateProjectBrief } from '../utils/portfolioLogic';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface ProjectBriefModalProps {
  locale: Locale;
  isOpen: boolean;
  initialProjectType?: string;
  onClose: () => void;
}

export const ProjectBriefModal: React.FC<ProjectBriefModalProps> = ({
  locale,
  isOpen,
  initialProjectType,
  onClose,
}) => {
  const t = PORTFOLIO_I18N[locale].brief;
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [projectType, setProjectType] = useState(initialProjectType || t.typeOptions[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; contact?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialProjectType) {
      setProjectType(initialProjectType);
    } else {
      setProjectType(t.typeOptions[0]);
    }
  }, [initialProjectType, locale]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateProjectBrief({ name, contact, projectType, message }, locale);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="brief-modal-title"
      className="fixed inset-0 z-[85] bg-black/75 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={handleResetAndClose}
    >
      <div
        className="max-w-lg w-full rounded-3xl bg-[#FAF8F5] dark:bg-[#16161B] text-[#141413] dark:text-[#F4F2ED] border border-[#141413]/20 dark:border-white/20 p-6 sm:p-8 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-mono text-[#FF4D2D] dark:text-[#C6FF00] mb-1">
              {t.kicker}
            </div>
            <h3 id="brief-modal-title" className="text-2xl font-extrabold">
              {t.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label={t.closeAria}
            className="p-2 rounded-full hover:bg-[#141413]/10 dark:hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#FF4D2D] dark:text-[#C6FF00] mx-auto" />
            <h4 className="text-xl font-bold">{t.successTitle}</h4>
            <p className="text-sm opacity-80 leading-relaxed">
              {t.successBodyPart1} <strong>{name}</strong>! {t.successBodyPart2}{' '}
              <strong>“{projectType}”</strong> {t.successBodyPart3} <strong>{contact}</strong>.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:dianapaliij@gmail.com?subject=${encodeURIComponent(
                  `Project: ${projectType} (${name})`
                )}&body=${encodeURIComponent(
                  `Name: ${name}\nContact: ${contact}\nFormat: ${projectType}\n\nDetails:\n${message}`
                )}`}
                className="px-5 py-2.5 rounded-xl bg-[#FF4D2D] text-white text-xs sm:text-sm font-semibold hover:bg-[#141413] transition-colors"
              >
                {t.openMailClientBtn}
              </a>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-2.5 rounded-xl border border-[#141413]/25 dark:border-white/25 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                {t.doneBtn}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="brief-name" className="block text-xs font-mono mb-1.5">
                {t.nameLabel}
              </label>
              <input
                id="brief-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full px-4 py-2.5 rounded-xl border border-[#141413]/20 dark:border-white/20 bg-white dark:bg-[#0E0E10] text-sm focus:outline-none focus:border-[#FF4D2D]"
              />
              {errors.name && (
                <p className="text-xs text-[#FF4D2D] font-mono mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="brief-contact" className="block text-xs font-mono mb-1.5">
                {t.contactLabel}
              </label>
              <input
                id="brief-contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={t.contactPlaceholder}
                className="w-full px-4 py-2.5 rounded-xl border border-[#141413]/20 dark:border-white/20 bg-white dark:bg-[#0E0E10] text-sm focus:outline-none focus:border-[#FF4D2D]"
              />
              {errors.contact && (
                <p className="text-xs text-[#FF4D2D] font-mono mt-1">{errors.contact}</p>
              )}
            </div>

            <div>
              <label htmlFor="brief-type" className="block text-xs font-mono mb-1.5">
                {t.typeLabel}
              </label>
              <select
                id="brief-type"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#141413]/20 dark:border-white/20 bg-white dark:bg-[#0E0E10] text-sm focus:outline-none focus:border-[#FF4D2D]"
              >
                {t.typeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="brief-message" className="block text-xs font-mono mb-1.5">
                {t.messageLabel}
              </label>
              <textarea
                id="brief-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.messagePlaceholder}
                className="w-full px-4 py-2.5 rounded-xl border border-[#141413]/20 dark:border-white/20 bg-white dark:bg-[#0E0E10] text-sm focus:outline-none focus:border-[#FF4D2D]"
              />
              {errors.message && (
                <p className="text-xs text-[#FF4D2D] font-mono mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#FF4D2D] text-white font-semibold text-sm hover:bg-[#141413] dark:hover:bg-[#C6FF00] dark:hover:text-[#141413] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{t.submitBtn}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
