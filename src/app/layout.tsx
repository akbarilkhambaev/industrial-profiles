import type { Metadata } from "next";
import "../index.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "AKFA INNOVATION — Алюминиевые профили в Ташкенте | Экструзия на заказ",
    template: "%s | AKFA INNOVATION",
  },
  description:
    "Производство алюминиевых профилей в Ташкенте, Узбекистан. Экструзия на заказ, фасадные, конструкционные, транспортные профили. Экспорт в 30+ стран. ISO 9001. BENKAM — лидер в Центральной Азии.",
  keywords: [
    "алюминиевый профиль Ташкент",
    "алюминий профиль Узбекистан",
    "алюминиевая экструзия",
    "алюминиевый профиль на заказ",
    "фасадный профиль",
    "конструкционный профиль",
    "aluminum profile Tashkent",
    "aluminum extrusion Uzbekistan",
    "BENKAM",
    "AKFA INNOVATION",
  ],
  authors: [{ name: "AKFA INNOVATION / BENKAM" }],
  metadataBase: new URL("https://akfainnovation.uz"),
  alternates: {
    canonical: "/",
    languages: { ru: "/", en: "/" },
  },
  openGraph: {
    type: "website",
    siteName: "AKFA INNOVATION",
    title: "AKFA INNOVATION — Алюминиевые профили | Ташкент, Узбекистан",
    description:
      "Производство алюминиевых профилей в Ташкенте. Экструзия на заказ, CNC обработка, анодирование, порошковая покраска. Экспорт в 30+ стран.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "ru_UZ",
  },
  twitter: {
    card: "summary_large_image",
    site: "@AKFA_INNOVATION",
    title: "AKFA INNOVATION — Алюминиевые профили, Ташкент",
    description: "Производство алюминиевых профилей на заказ. Экструзия, CNC, анодирование. Узбекистан, экспорт в 30+ стран.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
