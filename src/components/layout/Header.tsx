'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { lang, setLang, t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-graphite/95 backdrop-blur-md border-b border-graphite-muted/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-sm">
            A
          </div>
          <span className="font-heading font-bold text-lg text-graphite-foreground tracking-tight">
            AKFAINNOVATION
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-graphite-muted hover:text-graphite-foreground transition-colors">{t.nav.home}</Link>
          <Link href="/products" className="text-sm text-graphite-muted hover:text-graphite-foreground transition-colors">{t.nav.products}</Link>
          <Link href="/about" className="text-sm text-graphite-muted hover:text-graphite-foreground transition-colors">{t.nav.about}</Link>
          <Link href="/contacts" className="text-sm text-graphite-muted hover:text-graphite-foreground transition-colors">{t.nav.contacts}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "ru" : "en")}
            className="text-xs font-heading font-semibold px-2.5 py-1 rounded border border-graphite-muted/30 text-graphite-muted hover:text-graphite-foreground hover:border-graphite-foreground/40 transition-colors"
          >
            {lang === "en" ? "RU" : "EN"}
          </button>
          {isHome && (
            <button
              onClick={() => scrollTo("request-form")}
              className="hidden md:inline-flex text-sm font-heading font-semibold px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t.nav.requestQuote}
            </button>
          )}
          <button className="md:hidden text-graphite-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-graphite border-t border-graphite-muted/20"
          >
            <div className="flex flex-col gap-4 p-6">
              <Link href="/" onClick={() => setMobileOpen(false)} className="text-left text-graphite-foreground">{t.nav.home}</Link>
              <Link href="/products" onClick={() => setMobileOpen(false)} className="text-left text-graphite-foreground">{t.nav.products}</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="text-left text-graphite-foreground">{t.nav.about}</Link>
              <Link href="/contacts" onClick={() => setMobileOpen(false)} className="text-left text-graphite-foreground">{t.nav.contacts}</Link>
              <button onClick={() => scrollTo("request-form")} className="mt-2 text-sm font-heading font-semibold px-4 py-2 rounded bg-primary text-primary-foreground">{t.nav.requestQuote}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
