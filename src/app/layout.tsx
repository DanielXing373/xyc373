import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Bricolage_Grotesque } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const body = Atkinson_Hyperlegible({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  fallback: ["Segoe UI", "Tahoma", "sans-serif"],
});

const display = Bricolage_Grotesque({
  variable: "--font-display-family",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Segoe UI", "Tahoma", "sans-serif"],
});

export const metadata: Metadata = {
  title: site.title,
  description:
    "Portfolio companion to a résumé: HCI, games, and web work, with the design reasoning that does not fit on one page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">
        <a href="#main" className="skip-link inline-flex min-h-11 items-center rounded-sm bg-accent px-4 text-sm text-paper-raised">
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
