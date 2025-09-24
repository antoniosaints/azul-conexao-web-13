import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Parametros, useCity } from "@/contexts/CityContext";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Music2,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { name: "Planos Residenciais", href: "#planos" },
  { name: "Planos Empresariais", href: "#planos" },
  { name: "Cobertura", href: "#cobertura" },
  { name: "Suporte Técnico", href: "#contato" },
];

const legal = [
  { name: "Política de Privacidade", href: "/privacidade" },
  { name: "Termos de Uso", href: "/termos" },
];

export function Footer() {
  const { parametros, selectedCity } = useCity();
  const param = parametros[0] || ({} as Parametros);
  if (selectedCity === null) {
    return null;
  }
  return (
    <footer className="bg-gradient-to-r from-success via-primary to-success text-background">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg">
                  <img
                    src="/assets/logo_branca.png"
                    alt="logo_cas"
                    className="w-28"
                  />
                </div>
              </div>

              {/* Social Media */}
              <div className="flex gap-4">
                {param.facebook && (
                  <a href={param.facebook} target="_blank">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-background/20 bg-success/70 hover:border-primary"
                    >
                      <Facebook className="w-5 h-5" />
                    </Button>
                  </a>
                )}
                {param.instagram && (
                  <a href={param.instagram} target="_blank">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-background/20 bg-success/70 hover:border-primary"
                    >
                      <Instagram className="w-5 h-5" />
                    </Button>
                  </a>
                )}
                {param.twitter && (
                  <a href={param.twitter} target="_blank">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-background/20 bg-success/70 hover:border-primary"
                    >
                      <Twitter className="w-5 h-5" />
                    </Button>
                  </a>
                )}
                {param.youtube && (
                  <a href={param.youtube} target="_blank">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-background/20 bg-success/70 hover:border-primary"
                    >
                      <Youtube className="w-5 h-5" />
                    </Button>
                  </a>
                )}
                {param.tiktok && (
                  <a href={param.tiktok} target="_blank">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-background/20 bg-success/70 hover:border-primary"
                    >
                      <Music2 className="w-5 h-5" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              {/* Contact Info */}
              <div className="space-y-3 text-sm mb-6">
                <div className="flex items-center gap-3">
                  <span>{param.telefone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{param.email_cas}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{selectedCity.endereco_loja ? selectedCity.endereco_loja : param.endereco_loja}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{param.periodo_atendimento}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#sobre"
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a
                    href={param.trabalhe_conosco_url}
                    target="_blank"
                    className="text-white hover:text-gray-200 transition-colors"
                    >
                    Trabalhe conosco
                  </a>
                </li>
                <li>
                  <a
                    href={param.area_cliente_url}
                    target="_blank"
                    className="text-white hover:text-gray-200 transition-colors"
                    >
                    Área do cliente
                  </a>
                </li>
                <li>
                  <a
                    href={param.teste_velocidade_url}
                    target="_blank"
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    Testar velocidade
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-background/20" />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-background/80 text-sm">
              © 2024 CAS Internet. Todos os direitos reservados.
            </div>

            <div className="flex flex-wrap gap-2">
              {legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-background/80 hover:text-blue-200 transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
