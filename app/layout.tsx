import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "JRE Clips — Every Joe Rogan Episode, Every Guest, Every Product",
    template: "%s | JRE Clips",
  },
  description:
    "The most complete Joe Rogan Experience resource on the internet. Full episode recaps, transcripts, key moments, and every product mentioned — linked directly to Amazon.",
  openGraph: {
    type: "website",
    siteName: "JRE Clips",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
