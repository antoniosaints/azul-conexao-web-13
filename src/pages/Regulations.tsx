import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Regulations() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Regulamento
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Regulamento Geral dos Serviços CAS Internet
            </p>
            <Badge variant="outline">Conforme ANATEL</Badge>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Definições Gerais</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>Para fins deste regulamento, considera-se:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li><strong>Provedor:</strong> CAS Internet Ltda.</li>
                  <li><strong>Usuário:</strong> Pessoa física ou jurídica contratante dos serviços</li>
                  <li><strong>SCM:</strong> Serviço de Comunicação Multimídia</li>
                  <li><strong>ANATEL:</strong> Agência Nacional de Telecomunicações</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Qualidade dos Serviços</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <h4 className="font-semibold mb-2">2.1 Velocidades de Conexão</h4>
                <p>As velocidades contratadas seguem os padrões da ANATEL:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Velocidade média: mínimo de 80% da velocidade contratada</li>
                  <li>Velocidade instantânea: mínimo de 40% da velocidade contratada</li>
                  <li>Medições realizadas conforme metodologia da ANATEL</li>
                </ul>

                <h4 className="font-semibold mb-2 mt-6">2.2 Disponibilidade do Serviço</h4>
                <p>Meta de disponibilidade: 99,5% do tempo mensal</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Atendimento ao Cliente</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <h4 className="font-semibold mb-2">3.1 Canais de Atendimento</h4>
                <ul className="list-disc pl-6 mt-4">
                  <li>Central de Atendimento: 0800-CAS-NET (0800-227-638)</li>
                  <li>WhatsApp: (11) 99999-9999</li>
                  <li>E-mail: suporte@casinternet.com.br</li>
                  <li>Site: www.casinternet.com.br</li>
                </ul>

                <h4 className="font-semibold mb-2 mt-6">3.2 Prazos de Atendimento</h4>
                <ul className="list-disc pl-6 mt-4">
                  <li>Solicitações comerciais: até 24 horas</li>
                  <li>Problemas técnicos: até 24 horas</li>
                  <li>Instalação: até 7 dias úteis</li>
                  <li>Reparo: até 24 horas</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Cobrança e Faturamento</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <h4 className="font-semibold mb-2">4.1 Ciclo de Cobrança</h4>
                <p>As mensalidades são cobradas mensalmente, com vencimento no dia escolhido pelo cliente.</p>

                <h4 className="font-semibold mb-2 mt-6">4.2 Formas de Pagamento</h4>
                <ul className="list-disc pl-6 mt-4">
                  <li>Boleto bancário</li>
                  <li>Débito automático</li>
                  <li>Cartão de crédito</li>
                  <li>PIX</li>
                </ul>

                <h4 className="font-semibold mb-2 mt-6">4.3 Atraso no Pagamento</h4>
                <p>
                  Em caso de atraso, serão aplicados juros de 1% ao mês e multa de 2% sobre o valor em atraso.
                  O serviço poderá ser suspenso após 15 dias de atraso.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Instalação e Equipamentos</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <h4 className="font-semibold mb-2">5.1 Instalação Gratuita</h4>
                <p>A instalação padrão é gratuita e inclui:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Roteador Wi-Fi em comodato</li>
                  <li>Cabeamento interno até 30 metros</li>
                  <li>Configuração básica da rede</li>
                </ul>

                <h4 className="font-semibold mb-2 mt-6">5.2 Equipamentos em Comodato</h4>
                <p>
                  Os equipamentos fornecidos permanecem como propriedade da CAS Internet e devem ser 
                  devolvidos em caso de cancelamento do serviço.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Suspensão e Cancelamento</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <h4 className="font-semibold mb-2">6.1 Suspensão por Inadimplência</h4>
                <p>
                  O serviço poderá ser suspenso após 15 dias de atraso no pagamento, mediante notificação prévia.
                </p>

                <h4 className="font-semibold mb-2 mt-6">6.2 Cancelamento pelo Cliente</h4>
                <p>
                  O cliente pode cancelar o serviço a qualquer momento, sem multas ou taxas adicionais.
                  A solicitação deve ser feita pelos canais oficiais de atendimento.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Direitos do Consumidor</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  Este regulamento não prejudica os direitos previstos no Código de Defesa do Consumidor 
                  e demais legislações aplicáveis. Em caso de conflito, prevalecerá sempre a legislação vigente.
                </p>
                
                <h4 className="font-semibold mb-2 mt-6">Órgãos de Defesa</h4>
                <ul className="list-disc pl-6 mt-4">
                  <li>ANATEL: www.anatel.gov.br</li>
                  <li>PROCON: www.procon.org.br</li>
                  <li>Consumidor.gov.br</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}