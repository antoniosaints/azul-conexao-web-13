import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroCarousel } from "@/components/ui/hero-carousel";
import { PlansSection } from "@/components/sections/plans-section";
import { ContactForm } from "@/components/sections/contact-form";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { AboutSection } from "@/components/sections/about-section";
import { BlogSection } from "@/components/sections/blog-section";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroCarousel />
        <section id="planos">
          <PlansSection />
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

export default Index;
