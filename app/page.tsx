"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Building2,
  CalendarDays,
  Car,
  Coffee,
  MapPin,
  Moon,
  ParkingCircle,
  Rocket,
  Sparkles,
  Star,
  Sun,
  Trees,
  UsersRound,
  Zap,
} from "lucide-react";

import LiveSignals from "../components/LiveSignals";
import AskCityPanel from "../components/AskCityPanel";
import PreviewDashboard from "../components/PreviewDashboard";
import RoadmapShowcase from "../components/RoadmapShowcase";

const CityModel = dynamic(() => import("../components/CityModel"), {
  ssr: false,
  loading: () => <div className="sceneLoading">Loading SEVORA city…</div>,
});

type Lang = "en" | "tr" | "de";
type CityMode = "night" | "day" | "work" | "event";

const copy = {
  en: {
    nav: ["Preview", "Signals", "AI", "Business", "Roadmap", "Early Access"],
    heroTag: "Private Preview Build",
    heroA: "SEVORA is being",
    heroB: "built live.",
    heroText:
      "A real-time city life assistant where 3D city pulse, AI suggestions, crowd signals, calm places, parking and local business visibility come together.",
    cta: "Explore Preview",
    roadmap: "View Roadmap",
    progress: "Preview build progress",
    status: "Private development",
    modeTitle: "City Mode",
    modes: { night: "Night", day: "Day", work: "Work", event: "Event" },
    stats: [
      ["3D City Engine", "Active", "Live"],
      ["AI Layer", "Building", "Soon"],
      ["Live Data", "Demo", "Beta"],
      ["Business Portal", "Planned", "Next"],
    ],
    dailyTitle: "What people will discover inside SEVORA.",
    dailyText:
      "SEVORA is not just a landing page. It is a living preview of how city data, AI and local activity can help people make better daily decisions.",
    daily: [
      ["Crowd Density", "See busy and calm areas before moving."],
      ["Quiet Places", "Find calm cafés, parks and work-friendly spots."],
      ["Parking Signals", "Discover nearby parking chances and walking distance."],
      ["Events", "See live events, festivals and social activity."],
      ["Business Layer", "Local businesses can become part of the city pulse."],
      ["AI Guidance", "Ask what makes sense based on time, mood and location."],
    ],
    businessTitle: "Businesses become visible inside the city pulse.",
    businessText:
      "Cafés, restaurants, venues, gyms, stores and parking areas can publish live availability, campaigns and density signals.",
    businessCards: [
      ["Cafés", "Show calm seats, Wi‑Fi status and work-friendly hours."],
      ["Restaurants", "Publish offers and live queue information."],
      ["Events", "Boost concerts, festivals and venue activity."],
      ["Parking", "Share empty capacity and guide nearby users."],
    ],
    finalTitle: "The city is already moving. SEVORA is learning.",
    finalText:
      "Join the early access list and be one of the first people to experience the private preview.",
    email: "Enter your email address",
    join: "Join Early Access",
  },
  tr: {
    nav: ["Preview", "Sinyaller", "AI", "İşletme", "Roadmap", "Erken Erişim"],
    heroTag: "Private Preview Build",
    heroA: "SEVORA canlı",
    heroB: "olarak inşa ediliyor.",
    heroText:
      "3D şehir pulse sistemi, AI önerileri, kalabalık sinyalleri, sakin yerler, park ve yerel işletme görünürlüğünü birleştiren gerçek zamanlı şehir asistanı.",
    cta: "Preview’i Keşfet",
    roadmap: "Roadmap’i Gör",
    progress: "Preview geliştirme durumu",
    status: "Özel geliştirme aşaması",
    modeTitle: "Şehir Modu",
    modes: { night: "Gece", day: "Gündüz", work: "Çalışma", event: "Etkinlik" },
    stats: [
      ["3D Şehir Motoru", "Aktif", "Canlı"],
      ["AI Katmanı", "Gelişiyor", "Yakında"],
      ["Canlı Veri", "Demo", "Beta"],
      ["İşletme Paneli", "Planlandı", "Sırada"],
    ],
    dailyTitle: "İnsanlar SEVORA içinde neleri keşfedecek?",
    dailyText:
      "SEVORA sadece bir landing page değil. Şehir verisi, AI ve yerel hareketin günlük kararları nasıl kolaylaştıracağını gösteren canlı bir ön izleme.",
    daily: [
      ["Yoğunluk", "Hareket etmeden önce yoğun ve sakin bölgeleri gör."],
      ["Sakin Yerler", "Sessiz kafeleri, parkları ve çalışma noktalarını bul."],
      ["Park Sinyalleri", "Yakındaki park ihtimalini ve yürüme mesafesini öğren."],
      ["Etkinlikler", "Canlı etkinlikleri, festivalleri ve sosyal hareketi gör."],
      ["İşletme Katmanı", "Yerel işletmeler şehir pulse sisteminin parçası olur."],
      ["AI Rehberliği", "Saat, mod ve konuma göre ne mantıklı sor."],
    ],
    businessTitle: "İşletmeler şehir pulse sistemi içinde görünür olur.",
    businessText:
      "Kafeler, restoranlar, etkinlik alanları, spor salonları, mağazalar ve otoparklar anlık müsaitlik, kampanya ve yoğunluk sinyali yayınlayabilir.",
    businessCards: [
      ["Kafeler", "Sakin masa, Wi‑Fi ve çalışmaya uygun saatleri göster."],
      ["Restoranlar", "Kampanya ve canlı sıra bilgisini yayınla."],
      ["Etkinlikler", "Konserleri, festivalleri ve mekan hareketini öne çıkar."],
      ["Otopark", "Boş kapasiteyi paylaş ve yakındaki kullanıcıyı yönlendir."],
    ],
    finalTitle: "Şehir zaten hareket ediyor. SEVORA öğreniyor.",
    finalText:
      "Erken erişim listesine katıl ve private preview deneyimini ilk görenlerden ol.",
    email: "E-posta adresin",
    join: "Erken Erişime Katıl",
  },
  de: {
    nav: ["Preview", "Signale", "AI", "Business", "Roadmap", "Early Access"],
    heroTag: "Private Preview Build",
    heroA: "SEVORA wird",
    heroB: "live aufgebaut.",
    heroText:
      "Ein Echtzeit-Stadtassistent mit 3D City Pulse, KI-Empfehlungen, Dichte-Signalen, ruhigen Orten, Parken und lokaler Business-Sichtbarkeit.",
    cta: "Preview entdecken",
    roadmap: "Roadmap ansehen",
    progress: "Preview Fortschritt",
    status: "Private Entwicklung",
    modeTitle: "City Mode",
    modes: { night: "Nacht", day: "Tag", work: "Work", event: "Event" },
    stats: [
      ["3D City Engine", "Aktiv", "Live"],
      ["AI Layer", "Aufbau", "Bald"],
      ["Live Data", "Demo", "Beta"],
      ["Business Portal", "Geplant", "Next"],
    ],
    dailyTitle: "Was Menschen in SEVORA entdecken werden.",
    dailyText:
      "SEVORA ist nicht nur eine Landingpage. Es ist eine lebendige Vorschau darauf, wie Stadtinformationen und KI tägliche Entscheidungen erleichtern.",
    daily: [
      ["Dichte", "Sieh volle und ruhige Bereiche vor dem Losgehen."],
      ["Ruhige Orte", "Finde Cafés, Parks und Orte zum Arbeiten."],
      ["Park-Signale", "Entdecke Parkchancen und Gehentfernung."],
      ["Events", "Sieh Live-Events, Festivals und soziale Aktivität."],
      ["Business Layer", "Lokale Unternehmen werden Teil des City Pulse."],
      ["AI Guidance", "Frag nach Zeit, Stimmung und Standort."],
    ],
    businessTitle: "Unternehmen werden im City Pulse sichtbar.",
    businessText:
      "Cafés, Restaurants, Veranstaltungsorte, Fitnessstudios, Stores und Parkplätze können Verfügbarkeit, Kampagnen und Dichte-Signale veröffentlichen.",
    businessCards: [
      ["Cafés", "Ruhige Plätze, Wi‑Fi und Arbeitszeiten anzeigen."],
      ["Restaurants", "Angebote und Warteschlangen live veröffentlichen."],
      ["Events", "Konzerte, Festivals und Venue-Aktivität hervorheben."],
      ["Parken", "Freie Kapazität teilen und Nutzer leiten."],
    ],
    finalTitle: "Die Stadt bewegt sich bereits. SEVORA lernt.",
    finalText:
      "Trage dich in die Early-Access-Liste ein und erlebe die Private Preview zuerst.",
    email: "E-Mail-Adresse",
    join: "Early Access sichern",
  },
};

