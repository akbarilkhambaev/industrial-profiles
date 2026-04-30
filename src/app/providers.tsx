'use client';

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LangContext, translations, type Lang, type Translations } from "@/lib/i18n";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] as unknown as Translations }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {children}
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </LangContext.Provider>
  );
}
