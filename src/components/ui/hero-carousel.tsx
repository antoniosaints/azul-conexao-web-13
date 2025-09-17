import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Wifi, Zap, Shield } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useCity } from "@/contexts/CityContext";
import { mockCarouselSlides, filterByCity } from "@/data/mockData";

const slides = [
  {
    id: 1,
    title: "Internet Fibra Ótica",
    subtitle: "Velocidade incomparável para sua casa",
    description: "Experimente a internet mais rápida e estável do mercado com nossa tecnologia de fibra ótica.",
    icon: Wifi,
    bgGradient: "from-primary via-primary-glow to-accent",
  },
  {
    id: 2,
    title: "Velocidade Garantida",
    subtitle: "Sem oscilações, sem frustrações",
    description: "Nossa rede garante a velocidade contratada 24/7 com suporte técnico especializado.",
    icon: Zap,
    bgGradient: "from-accent via-primary to-primary-glow",
  },
  {
    id: 3,
    title: "Segurança Total",
    subtitle: "Proteção completa para sua conexão",
    description: "Navegue com tranquilidade com nossa tecnologia de segurança avançada.",
    icon: Shield,
    bgGradient: "from-primary-glow via-accent to-primary",
  },
];

export function HeroCarousel() {
  const { selectedCity } = useCity();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Filtrar slides por cidade ou usar slides estáticos como fallback
  const citySlides = selectedCity ? filterByCity(mockCarouselSlides, selectedCity.id) : [];
  const displaySlides = citySlides.length > 0 ? citySlides : slides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [displaySlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
  };

  return (
    <section className="relative h-[600px] overflow-hidden">
      {displaySlides.map((slide, index) => {
        // Handle both local slides (with icon) and mock data slides (without icon)
        const Icon = slide.icon || Wifi; // Default to Wifi icon if no icon provided
        const bgGradient = slide.bgGradient || "from-primary via-primary-glow to-accent"; // Default gradient
        
        return (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-in-out",
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            )}
          >
            <div className={cn("absolute inset-0 bg-gradient-to-r", bgGradient)} />
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl text-white">
                  <div className="flex items-center gap-4 mb-6 animate-fade-up">
                    <div className="p-3 bg-white/20 backdrop-blur rounded-full">
                      <Icon className="w-8 h-8" />
                    </div>
                    <span className="text-lg font-medium opacity-90">{slide.subtitle}</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up animation-delay-150">
                    {slide.title}
                  </h1>
                  <p className="text-xl mb-8 opacity-90 animate-fade-up animation-delay-300">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-500">
                    <Button size="lg" variant="secondary" className="text-primary font-semibold">
                      {slide.ctaText || "Ver Nossos Planos"}
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                      Fale Conosco
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="h-12 w-12 bg-white/20 backdrop-blur hover:bg-white/30 text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="h-12 w-12 bg-white/20 backdrop-blur hover:bg-white/30 text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {displaySlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide ? "bg-white" : "bg-white/40"
            )}
          />
        ))}
      </div>
    </section>
  );
}