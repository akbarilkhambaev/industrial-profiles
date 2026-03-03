import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { useLang } from "@/lib/i18n";
import { products } from "@/lib/products";
import { ArrowRight, Download, FileText } from "lucide-react";

const Products = () => {
  const { t } = useLang();

  return (
    <>
      <Header />
      <main className="pt-16">

        {/* Hero */}
        <section className="relative py-28 section-dark overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/products.mp4"
          />
          <div className="absolute inset-0 bg-graphite/80" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <AnimatedSection>
              <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">
                {t.products.sectionLabel}
              </p>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 drop-shadow-lg">
                {t.products.title}
              </h1>
              <p className="text-xl text-white/80 max-w-2xl">{t.products.subtitle}</p>
            </AnimatedSection>
          </div>
        </section>

        {/* Catalogs download
        // <section className="py-12 bg-secondary/40 border-b border-border">
        //   <div className="container mx-auto px-4 lg:px-8">
        //     <AnimatedSection>
        //       <p className="text-sm font-heading font-semibold text-muted-foreground tracking-widest uppercase mb-4">
        //         {t.productDetail.downloads}
        //       </p>
        //       <div className="flex flex-wrap gap-3">
        //         {catalogFiles.map((c) => (
        //           <a
        //             key={c.file}
        //             href={c.file}
        //             target="_blank"
        //             rel="noopener noreferrer"
        //             className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-border bg-card hover:border-primary/40 hover:text-primary transition-colors text-sm font-medium text-foreground"
        //           >
        //             <FileText size={16} className="text-primary shrink-0" />
        //             {c.name}
        //             <Download size={14} className="ml-1 text-muted-foreground" />
        //           </a>
        //         ))}
        //       </div>
        //     </AnimatedSection>
        //   </div>
        // </section> */}

        {/* Products grid */}
        <section className="py-24 section-light">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, i) => {
                const category = t.products.categories[i];
                return (
                  <AnimatedSection key={product.id} delay={i * 0.07}>
                    <div className="group bg-card rounded-xl overflow-hidden border border-border hover-lift h-full flex flex-col">
                      <div className="aspect-[4/3] overflow-hidden bg-secondary/30">
                        <img
                          src={product.image}
                          alt={category?.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-heading font-semibold text-foreground text-lg mb-2">
                          {category?.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                          {category?.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Link
                            to={`/products/${product.id}`}
                            className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-primary hover:text-primary/80 transition-colors"
                          >
                            {t.products.viewDetails}
                            <ArrowRight size={14} />
                          </Link>
                          <div className="text-xs text-muted-foreground font-mono border border-border rounded px-2 py-1">
                            {product.alloy.split("/")[0].trim()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 section-dark">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-graphite-foreground mb-4">
                {t.cta.title}{" "}
                <span className="text-primary">{t.cta.titleAccent}</span>
              </h2>
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <a
                  href="/#request-form"
                  className="inline-flex items-center px-6 py-3 rounded font-heading font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {t.cta.getOffer}
                </a>
                <a
                  href="/#request-form"
                  className="inline-flex items-center px-6 py-3 rounded font-heading font-semibold text-sm border border-graphite-muted/40 text-graphite-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {t.cta.talkEngineer}
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Products;
