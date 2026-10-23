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
  "بكل الحب والفرح، يتشرف السيد أحمد محمد الغول والسيد موسى يوسف العمراني بدعوتكم لحضور حفل زفاف م. أسامة و أ. رُبا 💍 " +
  "يوم الخميس الموافق 29 / 10 / 2026 بعد صلاة العصر، في صالة بيت الأناقة (Elegance House) — شارع عمر المختار خلف الإغاثة الطبية. " +
  "حضوركم يشرفنا ويزيد حفلنا بهجة وسروراً.";
// Shorter copy for link previews (WhatsApp shows ~2 lines).
const shareDescription =
  "💍 حفل زفاف م. أسامة و أ. رُبا — الخميس 29 / 10 / 2026 بعد صلاة العصر، صالة بيت الأناقة (Elegance House). حضوركم يشرفنا ويزيد حفلنا بهجة وسروراً.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "أفراح آل الغول",
  keywords: [
    "أفراح آل الغول",
    "دعوة زفاف",
    "حفل زفاف",
    "أسامة ورُبا",
    "أسامة الغول",
    "آل الغول",
    "آل العمراني",
    "صالة بيت الأناقة",
    "Elegance House",
    "wedding invitation",
  ],
  authors: [{ name: "آل الغول" }],
  creator: "آل الغول",
  category: "event",
  alternates: { canonical: "/" },
  // A private family invitation: shareable by link, but kept out of search engines.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: { capable: true, title: "زفاف أسامة ورُبا", statusBarStyle: "default" },
  openGraph: {
    type: "website",
    url: "/",
    locale: "ar_AR",
    siteName: "أفراح آل الغول",
    title,
    description: shareDescription,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: shareDescription,
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
