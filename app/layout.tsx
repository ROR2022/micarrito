import React from "react";
//import DeployButton from "@/components/deploy-button";
//import { EnvVarWarning } from "@/components/env-var-warning";
//import HeaderAuth from "@/components/header-auth";
//import { ThemeSwitcher } from "@/components/theme-switcher";
//import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
//import Link from "next/link";
import "./globals.css";
//import { getLocale } from "next-intl/server";
import { Toaster } from "sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Mi Carrito",
  description: "Mi Carrito es una plataforma de marketplace de autos que te permite comprar y vender vehículos de forma rápida y segura.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const locale = await getLocale();
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={['light', 'dark', 'pastel', 'retro', 'cyberpunk']}
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
