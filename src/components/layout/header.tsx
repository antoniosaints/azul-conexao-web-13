import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, MapPin } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Parametros, useCity } from "@/contexts/CityContext";
import { addDays, isAfter, isBefore, isSameDay, subDays } from "date-fns";

const navigation = [
  { name: "Início", href: "#inicio" },
  { name: "Planos", href: "#planos" },
  { name: "Sobre", href: "#sobre" },
  { name: "Cobertura", href: "#cobertura" },
  { name: "Contato", href: "#contato" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCity, getCitySlug, parametros } = useCity();

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      navigate(`/${slug}${href}`);
    }
    setIsOpen(false);
  };

  const handleCityClick = () => {
    navigate("/");
  };
  const date = new Date(2025, 11, 25);
  const natal = new Date(date.getFullYear(), 11, 25);
  const isNatal = isAfter(date, subDays(natal, 20)) && isBefore(date, addDays(natal, 1));
  const logoCas = isNatal ? "/assets/logo_natal.webp" : "/assets/logo_branca.png";
  const slug = getCitySlug(selectedCity);
  const param = parametros[0] || ({} as Parametros);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-l from-success via-primary to-success">
      <div className="container mx-auto px-4">
        <div className="flex h-20 md:h-28 items-center justify-between">
          {/* Logo */}
          <Link to={`/${slug}`} className="flex items-center gap-2">
            <div className="p-2 rounded-lg">
              <img
                src={logoCas} //
                alt="logo"
                className="h-14 md:h-20"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "font-medium transition-colors hover:text-white relative text-md md:text-lg",
                  "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary",
                  "after:transition-all after:duration-300 hover:after:w-full",
                  location.pathname === item.href ? "text-white" : "text-white"
                )}
              >
                {item.name}
              </button>
            ))}
            {selectedCity && (
              <div className="hidden md:flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="flex items-center text-md text-white gap-1 cursor-pointer hover:bg-accent transition-colors"
                  onClick={handleCityClick}
                >
                  <MapPin className="w-3 h-3" />
                  {selectedCity.cidade} - {selectedCity.uf}
                </Badge>
              </div>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <a href={param.link_atendimento || "#"} target="_blank">
                <Button
                  size="lg"
                  className="bg-primary text-lg rounded-lg hover:scale-105 transition-all duration-300"
                >
                  Assine Já
                </Button>
              </a>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="flex items-center gap-2 text-lg bg-white rounded-lg hover:bg-primary"
                  >
                    Menu
                    <Menu className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-background border shadow-lg"
                >
                  <a href={param.teste_velocidade_url || "#"} target="_blank">
                    <DropdownMenuItem className="cursor-pointer hover:bg-accent">
                      Teste de Velocidade
                    </DropdownMenuItem>
                  </a>
                  <a href={param.trabalhe_conosco_url || "#"} target="_blank">
                    <DropdownMenuItem className="cursor-pointer hover:bg-accent">
                      Trabalhe Conosco
                    </DropdownMenuItem>
                  </a>
                  <a href={param.area_cliente_url || "#"} target="_blank">
                    <DropdownMenuItem className="cursor-pointer hover:bg-accent">
                      Área do Cliente
                    </DropdownMenuItem>
                  </a>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="bg-success">
                  <Menu className="w-10 h-10 text-white" />
                </Button>
              </SheetTrigger>
              <SheetTitle className="text-white hidden">Menu</SheetTitle>
              <SheetContent side="right" className="w-80 z-[9999]">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-primary rounded-lg">
                      <img
                        src="/assets/logo_branca.png"
                        alt="logo"
                        className="w-6 h-6"
                      />
                    </div>
                    <span className="text-xl font-bold text-primary">
                      CAS Internet
                    </span>
                  </div>

                  <nav className="flex flex-col gap-4">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="text-left text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </button>
                    ))}
                  </nav>

                  {selectedCity && (
                    <div className="flex flex-col gap-2 pt-4 border-t">
                      <span className="text-md text-muted-foreground">
                        Cidade atual:
                      </span>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 cursor-pointer hover:bg-accent transition-colors w-fit"
                        onClick={handleCityClick}
                      >
                        <MapPin className="w-3 h-3" />
                        {selectedCity.cidade} - {selectedCity.uf}
                      </Badge>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 pt-6 border-t">
                    <div className="space-y-3 flex flex-col">
                      <a
                        href={param.teste_velocidade_url || "#"}
                        target="_blank"
                        className="w-full text-left text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        Teste de Velocidade
                      </a>
                      <a
                        href={param.trabalhe_conosco_url || "#"}
                        target="_blank"
                        className="w-full text-left text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        Trabalhe Conosco
                      </a>
                      <a
                        href={param.area_cliente_url || "#"}
                        target="_blank"
                        className="w-full text-left text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        Área do Cliente
                      </a>
                    </div>
                    <a href={param.link_atendimento || "#"}>
                      <Button className="bg-gradient-primary">
                        Contratar Agora
                      </Button>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
