import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/Providers";
import Aurora from "@/components/Aurora";
import CursorGlow from "@/components/CursorGlow";
import CanvasBackground from "@/components/CanvasBackground";
import AnimatedBackground from "@/components/AnimatedBackground";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parth Gupta — Software Engineer & Developer",
  description:
    "Portfolio of Parth Gupta — B.Tech CSE student and aspiring software engineer building AI-powered, full-stack web experiences.",
  keywords: [
    "Parth Gupta",
    "Software Engineer",
    "Web Developer",
    "Next.js",
    "React",
    "AI",
    "Portfolio",
  ],
  openGraph: {
    title: "Parth Gupta — Software Engineer & Developer",
    description:
      "B.Tech CSE student building AI-powered, full-stack web experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="noise min-h-full flex flex-col bg-background text-foreground">
        <Aurora />
        <AnimatedBackground />
        <CanvasBackground />
        <CursorGlow />
        <div className="relative z-10 flex flex-1 flex-col">
          <SmoothScroll>{children}</SmoothScroll>
        </div>
      </body>
    </html>
  );
}