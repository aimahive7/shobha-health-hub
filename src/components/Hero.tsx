import { ArrowDown, MessageCircle, Shield, Truck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const trustBadges = [
  { icon: Shield, text: '100% Genuine', description: 'Authentic products only' },
  { icon: Truck, text: 'Free Delivery', description: 'On orders above ₹500' },
  { icon: Clock, text: '24x7 Support', description: 'We\'re always here' },
];

export default function Hero() {
  const { generateWhatsAppLink } = useCart();

  const scrollToCategories = () => {
    document.querySelector('#categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16 md:pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium animate-fade-in-up">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Your Trusted Pharmacy Since 2020
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Medicines, Cosmetics & More –{' '}
            <span className="text-primary">Delivered Fast</span> via{' '}
            <span className="text-accent">WhatsApp</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Genuine products from trusted brands. Order in seconds – just message us on WhatsApp!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground gap-2 text-base h-12 px-8 shadow-accent-glow"
              onClick={scrollToCategories}
            >
              Shop Now
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto gap-2 text-base h-12 px-8 border-primary/30 hover:bg-primary/5"
              asChild
            >
              <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 text-accent" />
                WhatsApp Order
              </a>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 pt-8 md:pt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {trustBadges.map((badge, index) => (
              <div
                key={badge.text}
                className="flex items-center justify-center gap-3 p-4 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <badge.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">{badge.text}</p>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </div>
    </section>
  );
}
