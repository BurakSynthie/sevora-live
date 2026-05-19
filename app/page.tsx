"use client";

import { useMemo, useState } from "react";

type Lang = "en" | "tr" | "de";

const copy = {
  en: {
    navPulse: "Pulse",
    navLife: "Daily Life",
    navBusiness: "Businesses",
    navWaitlist: "Early Access",
    heroKicker: "Live city intelligence",
    heroTitle: "Feel the city live.",
    heroLead: "See crowds, quiet places, events, parking signals and local reports before you move.",
    primary: "Join Early Access",
    secondary: "Explore the Pulse",
    heroNotes: ["Crowd density", "Quiet places", "Live events", "AI suggestions"],
    pulseTitle: "A living 3D layer over the city.",
    pulseLead: "Buildings rise, roads glow, events pulse and live signals move across the city like a living system.",
    zones: [["Quiet Zone", "Work friendly", "28%"], ["Event Area", "Festival active", "Live"], ["Busy Center", "Crowd rising", "82%"], ["Parking Signal", "Space found", "6 min"]],
    lifeTitle: "Know before you go.",
    lifeLead: "SEVORA is designed for everyday decisions: where to go, when to leave, where to park and which place feels right now.",
    lifeItems: [["Crowds", "See how busy a district feels before you arrive."], ["Quiet places", "Find calm cafés, parks and work-friendly spots."], ["Events", "Discover concerts, festivals, matches and local activity."], ["Parking", "Follow community and business signals for parking chances."], ["Queues", "Avoid long waiting lines with live reports."], ["AI advice", "Ask what makes sense based on time, weather and mood."]],
    aiTitle: "Ask the city.",
    aiLead: "The AI layer combines public APIs, user reports, business signals and prediction logic to answer practical questions.",
    aiPrompts: ["Where should I work today?", "Is the center crowded right now?", "Any calm café nearby?", "Which route feels less busy?"],
    businessTitle: "Businesses become part of the city pulse.",
    businessLead: "Local businesses can publish campaigns, show live availability and reach nearby users at the right moment.",
    businessItems: ["Publish campaigns", "Show live density", "Get discovered nearby", "Attract the right customers"],
    languagesTitle: "Built global from day one.",
    languagesLead: "SEVORA starts with English, Turkish and German. More languages can be added without changing the core experience.",
    finalTitle: "Enter SEVORA early.",
    finalLead: "Join the first access list and follow the city before the city moves.",
    email: "Email address",
    join: "Join waitlist",
  },
  tr: {
    navPulse: "Pulse",
    navLife: "Günlük Hayat",
    navBusiness: "İşletmeler",
    navWaitlist: "Erken Erişim",
    heroKicker: "Canlı şehir zekâsı",
    heroTitle: "Şehrin nabzını hisset.",
    heroLead: "Kalabalığı, sakin yerleri, etkinlikleri, park sinyallerini ve yerel bildirimleri yola çıkmadan önce gör.",
    primary: "Erken Erişime Katıl",
    secondary: "Pulse’ı Keşfet",
    heroNotes: ["Yoğunluk", "Sakin yerler", "Canlı etkinlikler", "AI önerileri"],
    pulseTitle: "Şehrin üzerinde yaşayan 3D bir katman.",
    pulseLead: "Binalar yükselir, yollar parlar, etkinlikler pulse atar ve canlı sinyaller şehir üzerinde hareket eder.",
    zones: [["Sakin Bölge", "Çalışmaya uygun", "28%"], ["Etkinlik Alanı", "Festival aktif", "Canlı"], ["Yoğun Merkez", "Kalabalık artıyor", "82%"], ["Park Sinyali", "Yer bulundu", "6 dk"]],
    lifeTitle: "Gitmeden önce bil.",
    lifeLead: "SEVORA günlük kararlar için tasarlanır: nereye gidilir, ne zaman çıkılır, nereye park edilir ve şu an hangi yer mantıklı?",
    lifeItems: [["Kalabalık", "Bir bölgenin ne kadar yoğun olduğunu gitmeden gör."], ["Sakin yerler", "Sessiz kafeleri, parkları ve çalışmaya uygun noktaları bul."], ["Etkinlikler", "Konserleri, festivalleri, maç günlerini ve yerel hareketi keşfet."], ["Park", "Topluluk ve işletme sinyalleriyle park ihtimalini takip et."], ["Sıra", "Canlı bildirimlerle uzun bekleme kuyruklarından kaçın."], ["AI tavsiyesi", "Saat, hava durumu ve moda göre ne mantıklı sor."]],
    aiTitle: "Şehre sor.",
    aiLead: "AI katmanı açık API verilerini, kullanıcı bildirimlerini, işletme sinyallerini ve tahmin mantığını birleştirerek pratik cevaplar üretir.",
    aiPrompts: ["Bugün nerede çalışılır?", "Merkez şu an kalabalık mı?", "Yakında sakin kafe var mı?", "Hangi rota daha rahat?"],
    businessTitle: "İşletmeler şehir pulse sisteminin parçası olur.",
    businessLead: "Yerel işletmeler kampanya yayınlayabilir, anlık müsaitlik gösterebilir ve yakındaki kullanıcılara doğru anda ulaşabilir.",
    businessItems: ["Kampanya yayınla", "Canlı yoğunluk göster", "Yakında keşfedil", "Doğru müşteriyi çek"],
    languagesTitle: "İlk günden global kuruldu.",
    languagesLead: "SEVORA İngilizce, Türkçe ve Almanca ile başlar. Sonrasında diğer diller temel deneyimi bozmadan eklenebilir.",
    finalTitle: "SEVORA’ya erken gir.",
    finalLead: "İlk erişim listesine katıl ve şehir hareket etmeden önce şehri takip et.",
    email: "E-posta adresin",
    join: "Bekleme listesine katıl",
  },
  de: {
    navPulse: "Pulse",
    navLife: "Alltag",
    navBusiness: "Unternehmen",
    navWaitlist: "Early Access",
    heroKicker: "Live City Intelligence",
    heroTitle: "Erlebe den Puls der Stadt.",
    heroLead: "Sieh Menschenmengen, ruhige Orte, Events, Parksignale und lokale Meldungen, bevor du losgehst.",
    primary: "Early Access sichern",
    secondary: "Pulse entdecken",
    heroNotes: ["Dichte", "Ruhige Orte", "Live-Events", "KI-Empfehlungen"],
    pulseTitle: "Eine lebendige 3D-Ebene über der Stadt.",
    pulseLead: "Gebäude steigen auf, Straßen leuchten, Events pulsieren und Live-Signale bewegen sich über die Stadt.",
    zones: [["Ruhige Zone", "Ideal zum Arbeiten", "28%"], ["Eventbereich", "Festival aktiv", "Live"], ["Volles Zentrum", "Dichte steigt", "82%"], ["Park-Signal", "Platz gefunden", "6 Min"]],
    lifeTitle: "Wissen, bevor du gehst.",
    lifeLead: "SEVORA hilft bei täglichen Entscheidungen: wohin gehen, wann losfahren, wo parken und welcher Ort gerade passt.",
    lifeItems: [["Menschenmengen", "Sieh, wie voll ein Bereich ist, bevor du ankommst."], ["Ruhige Orte", "Finde Cafés, Parks und Orte zum Arbeiten."], ["Events", "Entdecke Konzerte, Festivals, Spieltage und lokale Aktivität."], ["Parken", "Nutze Community- und Business-Signale für Parkchancen."], ["Warteschlangen", "Vermeide lange Wartezeiten mit Live-Meldungen."], ["KI-Rat", "Frag nach Zeit, Wetter und Stimmung, was gerade sinnvoll ist."]],
    aiTitle: "Frag die Stadt.",
    aiLead: "Die KI-Ebene kombiniert öffentliche APIs, Nutzerberichte, Business-Signale und Vorhersagen für praktische Antworten.",
    aiPrompts: ["Wo kann ich heute arbeiten?", "Ist das Zentrum gerade voll?", "Gibt es ein ruhiges Café in der Nähe?", "Welche Route ist entspannter?"],
    businessTitle: "Unternehmen werden Teil des City Pulse.",
    businessLead: "Lokale Unternehmen können Angebote veröffentlichen, Verfügbarkeit zeigen und Nutzer in der Nähe erreichen.",
    businessItems: ["Angebote veröffentlichen", "Live-Dichte zeigen", "In der Nähe entdeckt werden", "Passende Kunden gewinnen"],
    languagesTitle: "Global gedacht ab Tag eins.",
    languagesLead: "SEVORA startet mit Englisch, Türkisch und Deutsch. Weitere Sprachen können später ergänzt werden.",
    finalTitle: "Betritt SEVORA früh.",
    finalLead: "Trage dich in die Early-Access-Liste ein und folge der Stadt, bevor sie sich bewegt.",
    email: "E-Mail-Adresse",
    join: "Warteliste beitreten",
  },
};

