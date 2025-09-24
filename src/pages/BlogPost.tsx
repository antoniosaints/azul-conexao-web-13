import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useCity } from "@/contexts/CityContext";

export default function BlogPost() {
  const { postId } = useParams<{ postId: string }>();
  const { posts, repoImages, loading } = useCity();
  const navigate = useNavigate();

  const post = posts.find((post) => String(post.id) === String(postId));

  const relatedPosts = posts.filter(
    (post) => String(post.id) !== String(postId)
  );

  if (!post || loading) {
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
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-20">
        {/* Breadcrumb/Back Button */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header do Post */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{post.tipo || "Blog"}</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.titulo}
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              {post.subtitulo}
            </p>

            {/* Autor e Data */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-md p-2">
                  <img src="/assets/icone_nano.png" alt="alt" />
                </div>
                <div>
                  <div className="font-semibold">{post.autor}</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Intl.DateTimeFormat("pt-BR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(post.created_at))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Imagem Principal */}
          <div className="aspect-video bg-gradient-primary rounded-lg mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            {post.image && (
              <img
                src={repoImages + post.image}
                className="w-full h-full object-cover"
                alt={post.titulo}
              />
            )}
          </div>

          {/* Conteúdo do Post */}
          <div className="prose prose-slate max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.conteudo }} />
          </div>

          {/* Posts Relacionados */}
          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Posts Relacionados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <a href={`/blog/${relatedPost.id}`}>
                    <Card
                      key={relatedPost.id}
                      className="group cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-0">
                        <div className="aspect-video relative overflow-hidden">
                          {relatedPost.image ? (
                            <img
                              src={repoImages + relatedPost.image}
                              className="w-full h-full object-cover"
                              alt={relatedPost.titulo}
                            />
                          ) : (
                            <div className="aspect-video bg-gradient-primary rounded-t-lg" />
                          )}
                        </div>
                        <div className="p-6">
                          <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">
                            {relatedPost.titulo}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>
                              {new Intl.DateTimeFormat("pt-BR", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              }).format(new Date(relatedPost.created_at))}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
