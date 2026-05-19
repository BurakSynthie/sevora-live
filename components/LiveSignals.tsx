"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Car,
  Coffee,
  MapPin,
  ParkingCircle,
  RadioTower,
  Trees,
  UsersRound,
} from "lucide-react";

type Signal = {
  id: number;
  icon: "event" | "cafe" | "parking" | "park" | "crowd" | "traffic";
  title: string;
  area: string;
  value: string;
  tone: string;
};

const signals: Signal[] = [
  {
    id: 1,
    icon: "event",
    title: "Event detected",
    area: "Kadıköy Stage",
    value: "LIVE",
    tone: "#a855f7",
  },
  {
    id: 2,
    icon: "cafe",
    title: "Quiet café found",
    area: "Moda Coast",
    value: "91/100",
    tone: "#f59e0b",
  },
  {
    id: 3,
    icon: "parking",
    title: "Parking signal",
    area: "Beşiktaş",
    value: "6 min",
    tone: "#38bdf8",
  },
  {
    id: 4,
    icon: "park",
    title: "Calm park area",
    area: "Maçka Park",
    value: "Low noise",
    tone: "#22c55e",
  },
  {
    id: 5,
    icon: "crowd",
    title: "Crowd rising",
    area: "City Center",
    value: "82%",
    tone: "#fb7185",
  },
  {
    id: 6,
    icon: "traffic",
    title: "Route pressure",
    area: "Main Avenue",
    value: "Medium",
    tone: "#60a5fa",
  },
];

function SignalIcon({ type }: { type: Signal["icon"] }) {
  const size = 22;

  if (type === "event") return <CalendarDays size={size} />;
  if (type === "cafe") return <Coffee size={size} />;
  if (type === "parking") return <ParkingCircle size={size} />;
  if (type === "park") return <Trees size={size} />;
  if (type === "crowd") return <UsersRound size={size} />;
  return <Car size={size} />;
}

export default function LiveSignals() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % signals.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  const activeSignal = signals[activeIndex];

  const visibleSignals = useMemo(() => {
    return [
      signals[activeIndex],
      signals[(activeIndex + 1) % signals.length],
      signals[(activeIndex + 2) % signals.length],
    ];
  }, [activeIndex]);

  return (
    <section className="liveSignalsSection reveal" id="signals">
      <div className="liveSignalsIntro">
        <p className="sectionKicker">LIVE SIGNAL FEED</p>
        <h2>The city keeps talking.</h2>
        <span>
          SEVORA turns small city moments into useful signals: events, parking,
          calm places, cafés, crowd density and route pressure.
        </span>
      </div>

      <div className="liveSignalsGrid">
        <div className="signalRadar" style={{ ["--tone" as string]: activeSignal.tone }}>
          <div className="radarSweep" />
          <div className="radarCore">
            <RadioTower size={36} />
            <strong>Signal Engine</strong>
            <small>Scanning city activity</small>
          </div>

          {signals.map((signal, index) => (
            <span
              key={signal.id}
              className={`radarDot dot${index + 1} ${
                index === activeIndex ? "active" : ""
              }`}
              style={{ ["--dot" as string]: signal.tone }}
            />
          ))}
        </div>

        <div className="signalFeed">
          <div className="signalFeedHeader">
            <span />
            <strong>Live demo stream</strong>
          </div>

          {visibleSignals.map((signal, index) => (
            <article
              key={`${signal.id}-${activeIndex}`}
              className={`signalItem signalItem${index + 1}`}
              style={{ ["--tone" as string]: signal.tone }}
            >
              <div className="signalIcon">
                <SignalIcon type={signal.icon} />
              </div>

              <div>
                <h3>{signal.title}</h3>
                <p>
                  <MapPin size={14} />
                  {signal.area}
                </p>
              </div>

              <b>{signal.value}</b>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
