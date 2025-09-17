import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scale, Phone, Globe, Mail, MapPin, ExternalLink } from "lucide-react";

export default function ConsumerDefense() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Scale className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Código de Defesa do Consumidor
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Seus direitos como consumidor dos serviços CAS Internet
            </p>
            <Badge variant="outline">Lei nº 8.078/90</Badge>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Seus Direitos Fundamentais</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>Como consumidor dos serviços CAS Internet, você possui os seguintes direitos:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Proteção da vida, saúde e segurança contra riscos provocados por produtos ou serviços</li>
                  <li>Educação e divulgação sobre consumo adequado dos produtos e serviços</li>
                  <li>Informação adequada e clara sobre os diferentes produtos e serviços</li>
                  <li>Proteção contra a publicidade enganosa e abusiva</li>
                  <li>Proteção contra métodos comerciais coercitivos ou desleais</li>
                  <li>Modificação das cláusulas contratuais que estabeleçam prestações desproporcionais</li>
                  <li>Efetiva prevenção e reparação de danos patrimoniais e morais</li>
                  <li>Acesso aos órgãos judiciários e administrativos</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Direitos Específicos dos Serviços de Telecomunicações</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <h4 className="font-semibold mb-2">Qualidade do Serviço</h4>
                <ul className="list-disc pl-6 mt-4">
                  <li>Receber o serviço conforme contratado</li>
                  <li>Velocidade de internet conforme especificada no plano</li>
                  <li>Instalação gratuita no prazo estabelecido</li>
                  <li>Reparo de problemas técnicos sem custo adicional</li>
                </ul>

                <h4 className="font-semibold mb-2 mt-6">Informação e Transparência</h4>
                <ul className="list-disc pl-6 mt-4">
                  <li>Receber informações claras sobre preços, condições e prazos</li>
                  <li>Conhecer todas as taxas e tarifas aplicáveis</li>
                  <li>Ser informado sobre mudanças no serviço com antecedência</li>
                  <li>Acesso ao contrato completo e suas condições</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Direito de Arrependimento</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  Para contratos firmados fora do estabelecimento comercial (online, por telefone ou domicílio), 
                  você tem o direito de desistir em <strong>até 7 dias corridos</strong> a contar da contratação, 
                  sem necessidade de justificativa e sem ônus.
                </p>
                
                <div className="bg-muted p-4 rounded-lg mt-4">
                  <p className="font-semibold mb-2">Como exercer o direito de arrependimento:</p>
                  <ul className="list-disc pl-6">
                    <li>Entre em contato através dos nossos canais oficiais</li>
                    <li>Solicite o cancelamento formalmente</li>
                    <li>Não há cobrança de multas ou taxas</li>
                    <li>Equipamentos instalados serão retirados gratuitamente</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Problemas com o Serviço</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <h4 className="font-semibold mb-2">Vícios do Serviço</h4>
                <p>Em caso de problemas com a qualidade do serviço, você pode:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Exigir a reexecução do serviço sem custo adicional</li>
                  <li>Solicitar a restituição imediata da quantia paga</li>
                  <li>Requerer o abatimento proporcional do preço</li>
                </ul>

                <h4 className="font-semibold mb-2 mt-6">Prazo para Solução</h4>
                <p>
                  A CAS Internet tem até <strong>30 dias</strong> para sanar os vícios ou problemas 
                  do serviço. Caso não seja possível, você poderá optar pelas alternativas acima.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cobrança Indevida</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  Em caso de cobrança indevida, você tem direito à devolução <strong>em dobro</strong> 
                  do valor pago indevidamente, salvo engano justificável.
                </p>
                
                <div className="bg-primary/5 p-4 rounded-lg mt-4">
                  <p className="font-semibold mb-2">Exemplos de cobrança indevida:</p>
                  <ul className="list-disc pl-6">
                    <li>Cobrança de serviços não solicitados</li>
                    <li>Valores diferentes do contratado</li>
                    <li>Taxas não informadas previamente</li>
                    <li>Cobrança após cancelamento</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Canais de Reclamação e Defesa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h5 className="font-semibold">Atendimento CAS Internet</h5>
                        <p className="text-sm text-muted-foreground">0800-CAS-NET (0800-227-638)</p>
                        <p className="text-sm text-muted-foreground">24 horas por dia, 7 dias por semana</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h5 className="font-semibold">ANATEL</h5>
                        <p className="text-sm text-muted-foreground">www.anatel.gov.br</p>
                        <p className="text-sm text-muted-foreground">Telefone: 1331 ou 1332</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Scale className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h5 className="font-semibold">PROCON</h5>
                        <p className="text-sm text-muted-foreground">www.procon.sp.gov.br</p>
                        <p className="text-sm text-muted-foreground">Telefone: 151</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h5 className="font-semibold">Consumidor.gov.br</h5>
                        <p className="text-sm text-muted-foreground">Portal de reclamações online</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Acessar Portal
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h5 className="font-semibold">Ouvidoria CAS Internet</h5>
                        <p className="text-sm text-muted-foreground">ouvidoria@casinternet.com.br</p>
                        <p className="text-sm text-muted-foreground">Resposta em até 10 dias úteis</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h5 className="font-semibold">Juizado Especial</h5>
                        <p className="text-sm text-muted-foreground">Para causas até 40 salários mínimos</p>
                        <p className="text-sm text-muted-foreground">Sem necessidade de advogado</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dicas Importantes</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Para uma melhor experiência:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Sempre guarde comprovantes e protocolos de atendimento</li>
                    <li>Leia atentamente o contrato antes de assinar</li>
                    <li>Mantenha seus dados de contato atualizados</li>
                    <li>Entre em contato conosco ao primeiro sinal de problema</li>
                    <li>Conheça seus direitos como consumidor</li>
                  </ul>
                </div>

                <div className="mt-6 text-center">
                  <Button size="lg">
                    Falar com Atendimento
                    <Phone className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}