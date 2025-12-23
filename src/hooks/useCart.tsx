import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, WHATSAPP_NUMBER, STORE_NAME } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalSavings: number;
  generateWhatsAppLink: (product?: Product, quantity?: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shobha_medical_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalSavings = items.reduce((sum, item) => sum + (item.product.mrp - item.product.price) * item.quantity, 0);

  const generateWhatsAppLink = (product?: Product, quantity = 1) => {
    let message: string;

    if (product) {
      message = `Hi ${STORE_NAME}, I want to order:\n\n` +
        `📦 ${product.name} x ${quantity}\n` +
        `💰 Price: ₹${product.price * quantity}\n\n` +
        `📍 My Address: [Please enter your delivery address]\n\n` +
        `Thank you!`;
    } else if (items.length > 0) {
      const itemsList = items.map(item => 
        `📦 ${item.product.name} x ${item.quantity} = ₹${item.product.price * item.quantity}`
      ).join('\n');

      message = `Hi ${STORE_NAME}, I want to order:\n\n` +
        `${itemsList}\n\n` +
        `💰 Total: ₹${totalPrice}\n` +
        `💵 You Save: ₹${totalSavings}\n\n` +
        `📍 My Address: [Please enter your delivery address]\n\n` +
        `Thank you!`;
    } else {
      message = `Hi ${STORE_NAME}, I'd like to know about your products and today's offers!`;
    }

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      totalSavings,
      generateWhatsAppLink,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
