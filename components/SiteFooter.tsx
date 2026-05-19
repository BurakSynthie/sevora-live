"use client";

const legalLinks = [
  "Hakkımızda",
  "İletişim",
  "Kullanıcı Sözleşmesi",
  "KVKK",
  "Gizlilik Politikası",
  "Çerez Politikası",
];

const paymentMethods = ["Visa", "Mastercard", "American Express", "Troy"];

function MiniIcon({ label }: { label: string }) {
  return <span className="footerMiniIcon">{label}</span>;
}

export default function SiteFooter() {
  return (
    <footer className="siteFooter" id="contact">
      <div className="footerGlow" />

      <div className="footerTop">
        <div className="footerBrand">
          <div className="footerLogo">
            <span>S</span>
          </div>

          <div>
            <strong>SEVORA</strong>
            <p>
              AI-supported real-time city life assistant. Private preview is
              currently in development.
            </p>
          </div>
        </div>

        <div className="footerContactGrid">
          <a href="mailto:sevora.live@gmail.com" className="footerContactCard">
            <MiniIcon label="@" />
            <span>Email</span>
            <strong>sevora.live@gmail.com</strong>
          </a>

          <a
            href="https://www.instagram.com/sevora.live"
            target="_blank"
            rel="noreferrer"
            className="footerContactCard"
          >
            <MiniIcon label="IG" />
            <span>Instagram</span>
            <strong>@sevora.live</strong>
          </a>

          <a href="tel:+905317234801" className="footerContactCard">
            <MiniIcon label="☎" />
            <span>Phone</span>
            <strong>0531 723 48 01</strong>
          </a>

          <a href="https://sevora.live" className="footerContactCard">
            <MiniIcon label="WWW" />
            <span>Website</span>
            <strong>sevora.live</strong>
          </a>
        </div>
      </div>

      <div className="footerMiddle">
        <div className="footerColumn">
          <h3>
            <MiniIcon label="DOC" />
            Legal & Company
          </h3>

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
          <h3>
            <MiniIcon label="PAY" />
            Payment Methods
          </h3>

          <p className="footerHint">
            Payment infrastructure will be activated after private preview.
            Brand marks below are shown as supported payment method placeholders.
          </p>

          <div className="paymentGrid">
            {paymentMethods.map((method) => (
              <span className="paymentBadge" key={method}>
                {method}
              </span>
            ))}
          </div>
        </div>

        <div className="footerColumn">
          <h3>
            <MiniIcon label="OK" />
            Preview Notice
          </h3>

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
