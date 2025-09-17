import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Wifi, Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

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
  { name: "Regulamento", href: "/regulamento" },
  { name: "Código de Defesa", href: "/defesa" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-primary rounded-lg">
                  <Wifi className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-primary">CAS Internet</span>
              </div>
              <p className="text-background/80 mb-6 max-w-md">
                Conectando pessoas e empresas com a melhor internet fibra ótica do Brasil há mais de 15 anos.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>(11) 3000-0000</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>contato@casinternet.com.br</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Av. Paulista, 1000 - São Paulo, SP</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Seg-Sex: 8h-18h | Sáb: 8h-14h</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex gap-4">
                <Button size="icon" variant="outline" className="border-background/20 hover:bg-primary hover:border-primary">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="outline" className="border-background/20 hover:bg-primary hover:border-primary">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="outline" className="border-background/20 hover:bg-primary hover:border-primary">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="outline" className="border-background/20 hover:bg-primary hover:border-primary">
                  <Youtube className="w-5 h-5" />
                </Button>
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

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-background/80 mb-4 text-sm">
                Receba novidades e promoções exclusivas
              </p>
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
                />
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Inscrever-se
                </Button>
              </div>
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
            
            <div className="flex flex-wrap gap-6">
              {legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-background/80 hover:text-primary transition-colors text-sm"
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