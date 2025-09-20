import { Check, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plan, useCity } from "@/contexts/CityContext";

export function PlansSection() {
  const { selectedCity, availablePlans } = useCity();

  // Filtrar planos por cidade selecionada e visibilidade
  const cityPlans: Plan[] = availablePlans;
  const visiblePlans = cityPlans
    .filter((plan) => plan.status === "1")
    .slice(0, 4);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Planos para {selectedCity?.cidade}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Internet de fibra ótica com velocidade garantida disponível em{" "}
            {selectedCity?.cidade} - {selectedCity?.uf}
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
                    plan.premium == "1"
                      ? "shadow-elegant border-gradient-premium"
                      : ""
                  } animate-fade-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {plan.premium == "1" && !plan.status && (
                  <div className="absolute -top-1 -right-1">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg rounded-tr-lg flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Destaque
                    </Badge>
                  </div>
                )}

                {plan.premium == "1" && (
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
                      className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        plan.premium == "1" ? "" : ""
                      }`}
                    >
                      <img
                        src="/assets/logo_branca.png"
                        alt="Logo"
                        className="w-16 h-16"
                      />
                    </div>
                    <h3 className="text-3xl font-bold">{plan.plano}</h3>
                    <div
                      className={`font-bold text-4xl p-2 bg-gradient-to-b from-success to-success rounded-md ${
                        plan.premium == "1"
                          ? "text-white shadow-glow"
                          : "text-white shadow-glow"
                      }`}
                    >
                      {plan.download_recebido}
                    </div>
                  </CardHeader>

                  <CardContent className="text-center flex flex-col justify-between ">
                    <div>
                      {plan.valor_promocional === "1" && (
                        <div className="mb-6">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-sm text-white line-through">
                              R$ {plan.valor}
                            </span>
                          </div>
                          <div
                            className={`text-4xl font-bold ${
                              plan.premium == "1"
                                ? "bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
                                : ""
                            }`}
                          >
                            R$ {plan.valor_promocao}
                            <span className="text-sm font-normal text-white">
                              /mês
                            </span>
                          </div>
                        </div>
                      )}
                      <ul className="space-y-3 text-left">
                        {plan.beneficios
                          .split("\n")
                          .map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center gap-3"
                            >
                              <Check
                                className={`w-5 h-5 flex-shrink-0 ${
                                  plan.premium == "1"
                                    ? "text-white"
                                    : "text-white"
                                }`}
                              />
                              <span className="text-md">{feature}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </CardContent>
                </div>

                <CardFooter>
                  <div className={`flex flex-col items-center w-full gap-4 ${plan.aplicativos && plan.aplicativos.length > 0 && "border-t"}`}>
                    {plan.aplicativos && plan.aplicativos.length > 0 && (
                      <div className="pt-6">
                        <p className="text-sm text-white mb-3 text-center">
                          Aplicativos inclusos
                        </p>
                        <div className="flex justify-center gap-3 flex-wrap">
                          {plan.aplicativos.map((app, appIndex) => {
                            return (
                              <div
                                key={appIndex}
                                className="flex flex-col items-center gap-1"
                              >
                                <div
                                  className={`w-12 h-12 rounded-sm flex items-center p-0.5 bg-white justify-center`}
                                >
                                  <img
                                    src={app.imagem}
                                    alt="Logo"
                                    className="w-auto object-cover"
                                  />
                                </div>
                                <span className="text-xs text-white">
                                  {app.nome}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <Button
                      className={`w-full transition-smooth text-xl font-bold py-7 ${
                        plan.premium == "1"
                          ? "bg-gradient-to-r from-success to-success text-white"
                          : plan.valor_promocao
                          ? "bg-gradient-to-r from-success to-success text-white"
                          : "bg-gradient-to-r from-success to-success text-white"
                      }`}
                      variant={
                        plan.premium == "1" || plan.valor_promocional
                          ? "default"
                          : "default"
                      }
                    >
                      Contrate agora
                    </Button>
                  </div>
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
