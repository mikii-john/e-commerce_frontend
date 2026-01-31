import { create } from 'zustand';
import { Product, CartItem } from '../lib/types';
import { toast } from 'react-hot-toast';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  
  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );
      
      if (existingItem) {
        toast.success(`${product.name} quantity updated!`);
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      
      toast.success(`${product.name} added to cart!`);
      return {
        items: [...state.items, { product, quantity: 1 }],
      };
    });
  },
  
  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
    toast.success('Item removed from cart');
  },
  
  updateQuantity: (productId: string, quantity: number) => {
    if (quantity < 1) {
      get().removeItem(productId);
      return;
    }
    
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      ),
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
    toast.success('Cart cleared');
  },
  
  toggleCart: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
  
  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));

// Optional: Add localStorage persistence manually
if (typeof window !== 'undefined') {
  // Load cart from localStorage on store creation
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    try {
      const parsed = JSON.parse(savedCart);
      useCartStore.setState({ items: parsed });
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }
  
  // Subscribe to store changes and save to localStorage
  useCartStore.subscribe(
    (state) => state.items,
    (items) => {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  );
}