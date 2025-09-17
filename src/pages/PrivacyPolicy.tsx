import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Database } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Shield className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Política de Privacidade
            </h1>
            <p className="text-xl text-muted-foreground">
              Última atualização: Dezembro de 2024
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  1. Informações que Coletamos
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <h4 className="font-semibold mb-2">1.1 Dados Pessoais</h4>
                <p>Coletamos as seguintes informações pessoais:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Nome completo e documentos de identificação (CPF/CNPJ)</li>
                  <li>Endereço completo para instalação do serviço</li>
                  <li>Telefone e e-mail para contato</li>
                  <li>Dados financeiros para cobrança (quando aplicável)</li>
                </ul>

                <h4 className="font-semibold mb-2 mt-6">1.2 Dados de Navegação</h4>
                <p>Para melhoria dos serviços, coletamos:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Dados de tráfego e uso da conexão (de forma agregada)</li>
                  <li>Informações técnicas dos equipamentos</li>
                  <li>Logs de conexão para suporte técnico</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  2. Como Utilizamos suas Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>Utilizamos suas informações para:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Prestação dos serviços de internet contratados</li>
                  <li>Processamento de pagamentos e emissão de faturas</li>
                  <li>Suporte técnico e atendimento ao cliente</li>
                  <li>Melhoria da qualidade dos serviços</li>
                  <li>Cumprimento de obrigações legais e regulatórias</li>
                  <li>Comunicação sobre serviços e ofertas (mediante consentimento)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  3. Compartilhamento de Dados
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>Seus dados podem ser compartilhados apenas nas seguintes situações:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Com prestadores de serviços terceirizados (sob contrato de confidencialidade)</li>
                  <li>Quando exigido por ordem judicial ou autoridade competente</li>
                  <li>Para cumprimento de obrigações legais ou regulatórias</li>
                  <li>Em caso de fusão, aquisição ou venda da empresa (com notificação prévia)</li>
                </ul>
                
                <p className="mt-4 font-semibold">
                  Nunca vendemos, alugamos ou comercializamos seus dados pessoais com terceiros 
                  para fins comerciais ou publicitários.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Segurança dos Dados</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>Implementamos medidas de segurança técnicas e organizacionais:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Criptografia de dados em trânsito e em repouso</li>
                  <li>Controle de acesso restrito aos dados pessoais</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Treinamento regular da equipe sobre proteção de dados</li>
                  <li>Auditorias de segurança periódicas</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Seus Direitos (LGPD)</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>Conforme a Lei Geral de Proteção de Dados, você tem direito a:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li><strong>Confirmação:</strong> Saber se tratamos seus dados pessoais</li>
                  <li><strong>Acesso:</strong> Obter cópia dos dados que possuímos sobre você</li>
                  <li><strong>Correção:</strong> Atualizar dados incompletos ou incorretos</li>
                  <li><strong>Anonimização/Bloqueio:</strong> Quando aplicável</li>
                  <li><strong>Eliminação:</strong> Excluir dados desnecessários ou excessivos</li>
                  <li><strong>Portabilidade:</strong> Transferir dados para outro provedor</li>
                  <li><strong>Revogação:</strong> Retirar consentimento a qualquer momento</li>
                </ul>

                <p className="mt-6">
                  Para exercer seus direitos, entre em contato conosco através do e-mail: 
                  <strong> privacidade@casinternet.com.br</strong>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Retenção de Dados</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>Mantemos seus dados pelo período necessário para:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Prestação dos serviços contratados</li>
                  <li>Cumprimento de obrigações legais (mínimo de 5 anos)</li>
                  <li>Exercício regular de direitos em processos judiciais</li>
                </ul>
                
                <p className="mt-4">
                  Após esse período, os dados serão anonimizados ou eliminados de forma segura.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Cookies e Tecnologias Similares</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>Nosso site utiliza cookies para:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li>Melhorar a experiência de navegação</li>
                  <li>Personalizar conteúdo e ofertas</li>
                  <li>Analisar o desempenho do site</li>
                </ul>
                
                <p className="mt-4">
                  Você pode gerenciar suas preferências de cookies nas configurações do seu navegador.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Alterações nesta Política</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  Esta política pode ser atualizada periodicamente. Alterações significativas serão 
                  comunicadas através dos nossos canais oficiais com antecedência mínima de 30 dias.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Contato</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>Para questões sobre privacidade e proteção de dados:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li><strong>E-mail:</strong> privacidade@casinternet.com.br</li>
                  <li><strong>Telefone:</strong> 0800-CAS-NET (0800-227-638)</li>
                  <li><strong>Endereço:</strong> Rua das Telecomunicações, 123 - São Paulo/SP</li>
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