"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { ShoppingBasket } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
    });
    
    toast.success(`${product.name} ajouté au panier`, {
      description: "Continuez vos achats ou validez votre commande.",
      duration: 2000,
    });
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-cream-200 flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden bg-cream-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-brown-500 mb-2 uppercase tracking-wide">
          {product.category}
        </div>
        <h3 className="text-lg font-bold text-brown-900 mb-2">{product.name}</h3>
        <p className="text-sm text-brown-800/80 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-cream-100">
          <span className="font-bold text-brown-900 text-lg">{product.price}</span>
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={handleAddToCart}
          >
            <ShoppingBasket className="h-4 w-4 mr-2" /> Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
}
