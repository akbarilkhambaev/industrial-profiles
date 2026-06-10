'use client';

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import AnimatedSection from "@/components/AnimatedSection";
import { Globe, Loader2, Mail, MapPin, MessageCircle, Paperclip, Phone, Send, Share2 } from "lucide-react";
import { toast } from "sonner";

const initialForm = {
  name: "",
  company: "",
  phone: "",
  email: "",
  category: "",
  message: "",
  website: "",
};

const RequestForm = () => {
  const { t, lang } = useLang();
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const payload = new FormData();
    payload.append("source", "home_request");
    payload.append("lang", lang);
    payload.append("page", window.location.href);
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));

    if (file) {
      payload.append("file", file);
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        body: payload,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.error || "Failed to send request");
      }

      if (result?.warning === "file_not_sent") {
        toast.warning(lang === "ru" ? "Заявка отправлена, но файл не прикрепился." : "Request sent, but the file was not attached.");
      } else {
        toast.success(lang === "ru" ? "Заявка отправлена!" : "Request sent successfully!");
      }

      setForm(initialForm);
      setFile(null);
      setFileInputKey((key) => key + 1);
    } catch {
      toast.error(lang === "ru" ? "Не удалось отправить заявку. Попробуйте позже." : "Could not send the request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";

  return (
    <section id="request-form" className="py-24 section-light">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection>
          <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">{t.form.sectionLabel}</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12">{t.form.title}</h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-12">
          <AnimatedSection className="lg:col-span-2" delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <input className={inputClass} placeholder={t.form.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input className={inputClass} placeholder={t.form.company} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input className={inputClass} placeholder={t.form.phonePlaceholder} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input className={inputClass} type="email" placeholder={t.form.emailPlaceholder} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">{t.form.category}</option>
                {t.form.categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <textarea
                className={`${inputClass} min-h-[120px] resize-y`}
                placeholder={t.form.message}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded border border-dashed border-border hover:border-primary/40 transition-colors">
                  <Paperclip size={16} />
                  <span className="max-w-[260px] truncate">{file?.name || t.form.attach}</span>
                  <input key={fileInputKey} type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3 rounded font-heading font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {isSubmitting ? (lang === "ru" ? "Отправка..." : "Sending...") : t.form.submit}
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div id="contacts" className="rounded-xl overflow-hidden h-full bg-graphite text-graphite-foreground p-8 flex flex-col gap-8">
              <div>
                <h3 className="text-xl font-heading font-bold mb-3 leading-snug">
                  {t.form.sidebarHeading}
                </h3>
                <p className="text-sm text-graphite-foreground/70 leading-relaxed">
                  {t.form.sidebarSubtitle}
                </p>
              </div>

              <div className="space-y-5 flex-1">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-heading font-semibold uppercase tracking-wider text-graphite-foreground/60 mb-0.5">{t.form.addressLabel}</p>
                    <p className="text-sm text-graphite-foreground/90">{t.form.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-heading font-semibold uppercase tracking-wider text-graphite-foreground/60 mb-0.5">{t.form.phoneLabel}</p>
                    <a href={`tel:${t.form.phone}`} className="text-sm text-graphite-foreground/90 hover:text-primary transition-colors">{t.form.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-heading font-semibold uppercase tracking-wider text-graphite-foreground/60 mb-0.5">{t.form.emailLabel}</p>
                    <a href={`mailto:${t.form.email}`} className="text-sm text-graphite-foreground/90 hover:text-primary transition-colors">{t.form.email}</a>
                  </div>
                </div>
              </div>

              <div className="border-t border-graphite-muted/30 pt-6 flex items-center gap-4">
                <a href="#" aria-label="WhatsApp" className="flex items-center gap-2 text-sm text-graphite-foreground/70 hover:text-primary transition-colors">
                  <MessageCircle size={18} /> WhatsApp
                </a>
                <a href="#" aria-label="Telegram" className="flex items-center gap-2 text-sm text-graphite-foreground/70 hover:text-primary transition-colors">
                  <Send size={16} /> Telegram
                </a>
                <div className="ml-auto flex gap-3">
                  <a href="#" aria-label="Share" className="text-graphite-foreground/40 hover:text-primary transition-colors"><Share2 size={18} /></a>
                  <a href="#" aria-label="Website" className="text-graphite-foreground/40 hover:text-primary transition-colors"><Globe size={18} /></a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default RequestForm;
