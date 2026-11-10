import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LightboxProvider } from "@/components/LightboxModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kyrachhiu-lim.com"),
  title: "Kyra Chhiu-Lim | Visual Designer",
  description: "Discover Kyra Chhiu-Lim's portfolio of empathetic visual design, including branding, social media, print, and digital projects for diverse clients in Seattle.",
  verification: {
    google: "xsFB-8a7jvfjoUusQ_c6rAhyFf6Xhf4599Nk069-eRQ",
  },
  icons: {
    icon: "/favicon.png?v=2",
    apple: "/favicon.png?v=2",
  },
  openGraph: {
    title: "Kyra Chhiu-Lim | Visual Designer",
    description: "Discover Kyra Chhiu-Lim's portfolio of empathetic visual design, including branding, social media, print, and digital projects for diverse clients in Seattle.",
    images: [
      {
        url: "/og-image.png?v=2",
        width: 1200,
        height: 630,
        alt: "Kyra Chhiu-Lim Visual Designer Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyra Chhiu-Lim | Visual Designer",
    description: "Discover Kyra Chhiu-Lim's portfolio of empathetic visual design, including branding, social media, print, and digital projects for diverse clients in Seattle.",
    images: ["/og-image.png?v=2"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <LightboxProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LightboxProvider>
      </body>
    </html>
  );
}
