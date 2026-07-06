import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { Antic_Didone, Cormorant_Garamond, Corinthia } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const hasOgImage = fs.existsSync(
  path.join(process.cwd(), "public", "images", "og-image.jpg")
);
const hasSquareLogo = fs.existsSync(
  path.join(process.cwd(), "public", "images", "logo", "logo-square.png")
);

const anticDidone = Antic_Didone({
  variable: "--font-antic-didone",
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const corinthia = Corinthia({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`${anticDidone.variable} ${cormorant.variable} ${corinthia.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        <Header hasLogo={hasSquareLogo} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
