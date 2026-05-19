import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEVORA | Real-Time City Life Assistant",
  description:
    "AI-supported real-time city life assistant with live signals, calm places, events, parking and business visibility.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "SEVORA",
    description: "The city is already moving. SEVORA is learning.",
    url: "https://sevora.live",
    siteName: "SEVORA",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEVORA",
    description: "AI-supported real-time city life assistant.",
  },
};

export const viewport = {
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
