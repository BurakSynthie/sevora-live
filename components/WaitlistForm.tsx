"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Lang = "tr" | "en";

const copy = {
  tr: {
    name: "İsim",
    namePlaceholder: "İsmin",
    email: "E-posta",
    emailPlaceholder: "ornek@mail.com",
    reason: "Sevora’yı neden kullanmak istersin?",
    reasonPlaceholder: "İstersen kısaca yaz...",
    button: "Erken erişime katıl",
    loading: "Kaydediliyor...",
    invalidEmail: "Lütfen geçerli bir e-posta adresi yaz.",
    success: "Harika. Sevora erken erişim listesine eklendin.",
    error: "Kayıt sırasında bir sorun oluştu. Lütfen tekrar dene.",
  },
  en: {
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "name@mail.com",
    reason: "Why would you like to use Sevora?",
    reasonPlaceholder: "Write a short note if you want...",
    button: "Join early access",
    loading: "Saving...",
    invalidEmail: "Please enter a valid email address.",
    success: "Great. You have joined the Sevora early access list.",
    error: "Something went wrong while saving. Please try again.",
  },
};

export default function WaitlistForm({ lang = "tr" }: { lang?: Lang }) {
  const t = copy[lang];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setStatus("error");
      setMessage(t.invalidEmail);
      return;
    }

    setStatus("loading");
    setMessage("");

    const { error } = await supabase.from("waitlist").insert({
      name: name.trim() || null,
      email: cleanEmail,
      reason: reason.trim() || null,
      source: `sevora.live-${lang}`,
    });

    if (error) {
      setStatus("error");
      setMessage(t.error);
      return;
    }

    setStatus("success");
    setMessage(t.success);
    setName("");
    setEmail("");
    setReason("");
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">{t.name}</label>
        <input
          id="name"
          type="text"
          placeholder={t.namePlaceholder}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-row">
        <label htmlFor="email">{t.email}</label>
        <input
          id="email"
          type="email"
          placeholder={t.emailPlaceholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="reason">{t.reason}</label>
        <textarea
          id="reason"
          placeholder={t.reasonPlaceholder}
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          rows={4}
        />
      </div>

      <button
        className="primary-button full-button"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? t.loading : t.button}
      </button>

      {message && (
        <p className={`form-message ${status === "success" ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
