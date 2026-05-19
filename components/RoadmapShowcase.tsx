"use client";

import {
  Brain,
  Building2,
  DatabaseZap,
  Globe,
  Rocket,
  Sparkles,
} from "lucide-react";

const roadmap = [
  {
    year: "NOW",
    title: "Private Preview",
    icon: Sparkles,
    text:
      "Interactive 3D city, AI demos, live signal concepts and preview experience.",
  },
  {
    year: "PHASE 2",
    title: "AI Layer",
    icon: Brain,
    text:
      "Context-aware recommendations, calm place discovery and city intelligence.",
  },
  {
    year: "PHASE 3",
    title: "Live Data",
    icon: DatabaseZap,
    text:
      "Real-time events, parking availability, density indicators and public data.",
  },
  {
    year: "PHASE 4",
    title: "Business Network",
    icon: Building2,
    text:
      "Cafés, venues, restaurants and local businesses publishing live signals.",
  },
  {
    year: "FUTURE",
    title: "SEVORA City OS",
    icon: Globe,
    text:
      "A city-wide intelligence layer helping people understand movement, opportunities and activity.",
  },
];

export default function RoadmapShowcase() {
  return (
    <section className="roadmapSection reveal" id="roadmap">
      <div className="roadmapHeader">
        <p className="sectionKicker">ROADMAP</p>

        <h2>Building the future of city life.</h2>

        <span>
          SEVORA starts as a city assistant but evolves into a living city
          intelligence platform.
        </span>
      </div>

      <div className="roadmapTimeline">
        {roadmap.map((item, index) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className={`roadmapCard roadmapCard${index + 1}`}
            >
              <div className="roadmapIcon">
                <Icon size={26} />
              </div>

              <small>{item.year}</small>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              {index !== roadmap.length - 1 && (
                <div className="roadmapConnector" />
              )}
            </article>
          );
        })}
      </div>

      <div className="futureVision">
        <Rocket size={26} />

        <div>
          <strong>Long-term vision</strong>

          <p>
            We do not want another map.
            We want the city itself to speak.
          </p>
        </div>
      </div>
    </section>
  );
}
