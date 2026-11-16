import type { Metadata } from "next";

/** Главный (канонический) домен сайта. Все canonical, og:url, sitemap и JSON-LD строятся от него. */
export const SITE_URL = "https://www.akfa-innovation.uz";
export const SITE_NAME = "AKFA INNOVATION";

const OG_IMAGE = { url: "/og-image.jpg", width: 1200, height: 630 };

/** Абсолютный URL от главного домена; кириллица в пути кодируется автоматически. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).href;
}

/**
 * Метаданные страницы с canonical и полным Open Graph.
 * В Next.js дочерний `openGraph` целиком заменяет родительский, поэтому siteName, locale и images
 * задаются здесь заново — иначе они пропадают на внутренних страницах.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "ru_UZ",
      url: path,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/** LocalBusiness — подтип Organization, поэтому одна сущность покрывает оба типа. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: absoluteUrl("/"),
  telephone: "+998909008625",
  email: "info@benkam.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Махтумкули, 2/1A",
    addressLocality: "Ташкент",
    addressCountry: "UZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.30466192640795,
    longitude: 69.30595514306978,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const HOME_CRUMB = { name: "Главная", path: "/" };
export const PRODUCTS_CRUMB = { name: "Продукция", path: "/products" };
