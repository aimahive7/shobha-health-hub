import { products } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductsProps {
  activeCategory: string | null;
}

export default function Products({ activeCategory }: ProductsProps) {
  const filteredProducts = activeCategory
    ? products.filter(p => p.category === activeCategory)
    : products;

  return (
    <section id="products" className="py-16 md:py-24">
      <div className="container px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-2">
              {activeCategory
                ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Products`
                : 'Featured Products'}
            </h2>
            <div className="w-20 h-1 bg-primary rounded-full" />
          </div>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found in this category.</p>
            <p className="text-sm text-muted-foreground mt-2">Try selecting a different category or view all products.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
