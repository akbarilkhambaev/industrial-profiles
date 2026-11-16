import type { Metadata } from "next";
import Contacts from "@/_views/Contacts";
import JsonLd from "@/components/JsonLd";
import { HOME_CRUMB, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Контакты — Заказать алюминиевые профили в Ташкенте",
  description:
    "Свяжитесь с AKFA INNOVATION для заказа алюминиевых профилей. Ташкент, Узбекистан. Тел: +998 90 900 86 25. Ответим в течение 2 часов.",
  path: "/contacts",
});

export default function ContactsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([HOME_CRUMB, { name: "Контакты", path: "/contacts" }])} />
      <Contacts />
    </>
  );
}
