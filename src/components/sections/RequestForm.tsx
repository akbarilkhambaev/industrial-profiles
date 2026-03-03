import { useState } from "react";
import { useLang } from "@/lib/i18n";
import AnimatedSection from "@/components/AnimatedSection";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

const RequestForm = () => {
  const { t } = useLang();
  const [form, setForm] = useState({
    name: "", company: "", phone: "", email: "", category: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Request sent successfully!");
    setForm({ name: "", company: "", phone: "", email: "", category: "", message: "" });
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
              <div className="grid sm:grid-cols-2 gap-4">
                <input className={inputClass} placeholder={t.form.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input className={inputClass} placeholder={t.form.company} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input className={inputClass} placeholder={t.form.phone} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input className={inputClass} type="email" placeholder={t.form.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
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
                  📎 {t.form.attach}
                  <input type="file" className="hidden" />
                </label>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 rounded font-heading font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Send size={16} />
                {t.form.submit}
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <div id="contacts">
                <h4 className="font-heading font-semibold text-foreground mb-3">Quick Contacts</h4>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle size={18} /> WhatsApp
                  </a>
                  <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Send size={18} /> Telegram
                  </a>
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
