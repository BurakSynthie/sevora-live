import WaitlistForm from "../components/WaitlistForm";

const moods = [
  "Yalnızım",
  "Canım sıkıldı",
  "Dertleşmek istiyorum",
  "Kafamı dağıtmak istiyorum",
  "Sadece konuşmak istiyorum",
  "Eğlenmek istiyorum",
  "Sessiz kalmak istiyorum",
];

const roomTypes = [
  {
    title: "Dertleşme Odası",
    text: "İçini dökmek veya birini yargılanmadan dinlemek isteyenler için kısa ve güvenli sohbet alanı.",
  },
  {
    title: "Kafa Dağıtma Odası",
    text: "Hafif, komik ve gündelik sohbetlerle birkaç dakikalığına uzaklaşmak isteyenler için.",
  },
  {
    title: "Sessiz Oda",
    text: "Konuşmak zorunda kalmadan, aynı anda orada olan insanları hissetmek isteyenler için.",
  },
  {
    title: "Eğlence Odası",
    text: "Mini sorular, absürt seçimler ve kısa oyunlarla can sıkıntısını dağıtmak için.",
  },
];

const roadmap = [
  ["NOW", "Private Preview Landing", "Sevora’nın yeni konsepti, bekleme listesi ve tanıtım alanı yayında."],
  ["PHASE 1", "Mood Selection", "Kullanıcı ruh halini seçecek ve uygun oda türlerini görecek."],
  ["PHASE 2", "Anonymous Chat Rooms", "2-4 kişilik, 10 dakikalık yazışmalı odalar aktif olacak."],
  ["PHASE 3", "Vote-Based Extension", "Oda süresi herkesin onayıyla uzatılabilecek."],
  ["PHASE 4", "Safe Connection", "Birbirine iyi gelen kişiler karşılıklı onayla özel bağlantı kurabilecek."],
];

