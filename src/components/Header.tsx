import { useState, useEffect } from 'react';
import { Menu, X, Phone, ShoppingCart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { STORE_PHONE, STORE_NAME, STORE_ADDRESS } from '@/data/products';
import CartModal from './CartModal';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Categories', href: '#categories' },
  { name: 'Products', href: '#products' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems, generateWhatsAppLink } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-card/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#home" className="flex flex-col">
              <span className="text-xl md:text-2xl font-heading font-bold text-primary">
                {STORE_NAME}
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground -mt-1">
                {STORE_ADDRESS} | Fast Delivery
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Phone - Hidden on small mobile */}
              <a
                href={`tel:${STORE_PHONE}`}
                className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">{STORE_PHONE}</span>
              </a>

              {/* WhatsApp */}
              <Button
                size="sm"
                className="bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5 h-9 px-3"
                asChild
              >
                <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </Button>

              {/* Cart */}
              <Button
                variant="outline"
                size="sm"
                className="relative h-9 px-3"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-gentle">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden h-9 w-9 p-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-80' : 'max-h-0'
          }`}
        >
          <nav className="bg-card border-t border-border px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left py-3 px-4 text-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                {link.name}
              </button>
            ))}
            <a
              href={`tel:${STORE_PHONE}`}
              className="flex items-center gap-2 py-3 px-4 text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              {STORE_PHONE}
            </a>
          </nav>
        </div>
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
