import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useLang } from "@/lib/i18n";
import AnimatedSection from "@/components/AnimatedSection";

const CounterItem = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = numericValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-heading font-bold gradient-steel-text mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm text-graphite-muted">{label}</div>
    </div>
  );
};

const TrustSection = () => {
  const { t } = useLang();

  return (
    <section className="py-24 section-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <AnimatedSection>
          <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3 text-center">{t.trust.sectionLabel}</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-graphite-foreground mb-16 text-center">{t.trust.title}</h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.trust.stats.map((stat, i) => (
            <CounterItem key={i} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
