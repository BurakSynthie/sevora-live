"use client";

import { useEffect, useState } from "react";

type Lang = "tr" | "en";

const labels = {
  tr: {
    home: "Giriş",
    how: "Nasıl çalışır",
    moods: "Modlar",
    rooms: "Odalar",
    extension: "Uzatma",
    connection: "Bağlantı",
    safety: "Güvenlik",
    roadmap: "Yol haritası",
    faq: "SSS",
    waitlist: "Erken erişim",
    menu: "Menü",
  },
  en: {
    home: "Home",
    how: "How it works",
    moods: "Moods",
    rooms: "Rooms",
    extension: "Extension",
    connection: "Connection",
    safety: "Safety",
    roadmap: "Roadmap",
    faq: "FAQ",
    waitlist: "Early access",
    menu: "Menu",
  },
};

const icons = {
  home: "⌂",
  moods: "◐",
  rooms: "◌",
  safety: "◇",
  menu: "☰",
};

export default function SectionNavigator({ lang = "tr" }: { lang?: Lang }) {
  const t = labels[lang];
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = [
    { id: "home", label: t.home },
    { id: "how", label: t.how },
    { id: "moods", label: t.moods },
    { id: "rooms", label: t.rooms },
    { id: "extension", label: t.extension },
    { id: "connection", label: t.connection },
    { id: "safety", label: t.safety },
    { id: "roadmap", label: t.roadmap },
    { id: "faq", label: t.faq },
    { id: "waitlist", label: t.waitlist },
  ];

  const mobileMain = [
    { id: "home", label: t.home, icon: icons.home },
    { id: "moods", label: t.moods, icon: icons.moods },
    { id: "rooms", label: t.rooms, icon: icons.rooms },
    { id: "safety", label: t.safety, icon: icons.safety },
  ];

  useEffect(() => {
    function onScroll() {
      let current = "home";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= 180) {
          current = section.id;
        }
      }

      setActive(current);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [lang]);

  function goTo(id: string) {
    setMenuOpen(false);
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <>
      <aside className="section-rail" aria-label="Section navigation">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={active === section.id ? "active" : ""}
            onClick={() => goTo(section.id)}
          >
            <span />
            {section.label}
          </button>
        ))}
      </aside>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {mobileMain.map((item) => (
          <button
            key={item.id}
            type="button"
            className={active === item.id ? "active" : ""}
            onClick={() => goTo(item.id)}
          >
            <b>{item.icon}</b>
            <span>{item.label}</span>
          </button>
        ))}

        <button
          type="button"
          className={menuOpen ? "active" : ""}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <b>{icons.menu}</b>
          <span>{t.menu}</span>
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu-sheet">
          <div className="mobile-menu-card">
            <div className="mobile-menu-head">
              <strong>SEVORA</strong>
              <button type="button" onClick={() => setMenuOpen(false)}>
                ×
              </button>
            </div>

            <div className="mobile-menu-grid">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  className={active === section.id ? "active" : ""}
                  onClick={() => goTo(section.id)}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
