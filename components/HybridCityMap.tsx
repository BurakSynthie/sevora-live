"use client";

import { useRef, useState } from "react";

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
};

const signals: CitySignal[] = [
  {
    id: "taksim",
    title: "Taksim",
    area: "Crowd rising",
    value: "82%",
    type: "Crowd",
    tone: "#fb3f70",
    x: 37,
    y: 30,
    detail: "High people flow detected. Alternative calm routes suggested.",
  },
  {
    id: "event",
    title: "Event Plaza",
    area: "Live event",
    value: "20:00",
    type: "Event",
    tone: "#a855f7",
    x: 58,
    y: 28,
    detail: "Live event area is active. Parking and crowd signals rising.",
  },
  {
    id: "park",
    title: "Yıldız Park",
    area: "Calm zone",
    value: "28%",
    type: "Park",
    tone: "#22c55e",
    x: 24,
    y: 58,
    detail: "Low density green area. Best calm zone recommendation.",
  },
  {
    id: "cafe",
    title: "Cafe Street",
    area: "Work friendly",
    value: "12 spots",
    type: "Cafe",
    tone: "#f59e0b",
    x: 48,
    y: 62,
    detail: "Work-friendly cafés detected with strong calm score.",
  },
  {
    id: "business",
    title: "Business Core",
    area: "Busy",
    value: "87%",
    type: "Business",
    tone: "#38bdf8",
    x: 70,
    y: 55,
    detail: "Business district active. Traffic and density signals are high.",
  },
  {
    id: "parking",
    title: "Parking Hub",
    area: "Available",
    value: "6 min",
    type: "Parking",
    tone: "#60a5fa",
    x: 77,
    y: 72,
    detail: "Parking availability signal detected nearby.",
  },
];

export default function HybridCityMap() {
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(signals[0]);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, px: 0, py: 0 });

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
    setZoom(Math.min(1.6, Math.max(0.86, Number(next.toFixed(2)))));
  }

  function resetView() {
    setZoom(1);
    setPos({ x: 0, y: 0 });
  }

  return (
    <div className="hybridMapEmbed">
      <div className="hybridMapHeader">
        <div>
          <span>SEVORA LIVE MAP</span>
          <strong>{active.title}</strong>
        </div>

        <div className="hybridMapHeaderActions">
          <button type="button" onClick={() => setZoom((v) => Math.min(1.6, v + 0.1))}>
            +
          </button>
          <button type="button" onClick={() => setZoom((v) => Math.max(0.86, v - 0.1))}>
            −
          </button>
          <button type="button" onClick={resetView}>
            Reset
          </button>
        </div>
      </div>

      <div
        className={`hybridMapCanvas ${dragging ? "dragging" : ""}`}
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onWheel={onWheel}
      >
        <div
          className="hybridMapInner"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`,
          }}
        >
          <img src="/assets/city-dashboard-bg.png" alt="SEVORA live city map" draggable={false} />

          {signals.map((signal) => (
            <button
              key={signal.id}
              type="button"
              className={`hybridPinCard ${active.id === signal.id ? "active" : ""}`}
              style={{
                left: `${signal.x}%`,
                top: `${signal.y}%`,
                ["--tone" as string]: signal.tone,
              }}
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
            <i
              key={`${signal.id}-pulse`}
              className="hybridPulse"
              style={{
                left: `${signal.x}%`,
                top: `calc(${signal.y}% + 70px)`,
                ["--tone" as string]: signal.tone,
              }}
            />
          ))}
        </div>
      </div>

      <aside className="hybridMapInsight" style={{ ["--tone" as string]: active.tone }}>
        <span>Live Insight</span>
        <h3>{active.title}</h3>
        <p>{active.detail}</p>

        <div>
          <strong>{active.value}</strong>
          <small>{active.area}</small>
        </div>
      </aside>
    </div>
  );
}
