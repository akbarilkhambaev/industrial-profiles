'use client';

import { usePageMeta } from "@/hooks/use-page-meta";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutFactory from "@/components/sections/AboutFactory";
import ProductsOverview from "@/components/sections/ProductsOverview";
import TrustSection from "@/components/sections/TrustSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CTASection from "@/components/sections/CTASection";
import RequestForm from "@/components/sections/RequestForm";
import PartnersSection from "@/components/sections/PartnersSection";

const Index = () => {
  usePageMeta({
    title: "Алюминиевые профили в Ташкенте — Экструзия на заказ",
    description: "AKFA INNOVATION / BENKAM — производство алюминиевых профилей в Ташкенте, Узбекистан. Экструзия на заказ, фасадные, конструкционные, транспортные профили. ISO 9001. Экспорт в 30+ стран.",
    canonical: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AKFA INNOVATION — Алюминиевые профили, Ташкент",
      "description": "Производство алюминиевых профилей в Ташкенте. Экструзия на заказ, CNC обработка, анодирование.",
      "url": "https://akfainnovation.uz/",
      "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://akfainnovation.uz/" }] }
    }
  });

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutFactory />
        <ProductsOverview />
        <TrustSection />
        <WhyChooseUs />
        <PartnersSection />
        <CTASection />
        <RequestForm />
      </main>
      <Footer />
    </>
  );
};

export default Index;
