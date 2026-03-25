import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/providers/Providers";
import { getServerLanguage } from "@/lib/server-language";
import { getDirection } from "@/lib/storefront";
import { createServerSupabaseClient } from "@/lib/supabase";

import "./globals.css";

const ibmPlex = IBM_Plex_Sans_Arabic({
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-ibm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "الأمل سنتر | Al-Amal Center",
  description: "Premium Arabic-first grocery storefront for Al-Amal Center.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getServerLanguage();
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html
      lang={language}
      dir={getDirection(language)}
      suppressHydrationWarning
    >
      <body className={`${ibmPlex.variable} font-ibm`}>
        <Providers initialLanguage={language} initialSession={session}>
          <div className="relative min-h-screen overflow-x-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-hero-glow opacity-80" />
            <div className="relative min-h-screen">
              <Header />
              <main className="page-shell pb-16 pt-6 sm:pt-8 lg:pb-24 lg:pt-10">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
