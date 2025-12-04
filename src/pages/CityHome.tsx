import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroCarousel } from "@/components/ui/hero-carousel";
import { PlansSection } from "@/components/sections/plans-section";
import { ContactForm } from "@/components/sections/contact-form";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { AboutSection } from "@/components/sections/about-section";
import { BlogSection } from "@/components/sections/blog-section";
import { useCity } from "@/contexts/CityContext";
import { IconBar } from "@/components/sections/icon-bar";
import { CoverageMap } from "@/components/sections/coverage-map";

const CityHome = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const { getCityBySlug, setSelectedCity, selectedCity, loading } = useCity();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (citySlug) {
      const city = getCityBySlug(citySlug);
      if (city) {
        setSelectedCity(city);
      } else {
        // Cidade não encontrada, redirecionar para seletor
        // navigate("/");
      }
    }
  }, [citySlug, getCityBySlug, setSelectedCity, navigate]);

  // 🔑 Scroll automático quando muda o hash
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        const rect = element.getBoundingClientRect();
        const y = rect.top + window.scrollY - 40; // ajuste do header fixo
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [location]);

  if (!selectedCity || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section id="inicio">
          <HeroCarousel />
        </section>
        <IconBar />
        <section id="planos">
          <PlansSection />
        </section>
        <section id="cobertura">
          <CoverageMap />
        </section>
        <section id="contato">
          <ContactForm />
        </section>
        <TestimonialsSection />
        <section id="sobre">
          <AboutSection />
        </section>
        <section id="blog">
          <BlogSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CityHome;
