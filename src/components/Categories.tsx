import { Pill, Sparkles, Baby, Leaf, Stethoscope, ClipboardList, Heart, ShoppingBasket } from 'lucide-react';
import { categories } from '@/data/products';

const iconMap: Record<string, React.ElementType> = {
  Pill,
  Sparkles,
  Baby,
  Leaf,
  Stethoscope,
  ClipboardList,
  Heart,
  ShoppingBasket,
};

interface CategoriesProps {
  onCategoryClick: (category: string | null) => void;
  activeCategory: string | null;
}

export default function Categories({ onCategoryClick, activeCategory }: CategoriesProps) {
  return (
    <section id="categories" className="py-16 md:py-24 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-3">
            Shop by Category
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Browse our wide range of healthcare products across various categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {/* All Products Card */}
          <button
            onClick={() => onCategoryClick(null)}
            className={`group p-4 md:p-6 bg-card rounded-2xl border transition-all duration-300 card-hover text-left ${
              activeCategory === null
                ? 'border-primary shadow-lg shadow-primary/10'
                : 'border-border hover:border-primary/30'
            }`}
          >
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${
              activeCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
            }`}>
              <ShoppingBasket className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="font-heading font-semibold text-sm md:text-base mb-1">All Products</h3>
            <p className="text-xs md:text-sm text-muted-foreground">View everything</p>
          </button>

          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Pill;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategoryClick(category.id)}
                className={`group p-4 md:p-6 bg-card rounded-2xl border transition-all duration-300 card-hover text-left ${
                  isActive
                    ? 'border-primary shadow-lg shadow-primary/10'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                }`}>
                  <Icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="font-heading font-semibold text-sm md:text-base mb-1">{category.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{category.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
