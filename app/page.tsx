"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  Car,
  Coffee,
  MapPin,
  MessageCircle,
  Navigation,
  ParkingCircle,
  RadioTower,
  Rocket,
  Sparkles,
  Star,
  Trees,
  UsersRound,
  Zap,
} from "lucide-react";

const CityModel = dynamic(() => import("../components/CityModel"), {
  ssr: false,
  loading: () => <div className="sceneLoading">Loading SEVORA city…</div>,
});

const AIOrb = dynamic(() => import("../components/AIOrb"), {
  ssr: false,
  loading: () => <div className="orbLoading" />,
});

type Lang = "en" | "tr" | "de";

const copy = {
  en: {
    nav: ["Pulse", "Daily Life", "Businesses", "About", "Early Access"],
    heroTag: "Live City Intelligence",
    heroA: "Feel the",
    heroB: "city live.",
    heroText: "See crowds, quiet places, events, parking signals and local reports before you move.",
    cta: "Explore the Pulse",
    demo: "Watch Demo",
    stats: [
      ["Crowd Density", "High", "82%"],
      ["Quiet Places", "Available", "28%"],
      ["Parking Spots", "Nearby", "6 min"],
      ["Live Events", "Active", "12"],
    ],
    dailyTitle: "Everything you need, before you step out.",
    daily: [
      ["Traffic", "Live road conditions"],
      ["Parking", "Find parking in seconds"],
      ["Quiet Places", "Discover calm spots"],
      ["Cafés", "Work-friendly spots"],
      ["Events", "Live events near you"],
      ["Reports", "Real people real time"],
    ],
    aiTitle: "Ask the city.",
    aiText: "Your smart assistant for real-time city answers.",
    prompts: ["Where should I work today?", "Is Kadıköy crowded right now?", "Any quiet cafés nearby?", "Which route is less busy?"],
    eventsTitle: "Don’t miss what’s happening.",
    eventsText: "Concerts, festivals, matches and more. Live on the map.",
    eventNames: [
      ["Summer Festival", "Maçka Park", "Today 18:00", "LIVE"],
      ["Beşiktaş Match Day", "Tüpraş Stadium", "Tomorrow 20:00", "Tomorrow"],
      ["Jazz Night", "Kadıköy Sahne", "Today 21:00", "LIVE"],
      ["Street Food Fest", "Moda Coast", "This Weekend", "Weekend"],
    ],
    businessTitle: "Grow with SEVORA.",
    businessText: "Reach more people, at the right time, in the right place.",
    business: [
      ["Publish Campaigns", "Reach local customers"],
      ["Live Density Alerts", "Notify your customers"],
      ["Boost Visibility", "Stand out on the map"],
      ["Get More Customers", "Increase foot traffic"],
    ],
    finalTitle: "Be the first to experience the city live.",
    finalText: "Join the early access list and shape the future of SEVORA.",
    email: "Enter your email address",
    join: "Join Early Access",
  },
  tr: {
    nav: ["Pulse", "Günlük Hayat", "İşletmeler", "Hakkında", "Erken Erişim"],
    heroTag: "Canlı Şehir Zekâsı",
    heroA: "Şehrin",
    heroB: "nabzını hisset.",
    heroText: "Kalabalığı, sakin yerleri, etkinlikleri, park sinyallerini ve yerel bildirimleri yola çıkmadan önce gör.",
    cta: "Pulse’ı Keşfet",
    demo: "Demoyu İzle",
    stats: [
      ["Yoğunluk", "Yüksek", "82%"],
      ["Sakin Yerler", "Uygun", "28%"],
      ["Park Noktaları", "Yakında", "6 dk"],
      ["Canlı Etkinlik", "Aktif", "12"],
    ],
    dailyTitle: "Dışarı çıkmadan önce ihtiyacın olan her şey.",
    daily: [
      ["Trafik", "Canlı yol durumu"],
      ["Park", "Saniyeler içinde park bul"],
      ["Sakin Yerler", "Sessiz noktaları keşfet"],
      ["Kafeler", "Çalışmaya uygun yerler"],
      ["Etkinlikler", "Yakınındaki canlı etkinlikler"],
      ["Bildirimler", "Anlık kullanıcı bilgisi"],
    ],
    aiTitle: "Şehre sor.",
    aiText: "Anlık şehir cevapları için akıllı asistanın.",
    prompts: ["Bugün nerede çalışılır?", "Kadıköy şu an kalabalık mı?", "Yakında sakin kafe var mı?", "Hangi rota daha rahat?"],
    eventsTitle: "Neler oluyor kaçırma.",
    eventsText: "Konserler, festivaller, maçlar ve daha fazlası haritada canlı.",
    eventNames: [
      ["Yaz Festivali", "Maçka Parkı", "Bugün 18:00", "CANLI"],
      ["Beşiktaş Maç Günü", "Tüpraş Stadyumu", "Yarın 20:00", "Yarın"],
      ["Jazz Night", "Kadıköy Sahne", "Bugün 21:00", "CANLI"],
      ["Sokak Lezzetleri", "Moda Sahili", "Bu Hafta Sonu", "Hafta Sonu"],
    ],
    businessTitle: "SEVORA ile büyü.",
    businessText: "Doğru zamanda, doğru yerde, daha fazla kişiye ulaş.",
    business: [
      ["Kampanya Yayınla", "Yerel müşterilere ulaş"],
      ["Canlı Yoğunluk", "Müşterilerini bilgilendir"],
      ["Görünürlüğü Artır", "Haritada öne çık"],
      ["Daha Fazla Müşteri", "Yaya trafiğini artır"],
    ],
    finalTitle: "Şehri canlı deneyimleyen ilk kişilerden ol.",
    finalText: "Erken erişim listesine katıl ve SEVORA’nın geleceğini birlikte şekillendir.",
    email: "E-posta adresin",
    join: "Erken Erişime Katıl",
  },
  de: {
    nav: ["Pulse", "Alltag", "Unternehmen", "Über", "Early Access"],
    heroTag: "Live City Intelligence",
    heroA: "Erlebe den",
    heroB: "Puls der Stadt.",
    heroText: "Sieh Menschenmengen, ruhige Orte, Events, Parksignale und lokale Meldungen, bevor du losgehst.",
    cta: "Pulse entdecken",
    demo: "Demo ansehen",
    stats: [
      ["Dichte", "Hoch", "82%"],
      ["Ruhige Orte", "Verfügbar", "28%"],
      ["Parkplätze", "In der Nähe", "6 Min"],
      ["Live-Events", "Aktiv", "12"],
    ],
    dailyTitle: "Alles, was du brauchst, bevor du losgehst.",
    daily: [
      ["Verkehr", "Live-Straßenlage"],
      ["Parken", "Parkplatz in Sekunden finden"],
      ["Ruhige Orte", "Ruhige Spots entdecken"],
      ["Cafés", "Orte zum Arbeiten"],
      ["Events", "Live-Events in der Nähe"],
      ["Meldungen", "Echtzeit von Menschen"],
    ],
    aiTitle: "Frag die Stadt.",
    aiText: "Dein smarter Assistent für Echtzeit-Antworten.",
    prompts: ["Wo kann ich heute arbeiten?", "Ist Kadıköy gerade voll?", "Ruhiges Café in der Nähe?", "Welche Route ist ruhiger?"],
    eventsTitle: "Verpasse nicht, was passiert.",
    eventsText: "Konzerte, Festivals, Matches und mehr. Live auf der Karte.",
    eventNames: [
      ["Sommerfestival", "Maçka Park", "Heute 18:00", "LIVE"],
      ["Beşiktaş Match Day", "Tüpraş Stadium", "Morgen 20:00", "Morgen"],
      ["Jazz Night", "Kadıköy Sahne", "Heute 21:00", "LIVE"],
      ["Street Food Fest", "Moda Coast", "Dieses Wochenende", "Weekend"],
    ],
    businessTitle: "Wachse mit SEVORA.",
    businessText: "Erreiche mehr Menschen zur richtigen Zeit am richtigen Ort.",
    business: [
      ["Kampagnen veröffentlichen", "Lokale Kunden erreichen"],
      ["Live-Dichte zeigen", "Kunden informieren"],
      ["Sichtbarkeit steigern", "Auf der Karte auffallen"],
      ["Mehr Kunden gewinnen", "Besucherfrequenz erhöhen"],
    ],
    finalTitle: "Erlebe die Stadt live als einer der Ersten.",
    finalText: "Trage dich in die Early-Access-Liste ein und gestalte SEVORA mit.",
    email: "E-Mail-Adresse",
    join: "Early Access sichern",
  },
};

