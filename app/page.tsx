"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Building2,
  CalendarDays,
  Car,
  Coffee,
  MapPin,
  ParkingCircle,
  Rocket,
  Sparkles,
  Star,
  Trees,
  UsersRound,
  Zap,
} from "lucide-react";

import CityDashboardHero from "../components/CityDashboardHero";
import LiveSignals from "../components/LiveSignals";
import AskCityPanel from "../components/AskCityPanel";
import PreviewDashboard from "../components/PreviewDashboard";
import RoadmapShowcase from "../components/RoadmapShowcase";
import SiteFooter from "../components/SiteFooter";

type Lang = "en" | "tr" | "de";

const copy = {
  en: {
    nav: ["Preview", "Signals", "AI", "Business", "Roadmap", "Early Access"],
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
  const t = useMemo(() => copy[lang], [lang]);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (entry) => entry.isIntersecting && entry.target.classList.add("visible")
        );
      },
      { threshold: 0.12 }
    );

    reveals.forEach((item) => revealObserver.observe(item));

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return (
    <main className="page">
      <div className="language hybridLanguage">
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

      <CityDashboardHero lang={lang} />

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
          <a href="#waitlist">Business Preview →</a>
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

      <SiteFooter />

      <a className="backTop" href="#home">
        ↑
      </a>
    </main>
  );
}
