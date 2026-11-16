import type { Metadata } from "next";
import About from "@/_views/About";
import JsonLd from "@/components/JsonLd";
import { HOME_CRUMB, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "О компании BENKAM — Производитель алюминиевых профилей в Центральной Азии",
  description:
    "BENKAM / AKFA INNOVATION — единственный крупный производитель алюминиевых профилей в Центральной Азии. Основан в 2016. ISO 9001:2015. СЭЗ Навои, Узбекистан. Экспорт в Европу и СНГ.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([HOME_CRUMB, { name: "О нас", path: "/about" }])} />
      <About />
    </>
  );
}
