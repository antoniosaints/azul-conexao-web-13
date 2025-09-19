import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Wifi, MapPin, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCity } from "@/contexts/CityContext";

const navigation = [
  { name: "Início", href: "#inicio" },
  { name: "Planos", href: "#planos" },
  { name: "Sobre", href: "#sobre" },
  { name: "Blog", href: "#blog" },
  { name: "Contato", href: "#contato" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCity, getCitySlug } = useCity();

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        const rect = element.getBoundingClientRect();
        const y = rect.top + window.scrollY - 40;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  const handleCityClick = () => {
    navigate("/");
  };

  const slug = getCitySlug(selectedCity);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-l from-success/100 to-primary/100">
      <div className="container mx-auto px-4">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <Link to={`/${slug}`} className="flex items-center gap-2">
            <div className="p-2 rounded-lg">
              <img src="/assets/logo_branca.png" alt="logo" className="w-16 h-16" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "font-medium transition-colors hover:text-primary relative text-lg",
                  "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary",
                  "after:transition-all after:duration-300 hover:after:w-full",
                  location.pathname === item.href
                    ? "text-white"
                    : "text-white"
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
                  {selectedCity.name} - {selectedCity.state}
                </Badge>
              </div>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Button size="sm" className="bg-primary text-md rounded-[5px] hover:scale-105 transition-all duration-300">
                Assine Já
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-md bg-white rounded-[5px] hover:bg-primary"
                  >
                    Menu
                    <Menu className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-background border shadow-lg"
                >
                  <DropdownMenuItem className="cursor-pointer hover:bg-accent">
                    Teste de Velocidade
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-accent">
                    Trabalhe Conosco
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-accent">
                    Área do Cliente
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-primary rounded-lg">
                      <Wifi className="w-6 h-6 text-white" />
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
                      <span className="text-sm text-muted-foreground">
                        Cidade atual:
                      </span>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 cursor-pointer hover:bg-accent transition-colors w-fit"
                        onClick={handleCityClick}
                      >
                        <MapPin className="w-3 h-3" />
                        {selectedCity.name} - {selectedCity.state}
                      </Badge>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 pt-6 border-t">
                    <div className="space-y-3">
                      <button className="w-full text-left text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                        Teste de Velocidade
                      </button>
                      <button className="w-full text-left text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                        Trabalhe Conosco
                      </button>
                      <button className="w-full text-left text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                        Área do Cliente
                      </button>
                    </div>
                    <Button className="bg-gradient-primary">
                      Contratar Agora
                    </Button>
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
