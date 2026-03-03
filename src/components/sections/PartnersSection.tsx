import { useLang } from "@/lib/i18n";
import AnimatedSection from "@/components/AnimatedSection";

const PartnersSection = () => {
  const { t } = useLang();
  const { sectionLabel, title, items } = t.partners;

  // Duplicate for seamless infinite scroll
  const doubled = [...items, ...items];

  return (
    <section className="py-20 section-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 mb-12">
        <AnimatedSection className="text-center">
          <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">
            {sectionLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-graphite-foreground">
            {title}
          </h2>
        </AnimatedSection>
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden" aria-hidden>
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-graphite to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-graphite to-transparent" />

        <div className="flex gap-6 animate-marquee" style={{ width: "max-content" }}>
          {doubled.map((partner, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-1 min-w-[160px] h-20 px-6 rounded-lg border border-graphite-muted/20 bg-graphite-muted/5 hover:border-primary/40 hover:bg-primary/5 transition-colors group"
            >
              <span className="text-lg font-heading font-bold text-graphite-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                {partner.name}
              </span>
              <span className="text-xs text-graphite-muted tracking-wide uppercase">
                {partner.industry}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
