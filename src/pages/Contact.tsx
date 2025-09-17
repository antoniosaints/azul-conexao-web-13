import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, MessageCircle, Headphones, Globe } from "lucide-react";

export default function Contact() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Telefone",
      primary: "0800-CAS-NET",
      secondary: "(0800-227-638)",
      description: "Atendimento 24 horas",
      action: "Ligar Agora",
      highlight: true
    },
    {
      icon: MessageCircle, 
      title: "WhatsApp",
      primary: "(11) 99999-9999",
      secondary: "Chat direto",
      description: "Resposta rápida",
      action: "Enviar Mensagem"
    },
    {
      icon: Mail,
      title: "E-mail",
      primary: "contato@casinternet.com.br",
      secondary: "Suporte técnico",
      description: "Resposta em até 2 horas",
      action: "Enviar E-mail"
    },
    {
      icon: Globe,
      title: "Site",
      primary: "www.casinternet.com.br",
      secondary: "Portal do cliente",
      description: "Acesso 24h",
      action: "Acessar Portal"
    }
  ];

  const offices = [
    {
      city: "São Paulo",
      address: "Rua das Telecomunicações, 123",
      neighborhood: "Vila Olímpia",
      cep: "04547-001",
      phone: "(11) 3333-4444"
    },
    {
      city: "Rio de Janeiro", 
      address: "Av. Atlântica, 456",
      neighborhood: "Copacabana",
      cep: "22071-900",
      phone: "(21) 3333-4444"
    },
    {
      city: "Belo Horizonte",
      address: "Rua da Liberdade, 789",
      neighborhood: "Savassi",
      cep: "30112-000",
      phone: "(31) 3333-4444"
    }
  ];

  const supportHours = [
    { day: "Segunda a Sexta", hours: "24 horas" },
    { day: "Sábados", hours: "24 horas" },
    { day: "Domingos e Feriados", hours: "24 horas" }
  ];

  const faqItems = [
    {
      question: "Qual o prazo para instalação?",
      answer: "A instalação é realizada em até 7 dias úteis após a contratação."
    },
    {
      question: "Há taxa de instalação?",
      answer: "Não, a instalação padrão é completamente gratuita."
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim, nossos planos não têm fidelidade. Você pode cancelar quando quiser."
    },
    {
      question: "Como funciona o suporte técnico?",
      answer: "Temos suporte 24h por telefone, WhatsApp e e-mail para resolver qualquer problema."
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
                Atendimento 24/7
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Entre em
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Contato</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Estamos aqui para ajudar! Entre em contato conosco pelos nossos canais 
                de atendimento ou visite uma de nossas lojas físicas.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Como Podemos Ajudar?
              </h2>
              <p className="text-xl text-muted-foreground">
                Escolha o canal de atendimento mais conveniente para você
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
              {contactMethods.map((method, index) => (
                <Card 
                  key={index}
                  className={`text-center p-6 shadow-card hover:shadow-primary/10 transition-all duration-300 animate-fade-up relative ${
                    method.highlight ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {method.highlight && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      Mais Popular
                    </Badge>
                  )}
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <method.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                    <div className="text-lg font-semibold text-primary mb-1">{method.primary}</div>
                    <div className="text-sm text-muted-foreground mb-2">{method.secondary}</div>
                    <div className="text-sm text-muted-foreground mb-6">{method.description}</div>
                    <Button 
                      className="w-full"
                      variant={method.highlight ? "default" : "outline"}
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Envie uma Mensagem
                </h2>
                <p className="text-xl text-muted-foreground">
                  Preencha o formulário e entraremos em contato em até 2 horas
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nossas Lojas
              </h2>
              <p className="text-xl text-muted-foreground">
                Visite uma de nossas lojas físicas para atendimento presencial
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {offices.map((office, index) => (
                <Card key={index} className="p-6 shadow-card hover:shadow-primary/10 transition-all duration-300">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <CardTitle className="text-xl">{office.city}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium">{office.address}</div>
                        <div className="text-muted-foreground">{office.neighborhood}</div>
                        <div className="text-muted-foreground">CEP: {office.cep}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>{office.phone}</span>
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        Ver no Mapa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Support Hours */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Horários */}
                <Card className="p-8">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-6 h-6 text-primary" />
                      <CardTitle className="text-2xl">Horários de Atendimento</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-4">
                      {supportHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                          <span className="font-medium">{schedule.day}</span>
                          <span className="text-primary font-semibold">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Headphones className="w-5 h-5 text-primary" />
                        <span className="font-semibold">Suporte Técnico 24/7</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Nossa equipe técnica está disponível 24 horas por dia, 
                        todos os dias da semana para resolver qualquer problema.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Rápido */}
                <Card className="p-8">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl">Perguntas Frequentes</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-6">
                      {faqItems.map((item, index) => (
                        <div key={index}>
                          <h4 className="font-semibold mb-2">{item.question}</h4>
                          <p className="text-muted-foreground text-sm">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-6">
                      Ver Todas as Perguntas
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Precisa de Ajuda Imediata?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Nossa equipe está pronta para atender você agora mesmo. 
              Ligue grátis ou chame no WhatsApp!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-primary">
                <Phone className="w-5 h-5 mr-2" />
                0800-CAS-NET
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}