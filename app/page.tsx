"use client";

import { useEffect, useState } from "react";
import WaitlistForm from "../components/WaitlistForm";

type Lang = "tr" | "en";

const sections = [
  "home",
  "experience",
  "moods",
  "rooms",
  "flow",
  "connection",
  "safety",
  "preview",
  "legal",
  "waitlist",
];

const copy = {
  tr: {
    nav: {
      home: "Giriş",
      experience: "Deneyim",
      moods: "Modlar",
      rooms: "Odalar",
      flow: "Akış",
      connection: "Bağlantı",
      safety: "Güvenlik",
      preview: "Plan",
      legal: "Politikalar",
      waitlist: "Erken erişim",
      menu: "Menü",
    },
    hero: {
      eyebrow: "SEVORA PRIVATE PREVIEW",
      title: "Bazen konuşacak birini bulmak zor olur.",
      text:
        "Sevora, o anki ruh haline göre seni kısa, güvenli ve anonim sohbet odalarına yönlendirir. Profil kasmadan, takip etmeden, sonsuz akışta kaybolmadan sadece birkaç dakikalık gerçek insan teması.",
      primary: "Erken erişime katıl",
      secondary: "Deneyimi gör",
      note: "10 dakikalık odalar · anonim takma adlar · karşılıklı onayla bağlantı",
    },
    app: {
      title: "Sevora uygulamasında ne göreceksin?",
      subtitle: "Gerçek ürün akışı",
      profile: "Senin profilin",
      nickname: "Mavi Bulut",
      status: "Anonim · Private Preview",
      selectedMood: "Canım sıkıldı",
      roomFound: "3 uygun oda bulundu",
      join: "Katıl",
      timer: "10:00",
      room: "Kafa Dağıtma Odası",
      roomMeta: "3 kişi içeride · yazışmalı · 10 dk",
      msg1: "Bugün sadece kafam dağılsın istiyorum.",
      msg2: "O zaman ağır konu yok. Saçma bir soru: penguenle kahve mi, kaplumbağayla yolculuk mu?",
      vote: "10 dakika daha uzatalım mı?",
      yes: "Evet",
      no: "Hayır",
      good: "Bu kişi bana iyi geldi",
      safe: "Karşılıklı seçilirse güvenli bağlantı açılır.",
      steps: ["Mod", "Odalar", "Sohbet", "Bağlantı"],
    },
    experience: {
      title: "Sevora’ya girince ne olacak?",
      text:
        "Sevora’yı klasik bir sohbet sitesi gibi düşünme. Kullanıcı önce nasıl hissettiğini seçer. Sistem ona uygun odaları gösterir. Odaya girince 10 dakikalık kısa bir sohbet başlar. Süre bittiğinde sohbet zorla devam etmez. Herkes isterse uzar, biri istemezse kapanır.",
      cards: [
        ["1", "Modunu seç", "Yalnız, sıkılmış, konuşmak isteyen veya sadece sessiz kalmak isteyen biri olarak başlarsın."],
        ["2", "Uygun odaları gör", "Sevora seçtiğin moda göre sana farklı oda türleri gösterir."],
        ["3", "10 dakika kal", "Kısa süreli, kontrollü ve anonim bir sohbet deneyimi yaşarsın."],
        ["4", "İyi gelirse devam eder", "Bir kişi sana iyi gelirse sadece karşılıklı onayla bağlantı açılır."],
      ],
    },
    moods: {
      title: "Modlar sadece buton değil; deneyimi değiştirir.",
      text:
        "Sevora’da seçtiğin mod, hangi insanlarla ve hangi oda türleriyle karşılaşacağını belirler. Amaç herkesi aynı yere doldurmak değil; benzer beklentiye sahip insanları aynı odada buluşturmak.",
      list: [
        {
          name: "Yalnızım",
          detail:
            "Bu modda Sevora seni daha yumuşak, yargılamayan ve kısa dertleşme odalarına yönlendirir. Burada amaç büyük çözümler bulmak değil; birkaç dakika birinin gerçekten orada olduğunu hissetmektir.",
          rooms: "Dertleşme Odası · Gece Sohbeti · Sessiz Oda",
        },
        {
          name: "Canım sıkıldı",
          detail:
            "Bu mod ağır konuşmalardan çok kafa dağıtan odaları öne çıkarır. Mini sorular, absürt seçimler, kısa oyunlar ve gündelik sohbetler burada daha fazla görünür.",
          rooms: "Kafa Dağıtma · Eğlence Odası · Mini Soru Odası",
        },
        {
          name: "Dertleşmek istiyorum",
          detail:
            "Bu modda odanın beklentisi daha nettir: anlatmak, dinlemek, sakin cevap vermek. Sevora burada hızlı tüketilen sohbet yerine daha dikkatli bir konuşma alanı sunar.",
          rooms: "Dertleşme Odası · Dinleme Odası · Gece Sohbeti",
        },
        {
          name: "Kafamı dağıtmak istiyorum",
          detail:
            "Bu modda sistem seni daha hafif konuların olduğu odalara taşır. Amaç seni saatlerce içeride tutmak değil, birkaç dakika nefes aldırmaktır.",
          rooms: "Kafa Dağıtma · Absürt Sohbet · Hafif Konular",
        },
        {
          name: "Sadece konuşmak istiyorum",
          detail:
            "Ne çok dertli ne çok eğlenceli. Sadece biriyle kısa, doğal ve gündelik bir sohbet etmek isteyenler için dengeli odalar önerilir.",
          rooms: "Gündelik Sohbet · Kısa Mola · Ortak Masa",
        },
        {
          name: "Eğlenmek istiyorum",
          detail:
            "Burada sohbet daha oyunlu ve hareketlidir. Sistem kısa sorular, tercih oyunları ve küçük görevlerle insanları konuşturur.",
          rooms: "Eğlence Odası · Mini Oyun · Seç Bakalım",
        },
        {
          name: "Sessiz kalmak istiyorum",
          detail:
            "Konuşmak zorunda değilsin. Bu modda insanlar aynı odada olabilir, küçük emoji ya da kısa hazır ifadelerle varlığını hissettirebilir.",
          rooms: "Sessiz Oda · Beraber Susalım · Sakin Alan",
        },
      ],
    },
    rooms: {
      title: "Her oda farklı bir ruh hali için tasarlanır.",
      text:
        "Oda isimleri sadece kategori değil; içeriğin, sürenin ve beklentinin de sınırını belirler. Böylece kullanıcı nereye girdiğini bilir.",
      cards: [
        ["Dertleşme Odası", "İçini dökmek veya birini yargılanmadan dinlemek isteyenler için."],
        ["Kafa Dağıtma Odası", "Gündelik, hafif ve eğlenceli konuşmalar için."],
        ["Sessiz Oda", "Konuşmadan da yalnız olmadığını hissetmek isteyenler için."],
        ["Eğlence Odası", "Mini oyunlar, absürt sorular ve kısa aktiviteler için."],
        ["Gece Sohbeti", "Gece saatlerinde daha sakin ve yavaş konuşmak isteyenler için."],
        ["Dinleme Odası", "Bazen cevap değil, sadece dinlenmek isteyenler için."],
      ],
    },
    flow: {
      title: "Sohbet sonsuza kadar açık kalmaz.",
      text:
        "Sevora’nın en önemli farkı süre sınırıdır. Oda 10 dakika sürer. İyi gidiyorsa biri uzatma oylaması başlatabilir. Herkes evet derse 10 dakika daha devam eder. Bir kişi bile istemezse oda kapanır.",
      rules: [
        "Başlangıç süresi: 10 dakika",
        "Uzatma: herkes evet derse +10 dakika",
        "Bir kişi hayır derse oda kapanır",
        "Maksimum süre: 40 dakika",
      ],
    },
    connection: {
      title: "İki kişi birbirine iyi gelirse yol kapanmaz.",
      text:
        "Her şeyi yasaklamak güzel arkadaşlıkların önünü kapatır. Bu yüzden Sevora’da bağlantı sistemi kontrollüdür. Oda sonunda kullanıcılar isterse 'bu kişi bana iyi geldi' seçimi yapar. İki kişi birbirini seçerse özel bağlantı alanı açılır.",
      steps: [
        "Oda biter",
        "İyi gelen kişi seçilir",
        "Karşılıklı eşleşme olursa",
        "24 saatlik güvenli bağlantı açılır",
        "İki taraf isterse arkadaşlık kalıcı olur",
      ],
    },
    safety: {
      title: "Anonim ama başıboş değil.",
      text:
        "Sevora’da anonimlik kötüye kullanım için değil, kullanıcıyı rahatlatmak için vardır. O yüzden odalarda çıkış, şikayet, engelleme ve kişisel bilgi koruması en baştan düşünülür.",
      cards: [
        ["Şikayet et", "Rahatsız edici davranışlar hızlıca bildirilebilir."],
        ["Engelle", "Bir kişiyi görmek istemiyorsan bağlantı kesilir."],
        ["Odadan çık", "Hiçbir kullanıcı odada kalmaya zorlanmaz."],
        ["Kişisel bilgi koruması", "Telefon, adres ve baskıcı sosyal medya isteme davranışları sınırlandırılır."],
      ],
      note:
        "Sevora profesyonel psikolojik destek veya acil yardım hizmeti değildir. Amacı, kısa ve güvenli insan teması sağlamaktır.",
    },
    preview: {
      title: "Sevora adım adım açılacak.",
      text:
        "Şu an sevora.live bir private preview ve erken erişim alanı. İlk kullanıcılar bekleme listesi üzerinden toplanacak. Sonra mod seçimi, oda listesi ve gerçek zamanlı sohbet sistemi sırayla açılacak.",
      roadmap: [
        ["Şu an", "Tanıtım sayfası ve erken erişim formu yayında."],
        ["Sıradaki", "Mod seçimi ve oda öneri ekranı hazırlanacak."],
        ["Sonra", "10 dakikalık yazışmalı anonim odalar açılacak."],
        ["Devamında", "Uzatma oylaması ve güvenli bağlantı sistemi eklenecek."],
      ],
    },
    legal: {
      title: "Politikalar ve topluluk yapısı",
      text:
        "Sevora insanların kendini daha rahat hissetmesi için kuruluyor. Bu yüzden gizlilik, kullanım şartları ve topluluk kuralları en baştan ürünün parçası olacak.",
      cards: [
        ["Gizlilik Politikası", "Kullanıcı verilerinin nasıl saklandığı ve hangi amaçla kullanıldığı açıkça anlatılacak."],
        ["Kullanım Şartları", "Platformun hangi koşullarda kullanılabileceği net şekilde yazılacak."],
        ["Topluluk Kuralları", "Rahatsız edici davranışlar, kişisel bilgi baskısı ve kötüye kullanım sınırlandırılacak."],
        ["İletişim", "Kullanıcılar geri bildirim, şikayet veya iş birliği için ulaşabilecek."],
      ],
    },
    waitlist: {
      title: "Sevora ilk kullanıcılarını bekliyor.",
      text:
        "İlk sürüm hazır olduğunda erken erişim listesine katılan kullanıcılar Sevora’yı ilk deneyen kişiler arasında olacak.",
    },
    footer: "© 2026 Sevora. All rights reserved.",
  },
  en: {
    nav: {
      home: "Home",
      experience: "Experience",
      moods: "Moods",
      rooms: "Rooms",
      flow: "Flow",
      connection: "Connection",
      safety: "Safety",
      preview: "Plan",
      legal: "Policies",
      waitlist: "Early access",
      menu: "Menu",
    },
    hero: {
      eyebrow: "SEVORA PRIVATE PREVIEW",
      title: "Sometimes it is hard to find someone to talk to.",
      text:
        "Sevora guides you into short, safe and anonymous rooms based on how you feel. No profile building, no followers, no endless feed. Just a few minutes of real human contact.",
      primary: "Join early access",
      secondary: "See the experience",
      note: "10-minute rooms · anonymous nicknames · mutual consent connections",
    },
    app: {
      title: "What will you see inside Sevora?",
      subtitle: "Real product flow",
      profile: "Your profile",
      nickname: "Blue Cloud",
      status: "Anonymous · Private Preview",
      selectedMood: "I am bored",
      roomFound: "3 matching rooms found",
      join: "Join",
      timer: "10:00",
      room: "Distraction Room",
      roomMeta: "3 people inside · text-based · 10 min",
      msg1: "I just want to distract myself today.",
      msg2: "Then no heavy topics. Silly question: coffee with a penguin or a trip with a turtle?",
      vote: "Extend for 10 more minutes?",
      yes: "Yes",
      no: "No",
      good: "This person felt good",
      safe: "If both choose each other, a safe connection opens.",
      steps: ["Mood", "Rooms", "Chat", "Connection"],
    },
    experience: {
      title: "What happens when you enter Sevora?",
      text:
        "Sevora is not a classic chat site. First, you choose how you feel. Then you see rooms that match that mood. A room starts for 10 minutes. It does not force you to stay. If everyone wants, it continues. If one person does not, it closes.",
      cards: [
        ["1", "Choose your mood", "Start as someone feeling lonely, bored, talkative or quiet."],
        ["2", "See matching rooms", "Sevora shows different room types based on your mood."],
        ["3", "Stay for 10 minutes", "You experience a short, controlled and anonymous conversation."],
        ["4", "Continue only if it feels good", "If someone feels good to you, connection opens only with mutual consent."],
      ],
    },
    moods: {
      title: "Moods are not just buttons; they shape the experience.",
      text:
        "The mood you choose changes which people and room types you see. The goal is not to put everyone in the same place, but to match people with similar expectations.",
      list: [
        {
          name: "I feel lonely",
          detail:
            "This mood points you to softer, non-judgmental rooms. The goal is not to solve everything, but to feel someone is there for a few minutes.",
          rooms: "Open Up Room · Night Chat · Quiet Room",
        },
        {
          name: "I am bored",
          detail:
            "This mood brings lighter rooms forward. Mini questions, absurd choices, short games and everyday conversations appear more often.",
          rooms: "Distraction Room · Fun Room · Mini Questions",
        },
        {
          name: "I want to open up",
          detail:
            "This mood creates clearer expectations: sharing, listening and responding calmly.",
          rooms: "Open Up Room · Listening Room · Night Chat",
        },
        {
          name: "I need a distraction",
          detail:
            "This mode moves you into lighter topics. The goal is not to keep you for hours, but to help you breathe for a few minutes.",
          rooms: "Distraction · Absurd Chat · Light Topics",
        },
        {
          name: "I just want to talk",
          detail:
            "Not too heavy, not too playful. Balanced rooms for a short, natural and everyday chat.",
          rooms: "Casual Chat · Short Pause · Shared Table",
        },
        {
          name: "I want to have fun",
          detail:
            "This is more playful. The system uses short questions, choice games and small prompts.",
          rooms: "Fun Room · Mini Game · Choose One",
        },
        {
          name: "I want to stay quiet",
          detail:
            "You do not have to talk. You can simply be in the same room and use tiny signals or short preset expressions.",
          rooms: "Quiet Room · Silent Together · Calm Space",
        },
      ],
    },
    rooms: {
      title: "Each room is designed for a different feeling.",
      text:
        "Room names are not just categories. They define the content, duration and expectation, so users know where they are entering.",
      cards: [
        ["Open Up Room", "For people who want to share or listen without judgment."],
        ["Distraction Room", "For light, everyday and fun conversations."],
        ["Quiet Room", "For people who want to feel less alone without talking."],
        ["Fun Room", "For mini games, absurd questions and short activities."],
        ["Night Chat", "For slower, calmer conversations at night."],
        ["Listening Room", "For moments when being heard matters more than getting answers."],
      ],
    },
    flow: {
      title: "The chat does not stay open forever.",
      text:
        "Sevora’s key difference is the time limit. A room lasts 10 minutes. If it goes well, someone can start an extension vote. If everyone says yes, it continues for 10 more minutes. If one person says no, it closes.",
      rules: [
        "Starting time: 10 minutes",
        "Extension: +10 minutes if everyone says yes",
        "One no closes the room",
        "Maximum time: 40 minutes",
      ],
    },
    connection: {
      title: "If two people feel good to each other, the path does not close.",
      text:
        "Banning everything would block meaningful friendships. That is why Sevora uses controlled connection. When the room ends, users can choose someone who felt good. If two people choose each other, a private connection opens.",
      steps: [
        "Room ends",
        "Someone felt good",
        "Mutual match happens",
        "24-hour safe connection opens",
        "Friendship can become permanent",
      ],
    },
    safety: {
      title: "Anonymous, but not uncontrolled.",
      text:
        "Anonymity in Sevora is designed to protect comfort, not to enable harm. Exit, report, block and personal information protection are part of the product from the beginning.",
      cards: [
        ["Report", "Harmful behavior can be reported quickly."],
        ["Block", "If you do not want to see someone, the connection ends."],
        ["Leave room", "Nobody is forced to stay in a room."],
        ["Personal info protection", "Phone, address and social media pressure are restricted."],
      ],
      note:
        "Sevora is not a professional psychological support or emergency service. It aims to create short and safe human contact.",
    },
    preview: {
      title: "Sevora will open step by step.",
      text:
        "Right now sevora.live is a private preview and early access page. First users will be collected through the waitlist. Then mood selection, room discovery and realtime chat will open step by step.",
      roadmap: [
        ["Now", "Preview page and early access form are live."],
        ["Next", "Mood selection and room recommendation screen will be built."],
        ["Then", "10-minute anonymous text rooms will open."],
        ["After", "Extension voting and safe connection will be added."],
      ],
    },
    legal: {
      title: "Policies and community structure",
      text:
        "Sevora is being built so people can feel safer. Privacy, terms and community guidelines will be part of the product from the beginning.",
      cards: [
        ["Privacy Policy", "How user data is stored and why it is used will be explained clearly."],
        ["Terms of Use", "The conditions for using the platform will be written clearly."],
        ["Community Guidelines", "Harassment, personal info pressure and abuse will be restricted."],
        ["Contact", "Users will be able to reach out for feedback, reports or partnerships."],
      ],
    },
    waitlist: {
      title: "Sevora is waiting for its first users.",
      text:
        "When the first version is ready, people on the early access list will be among the first to try Sevora.",
    },
    footer: "© 2026 Sevora. All rights reserved.",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("tr");
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState(1);
  const [demoStep, setDemoStep] = useState(0);

  const t = copy[lang];

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStep((step) => (step + 1) % 4);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleScroll() {
      let current = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= 180) {
          current = section;
        }
      }

      setActiveSection(current);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function goTo(id: string) {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const selectedMoodData = t.moods.list[selectedMood];

  return (
    <main className="sevora-page">
      <header className="top-nav">
        <button className="brand-mark" type="button" onClick={() => goTo("home")}>
          <span>S</span>
          SEVORA
        </button>

        <nav className="desktop-nav">
          <button onClick={() => goTo("experience")}>{t.nav.experience}</button>
          <button onClick={() => goTo("moods")}>{t.nav.moods}</button>
          <button onClick={() => goTo("rooms")}>{t.nav.rooms}</button>
          <button onClick={() => goTo("safety")}>{t.nav.safety}</button>
        </nav>

        <div className="nav-actions">
          <div className="lang-switch">
            <button className={lang === "tr" ? "active" : ""} onClick={() => setLang("tr")} type="button">
              TR
            </button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")} type="button">
              EN
            </button>
          </div>
          <button className="nav-cta" onClick={() => goTo("waitlist")} type="button">
            {t.nav.waitlist}
          </button>
        </div>
      </header>

      <aside className="section-rail">
        {sections.map((section) => (
          <button
            key={section}
            className={activeSection === section ? "active" : ""}
            onClick={() => goTo(section)}
            type="button"
          >
            <span />
            {t.nav[section as keyof typeof t.nav]}
          </button>
        ))}
      </aside>

      <section className="hero-section" id="home">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">{t.hero.eyebrow}</div>
            <h1>{t.hero.title}</h1>
            <p className="hero-text">{t.hero.text}</p>

            <div className="hero-actions">
              <button className="primary-button" onClick={() => goTo("waitlist")} type="button">
                {t.hero.primary}
              </button>
              <button className="secondary-button" onClick={() => goTo("experience")} type="button">
                {t.hero.secondary}
              </button>
            </div>

            <div className="trust-line">{t.hero.note}</div>
          </div>

          <div className="real-app-preview">
            <div className="preview-shell">
              <div className="preview-titlebar">
                <div>
                  <span>{t.app.subtitle}</span>
                  <strong>{t.app.title}</strong>
                </div>
                <div className="preview-live">
                  <i />
                  Live Preview
                </div>
              </div>

              <div className="preview-layout">
                <aside className="preview-sidebar">
                  <div className="preview-profile">
                    <div className="avatar-glow">S</div>
                    <div>
                      <strong>{t.app.nickname}</strong>
                      <span>{t.app.status}</span>
                    </div>
                  </div>

                  <div className="preview-step-list">
                    {t.app.steps.map((step, index) => (
                      <button
                        key={step}
                        type="button"
                        className={demoStep === index ? "active" : ""}
                        onClick={() => setDemoStep(index)}
                      >
                        <span>{index + 1}</span>
                        {step}
                      </button>
                    ))}
                  </div>
                </aside>

                <div className="preview-main">
                  <div className={`demo-panel ${demoStep === 0 ? "active" : ""}`}>
                    <h3>{lang === "tr" ? "Şu an nasıl hissediyorsun?" : "How do you feel right now?"}</h3>
                    <div className="demo-mood-grid">
                      {t.moods.list.slice(0, 4).map((mood, index) => (
                        <button
                          key={mood.name}
                          className={index === 1 ? "selected" : ""}
                          type="button"
                        >
                          {mood.name}
                        </button>
                      ))}
                    </div>
                    <div className="demo-info-card">
                      <strong>{t.app.selectedMood}</strong>
                      <p>{t.moods.list[1].detail}</p>
                    </div>
                  </div>

                  <div className={`demo-panel ${demoStep === 1 ? "active" : ""}`}>
                    <div className="demo-found">
                      <strong>{t.app.roomFound}</strong>
                      <span>{lang === "tr" ? "Moduna göre önerildi" : "Recommended by your mood"}</span>
                    </div>

                    {[t.app.room, lang === "tr" ? "Eğlence Odası" : "Fun Room", lang === "tr" ? "Gece Sohbeti" : "Night Chat"].map(
                      (room, index) => (
                        <div className="demo-room-row" key={room}>
                          <div>
                            <strong>{room}</strong>
                            <span>
                              {index + 1} {lang === "tr" ? "kişi bekliyor · 10 dk" : "waiting · 10 min"}
                            </span>
                          </div>
                          <button type="button">{t.app.join}</button>
                        </div>
                      )
                    )}
                  </div>

                  <div className={`demo-panel ${demoStep === 2 ? "active" : ""}`}>
                    <div className="chat-head">
                      <div>
                        <strong>{t.app.room}</strong>
                        <span>{t.app.roomMeta}</span>
                      </div>
                      <b>{t.app.timer}</b>
                    </div>

                    <div className="demo-message left">
                      <small>{t.app.nickname}</small>
                      <p>{t.app.msg1}</p>
                    </div>
                    <div className="demo-message right">
                      <small>{lang === "tr" ? "Sessiz Martı" : "Silent Gull"}</small>
                      <p>{t.app.msg2}</p>
                    </div>

                    <div className="demo-vote">
                      <strong>{t.app.vote}</strong>
                      <div>
                        <button type="button">{t.app.yes}</button>
                        <button type="button">{t.app.no}</button>
                      </div>
                    </div>
                  </div>

                  <div className={`demo-panel ${demoStep === 3 ? "active" : ""}`}>
                    <div className="connection-demo">
                      <div>
                        <span>{t.app.nickname}</span>
                        <small>{t.app.good}</small>
                      </div>
                      <b>↔</b>
                      <div>
                        <span>{lang === "tr" ? "Sessiz Martı" : "Silent Gull"}</span>
                        <small>{t.app.good}</small>
                      </div>
                    </div>
                    <div className="demo-info-card">
                      <strong>{lang === "tr" ? "Güvenli bağlantı hazır" : "Safe connection ready"}</strong>
                      <p>{t.app.safe}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="preview-bottom-status">
                <span>{lang === "tr" ? "Private preview hazırlanıyor" : "Private preview is being built"}</span>
                <div>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block reveal-section" id="experience">
        <div className="section-heading">
          <span>{t.nav.experience}</span>
          <h2>{t.experience.title}</h2>
        </div>
        <p className="wide-text">{t.experience.text}</p>

        <div className="process-grid">
          {t.experience.cards.map(([number, title, text]) => (
            <article key={title}>
              <b>{number}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block reveal-section" id="moods">
        <div className="section-heading">
          <span>{t.nav.moods}</span>
          <h2>{t.moods.title}</h2>
        </div>
        <p className="wide-text">{t.moods.text}</p>

        <div className="interactive-mood-area">
          <div className="mood-button-grid">
            {t.moods.list.map((mood, index) => (
              <button
                key={mood.name}
                type="button"
                className={selectedMood === index ? "active" : ""}
                onClick={() => setSelectedMood(index)}
              >
                {mood.name}
              </button>
            ))}
          </div>

          <div className="mood-detail-card">
            <span>{lang === "tr" ? "Seçili mod" : "Selected mood"}</span>
            <h3>{selectedMoodData.name}</h3>
            <p>{selectedMoodData.detail}</p>
            <div>
              <strong>{lang === "tr" ? "Önerilecek odalar" : "Suggested rooms"}</strong>
              <small>{selectedMoodData.rooms}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block reveal-section" id="rooms">
        <div className="section-heading">
          <span>{t.nav.rooms}</span>
          <h2>{t.rooms.title}</h2>
        </div>
        <p className="wide-text">{t.rooms.text}</p>

        <div className="room-grid-real">
          {t.rooms.cards.map(([title, text]) => (
            <article key={title}>
              <div className="room-icon">◌</div>
              <h3>{title}</h3>
              <p>{text}</p>
              <span>10 dk · 2-4 kişi · anonim</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block split-section reveal-section" id="flow">
        <div className="timer-product-card">
          <span>ROOM TIMER</span>
          <strong>10:00</strong>
          <p>{lang === "tr" ? "Herkes isterse devam eder." : "It continues only if everyone agrees."}</p>
        </div>

        <div>
          <div className="section-heading align-left">
            <span>{t.nav.flow}</span>
            <h2>{t.flow.title}</h2>
          </div>
          <p className="wide-text align-left">{t.flow.text}</p>

          <div className="rule-stack">
            {t.flow.rules.map((rule) => (
              <div key={rule}>{rule}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block reveal-section" id="connection">
        <div className="section-heading">
          <span>{t.nav.connection}</span>
          <h2>{t.connection.title}</h2>
        </div>
        <p className="wide-text">{t.connection.text}</p>

        <div className="connection-flow">
          {t.connection.steps.map((step, index) => (
            <article key={step}>
              <b>{index + 1}</b>
              <span>{step}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block reveal-section" id="safety">
        <div className="section-heading">
          <span>{t.nav.safety}</span>
          <h2>{t.safety.title}</h2>
        </div>
        <p className="wide-text">{t.safety.text}</p>

        <div className="safety-grid">
          {t.safety.cards.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <p className="safety-note">{t.safety.note}</p>
      </section>

      <section className="section-block reveal-section" id="preview">
        <div className="section-heading">
          <span>{t.nav.preview}</span>
          <h2>{t.preview.title}</h2>
        </div>
        <p className="wide-text">{t.preview.text}</p>

        <div className="roadmap-clean">
          {t.preview.roadmap.map(([phase, text]) => (
            <article key={phase}>
              <span>{phase}</span>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block reveal-section" id="legal">
        <div className="section-heading">
          <span>{t.nav.legal}</span>
          <h2>{t.legal.title}</h2>
        </div>
        <p className="wide-text">{t.legal.text}</p>

        <div className="legal-grid">
          {t.legal.cards.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block waitlist-section reveal-section" id="waitlist">
        <div className="waitlist-card-clean">
          <div>
            <span className="eyebrow">{t.nav.waitlist}</span>
            <h2>{t.waitlist.title}</h2>
            <p>{t.waitlist.text}</p>
          </div>

          <WaitlistForm lang={lang} />
        </div>
      </section>

      <footer className="footer-clean footer-with-links">
  <div>
    <strong>SEVORA</strong>
    <span>{t.footer}</span>
  </div>

  <div className="homepage-footer-links">
    <a href="/privacy">{lang === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}</a>
    <a href="/terms">{lang === "tr" ? "Kullanım Şartları" : "Terms of Use"}</a>
    <a href="/community">{lang === "tr" ? "Topluluk Kuralları" : "Community Guidelines"}</a>
    <a href="/contact">{lang === "tr" ? "İletişim" : "Contact"}</a>
  </div>
</footer>

      <nav className="mobile-bottom-nav">
        {["home", "moods", "rooms", "safety"].map((id) => (
          <button
            key={id}
            className={activeSection === id ? "active" : ""}
            type="button"
            onClick={() => goTo(id)}
          >
            <b>{id === "home" ? "⌂" : id === "moods" ? "◐" : id === "rooms" ? "◌" : "◇"}</b>
            <span>{t.nav[id as keyof typeof t.nav]}</span>
          </button>
        ))}

        <button
          className={mobileMenuOpen ? "active" : ""}
          type="button"
          onClick={() => setMobileMenuOpen((value) => !value)}
        >
          <b>☰</b>
          <span>{t.nav.menu}</span>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-card">
            <div className="mobile-menu-head">
              <strong>SEVORA</strong>
              <button type="button" onClick={() => setMobileMenuOpen(false)}>×</button>
            </div>

            <div className="mobile-menu-list">
              {sections.map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => goTo(section)}
                  className={activeSection === section ? "active" : ""}
                >
                  {t.nav[section as keyof typeof t.nav]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
