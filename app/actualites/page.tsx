import { Metadata } from "next";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Actualités & Réseaux Sociaux",
  description: "Suivez la vie de la boulangerie Aux 3 Saveurs à Avranches. Nouveautés, événements et coulisses.",
};

// Mock Instagram Data
const instagramPosts = [
  { id: 1, src: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=800", caption: "La fournée du matin est prête ! 🥖 #artisan #boulangerie #avranches" },
  { id: 2, src: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=800", caption: "Nouveauté : Le Brownie 100% chocolat. 🍫" },
  { id: 3, src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800", caption: "Préparation des commandes du week-end. Merci à tous ! 🙏" },
  { id: 4, src: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800", caption: "Nos tartelettes aux fruits de saison. 🍓" },
  { id: 5, src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800", caption: "L'équipe vous souhaite une excellente semaine !" },
  { id: 6, src: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=800", caption: "Pain spécial aux graines, parfait pour le fromage." },
];

export default function NewsPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-20">
      <section className="bg-brown-900 text-cream-50 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-cream-50">Actualités</h1>
          <p className="text-lg text-cream-200">Suivez notre quotidien sur les réseaux sociaux</p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        
        {/* Social Header */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-12">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noreferrer" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E1306C] hover:bg-[#C13584] text-white font-medium rounded-md px-6 py-3 transition-colors shadow-sm"
          >
            <Instagram className="h-5 w-5 shrink-0" /> 
            <span>Suivre sur Instagram</span>
          </a>
          
          <a 
            href="https://www.facebook.com/aux3saveurs50" 
            target="_blank" 
            rel="noreferrer" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#165EAB] text-white font-medium rounded-md px-6 py-3 transition-colors shadow-sm"
          >
            <Facebook className="h-5 w-5 shrink-0" /> 
            <span>Suivre sur Facebook</span>
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {instagramPosts.map((post) => (
            <div key={post.id} className="group relative aspect-square overflow-hidden rounded-xl shadow-md cursor-pointer">
              <Image
                src={post.src}
                alt={post.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                <p className="text-white text-center font-medium">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
