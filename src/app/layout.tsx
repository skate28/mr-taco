import type { Metadata, Viewport } from "next";
import { Nunito, Pacifico, Titan_One } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { MobileBar } from "@/components/mobile-bar";
import { focusRing } from "@/components/styles";
import { site } from "@/content";
import type { Palette } from "@/content/types";
import { cn } from "@/lib/cn";
import { allowIndexing } from "@/lib/indexing";
import { primaryNav } from "@/lib/nav";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const display = Titan_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-face",
  display: "swap",
});

const sans = Nunito({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-sans-face",
  display: "swap",
});

const script = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script-face",
  display: "swap",
});

function paletteStyle(palette: Palette | undefined): CSSProperties | undefined {
  if (!palette) return undefined;
  return {
    "--mt-ink": palette.ink,
    "--mt-chili": palette.chili,
    "--mt-chili-deep": palette.chiliDeep,
    "--mt-lime": palette.lime,
    "--mt-pink": palette.pink,
    "--mt-pink-deep": palette.pinkDeep,
    "--mt-turquoise": palette.turquoise,
    "--mt-yellow": palette.yellow,
    "--mt-cream": palette.cream,
    "--mt-paper": palette.paper,
  } as CSSProperties;
}

const title = site.seo.title.trim() || site.name;
const description = site.seo.description.trim() || site.description;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: title, template: `%s · ${site.name}` },
  description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: "/" },
  robots: allowIndexing()
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: site.palette?.chili ?? "#c4161c",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn(display.variable, sans.variable, script.variable, "h-full")} style={paletteStyle(site.palette)}>
      <body className="min-h-full overflow-x-clip bg-cream font-sans text-ink antialiased">
        <a
          href="#content"
          className={cn(
            "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:text-cream",
            focusRing,
          )}
        >
          Skip to content
        </a>
        <Header links={primaryNav()} />
        {children}
        <Footer />
        <MobileBar />
        <JsonLd />
      </body>
    </html>
  );
}
