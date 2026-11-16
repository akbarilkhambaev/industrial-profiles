import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { products } from "@/lib/products";

type Entry = MetadataRoute.Sitemap[number];

const staticPages: { path: string; changeFrequency: Entry["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/products", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contacts", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Сайт собирается статически, поэтому дата сборки = дата последнего изменения контента.
  const lastModified = new Date();

  return [
    ...staticPages.map(({ path, changeFrequency, priority }) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency,
      priority,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product.id}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
