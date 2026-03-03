import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { products } from "@/lib/products";
import AnimatedSection from "@/components/AnimatedSection";

const ProductsOverview = () => {
  const { t } = useLang();

  return (
    <section id="products" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection>
          <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">{t.products.sectionLabel}</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">{t.products.title}</h2>
          <p className="text-muted-foreground mb-12">{t.products.subtitle}</p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <AnimatedSection key={product.id} delay={i * 0.08}>
              <div className="group bg-card rounded-lg overflow-hidden border border-border hover-lift">
                <div className="aspect-square overflow-hidden bg-secondary/30">
                  <img
                    src={product.image}
                    alt={t.products.categories[i]?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-1">{t.products.categories[i]?.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{t.products.categories[i]?.description}</p>
                  <Link
                    to={`/products/${product.id}`}
                    className="inline-flex text-sm font-heading font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    {t.products.viewDetails} →
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsOverview;
