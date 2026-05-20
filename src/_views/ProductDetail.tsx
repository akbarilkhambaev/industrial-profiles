'use client';

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { products } from "@/lib/products";
import { usePageMeta } from "@/hooks/use-page-meta";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowLeft, Download, FileText } from "lucide-react";

const ProductDetail = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const { t } = useLang();
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  const [activeImage, setActiveImage] = useState(0);

  const category = product ? t.products.categories[productIndex] : null;

  usePageMeta({
    title: category ? `${category.title} — Алюминиевый профиль, Ташкент` : "Продукт не найден",
    description: category
      ? `${category.description} Сплав: ${product!.alloy}. Допуск: ${product!.tolerance}. Производство в Узбекистане, экспорт по всему миру.`
      : "Продукт не найден.",
    canonical: product ? `/products/${product.id}` : "/products",
    jsonLd: category && product ? {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": category.title,
      "description": category.description,
      "brand": { "@type": "Brand", "name": "AKFA INNOVATION / BENKAM" },
      "manufacturer": {
        "@type": "Organization",
        "name": "BENKAM",
        "address": { "@type": "PostalAddress", "addressCountry": "UZ", "addressLocality": "Навои" }
      },
      "material": product.alloy,
      "url": `https://akfainnovation.uz/products/${product.id}`,
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "seller": { "@type": "Organization", "name": "AKFA INNOVATION" }
      }
    } : undefined,
  });

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-16 section-light">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Product not found</h1>
            <Link href="/" className="text-primary hover:text-primary/80">{t.productDetail.backToCatalog}</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const specs = [
    { label: t.productDetail.alloy, value: product.alloy },
    { label: t.productDetail.tolerance, value: product.tolerance },
    { label: t.productDetail.maxLength, value: product.maxLength },
    { label: t.productDetail.surface, value: product.surface },
    { label: t.productDetail.processing, value: product.processing },
  ];

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen section-light">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <AnimatedSection>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft size={16} />
              {t.productDetail.backToCatalog}
            </Link>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <AnimatedSection>
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-secondary/30 border border-border">
                  <img src={product.gallery[activeImage]} alt={category?.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-3">
                  {product.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-20 rounded overflow-hidden border-2 transition-colors ${activeImage === i ? "border-primary" : "border-border"}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection delay={0.15}>
              <div>
                <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-2">{t.products.sectionLabel}</p>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-3">{category?.title}</h1>
                <p className="text-muted-foreground leading-relaxed mb-8">{category?.description}</p>

                {/* Specs */}
                <h3 className="font-heading font-semibold text-foreground mb-4">{t.productDetail.specifications}</h3>
                <div className="space-y-3 mb-8">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between py-2 border-b border-border text-sm">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="text-foreground font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Downloads */}
                <h3 className="font-heading font-semibold text-foreground mb-4">{t.productDetail.downloads}</h3>
                <div className="space-y-2 mb-8">
                  <a href="#" className="flex items-center gap-3 p-3 rounded border border-border hover:border-primary/30 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <FileText size={18} />
                    {t.productDetail.pdfCatalog}
                    <Download size={14} className="ml-auto" />
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 rounded border border-border hover:border-primary/30 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <FileText size={18} />
                    {t.productDetail.techDrawing}
                    <Download size={14} className="ml-auto" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t border-border py-4 z-40">
          <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
            <div>
              <span className="font-heading font-semibold text-foreground">{category?.title}</span>
            </div>
            <Link
              href="/#request-form"
              className="inline-flex items-center px-6 py-2.5 rounded font-heading font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t.productDetail.requestQuote}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
