import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pendekin URL - Link Shortener Cepat & Gratis",
  description: "Alat untuk memendekkan URL panjang menjadi link pendek yang rapi. Cocok untuk media sosial, blog, dan bisnis Anda.",
  keywords: ["link shortener", "pendekin url", "short link", "pemendek link", "url pendek"],
  authors: [{ name: "Kofi" }],
  openGraph: {
    title: "Pendekin URL - Link Shortener Cepat & Gratis",
    description: "Alat untuk memendekkan URL panjang menjadi link pendek yang rapi.",
    url: "https://uslex.vercel.app",
    siteName: "Pendekin URL",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pendekin URL - Link Shortener",
    description: "Alat untuk memendekkan URL panjang menjadi link pendek yang rapi.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
