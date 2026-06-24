"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Profile = {
  id: string;
  visitor_id: string;
  nickname: string;
  mood_slug: string | null;
};

type Room = {
  id: string;
  title: string;
  room_type: string;
  mood_slug: string;
  description: string | null;
  status: string;
  max_members: number;
};

const nicknames = [
  "Mavi Bulut",
  "Sessiz Martı",
  "Gece Lambası",
  "Küçük Yıldız",
  "Sakin Panda",
  "Yumuşak Rüzgar",
  "Gümüş Ay",
  "Kayıp Balon",
  "Derin Deniz",
  "Sıcak Çay",
];

const moods = [
  {
    name: "Yalnızım",
    slug: "yalnizim",
    text: "Yumuşak, sakin ve yargılamayan odalar önerilir.",
  },
  {
    name: "Canım sıkıldı",
    slug: "canim-sikildi",
    text: "Kafa dağıtan, hafif ve eğlenceli odalar önerilir.",
  },
  {
    name: "Dertleşmek istiyorum",
    slug: "dertlesmek-istiyorum",
    text: "Anlatmak veya dinlenmek isteyenler için odalar önerilir.",
  },
  {
    name: "Kafamı dağıtmak istiyorum",
    slug: "kafami-dagitmak-istiyorum",
    text: "Mini sorular ve kısa sohbet başlatıcıları olan odalar önerilir.",
  },
  {
    name: "Sadece konuşmak istiyorum",
    slug: "sadece-konusmak-istiyorum",
    text: "Doğal ve gündelik sohbet odaları önerilir.",
  },
  {
    name: "Eğlenmek istiyorum",
    slug: "eglenmek-istiyorum",
    text: "Kısa oyunlar, absürt sorular ve eğlenceli odalar önerilir.",
  },
  {
    name: "Sessiz kalmak istiyorum",
    slug: "sessiz-kalmak-istiyorum",
    text: "Konuşmadan da aynı odada kalabileceğin sakin alanlar önerilir.",
  },
];

function getOrCreateVisitorId() {
  if (typeof window === "undefined") return "";

  const existing = window.localStorage.getItem("sevora_visitor_id");

  if (existing) {
    return existing;
  }

  const id = crypto.randomUUID();
  window.localStorage.setItem("sevora_visitor_id", id);
  return id;
}

function getRandomNickname() {
  return nicknames[Math.floor(Math.random() * nicknames.length)];
}