const langs: Lang[] = ["en", "tr", "de"];
const modes: CityMode[] = ["night", "day", "work", "event"];
const statIcons = [Sparkles, Zap, Bell, Rocket];
const dailyIcons = [UsersRound, Trees, ParkingCircle, CalendarDays, Building2, Star];
const businessIcons = [Coffee, Car, CalendarDays, MapPin];

function LogoMark({ large = false }: { large?: boolean }) {
  return (
    <span className={large ? "logoMark large" : "logoMark"}>
      <span className="sTop" />
      <span className="sMid" />
      <span className="sBot" />
      <b>S</b>
    </span>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [mode, setMode] = useState<CityMode>("night");
  const [active, setActive] = useState("home");
  const t = useMemo(() => copy[lang], [lang]);

  const navItems = [
    ["preview-dashboard", t.nav[0]],
    ["signals", t.nav[1]],
    ["ask-city", t.nav[2]],
    ["business", t.nav[3]],
    ["roadmap", t.nav[4]],
    ["waitlist", t.nav[5]],
  ];

  const dock = [
    ["home", "Home"],
    ["preview-dashboard", "Preview"],
    ["signals", "Signals"],
    ["ask-city", "Ask City"],
    ["business", "Business"],
    ["roadmap", "Roadmap"],
    ["waitlist", "Access"],
  ];

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const sections = document.querySelectorAll("section[id]");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (entry) => entry.isIntersecting && entry.target.classList.add("visible")
        );
      },
      { threshold: 0.12 }
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      {
        threshold: [0.18, 0.35, 0.55],
        rootMargin: "-18% 0px -55% 0px",
      }
    );

    reveals.forEach((item) => revealObserver.observe(item));
    sections.forEach((item) => sectionObserver.observe(item));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  function handleNavClick(id: string) {
    setActive(id);
  }

  return (
    <main className="page">
      <section className="hero" id="home">
        <div className="heroShade" />

        <header className="header">
          <a className="brand" href="#home" onClick={() => handleNavClick("home")}>
            <LogoMark large />
            <span>
              <strong>SEVORA</strong>
              <small>PRIVATE PREVIEW</small>
            </span>
          </a>

          <nav className="topNav">
            {navItems.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => handleNavClick(id)}
                className={active === id ? "active" : id === "waitlist" ? "navButton" : ""}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="language">
            {langs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLang(item)}
                className={lang === item ? "active" : ""}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        <aside className="dock">
          <a
            href="#home"
            className={`homeBubble homeBubbleLogo ${active === "home" ? "active" : ""}`}
            onClick={() => handleNavClick("home")}
            aria-label="Back to SEVORA hero"
          >
            <LogoMark />
          </a>

          {dock.slice(1).map((item, index) => (
            <a
              key={item[0]}
              href={`#${item[0]}`}
              className={active === item[0] ? "active" : ""}
              onClick={() => handleNavClick(item[0])}
            >
              <span>{String(index + 2).padStart(2, "0")}</span>
              <i />
              {item[1]}
            </a>
          ))}
        </aside>

        <div className="heroGrid">
          <div className="heroCopy reveal visible">
            <p className="kicker">
              <i />
              {t.heroTag}
            </p>

            <h1>
              {t.heroA}
              <br />
              <em>{t.heroB}</em>
            </h1>

            <p className="lead">{t.heroText}</p>

            <div className="heroActions">
              <a
                href="#preview-dashboard"
                className="primaryButton"
                onClick={() => handleNavClick("preview-dashboard")}
              >
                {t.cta}
                <span>→</span>
              </a>

              <a
                href="#roadmap"
                className="demoButton"
                onClick={() => handleNavClick("roadmap")}
              >
                {t.roadmap}
                <span>↘</span>
              </a>
            </div>

            <div className="previewProgress">
              <div>
                <strong>{t.progress}</strong>
                <span>42%</span>
              </div>
              <i>
                <b />
              </i>
              <small>{t.status}</small>
            </div>
          </div>

          <div className="cityStage">
            <div className="modeControl">
              <strong>{t.modeTitle}</strong>
              <div>
                {modes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMode(item)}
                    className={mode === item ? "active" : ""}
                  >
                    {item === "night" && <Moon size={14} />}
                    {item === "day" && <Sun size={14} />}
                    {item === "work" && <Coffee size={14} />}
                    {item === "event" && <Sparkles size={14} />}
                    {t.modes[item]}
                  </button>
                ))}
              </div>
            </div>

            <CityModel mode={mode} />
          </div>
        </div>

        <section className="stats reveal visible">
          {t.stats.map((stat, index) => {
            const Icon = statIcons[index];

            return (
              <article className={`stat stat${index + 1}`} key={stat[0]}>
                <div className="icon">
                  <Icon size={23} />
                </div>

                <div>
                  <p>{stat[0]}</p>
                  <small>{stat[1]}</small>
                  <strong>{stat[2]}</strong>
                  <span className="lineGraph" />
                </div>
              </article>
            );
          })}
        </section>
      </section>

      <PreviewDashboard />

      <section className="daily reveal" id="life">
        <p className="sectionKicker">CITY EXPERIENCE</p>
        <h2>{t.dailyTitle}</h2>
        <span>{t.dailyText}</span>

        <div className="dailyGrid">
          {t.daily.map((card, index) => {
            const Icon = dailyIcons[index];

            return (
              <article className="dailyCard" key={card[0]}>
                <div>
                  <Icon size={28} />
                </div>
                <h3>{card[0]}</h3>
                <p>{card[1]}</p>
              </article>
            );
          })}
        </div>
      </section>

      <LiveSignals />

      <AskCityPanel />

      <section className="business reveal" id="business">
        <div className="businessIntro">
          <p className="sectionKicker">BUSINESS LAYER</p>
          <h2>{t.businessTitle}</h2>
          <span>{t.businessText}</span>
          <a href="#waitlist" onClick={() => handleNavClick("waitlist")}>
            Business Preview →
          </a>
        </div>

        <div className="businessGrid">
          {t.businessCards.map((item, index) => {
            const Icon = businessIcons[index];

            return (
              <article key={item[0]}>
                <div>
                  <Icon size={26} />
                </div>
                <h3>{item[0]}</h3>
                <p>{item[1]}</p>
              </article>
            );
          })}
        </div>
      </section>

      <RoadmapShowcase />

      <section className="final reveal" id="waitlist">
        <LogoMark large />

        <div className="finalText">
          <h2>{t.finalTitle}</h2>
          <p>{t.finalText}</p>
        </div>

        <form>
          <input type="email" placeholder={t.email} />
          <button type="button">
            {t.join}
            <span>→</span>
          </button>
          <small>● Private preview list is now open</small>
        </form>
      </section>

      <a className="backTop" href="#home" onClick={() => handleNavClick("home")}>
        ↑
      </a>
    </main>
  );
}
