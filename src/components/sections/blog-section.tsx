import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, User } from "lucide-react";
import { useCity } from "@/contexts/CityContext";
import { mockBlogPosts, filterByCity } from "@/data/mockData";

const blogPosts = [
  {
    id: 1,
    title: "Como Escolher a Velocidade de Internet Ideal para Sua Casa",
    excerpt: "Descubra qual velocidade de internet atende às suas necessidades específicas e otimize seu plano.",
    author: "Equipe CAS Internet",
    date: "15 de Dezembro, 2024",
    category: "Dicas",
    readTime: "5 min",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Fibra Ótica vs Internet Comum: Entenda as Diferenças",
    excerpt: "Conheça as vantagens da fibra ótica e por que ela é superior às tecnologias tradicionais.",
    author: "João Silva",
    date: "12 de Dezembro, 2024",
    category: "Tecnologia",
    readTime: "7 min",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "10 Dicas para Otimizar Sua Rede WiFi em Casa",
    excerpt: "Aprenda truques simples para melhorar o sinal e velocidade do seu WiFi doméstico.",
    author: "Maria Santos",
    date: "10 de Dezembro, 2024",
    category: "Tutorial",
    readTime: "6 min",
    image: "/placeholder.svg",
  },
];

export function BlogSection() {
  const { selectedCity } = useCity();
  
  // Filtrar posts por cidade ou usar dados estáticos como fallback
  const cityPosts = selectedCity ? filterByCity(mockBlogPosts, selectedCity.id) : [];
  const displayPosts = cityPosts.length > 0 ? cityPosts.slice(0, 3) : blogPosts;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-primary md:text-5xl font-bold mb-4">
            Blog CAS Internet
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fique por dentro das últimas novidades sobre internet, tecnologia e dicas úteis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayPosts.map((post, index) => (
            <Card
              key={post.id}
              className="group overflow-hidden shadow-card hover:shadow-primary/10 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-video bg-gradient-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-sm opacity-90">{post.readTime} de leitura</span>
                </div>
              </div>

              <CardHeader className="pb-4">
                <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="w-full justify-between group-hover:bg-primary/5 transition-colors"
                >
                  Ler Artigo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            Ver Todos os Artigos
          </Button>
        </div>
      </div>
    </section>
  );
}