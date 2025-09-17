import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface City {
  id: string;
  name: string;
  state: string;
  isActive: boolean;
}

// Dados mockados das cidades
export const mockCities: City[] = [
  { id: '1', name: 'São Paulo', state: 'SP', isActive: true },
  { id: '2', name: 'Rio de Janeiro', state: 'RJ', isActive: true },
  { id: '3', name: 'Belo Horizonte', state: 'MG', isActive: true },
  { id: '4', name: 'Salvador', state: 'BA', isActive: true },
  { id: '5', name: 'Fortaleza', state: 'CE', isActive: true },
  { id: '6', name: 'Brasília', state: 'DF', isActive: true },
  { id: '7', name: 'Curitiba', state: 'PR', isActive: true },
  { id: '8', name: 'Recife', state: 'PE', isActive: true },
];

interface CityContextData {
  selectedCity: City | null;
  availableCities: City[];
  setSelectedCity: (city: City | null) => void;
  getCityById: (id: string) => City | undefined;
  getCityBySlug: (slug: string) => City | undefined;
  getCitySlug: (city: City) => string;
}

const CityContext = createContext<CityContextData>({} as CityContextData);

interface CityProviderProps {
  children: ReactNode;
}

export function CityProvider({ children }: CityProviderProps) {
  const [selectedCity, setSelectedCityState] = useState<City | null>(null);
  const [availableCities] = useState<City[]>(mockCities.filter(city => city.isActive));

  const setSelectedCity = (city: City | null) => {
    setSelectedCityState(city);
    if (city) {
      localStorage.setItem('selectedCity', JSON.stringify(city));
    } else {
      localStorage.removeItem('selectedCity');
    }
  };

  const getCityById = (id: string): City | undefined => {
    return availableCities.find(city => city.id === id);
  };

  const getCitySlug = (city: City): string => {
    return city.name.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const getCityBySlug = (slug: string): City | undefined => {
    return availableCities.find(city => getCitySlug(city) === slug);
  };

  // Carregar cidade do localStorage na inicialização
  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      try {
        const city = JSON.parse(savedCity);
        // Verificar se a cidade ainda está disponível
        const foundCity = getCityById(city.id);
        if (foundCity) {
          setSelectedCityState(foundCity);
        }
      } catch (error) {
        console.error('Erro ao carregar cidade salva:', error);
        localStorage.removeItem('selectedCity');
      }
    }
  }, []);

  return (
    <CityContext.Provider
      value={{
        selectedCity,
        availableCities,
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