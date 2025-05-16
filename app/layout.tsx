import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// Otimização de fonte com display swap para melhor CLS
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Metadados aprimorados para SEO
export const metadata: Metadata = {
  title: "Gomes App | FullStack Developer Portfolio",
  description:
    "Portfolio profissional de desenvolvimento FullStack, apresentando projetos em React, Next.js, Node.js e outras tecnologias modernas.",
  keywords: [
    "desenvolvedor fullstack",
    "portfolio",
    "react",
    "next.js",
    "web developer",
    "frontend",
    "backend",
  ],
  authors: [{ name: "Seu Nome", url: "https://github.com/seu-usuario" }],
  creator: "Seu Nome",
  publisher: "Seu Nome",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://gomes-app.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Gomes App | FullStack Developer Portfolio",
    description:
      "Portfolio profissional de desenvolvimento FullStack, apresentando projetos em React, Next.js, Node.js e outras tecnologias modernas.",
    url: "https://gomes-app.vercel.app",
    siteName: "Gomes App Portfolio",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Crie esta imagem para compartilhamento em redes sociais
        width: 1200,
        height: 630,
        alt: "Gomes App Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gomes App | FullStack Developer Portfolio",
    description:
      "Portfolio profissional de desenvolvimento FullStack, apresentando projetos em React, Next.js, Node.js e outras tecnologias modernas.",
    images: ["/og-image.jpg"],
  },
};

// Configurações de viewport otimizadas
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1040" },
    { media: "(prefers-color-scheme: light)", color: "#1a1040" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        {/* Preconectar a domínios importantes para melhorar a performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon otimizado */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans bg-gradient-to-b from-[#1a1040] to-[#0c1a4d] text-white min-h-screen overflow-x-hidden">
        {children}

        {/* Structured Data para Rich Snippets */}
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Seu Nome",
              url: "https://gomes-app.vercel.app",
              jobTitle: "FullStack Developer",
              knowsAbout: ["React", "Next.js", "Node.js", "JavaScript", "TypeScript"],
              sameAs: [
                "https://github.com/seu-usuario",
                "https://linkedin.com/in/seu-usuario",
                "https://twitter.com/seu-usuario",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
