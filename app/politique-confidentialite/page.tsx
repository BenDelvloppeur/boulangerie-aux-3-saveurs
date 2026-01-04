import { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité et gestion des données personnelles.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-20">
      <section className="bg-brown-900 text-cream-50 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-cream-50">Politique de Confidentialité</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-cream-200 space-y-8 text-brown-900">
          
          <section>
            <h2 className="text-xl font-serif font-bold mb-4">Collecte des données</h2>
            <p>
              Nous collectons uniquement les données nécessaires au traitement de vos commandes (Click & Collect, Devis) : 
              nom, prénom, téléphone, email. Ces données ne sont jamais revendues à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold mb-4">Cookies</h2>
            <p>
              Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. 
              Aucun cookie publicitaire ou de traçage tiers n'est installé sans votre consentement préalable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold mb-4">Formulaire de contact</h2>
            <p>
              Les informations recueillies sur le formulaire de contact sont enregistrées dans un fichier informatisé 
              par {siteConfig.name} pour la gestion de notre clientèle. Elles sont conservées pendant 3 ans.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
