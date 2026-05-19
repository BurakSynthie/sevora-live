"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BrainCircuit,
  ChevronRight,
  Crosshair,
  MapPin,
  MousePointer2,
  Route,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";

const questions = [
  "Where can I work quietly tonight?",
  "Show me calm cafés near the city center",
  "Any live events happening right now?",
  "Find available parking nearby",
];

const answers = [
  {
    title: "3 quiet cafés found",
    confidence: "94%",
    route: "Best route: Moda Coast → Quiet Café Street",
    places: [
      "Moda Workspace • Calm Score 94",
      "Nook Coffee • Calm Score 91",
      "Blue Desk Café • Calm Score 88",
    ],
  },
  {
    title: "2 calm parks available",
    confidence: "89%",
    route: "Best route: Main Avenue → Green Pocket",
    places: ["Maçka Park • Low Noise", "Freedom Park • Low Density"],
  },
  {
    title: "Live event detected",
    confidence: "96%",
    route: "Best route: Event Zone → Crowd Safe Path",
    places: ["Festival Area • Active", "Music Stage • Crowd Rising"],
  },
  {
    title: "Parking signal found",
    confidence: "87%",
    route: "Best route: Parking Node B → 6 min walk",
    places: ["Blue Parking • 6 min", "Side Street Lot • 9 min"],
  },
];

const thinkingSteps = [
  "Reading city pulse...",
  "Checking crowd density...",
  "Scanning calm places...",
  "Matching route signals...",
  "Preparing recommendation...",
];

export default function AskCityPanel() {
  const [question, setQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [burst, setBurst] = useState(false);
  const coreRef = useRef<HTMLDivElement | null>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 26 }, (_, index) => ({
      id: index,
      x: Math.sin(index * 1.7) * (70 + (index % 5) * 18),
      y: Math.cos(index * 1.3) * (62 + (index % 4) * 16),
      delay: `${index * 0.08}s`,
    }));
  }, []);

  useEffect(() => {
    const rotate = window.setInterval(() => {
      setLoading(true);
      setStep(0);

      const stepTimer = window.setInterval(() => {
        setStep((current) => (current + 1) % thinkingSteps.length);
      }, 420);

      window.setTimeout(() => {
        window.clearInterval(stepTimer);
        setQuestion((prev) => (prev + 1) % questions.length);
        setLoading(false);
      }, 1700);
    }, 5600);

    return () => window.clearInterval(rotate);
  }, []);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const target = coreRef.current;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    target.style.setProperty("--mx", `${x * 0.04}px`);
    target.style.setProperty("--my", `${y * 0.04}px`);
  }

  function handleCoreClick() {
    setBurst(true);
    window.setTimeout(() => setBurst(false), 720);
  }

  const currentAnswer = answers[question % answers.length];

  return (
    <section className="askCitySection reveal" id="ask-city">
      <div className="askCityHeader">
        <span className="sectionKicker">ASK THE CITY</span>
        <h2>Meet SEVORA AI Core.</h2>
        <p>
          This is not a static chatbot area. The AI core reads city signals,
          follows your cursor and reacts like a living city intelligence layer.
        </p>
      </div>

      <div className="askCityContainer askCityContainerV2">
        <div
          className={`askCityLeft aiCoreShell ${burst ? "burst" : ""}`}
          onMouseMove={handleMouseMove}
          onClick={handleCoreClick}
          ref={coreRef}
        >
          <div className="aiOrbit orbitOne" />
          <div className="aiOrbit orbitTwo" />
          <div className="aiOrbit orbitThree" />

          {particles.map((particle) => (
            <span
              key={particle.id}
              className="aiParticle"
              style={{
                ["--px" as string]: `${particle.x}px`,
                ["--py" as string]: `${particle.y}px`,
                ["--delay" as string]: particle.delay,
              }}
            />
          ))}

          <div className="aiCoreLive">
            <div className="aiCoreGlow" />
            <BrainCircuit size={54} />
            <strong>SEVORA CORE</strong>
            <small>Click / move mouse</small>
          </div>

          <div className="aiStatusPill aiStatusOne">
            <Zap size={14} />
            Live reasoning
          </div>

          <div className="aiStatusPill aiStatusTwo">
            <Crosshair size={14} />
            Signal lock
          </div>

          <div className="aiStatusPill aiStatusThree">
            <MousePointer2 size={14} />
            Cursor reactive
          </div>
        </div>

        <div className="askCityRight askCityRightV2">
          <div className="questionBox">
            <Search size={18} />
            <span>{questions[question]}</span>
            <ChevronRight size={16} />
          </div>

          <div className="answerBox answerBoxV2">
            {loading ? (
              <div className="analyzingV2">
                <Sparkles size={18} />
                <div>
                  <strong>{thinkingSteps[step]}</strong>
                  <span />
                </div>
              </div>
            ) : (
              <>
                <div className="answerTop">
                  <div>
                    <h3>{currentAnswer.title}</h3>
                    <p>
                      <Route size={15} />
                      {currentAnswer.route}
                    </p>
                  </div>

                  <b>{currentAnswer.confidence}</b>
                </div>

                {currentAnswer.places.map((place, index) => (
                  <div className="placeItem" key={place}>
                    <MapPin size={16} />
                    <span>{place}</span>
                    <small>#{index + 1}</small>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="aiMiniConsole">
            <span>AI signal stream</span>
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
