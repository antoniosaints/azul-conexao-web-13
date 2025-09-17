import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, MapPin, Clock } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "50K+",
    label: "Clientes Satisfeitos",
  },
  {
    icon: MapPin,
    number: "200+",
    label: "Cidades Atendidas",
  },
  {
    icon: Award,
    number: "15+",
    label: "Anos de Experiência",
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Suporte Disponível",
  },
];

export function AboutSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Conteúdo */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Sobre a CAS Internet
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Há mais de 15 anos conectando pessoas e empresas com a melhor tecnologia em internet fibra ótica do Brasil.
              </p>
              <p className="text-muted-foreground mb-8">
                Nossa missão é democratizar o acesso à internet de alta qualidade, oferecendo planos acessíveis sem abrir mão da excelência no atendimento. Investimos constantemente em infraestrutura e tecnologia para garantir que nossos clientes tenham a melhor experiência de conectividade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-primary">
                  Conheça Nossa História
                </Button>
                <Button size="lg" variant="outline">
                  Ver Cobertura
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="text-center shadow-card hover:shadow-primary/10 transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Valores */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Nossos Valores</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Princípios que guiam nossa empresa todos os dias
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center shadow-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">Q</span>
                </div>
                <h4 className="text-xl font-bold mb-4">Qualidade</h4>
                <p className="text-muted-foreground">
                  Oferecemos sempre o melhor em tecnologia e atendimento para garantir sua satisfação.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">T</span>
                </div>
                <h4 className="text-xl font-bold mb-4">Transparência</h4>
                <p className="text-muted-foreground">
                  Sem taxas escondidas, sem surpresas. Tudo sempre muito claro e transparente.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">I</span>
                </div>
                <h4 className="text-xl font-bold mb-4">Inovação</h4>
                <p className="text-muted-foreground">
                  Sempre investindo em novas tecnologias para oferecer o que há de melhor.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}