import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice, totalSavings, generateWhatsAppLink } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card w-full max-w-lg mx-4 max-h-[85vh] rounded-2xl shadow-2xl flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold">Your Cart</h2>
            <span className="text-sm text-muted-foreground">({items.length} items)</span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button variant="outline" className="mt-4" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 bg-secondary/50 rounded-xl"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.product.unit}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-primary">₹{item.product.price}</span>
                    <span className="text-xs text-muted-foreground line-through">₹{item.product.mrp}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                  <div className="flex items-center gap-1 bg-card rounded-lg border border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-accent">
                <span>You Save</span>
                <span className="font-medium">₹{totalSavings}</span>
              </div>
              {totalPrice < 500 && (
                <p className="text-xs text-muted-foreground">
                  Add ₹{500 - totalPrice} more for free delivery!
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                asChild
              >
                <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
