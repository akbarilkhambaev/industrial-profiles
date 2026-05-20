import type { Metadata } from "next";
import { products } from "@/lib/products";
import ProductDetail from "@/_views/ProductDetail";

const productNames: Record<string, string> = {
  "custom-industrial": "Промышленные профили на заказ",
  "solar-panels": "Солнечные панели",
  "vent-fasad": "BKV 47 — Вент-фасадная система (НВФ)",
  "transport-automotive": "Транспортные и автомобильные профили",
  "solar-mounting": "Системы крепления солнечных панелей",
  "cnc-parts": "Детали с ЧПУ обработкой",
};

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  const name = productNames[id] ?? "Алюминиевый профиль";

  return {
    title: `${name} — Алюминиевый профиль, Ташкент`,
    description: product
      ? `${name}. Сплав: ${product.alloy}. Допуск: ${product.tolerance}. Производство в Узбекистане, экспорт по всему миру. AKFA INNOVATION / BENKAM.`
      : "Алюминиевый профиль на заказ. Производство в Ташкенте, Узбекистан.",
    alternates: { canonical: `/products/${id}` },
    openGraph: {
      url: `https://akfainnovation.uz/products/${id}`,
      title: `${name} — AKFA INNOVATION`,
    },
  };
}

export default ProductDetail;
