"use client";

import { useMemo, useRef, useState } from "react";

type Lang = "en" | "tr" | "de";

type CitySignal = {
  id: string;
  title: string;
  area: string;
  value: string;
  type: string;
  tone: string;
  x: number;
  y: number;
  detail: string;
  recommend: string;
};

const signals: CitySignal[] = [
  {
    id: "galata",
    title: "GALATA",
    area: "Historic Area",
    value: "Live 68%",
    type: "Culture",
    tone: "#7c3aed",
    x: 24,
    y: 18,
    detail: "Tourist movement is increasing around the historic area.",
    recommend: "SEVORA suggests checking nearby calm cafés before moving.",
  },
  {
    id: "taksim",
    title: "TAKSIM SQUARE",
    area: "Crowded",
    value: "82%",
    type: "Crowd",
    tone: "#fb3f70",
    x: 40,
    y: 25,
    detail: "High people flow detected. Density is rising quickly.",
    recommend: "Try alternative calm routes or delay your visit.",
  },
  {
    id: "concert",
    title: "CONCERT HALL",
    area: "Event Live",
    value: "Tonight 20:00",
    type: "Event",
    tone: "#a855f7",
    x: 57,
    y: 22,
    detail: "Live event area is active. Traffic and crowd signals are rising.",
    recommend: "Arrive early or use SEVORA parking suggestions.",
  },
  {
    id: "nisantasi",
    title: "NİŞANTAŞI",
    area: "Shopping Area",
    value: "Live 74%",
    type: "Shopping",
    tone: "#22d3ee",
    x: 73,
    y: 25,
    detail: "Shopping activity is active with moderate walking density.",
    recommend: "Good time to visit, but cafés may be busy.",
  },
  {
    id: "park",
    title: "YILDIZ PARK",
    area: "Calm Zone",
    value: "28%",
    type: "Park",
    tone: "#22c55e",
    x: 21,
    y: 50,
    detail: "Low density green area. Calm score is high.",
    recommend: "Best calm zone for a short break.",
  },
  {
    id: "cafe",
    title: "CAFE STREET",
    area: "Work Friendly",
    value: "12 spots",
    type: "Cafe",
    tone: "#f59e0b",
    x: 41,
    y: 55,
    detail: "Multiple work-friendly cafés detected with good calm score.",
    recommend: "SEVORA recommends this area for working quietly.",
  },
  {
    id: "business",
    title: "BUSINESS CORE",
    area: "Busy",
    value: "87%",
    type: "Business",
    tone: "#fb7185",
    x: 62,
    y: 59,
    detail: "Business density is high. Active signals show people flow and traffic.",
    recommend: "Visit later or use nearby calm-zone recommendation.",
  },
  {
    id: "parking",
    title: "PARKING HUB",
    area: "Open 67",
    value: "6 min",
    type: "Parking",
    tone: "#38bdf8",
    x: 80,
    y: 70,
    detail: "Parking availability signal detected nearby.",
    recommend: "Estimated walking distance: 6 minutes.",
  },
];

