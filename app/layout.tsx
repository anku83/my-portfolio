import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ankit Kumar | Cinematic Portfolio",
  description: "Immersive portfolio experience for Ankit Kumar, Data Analyst and Developer.",
  openGraph: {
    title: "Ankit Kumar | Cinematic Portfolio",
    description: "Scroll-driven storytelling portfolio built with Next.js, Tailwind CSS, Three.js, and GSAP.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
