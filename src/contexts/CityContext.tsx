import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import http from '@/lib/http';

export interface City {
  id_cidade: string;
  status: 'a' | 'i';
  cidade: string;
  uf: string;
  sigla: string;
  site: string;
  geolocalizacao: string;
}
export interface Apps {
  nome: string,
  imagem: string
}
export interface Plan {
  id: string;
  plano: string;
  upload_ofertado: string;
  upload_recebido: string;
  download_ofertado: string;
  download_recebido: string;
  valor: string;
  valor_promocao: string;
  valor_promocional: '1' | '0';
  velocidade_promocional: '1' | '0';
  premium: '1' | '0';
  beneficios: string;
  cidade: string;
  status: '1' | '0';
  aplicativos: Apps[]
  cidades: City[]
}

interface CityContextData {
  selectedCity: City | null;
  availableCities: City[];
  availablePlans: Plan[];
  setSelectedCity: (city: City | null) => void;
  getCityById: (id: string) => City | undefined;
  getCityBySlug: (slug: string) => City | undefined;
  getCitySlug: (city: City | null) => string;
}

const CityContext = createContext<CityContextData>({} as CityContextData);

interface CityProviderProps {
  children: ReactNode;
}

export function CityProvider({ children }: CityProviderProps) {
  const [selectedCity, setSelectedCityState] = useState<City | null>(null);
  const [availableCities, setAvailableCities] = useState<City[]>([]);
  const [availablePlans, setavailablePlans] = useState<Plan[]>([]);

  const setSelectedCity = (city: City | null) => {
    setSelectedCityState(city);
    if (city) {
      localStorage.setItem('selectedCity', JSON.stringify(city));
    } else {
      localStorage.removeItem('selectedCity');
    }
  };

  const getCityById = (id: string): City | undefined => {
    return availableCities.find(city => city.id_cidade === id);
  };

  const getCitySlug = (city: City | null): string => {
    if (!city) return '';
    return city.cidade
      .toLowerCase()
      .replace(/\s+/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const getCityBySlug = (slug: string): City | undefined => {
    return availableCities.find(city => getCitySlug(city) === slug);
  };

  // Buscar cidades no backend
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data } = await http.get<City[]>('getCidades'); // ajuste sua rota aqui
        console.log(data)
        const activeCities = data.filter(city => city.status === 'a');
        setAvailableCities(activeCities);

        // restaurar cidade salva
        const savedCity = localStorage.getItem('selectedCity');
        if (savedCity) {
          const parsed = JSON.parse(savedCity);
          const foundCity = activeCities.find(c => c.id_cidade === parsed.id_cidade);
          if (foundCity) {
            setSelectedCityState(foundCity);
          } else {
            localStorage.removeItem('selectedCity');
          }
        }
      } catch (error) {
        console.error('Erro ao carregar cidades:', error);
      }
    };
    const fetchPlans = async () => {
      try {
        const { data } = await http.get<Plan[]>('getPlanosAplicativos');
        console.log(data)
        setavailablePlans(data);
      } catch (error) {
        console.error('Erro ao carregar cidades:', error);
      }
    };

    fetchCities();
    fetchPlans();
  }, []);

  return (
    <CityContext.Provider
      value={{
        selectedCity,
        availableCities,
        availablePlans,
        setSelectedCity,
        getCityById,
        getCityBySlug,
        getCitySlug,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
}