const labels = {
  en: {
    search: "Search location...",
    liveMap: "Live Map",
    aiCore: "AI Core",
    cityPulse: "City Pulse",
    events: "Events",
    places: "Places",
    business: "Business",
    roadmap: "Roadmap",
    feedback: "Feedback",
    weather: "22°C",
    city: "Istanbul",
    condition: "Clear Sky",
    insight: "Live Insight",
    density: "Live Density",
    activeSignals: "Active Signals",
    recommendation: "AI Recommendation",
    details: "View Details",
    pulseTitle: "TODAY'S CITY PULSE",
    calmTitle: "BEST CALM ZONE",
    eventTitle: "EVENT ALERT",
    aiTitle: "AI RECOMMENDATION",
    airTitle: "AIR QUALITY",
    premium: "Premium",
    soon: "Soon",
  },
  tr: {
    search: "Konum ara...",
    liveMap: "Canlı Harita",
    aiCore: "AI Core",
    cityPulse: "City Pulse",
    events: "Etkinlikler",
    places: "Yerler",
    business: "İşletme",
    roadmap: "Roadmap",
    feedback: "Geri Bildirim",
    weather: "22°C",
    city: "İstanbul",
    condition: "Açık Gökyüzü",
    insight: "Canlı Analiz",
    density: "Canlı Yoğunluk",
    activeSignals: "Aktif Sinyaller",
    recommendation: "AI Önerisi",
    details: "Detayları Gör",
    pulseTitle: "BUGÜNÜN ŞEHİR PULSE'I",
    calmTitle: "EN SAKİN BÖLGE",
    eventTitle: "ETKİNLİK UYARISI",
    aiTitle: "AI ÖNERİSİ",
    airTitle: "HAVA KALİTESİ",
    premium: "Premium",
    soon: "Yakında",
  },
  de: {
    search: "Standort suchen...",
    liveMap: "Live Map",
    aiCore: "AI Core",
    cityPulse: "City Pulse",
    events: "Events",
    places: "Places",
    business: "Business",
    roadmap: "Roadmap",
    feedback: "Feedback",
    weather: "22°C",
    city: "Istanbul",
    condition: "Clear Sky",
    insight: "Live Insight",
    density: "Live Density",
    activeSignals: "Active Signals",
    recommendation: "AI Recommendation",
    details: "View Details",
    pulseTitle: "TODAY'S CITY PULSE",
    calmTitle: "BEST CALM ZONE",
    eventTitle: "EVENT ALERT",
    aiTitle: "AI RECOMMENDATION",
    airTitle: "AIR QUALITY",
    premium: "Premium",
    soon: "Soon",
  },
};

function SevoraLogo() {
  return (
    <div className="hybridLogo">
      <span>S</span>
    </div>
  );
}

