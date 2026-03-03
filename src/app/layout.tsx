import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const tusker = localFont({
  src: [{ path: "../../public/fonts/TuskerGrotesk-3800Super.woff2", weight: "800", style: "normal" }],
  variable: "--font-tusker",
  display: "swap",
  fallback: ["Arial Black", "sans-serif"],
});

const humming = localFont({
  src: [{ path: "../../public/fonts/Humming.woff2", weight: "400", style: "normal" }],
  variable: "--font-humming",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://athilacabrall.com"),
  title: "Athila Cabrall | Senior Visual Designer & Creative Strategist",
  description:
    "Transformo a visão do seu negócio em faturamento através do Design Estratégico. +6 anos de experiência, +132 clientes atendidos. Artes de alto impacto, branding e estratégia visual.",
  keywords: [
    "designer",
    "design estratégico",
    "branding",
    "identidade visual",
    "artes para redes sociais",
    "criativos para anúncios",
    "Goiânia",
    "designer freelancer",
    "Athila Cabrall",
  ],
  authors: [{ name: "Athila Cabrall" }],
  creator: "Athila Cabrall",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://athilacabrall.com",
    title: "Athila Cabrall | Senior Visual Designer & Creative Strategist",
    description:
      "Transformo a visão do seu negócio em faturamento através do Design Estratégico. +6 anos de experiência, +132 clientes atendidos.",
    siteName: "Athila Cabrall",
  },
  twitter: {
    card: "summary_large_image",
    title: "Athila Cabrall | Senior Visual Designer",
    description:
      "Design Estratégico que transforma visão em faturamento. +132 clientes atendidos.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <meta name="theme-color" content="#0F0F11" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Athila Cabrall — Design Estratégico",
              description:
                "Senior Visual Designer & Creative Strategist com +6 anos de experiência e +132 clientes atendidos.",
              url: "https://athilacabrall.com",
              areaServed: "BR",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Goiânia",
                addressRegion: "GO",
                addressCountry: "BR",
              },
              sameAs: [
                "https://behance.net/athilapsd",
                "https://instagram.com/athilacabrall",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${tusker.variable} ${humming.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
