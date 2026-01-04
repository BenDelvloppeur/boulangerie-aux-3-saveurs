// Type de commande partagé
export interface Order {
  id: string;
  client: string;
  email: string;
  phone: string;
  date: string;
  pickupTime?: string; // Pour click & collect
  type: 'click-collect' | 'event';
  status: 'pending' | 'ready' | 'confirmed' | 'cancelled';
  total: string;
  items: any[];
  note?: string;
  guests?: number; // Pour event
  budget?: string; // Pour event
  description?: string; // Pour event
}

const STORAGE_KEY = 'aux3saveurs_orders';

// Données initiales pour ne pas avoir un tableau vide au début de la démo
const INITIAL_DATA: Order[] = [
  {
    id: "CMD-DEMO-001",
    client: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "06 12 34 56 78",
    date: new Date().toISOString().split('T')[0],
    pickupTime: "10:30",
    type: "click-collect",
    status: "pending",
    total: "14.50€",
    items: [
      { name: "2x Baguette Tradition", price: "2.40€" },
      { name: "4x Croissant Pur Beurre", price: "5.20€" },
      { name: "1x Fraisier (Part)", price: "4.50€" }
    ],
    note: "Pain bien cuit SVP"
  }
];

export const OrderService = {
  // Récupérer toutes les commandes
  getOrders: (): Order[] => {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Si vide, on met les données de démo et on sauvegarde
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(stored);
  },

  // Ajouter une commande
  addOrder: (order: Omit<Order, 'id' | 'status' | 'date'>) => {
    const orders = OrderService.getOrders();
    
    const newOrder: Order = {
      ...order,
      id: `CMD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };

    orders.unshift(newOrder); // Ajouter au début
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    return newOrder;
  },

  // Mettre à jour le statut
  updateStatus: (id: string, status: Order['status']) => {
    const orders = OrderService.getOrders();
    const updatedOrders = orders.map(o => o.id === id ? { ...o, status } : o);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
    return updatedOrders;
  }
};
