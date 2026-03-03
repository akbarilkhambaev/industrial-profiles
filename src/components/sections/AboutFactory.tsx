import { useLang } from "@/lib/i18n";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import factoryImage from "@/assets/factory.jpg";

const AboutFactory = () => {
  const { t } = useLang();

  return (
    <section id="about" className="py-24 section-light">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection>
          <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">{t.about.sectionLabel}</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12">{t.about.title}</h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={0.1}>
            <img
              src={factoryImage}
              alt="Aluminum extrusion factory"
              className="rounded-lg w-full object-cover aspect-video"
            />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-muted-foreground leading-relaxed mb-8">{t.about.description}</p>
            <ul className="space-y-3 mb-8">
              {t.about.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground text-sm">{bullet}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="inline-flex items-center text-sm font-heading font-semibold text-primary hover:text-primary/80 transition-colors">
              {t.about.cta} →
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutFactory;
