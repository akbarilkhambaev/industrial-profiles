import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { useLang } from "@/lib/i18n";
import { CheckCircle, Award, Users, Globe, ShieldCheck, Leaf, Wrench } from "lucide-react";




const About = () => {
  const { t } = useLang();
  const a = t.aboutPage;

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Sub-navigation */}
        <div className="bg-graphite border-b border-graphite-muted/20">
          <div className="container mx-auto px-4 lg:px-8 py-4 flex flex-wrap gap-6 text-xs font-heading tracking-widest uppercase text-graphite-muted">
            <a href="#company" className="hover:text-primary transition-colors">{a.nav.company}</a>
            <span className="text-graphite-muted/30">——</span>
            <a href="#mission" className="hover:text-primary transition-colors">{a.nav.mission}</a>
            <span className="text-graphite-muted/30">——</span>
            <a href="#quality" className="hover:text-primary transition-colors">{a.nav.quality}</a>
          </div>
        </div>

        {/* Company Profile */}
        <section id="company" className="relative py-24 section-dark overflow-hidden">
          {/* Background video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/about.mp4"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-graphite/85" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <AnimatedSection>
              <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">{a.nav.about}</p>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 drop-shadow-lg">{a.company.title}</h1>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-xl text-white/90 leading-relaxed max-w-4xl mb-8 drop-shadow">
                {a.company.intro}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p className="text-white/80 text-lg leading-relaxed mb-4 max-w-3xl">{a.company.production}</p>
              <p className="text-white/80 text-lg leading-relaxed mb-4 max-w-3xl">{a.company.location}</p>
              <p className="text-white text-lg leading-relaxed font-semibold max-w-3xl drop-shadow">{a.company.slogan}</p>
            </AnimatedSection>

            {/* Key stats */}
            <AnimatedSection delay={0.25}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                {a.company.stats.map((stat, i) => (
                  <div key={i} className="text-center p-6 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm">
                    <div className="text-4xl font-heading font-bold text-primary mb-1 drop-shadow">{stat.value}</div>
                    <div className="text-sm text-white/80 font-medium tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Mission and Vision */}
        <section id="mission" className="py-24 section-light">
          <div className="container mx-auto px-4 lg:px-8">
            <AnimatedSection>
              <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">{a.nav.mission}</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">{a.mission.title}</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-12">{a.mission.description}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-6">{a.mission.valuesTitle}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {a.mission.values.map((value, i) => {
                  const icons = [Award, Users, Globe, ShieldCheck, Wrench, Users];
                  const Icon = icons[i % icons.length];
                  return (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-background/50 border border-border/50">
                      <Icon size={20} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground text-sm">{value}</span>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-muted-foreground leading-relaxed mt-10 max-w-3xl">{a.mission.outro}</p>
            </AnimatedSection>
          </div>
        </section>

        {/* Quality Policy */}
        <section id="quality" className="py-24 section-dark">
          <div className="container mx-auto px-4 lg:px-8">
            <AnimatedSection>
              <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">{a.nav.quality}</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">{a.quality.title}</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mb-6">{a.quality.intro}</p>
              <p className="text-muted-foreground leading-relaxed max-w-4xl mb-12">{a.quality.standards}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h3 className="text-xl font-heading font-semibold mb-6">{a.quality.commitTitle}</h3>
              <ul className="space-y-3 max-w-3xl">
                {a.quality.commitments.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-muted-foreground leading-relaxed mt-10 max-w-3xl">{a.quality.outro}</p>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection delay={0.25}>
              <div className="mt-16 p-8 rounded-lg bg-primary/10 border border-primary/20 text-center">
                <h3 className="text-2xl font-heading font-bold mb-4">{a.cta.title}</h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{a.cta.description}</p>
                <a
                  href="/#request-form"
                  className="inline-flex text-sm font-heading font-semibold px-6 py-3 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {a.cta.button}
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

export default About;
