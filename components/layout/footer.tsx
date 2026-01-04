import Link from "next/link";
import { siteConfig, navLinks } from "@/data/site-config";
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="bg-brown-900 text-cream-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Social */}
          <div>
            <div className="mb-6">
              <Logo variant="light" />
            </div>
            <p className="text-cream-200 mb-6 max-w-sm">
              Boulangerie artisanale, pâtisserie fine et traiteur événementiel à Avranches. 
              La passion du goût et du fait-maison.
            </p>
            <div className="flex gap-4">
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-cream-300 transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-cream-300 transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-cream-50">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-cream-200 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-cream-50">Nous trouver</h4>
            <ul className="space-y-4 text-cream-200">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 shrink-0" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brown-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream-300">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.</p>
          <div className="flex gap-6 items-center">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions Légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">
              Politique de Confidentialité
            </Link>
            <Link href="/admin" className="hover:text-white transition-colors text-cream-200/60 hover:text-white text-xs flex items-center gap-1 font-medium ml-4">
              <span className="opacity-70">🔒</span> Accès Gérant
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
