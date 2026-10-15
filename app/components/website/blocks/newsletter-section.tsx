"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { ScrollReveal } from "../animations/scroll-reveal";
import { useWebsiteLanguage } from "../language-provider";

export function NewsletterSection() {
  const { lang } = useWebsiteLanguage();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--nusuk-primary)] via-[#2a1f0f] to-[var(--nusuk-primary)] py-20">
      <div className="nusuk-section-glow absolute inset-0" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <ScrollReveal direction="fade">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--nusuk-accent)]">
            {lang === "AR" ? "ابق على تواصل" : "Restez informé"}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {lang === "AR" ? "ابدأ مغامرتك الروحانية" : "Commencez votre aventure spirituelle"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--nusuk-muted)]/80">
            {lang === "AR"
              ? "اشترك في نشرتنا لتصلك عروض العمرة الحصرية ونصائح السفر."
              : "Inscrivez-vous pour recevoir nos offres Omra exclusives et conseils voyage."}
          </p>

          {sent ? (
            <p className="mt-8 rounded-full border border-[var(--nusuk-accent)]/40 bg-[var(--nusuk-accent)]/10 px-6 py-3 text-sm font-medium text-[var(--nusuk-accent-light)]">
              {lang === "AR" ? "شكراً! سنتواصل معكم قريباً." : "Merci ! Nous vous contacterons bientôt."}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={lang === "AR" ? "بريدكم الإلكتروني" : "Votre email"}
                className="flex-1 rounded-full border border-[var(--nusuk-accent)]/30 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-[var(--nusuk-muted)]/50 focus:border-[var(--nusuk-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--nusuk-accent)]/30"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--nusuk-accent)] px-8 py-3.5 text-sm font-bold text-[var(--nusuk-primary)] hover:bg-[var(--nusuk-accent-light)]"
              >
                <Send size={16} />
                {lang === "AR" ? "اشترك" : "S'abonner"}
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
