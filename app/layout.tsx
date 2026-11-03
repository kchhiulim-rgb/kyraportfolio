import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LightboxProvider } from "@/components/LightboxModal";

export const metadata: Metadata = {
  title: "Kyra Chhiu-Lim | Visual Designer",
  description: "Discover Kyra Chhiu-Lim's portfolio of empathetic visual design, including branding, social media, print, and digital projects for diverse clients in Seattle.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
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
