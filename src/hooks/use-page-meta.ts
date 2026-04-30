import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  /** JSON-LD structured data object */
  jsonLd?: object;
}

const BASE_URL = "https://akfainnovation.uz";
const SITE_NAME = "AKFA INNOVATION";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(id: string, data: object) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function usePageMeta({ title, description, canonical, ogTitle, ogDescription, jsonLd }: PageMetaOptions) {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;
    setMeta("description", description);

    const resolvedCanonical = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
    setCanonical(resolvedCanonical);

    setMeta("og:url", resolvedCanonical, "property");
    setMeta("og:title", ogTitle ?? title, "property");
    setMeta("og:description", ogDescription ?? description, "property");

    setMeta("twitter:title", ogTitle ?? title);
    setMeta("twitter:description", ogDescription ?? description);

    if (jsonLd) {
      setJsonLd("page-jsonld", jsonLd);
    }
  }, [title, description, canonical, ogTitle, ogDescription, jsonLd]);
}
