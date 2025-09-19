import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MapPin, Wifi, ArrowRight } from 'lucide-react';
import { useCity } from '@/contexts/CityContext';

export default function CitySelector() {
  const { availableCities, setSelectedCity, getCitySlug } = useCity();
  const [selectedCityId, setSelectedCityId] = useState<string>('');
  const navigate = useNavigate();

  const handleCitySelect = () => {
    if (!selectedCityId) return;
    
    const city = availableCities.find(c => c.id === selectedCityId);
    if (city) {
      setSelectedCity(city);
      const citySlug = getCitySlug(city);
      navigate(`/${citySlug}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/40 via-primary/20 to-primary/10 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Card de seleção */}
        <Card className="shadow-xl border-0 bg-background/95 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center">
              <img src="/assets/logo.png" alt="Logo" />
            </div>
            <CardTitle className="text-2xl">Escolha sua cidade</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Selecione onde você está localizado:
              </label>
              <Select value={selectedCityId} onValueChange={setSelectedCityId}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Escolha uma cidade..." />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{city.name} - {city.state}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleCitySelect}
              disabled={!selectedCityId}
              className="w-full h-12 text-base bg-gradient-primary hover:opacity-90 transition-all duration-300"
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Sua cidade não está na lista?{' '}
                <button className="text-primary hover:underline font-medium">
                  Entre em contato
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Informações extras */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            🔒 Seus dados estão seguros conosco
          </p>
          <p className="text-xs text-muted-foreground">
            Atendemos mais de {availableCities.length} cidades em todo o Brasil
          </p>
        </div>
      </div>
    </div>
  );
}