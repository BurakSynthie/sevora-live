"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Brain,
  Building2,
  DatabaseZap,
  Eye,
  Layers3,
  RadioTower,
  Rocket,
  ShieldCheck,
  Zap,
} from "lucide-react";

const metrics = [
  {
    label: "Signals processed",
    base: 2480,
    suffix: "+",
    icon: RadioTower,
  },
  {
    label: "Places analyzed",
    base: 184,
    suffix: "",
    icon: Building2,
  },
  {
    label: "Prediction confidence",
    base: 91,
    suffix: "%",
    icon: Brain,
  },
  {
    label: "Demo city zones",
    base: 12,
    suffix: "",
    icon: Layers3,
  },
];

const buildStatus = [
  {
    title: "3D City Engine",
    status: "Active",
    text: "Buildings, roads, zones, vehicles, park and event areas are rendered as a living 3D preview.",
    icon: Layers3,
    progress: 78,
  },
  {
    title: "AI Layer",
    status: "In progress",
    text: "Demo questions, calm-place suggestions and city recommendations are being shaped.",
    icon: Brain,
    progress: 54,
  },
  {
    title: "Live Data System",
    status: "Coming soon",
    text: "Public APIs, user reports and business signals will be connected after the preview build.",
    icon: DatabaseZap,
    progress: 32,
  },
  {
    title: "Business Portal",
    status: "Planned",
    text: "Local businesses will publish campaigns, density updates and availability signals.",
    icon: Rocket,
    progress: 26,
  },
];

const pulseRows = [
  ["Crowd Density", "62%", "Moderate"],
  ["Traffic Flow", "74%", "Moving"],
  ["Calm Index", "88%", "Good"],
  ["Event Activity", "31%", "Rising"],
];

export default function PreviewDashboard() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTick((value) => value + 1);
    }, 1400);

    return () => window.clearInterval(interval);
  }, []);

  const liveMetrics = useMemo(() => {
    return metrics.map((metric, index) => {
      const movement = Math.floor(Math.sin((tick + index) * 0.9) * 8 + 10);
      return {
        ...metric,
        value: metric.base + movement,
      };
    });
  }, [tick]);

  return (
    <section className="previewDashboardSection reveal" id="preview-dashboard">
      <div className="previewHeader">
        <p className="sectionKicker">PRIVATE PREVIEW</p>
        <h2>SEVORA is not launched yet. It is being built live.</h2>
        <span>
          Until the full product is ready, this page works as a premium preview
          environment: visitors can understand the vision, explore the 3D city
          and see what is coming next.
        </span>
      </div>

      <div className="previewMetricGrid">
        {liveMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article className="previewMetric" key={metric.label}>
              <div className="previewMetricIcon">
                <Icon size={24} />
              </div>

              <strong>
                {metric.value.toLocaleString("en-US")}
                {metric.suffix}
              </strong>

              <p>{metric.label}</p>
            </article>
          );
        })}
      </div>

      <div className="dashboardGrid">
        <div className="buildStatusPanel">
          <div className="panelTitle">
            <ShieldCheck size={20} />
            <strong>Build status</strong>
          </div>

          {buildStatus.map((item) => {
            const Icon = item.icon;

            return (
              <article className="buildStatusItem" key={item.title}>
                <div className="buildIcon">
                  <Icon size={22} />
                </div>

                <div>
                  <div className="buildTop">
                    <h3>{item.title}</h3>
                    <span>{item.status}</span>
                  </div>

                  <p>{item.text}</p>

                  <div className="progressTrack">
                    <i style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="cityAnalysisPanel">
          <div className="panelTitle">
            <Activity size={20} />
            <strong>City analysis preview</strong>
          </div>

          <div className="analysisOrb">
            <div className="analysisRing ringA" />
            <div className="analysisRing ringB" />
            <div className="analysisRing ringC" />
            <Eye size={42} />
          </div>

          <div className="pulseRows">
            {pulseRows.map((row, index) => (
              <div className="pulseRow" key={row[0]}>
                <span>{row[0]}</span>
                <b>{row[1]}</b>
                <small>{row[2]}</small>
                <i style={{ width: row[1] }} />
              </div>
            ))}
          </div>

          <div className="aiNotice">
            <Zap size={17} />
            SEVORA is learning how the city moves before launch.
          </div>
        </div>
      </div>
    </section>
  );
}
