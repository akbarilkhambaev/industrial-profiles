'use client';

import { useState } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { useLang } from "@/lib/i18n";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

const Contacts = () => {
  const { t, lang } = useLang();
  const c = t.contactsPage;
  const f = t.form;

  usePageMeta({
    title: "Контакты — Заказать алюминиевые профили в Ташкенте",
    description: "Свяжитесь с AKFA INNOVATION для заказа алюминиевых профилей. Ташкент, Узбекистан. Тел: +998 71 203 00 00. Ответим в течение 2 часов.",
    canonical: "/contacts",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Контакты AKFA INNOVATION",
      "url": "https://akfainnovation.uz/contacts",
      "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://akfainnovation.uz/" }, { "@type": "ListItem", "position": 2, "name": "Контакты", "item": "https://akfainnovation.uz/contacts" }] }
    }
  });

  const [form, setForm] = useState({
    name: "", company: "", phone: "", email: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(lang === "ru" ? "Запрос отправлен!" : "Request sent successfully!");
    setForm({ name: "", company: "", phone: "", email: "", message: "" });
  };

  const inputClass =
    "w-full px-4 py-3 rounded bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";

  const contactItems = [
    { icon: MapPin, label: c.addressLabel, value: c.address, href: "https://maps.google.com/?q=Navoi+Free+Economic+Zone+Uzbekistan" },
    { icon: Phone, label: c.phoneLabel, value: c.phone, href: `tel:${c.phone}` },
    { icon: Mail, label: c.emailLabel, value: c.email, href: `mailto:${c.email}` },
    { icon: Clock, label: c.workingHoursLabel, value: c.workingHours, href: null },
  ];

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative py-24 section-dark overflow-hidden blueprint-grid">
          <div className="absolute inset-0 bg-gradient-to-br from-graphite via-graphite/95 to-graphite" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <AnimatedSection>
              <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">
                {c.sectionLabel}
              </p>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
                {c.title}
              </h1>
              <p className="text-graphite-foreground/70 text-lg max-w-xl">{c.subtitle}</p>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact cards + form */}
        <section className="py-24 section-light">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left: contact info + map */}
              <AnimatedSection delay={0.1}>
                <div className="space-y-4 mb-10">
                  {contactItems.map(({ icon: Icon, label, value, href }, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-lg bg-background border border-border">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
                          {label}
                        </p>
                        {href ? (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground text-sm hover:text-primary transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-foreground text-sm">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick contact */}
                <div className="flex gap-4 mb-10">
                  <a
                    href="https://wa.me/998712030000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#2a2a2e] border border-white/10 text-white text-sm font-heading font-semibold hover:bg-[#3a3a3e] transition-colors"
                  >
                    <MessageCircle size={16} /> {c.whatsapp}
                  </a>
                  <a
                    href="https://t.me/benkam_support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1e1e22] border border-white/10 text-white text-sm font-heading font-semibold hover:bg-[#2e2e34] transition-colors"
                  >
                    <Send size={16} /> {c.telegram}
                  </a>
                </div>

                {/* Map */}
                <div className="rounded-xl overflow-hidden border border-border h-64">
                  <iframe
                    title="BENKAM location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48000!2d65.3792!3d40.0843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f51f0a0a0a0a0a1%3A0x0!2sNavoi%2C+Uzbekistan!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </AnimatedSection>

              {/* Right: form */}
              <AnimatedSection delay={0.2}>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-8">{c.formTitle}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      className={inputClass}
                      placeholder={f.name}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                    <input
                      className={inputClass}
                      placeholder={f.company}
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      className={inputClass}
                      placeholder={f.phonePlaceholder}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    <input
                      className={inputClass}
                      type="email"
                      placeholder={f.emailPlaceholder}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <textarea
                    className={`${inputClass} min-h-[140px] resize-y`}
                    placeholder={f.message}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded border border-dashed border-border hover:border-primary/40 transition-colors">
                      📎 {f.attach}
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded font-heading font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Send size={16} />
                    {f.submit}
                  </button>
                </form>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contacts;