export default function CityDashboardHero({ lang = "en" }: { lang?: Lang }) {
  const t = labels[lang];
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(signals[6]);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, px: 0, py: 0 });

  const activeSignals = useMemo(
    () => [
      ["People Flow", "High", "#fb3f70"],
      ["Traffic", "High", "#fb7185"],
      ["Noise", "Moderate", "#f59e0b"],
      ["Parking", "Available", "#22c55e"],
    ],
    []
  );

  function resetView() {
    setZoom(1);
    setPos({ x: 0, y: 0 });
  }

  function startDrag(event: React.MouseEvent<HTMLDivElement>) {
    setDragging(true);
    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
      px: pos.x,
      py: pos.y,
    };
  }

  function onDrag(event: React.MouseEvent<HTMLDivElement>) {
    if (!dragging) return;
    const dx = event.clientX - dragStart.current.x;
    const dy = event.clientY - dragStart.current.y;
    setPos({
      x: dragStart.current.px + dx,
      y: dragStart.current.py + dy,
    });
  }

  function stopDrag() {
    setDragging(false);
  }

  function onWheel(event: React.WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    const next = zoom + (event.deltaY > 0 ? -0.08 : 0.08);
    setZoom(Math.min(1.65, Math.max(0.82, Number(next.toFixed(2)))));
  }

  return (
    <section className="hybridHero" id="home">
      <div className="hybridTopbar">
        <a className="hybridBrand" href="#home">
          <SevoraLogo />
          <div>
            <strong>SEVORA</strong>
            <span>Live the city smarter.</span>
          </div>
        </a>

        <div className="hybridSearch">
          <input placeholder={t.search} />
          <button type="button">⌕</button>
        </div>

        <div className="hybridWeather">
          <span>☾</span>
          <strong>{t.weather}</strong>
          <div>
            <b>{t.city}</b>
            <small>{t.condition}</small>
          </div>
        </div>

        <div className="hybridTime">
          <strong>21:42</strong>
          <small>May 20, 2026</small>
        </div>

        <button className="hybridBell" type="button">⌁</button>
      </div>

      <div className="hybridSidebar">
        {[
          [t.liveMap, "⌾"],
          [t.aiCore, "✧"],
          [t.cityPulse, "◷"],
          [t.events, "▣"],
          [t.places, "⌖"],
          [t.business, "▤"],
          [t.roadmap, "◇"],
          [t.feedback, "✉"],
        ].map((item, index) => (
          <a className={index === 0 ? "active" : ""} href={index === 0 ? "#home" : "#preview-dashboard"} key={item[0]}>
            <i>{item[1]}</i>
            {item[0]}
          </a>
        ))}

        <div className="hybridPremium">
          <b>♕</b>
          <strong>{t.premium}</strong>
          <span>{t.soon}</span>
        </div>
      </div>

      <div
        className={`hybridMapViewport ${dragging ? "dragging" : ""}`}
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onWheel={onWheel}
      >
        <div
          className="hybridMapLayer"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`,
          }}
        >
          <img src="/assets/city-dashboard-bg.png" alt="SEVORA city dashboard" draggable={false} />

          {signals.map((signal) => (
            <button
              key={signal.id}
              className={`mapSignalCard ${active.id === signal.id ? "active" : ""}`}
              style={{
                left: `${signal.x}%`,
                top: `${signal.y}%`,
                ["--tone" as string]: signal.tone,
              }}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActive(signal);
              }}
            >
              <span>{signal.type}</span>
              <b>{signal.title}</b>
              <small>{signal.area}</small>
              <strong>{signal.value}</strong>
            </button>
          ))}

          {signals.map((signal) => (
            <span
              key={`${signal.id}-pin`}
              className="mapPulsePin"
              style={{
                left: `${signal.x}%`,
                top: `calc(${signal.y}% + 76px)`,
                ["--tone" as string]: signal.tone,
              }}
            />
          ))}
        </div>
      </div>

      <aside className="hybridInsight">
        <div className="insightTop">
          <span>{t.insight}</span>
          <button type="button">×</button>
        </div>

        <h2>{active.title}</h2>
        <p>{active.detail}</p>

        <div className="densityBox" style={{ ["--tone" as string]: active.tone }}>
          <div>
            <strong>{active.value}</strong>
            <span>{active.area}</span>
          </div>
          <i />
        </div>

        <h3>{t.activeSignals}</h3>
        <div className="insightSignalList">
          {activeSignals.map((item) => (
            <div key={item[0]}>
              <span style={{ ["--dot" as string]: item[2] }} />
              <b>{item[0]}</b>
              <strong style={{ color: item[2] }}>{item[1]}</strong>
            </div>
          ))}
        </div>

        <h3>{t.recommendation}</h3>
        <p className="aiReco">✦ {active.recommend}</p>

        <button className="insightButton" type="button">
          {t.details}
          <span>→</span>
        </button>

        <div className="insightPreviewImage" />
      </aside>

      <div className="hybridMapTools">
        <button type="button" onClick={() => setZoom((value) => Math.min(1.65, value + 0.1))}>+</button>
        <button type="button" onClick={() => setZoom((value) => Math.max(0.82, value - 0.1))}>−</button>
        <button type="button" onClick={resetView}>⌂</button>
      </div>

      <div className="hybridBottomCards">
        <article>
          <span>{t.pulseTitle}</span>
          <strong>78%</strong>
          <small>Overall City Vibe</small>
          <i className="miniWave" />
        </article>

        <article>
          <span>{t.calmTitle}</span>
          <strong>Yıldız Park</strong>
          <small>28% Calm</small>
          <div className="miniPhoto park" />
        </article>

        <article>
          <span>{t.eventTitle}</span>
          <strong>Live Concert</strong>
          <small>Kadıköy Stage • 20:00</small>
          <div className="miniPhoto event" />
        </article>

        <article>
          <span>{t.aiTitle}</span>
          <strong>Cafe Street</strong>
          <small>12 work-friendly spots</small>
          <div className="miniPhoto cafe" />
        </article>

        <article>
          <span>{t.airTitle}</span>
          <strong>Good</strong>
          <small>AQI 32</small>
          <i className="airRing" />
        </article>
      </div>
    </section>
  );
}
