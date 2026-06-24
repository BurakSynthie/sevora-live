"use client";

import { useState } from "react";
import WaitlistForm from "../components/WaitlistForm";

type Lang = "tr" | "en";

const content = {
  tr: {
    nav: {
      how: "Nasıl çalışır?",
      safety: "Güvenlik",
      roadmap: "Yol haritası",
      faq: "SSS",
      waitlist: "Erken erişim",
    },
    hero: {
      eyebrow: "SEVORA PRIVATE PREVIEW",
      title: "Aynı hissi paylaşan biri birkaç dakika uzağında.",
      text:
        "Sevora, yalnız hissettiğinde, canın sıkıldığında veya sadece biriyle konuşmak istediğinde seni kısa, güvenli ve anonim sohbet odalarında insanlarla buluşturur.",
      primary: "Erken erişime katıl",
      secondary: "Nasıl çalışır?",
      trust: "Profil yok. Takip yok. Sonsuz akış yok. Sadece kısa ve gerçek insan teması.",
    },
    live: {
      label: "LIVE BUILD STATUS",
      title: "Sevora hazırlanıyor",
      text: "İlk sürüm; mod seçimi, anonim odalar, 10 dakikalık sohbetler ve güvenli bağlantı sistemiyle geliştiriliyor.",
      items: [
        ["Private Preview", "Aktif"],
        ["Waitlist", "Canlı"],
        ["Mood Rooms", "Hazırlanıyor"],
        ["Safe Connection", "Planlandı"],
      ],
    },
    intro: {
      label: "SEVORA NEDİR?",
      title: "Sosyal medya değil. Dating değil. Sonsuz sohbet sitesi değil.",
      text:
        "Sevora, insanların uzun profiller oluşturmadan, takipçi toplamadan ve sonsuz içerik tüketmeden kısa süreli sohbet odalarına katılmasını sağlar. Amaç bağımlılık yaratmak değil; yalnız, sıkılmış veya konuşmak isteyen insanlara güvenli bir sosyal mola sunmaktır.",
      cards: [
        ["Profil yok", "Kim olduğunu kanıtlamak zorunda değilsin. Sevora’da önce hislerinle varsın."],
        ["Sonsuz akış yok", "Odalar süreyle çalışır. Sohbet biter, ekran seni daha fazla tutmaya çalışmaz."],
        ["Güvenli bağlantı var", "Bir kişi sana iyi gelirse, sadece karşılıklı onayla sohbet devam eder."],
      ],
    },
    moods: {
      label: "MODUNU SEÇ",
      title: "Önce nasıl hissettiğini seç.",
      text:
        "Sevora, seçtiğin moda göre sana uygun oda türlerini gösterir. Böylece herkes aynı beklentiyle aynı odaya girer.",
      list: [
        "Yalnızım",
        "Canım sıkıldı",
        "Dertleşmek istiyorum",
        "Kafamı dağıtmak istiyorum",
        "Sadece konuşmak istiyorum",
        "Eğlenmek istiyorum",
        "Sessiz kalmak istiyorum",
      ],
    },
    rooms: {
      label: "ODALAR",
      title: "10 dakikalık anonim sohbet odaları.",
      cards: [
        ["Dertleşme Odası", "İçini dökmek veya birini yargılanmadan dinlemek isteyenler için kısa ve güvenli sohbet alanı."],
        ["Kafa Dağıtma Odası", "Hafif, komik ve gündelik sohbetlerle birkaç dakikalığına uzaklaşmak isteyenler için."],
        ["Sessiz Oda", "Konuşmak zorunda kalmadan, aynı anda orada olan insanları hissetmek isteyenler için."],
        ["Eğlence Odası", "Mini sorular, absürt seçimler ve kısa oyunlarla can sıkıntısını dağıtmak için."],
        ["Gece Sohbeti", "Gecenin sessizliğinde biriyle birkaç dakika konuşmak isteyenler için."],
        ["Sadece Dinlenmek", "Ağır sohbet istemeden kısa bir mola almak isteyenler için."],
      ],
    },
    extension: {
      label: "OYLAMAYLA UZATMA",
      title: "Sohbet iyi gidiyorsa, herkes isterse devam eder.",
      text:
        "Her oda başlangıçta 10 dakika sürer. Süre yetmezse odadaki biri “10 dakika daha uzatalım mı?” oylaması başlatabilir. Herkes evet derse oda 10 dakika daha devam eder. Bir kişi bile istemezse oda kapanır.",
      rules: [
        "Herkes evet derse: +10 dakika",
        "1 kişi hayır derse: oda kapanır",
        "Maksimum uzatma: 3 kez",
        "Toplam maksimum süre: 40 dakika",
      ],
    },
    connection: {
      label: "GÜVENLİ BAĞLANTI",
      title: "Bazen 10 dakika bir arkadaşlığın başlangıcı olabilir.",
      text:
        "Oda bittiğinde Sevora sana “Bu odada sana iyi gelen biri oldu mu?” diye sorar. Eğer iki kişi birbirini seçerse, sistem güvenli bir bağlantı odası açar. Böylece güzel bir sohbetin önü kapanmaz ama kimse istemediği bir bağlantıya zorlanmaz.",
      flow: ["Anonim oda", "Bu kişi bana iyi geldi", "Karşılıklı seçim", "24 saatlik güvenli bağlantı", "Uygulama içi arkadaşlık"],
    },
    forWho: {
      label: "KİMLER İÇİN?",
      title: "Sevora, birilerine ulaşmak isteyen ama sosyal medyada kaybolmak istemeyenler için.",
      cards: [
        ["Yalnız hissedenler", "Kendini anlatmak isteyen ama nereden başlayacağını bilemeyenler için."],
        ["Canı sıkılanlar", "Kısa, hafif ve insani bir temasla gününü değiştirmek isteyenler için."],
        ["Dertleşmek isteyenler", "Yargılanmadan birkaç dakika konuşmak veya dinlenmek isteyenler için."],
        ["Sadece biri olsun diyenler", "Konuşmak zorunda kalmadan bile aynı odada birilerinin varlığını hissetmek isteyenler için."],
      ],
    },
    safety: {
      label: "GÜVENLİK",
      title: "Anonim ama başıboş değil.",
      cards: [
        ["Şikayet ve engelleme", "Her odada görünür çıkış, şikayet ve engelleme seçenekleri bulunur."],
        ["Kişisel bilgi koruması", "Oda içinde telefon, adres ve sosyal medya baskısı gibi riskli davranışlar engellenir."],
        ["Karşılıklı onay", "Özel bağlantı sadece iki kişinin de açık rızasıyla başlar."],
        ["Süre sınırı", "Odalar sonsuz akışa dönüşmez. Her şey kısa, kontrollü ve isteğe bağlıdır."],
      ],
      note:
        "Sevora profesyonel psikolojik destek yerine geçmez. Ama insanların kısa süreli, güvenli ve insani bir temas kurmasına yardımcı olmayı hedefler.",
    },
    roadmap: {
      label: "ROADMAP",
      title: "Sevora adım adım açılıyor.",
      items: [
        ["NOW", "Private Preview Landing", "Sevora’nın yeni konsepti, bekleme listesi ve tanıtım alanı yayında."],
        ["PHASE 1", "Mood Selection", "Kullanıcı ruh halini seçecek ve uygun oda türlerini görecek."],
        ["PHASE 2", "Anonymous Chat Rooms", "2-4 kişilik, 10 dakikalık yazışmalı odalar aktif olacak."],
        ["PHASE 3", "Vote-Based Extension", "Oda süresi herkesin onayıyla uzatılabilecek."],
        ["PHASE 4", "Safe Connection", "Birbirine iyi gelen kişiler karşılıklı onayla özel bağlantı kurabilecek."],
        ["FUTURE", "Voice Rooms & Guided Activities", "Sesli odalar, mini aktiviteler ve gelişmiş güvenlik sistemi eklenecek."],
      ],
    },
    faq: {
      label: "SSS",
      title: "Kısa cevaplar.",
      items: [
        ["Sevora anonim mi?", "Evet. İlk sürümde kullanıcılar rastgele takma adlarla odalara katılır."],
        ["Bu bir dating uygulaması mı?", "Hayır. Sevora flört değil, kısa ve güvenli sosyal temas için tasarlanır."],
        ["Oda neden süreli?", "Bağımlılık yapan sonsuz sohbet yerine kontrollü, kısa ve iyi gelen bir deneyim hedeflenir."],
        ["Biriyle arkadaş olunabilir mi?", "Evet. İki kişi birbirini seçerse güvenli bağlantı odası açılır."],
        ["Sesli sohbet olacak mı?", "İlk sürüm yazışmalı olacak. Sesli odalar ilerleyen aşamalarda planlanıyor."],
      ],
    },
    waitlist: {
      label: "ERKEN ERİŞİM",
      title: "Sevora ilk kullanıcılarını bekliyor.",
      text:
        "Sevora şu anda private preview aşamasında. İlk sürüm hazır olduğunda, bekleme listesine katılan kullanıcılar yeni deneyimi ilk kullanan kişiler arasında olacak.",
    },
    footer: {
      text: "Short, safe and anonymous mood-based rooms.",
      rights: "All rights reserved.",
      links: ["Gizlilik Politikası", "Kullanım Şartları", "Topluluk Kuralları", "İletişim"],
      disclaimer: "Sevora profesyonel psikolojik destek veya acil yardım hizmeti değildir.",
    },
  },
  en: {
    nav: {
      how: "How it works",
      safety: "Safety",
      roadmap: "Roadmap",
      faq: "FAQ",
      waitlist: "Early access",
    },
    hero: {
      eyebrow: "SEVORA PRIVATE PREVIEW",
      title: "Someone who feels the same may be just minutes away.",
      text:
        "Sevora connects you with people in short, safe and anonymous rooms when you feel lonely, bored, or simply want to talk.",
      primary: "Join early access",
      secondary: "How it works",
      trust: "No profiles. No followers. No infinite feed. Just short and real human contact.",
    },
    live: {
      label: "LIVE BUILD STATUS",
      title: "Sevora is being built",
      text: "The first version is being developed with mood selection, anonymous rooms, 10-minute chats and safe connections.",
      items: [
        ["Private Preview", "Live"],
        ["Waitlist", "Active"],
        ["Mood Rooms", "Building"],
        ["Safe Connection", "Planned"],
      ],
    },
    intro: {
      label: "WHAT IS SEVORA?",
      title: "Not social media. Not dating. Not an endless chat site.",
      text:
        "Sevora lets people join short conversation rooms without building long profiles, chasing followers or consuming endless content. The goal is not addiction; it is a safe social pause for people who feel lonely, bored or simply want to talk.",
      cards: [
        ["No profiles", "You do not have to prove who you are. In Sevora, your feeling comes first."],
        ["No infinite feed", "Rooms are time-limited. When the room ends, the screen does not try to keep you there."],
        ["Safe connection", "If someone feels good to you, the conversation can continue only with mutual consent."],
      ],
    },
    moods: {
      label: "CHOOSE YOUR MOOD",
      title: "Start with how you feel.",
      text:
        "Sevora shows room types based on your selected mood. This helps people enter rooms with similar expectations.",
      list: [
        "I feel lonely",
        "I am bored",
        "I want to open up",
        "I need a distraction",
        "I just want to talk",
        "I want to have fun",
        "I want to stay quiet",
      ],
    },
    rooms: {
      label: "ROOMS",
      title: "10-minute anonymous chat rooms.",
      cards: [
        ["Open Up Room", "A short and safe space for people who want to share or listen without judgment."],
        ["Distraction Room", "Light, funny and everyday conversations for a quick mental break."],
        ["Quiet Room", "For people who do not want to talk but still want to feel that others are there."],
        ["Fun Room", "Mini questions, absurd choices and short games to reduce boredom."],
        ["Night Chat", "For those who want to talk for a few minutes in the quiet of the night."],
        ["Just Resting", "For people who want a short pause without a heavy conversation."],
      ],
    },
    extension: {
      label: "VOTE-BASED EXTENSION",
      title: "If the chat feels good, it continues only if everyone agrees.",
      text:
        "Each room starts with 10 minutes. If more time is needed, someone can start a “Should we extend for 10 minutes?” vote. If everyone says yes, the room continues. If even one person says no, the room closes.",
      rules: [
        "Everyone says yes: +10 minutes",
        "One no: the room closes",
        "Maximum extensions: 3",
        "Maximum total time: 40 minutes",
      ],
    },
    connection: {
      label: "SAFE CONNECTION",
      title: "Sometimes 10 minutes can become the start of a friendship.",
      text:
        "When a room ends, Sevora asks if anyone in the room felt good to you. If two people choose each other, a safe connection room opens. A good conversation can continue, but nobody is forced into a connection.",
      flow: ["Anonymous room", "This person felt good", "Mutual selection", "24-hour safe connection", "In-app friendship"],
    },
    forWho: {
      label: "WHO IS IT FOR?",
      title: "For people who want to reach someone without getting lost in social media.",
      cards: [
        ["People feeling lonely", "For those who want to express themselves but do not know where to start."],
        ["People feeling bored", "For those who want to change their day with a short, light human contact."],
        ["People who want to open up", "For those who want to talk or be heard for a few minutes without judgment."],
        ["People who just need someone", "For those who want to feel someone’s presence in the same room, even without talking."],
      ],
    },
    safety: {
      label: "SAFETY",
      title: "Anonymous, but not uncontrolled.",
      cards: [
        ["Report and block", "Visible exit, report and block options are available in every room."],
        ["Personal info protection", "Risky behavior such as phone, address or social media pressure is restricted inside rooms."],
        ["Mutual consent", "Private connection starts only with clear consent from both people."],
        ["Time limits", "Rooms do not become an endless feed. Everything is short, controlled and optional."],
      ],
      note:
        "Sevora is not a substitute for professional psychological support. It aims to help people create short, safe and human contact.",
    },
    roadmap: {
      label: "ROADMAP",
      title: "Sevora is opening step by step.",
      items: [
        ["NOW", "Private Preview Landing", "The new concept, waitlist and preview page are live."],
        ["PHASE 1", "Mood Selection", "Users will choose their mood and see matching room types."],
        ["PHASE 2", "Anonymous Chat Rooms", "2-4 person, 10-minute text rooms will go live."],
        ["PHASE 3", "Vote-Based Extension", "Rooms can be extended with unanimous consent."],
        ["PHASE 4", "Safe Connection", "People who feel good to each other can connect with mutual consent."],
        ["FUTURE", "Voice Rooms & Guided Activities", "Voice rooms, mini activities and stronger safety systems will be added."],
      ],
    },
    faq: {
      label: "FAQ",
      title: "Short answers.",
      items: [
        ["Is Sevora anonymous?", "Yes. In the first version, users join rooms with random nicknames."],
        ["Is this a dating app?", "No. Sevora is designed for short and safe social contact, not dating."],
        ["Why are rooms time-limited?", "The goal is a controlled, short and helpful experience instead of an addictive endless chat."],
        ["Can people become friends?", "Yes. If two people choose each other, a safe connection room opens."],
        ["Will there be voice chat?", "The first version will be text-based. Voice rooms are planned for later stages."],
      ],
    },
    waitlist: {
      label: "EARLY ACCESS",
      title: "Sevora is waiting for its first users.",
      text:
        "Sevora is currently in private preview. When the first version is ready, people on the waitlist will be among the first to try the new experience.",
    },
    footer: {
      text: "Short, safe and anonymous mood-based rooms.",
      rights: "All rights reserved.",
      links: ["Privacy Policy", "Terms of Use", "Community Guidelines", "Contact"],
      disclaimer: "Sevora is not a professional psychological support or emergency service.",
    },
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("tr");
  const t = content[lang];

  return (
    <main className="sevora-page">
      <header className="top-nav">
        <a className="brand-mark" href="#">
          <span>S</span>
          SEVORA
        </a>

        <nav className="desktop-nav">
          <a href="#how">{t.nav.how}</a>
          <a href="#safety">{t.nav.safety}</a>
          <a href="#roadmap">{t.nav.roadmap}</a>
          <a href="#faq">{t.nav.faq}</a>
        </nav>

        <div className="nav-actions">
          <div className="lang-switch" aria-label="Language switcher">
            <button className={lang === "tr" ? "active" : ""} onClick={() => setLang("tr")}>
              TR
            </button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
              EN
            </button>
          </div>
          <a className="nav-cta" href="#waitlist">{t.nav.waitlist}</a>
        </div>
      </header>

      <section className="hero-section">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">{t.hero.eyebrow}</div>
            <h1>{t.hero.title}</h1>
            <p className="hero-text">{t.hero.text}</p>

            <div className="hero-actions">
              <a className="primary-button" href="#waitlist">{t.hero.primary}</a>
              <a className="secondary-button" href="#how">{t.hero.secondary}</a>
            </div>

            <div className="trust-line">{t.hero.trust}</div>
          </div>

          <div className="room-visual" aria-label="Sevora room network preview">
            <div className="visual-core">
              <div className="pulse-ring ring-one" />
              <div className="pulse-ring ring-two" />
              <div className="core-card">
                <span>SEVORA ROOM</span>
                <strong>10:00</strong>
                <p>{lang === "tr" ? "4 kişi aynı hissi paylaşıyor" : "4 people share the same mood"}</p>
              </div>
            </div>

            <div className="person-node node-one">
              <span>{lang === "tr" ? "Mavi Bulut" : "Blue Cloud"}</span>
              <p>{lang === "tr" ? "Yalnızım" : "Lonely"}</p>
            </div>
            <div className="person-node node-two">
              <span>{lang === "tr" ? "Sessiz Martı" : "Silent Gull"}</span>
              <p>{lang === "tr" ? "Dinliyorum" : "Listening"}</p>
            </div>
            <div className="person-node node-three">
              <span>{lang === "tr" ? "Gece Lambası" : "Night Lamp"}</span>
              <p>{lang === "tr" ? "Konuşmak istiyorum" : "Want to talk"}</p>
            </div>
            <div className="person-node node-four">
              <span>{lang === "tr" ? "Küçük Yıldız" : "Small Star"}</span>
              <p>{lang === "tr" ? "Buradayım" : "I am here"}</p>
            </div>

            <div className="signal-line line-one" />
            <div className="signal-line line-two" />
            <div className="signal-line line-three" />
            <div className="signal-line line-four" />

            <div className="vote-bubble">
              <strong>{lang === "tr" ? "Uzatalım mı?" : "Extend?"}</strong>
              <span>{lang === "tr" ? "Herkes isterse +10 dk" : "+10 min if all agree"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="live-status-section">
        <div className="live-status-card">
          <div>
            <span className="live-dot" />
            <small>{t.live.label}</small>
            <h2>{t.live.title}</h2>
            <p>{t.live.text}</p>
          </div>

          <div className="status-grid">
            {t.live.items.map(([title, status]) => (
              <div key={title}>
                <span>{title}</span>
                <strong>{status}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block intro-section" id="how">
        <div className="section-heading">
          <span>{t.intro.label}</span>
          <h2>{t.intro.title}</h2>
        </div>
        <p className="wide-text">{t.intro.text}</p>

        <div className="feature-grid">
          {t.intro.cards.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block mood-section">
        <div className="section-heading">
          <span>{t.moods.label}</span>
          <h2>{t.moods.title}</h2>
        </div>
        <p className="wide-text">{t.moods.text}</p>

        <div className="mood-grid">
          {t.moods.list.map((mood) => (
            <div className="mood-card" key={mood}>{mood}</div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <span>{t.rooms.label}</span>
          <h2>{t.rooms.title}</h2>
        </div>

        <div className="room-grid expanded">
          {t.rooms.cards.map(([title, text]) => (
            <article className="room-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block extension-section">
        <div className="timer-card">
          <span className="timer-label">ROOM TIMER</span>
          <strong>10:00</strong>
          <p>{t.extension.title}</p>
        </div>

        <div>
          <div className="section-heading align-left">
            <span>{t.extension.label}</span>
            <h2>{t.extension.title}</h2>
          </div>
          <p className="wide-text align-left">{t.extension.text}</p>

          <div className="rules-list">
            {t.extension.rules.map((rule) => (
              <span key={rule}>{rule}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block connection-section">
        <div className="section-heading">
          <span>{t.connection.label}</span>
          <h2>{t.connection.title}</h2>
        </div>
        <p className="wide-text">{t.connection.text}</p>

        <div className="flow-grid five">
          {t.connection.flow.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </section>

      <section className="section-block forwho-section">
        <div className="section-heading">
          <span>{t.forWho.label}</span>
          <h2>{t.forWho.title}</h2>
        </div>

        <div className="feature-grid four">
          {t.forWho.cards.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block safety-section" id="safety">
        <div className="section-heading">
          <span>{t.safety.label}</span>
          <h2>{t.safety.title}</h2>
        </div>

        <div className="feature-grid four">
          {t.safety.cards.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <p className="safety-note">{t.safety.note}</p>
      </section>

      <section className="section-block roadmap-section" id="roadmap">
        <div className="section-heading">
          <span>{t.roadmap.label}</span>
          <h2>{t.roadmap.title}</h2>
        </div>

        <div className="roadmap-list">
          {t.roadmap.items.map(([phase, title, text]) => (
            <article key={phase}>
              <span>{phase}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block faq-section" id="faq">
        <div className="section-heading">
          <span>{t.faq.label}</span>
          <h2>{t.faq.title}</h2>
        </div>

        <div className="faq-list">
          {t.faq.items.map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block waitlist-section" id="waitlist">
        <div className="waitlist-card">
          <div>
            <div className="section-heading align-left">
              <span>{t.waitlist.label}</span>
              <h2>{t.waitlist.title}</h2>
            </div>
            <p>{t.waitlist.text}</p>
          </div>

          <WaitlistForm lang={lang} />
        </div>
      </section>

      <footer className="site-footer large-footer">
        <div>
          <strong>SEVORA</strong>
          <p>{t.footer.text}</p>
          <small>© 2026 Sevora. {t.footer.rights}</small>
        </div>

        <div className="footer-links">
          {t.footer.links.map((link) => (
            <a href="#" key={link}>{link}</a>
          ))}
        </div>

        <p className="footer-disclaimer">{t.footer.disclaimer}</p>
      </footer>

      <a className="mobile-sticky" href="#waitlist">{t.nav.waitlist}</a>
    </main>
  );
}
