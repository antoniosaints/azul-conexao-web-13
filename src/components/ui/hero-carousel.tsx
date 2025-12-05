import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight} from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useCity } from "@/contexts/CityContext";
import { mockCarouselSlides, filterByCity } from "@/data/mockData";

const slides = [
  {
    id: 1,
    title: "Velocidade Garantida",
    subtitle: "Sem oscilações, sem frustrações",
    description:
      "Nossa rede garante a velocidade contratada 24/7 com suporte técnico especializado.",
    imgUrl: "/assets/banner2.png",
  },
  {
    id: 2,
    title: "Segurança Total",
    subtitle: "Proteção completa para sua conexão",
    description:
      "Navegue com tranquilidade com nossa tecnologia de segurança avançada.",
    imgUrl: "/assets/banner3.png",
  },
  {
    id: 3,
    title: "Segurança Total",
    subtitle: "Proteção completa para sua conexão",
    description:
      "Navegue com tranquilidade com nossa tecnologia de segurança avançada.",
    imgUrl: "/assets/banner3.png",
  },
  {
    id: 3,
    title: "Segurança Total",
    subtitle: "Proteção completa para sua conexão",
    description:
      "Navegue com tranquilidade com nossa tecnologia de segurança avançada.",
    imgUrl: "/assets/banner3.png",
  },
];

export function HeroCarousel() {
  const { selectedCity, repoImages } = useCity();
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const displaySlides = selectedCity.banners;

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === displaySlides.length - 1 ? 0 : prev + 1
      );
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!isHovered) startAutoPlay();
    return () => stopAutoPlay();
  }, [displaySlides.length, isHovered]);

  const nextSlide = () => {
    stopAutoPlay();
    setCurrentSlide((prev) =>
      prev === displaySlides.length - 1 ? 0 : prev + 1
    );
    startAutoPlay();
  };

  const prevSlide = () => {
    stopAutoPlay();
    setCurrentSlide((prev) =>
      prev === 0 ? displaySlides.length - 1 : prev - 1
    );
    startAutoPlay();
  };

  if (displaySlides.length === 0) {
    return null;
  }

  return (
    <section
      className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displaySlides.map((slide, index) => (
        <div
          key={index}
          // onClick={() => window.open("https://google.com", "_blank")}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
          )}
        >
          <div className="relative h-full flex items-center">
            <img
              src={repoImages + slide.imagem}
              className="w-full h-full object-cover"
              alt="logo"
            />
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div className="absolute top-1/2 left-2 md:left-4 z-40 -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="h-8 w-8 md:h-12 md:w-12 bg-white/20 backdrop-blur hover:bg-white/30 text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>
      <div className="absolute top-1/2 z-40 right-2 md:right-4 -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="h-8 w-8 md:h-12 md:w-12 bg-white/20 backdrop-blur hover:bg-white/30 text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 flex gap-2">
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
