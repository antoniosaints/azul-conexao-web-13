import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Wifi,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const quickLinks = [
  { name: "Planos Residenciais", href: "#planos" },
  { name: "Planos Empresariais", href: "#empresas" },
  { name: "Cobertura", href: "#cobertura" },
  { name: "Suporte Técnico", href: "#suporte" },
];

const company = [
  { name: "Sobre Nós", href: "#sobre" },
  { name: "Trabalhe Conosco", href: "#carreiras" },
  { name: "Imprensa", href: "#imprensa" },
  { name: "Responsabilidade Social", href: "#social" },
];

const legal = [
  { name: "Política de Privacidade", href: "/privacidade" },
  { name: "Termos de Uso", href: "/termos" },
  // { name: "Regulamento", href: "/regulamento" },
  // { name: "Código de Defesa", href: "/defesa" },
];

export function Footer() {
  const navigate = useNavigate();
  function goToTop(url: string) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(url);
  }
  return (
    <footer className="bg-gradient-to-r from-primary to-success text-background">
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
                <Button
                  size="icon"
                  variant="outline"
                  className="border-background/20 bg-success/70 hover:border-primary"
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-background/20 bg-success/70 hover:border-primary"
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-background/20 bg-success/70 hover:border-primary"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-background/20 bg-success/70 hover:border-primary"
                >
                  <Youtube className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              {/* Contact Info */}
              <div className="space-y-3 text-sm mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white" />
                  <span>(11) 3000-0000</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white" />
                  <span>contato@casinternet.com.br</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-white" />
                  <span>Av. Paulista, 1000 - São Paulo, SP</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-white" />
                  <span>Seg-Sex: 8h-18h | Sáb: 8h-14h</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-background/80 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-3">
                {company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-background/80 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
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
                <Button
                  variant="link"
                  key={link.name}
                  onClick={() => goToTop(link.href)}
                  className="text-background/80 hover:text-blue-200 transition-colors text-sm"
                >
                  {link.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
