import type { Metadata } from "next";
import Products from "@/_views/Products";

export const metadata: Metadata = {
  title: "Каталог алюминиевых профилей — Ташкент, Узбекистан",
  description:
    "Каталог алюминиевых профилей AKFA INNOVATION: промышленные, конструкционные, фасадные, транспортные, солнечные профили и ЧПУ детали. Производство в Узбекистане, экспорт по всему миру.",
  alternates: { canonical: "/products" },
  openGraph: { url: "https://akfainnovation.uz/products" },
};

export default Products;
