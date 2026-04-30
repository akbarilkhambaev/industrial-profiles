import type { Metadata } from "next";
import About from "@/_views/About";

export const metadata: Metadata = {
  title: "О компании BENKAM — Производитель алюминиевых профилей в Центральной Азии",
  description:
    "BENKAM / AKFA INNOVATION — единственный крупный производитель алюминиевых профилей в Центральной Азии. Основан в 2016. ISO 9001:2015. СЭЗ Навои, Узбекистан. Экспорт в Европу и СНГ.",
  alternates: { canonical: "/about" },
  openGraph: { url: "https://akfainnovation.uz/about" },
};

export default About;
