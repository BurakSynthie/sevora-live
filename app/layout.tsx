import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sevora — Mood-Based Social Rooms",
  description:
    "Sevora connects people through short, safe and anonymous mood-based chat rooms.",
  keywords: [
    "Sevora",
    "anonymous chat",
    "mood rooms",
    "safe social rooms",
    "private preview",
    "short conversations",
  ],
  openGraph: {
    title: "Sevora — Mood-Based Social Rooms",
    description:
      "Short, safe and anonymous rooms for people who want to talk, feel heard or simply not feel alone.",
    url: "https://sevora.live",
    siteName: "Sevora",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sevora — Mood-Based Social Rooms",
    description:
      "Short, safe and anonymous rooms for people who want to talk, feel heard or simply not feel alone.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
