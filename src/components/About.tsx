import { useEffect, useRef, useState } from "react";
import { CheckCircle, Users, Package, HeadphonesIcon } from "lucide-react";
import { ESTABLISHED_YEAR, STORE_NAME } from "@/data/products";

const stats = [
  { icon: Users, value: 5000, suffix: "+", label: "Happy Customers" },
  { icon: Package, value: 2000, suffix: "+", label: "Products" },
  { icon: HeadphonesIcon, value: 24, suffix: "/7", label: "Support" },
];

const features = [
  "Licensed and certified pharmacy",
  "Genuine medicines from authorized distributors",
  "Expert pharmacist consultation available",
  "Same-day delivery within Nanded area",
  "Secure WhatsApp ordering system",
  "Competitive prices with regular discounts",
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-heading font-bold text-primary">
      {count}
      {suffix}
    </div>
  );
}

export default function About() {
  const yearsOfService = new Date().getFullYear() - ESTABLISHED_YEAR;

  return (
    <section id="about" className="py-16 md:py-24 bg-secondary/30">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-3">About {STORE_NAME}</h2>
              <div className="w-20 h-1 bg-primary rounded-full" />
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Your trusted pharmacy in Nanded since {ESTABLISHED_YEAR}. With {yearsOfService} years of dedicated
              service, we've been committed to providing genuine medicines, cosmetics, and healthcare products to our
              community.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              At {STORE_NAME}, we believe in making healthcare accessible and convenient. Our WhatsApp ordering system
              allows you to get your medicines delivered to your doorstep with just a message. We maintain the highest
              standards of quality and authenticity in every product we sell.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats & Image */}
          <div className="space-y-8">
            {/* Store Image Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center border border-border overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&h=400&fit=crop"
                alt="Pharmacy interior"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-card rounded-xl border border-border">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
