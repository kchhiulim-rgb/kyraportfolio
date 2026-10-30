import type { Metadata } from "next";
import { Raleway, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kyra Chhiu-Lim | Visual Designer",
  description: "Discover Kyra Chhiu-Lim's portfolio of empathetic visual design, including branding, social media, print, and digital projects for diverse clients in Seattle.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#f5f0eb]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
