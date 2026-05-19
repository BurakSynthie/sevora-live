"use client";

import { useEffect, useState } from "react";
import { Brain, Sparkles, Search, MapPin } from "lucide-react";

const questions = [
  "Where can I work quietly tonight?",
  "Show me calm cafés near the city center",
  "Any live events happening right now?",
  "Find available parking nearby",
];

const answers = [
  {
    title: "3 quiet cafés found",
    places: [
      "Moda Workspace • Calm Score 94",
      "Nook Coffee • Calm Score 91",
      "Blue Desk Café • Calm Score 88",
    ],
  },
  {
    title: "2 calm parks available",
    places: [
      "Maçka Park • Low Noise",
      "Freedom Park • Low Density",
    ],
  },
  {
    title: "Live event detected",
    places: [
      "Festival Area • Active",
      "Music Stage • Crowd Rising",
    ],
  },
];

export default function AskCityPanel() {
  const [question, setQuestion] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rotate = setInterval(() => {
      setLoading(true);

      setTimeout(() => {
        setQuestion((prev) => (prev + 1) % questions.length);
        setLoading(false);
      }, 1200);
    }, 5000);

    return () => clearInterval(rotate);
  }, []);

  return (
    <section className="askCitySection reveal" id="ask-city">
      <div className="askCityHeader">
        <span className="sectionKicker">ASK THE CITY</span>
        <h2>Let the city answer.</h2>
        <p>
          SEVORA combines signals, places and activity patterns
          to guide people through everyday decisions.
        </p>
      </div>

      <div className="askCityContainer">
        <div className="askCityLeft">
          <div className="aiCore">
            <div className="aiRing ring1" />
            <div className="aiRing ring2" />
            <div className="aiRing ring3" />

            <div className="aiCenter">
              <Brain size={42} />
            </div>
          </div>
        </div>

        <div className="askCityRight">
          <div className="questionBox">
            <Search size={18} />
            <span>{questions[question]}</span>
          </div>

          <div className="answerBox">
            {loading ? (
              <div className="analyzing">
                <Sparkles size={18} />
                Analyzing city pulse...
              </div>
            ) : (
              <>
                <h3>{answers[question % answers.length].title}</h3>

                {answers[question % answers.length].places.map(
                  (place, index) => (
                    <div className="placeItem" key={index}>
                      <MapPin size={16} />
                      {place}
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
