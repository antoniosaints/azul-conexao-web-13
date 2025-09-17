import { useState, useEffect, useRef } from "react";
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
    description:
      "Experimente a internet mais rápida e estável do mercado com nossa tecnologia de fibra ótica.",
    imgUrl: "/assets/banner1.png",
  },
  {
    id: 2,
    title: "Velocidade Garantida",
    subtitle: "Sem oscilações, sem frustrações",
    description:
      "Nossa rede garante a velocidade contratada 24/7 com suporte técnico especializado.",
    imgUrl: "/assets/banner2.png",
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
  const { selectedCity } = useCity()
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const citySlides = selectedCity
    ? filterByCity(mockCarouselSlides, selectedCity.id)
    : []
  const displaySlides = citySlides.length > 0 ? citySlides : slides

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === displaySlides.length - 1 ? 0 : prev + 1
      )
    }, 5000)
  }

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    if (!isHovered) startAutoPlay()
    return () => stopAutoPlay()
  }, [displaySlides.length, isHovered])

  const nextSlide = () => {
    stopAutoPlay()
    setCurrentSlide((prev) =>
      prev === displaySlides.length - 1 ? 0 : prev + 1
    )
    startAutoPlay()
  }

  const prevSlide = () => {
    stopAutoPlay()
    setCurrentSlide((prev) =>
      prev === 0 ? displaySlides.length - 1 : prev - 1
    )
    startAutoPlay()
  }

  return (
    <section
      className="relative h-[700px] hidden md:block overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {slides.map((slide, index) => (
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
          <div className="relative h-full flex items-center">
            <img
              src={slide.imgUrl}
              className="w-full h-full object-cover"
              alt="logo"
            />
          </div>
        </div>
      ))}

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
  )
}
