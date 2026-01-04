"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search, 
  Calendar, 
  MoreHorizontal,
  FileText,
  User,
  Phone,
  TrendingUp,
  Euro,
  Power
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OrderService, type Order } from "@/lib/storage";
import { toast } from "sonner";
import { Trash } from "lucide-react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    averageBasket: 0,
    pendingCount: 0,
    todayOrders: 0
  });
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  // Charger les commandes et calculer les stats
  useEffect(() => {
    const loadedOrders = OrderService.getOrders();
    setOrders(loadedOrders);
    calculateStats(loadedOrders);
  }, []);

  const calculateStats = (data: Order[]) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Commandes valides (non annulées)
    const validOrders = data.filter(o => o.status !== 'cancelled' && o.type === 'click-collect');
    
    // Calcul CA Total
    const revenue = validOrders.reduce((acc, order) => {
        const amount = parseFloat(order.total.replace('€', '').trim()) || 0;
        return acc + amount;
    }, 0);

    // Commandes du jour
    const todayCount = data.filter(o => o.date === today).length;

    setStats({
        totalRevenue: revenue,
        averageBasket: validOrders.length > 0 ? revenue / validOrders.length : 0,
        pendingCount: data.filter(o => o.status === 'pending').length,
        todayOrders: todayCount
    });
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ready": return "bg-blue-100 text-blue-800 border-blue-200";
      case "confirmed": return "bg-green-100 text-green-800 border-green-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "En attente";
      case "ready": return "Prête / À retirer";
      case "confirmed": return "Terminée";
      case "cancelled": return "Annulée";
      default: return status;
    }
  };

  const updateStatus = (id: string, newStatus: any) => {
    const updatedList = OrderService.updateStatus(id, newStatus);
    setOrders(updatedList);
    calculateStats(updatedList); // Recalculer les stats en temps réel
    
    if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
    }

    toast.success("Statut mis à jour", {
        description: `La commande est maintenant ${getStatusLabel(newStatus)}`
    });
  };

  const handleResetDemo = () => {
    if (confirm("Attention : Cela va effacer toutes les commandes de démonstration et recharger la page. Continuer ?")) {
        localStorage.removeItem('aux3saveurs_orders');
        window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="bg-brown-900 text-white p-1 rounded">Admin</span> 
            Aux 3 Saveurs
          </h1>
          <div className="flex items-center gap-4">
             <Button 
                variant={isStoreOpen ? "outline" : "destructive"} 
                size="sm"
                onClick={() => setIsStoreOpen(!isStoreOpen)}
                className={cn("gap-2", isStoreOpen ? "text-green-700 border-green-200 bg-green-50" : "")}
             >
                <Power className="h-4 w-4" />
                {isStoreOpen ? "Commandes Ouvertes" : "Commandes Fermées"}
             </Button>
             <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>
             <Button 
                size="sm" 
                variant="outline" 
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={handleResetDemo}
             >
                <Trash className="h-4 w-4 mr-2" /> Reset Démo
             </Button>
             <Button size="sm" variant="ghost" asChild>
                <a href="/">Voir le site</a>
             </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" /> Commandes du jour
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.todayOrders}</div>
                <div className="absolute right-4 top-4 text-gray-100">
                    <Calendar className="h-12 w-12 opacity-50" />
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> À préparer (En cours)
                </div>
                <div className="text-2xl font-bold text-yellow-600">{stats.pendingCount}</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-2">
                    <Euro className="h-4 w-4" /> Chiffre d'Affaires (Total)
                </div>
                <div className="text-2xl font-bold text-green-600">{stats.totalRevenue.toFixed(2)}€</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" /> Panier Moyen
                </div>
                <div className="text-2xl font-bold text-blue-600">{stats.averageBasket.toFixed(2)}€</div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Order List */}
            <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-gray-900">Liste des commandes</h2>
                    <div className="flex gap-2">
                        <button onClick={() => setFilter("all")} className={cn("px-3 py-1 rounded-full text-sm font-medium transition-colors", filter === "all" ? "bg-gray-900 text-white" : "bg-white text-gray-600 border hover:bg-gray-50")}>Tout</button>
                        <button onClick={() => setFilter("pending")} className={cn("px-3 py-1 rounded-full text-sm font-medium transition-colors", filter === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-white text-gray-600 border hover:bg-gray-50")}>En attente</button>
                        <button onClick={() => setFilter("event")} className={cn("px-3 py-1 rounded-full text-sm font-medium transition-colors", filter === "event" ? "bg-purple-100 text-purple-800" : "bg-white text-gray-600 border hover:bg-gray-50")}>Devis</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
                    <div className="divide-y divide-gray-100">
                        {filteredOrders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                <Search className="h-8 w-8 mb-2 opacity-50" />
                                <p>Aucune commande trouvée</p>
                            </div>
                        ) : (
                            filteredOrders.map((order) => (
                                <div 
                                    key={order.id} 
                                    onClick={() => setSelectedOrder(order)}
                                    className={cn(
                                        "p-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between group",
                                        selectedOrder?.id === order.id ? "bg-blue-50/50 border-l-4 border-blue-500" : "border-l-4 border-transparent"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", order.type === 'event' ? "bg-purple-100 text-purple-600" : "bg-orange-100 text-orange-600")}>
                                            {order.type === 'event' ? <FileText className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{order.client}</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {order.type === 'click-collect' ? `Retrait : ${order.pickupTime?.replace('T', ' ')}` : `Événement : ${order.date}`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap", getStatusColor(order.status))}>
                                            {getStatusLabel(order.status)}
                                        </span>
                                        <span className="font-bold text-gray-900 w-20 text-right hidden sm:block">{order.type === 'event' ? 'Devis' : order.total}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Order Details Panel */}
            <div className="lg:col-span-1">
                {selectedOrder ? (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-24 animate-in slide-in-from-right-4 duration-300">
                        <div className="flex justify-between items-start mb-6 border-b pb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">Détails Commande</h3>
                                <p className="text-sm text-gray-500">#{selectedOrder.id}</p>
                            </div>
                            <span className={cn("px-3 py-1 rounded-full text-sm font-medium border text-center", getStatusColor(selectedOrder.status))}>
                                {getStatusLabel(selectedOrder.status)}
                            </span>
                        </div>

                        {/* Customer Info */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
                            <div className="flex items-center gap-3 text-gray-700">
                                <User className="h-4 w-4 text-gray-400" />
                                <span className="font-medium">{selectedOrder.client}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <a href={`tel:${selectedOrder.phone}`} className="hover:text-blue-600 transition-colors">{selectedOrder.phone}</a>
                            </div>
                            {selectedOrder.note && (
                                <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100 text-sm text-yellow-800 mt-2">
                                    <strong>Note client :</strong> {selectedOrder.note}
                                </div>
                            )}
                        </div>

                        {/* Items */}
                        <div className="mb-8">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <ShoppingBag className="h-4 w-4 text-gray-400" /> Contenu
                            </h4>
                            {selectedOrder.type === 'click-collect' ? (
                                <ul className="space-y-3">
                                    {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                                        <li key={idx} className="flex justify-between text-sm group">
                                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item.name}</span>
                                            <span className="font-medium text-gray-900">{item.price}</span>
                                        </li>
                                    ))}
                                    <li className="flex justify-between text-lg font-bold pt-4 border-t mt-4 text-brown-900">
                                        <span>Total</span>
                                        <span>{selectedOrder.total}</span>
                                    </li>
                                </ul>
                            ) : (
                                <div className="text-sm text-gray-600 space-y-2">
                                    <p className="flex justify-between border-b pb-2"><span>Type</span> <span className="font-medium">Traiteur</span></p>
                                    <p className="flex justify-between border-b pb-2"><span>Invités</span> <span className="font-medium">{selectedOrder.guests} pers.</span></p>
                                    <p className="flex justify-between border-b pb-2"><span>Budget</span> <span className="font-medium">~{selectedOrder.budget}</span></p>
                                    <div className="mt-4 p-4 bg-purple-50 rounded-lg text-purple-900 italic border border-purple-100">
                                        "{selectedOrder.description}"
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                            {selectedOrder.status === 'pending' && (
                                <>
                                    <Button onClick={() => updateStatus(selectedOrder.id, 'ready')} className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white">
                                        <CheckCircle className="h-4 w-4 mr-2" /> Marquer comme Prête
                                    </Button>
                                    <Button onClick={() => updateStatus(selectedOrder.id, 'cancelled')} variant="outline" className="col-span-2 text-red-600 border-red-200 hover:bg-red-50">
                                        <XCircle className="h-4 w-4 mr-2" /> Refuser / Annuler
                                    </Button>
                                </>
                            )}
                            {selectedOrder.status === 'ready' && (
                                <Button onClick={() => updateStatus(selectedOrder.id, 'confirmed')} className="col-span-2 bg-green-600 hover:bg-green-700 text-white h-12 text-lg">
                                    <CheckCircle className="h-5 w-5 mr-2" /> Terminée (Payée)
                                </Button>
                            )}
                            {(selectedOrder.status === 'confirmed' || selectedOrder.status === 'cancelled') && (
                                <div className="col-span-2 text-center text-sm text-gray-400 py-2">
                                    Aucune action disponible
                                </div>
                            )}
                        </div>

                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full min-h-[400px] flex flex-col items-center justify-center text-gray-400 text-center p-8">
                        <div className="bg-gray-50 p-4 rounded-full mb-4">
                            <MoreHorizontal className="h-8 w-8 text-gray-300" />
                        </div>
                        <p className="font-medium text-gray-900">Aucune commande sélectionnée</p>
                        <p className="text-sm mt-1">Cliquez sur une commande à gauche pour voir les détails.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
