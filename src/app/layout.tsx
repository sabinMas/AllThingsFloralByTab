import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Alex_Brush } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const hasOgImage = fs.existsSync(
  path.join(process.cwd(), "public", "images", "og-image.jpg")
);

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const alexBrush = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://allthingsfloralbytab.com"),
  title: {
    default: "All Things Floral by Tab | Wedding Florist in Buckley, WA",
    template: "%s | All Things Floral by Tab",
  },
  description:
    "Wedding floral design based in Buckley, Washington, serving couples across the Pacific Northwest. Bouquets, ceremony florals, and reception decor crafted for your day.",
  openGraph: {
    title: "All Things Floral by Tab",
    description:
      "Wedding floral design based in Buckley, Washington, serving couples across the Pacific Northwest.",
    ...(hasOgImage ? { images: ["/images/og-image.jpg"] } : {}),
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
      className={`${playfair.variable} ${cormorant.variable} ${alexBrush.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
