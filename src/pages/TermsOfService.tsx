import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck2 } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <FileCheck2 className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Termos de Uso
            </h1>
            <p className="text-xl text-muted-foreground">
              Última atualização: Dezembro de 2024
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Aceitação dos Termos</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  Ao contratar os serviços da CAS Internet, você concorda em cumprir e ficar vinculado a estes 
                  Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve utilizar nossos serviços.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Descrição dos Serviços</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  A CAS Internet oferece serviços de internet banda larga através de fibra ótica, incluindo:
                </p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Acesso à internet de alta velocidade</li>
                  <li>Suporte técnico especializado</li>
                  <li>Instalação e manutenção de equipamentos</li>
                  <li>Serviços adicionais conforme contratados</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Responsabilidades do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>O cliente se compromete a:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Utilizar os serviços de forma legal e adequada</li>
                  <li>Manter a confidencialidade de suas credenciais de acesso</li>
                  <li>Efetuar os pagamentos nas datas estabelecidas</li>
                  <li>Permitir acesso para instalação e manutenção dos equipamentos</li>
                  <li>Não compartilhar a conexão sem autorização</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Política de Uso Aceitável</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>É expressamente proibido:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Utilizar a conexão para atividades ilegais</li>
                  <li>Distribuir vírus, malware ou conteúdo prejudicial</li>
                  <li>Realizar ataques a outros sistemas ou redes</li>
                  <li>Violar direitos autorais ou propriedade intelectual</li>
                  <li>Enviar spam ou e-mails não solicitados</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Pagamentos e Faturamento</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  As mensalidades são cobradas antecipadamente e o não pagamento até a data de vencimento 
                  pode resultar na suspensão dos serviços. Taxa de religação pode ser aplicada conforme 
                  regulamento da ANATEL.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Cancelamento</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  O cliente pode cancelar os serviços a qualquer momento mediante solicitação formal. 
                  Não há multa de fidelidade. Os equipamentos cedidos em comodato devem ser devolvidos 
                  em perfeito estado.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Limitações de Responsabilidade</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  A CAS Internet não se responsabiliza por danos indiretos ou consequenciais decorrentes 
                  do uso dos serviços, incluindo perda de dados, lucros cessantes ou interrupções temporárias.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Alterações dos Termos</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  Estes termos podem ser alterados a qualquer momento. As alterações serão comunicadas 
                  aos clientes com antecedência mínima de 30 dias.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}