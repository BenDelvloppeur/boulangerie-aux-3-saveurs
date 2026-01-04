import { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales et informations juridiques de la boulangerie Aux 3 Saveurs.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-20">
      <section className="bg-brown-900 text-cream-50 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-cream-50">Mentions Légales</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-cream-200 space-y-8 text-brown-900">
          
          <section>
            <h2 className="text-xl font-serif font-bold mb-4">1. Éditeur du site</h2>
            <p>
              Le site <strong>{siteConfig.name}</strong> est édité par l'entreprise <strong>{siteConfig.name}</strong>.<br/>
              Adresse : {siteConfig.address}<br/>
              Téléphone : {siteConfig.phone}<br/>
              Email : {siteConfig.email}<br/>
              SIRET : [Numéro SIRET à compléter]<br/>
              Directeur de la publication : [Nom du gérant]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold mb-4">2. Hébergement</h2>
            <p>
              Ce site est hébergé par Vercel Inc.<br/>
              Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789, USA<br/>
              Site web : https://vercel.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold mb-4">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
              Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold mb-4">4. Données personnelles</h2>
            <p>
              Conformément à la loi Informatique et Libertés et au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.
              Pour exercer ce droit, contactez-nous par email ou par courrier.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
