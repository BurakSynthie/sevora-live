"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function WaitlistForm() {
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
      setMessage("Lütfen geçerli bir e-posta adresi yaz.");
      return;
    }

    setStatus("loading");
    setMessage("");

    const { error } = await supabase.from("waitlist").insert({
      name: name.trim() || null,
      email: cleanEmail,
      reason: reason.trim() || null,
      source: "sevora.live",
    });

    if (error) {
      setStatus("error");
      setMessage("Kayıt sırasında bir sorun oluştu. Lütfen tekrar dene.");
      return;
    }

    setStatus("success");
    setMessage("Harika. Sevora erken erişim listesine eklendin.");
    setName("");
    setEmail("");
    setReason("");
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">İsim</label>
        <input
          id="name"
          type="text"
          placeholder="İsmin"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-row">
        <label htmlFor="email">E-posta</label>
        <input
          id="email"
          type="email"
          placeholder="ornek@mail.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="reason">Sevora’yı neden kullanmak istersin?</label>
        <textarea
          id="reason"
          placeholder="İstersen kısaca yaz..."
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          rows={4}
        />
      </div>

      <button className="primary-button full-button" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Kaydediliyor..." : "Erken erişime katıl"}
      </button>

      {message && (
        <p className={`form-message ${status === "success" ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