const langs: Lang[] = ["en", "tr", "de"];

function CityScene({ t, compact = false }: { t: typeof copy.en; compact?: boolean }) {
  return (
    <div className={`cityScene ${compact ? "compactCity" : ""}`} aria-label="SEVORA 3D city">
      <div className="cityCamera">
        <div className="cityBase">
          <div className="river" />
          <div className="avenue avenueA" />
          <div className="avenue avenueB" />
          <div className="avenue avenueC" />
          <div className="avenue avenueD" />
          <div className="lightTrail trailOne" />
          <div className="lightTrail trailTwo" />
          <div className="lightTrail trailThree" />

          {Array.from({ length: 72 }).map((_, index) => (
            <span key={index} className={`tower tower-${(index % 18) + 1}`}>
              <i />
            </span>
          ))}

          <div className="eventZone">
            <span className="confetti c1" />
            <span className="confetti c2" />
            <span className="confetti c3" />
            <span className="confetti c4" />
            <span className="confetti c5" />
            <strong>EVENT</strong>
          </div>

          {t.zones.map((zone, index) => (
            <div className={`zone zone${index + 1}`} key={zone[0]}>
              <span className="zonePulse" />
              <b>{zone[0]}</b>
              <small>{zone[1]}</small>
              <em>{zone[2]}</em>
            </div>
          ))}
        </div>
      </div>

      <div className="sceneBadge topBadge">
        <small>3D City Layer</small>
        <strong>Live demo pulse</strong>
      </div>
      <div className="sceneBadge bottomBadge">
        <small>SEVORA Engine</small>
        <strong>AI + Reports + Business Signals</strong>
      </div>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => copy[lang], [lang]);

  return (
    <main className="page">
      <section className="hero sectionReveal" id="top">
        <div className="skyGlow skyOne" />
        <div className="skyGlow skyTwo" />
        <div className="grain" />

        <header className="header">
          <a href="#top" className="brand">
            <img src="/sevora-logo.png" alt="SEVORA logo" />
            <span>
              <strong>SEVORA</strong>
              <small>sevora.live</small>
            </span>
          </a>

          <nav className="nav">
            <a href="#pulse">{t.navPulse}</a>
            <a href="#life">{t.navLife}</a>
            <a href="#business">{t.navBusiness}</a>
            <a href="#waitlist">{t.navWaitlist}</a>
          </nav>

          <div className="langSwitch" aria-label="Language selector">
            {langs.map((item) => (
              <button key={item} onClick={() => setLang(item)} className={lang === item ? "active" : ""} type="button">
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        <div className="heroContent">
          <div className="heroCopy">
            <p className="kicker"><span /> {t.heroKicker}</p>
            <h1>{t.heroTitle}</h1>
            <p className="lead">{t.heroLead}</p>

            <div className="actions">
              <a href="#waitlist" className="btn primaryBtn">{t.primary}</a>
              <a href="#pulse" className="btn secondaryBtn">{t.secondary}</a>
            </div>

            <div className="miniSignals">
              {t.heroNotes.map((note) => <span key={note}>{note}</span>)}
            </div>
          </div>

          <CityScene t={t} />
        </div>
      </section>

      <section className="pulseSection sectionReveal" id="pulse">
        <div className="sectionIntro">
          <p>01 / CITY PULSE</p>
          <h2>{t.pulseTitle}</h2>
          <span>{t.pulseLead}</span>
        </div>
        <div className="wideCity">
          <CityScene t={t} compact />
        </div>
      </section>

      <section className="lifeSection sectionReveal" id="life">
        <div className="sectionIntro left">
          <p>02 / DAILY LIFE</p>
          <h2>{t.lifeTitle}</h2>
          <span>{t.lifeLead}</span>
        </div>

        <div className="lifeGrid">
          {t.lifeItems.map((item, index) => (
            <article className="lifeCard" key={item[0]}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <h3>{item[0]}</h3>
              <p>{item[1]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="aiSection sectionReveal">
        <div className="aiOrb"><img src="/sevora-logo.png" alt="" /></div>
        <div className="aiText">
          <p>03 / SEVORA AI</p>
          <h2>{t.aiTitle}</h2>
          <span>{t.aiLead}</span>
          <div className="promptList">
            {t.aiPrompts.map((prompt) => <div key={prompt}>“{prompt}”</div>)}
          </div>
        </div>
      </section>

      <section className="businessSection sectionReveal" id="business">
        <div className="businessVisual">
          <div className="businessRing" />
          <div className="businessPin cafe">CAFE</div>
          <div className="businessPin food">FOOD</div>
          <div className="businessPin wash">CAR WASH</div>
          <div className="businessPin gym">GYM</div>
        </div>

        <div className="businessText">
          <p>04 / BUSINESS</p>
          <h2>{t.businessTitle}</h2>
          <span>{t.businessLead}</span>
          <div className="businessItems">
            {t.businessItems.map((item) => <strong key={item}>{item}</strong>)}
          </div>
        </div>
      </section>

      <section className="languageSection sectionReveal">
        <p>05 / LANGUAGE</p>
        <h2>{t.languagesTitle}</h2>
        <span>{t.languagesLead}</span>
        <div className="languageCards">
          <button type="button" onClick={() => setLang("en")}>🇬🇧 English</button>
          <button type="button" onClick={() => setLang("tr")}>🇹🇷 Türkçe</button>
          <button type="button" onClick={() => setLang("de")}>🇩🇪 Deutsch</button>
        </div>
      </section>

      <section className="finalSection sectionReveal" id="waitlist">
        <img src="/sevora-logo.png" alt="SEVORA" />
        <h2>{t.finalTitle}</h2>
        <p>{t.finalLead}</p>
        <form>
          <input type="email" placeholder={t.email} />
          <button type="button">{t.join}</button>
        </form>
      </section>

      <a href="#top" className="backTop" aria-label="Back to top">↑</a>
    </main>
  );
}
