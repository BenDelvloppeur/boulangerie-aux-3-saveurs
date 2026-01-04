import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-brown-900">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop")' }} // Placeholder bakery image
      />

      <div className="relative z-20 container mx-auto px-4 text-center text-cream-50">
        <span className="inline-block py-1 px-3 rounded-full bg-green-700/80 text-white text-sm font-medium mb-6 backdrop-blur-sm">
          Ouvert aujourd'hui jusqu'à 19h30
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight text-cream-50">
          L'Authenticité du Goût<br/>
          <span className="text-cream-200">Artisanal à Avranches</span>
        </h1>
        <p className="text-lg md:text-xl text-cream-100 max-w-2xl mx-auto mb-10">
          Pains au levain, viennoiseries pur beurre et pâtisseries fines faites maison chaque matin avec passion.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/produits" 
            className={cn(buttonVariants({ size: "lg" }), "bg-cream-50 text-brown-900 hover:bg-cream-100")}
          >
            Voir nos produits
          </Link>
          <Link 
            href="/commandes" 
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "text-cream-50 border-cream-50 hover:bg-white/10")}
          >
            Commander pour un événement
          </Link>
        </div>
      </div>
    </section>
  );
}
