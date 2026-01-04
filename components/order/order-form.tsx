"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag, FileText, Upload, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { OrderService } from "@/lib/storage";
import { toast } from "sonner";

type OrderType = 'click-collect' | 'event';

export function OrderForm() {
  const [orderType, setOrderType] = useState<OrderType>('click-collect');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { items, removeItem, addItem, clearCart, totalItems } = useCart();

  // Separate forms could be better, but for simplicity managing state here
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Construct the final message including cart items if Click & Collect
    let finalOrderData: any = { 
      client: data.name,
      email: data.email,
      phone: data.phone,
      type: orderType,
      items: [],
      total: "À définir" // Dans une vraie app, on calculerait le total précis
    };
    
    if (orderType === 'click-collect') {
       finalOrderData.pickupTime = data.pickupTime;
       finalOrderData.note = data.notes;
       
       if (items.length > 0) {
          finalOrderData.items = items.map(i => ({ name: `${i.quantity}x ${i.name}`, price: i.price }));
          // Calcul approximatif du total pour la démo
          const totalCalc = items.reduce((acc, item) => {
             const price = parseFloat(item.price.replace('€', '').trim());
             return acc + (price * item.quantity);
          }, 0);
          finalOrderData.total = totalCalc.toFixed(2) + '€';
       } else {
          // Cas liste manuelle
          finalOrderData.note = (finalOrderData.note ? finalOrderData.note + '\n\n' : '') + data.items;
       }
    } else {
       finalOrderData.date = data.eventDate;
       finalOrderData.guests = data.guests;
       finalOrderData.budget = data.budget;
       finalOrderData.description = data.description;
       finalOrderData.total = "Sur devis";
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save to local storage for Admin Demo
    OrderService.addOrder(finalOrderData);

    console.log("Order Saved:", finalOrderData);
    
    toast.success("Commande envoyée avec succès !", {
      description: "Vous allez recevoir un email de confirmation.",
      duration: 5000,
    });

    setIsSubmitting(false);
    setIsSuccess(true);
    clearCart(); // Empty cart on success
    reset();
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-in fade-in">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="h-8 w-8 text-green-700" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-green-800 mb-2">Commande Reçue !</h3>
        <p className="text-green-700 mb-6">
          Merci pour votre commande. Nous allons la traiter dans les plus brefs délais.<br/>
          Un email de confirmation vous a été envoyé.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline" className="bg-white border-green-200 text-green-800 hover:bg-green-100">
          Passer une autre commande
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-cream-200 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-cream-200">
        <button
          onClick={() => setOrderType('click-collect')}
          className={cn(
            "flex-1 py-4 text-center font-medium transition-colors flex items-center justify-center gap-2",
            orderType === 'click-collect' 
              ? "bg-white text-brown-900 border-b-2 border-brown-800" 
              : "bg-cream-50 text-brown-500 hover:bg-cream-100"
          )}
        >
          <ShoppingBag className="h-4 w-4" />
          Click & Collect
        </button>
        <button
          onClick={() => setOrderType('event')}
          className={cn(
            "flex-1 py-4 text-center font-medium transition-colors flex items-center justify-center gap-2",
            orderType === 'event' 
              ? "bg-white text-brown-900 border-b-2 border-brown-800" 
              : "bg-cream-50 text-brown-500 hover:bg-cream-100"
          )}
        >
          <FileText className="h-4 w-4" />
          Devis Événement
        </button>
      </div>

      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-brown-900">Nom complet *</label>
              <input
                {...register("name", { required: true })}
                className="w-full px-4 py-2 rounded-md border border-cream-300 focus:outline-none focus:ring-1 focus:ring-brown-800 bg-cream-50/50"
                placeholder="Jean Dupont"
              />
              {errors.name && <span className="text-red-500 text-xs">Ce champ est requis</span>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-brown-900">Email *</label>
              <input
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                type="email"
                className="w-full px-4 py-2 rounded-md border border-cream-300 focus:outline-none focus:ring-1 focus:ring-brown-800 bg-cream-50/50"
                placeholder="jean@exemple.fr"
              />
              {errors.email && <span className="text-red-500 text-xs">Email invalide</span>}
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-brown-900">Téléphone *</label>
              <input
                {...register("phone", { required: true })}
                type="tel"
                className="w-full px-4 py-2 rounded-md border border-cream-300 focus:outline-none focus:ring-1 focus:ring-brown-800 bg-cream-50/50"
                placeholder="06 12 34 56 78"
              />
            </div>
            
            {orderType === 'click-collect' ? (
               <div className="space-y-2">
               <label htmlFor="pickupTime" className="text-sm font-medium text-brown-900">Heure de retrait souhaitée *</label>
               <input
                 {...register("pickupTime", { required: true })}
                 type="datetime-local"
                 className="w-full px-4 py-2 rounded-md border border-cream-300 focus:outline-none focus:ring-1 focus:ring-brown-800 bg-cream-50/50"
               />
             </div>
            ) : (
              <div className="space-y-2">
                <label htmlFor="eventDate" className="text-sm font-medium text-brown-900">Date de l'événement *</label>
                <input
                  {...register("eventDate", { required: true })}
                  type="date"
                  className="w-full px-4 py-2 rounded-md border border-cream-300 focus:outline-none focus:ring-1 focus:ring-brown-800 bg-cream-50/50"
                />
              </div>
            )}
          </div>

          {/* Specific Fields */}
          {orderType === 'click-collect' ? (
            <div className="space-y-4">
              <label className="text-sm font-medium text-brown-900">Votre commande *</label>
              
              {items.length > 0 ? (
                <div className="bg-cream-50 rounded-lg border border-cream-200 p-4">
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded shadow-sm">
                        <div className="flex items-center gap-3">
                           <div className="font-medium text-brown-900">{item.name}</div>
                           <div className="text-xs text-brown-500">({item.price})</div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="flex items-center border border-cream-200 rounded">
                              <button 
                                type="button" 
                                onClick={() => {/* Decrease logic not implemented in context yet perfectly, skipping for MVP simplicity - removing item implies quantity logic handling elsewhere or just remove */ removeItem(item.id)}}
                                className="px-2 py-1 hover:bg-cream-100 text-brown-800"
                                aria-label="Supprimer"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </button>
                              <span className="px-2 font-medium text-brown-900 w-8 text-center">{item.quantity}</span>
                              <button 
                                type="button" 
                                onClick={() => addItem({ id: item.id, name: item.name, price: item.price })}
                                className="px-2 py-1 hover:bg-cream-100 text-brown-800"
                                aria-label="Ajouter"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-right text-sm text-brown-500">
                    Total articles : <span className="font-bold text-brown-900">{totalItems}</span>
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="notes" className="text-sm font-medium text-brown-900 block mb-2">Instructions supplémentaires (optionnel)</label>
                    <textarea
                      {...register("notes")}
                      rows={2}
                      className="w-full px-4 py-2 rounded-md border border-cream-300 focus:outline-none focus:ring-1 focus:ring-brown-800 bg-white"
                      placeholder="Pain bien cuit, tranché..."
                    />
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs text-brown-500 mb-2">
                    Votre panier est vide. Vous pouvez lister vos envies ici ou aller sur la page <a href="/produits" className="underline font-bold">Produits</a> pour ajouter des articles.
                  </p>
                  <textarea
                    {...register("items", { required: items.length === 0 })}
                    rows={5}
                    className="w-full px-4 py-2 rounded-md border border-cream-300 focus:outline-none focus:ring-1 focus:ring-brown-800 bg-cream-50/50"
                    placeholder="- 2 Baguettes Tradition&#10;- 4 Pains au chocolat&#10;- 1 Fraisier 6 parts"
                  />
                  {errors.items && items.length === 0 && <span className="text-red-500 text-xs">Veuillez indiquer votre commande ou remplir votre panier</span>}
                </>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="guests" className="text-sm font-medium text-brown-900">Nombre d'invités (approx)</label>
                  <input
                    {...register("guests")}
                    type="number"
                    className="w-full px-4 py-2 rounded-md border border-cream-300 focus:outline-none focus:ring-1 focus:ring-brown-800 bg-cream-50/50"
                    placeholder="50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium text-brown-900">Budget indicatif</label>
                  <input
                    {...register("budget")}
                    type="text"
                    className="w-full px-4 py-2 rounded-md border border-cream-300 focus:outline-none focus:ring-1 focus:ring-brown-800 bg-cream-50/50"
                    placeholder="Ex: 500€"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-brown-900">Description de votre projet *</label>
                <textarea
                  {...register("description", { required: true })}
                  rows={5}
                  className="w-full px-4 py-2 rounded-md border border-cream-300 focus:outline-none focus:ring-1 focus:ring-brown-800 bg-cream-50/50"
                  placeholder="Type d'événement, thème, préférences alimentaires, produits souhaités..."
                />
              </div>
              {/* Fake Upload for now */}
              <div className="border-2 border-dashed border-cream-300 rounded-lg p-6 text-center hover:bg-cream-50 transition-colors cursor-pointer">
                 <Upload className="mx-auto h-8 w-8 text-cream-400 mb-2" />
                 <p className="text-sm text-brown-500 font-medium">Ajouter une photo ou un fichier d'inspiration</p>
                 <p className="text-xs text-brown-400">(JPG, PDF - Max 5Mo)</p>
              </div>
            </>
          )}

          <Button 
            type="submit" 
            className="w-full md:w-auto md:min-w-[200px]" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : (orderType === 'click-collect' ? "Confirmer la réservation" : "Demander un devis")}
          </Button>

          <p className="text-xs text-center text-brown-400 mt-4">
            * Ceci est une pré-commande. Le paiement s'effectuera lors du retrait en boutique.
          </p>
        </form>
      </div>
    </div>
  );
}
