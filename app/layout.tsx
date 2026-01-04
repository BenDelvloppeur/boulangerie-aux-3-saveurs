import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { siteConfig } from "@/data/site-config";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/context/cart-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://aux3saveurs.fr',
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": siteConfig.name,
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop",
    "@id": "https://aux3saveurs.fr",
    "url": "https://aux3saveurs.fr",
    "telephone": siteConfig.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "9 Rue du Général Patton",
      "addressLocality": "Avranches",
      "postalCode": "50300",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.6865,
      "longitude": -1.3655
    },
    "openingHoursSpecification": siteConfig.openingHours.map(day => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": day.day === "Dimanche" ? "Sunday" : day.day === "Lundi" ? "Monday" : day.day === "Mardi" ? "Tuesday" : day.day === "Mercredi" ? "Wednesday" : day.day === "Jeudi" ? "Thursday" : day.day === "Vendredi" ? "Friday" : "Saturday",
      "opens": day.hours.split(" - ")[0]?.replace("h", ":") || "00:00",
      "closes": day.hours.split(" - ")[1]?.replace("h", ":") || "00:00"
    })).filter(h => h.opens !== "Fermé"),
    "priceRange": "€"
  };

  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <Header />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" richColors theme="light" />
        </CartProvider>
      </body>
    </html>
  );
}
