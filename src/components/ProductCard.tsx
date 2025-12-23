import { useState } from 'react';
import { ShoppingCart, MessageCircle, Eye, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import ProductQuickView from './ProductQuickView';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, generateWhatsAppLink } = useCart();

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <>
      <div className="group bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 card-hover flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary/50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-lg">
              {discount}% OFF
            </div>
          )}

          {/* Quick View Button */}
          <button
            onClick={() => setIsQuickViewOpen(true)}
            className="absolute top-3 right-3 w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-card"
          >
            <Eye className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-heading font-semibold text-sm md:text-base line-clamp-1 mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{product.description}</p>
          <p className="text-[10px] text-muted-foreground mb-3">{product.unit}</p>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold text-primary">₹{product.price}</span>
            <span className="text-sm text-muted-foreground line-through">₹{product.mrp}</span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-muted-foreground">Qty:</span>
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 mt-auto">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs h-9"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Add
            </Button>
            <Button
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5 text-xs h-9"
              asChild
            >
              <a
                href={generateWhatsAppLink(product, quantity)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Order
              </a>
            </Button>
          </div>
        </div>
      </div>

      <ProductQuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
