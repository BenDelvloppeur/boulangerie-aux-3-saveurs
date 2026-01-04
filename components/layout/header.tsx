"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ShoppingBasket } from "lucide-react";
import { siteConfig, navLinks } from "@/data/site-config";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  // Eviter l'hydration mismatch pour le compteur
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-cream-50/95 backdrop-blur-sm shadow-sm py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-brown-800 hover:text-brown-500 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <Link 
            href="/commandes" 
            className={cn(buttonVariants({ variant: "primary", size: "sm" }), "relative group")}
          >
            <span className="flex items-center gap-2">
              Commander
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-700 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-cream-50">
                  {totalItems}
                </span>
              )}
            </span>
          </Link>
        </nav>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 md:hidden">
            <Link href="/commandes" className="relative text-brown-800">
               <ShoppingBasket className="h-6 w-6" />
               {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-700 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} aria-label="Appeler">
                <Phone className="h-5 w-5 text-brown-800" />
            </a>
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            {isOpen ? <X className="h-6 w-6 text-brown-900" /> : <Menu className="h-6 w-6 text-brown-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cream-50 border-t border-cream-200 shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-brown-900 py-2 border-b border-cream-100 last:border-0"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/commandes" 
            className={cn(buttonVariants({ variant: "primary" }), "w-full justify-between")}
            onClick={() => setIsOpen(false)}
          >
            <span>Mon Panier</span>
            {mounted && totalItems > 0 && (
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                {totalItems} articles
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}
