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
