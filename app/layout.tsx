import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "דורון אדמוני · הצגות ותאריכים",
  description: "דורון אדמוני – שחקן. לוח ההופעות הקרובות: מיקה שלי, בילי שוורץ, היומן. בחרו הצגה, תאריך – ולכרטיסים.",
  openGraph: {
    title: "דורון אדמוני · הצגות ותאריכים",
    description: "על הבמה עכשיו – מיקה שלי, בילי שוורץ, היומן.",
    locale: "he_IL",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0b0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body>{children}</body>
    </html>
  );
}
