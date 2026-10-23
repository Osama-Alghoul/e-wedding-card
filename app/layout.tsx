import type { Metadata, Viewport } from "next";
import { Amiri_Quran, Aref_Ruqaa, Tajawal } from "next/font/google";
import "./globals.css";

const display = Aref_Ruqaa({
  variable: "--font-display",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const quran = Amiri_Quran({
  variable: "--font-quran",
  subsets: ["arabic"],
  weight: "400",
});

const body = Tajawal({
  variable: "--font-body",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});

// Absolute URLs are required for the OG image to show in WhatsApp & co.
// Set NEXT_PUBLIC_SITE_URL to the final domain (Vercel's production URL is used otherwise).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "أفراح آل الغول | م. أسامة ♥ أ. رُبا";
const description =
  "يتشرف السيد أحمد محمد الغول والسيد موسى يوسف العمراني بدعوتكم لحضور حفل زفاف م. أسامة و أ. رُبا — يوم الخميس 29 / 10 / 2026 بعد صلاة العصر، صالة بيت الأناقة.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: "website",
    locale: "ar_AR",
    siteName: "أفراح آل الغول",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF8EC",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${display.variable} ${quran.variable} ${body.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