export default function Home() {
  return (
    <main className="sevora-page">
      <section className="hero-section">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">SEVORA PRIVATE PREVIEW</div>
            <h1>
              Aynı hissi paylaşan biri birkaç dakika uzağında.
            </h1>
            <p className="hero-text">
              Sevora, yalnız hissettiğinde, canın sıkıldığında veya sadece biriyle konuşmak istediğinde
              seni kısa, güvenli ve anonim sohbet odalarında insanlarla buluşturur.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#waitlist">Erken erişime katıl</a>
              <a className="secondary-button" href="#how">Nasıl çalışır?</a>
            </div>
            <div className="trust-line">
              Profil yok. Takip yok. Sonsuz akış yok. Sadece kısa ve gerçek insan teması.
            </div>
          </div>

          <div className="preview-orbit" aria-label="Sevora preview">
            <div className="phone-shell">
              <div className="phone-top">
                <span>Sevora</span>
                <strong>10:00</strong>
              </div>
              <div className="mood-question">Şu an nasıl hissediyorsun?</div>
              <div className="mini-moods">
                <span>Yalnızım</span>
                <span>Dertleşmek istiyorum</span>
                <span>Kafamı dağıtmak istiyorum</span>
              </div>
              <div className="chat-card left">
                <small>Mavi Bulut</small>
                <p>Bugün biraz konuşmaya ihtiyacım vardı.</p>
              </div>
              <div className="chat-card right">
                <small>Sessiz Martı</small>
                <p>Ben de buradayım. İstersen sadece dinlerim.</p>
              </div>
              <div className="vote-card">
                <span>10 dakika daha uzatalım mı?</span>
                <div>
                  <button>Evet</button>
                  <button>Hayır</button>
                </div>
              </div>
            </div>
            <div className="floating-pill pill-one">Anonymous Rooms</div>
            <div className="floating-pill pill-two">Safe Connection</div>
            <div className="floating-pill pill-three">Mood Based</div>
          </div>
        </div>
      </section>

      <section className="section-block intro-section" id="how">
        <div className="section-heading">
          <span>SEVORA NEDİR?</span>
          <h2>Sosyal medya değil. Dating değil. Sonsuz sohbet sitesi değil.</h2>
        </div>
        <p className="wide-text">
          Sevora, insanların uzun profiller oluşturmadan, takipçi toplamadan ve sonsuz içerik tüketmeden
          kısa süreli sohbet odalarına katılmasını sağlar. Amaç bağımlılık yaratmak değil; yalnız,
          sıkılmış veya konuşmak isteyen insanlara güvenli bir sosyal mola sunmaktır.
        </p>
        <div className="feature-grid">
          <article>
            <h3>Profil yok</h3>
            <p>Kim olduğunu kanıtlamak zorunda değilsin. Sevora’da önce hislerinle varsın.</p>
          </article>
          <article>
            <h3>Sonsuz akış yok</h3>
            <p>Odalar süreyle çalışır. Sohbet biter, ekran seni daha fazla tutmaya çalışmaz.</p>
          </article>
          <article>
            <h3>Güvenli bağlantı var</h3>
            <p>Bir kişi sana iyi gelirse, sadece karşılıklı onayla sohbet devam eder.</p>
          </article>
        </div>
      </section>

      <section className="section-block mood-section">
        <div className="section-heading">
          <span>MODUNU SEÇ</span>
          <h2>Önce nasıl hissettiğini seç.</h2>
        </div>
        <p className="wide-text">
          Sevora, seçtiğin moda göre sana uygun oda türlerini gösterir. Böylece herkes aynı beklentiyle
          aynı odaya girer.
        </p>
        <div className="mood-grid">
          {moods.map((mood) => (
            <div className="mood-card" key={mood}>{mood}</div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <span>ODALAR</span>
          <h2>10 dakikalık anonim sohbet odaları.</h2>
        </div>
        <div className="room-grid">
          {roomTypes.map((room) => (
            <article className="room-card" key={room.title}>
              <h3>{room.title}</h3>
              <p>{room.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block extension-section">
        <div className="timer-card">
          <span className="timer-label">ROOM TIMER</span>
          <strong>10:00</strong>
          <p>Sohbet iyi gidiyorsa, herkes isterse devam eder.</p>
        </div>
        <div>
          <div className="section-heading align-left">
            <span>OYLAMAYLA UZATMA</span>
            <h2>Bir kişi bile istemezse oda kapanır.</h2>
          </div>
          <p className="wide-text align-left">
            Her oda başlangıçta 10 dakika sürer. Süre yetmezse odadaki biri “10 dakika daha uzatalım mı?”
            oylaması başlatabilir. Herkes evet derse oda 10 dakika daha devam eder. Bir kişi bile istemezse
            oda kapanır.
          </p>
          <div className="rules-list">
            <span>Herkes evet derse: +10 dakika</span>
            <span>1 kişi hayır derse: oda kapanır</span>
            <span>Maksimum uzatma: 3 kez</span>
            <span>Toplam maksimum süre: 40 dakika</span>
          </div>
        </div>
      </section>

      <section className="section-block connection-section">
        <div className="section-heading">
          <span>GÜVENLİ BAĞLANTI</span>
          <h2>Bazen 10 dakika bir arkadaşlığın başlangıcı olabilir.</h2>
        </div>
        <p className="wide-text">
          Oda bittiğinde Sevora sana “Bu odada sana iyi gelen biri oldu mu?” diye sorar. Eğer iki kişi
          birbirini seçerse, sistem güvenli bir bağlantı odası açar. Böylece güzel bir sohbetin önü kapanmaz
          ama kimse istemediği bir bağlantıya zorlanmaz.
        </p>
        <div className="flow-grid">
          <div>Anonim oda</div>
          <div>Bu kişi bana iyi geldi</div>
          <div>Karşılıklı seçim</div>
          <div>24 saatlik güvenli bağlantı</div>
        </div>
      </section>

      <section className="section-block safety-section">
        <div className="section-heading">
          <span>GÜVENLİK</span>
          <h2>Anonim ama başıboş değil.</h2>
        </div>
        <div className="feature-grid">
          <article>
            <h3>Şikayet ve engelleme</h3>
            <p>Her odada görünür çıkış, şikayet ve engelleme seçenekleri bulunur.</p>
          </article>
          <article>
            <h3>Kişisel bilgi koruması</h3>
            <p>Oda içinde telefon, adres ve sosyal medya baskısı gibi riskli davranışlar engellenir.</p>
          </article>
          <article>
            <h3>Karşılıklı onay</h3>
            <p>Özel bağlantı sadece iki kişinin de açık rızasıyla başlar.</p>
          </article>
        </div>
        <p className="safety-note">
          Sevora profesyonel psikolojik destek yerine geçmez. Ama insanların kısa süreli, güvenli ve
          insani bir temas kurmasına yardımcı olmayı hedefler.
        </p>
      </section>

      <section className="section-block roadmap-section">
        <div className="section-heading">
          <span>ROADMAP</span>
          <h2>Sevora adım adım açılıyor.</h2>
        </div>
        <div className="roadmap-list">
          {roadmap.map(([phase, title, text]) => (
            <article key={phase}>
              <span>{phase}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block waitlist-section" id="waitlist">
        <div className="waitlist-card">
          <div>
            <div className="section-heading align-left">
              <span>ERKEN ERİŞİM</span>
              <h2>Sevora ilk kullanıcılarını bekliyor.</h2>
            </div>
            <p>
              Sevora şu anda private preview aşamasında. İlk sürüm hazır olduğunda, bekleme listesine
              katılan kullanıcılar yeni deneyimi ilk kullanan kişiler arasında olacak.
            </p>
          </div>
          <WaitlistForm />
        </div>
      </section>

      <footer className="site-footer">
        <strong>SEVORA</strong>
        <span>Short, safe and anonymous mood-based rooms.</span>
      </footer>

      <a className="mobile-sticky" href="#waitlist">Erken erişime katıl</a>
    </main>
  );
}
