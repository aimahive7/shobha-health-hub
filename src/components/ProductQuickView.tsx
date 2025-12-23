import { useState } from 'react';
import { X, Minus, Plus, ShoppingCart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useCart } from '@/hooks/useCart';

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, generateWhatsAppLink } = useCart();

  if (!isOpen) return null;

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-10 h-8 w-8 p-0 bg-card/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="aspect-square bg-secondary/50 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-bold px-3 py-1.5 rounded-lg">
                {discount}% OFF
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col">
            <h2 className="text-xl md:text-2xl font-heading font-bold mb-2">
              {product.name}
            </h2>
            <p className="text-muted-foreground mb-4">{product.description}</p>

            {/* Details */}
            <div className="space-y-2 mb-6">
              {product.composition && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Composition</span>
                  <span className="font-medium">{product.composition}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Unit</span>
                <span className="font-medium">{product.unit}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium capitalize">{product.category}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-bold text-primary">₹{product.price}</span>
              <span className="text-lg text-muted-foreground line-through">₹{product.mrp}</span>
              {discount > 0 && (
                <span className="text-sm text-accent font-medium">Save ₹{product.mrp - product.price}</span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-muted-foreground">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-4 border-t border-b border-border mb-6">
              <span className="text-muted-foreground">Total</span>
              <span className="text-xl font-bold">₹{product.price * quantity}</span>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <Button
                variant="outline"
                size="lg"
                className="gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                asChild
              >
                <a
                  href={generateWhatsAppLink(product, quantity)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
