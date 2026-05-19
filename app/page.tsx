const liveZones = [
  { name: "North District", status: "Calm", value: "28%", className: "zone zone-a" },
  { name: "Central Flow", status: "Busy", value: "82%", className: "zone zone-b" },
  { name: "Harbor Line", status: "Live", value: "64%", className: "zone zone-c" },
  { name: "Quiet Block", status: "Work Friendly", value: "41%", className: "zone zone-d" },
];

const intelligence = [
  "Weather-aware suggestions",
  "Crowd density reports",
  "Quiet place radar",
  "Live user signals",
  "AI city recommendations",
];

const reports = [
  "Queue is low near the east line",
  "Central area is getting crowded",
  "Best quiet workspace is 6 min away",
];

export default function Home() {
  return (
    <main className="site">
      <section className="hero">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="noise" />

        <header className="topbar">
          <a className="brand" href="#">
            <span className="brand-icon">S</span>
            <span>
              <strong>SEVORA</strong>
              <small>Live City Intelligence</small>
            </span>
          </a>

          <nav className="desktop-nav">
            <a href="#pulse">Pulse</a>
            <a href="#ai">AI</a>
            <a href="#waitlist">Early Access</a>
          </nav>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> sevora.live is now forming
            </p>

            <h1>
              Feel the city <em>before</em> you move.
            </h1>

            <p className="lead">
              SEVORA is a real-time city life assistant. It reads live city
              signals, quiet zones, crowd density and local reports to help you
              decide where to go next.
            </p>

            <div className="hero-actions">
              <a href="#waitlist" className="button primary">
                Join early access
              </a>
              <a href="#pulse" className="button ghost">
                Explore city pulse
              </a>
            </div>

            <div className="signal-strip">
              <span>Live pulse</span>
              <span>Quiet radar</span>
              <span>AI routes</span>
            </div>
          </div>

          <div className="city-stage" id="pulse" aria-label="SEVORA futuristic 3D city map">
            <div className="city-perspective">
              <div className="city-grid">
                <div className="road road-one" />
                <div className="road road-two" />
                <div className="road road-three" />
                <div className="road road-four" />

                {Array.from({ length: 38 }).map((_, index) => (
                  <span
                    key={index}
                    className={`building b-${(index % 10) + 1}`}
                  />
                ))}

                {liveZones.map((zone) => (
                  <div className={zone.className} key={zone.name}>
                    <span className="zone-pulse" />
                    <strong>{zone.name}</strong>
                    <small>{zone.status}</small>
                    <b>{zone.value}</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="hud-card hud-main">
              <small>City Pulse</small>
              <strong>Live density map</strong>
              <p>Demo signal engine active</p>
            </div>

            <div className="hud-card hud-weather">
              <small>Mode</small>
              <strong>Night / Social</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="section-heading">
          <p>Not just a map</p>
          <h2>A living layer over the city.</h2>
        </div>

        <div className="intelligence-grid">
          {intelligence.map((item) => (
            <article className="intelligence-card" key={item}>
              <span />
              <h3>{item}</h3>
              <p>
                SEVORA combines public APIs, user reports, business signals and
                AI predictions into one city intelligence experience.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-section" id="ai">
        <div className="ai-orb">
          <span>S</span>
        </div>

        <div className="ai-copy">
          <p>SEVORA AI</p>
          <h2>Ask the city what makes sense right now.</h2>
          <div className="report-stack">
            {reports.map((report) => (
              <div className="report" key={report}>
                “{report}”
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="waitlist" id="waitlist">
        <p>Early Access</p>
        <h2>Be one of the first to enter SEVORA.</h2>
        <form>
          <input type="email" placeholder="Email address" />
          <button type="button">Join waitlist</button>
        </form>
      </section>
    </main>
  );
}
