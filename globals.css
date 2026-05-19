const citySignals = [
  { title: "Kadıköy", status: "Sakin", value: "32%", tone: "calm" },
  { title: "Beşiktaş", status: "Yoğun", value: "78%", tone: "busy" },
  { title: "Karaköy", status: "Canlı", value: "61%", tone: "live" },
];

const features = [
  "Canlı şehir yoğunluğu",
  "Sakin mekan radarı",
  "AI destekli öneriler",
  "Anlık kullanıcı bildirimleri",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050914] text-white">
      <section className="relative min-h-screen px-5 py-6 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(34,211,238,.28),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,.22),transparent_28%),radial-gradient(circle_at_50%_95%,rgba(14,165,233,.18),transparent_34%)]" />
        <div className="absolute inset-0 opacity-[0.08] grid-pattern" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="logo-mark">
              <span>S</span>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.34em]">SEVORA</p>
              <p className="text-[10px] uppercase tracking-[0.26em] text-cyan-200/60">
                City Pulse AI
              </p>
            </div>
          </div>
          <a href="#waitlist" className="nav-cta">
            Erken erişim
          </a>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 pt-16 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:pt-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,.16)]">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,.95)]" />
              sevora.live yakında açılıyor
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              Şehrin nabzını{" "}
              <span className="text-gradient">canlı hisset.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              SEVORA; sakin mekanları, yoğun bölgeleri, anlık kullanıcı
              bildirimlerini ve AI önerilerini tek ekranda toplayan gerçek
              zamanlı şehir yaşam asistanı.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#waitlist" className="primary-button">
                Bekleme listesine katıl
              </a>
              <a href="#pulse" className="secondary-button">
                Pulse haritasını gör
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {features.map((feature) => (
                <div key={feature} className="mini-card">
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div id="pulse" className="relative">
            <div className="phone-shell">
              <div className="phone-top">
                <div>
                  <p className="text-xs text-slate-400">Live City Pulse</p>
                  <h2 className="text-xl font-semibold">İstanbul</h2>
                </div>
                <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
                  AI aktif
                </div>
              </div>

              <div className="map-card">
                <div className="pulse-ring ring-one" />
                <div className="pulse-ring ring-two" />
                <div className="pulse-ring ring-three" />
                <div className="city-line line-one" />
                <div className="city-line line-two" />
                <div className="city-line line-three" />
                <div className="floating-pin pin-one">Sakin</div>
                <div className="floating-pin pin-two">Yoğun</div>
                <div className="floating-pin pin-three">Canlı</div>
              </div>

              <div className="mt-4 space-y-3">
                {citySignals.map((signal) => (
                  <div key={signal.title} className={`signal-card ${signal.tone}`}>
                    <div>
                      <p className="font-medium">{signal.title}</p>
                      <p className="text-xs text-slate-400">{signal.status}</p>
                    </div>
                    <span>{signal.value}</span>
                  </div>
                ))}
              </div>

              <div className="ai-card">
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">
                  SEVORA AI
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  “Şu an Kadıköy sahil daha sakin. Çalışmak için Moda tarafı
                  öneriliyor.”
                </p>
              </div>
            </div>
          </div>
        </div>

        <section id="waitlist" className="relative z-10 mx-auto mt-20 max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 text-center shadow-[0_30px_120px_rgba(15,23,42,.55)] backdrop-blur-2xl sm:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">
            Early Access
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            SEVORA ilk kullanıcılarını bekliyor.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            İlk sürümde canlı şehir pulse, sakin mekan radarı, mood modları ve
            AI öneri sistemi yer alacak.
          </p>
          <form className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="E-posta adresin"
              className="email-input"
            />
            <button className="primary-button whitespace-nowrap" type="button">
              Katıl
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
