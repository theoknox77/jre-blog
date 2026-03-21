import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: {
    default: "JREINDEX — Every Joe Rogan Episode. Every Guest. Everything Ever Mentioned.",
    template: "%s | JREINDEX",
  },
  description: "The most complete Joe Rogan Experience resource on the internet. Full episode recaps, transcripts, key moments with timestamps, and every book and cool thing they mentioned.",
  openGraph: {
    type: "website",
    siteName: "JREINDEX",
    images: [{ url: "/jre-curtain.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jreindex",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics GA4 — JRE Index */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JREINDEX01" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JREINDEX01');
        ` }} />
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7066928956398194" crossOrigin="anonymous" />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
