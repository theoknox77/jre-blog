import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://jreindex.com"),
  title: {
    default: "JREINDEX — Every Joe Rogan Episode. Every Guest. Everything Ever Mentioned.",
    template: "%s | JREINDEX",
  },
  description: "The most complete Joe Rogan Experience resource on the internet. Full episode recaps, transcripts, key moments with timestamps, and every book and cool thing they mentioned.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "JREINDEX",
    images: [{ url: "/og-image.jpg?v=1", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jreindex",
    images: ["/og-image.jpg?v=1"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics GA4 — JRE Index */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WLRG4VW0X6" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WLRG4VW0X6');
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
