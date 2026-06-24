"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";

type Profile = {
  id: string;
  visitor_id: string;
  nickname: string;
};

type Room = {
  id: string;
  title: string;
  room_type: string;
  mood_slug: string;
  description: string | null;
  status: string;
  max_members: number;
  started_at: string | null;
  ends_at: string | null;
  extension_count: number;
};

type Member = {
  id: string;
  room_id: string;
  profile_id: string;
  nickname: string;
  is_active: boolean;
  joined_at: string;
  left_at: string | null;
};

type Message = {
  id: string;
  room_id: string;
  profile_id: string;
  nickname: string;
  body: string;
  is_system: boolean;
  created_at: string;
};

function getVisitorId() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem("sevora_visitor_id") || "";
}

function formatTime(seconds: number) {
  const safe = Math.max(0, seconds);
  const min = Math.floor(safe / 60);
  const sec = safe % 60;

  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function SevoraRoomPage() {
  const params = useParams();
  const router = useRouter();

  const roomId = String(params.id);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageBody, setMessageBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(600);

  const activeMembers = useMemo(() => {
    return members.filter((member) => member.is_active);
  }, [members]);

  useEffect(() => {
    async function bootRoom() {
      setLoading(true);

      const visitorId = getVisitorId();

      if (!visitorId) {
        router.push("/app");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("visitor_id", visitorId)
        .maybeSingle();

      if (!profileData) {
        router.push("/app");
        return;
      }

      setProfile(profileData);

      const { data: roomData } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", roomId)
        .maybeSingle();

      if (!roomData) {
        setNotice("Oda bulunamadı. Ana ekrana dönüp tekrar oda seçebilirsin.");
        setLoading(false);
        return;
      }

      setRoom(roomData);

      await supabase.from("room_members").upsert({
        room_id: roomId,
        profile_id: profileData.id,
        nickname: profileData.nickname,
        is_active: true,
        left_at: null,
      });

      if (!roomData.started_at || !roomData.ends_at) {
        const startedAt = new Date();
        const endsAt = new Date(startedAt.getTime() + 10 * 60 * 1000);

        const { data: updatedRoom } = await supabase
          .from("rooms")
          .update({
            status: "active",
            started_at: startedAt.toISOString(),
            ends_at: endsAt.toISOString(),
          })
          .eq("id", roomId)
          .select("*")
          .single();

        if (updatedRoom) {
          setRoom(updatedRoom);
        }
      }

      const { data: memberData } = await supabase
        .from("room_members")
        .select("*")
        .eq("room_id", roomId)
        .order("joined_at", { ascending: true });

      if (memberData) {
        setMembers(memberData);
      }

      const { data: messageData } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", roomId)
        .eq("is_deleted", false)
        .order("created_at", { ascending: true });

      if (messageData) {
        setMessages(messageData);
      }

      const systemMessageExists = messageData?.some(
        (message) => message.is_system && message.body.includes("Bu oda 10 dakika")
      );

      if (!systemMessageExists) {
        await supabase.from("messages").insert({
          room_id: roomId,
          profile_id: profileData.id,
          nickname: "Sevora",
          body:
            "Bu oda 10 dakika sürecek. Kişisel bilgi paylaşma, rahatsız olursan odadan çıkabilir veya şikayet edebilirsin.",
          is_system: true,
        });

        const { data: refreshedMessages } = await supabase
          .from("messages")
          .select("*")
          .eq("room_id", roomId)
          .eq("is_deleted", false)
          .order("created_at", { ascending: true });

        if (refreshedMessages) {
          setMessages(refreshedMessages);
        }
      }

      setLoading(false);
    }

    bootRoom();
  }, [roomId, router]);

  useEffect(() => {
    if (!room?.ends_at) return;

    function tick() {
      const end = new Date(room.ends_at as string).getTime();
      const now = Date.now();
      const diff = Math.ceil((end - now) / 1000);

      setSecondsLeft(Math.max(0, diff));
    }

    tick();

    const timer = setInterval(tick, 1000);

    return () => clearInterval(timer);
  }, [room?.ends_at]);

  useEffect(() => {
    const memberChannel = supabase
      .channel(`room-members-${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "room_members",
          filter: `room_id=eq.${roomId}`,
        },
        async () => {
          const { data } = await supabase
            .from("room_members")
            .select("*")
            .eq("room_id", roomId)
            .order("joined_at", { ascending: true });

          if (data) {
            setMembers(data);
          }
        }
      )
      .subscribe();

    const messageChannel = supabase
      .channel(`room-messages-${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${roomId}`,
        },
        async () => {
          const { data } = await supabase
            .from("messages")
            .select("*")
            .eq("room_id", roomId)
            .eq("is_deleted", false)
            .order("created_at", { ascending: true });

          if (data) {
            setMessages(data);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(memberChannel);
      supabase.removeChannel(messageChannel);
    };
  }, [roomId]);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!profile || !messageBody.trim()) return;

    setSending(true);

    const { error } = await supabase.from("messages").insert({
      room_id: roomId,
      profile_id: profile.id,
      nickname: profile.nickname,
      body: messageBody.trim(),
      is_system: false,
    });

    if (error) {
      setNotice("Mesaj gönderilirken bir sorun oluştu. Tekrar dene.");
    } else {
      setMessageBody("");
    }

    setSending(false);
  }

  async function leaveRoom() {
    if (profile) {
      await supabase
        .from("room_members")
        .update({
          is_active: false,
          left_at: new Date().toISOString(),
        })
        .eq("room_id", roomId)
        .eq("profile_id", profile.id);
    }

    router.push("/app");
  }

  if (loading) {
    return (
      <main className="room-page">
        <div className="room-loading-card">
          <span>SEVORA</span>
          <h1>Oda hazırlanıyor...</h1>
          <p>Anonim profilin ve oda bilgileri yükleniyor.</p>
        </div>
      </main>
    );
  }

  if (!room) {
    return (
      <main className="room-page">
        <div className="room-loading-card">
          <span>SEVORA</span>
          <h1>Oda bulunamadı</h1>
          <p>{notice}</p>
          <button type="button" onClick={() => router.push("/app")}>
            Uygulamaya dön
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="room-page">
      <section className="room-shell">
        <header className="room-header">
          <a className="app-brand" href="/app">
            <span>S</span>
            SEVORA
          </a>

          <div className="room-header-actions">
            <div className="room-timer">
              <small>Kalan süre</small>
              <strong>{formatTime(secondsLeft)}</strong>
            </div>

            <button type="button" className="leave-room-button" onClick={leaveRoom}>
              Odadan çık
            </button>
          </div>
        </header>

        <div className="room-main-layout">
          <aside className="room-info-panel">
            <span className="room-type-label">{room.room_type}</span>
            <h1>{room.title}</h1>
            <p>{room.description}</p>

            <div className="room-info-stats">
              <div>
                <small>Durum</small>
                <strong>{room.status}</strong>
              </div>
              <div>
                <small>Kişi</small>
                <strong>
                  {activeMembers.length}/{room.max_members}
                </strong>
              </div>
              <div>
                <small>Uzatma</small>
                <strong>{room.extension_count}/3</strong>
              </div>
            </div>

            <div className="member-list-card">
              <h2>Odada kimler var?</h2>

              <div className="member-list">
                {activeMembers.map((member) => (
                  <div key={member.id}>
                    <span>{member.nickname.slice(0, 1)}</span>
                    <strong>{member.nickname}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="room-safety-card">
              <strong>Güvenlik notu</strong>
              <p>
                Telefon, adres, sosyal medya veya özel bilgi paylaşma. Rahatsız
                olursan odadan çık.
              </p>
            </div>
          </aside>

          <section className="chat-panel">
            <div className="chat-panel-head">
              <div>
                <span>Anonim oda</span>
                <h2>{room.title}</h2>
              </div>
              <div className="chat-profile-pill">
                {profile?.nickname}
              </div>
            </div>

            {notice && <div className="join-message">{notice}</div>}

            <div className="message-list">
              {messages.map((message) => {
                const mine = message.profile_id === profile?.id && !message.is_system;

                return (
                  <article
                    key={message.id}
                    className={
                      message.is_system
                        ? "message-card system"
                        : mine
                        ? "message-card mine"
                        : "message-card"
                    }
                  >
                    <small>{message.nickname}</small>
                    <p>{message.body}</p>
                  </article>
                );
              })}
            </div>

            <form className="message-form" onSubmit={sendMessage}>
              <input
                value={messageBody}
                onChange={(event) => setMessageBody(event.target.value)}
                placeholder="Mesaj yaz..."
                maxLength={500}
              />
              <button type="submit" disabled={sending || !messageBody.trim()}>
                {sending ? "..." : "Gönder"}
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}
