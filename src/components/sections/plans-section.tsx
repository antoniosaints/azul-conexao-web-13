import { Check, Zap, Wifi, Crown, Star, Play, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCity } from "@/contexts/CityContext";
import { mockPlans, filterByCity } from "@/data/mockData";

const getIconByName = (name: string) => {
  switch (name.toLowerCase()) {
    case "básico":
      return Wifi;
    case "plus":
      return Zap;
    case "premium":
      return Crown;
    default:
      return Wifi;
  }
};

const getAppIcon = (appName: string) => {
  switch (appName.toLowerCase()) {
    case "netflix":
      return { icon: Play, color: "bg-red-600", name: "Netflix" };
    case "prime-video":
      return { icon: Play, color: "bg-blue-600", name: "Prime Video" };
    case "looke":
      return { icon: Play, color: "bg-orange-600", name: "Looke" };
    case "deezer":
      return { icon: Music, color: "bg-purple-600", name: "Deezer" };
    default:
      return { icon: Play, color: "bg-gray-600", name: appName };
  }
};

// Em uma aplicação real, estes dados viriam do backend/admin
const plans = [
  {
    id: 1,
    name: "Básico",
    speed: "100 MB",
    price: 59.9,
    originalPrice: 79.9,
    icon: Wifi,
    isHighlight: false,
    isPremium: false,
    isVisible: true,
    features: [
      "Velocidade de 100 Mbps",
      "WiFi grátis incluso",
      "Instalação gratuita",
      "Suporte 24h",
      "Sem fidelidade",
    ],
    color: "from-muted to-muted/50",
  },
  {
    id: 2,
    name: "Plus",
    speed: "300 MB",
    price: 89.9,
    originalPrice: 119.9,
    icon: Zap,
    isHighlight: true,
    isPremium: false,
    isVisible: true,
    features: [
      "Velocidade de 300 Mbps",
      "WiFi 6 grátis incluso",
      "Instalação gratuita",
      "Suporte 24h prioritário",
      "Sem fidelidade",
      "Netflix incluso",
    ],
    color: "from-primary to-primary-glow",
  },
  {
    id: 3,
    name: "Premium",
    speed: "600 MB",
    price: 129.9,
    originalPrice: 169.9,
    icon: Crown,
    isHighlight: false,
    isPremium: true,
    isVisible: true,
    features: [
      "Velocidade de 600 Mbps",
      "WiFi 6E grátis incluso",
      "Instalação gratuita",
      "Suporte 24h VIP",
      "Sem fidelidade",
      "Netflix + Amazon Prime",
      "IP fixo gratuito",
    ],
    color: "from-gradient-premium via-primary to-accent",
  },
];

export function PlansSection() {
  const { selectedCity } = useCity();

  // Filtrar planos por cidade selecionada e visibilidade
  const cityPlans = selectedCity
    ? filterByCity(mockPlans, selectedCity.id)
    : mockPlans;
  const visiblePlans = cityPlans.filter((plan) => plan.isVisible).slice(0, 4);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Planos para {selectedCity?.name}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Internet de fibra ótica com velocidade garantida disponível em{" "}
            {selectedCity?.name} - {selectedCity?.state}
          </p>
        </div>

        <div
          className={`grid grid-cols-1 ${
            visiblePlans.length === 4
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-3"
          } gap-8 max-w-6xl mx-auto`}
        >
          {visiblePlans.map((plan, index) => {
            return (
              <Card
                key={plan.id}
                className={`relative bg-gradient-to-b flex flex-col justify-between from-success to-primary text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-card
                  ${
                    plan.isPremium
                      ? "shadow-elegant border-gradient-premium"
                      : ""
                  } animate-fade-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {plan.isHighlight && !plan.isPremium && (
                  <div className="absolute -top-1 -right-1">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg rounded-tr-lg flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Destaque
                    </Badge>
                  </div>
                )}

                {plan.isPremium && (
                  <div className="absolute -top-1 shadow-glow -right-1">
                    <Badge className="bg-gradient-to-r from-accent to-primary text-white px-3 py-1 rounded-bl-lg rounded-tr-lg flex items-center gap-1 shadow-glow">
                      <Crown className="w-3 h-3" />
                      Premium
                    </Badge>
                  </div>
                )}
                <div>
                  <CardHeader className="text-center pb-2 mb-4">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full ${
                        plan.color
                      } flex items-center justify-center ${
                        plan.isPremium ? "" : ""
                      }`}
                    >
                      <img
                        src="/assets/logo_branca.png"
                        alt="Logo"
                        className="w-16 h-16"
                      />
                    </div>
                    <h3 className="text-3xl font-bold">{plan.name}</h3>
                    <div
                      className={`font-bold text-4xl p-2 bg-gradient-to-b from-success to-success rounded-md ${
                        plan.isPremium
                          ? "text-white shadow-glow"
                          : "text-white shadow-glow"
                      }`}
                    >
                      {plan.speed}
                    </div>
                  </CardHeader>

                  <CardContent className="text-center pb-6 flex flex-col justify-between">
                    {/* <div className="mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-sm text-muted-foreground line-through">
                          R$ {plan.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <div
                        className={`text-4xl font-bold ${
                          plan.isPremium
                            ? "bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
                            : ""
                        }`}
                      >
                        R$ {plan.price.toFixed(2)}
                        <span className="text-sm font-normal text-muted-foreground">
                          /mês
                        </span>
                      </div>
                    </div> */}
                    <div className="flex flex-col justify-between">
                      <ul className="space-y-3 text-left">
                        {plan.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center gap-3"
                          >
                            <Check
                              className={`w-5 h-5 flex-shrink-0 ${
                                plan.isPremium ? "text-white" : "text-white"
                              }`}
                            />
                            <span className="text-md">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {plan.apps && plan.apps.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-border">
                          <p className="text-sm text-white mb-3 text-center">
                            Aplicativos inclusos
                          </p>
                          <div className="flex justify-center gap-3 flex-wrap">
                            {plan.apps.map((app, appIndex) => {
                              return (
                                <div
                                  key={appIndex}
                                  className="flex flex-col items-center gap-1"
                                >
                                  <div
                                    className={`w-12 h-12 rounded-sm flex items-center p-0.5 bg-white justify-center`}
                                  >
                                    <img
                                      src={app.image}
                                      alt="Logo"
                                      className="w-auto object-cover"
                                    />
                                  </div>
                                  <span className="text-xs text-white">
                                    {app.name}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </div>

                <CardFooter>
                  <Button
                    className={`w-full transition-smooth text-xl font-bold py-7 ${
                      plan.isPremium
                        ? "bg-gradient-to-r from-success to-success text-white"
                        : plan.isHighlight
                        ? "bg-gradient-to-r from-success to-success text-white"
                        : "bg-gradient-to-r from-success to-success text-white"
                    }`}
                    variant={
                      plan.isHighlight || plan.isPremium ? "default" : "default"
                    }
                  >
                    Contrate agora
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Todos os planos incluem instalação gratuita e sem taxa de adesão
          </p>
        </div>
      </div>
    </section>
  );
}
