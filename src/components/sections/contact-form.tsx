import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Parametros, Plan, useCity } from "@/contexts/CityContext";
import http from "@/lib/http";

export function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    address: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await http.post("saveCadastro", formData);
      toast({
        title: "Solicitação Enviada!",
        description: "Entraremos em contato dentro de 24 horas.",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Ops!",
        description: "Ocorreu um erro ao enviar a solicitação.",
      });
    }
    setFormData({
      name: "",
      email: "",
      phone: "",
      plan: "",
      address: "",
      message: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { selectedCity, availablePlans, parametros } = useCity();

  // Filtrar planos por cidade selecionada e visibilidade
  const cityPlans: Plan[] = availablePlans;
  const visiblePlans = cityPlans.filter((plan) =>
    plan.cidades.some((c) => c.id_cidade == selectedCity.id_cidade)
  );

  const param = parametros[0] || ({} as Parametros);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-primary md:text-5xl font-bold mb-4">
            Contrate Seu Plano
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Preencha o formulário abaixo e nossa equipe entrará em contato para
            finalizar sua contratação
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Formulário */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Dados para Contratação</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plan">Plano Desejado</Label>
                      <Select
                        value={formData.plan}
                        onValueChange={(value) =>
                          handleInputChange("plan", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um plano" />
                        </SelectTrigger>
                        <SelectContent>
                          {visiblePlans.map((plan) => (
                            <SelectItem value={plan.id} key={plan.id}>
                              {plan.plano} - {plan.download_recebido}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço Completo</Label>
                    <Input
                      id="address"
                      placeholder="Rua, número, bairro, cidade, CEP"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem (opcional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Alguma observação ou dúvida?"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      rows={4}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r py-6 text-lg from-primary to-success/80"
                >
                  Solicitar Contratação
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informações de contato */}
          <div className="space-y-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Telefone</p>
                    <p className="text-muted-foreground">{param.telefone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">E-mail</p>
                    <p className="text-muted-foreground">{param.email_cas}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Endereço</p>
                    <p className="text-muted-foreground">
                      {selectedCity.endereco_loja || param.endereco_loja}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Horário de Atendimento</p>
                    <p className="text-muted-foreground">
                      {param.periodo_atendimento}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-primary to-success/80 text-white shadow-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Atendimento</h3>
                <p className="mb-4 opacity-90">
                  Nossa central de atendimento funciona de{" "}
                  {param.periodo_atendimento}, para resolver qualquer problema.
                </p>
                <a href={param.link_atendimento} target="_blank">
                  <Button variant="secondary" className="text-primary">
                    Falar com Suporte
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
