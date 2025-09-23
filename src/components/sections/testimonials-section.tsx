import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useCity } from "@/contexts/CityContext";
import { mockTestimonials, filterByCity } from "@/data/mockData";

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    location: "São Paulo, SP",
    rating: 5,
    comment:
      "A melhor internet que já tive! Velocidade constante e suporte excepcional. Recomendo para todos.",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "João Santos",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    comment:
      "Desde que contratei não tive nenhum problema. A instalação foi rápida e o preço é justo.",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Ana Costa",
    location: "Belo Horizonte, MG",
    rating: 5,
    comment:
      "Trabalho home office e preciso de uma internet confiável. A CAS Internet entrega exatamente isso!",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Carlos Oliveira",
    location: "Brasília, DF",
    rating: 5,
    comment:
      "Fibra ótica de verdade! Agora consigo assistir Netflix em 4K sem travamentos.",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Fernanda Lima",
    location: "Salvador, BA",
    rating: 5,
    comment:
      "O atendimento é nota 10. Sempre que preciso, eles resolvem rapidamente.",
    avatar: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Pedro Almeida",
    location: "Fortaleza, CE",
    rating: 5,
    comment:
      "Migrei de outra operadora e a diferença é gritante. Velocidade e estabilidade perfeitas.",
    avatar: "/placeholder.svg",
  },
];

export function TestimonialsSection() {
  const { selectedCity, depoiments } = useCity();

  // Filtrar depoimentos por cidade ou usar dados estáticos como fallback
  const cityTestimonials = selectedCity
    ? filterByCity(mockTestimonials, selectedCity.id_cidade)
    : [];
  const displayTestimonials =
    cityTestimonials.length > 0 ? cityTestimonials : testimonials.slice(0, 3);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Clientes CAS Recomendam
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja o que nossos clientes estão falando sobre nossos serviços
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {depoiments.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="shadow-card hover:shadow-primary/10 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-6 line-clamp-4">
                    "{testimonial.depoimento}"
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src="/assets/logo_branca.png"
                    className="w-10 h-10 rounded-sm bg-gradient-to-r from-primary to-primary p-2"
                    alt={testimonial.nome}
                  />
                  <div>
                    <p className="font-semibold">{testimonial.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.cidade}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-lg font-semibold">4.9/5</span>
            <span className="text-muted-foreground">
              • Mais de 2.000 avaliações
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
