import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PlansSection } from "@/components/sections/plans-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Shield, Headphones, Wifi, Star } from "lucide-react";

export default function Plans() {
  const benefits = [
    {
      icon: Zap,
      title: "Fibra Ótica 100%",
      description: "Tecnologia de ponta para máxima velocidade e estabilidade"
    },
    {
      icon: Shield,
      title: "Sem Fidelidade",
      description: "Liberdade total para cancelar quando quiser"
    },
    {
      icon: Headphones,
      title: "Suporte 24/7",
      description: "Atendimento especializado todos os dias do ano"
    },
    {
      icon: Wifi,
      title: "WiFi Grátis",
      description: "Roteador moderno incluso em todos os planos"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      location: "São Paulo/SP",
      rating: 5,
      comment: "Melhor internet que já tive! Velocidade excelente e suporte nota 10.",
      plan: "Plus 300MB"
    },
    {
      name: "Ana Costa",
      location: "Rio de Janeiro/RJ", 
      rating: 5,
      comment: "Netflix incluso foi o diferencial. Qualidade impecável!",
      plan: "Premium 600MB"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-4">
                Planos sem fidelidade
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Escolha o Plano
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Perfeito</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Internet fibra ótica de alta velocidade com instalação gratuita, 
                sem fidelidade e suporte 24h. Escolha o plano ideal para sua necessidade.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Instalação Gratuita</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Sem Fidelidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Suporte 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>WiFi Incluso</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <PlansSection />

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Por que Escolher a CAS Internet?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Oferecemos muito mais que apenas internet. Conheça todos os benefícios inclusos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card 
                  key={index}
                  className="text-center p-8 shadow-card hover:shadow-primary/10 transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Compare Nossos Planos
              </h2>
              <p className="text-xl text-muted-foreground">
                Veja todos os recursos inclusos em cada plano
              </p>
            </div>

            <div className="max-w-6xl mx-auto overflow-x-auto">
              <table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-card">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-6 font-bold">Recursos</th>
                    <th className="text-center p-6 font-bold">Básico<br />100MB</th>
                    <th className="text-center p-6 font-bold bg-primary/5">Plus<br />300MB</th>
                    <th className="text-center p-6 font-bold">Premium<br />600MB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-6 font-medium">Velocidade Download</td>
                    <td className="text-center p-6">100 Mbps</td>
                    <td className="text-center p-6 bg-primary/5">300 Mbps</td>
                    <td className="text-center p-6">600 Mbps</td>
                  </tr>
                  <tr className="border-t bg-muted/30">
                    <td className="p-6 font-medium">WiFi Incluso</td>
                    <td className="text-center p-6"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="text-center p-6 bg-primary/5"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="text-center p-6"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-6 font-medium">Instalação Gratuita</td>
                    <td className="text-center p-6"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="text-center p-6 bg-primary/5"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="text-center p-6"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  </tr>
                  <tr className="border-t bg-muted/30">
                    <td className="p-6 font-medium">Suporte 24h</td>
                    <td className="text-center p-6"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="text-center p-6 bg-primary/5">Prioritário</td>
                    <td className="text-center p-6">VIP</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-6 font-medium">Netflix</td>
                    <td className="text-center p-6">-</td>
                    <td className="text-center p-6 bg-primary/5"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="text-center p-6"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  </tr>
                  <tr className="border-t bg-muted/30">
                    <td className="p-6 font-medium">Amazon Prime</td>
                    <td className="text-center p-6">-</td>
                    <td className="text-center p-6 bg-primary/5">-</td>
                    <td className="text-center p-6"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-6 font-medium">IP Fixo</td>
                    <td className="text-center p-6">-</td>
                    <td className="text-center p-6 bg-primary/5">-</td>
                    <td className="text-center p-6"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                O que Nossos Clientes Dizem
              </h2>
              <p className="text-xl text-muted-foreground">
                Mais de 50.000 clientes satisfeitos em todo o Brasil
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-8">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.comment}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                      </div>
                      <Badge variant="outline">{testimonial.plan}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para ter a Melhor Internet?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Contrate agora e tenha internet de fibra ótica instalada em sua casa 
              sem custo adicional e sem fidelidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-primary">
                Contratar Agora
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Falar com Consultor
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}