const langs: Lang[] = ["en", "tr", "de"];
const statIcons = [UsersRound, Trees, ParkingCircle, Star];
const dailyIcons = [Car, ParkingCircle, Trees, Coffee, CalendarDays, MessageCircle];
const businessIcons = [Navigation, Bell, Rocket, Zap];

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
  const [active, setActive] = useState("home");
  const t = useMemo(() => copy[lang], [lang]);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const sections = document.querySelectorAll("section[id]");
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible"));
    }, { threshold: 0.13 });
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id));
    }, { rootMargin: "-45% 0px -45% 0px" });

    reveals.forEach((item) => revealObserver.observe(item));
    sections.forEach((item) => sectionObserver.observe(item));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const dock = [
    ["home", "Home"],
    ["pulse", "Pulse"],
    ["life", "Daily Life"],
    ["ai", "AI Assistant"],
    ["events", "Events"],
    ["business", "Businesses"],
    ["about", "About"],
    ["waitlist", "Early Access"],
  ];

  return (
    <main className="page">
      <section className="hero" id="home">
        <div className="heroShade" />

        <header className="header">
          <a className="brand" href="#home">
            <LogoMark large />
            <span>
              <strong>SEVORA</strong>
              <small>FEEL THE CITY LIVE</small>
            </span>
          </a>

          <nav className="topNav">
            <a href="#pulse">{t.nav[0]}</a>
            <a href="#life">{t.nav[1]}</a>
            <a href="#business">{t.nav[2]}</a>
            <a href="#about">{t.nav[3]}</a>
            <a className="navButton" href="#waitlist">{t.nav[4]}</a>
          </nav>

          <div className="language">
            {langs.map((item) => (
              <button key={item} type="button" onClick={() => setLang(item)} className={lang === item ? "active" : ""}>
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        <aside className="dock">
          <div className="homeBubble">⌂</div>
          {dock.map((item, index) => (
            <a key={item[0]} href={`#${item[0]}`} className={active === item[0] ? "active" : ""}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i />
              {item[1]}
            </a>
          ))}
        </aside>

        <div className="heroGrid">
          <div className="heroCopy reveal visible">
            <p className="kicker"><i /> {t.heroTag}</p>
            <h1>
              {t.heroA}
              <br />
              <em>{t.heroB}</em>
            </h1>
            <p className="lead">{t.heroText}</p>
            <div className="heroActions">
              <a href="#pulse" className="primaryButton">{t.cta}<span>→</span></a>
              <a href="#ai" className="demoButton">{t.demo}<span>▷</span></a>
            </div>
          </div>

          <div className="cityStage">
            <CityModel />
          </div>
        </div>

        <section className="stats reveal visible" id="pulse">
          {t.stats.map((stat, index) => {
            const Icon = statIcons[index];
            return (
              <article className={`stat stat${index + 1}`} key={stat[0]}>
                <div className="icon"><Icon size={23} /></div>
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

      <section className="daily reveal" id="life">
        <p className="sectionKicker">Daily Life</p>
        <h2>{t.dailyTitle}</h2>
        <div className="dailyGrid">
          {t.daily.map((card, index) => {
            const Icon = dailyIcons[index];
            return (
              <article className="dailyCard" key={card[0]}>
                <div><Icon size={28} /></div>
                <h3>{card[0]}</h3>
                <p>{card[1]}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="ai reveal" id="ai">
        <div className="aiCopy">
          <p className="sectionKicker">AI Assistant</p>
          <h2>{t.aiTitle}</h2>
          <span>{t.aiText}</span>
          <div className="promptRow">
            {t.prompts.map((prompt) => <button type="button" key={prompt}>{prompt}</button>)}
          </div>
        </div>
        <div className="aiVisual">
          <AIOrb />
        </div>
      </section>

      <section className="events reveal" id="events">
        <div className="eventsIntro">
          <p className="redKicker">Live Events</p>
          <h2>{t.eventsTitle}</h2>
          <span>{t.eventsText}</span>
          <a href="#waitlist">See All Events →</a>
        </div>
        <div className="eventGrid">
          {t.eventNames.map((event, index) => (
            <article className={`eventCard event${index + 1}`} key={event[0]}>
              <div className="eventArt">
                <Sparkles size={46} />
                <span />
              </div>
              <div className="eventInfo">
                <b>{event[3]}</b>
                <h3>{event[0]}</h3>
                <p>⌖ {event[1]}</p>
                <p>◷ {event[2]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="business reveal" id="business">
        <div className="businessIntro">
          <p className="sectionKicker">For Businesses</p>
          <h2>{t.businessTitle}</h2>
          <span>{t.businessText}</span>
          <a href="#waitlist">Learn More</a>
        </div>
        <div className="businessGrid">
          {t.business.map((item, index) => {
            const Icon = businessIcons[index];
            return (
              <article key={item[0]}>
                <div><Icon size={26} /></div>
                <h3>{item[0]}</h3>
                <p>{item[1]}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="final reveal" id="waitlist">
        <LogoMark large />
        <div className="finalText">
          <h2>{t.finalTitle}</h2>
          <p>{t.finalText}</p>
        </div>
        <form>
          <input type="email" placeholder={t.email} />
          <button type="button">{t.join}<span>→</span></button>
          <small>● 2.4K people already joined</small>
        </form>
      </section>

      <section id="about" className="aboutAnchor" />
      <a className="backTop" href="#home">↑</a>
    </main>
  );
}
