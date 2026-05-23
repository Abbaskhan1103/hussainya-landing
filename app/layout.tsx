import type { Metadata, Viewport } from "next";
import { Lora, Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hussainya, a digital home for the Ahl al-Bayt community",
  description:
    "Centres, programs, prayer times, qibla, and the daily rhythm of ibadah. Gathered with intention for the Shia community.",
  metadataBase: new URL("https://hussainya.com"),
};

export const viewport: Viewport = {
  themeColor: "#070D1F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lora.variable} ${nunito.variable}`}
    >
      <body className="min-h-svh flex flex-col antialiased">
        <ThemeProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
