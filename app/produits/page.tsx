import { Metadata } from "next";
import { ProductCatalog } from "@/components/product/product-catalog";
import products from "@/data/products.json";

export const metadata: Metadata = {
  title: "Nos Produits Artisanaux",
  description: "Découvrez nos pains au levain, viennoiseries maison, pâtisseries fines et offre traiteur. Fabriqué à Avranches avec des ingrédients locaux.",
};

export default function ProductsPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-20">
      {/* Header Section */}
      <section className="bg-brown-900 text-cream-50 py-16 md:py-24 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-cream-50">Notre Carte</h1>
          <p className="text-lg md:text-xl text-cream-200 max-w-2xl mx-auto">
            De la baguette tradition croustillante aux gâteaux les plus raffinés, 
            explorez notre savoir-faire artisanal.
          </p>
        </div>
      </section>

      {/* Catalog */}
      <div className="container mx-auto px-4">
        <ProductCatalog products={products} />
      </div>
    </div>
  );
}
