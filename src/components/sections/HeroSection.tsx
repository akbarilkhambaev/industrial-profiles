import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import heroImage from "@/assets/hero-profile.jpg";

const HeroSection = () => {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex items-center section-dark overflow-hidden blueprint-grid">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/Home Benkam Extrusions.mp4"
      />
      {/* Overlay to keep text readable */}
      <div className="absolute inset-0 bg-graphite/75" />

      <div className="container mx-auto px-4 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-4">
                Premium Aluminum Extrusion
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-graphite-foreground leading-tight mb-2">
                {t.hero.title}
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary leading-tight mb-6">
                {t.hero.titleAccent}
              </h1>
              <p className="text-lg text-graphite-muted max-w-lg leading-relaxed mb-8">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/products"
                  className="inline-flex items-center px-6 py-3 rounded font-heading font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {t.hero.viewProducts}
                </a>
                <a
                  href="#request-form"
                  className="inline-flex items-center px-6 py-3 rounded font-heading font-semibold text-sm border border-graphite-muted/40 text-graphite-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {t.hero.requestConsultation}
                </a>
              </div>
            </motion.div>
          </div>

          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.img
                src={heroImage}
                alt="Premium aluminum extrusion profile"
                className="w-full max-w-lg rounded-lg glow-blue"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute -inset-4 bg-primary/5 rounded-2xl -z-10 blur-2xl" />
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
