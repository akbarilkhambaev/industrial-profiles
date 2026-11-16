import type { Metadata } from "next";
import Products from "@/_views/Products";
import JsonLd from "@/components/JsonLd";
import { HOME_CRUMB, PRODUCTS_CRUMB, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Каталог алюминиевых профилей — Ташкент, Узбекистан",
  description:
    "Каталог алюминиевых профилей AKFA INNOVATION: промышленные, конструкционные, фасадные, транспортные, солнечные профили и ЧПУ детали. Производство в Узбекистане, экспорт по всему миру.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([HOME_CRUMB, PRODUCTS_CRUMB])} />
      <Products />
    </>
  );
}