export default function SevoraAppPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedMood, setSelectedMood] = useState(moods[1]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [joinMessage, setJoinMessage] = useState("");

  const suggestedTitle = useMemo(() => {
    if (selectedMood.slug === "yalnizim") return "Bugün yanında biri olsun.";
    if (selectedMood.slug === "canim-sikildi") return "Birkaç dakikalığına kafanı dağıt.";
    if (selectedMood.slug === "dertlesmek-istiyorum") return "Anlatmak istersen bir oda var.";
    if (selectedMood.slug === "kafami-dagitmak-istiyorum") return "Ağır konular olmadan kısa bir mola.";
    if (selectedMood.slug === "sadece-konusmak-istiyorum") return "Sadece doğal bir sohbet.";
    if (selectedMood.slug === "eglenmek-istiyorum") return "Kısa ve eğlenceli bir oda seç.";
    return "Konuşmadan da burada olabilirsin.";
  }, [selectedMood.slug]);

  useEffect(() => {
    async function prepareProfile() {
      setLoadingProfile(true);

      const visitorId = getOrCreateVisitorId();

      const { data: existingProfile, error: selectError } = await supabase
        .from("profiles")
        .select("*")
        .eq("visitor_id", visitorId)
        .maybeSingle();

      if (selectError) {
        setLoadingProfile(false);
        return;
      }

      if (existingProfile) {
        setProfile(existingProfile);
        setLoadingProfile(false);
        return;
      }

      const nickname = getRandomNickname();

      const { data: newProfile, error: insertError } = await supabase
        .from("profiles")
        .insert({
          visitor_id: visitorId,
          nickname,
          mood_slug: selectedMood.slug,
        })
        .select("*")
        .single();

      if (!insertError && newProfile) {
        setProfile(newProfile);
      }

      setLoadingProfile(false);
    }

    prepareProfile();
  }, []);

  useEffect(() => {
    async function loadRooms() {
      setLoadingRooms(true);
      setJoinMessage("");

      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("mood_slug", selectedMood.slug)
        .order("created_at", { ascending: true });

      if (!error && data) {
        setRooms(data);
      } else {
        setRooms([]);
      }

      if (profile) {
        await supabase
          .from("profiles")
          .update({
            mood_slug: selectedMood.slug,
            last_seen_at: new Date().toISOString(),
          })
          .eq("id", profile.id);
      }

      setLoadingRooms(false);
    }

    loadRooms();
  }, [selectedMood.slug, profile?.id]);

  async function joinRoom(room: Room) {
    if (!profile) {
      setJoinMessage("Profil hazırlanıyor. Birkaç saniye sonra tekrar dene.");
      return;
    }

    setJoinMessage("");

    const { error } = await supabase.from("room_members").upsert({
      room_id: room.id,
      profile_id: profile.id,
      nickname: profile.nickname,
      is_active: true,
      left_at: null,
    });

    if (error) {
      setJoinMessage("Odaya katılırken bir sorun oluştu. Lütfen tekrar dene.");
      return;
    }

    setJoinMessage(
      `"${room.title}" odasına katıldın. Bir sonraki adımda burası gerçek sohbet ekranına açılacak.`
    );
  }

  return (
    <main className="app-page">
      <section className="app-shell">
        <header className="app-header">
          <a className="app-brand" href="/">
            <span>S</span>
            SEVORA
          </a>

          <div className="app-profile-pill">
            <small>Anonim profil</small>
            <strong>{loadingProfile ? "Hazırlanıyor..." : profile?.nickname}</strong>
          </div>
        </header>

        <div className="app-hero">
          <div>
            <span className="app-eyebrow">SEVORA APP PREVIEW</span>
            <h1>Şu an nasıl hissediyorsun?</h1>
            <p>
              Modunu seç. Sevora sana o ruh haline uygun kısa ve anonim odaları
              göstersin.
            </p>
          </div>

          <div className="app-status-card">
            <span>Private Preview</span>
            <strong>{suggestedTitle}</strong>
            <p>{selectedMood.text}</p>
          </div>
        </div>

        <div className="app-layout">
          <aside className="mood-panel">
            <h2>Modunu seç</h2>

            <div className="app-mood-list">
              {moods.map((mood) => (
                <button
                  key={mood.slug}
                  type="button"
                  className={selectedMood.slug === mood.slug ? "active" : ""}
                  onClick={() => setSelectedMood(mood)}
                >
                  <strong>{mood.name}</strong>
                  <span>{mood.text}</span>
                </button>
              ))}
            </div>
          </aside>

          <section className="rooms-panel">
            <div className="rooms-panel-head">
              <div>
                <span>Önerilen odalar</span>
                <h2>{selectedMood.name}</h2>
              </div>

              <div className="room-count">
                {loadingRooms ? "Yükleniyor..." : `${rooms.length} oda`}
              </div>
            </div>

            {joinMessage && <div className="join-message">{joinMessage}</div>}

            <div className="app-room-grid">
              {rooms.map((room) => (
                <article className="app-room-card" key={room.id}>
                  <div>
                    <span className="room-type">{room.room_type}</span>
                    <h3>{room.title}</h3>
                    <p>{room.description}</p>
                  </div>

                  <div className="room-meta-row">
                    <span>10 dk</span>
                    <span>2-{room.max_members} kişi</span>
                    <span>Anonim</span>
                  </div>

                  <button type="button" onClick={() => joinRoom(room)}>
                    Odaya katıl
                  </button>
                </article>
              ))}

              {!loadingRooms && rooms.length === 0 && (
                <div className="empty-rooms">
                  Bu moda uygun oda henüz yok. İleride sistem otomatik oda
                  oluşturacak.
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
