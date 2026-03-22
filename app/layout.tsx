import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Nav from "@/components/Nav";
import SplashCursor from "@/components/SplashCursor";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Georgio Silvea",
  description: "CS @ University of Waterloo. Building cool stuff.",
  openGraph: {
    title: "Georgio Silvea",
    description: "CS @ University of Waterloo. Building cool stuff.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorantGaramond.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <Script id="theme-init" strategy="beforeInteractive">{`(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`}</Script>
        <SplashCursor />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Nav />
          <main className="flex-1 w-full">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
