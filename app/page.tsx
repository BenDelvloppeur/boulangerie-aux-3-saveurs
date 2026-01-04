import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import products from "@/data/products.json";
import { ArrowRight, Clock, Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const popularProducts = products.filter(p => p.popular).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Intro / Values Section */}
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brown-900 mb-6">
              L'Art de la Boulangerie Artisanale
            </h2>
            <p className="text-lg text-brown-800/80 leading-relaxed">
              Aux 3 Saveurs, nous croyons que le bon pain demande du temps. 
              Nos artisans travaillent chaque nuit avec des farines locales et 
              un levain naturel pour vous offrir des produits d'une qualité authentique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Fraîcheur Quotidienne",
                desc: "Pains et viennoiseries pétris et cuits sur place tout au long de la journée."
              },
              {
                icon: Star,
                title: "Produits de Saison",
                desc: "Des recettes qui évoluent au fil de l'année pour respecter les cycles naturels."
              },
              {
                icon: MapPin,
                title: "Ancrage Local",
                desc: "Situé au cœur d'Avranches, votre artisan de proximité."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-cream-200 text-center">
                <feature.icon className="h-10 w-10 mx-auto text-brown-500 mb-4" />
                <h3 className="text-xl font-bold text-brown-900 mb-3">{feature.title}</h3>
                <p className="text-brown-800/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-brown-900 mb-2">Nos Incontournables</h2>
              <p className="text-brown-800/70">Les favoris de nos clients, à déguster sans modération.</p>
            </div>
            <Link 
              href="/produits" 
              className={cn(buttonVariants({ variant: "ghost" }), "hidden md:inline-flex group")}
            >
              Tout voir <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/produits" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
              Voir tous nos produits
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Event */}
      <section className="py-20 bg-brown-500 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-grid-lg" /> {/* Fallback or texture */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white">Un Événement à Célébrer ?</h2>
          <p className="text-xl text-cream-100 mb-8 max-w-2xl mx-auto">
            Mariage, anniversaire, pot de départ... Nous réalisons vos pièces montées, 
            mignardises et buffets salés sur mesure.
          </p>
          <Link 
            href="/commandes" 
            className={cn(buttonVariants({ size: "lg" }), "bg-cream-50 text-brown-900 hover:bg-cream-100")}
          >
            Demander un devis
          </Link>
        </div>
      </section>
    </div>
  );
}
