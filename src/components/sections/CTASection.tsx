import { useLang } from "@/lib/i18n";
import AnimatedSection from "@/components/AnimatedSection";

const CTASection = () => {
  const { t } = useLang();

  return (
    <section className="py-24 section-dark relative overflow-hidden blueprint-grid">
      <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/95 to-graphite" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-graphite-foreground mb-2">
            {t.cta.title}
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-8">
            {t.cta.titleAccent}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#request-form"
              className="inline-flex items-center px-8 py-3.5 rounded font-heading font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t.cta.getOffer}
            </a>
            <a
              href="#request-form"
              className="inline-flex items-center px-8 py-3.5 rounded font-heading font-semibold text-sm border border-graphite-muted/40 text-graphite-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {t.cta.talkEngineer}
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTASection;
