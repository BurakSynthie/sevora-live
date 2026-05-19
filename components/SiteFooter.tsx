"use client";

const legalLinks = [
  "Hakkımızda",
  "İletişim",
  "Kullanıcı Sözleşmesi",
  "KVKK",
  "Gizlilik Politikası",
  "Çerez Politikası",
];

const paymentMethods = [
  { name: "Visa", src: "/assets/payments/visa.svg" },
  { name: "Mastercard", src: "/assets/payments/mastercard.svg" },
  { name: "American Express", src: "/assets/payments/amex.svg" },
  { name: "Troy", src: "/assets/payments/troy.svg" },
];

const contacts = [
  { name: "Mail", href: "mailto:sevora.live@gmail.com", src: "/assets/social/mail.svg", value: "sevora.live@gmail.com" },
  { name: "Instagram", href: "https://www.instagram.com/sevora.live", src: "/assets/social/instagram.svg", value: "@sevora.live" },
  { name: "Phone", href: "tel:+905317234801", src: "/assets/social/phone.svg", value: "0531 723 48 01" },
  { name: "Website", href: "https://sevora.live", src: "/assets/social/website.svg", value: "sevora.live" },
];

export default function SiteFooter() {
  return (
    <footer className="siteFooter siteFooterV2" id="contact">
      <div className="footerGlow" />

      <div className="footerTop">
        <div className="footerBrand">
          <img className="footerRealLogo" src="/assets/brand/sevora-s-mark.svg" alt="SEVORA" />

          <div>
            <strong>SEVORA</strong>
            <p>
              AI-supported real-time city life assistant. Private preview is
              currently in development.
            </p>

            <div className="storeBadges">
              <button type="button" aria-label="Download on the App Store">
                <img src="/assets/stores/app-store.svg" alt="Download on the App Store" />
              </button>

              <button type="button" aria-label="Get it on Google Play">
                <img src="/assets/stores/google-play.svg" alt="Get it on Google Play" />
              </button>
            </div>
          </div>
        </div>

        <div className="footerIconContactGrid">
          {contacts.map((item) => (
            <a
              href={item.href}
              key={item.name}
              target={item.name === "Instagram" || item.name === "Website" ? "_blank" : undefined}
              rel={item.name === "Instagram" || item.name === "Website" ? "noreferrer" : undefined}
              className="footerIconContactCard"
              title={item.value}
            >
              <img src={item.src} alt={item.name} />
              <span>{item.value}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="footerMiddle">
        <div className="footerColumn">
          <h3>Legal & Company</h3>

          <div className="footerLinks">
            {legalLinks.map((item) => (
              <a href="#" key={item}>
                {item}
                <span>↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="footerColumn">
          <h3>Payment Methods</h3>

          <p className="footerHint">
            Payment infrastructure will be activated after private preview.
          </p>

          <div className="realPaymentGrid">
            {paymentMethods.map((method) => (
              <img key={method.name} src={method.src} alt={method.name} />
            ))}
          </div>
        </div>

        <div className="footerColumn">
          <h3>Preview Notice</h3>

          <p className="footerHint">
            SEVORA is currently in private development. Live data, AI
            recommendations and payment flows are demo-based until launch.
          </p>

          <div className="footerStatus">
            <span />
            Private Preview Active
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <span>© 2026 SEVORA. All rights reserved.</span>
        <span>Built for sevora.live</span>
      </div>
    </footer>
  );
}
