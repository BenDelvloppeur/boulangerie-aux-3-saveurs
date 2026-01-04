import { Metadata } from "next";
import { OrderForm } from "@/components/order/order-form";
import { Clock, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Commander en ligne",
  description: "Click & Collect pour vos pains et viennoiseries ou demande de devis pour vos événements traiteur à Avranches.",
};

export default function OrderPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-20">
       <section className="bg-brown-900 text-cream-50 py-16 md:py-20 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-cream-50">Vos Commandes</h1>
          <p className="text-lg md:text-xl text-cream-200 max-w-2xl mx-auto">
            Réservez vos produits favoris pour un retrait rapide ou planifiez vos événements avec nos artisans.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <OrderForm />
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-cream-200">
              <h3 className="text-lg font-serif font-bold text-brown-900 mb-4">Informations Utiles</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Clock className="h-5 w-5 text-brown-500 shrink-0" />
                  <div>
                    <span className="font-bold text-brown-900 block text-sm">Retrait Commande</span>
                    <span className="text-sm text-brown-800/80">Dispo 30min après commande<br/>Selon horaires d'ouverture</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 text-brown-500 shrink-0" />
                  <div>
                     <span className="font-bold text-brown-900 block text-sm">Adresse de retrait</span>
                     <span className="text-sm text-brown-800/80">{siteConfig.address}</span>
                  </div>
                </li>
                 <li className="flex gap-3">
                  <Phone className="h-5 w-5 text-brown-500 shrink-0" />
                  <div>
                     <span className="font-bold text-brown-900 block text-sm">Besoin d'aide ?</span>
                     <span className="text-sm text-brown-800/80">{siteConfig.phone}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-brown-800 p-6 rounded-xl text-cream-50">
               <h3 className="text-lg font-serif font-bold mb-2">Délais Traiteur</h3>
               <p className="text-sm text-cream-200 mb-4">
                 Pour les commandes événementielles (pièces montées, buffets), merci de nous contacter au moins 
                 <span className="font-bold text-white"> 48h à l'avance</span>.
               </p>
               <div className="text-xs text-cream-300 italic">
                 Pour toute urgence, privilégiez l'appel téléphonique.
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
