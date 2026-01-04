"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  popular?: boolean;
}

interface ProductCatalogProps {
  products: Product[];
}

export function ProductCatalog({ products }: ProductCatalogProps) {
  const categories = ["Tous", ...Array.from(new Set(products.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === "Tous" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Search & Filters Container */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brown-400" />
          <input 
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-cream-300 focus:outline-none focus:ring-1 focus:ring-brown-800 bg-white text-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "primary" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full",
                activeCategory === category 
                  ? "bg-brown-800 border-brown-800" 
                  : "border-cream-300 text-brown-800 hover:bg-cream-100"
              )}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-brown-800/60">Aucun produit trouvé dans cette catégorie.</p>
        </div>
      )}
    </div>
  );
}
