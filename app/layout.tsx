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

const description =
	"CV interactif de Kamil, Senior Frontend Engineer spécialisé en React, Next.js, TypeScript et architectures modernes.";

export const metadata: Metadata = {
	metadataBase: new URL("https://cv.kamil.dev"),
	title: {
		default: "Kamil - Senior Frontend Engineer",
		template: "%s | Kamil — Senior Frontend Engineer",
	},
	description,
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
	// Pas de bloc `images` : aucune image 1200x630 n'est versionnee.
	// Referencer un fichier absent produit une carte de partage cassee sur
	// chaque partage de lien. A ajouter quand l'image sera generee.
	openGraph: {
		title: "Kamil — Senior Frontend Engineer",
		description,
		url: "https://cv.kamil.dev",
		siteName: "CV de Kamil",
		locale: "fr_FR",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: "Kamil — Senior Frontend Engineer",
		description,
	},
	icons: {
		icon: "/cv.png",
		shortcut: "/cv.png",
		apple: "/cv.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
			<body className="antialiased">{children}</body>
		</html>
	);
}
