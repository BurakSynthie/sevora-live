"use client";

import { useEffect, useState } from "react";

type Lang = "tr" | "en";

const copy = {
  tr: {
    badge: "CANLI ÜRÜN ÖNİZLEMESİ",
    title: "Sevora’ya girince karşılaşacağın deneyim",
    moodTitle: "Şu an nasıl hissediyorsun?",
    selectedMood: "Canım sıkıldı",
    roomsFound: "Sana uygun 3 oda bulundu",
    join: "Odaya katıl",
    timer: "10:00",
    roomName: "Kafa Dağıtma Odası",
    roomMeta: "3 kişi içeride · anonim · 10 dk",
    messageOne: "Bugün sadece kafam dağılsın istiyorum.",
    messageTwo: "O zaman ağır konu yok. Sana saçma bir soru: penguenle kahve mi, kaplumbağayla yolculuk mu?",
    extend: "10 dakika daha uzatalım mı?",
    yes: "Evet",
    no: "Hayır",
    goodPerson: "Bu kişi bana iyi geldi",
    connection: "Karşılıklı seçilirse güvenli bağlantı açılır.",
    tabs: ["Mod seçimi", "Oda listesi", "Sohbet", "Bağlantı"],
  },
  en: {
    badge: "LIVE PRODUCT PREVIEW",
    title: "What you will see when you enter Sevora",
    moodTitle: "How do you feel right now?",
    selectedMood: "I am bored",
    roomsFound: "3 matching rooms found",
    join: "Join room",
    timer: "10:00",
    roomName: "Distraction Room",
    roomMeta: "3 people inside · anonymous · 10 min",
    messageOne: "I just want to distract myself today.",
    messageTwo: "Then no heavy topics. Silly question: coffee with a penguin or a trip with a turtle?",
    extend: "Extend for 10 more minutes?",
    yes: "Yes",
    no: "No",
    goodPerson: "This person felt good",
    connection: "If both choose each other, a safe connection opens.",
    tabs: ["Mood", "Rooms", "Chat", "Connection"],
  },
};

export default function SevoraProductPreview({ lang = "tr" }: { lang?: Lang }) {
  const t = copy[lang];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((current) => (current + 1) % 4);
    }, 2600);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="product-preview">
      <div className="preview-header">
        <div>
          <span>{t.badge}</span>
          <h3>{t.title}</h3>
        </div>

        <div className="preview-tabs">
          {t.tabs.map((tab, index) => (
            <button
              key={tab}
              className={step === index ? "active" : ""}
              onClick={() => setStep(index)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="preview-stage">
        <div className={`preview-screen mood-screen ${step === 0 ? "active" : ""}`}>
          <div className="app-topbar">
            <strong>SEVORA</strong>
            <span>Private Preview</span>
          </div>

          <h4>{t.moodTitle}</h4>

          <div className="app-mood-grid">
            <button>Yalnızım</button>
            <button className="selected">{t.selectedMood}</button>
            <button>Dertleşmek istiyorum</button>
            <button>Kafamı dağıtmak istiyorum</button>
          </div>

          <div className="selected-explain">
            <span>{t.selectedMood}</span>
            <p>
              {lang === "tr"
                ? "Sevora bu modu seçtiğinde sana daha hafif, eğlenceli ve kısa odalar önerir."
                : "When you choose this mood, Sevora suggests lighter, fun and short rooms."}
            </p>
          </div>
        </div>

        <div className={`preview-screen rooms-screen ${step === 1 ? "active" : ""}`}>
          <div className="app-topbar">
            <strong>{t.roomsFound}</strong>
            <span>Live</span>
          </div>

          <div className="room-preview-card featured">
            <div>
              <h4>{t.roomName}</h4>
              <p>{t.roomMeta}</p>
            </div>
            <button>{t.join}</button>
          </div>

          <div className="room-preview-card">
            <div>
              <h4>{lang === "tr" ? "Eğlence Odası" : "Fun Room"}</h4>
              <p>{lang === "tr" ? "2 kişi bekliyor · mini sorular" : "2 waiting · mini questions"}</p>
            </div>
            <button>{t.join}</button>
          </div>

          <div className="room-preview-card">
            <div>
              <h4>{lang === "tr" ? "Gece Sohbeti" : "Night Chat"}</h4>
              <p>{lang === "tr" ? "1 kişi bekliyor · sakin sohbet" : "1 waiting · calm chat"}</p>
            </div>
            <button>{t.join}</button>
          </div>
        </div>

        <div className={`preview-screen chat-screen ${step === 2 ? "active" : ""}`}>
          <div className="chat-preview-top">
            <div>
              <strong>{t.roomName}</strong>
              <span>{t.roomMeta}</span>
            </div>
            <b>{t.timer}</b>
          </div>

          <div className="preview-message left">
            <small>Mavi Bulut</small>
            <p>{t.messageOne}</p>
          </div>

          <div className="preview-message right">
            <small>Sessiz Martı</small>
            <p>{t.messageTwo}</p>
          </div>

          <div className="extend-preview">
            <strong>{t.extend}</strong>
            <div>
              <button>{t.yes}</button>
              <button>{t.no}</button>
            </div>
          </div>
        </div>

        <div className={`preview-screen connection-screen ${step === 3 ? "active" : ""}`}>
          <div className="connection-people">
            <div>
              <span>Mavi Bulut</span>
              <small>{t.goodPerson}</small>
            </div>

            <div className="connection-heart">↔</div>

            <div>
              <span>Sessiz Martı</span>
              <small>{t.goodPerson}</small>
            </div>
          </div>

          <div className="connection-result">
            <strong>{lang === "tr" ? "Güvenli bağlantı hazır" : "Safe connection ready"}</strong>
            <p>{t.connection}</p>
          </div>
        </div>
      </div>

      <div className="preview-progress">
        {t.tabs.map((tab, index) => (
          <button
            key={tab}
            className={step === index ? "active" : ""}
            onClick={() => setStep(index)}
            type="button"
            aria-label={tab}
          />
        ))}
      </div>
    </div>
  );
}
