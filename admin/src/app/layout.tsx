import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const ibmPlex = IBM_Plex_Sans_Arabic({
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-ibm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Al-Amal Center Admin",
  description: "Admin Dashboard for Al-Amal Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${ibmPlex.variable} antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
