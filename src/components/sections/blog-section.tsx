import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, User } from "lucide-react";
import { useCity } from "@/contexts/CityContext";

export function BlogSection() {
  const { posts, repoImages } = useCity();
  const displayPosts = posts;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-primary md:text-5xl font-bold mb-4">
            Blog CAS Internet
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fique por dentro das últimas novidades sobre internet, tecnologia e
            dicas úteis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayPosts.slice(0, 3).map((post, index) => (
            <Card
              key={post.id}
              className="group overflow-hidden shadow-card hover:shadow-primary/10 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-video bg-gradient-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {post.image && (
                  <img
                    src={repoImages + post.image}
                    className="w-full h-full object-cover"
                    alt={post.tipo}
                  />
                )}
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{post.tipo}</Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                  {post.titulo}
                </h3>
              </CardHeader>

              <CardContent className="pt-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{post.autor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Intl.DateTimeFormat("pt-BR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }).format(new Date(post.created_at))}
                      </span>
                    </div>
                  </div>
                  <a href={`/blog/${post.id}`}>
                    <Button
                      variant="ghost"
                      className="w-full bg-success/10 justify-between group-hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      Ler Artigo
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
