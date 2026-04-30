import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Алюминиевые профили в Ташкенте — Экструзия на заказ",
  description:
    "AKFA INNOVATION / BENKAM — производство алюминиевых профилей в Ташкенте, Узбекистан. Экструзия на заказ, фасадные, конструкционные, транспортные профили. ISO 9001. Экспорт в 30+ стран.",
  alternates: { canonical: "/" },
};

export default function IndexPage() {
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
}
