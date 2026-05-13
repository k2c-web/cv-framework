import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cv.kamil.dev"),
  title: {
    default: "Kamil — Senior Frontend Engineer",
    template: "%s | Kamil — Senior Frontend Engineer",
  },
  description:
    "CV interactif de Kamil, Senior Frontend Engineer spécialisé en React, Next.js, TypeScript et architectures modernes.",
  keywords: [
    "Kamil",
    "CV",
    "Senior Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Frontend",
    "Web Performance",
    "Architecture",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Kamil — Senior Frontend Engineer",
    description:
      "CV interactif de Kamil, Senior Frontend Engineer spécialisé en React, Next.js, TypeScript et architectures modernes.",
    url: "https://cv.kamil.dev",
    siteName: "CV de Kamil",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png", // tu peux générer une image propre plus tard
        width: 1200,
        height: 630,
        alt: "CV de Kamil — Senior Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamil — Senior Frontend Engineer",
    description:
      "CV interactif de Kamil, Senior Frontend Engineer spécialisé en React, Next.js, TypeScript et architectures modernes.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "../assets/cv.png",
    shortcut: "../assets/cv.png",
    apple: "../assets/cv.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
