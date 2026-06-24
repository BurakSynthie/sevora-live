"use client";

import { useState } from "react";

type Lang = "tr" | "en";

type LegalContent = {
  tr: {
    label: string;
    title: string;
    intro: string;
    updated: string;
    sections: {
      title: string;
      text: string;
    }[];
  };
  en: {
    label: string;
    title: string;
    intro: string;
    updated: string;
    sections: {
      title: string;
      text: string;
    }[];
  };
};

export default function LegalPage({ content }: { content: LegalContent }) {
  const [lang, setLang] = useState<Lang>("tr");
  const t = content[lang];

  return (
    <main className="legal-page">
      <header className="legal-top">
        <a className="brand-mark" href="/">
          <span>S</span>
          SEVORA
        </a>

        <div className="lang-switch">
          <button
            className={lang === "tr" ? "active" : ""}
            onClick={() => setLang("tr")}
            type="button"
          >
            TR
          </button>
          <button
            className={lang === "en" ? "active" : ""}
            onClick={() => setLang("en")}
            type="button"
          >
            EN
          </button>
        </div>
      </header>

      <section className="legal-hero">
        <span>{t.label}</span>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
        <small>{t.updated}</small>
      </section>

      <section className="legal-content">
        {t.sections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </article>
        ))}
      </section>

      <footer className="legal-footer">
        <a href="/">Sevora</a>
        <a href="/privacy">{lang === "tr" ? "Gizlilik" : "Privacy"}</a>
        <a href="/terms">{lang === "tr" ? "Kullanım Şartları" : "Terms"}</a>
        <a href="/community">{lang === "tr" ? "Topluluk Kuralları" : "Community"}</a>
        <a href="/contact">{lang === "tr" ? "İletişim" : "Contact"}</a>
      </footer>
    </main>
  );
}
