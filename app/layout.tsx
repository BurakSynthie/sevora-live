import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEVORA — Feel the city live",
  description:
    "AI-supported real-time city life assistant with live city pulse, events, calm places and business visibility.",
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
