import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, User, Clock, ArrowLeft, Share2, Heart, MessageCircle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

export default function BlogPost() {
  const { postId } = useParams();
  const navigate = useNavigate();

  // Mock data para demonstração - em um app real, isso viria de uma API
  const post = {
    id: postId,
    title: "Como Escolher a Velocidade de Internet Ideal para Sua Casa",
    excerpt: "Descubra qual velocidade de internet atende às suas necessidades específicas e otimize seu plano.",
    content: `
      <p>Escolher a velocidade de internet ideal para sua casa pode parecer uma tarefa complexa, mas com as informações certas, você pode tomar a melhor decisão para suas necessidades e orçamento.</p>

      <h2>Entendendo as Velocidades de Internet</h2>
      <p>A velocidade da internet é medida em megabits por segundo (Mbps). Quanto maior o número, mais rápida é sua conexão. Mas qual velocidade você realmente precisa?</p>

      <h3>Para 1-2 pessoas</h3>
      <ul>
        <li><strong>50-100 Mbps:</strong> Ideal para navegação básica, redes sociais e streaming em HD</li>
        <li>Suporta 1-2 dispositivos simultâneos</li>
        <li>Perfeito para trabalho home office básico</li>
      </ul>

      <h3>Para 3-4 pessoas</h3>
      <ul>
        <li><strong>100-300 Mbps:</strong> Adequado para múltiplos dispositivos e streaming 4K</li>
        <li>Suporta videochamadas em alta qualidade</li>
        <li>Permite gaming online sem lag</li>
      </ul>

      <h3>Para 5+ pessoas</h3>
      <ul>
        <li><strong>300+ Mbps:</strong> Necessário para famílias grandes com muitos dispositivos</li>
        <li>Múltiplos streams 4K simultâneos</li>
        <li>Upload e download de arquivos grandes</li>
      </ul>

      <h2>Fatores a Considerar</h2>
      
      <h3>Número de Dispositivos</h3>
      <p>Conte todos os dispositivos que se conectam à internet: smartphones, tablets, laptops, smart TVs, consoles de jogos, dispositivos IoT, etc.</p>

      <h3>Tipo de Uso</h3>
      <p>Diferentes atividades consomem diferentes quantidades de banda:</p>
      <ul>
        <li>Navegação web: 1-5 Mbps</li>
        <li>Streaming HD: 5-8 Mbps</li>
        <li>Streaming 4K: 25 Mbps</li>
        <li>Videochamadas: 1-4 Mbps</li>
        <li>Gaming online: 3-6 Mbps</li>
        <li>Download de arquivos: Quanto mais, melhor</li>
      </ul>

      <h2>Dicas Importantes</h2>
      
      <h3>Considere o Upload</h3>
      <p>Se você trabalha com videoconferências ou faz upload de arquivos grandes, preste atenção também na velocidade de upload, não apenas download.</p>

      <h3>Fibra Ótica é Superior</h3>
      <p>A tecnologia de fibra ótica oferece velocidades mais estáveis e simétricas (mesmo upload e download), além de menor latência.</p>

      <h3>Teste sua Velocidade Atual</h3>
      <p>Use ferramentas como Speedtest.net para verificar sua velocidade atual e comparar com o que você está pagando.</p>

      <h2>Nossa Recomendação</h2>
      <p>Na CAS Internet, recomendamos:</p>
      <ul>
        <li><strong>Plano Básico (100 Mbps):</strong> Para casais ou pessoas sozinhas com uso moderado</li>
        <li><strong>Plano Plus (300 Mbps):</strong> Para famílias de 3-4 pessoas com uso intenso</li>
        <li><strong>Plano Premium (600 Mbps):</strong> Para famílias grandes ou profissionais que precisam de alta performance</li>
      </ul>

      <p>Lembre-se: é sempre melhor ter um pouco mais de velocidade do que precisar, especialmente considerando que nossas necessidades digitais estão sempre crescendo.</p>
    `,
    author: "Equipe CAS Internet",
    authorImage: "/placeholder.svg",
    date: "15 de Dezembro, 2024",
    category: "Dicas",
    readTime: "5 min",
    image: "/placeholder.svg",
    likes: 128,
    comments: 23,
    tags: ["internet", "velocidade", "fibra ótica", "dicas", "tecnologia"]
  };

  const relatedPosts = [
    {
      id: 2,
      title: "Fibra Ótica vs Internet Comum: Entenda as Diferenças",
      image: "/placeholder.svg",
      date: "12 de Dezembro, 2024",
      readTime: "7 min"
    },
    {
      id: 3,
      title: "10 Dicas para Otimizar Sua Rede WiFi em Casa",
      image: "/placeholder.svg",
      date: "10 de Dezembro, 2024", 
      readTime: "6 min"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-20">
        {/* Breadcrumb/Back Button */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header do Post */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{post.readTime} de leitura</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              {post.excerpt}
            </p>

            {/* Autor e Data */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={post.authorImage} alt={post.author} />
                  <AvatarFallback>
                    <User className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{post.author}</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  {post.likes}
                </Button>
              </div>
            </div>
          </div>

          {/* Imagem Principal */}
          <div className="aspect-video bg-gradient-primary rounded-lg mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Conteúdo do Post */}
          <div className="prose prose-slate max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Engajamento */}
          <Card className="mb-12">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Button variant="outline" className="gap-2">
                    <Heart className="w-4 h-4" />
                    Curtir ({post.likes})
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Comentar ({post.comments})
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Relacionados */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Posts Relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-primary rounded-t-lg" />
                    <div className="p-6">
                      <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{relatedPost.date}</span>
                        <span>•</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}