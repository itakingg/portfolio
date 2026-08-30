import type { Metadata } from "next";
import "./globals.css";

// UBAH BAGIAN INI
export const metadata: Metadata = {
  title: "Adi Pramana Putra — Fullstack & Creative Developer",
  description: "Portfolio Adi Pramana Putra. Menerima proyek freelance web development, aplikasi Laravel, dan Javascript",
  icons: {
    icon: "/profile.webp", // Menggunakan foto profil milikmu sebagai favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}