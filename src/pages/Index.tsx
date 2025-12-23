import { useState } from 'react';
import { CartProvider } from '@/hooks/useCart';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Products from '@/components/Products';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function IndexContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
    setTimeout(() => {
      document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Categories onCategoryClick={handleCategoryClick} activeCategory={activeCategory} />
        <Products activeCategory={activeCategory} />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function Index() {
  return (
    <CartProvider>
      <IndexContent />
    </CartProvider>
  );
}
