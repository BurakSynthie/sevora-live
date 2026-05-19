"use client";

import {
  Instagram,
  Mail,
  Phone,
  ShieldCheck,
  Globe2,
  FileText,
  CreditCard,
  ExternalLink,
} from "lucide-react";

const legalLinks = [
  "Hakkımızda",
  "İletişim",
  "Kullanıcı Sözleşmesi",
  "KVKK",
  "Gizlilik Politikası",
  "Çerez Politikası",
];

const paymentMethods = ["Visa", "Mastercard", "American Express", "Troy"];

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
            <Mail size={20} />
            <span>Email</span>
            <strong>sevora.live@gmail.com</strong>
          </a>

          <a
            href="https://www.instagram.com/sevora.live"
            target="_blank"
            rel="noreferrer"
            className="footerContactCard"
          >
            <Instagram size={20} />
            <span>Instagram</span>
            <strong>@sevora.live</strong>
          </a>

          <a href="tel:+905317234801" className="footerContactCard">
            <Phone size={20} />
            <span>Phone</span>
            <strong>0531 723 48 01</strong>
          </a>

          <a href="https://sevora.live" className="footerContactCard">
            <Globe2 size={20} />
            <span>Website</span>
            <strong>sevora.live</strong>
          </a>
        </div>
      </div>

      <div className="footerMiddle">
        <div className="footerColumn">
          <h3>
            <FileText size={18} />
            Legal & Company
          </h3>

          <div className="footerLinks">
            {legalLinks.map((item) => (
              <a href="#" key={item}>
                {item}
                <ExternalLink size={13} />
              </a>
            ))}
          </div>
        </div>

        <div className="footerColumn">
          <h3>
            <CreditCard size={18} />
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
            <ShieldCheck size={18} />
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
