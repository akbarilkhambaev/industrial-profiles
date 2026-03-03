import { useLang } from "@/lib/i18n";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="section-dark border-t border-graphite-muted/20">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-sm">AP</div>
              <span className="font-heading font-bold text-lg text-graphite-foreground">AlumProfile</span>
            </div>
            <p className="text-graphite-muted text-sm leading-relaxed">{t.footer.description}</p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-graphite-foreground mb-4">{t.footer.quickLinks}</h4>
            <div className="flex flex-col gap-2">
              <a href="#products" className="text-sm text-graphite-muted hover:text-primary transition-colors">{t.nav.products}</a>
              <a href="#about" className="text-sm text-graphite-muted hover:text-primary transition-colors">{t.nav.about}</a>
              <a href="#contacts" className="text-sm text-graphite-muted hover:text-primary transition-colors">{t.nav.contacts}</a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-graphite-foreground mb-4">{t.footer.contactInfo}</h4>
            <div className="flex flex-col gap-3 text-sm text-graphite-muted">
              <div className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-primary" /><span className="whitespace-pre-line">{t.footer.address}</span></div>
              <div className="flex items-center gap-2"><Phone size={16} className="shrink-0 text-primary" /><span>{t.footer.phone}</span></div>
              <div className="flex items-center gap-2"><Mail size={16} className="shrink-0 text-primary" /><span>{t.footer.email}</span></div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-graphite-muted/20 text-center text-xs text-graphite-muted">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
