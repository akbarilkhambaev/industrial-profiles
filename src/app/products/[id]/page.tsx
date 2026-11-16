import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import ProductDetail from "@/_views/ProductDetail";
import JsonLd from "@/components/JsonLd";
import {
  HOME_CRUMB,
  PRODUCTS_CRUMB,
  absoluteUrl,
  breadcrumbJsonLd,
  pageMetadata,
} from "@/lib/seo";

/** Уникальные name/description для каждого продукта (description — 140–160 символов, с «Ташкент»). */
const productSeo: Record<string, { name: string; description: string }> = {
  "custom-industrial": {
    name: "Промышленные профили на заказ",
    description:
      "Промышленные алюминиевые профили на заказ в Ташкенте: экструзия сложных сечений по вашим чертежам, сплавы 6063-T5 и 6061-T6, допуск ±0,1 мм, ЧПУ-обработка.",
  },
  "solar-panels": {
    name: "Солнечные панели",
    description:
      "Алюминиевые профили для солнечных панелей в Ташкенте: рамки и монтажные системы для фотоэлектрических модулей, сплав 6005A-T5, анодирование, резка в размер.",
  },
  "vent-fasad": {
    name: "BKV 47 — Вент-фасадная система (НВФ)",
    description:
      "Вентфасадная система BKV 47 (НВФ) в Ташкенте: алюминиевый каркас под керамогранит, HPL и фиброцемент. Порошковая покраска по RAL, анодирование, резка на ЧПУ.",
  },
};

type Params = { params: Promise<{ id: string }> };

// Любой id вне списка продуктов отдаёт настоящий 404, а не страницу «Product not found» с кодом 200.
export const dynamicParams = false;

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

function getProduct(id: string) {
  const product = products.find((p) => p.id === id);
  const seo = productSeo[id];
  return product && seo ? { product, seo } : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const found = getProduct(id);
  if (!found) notFound();

  return pageMetadata({
    title: `${found.seo.name} — Алюминиевый профиль, Ташкент`,
    description: found.seo.description,
    path: `/products/${id}`,
  });
}

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const found = getProduct(id);
  if (!found) notFound();

  const { product, seo } = found;
  const path = `/products/${id}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: seo.name,
    description: seo.description,
    url: absoluteUrl(path),
    image: product.gallery.map((src) => absoluteUrl(src)),
    material: product.alloy,
    brand: { "@type": "Brand", name: "AKFA INNOVATION / BENKAM" },
    manufacturer: {
      "@type": "Organization",
      name: "BENKAM",
      address: { "@type": "PostalAddress", addressCountry: "UZ", addressLocality: "Навои" },
    },
    // offers не указываем: цен на сайте нет (цена по запросу), а Offer без price Google считает ошибкой.
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd([HOME_CRUMB, PRODUCTS_CRUMB, { name: seo.name, path }])} />
      <ProductDetail />
    </>
  );
}
