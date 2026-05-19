import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEVORA — Feel the city live",
  description:
    "AI-supported real-time city life assistant with live city pulse, calm place radar, user reports and smart recommendations.",
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
