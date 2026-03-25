"use client";

import type { Session } from "@supabase/supabase-js";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { StorefrontProvider } from "@/components/providers/StorefrontProvider";
import { SupabaseSessionProvider } from "@/components/providers/SupabaseSessionProvider";
import type { StorefrontLanguage } from "@/lib/storefront";

type ProvidersProps = {
  children: ReactNode;
  initialLanguage: StorefrontLanguage;
  initialSession: Session | null;
};

export function Providers({
  children,
  initialLanguage,
  initialSession,
}: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <SupabaseSessionProvider initialSession={initialSession}>
        <StorefrontProvider initialLanguage={initialLanguage}>
          {children}
        </StorefrontProvider>
      </SupabaseSessionProvider>
    </ThemeProvider>
  );
}
