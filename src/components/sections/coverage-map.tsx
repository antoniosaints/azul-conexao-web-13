import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Wifi, Users, Signal } from "lucide-react";

const cities = [
  { name: "São Mateus do Maranhão", region: "Norte" },
  { name: "São Luis Gonzaga", region: "Norte" },
  { name: "Cantanhede", region: "Norte" },
  { name: "Miranda", region: "Norte" },
  { name: "Matões do Norte", region: "Norte" },
  { name: "Pirapemas", region: "Centro" },
  { name: "Coroata", region: "Centro" },
  { name: "Peritoró", region: "Centro" },
  { name: "Alto Alegre", region: "Centro" },
  { name: "Bacabal", region: "Sul" },
  { name: "Arari", region: "Sul" },
];

const regions = [
  { name: "Norte", cities: cities.filter(c => c.region === "Norte"), color: "bg-blue-500" },
  { name: "Centro", cities: cities.filter(c => c.region === "Centro"), color: "bg-green-500" },
  { name: "Sul", cities: cities.filter(c => c.region === "Sul"), color: "bg-purple-500" },
];

export function CoverageMap() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-primary md:text-5xl font-bold mb-4">
            Cobertura da CAS Internet
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nossa cobertura se estende por todo o Estado do Maranhão. Confira as cidades atendidas organizadas por região
          </p>
        </div>

        {/* Mapa Visual do Maranhão */}
        <Card className="max-w-6xl mx-auto shadow-lg mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Mapa de Cobertura - Maranhão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 h-[400px] overflow-hidden">
              {/* Representação visual do estado */}
              <div className="absolute inset-4 bg-white/80 rounded-lg shadow-inner border-2 border-dashed border-primary/30">
                {/* Norte do Maranhão */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-blue-100 rounded-lg border-2 border-blue-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs font-medium text-blue-700 mb-1">REGIÃO NORTE</div>
                    <div className="flex justify-center gap-1">
                      {regions[0].cities.slice(0, 3).map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-blue-500 rounded-full" />
                      ))}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">{regions[0].cities.length} cidades</div>
                  </div>
                </div>

                {/* Centro do Maranhão */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-24 bg-green-100 rounded-lg border-2 border-green-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs font-medium text-green-700 mb-1">REGIÃO CENTRO</div>
                    <div className="flex justify-center gap-1">
                      {regions[1].cities.slice(0, 4).map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-green-500 rounded-full" />
                      ))}
                    </div>
                    <div className="text-xs text-green-600 mt-1">{regions[1].cities.length} cidades</div>
                  </div>
                </div>

                {/* Sul do Maranhão */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-28 h-18 bg-purple-100 rounded-lg border-2 border-purple-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs font-medium text-purple-700 mb-1">REGIÃO SUL</div>
                    <div className="flex justify-center gap-1">
                      {regions[2].cities.slice(0, 2).map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-purple-500 rounded-full" />
                      ))}
                    </div>
                    <div className="text-xs text-purple-600 mt-1">{regions[2].cities.length} cidades</div>
                  </div>
                </div>

                {/* Linhas de conexão */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    <path d="M50 25 L50 50 L50 75" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                    <path d="M35 40 L50 50 L65 40" stroke="url(#connectionGradient)" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Logo CAS no centro */}
              <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
                <div className="bg-white p-4 rounded-full shadow-lg border-2 border-primary/20">
                  <img src="/assets/logo.png" alt="CAS Internet" className="w-12 h-12" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Cidades por Região */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {regions.map((region) => (
            <Card key={region.name} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${region.color}`} />
                  <span>Região {region.name}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    ({region.cities.length} {region.cities.length === 1 ? 'cidade' : 'cidades'})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {region.cities.map((city) => (
                  <div key={city.name} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <Wifi className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{city.name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex justify-center mb-3">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">{cities.length}</div>
            <div className="text-sm text-muted-foreground">Cidades Atendidas</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-success/10 to-success/5">
            <div className="flex justify-center mb-3">
              <Signal className="w-8 h-8 text-success" />
            </div>
            <div className="text-2xl font-bold text-success mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Fibra Ótica</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
            <div className="flex justify-center mb-3">
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-500 mb-1">10k+</div>
            <div className="text-sm text-muted-foreground">Clientes Ativos</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5">
            <div className="flex justify-center mb-3">
              <Wifi className="w-8 h-8 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-purple-500 mb-1">24/7</div>
            <div className="text-sm text-muted-foreground">Suporte Técnico</div>
          </Card>
        </div>

        {/* Informações adicionais */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4">Sua cidade não está na lista?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Estamos sempre expandindo nossa cobertura por todo o Maranhão. Entre em contato conosco para saber quando chegamos na sua região!
            </p>
            <div className="flex items-center justify-center gap-8 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span>Cobertura Ativa</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-primary" />
                <span>Fibra Ótica</span>
              </div>
              <div className="flex items-center gap-2">
                <Signal className="w-4 h-4 text-success" />
                <span>Alta Velocidade</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}