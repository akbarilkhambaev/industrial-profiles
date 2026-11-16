'use client';

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useLang } from "@/lib/i18n";
import AnimatedSection from "@/components/AnimatedSection";

/**
 * Реальное значение (например, «15+») всегда есть в HTML: оно рендерится на сервере и остаётся в DOM.
 * Счётчик — декоративный слой поверх (aria-hidden): пока он идёт, настоящее число скрыто
 * через visibility, но продолжает задавать размер блока, поэтому вёрстка не прыгает.
 */
const CounterItem = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const target = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  // null — анимация не идёт, показывается только настоящее значение (так и на сервере).
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView || Number.isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const duration = 2000;
    const startedAt = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      if (progress < 1) {
        setCount(Math.floor(target * progress));
        frame = requestAnimationFrame(tick);
      } else {
        setCount(null);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  const animating = count !== null;

  return (
    <div ref={ref} className="text-center">
      <div className="relative text-4xl md:text-5xl font-heading font-bold mb-2">
        <div className={animating ? "gradient-steel-text invisible" : "gradient-steel-text"}>{value}</div>
        {animating && (
          <div aria-hidden="true" className="gradient-steel-text absolute inset-0">
            {count}{suffix}
          </div>
        )}
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

