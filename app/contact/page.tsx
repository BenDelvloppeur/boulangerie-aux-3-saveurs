import { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Horaires",
  description: "Retrouvez-nous au cœur d'Avranches. Horaires d'ouverture, plan d'accès et contact direct.",
};

export default function ContactPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-20">
      <section className="bg-brown-900 text-cream-50 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-cream-50">Nous Contacter</h1>
          <p className="text-lg text-cream-200">Une question ? Une envie particulière ?</p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Info & Hours */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-cream-200">
              <h2 className="text-2xl font-serif font-bold text-brown-900 mb-6">Nos Coordonnées</h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="bg-cream-100 p-3 rounded-full h-fit">
                    <MapPin className="h-6 w-6 text-brown-800" />
                  </div>
                  <div>
                    <span className="block font-bold text-brown-900">Adresse</span>
                    <span className="text-brown-800/80">{siteConfig.address}</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-cream-100 p-3 rounded-full h-fit">
                    <Phone className="h-6 w-6 text-brown-800" />
                  </div>
                  <div>
                    <span className="block font-bold text-brown-900">Téléphone</span>
                    <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="text-brown-800/80 hover:text-brown-600 underline">
                      {siteConfig.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-cream-100 p-3 rounded-full h-fit">
                    <Mail className="h-6 w-6 text-brown-800" />
                  </div>
                  <div>
                    <span className="block font-bold text-brown-900">Email</span>
                    <a href={`mailto:${siteConfig.email}`} className="text-brown-800/80 hover:text-brown-600 underline">
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-cream-200">
              <h2 className="text-2xl font-serif font-bold text-brown-900 mb-6 flex items-center gap-3">
                <Clock className="h-6 w-6 text-brown-500" />
                Horaires d'ouverture
              </h2>
              <ul className="space-y-3">
                {siteConfig.openingHours.map((schedule) => (
                  <li key={schedule.day} className="flex justify-between items-center border-b border-cream-100 last:border-0 pb-2 last:pb-0">
                    <span className="font-medium text-brown-900">{schedule.day}</span>
                    <span className={schedule.hours === "Fermé" ? "text-red-500 font-medium" : "text-brown-800"}>
                      {schedule.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Map (Placeholder) */}
          <div className="bg-cream-200 rounded-xl overflow-hidden min-h-[400px] relative">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2639.263884877395!2d-1.3655!3d48.6865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480ec0123456789%3A0x123456789abcdef!2s9%20Rue%20du%20G%C3%A9n%C3%A9ral%20Patton%2C%2050300%20Avranches!5e0!3m2!1sfr!2sfr!4v1600000000000!5m2!1sfr!2sfr" 
               width="100%" 
               height="100%" 
               style={{ border: 0, minHeight: '100%' }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               className="absolute inset-0"
             ></iframe>
          </div>

        </div>
      </div>
    </div>
  );
}
