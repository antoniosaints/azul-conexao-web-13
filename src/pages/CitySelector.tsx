import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { Parametros, useCity } from "@/contexts/CityContext";
import { addDays, isAfter, isBefore, subDays } from "date-fns";
import Comet from "@/components/effects/Comet";

export default function CitySelector() {
  const { availableCities, setSelectedCity, getCitySlug, parametros, loading } =
    useCity();
  const [selectedCityId, setSelectedCityId] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false); // para o fade
  const navigate = useNavigate();

  const handleCitySelect = () => {
    if (!selectedCityId) return;
    const city = availableCities.find((c) => c.id_cidade === selectedCityId);
    if (city) {
      setSelectedCity(city);
      const citySlug = getCitySlug(city);
      navigate(`/${citySlug}`);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 50); // delay curto para iniciar o fade
    return () => clearTimeout(timeout);
  }, []);

  const param = parametros[0] || ({} as Parametros);

  const date = new Date(2025, 11, 25);
  const natal = new Date(date.getFullYear(), 11, 25);
  const isNatal =
    isAfter(date, subDays(natal, 20)) && isBefore(date, addDays(natal, 1));
  const logoCas = isNatal
    ? "/assets/logo_natal_2.webp"
    : "/assets/logo_branca.png";

  const Background = isNatal
  ? "/assets/BACKGROUND_NATAL.webp"
  : "/assets/BACKGROUND.png";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-r from-success border-none via-primary to-success flex items-center justify-center px-4 transition-opacity duration-700 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
       <Comet />
      <img
        src={Background}
        alt="Logo"
        className="absolute top-0 left-0 w-full h-screen object-cover"
      />
      <div className="max-w-md w-full z-50">
        {/* Card de seleção */}
        <Card className="border-none bg-transparent shadow-none">
          <CardHeader className="text-center pb-4">
            <div className="w-56 h-56 mx-auto mb-4 rounded-full flex items-center justify-center">
              <img src={logoCas} alt="Logo" />
            </div>
            <CardTitle className="text-2xl text-white">
              Selecione a cidade para continuar
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2 flex flex-col justify-center text-center">
              <label className="text-sm font-medium text-white">
                Selecione onde você está localizado:
              </label>
              <Select
                value={selectedCityId}
                onValueChange={(value) => {
                  setSelectedCityId(value);
                  const city = availableCities.find(
                    (c) => c.id_cidade === value
                  );
                  if (city) {
                    setSelectedCity(city);
                    const citySlug = getCitySlug(city);
                    navigate(`/${citySlug}`);
                  }
                }}
              >
                <SelectTrigger className="h-14 text-base md:text-lg px-6">
                  <SelectValue placeholder="Escolha uma cidade..." />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.map((city) => (
                    <SelectItem
                      className="text-md h-10 text-gray-800 cursor-pointer hover:text-gray-200"
                      key={city.id_cidade}
                      value={city.id_cidade}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {city.cidade} - {city.uf}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-center">
              <p className="text-sm text-white">
                Sua cidade não está na lista?{" "}
                <a href={param.link_atendimento} target="_blank">
                  <button className="text-gray-200 hover:underline font-medium">
                    Entre em contato
                  </button>
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
