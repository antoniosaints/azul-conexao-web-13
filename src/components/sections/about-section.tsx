import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, MapPin, Clock } from "lucide-react";
import { Parametros, useCity } from "@/contexts/CityContext";

function calcularIdade(dataNascimento: string) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  // Ajusta caso ainda não tenha feito aniversário no ano atual
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
}

export function AboutSection() {
  const { parametros, availableCities } = useCity();
  const param = parametros[0] || ({} as Parametros);

  if (!parametros || parametros.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Conteúdo */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl text-primary md:text-5xl font-bold mb-6">
                Sobre a CAS Internet
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Há mais de {calcularIdade(param.abertura_empresa)} anos
                conectando pessoas e empresas com a melhor tecnologia em
                internet fibra ótica do Brasil.
              </p>
              <p className="text-muted-foreground mb-8">{param.missao}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={param.link_atendimento} target="_blank">
                  <Button size="lg" className="bg-gradient-primary">
                    Contratar agora
                  </Button>
                </a>
                <a href="#cobertura">
                  <Button size="lg" variant="outline">
                    Ver Cobertura
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <Card
              className="text-center shadow-card bg-gradient-to-l from-success/90 to-primary hover:shadow-primary/10 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${1 * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/40 rounded-full mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {param.total_cliente}
                </div>
                <p className="text-sm text-gray-100">Clientes Satisfeitos</p>
              </CardContent>
            </Card>
            <Card
              className="text-center shadow-card bg-gradient-to-l from-success/90 to-primary hover:shadow-primary/10 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${2 * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/40 rounded-full mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {availableCities.length}
                </div>
                <p className="text-sm text-gray-100">Cidades atendidas</p>
              </CardContent>
            </Card>
            <Card
              className="text-center shadow-card bg-gradient-to-l from-success/90 to-primary hover:shadow-primary/10 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${3 * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/40 rounded-full mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {calcularIdade(param.abertura_empresa)}
                </div>
                <p className="text-sm text-gray-100">Anos de Experiência</p>
              </CardContent>
            </Card>
            <Card
              className="text-center shadow-card bg-gradient-to-l from-success/90 to-primary hover:shadow-primary/10 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${4 * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/40 rounded-full mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">99%</div>
                <p className="text-sm text-gray-100">Estabilidade garantida</p>
              </CardContent>
            </Card>
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
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-success rounded-full flex items-center justify-center mx-auto mb-6">
                  <img
                    src="/assets/icone_nano.png"
                    alt="icone_nano"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h4 className="text-xl font-bold mb-4">Qualidade</h4>
                <p className="text-muted-foreground">
                  Oferecemos sempre o melhor em tecnologia e atendimento para
                  garantir sua satisfação.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-success rounded-full flex items-center justify-center mx-auto mb-6">
                  <img
                    src="/assets/icone_nano.png"
                    alt="icone_nano"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h4 className="text-xl font-bold mb-4">Transparência</h4>
                <p className="text-muted-foreground">
                  Sem taxas escondidas, sem surpresas. Tudo sempre muito claro e
                  transparente.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-success rounded-full flex items-center justify-center mx-auto mb-6">
                  <img
                    src="/assets/icone_nano.png"
                    alt="icone_nano"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h4 className="text-xl font-bold mb-4">Inovação</h4>
                <p className="text-muted-foreground">
                  Sempre investindo em novas tecnologias para oferecer o que há
                  de melhor.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
