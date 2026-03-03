import { useLang } from "@/lib/i18n";
import AnimatedSection from "@/components/AnimatedSection";
import { Settings, Wrench, Clock, Paintbrush, Truck, ShieldCheck } from "lucide-react";

import imgEngineering from "@/assets/product-custom.jpg";
import imgExtrusion from "@/assets/product-structural.jpg";
import imgLeadTime from "@/assets/factory.jpg";
import imgCoating from "@/assets/product-facade.jpg";
import imgLogistics from "@/assets/product-transport.jpg";
import imgQuality from "@/assets/product-cnc.jpg";

const icons = [Settings, Wrench, Clock, Paintbrush, Truck, ShieldCheck];
const images = [imgEngineering, imgExtrusion, imgLeadTime, imgCoating, imgLogistics, imgQuality];

const WhyChooseUs = () => {
  const { t } = useLang();

  return (
    <section className="py-24 section-light overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection>
          <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">
            {t.whyUs.sectionLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-20">
            {t.whyUs.title}
          </h2>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical center line — visible only on lg+ */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-0">
            {t.whyUs.items.map((item, i) => {
              const Icon = icons[i];
              const image = images[i];
              const isEven = i % 2 === 0;

              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="relative grid lg:grid-cols-2 gap-0 items-center">
                    {/* Timeline dot */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-background border-2 border-primary items-center justify-center shadow-sm">
                      <Icon size={16} className="text-primary" />
                    </div>

                    {/* Text block */}
                    <div
                      className={`py-12 px-8 lg:px-16 flex flex-col justify-center ${
                        isEven ? "lg:order-1 lg:pr-20 lg:text-right lg:items-end" : "lg:order-2 lg:pl-20"
                      }`}
                    >
                      {/* Mobile icon */}
                      <div className="flex lg:hidden w-10 h-10 rounded-full bg-primary/10 items-center justify-center mb-4">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <span className="text-xs font-heading font-semibold text-primary tracking-widest uppercase mb-2">
                        0{i + 1}
                      </span>
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed max-w-md">{item.description}</p>
                    </div>

                    {/* Image block */}
                    <div
                      className={`py-12 px-8 lg:px-16 ${
                        isEven ? "lg:order-2 lg:pl-20" : "lg:order-1 lg:pr-20"
                      }`}
                    >
                      <div className="rounded-xl overflow-hidden border border-border shadow-sm aspect-[16/9]">
                        <img
                          src={image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Divider between items */}
                  {i < t.whyUs.items.length - 1 && (
                    <div className="lg:hidden h-px bg-border mx-8" />
                  )}
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
