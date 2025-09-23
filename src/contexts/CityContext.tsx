import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import http from "@/lib/http";

export interface Posts {
  id: string;
  titulo: string;
  image: string | null;
  subtitulo: string;
  conteudo: string;
  autor: string | null;
  tipo: string;
  created_at: string;
}
export interface Parametros {
  id: string;
  link_atendimento: string;
  email_cas: string;
  telefone: string;
  periodo_atendimento: string;
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
  skype: string;
  abertura_empresa: string;
  teste_velocidade_url: string;
  trabalhe_conosco_url: string;
  area_cliente_url: string;
  endereco_loja: string;
}
export interface Depoiments {
  id: string;
  nome: string;
  cidade: string;
  depoimento: string;
}
export interface Banners {
  id: string;
  nome: string;
  imagem: string;
  created_at: string;
}
export interface City {
  id_cidade: string;
  status: "a" | "i";
  cidade: string;
  uf: string;
  sigla: string;
  site: string;
  geolocalizacao: string;
  banners: Banners[];
}
export interface Apps {
  nome: string;
  imagem: string;
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
  valor_promocional: "1" | "0";
  velocidade_promocional: "1" | "0";
  premium: "1" | "0";
  beneficios: string;
  cidade: string;
  status: "1" | "0";
  apps: string;
  aplicativos: Apps[];
  cidades: City[];
}

interface CityContextData {
  selectedCity: City | null;
  availableCities: City[];
  availablePlans: Plan[];
  depoiments: Depoiments[];
  posts: Posts[];
  parametros: Parametros[];
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
  const [depoiments, setDepoiments] = useState<Depoiments[]>([]);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [parametros, setParametros] = useState<Parametros[]>([]);

  const setSelectedCity = (city: City | null) => {
    setSelectedCityState(city);
    if (city) {
      localStorage.setItem("selectedCity", JSON.stringify(city));
    } else {
      localStorage.removeItem("selectedCity");
    }
  };

  const getCityById = (id: string): City | undefined => {
    return availableCities.find((city) => city.id_cidade === id);
  };

  const getCitySlug = (city: City | null): string => {
    if (!city) return "";
    return city.cidade
      .toLowerCase()
      .replace(/\s+/g, "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const getCityBySlug = (slug: string): City | undefined => {
    return availableCities.find((city) => getCitySlug(city) === slug);
  };

  // Buscar cidades no backend
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data } = await http.get<City[]>("getCidades");
        const activeCities = data.filter((city) => city.status === "a");
        setAvailableCities(activeCities);

        const savedCity = localStorage.getItem("selectedCity");
        if (savedCity) {
          const parsed = JSON.parse(savedCity);
          const foundCity = activeCities.find(
            (c) => c.id_cidade === parsed.id_cidade
          );
          if (foundCity) {
            setSelectedCityState(foundCity);
          } else {
            localStorage.removeItem("selectedCity");
          }
        }
      } catch (error) {
        console.error("Erro ao carregar cidades:", error);
      }
    };
    const fetchPlans = async () => {
      try {
        const { data } = await http.get<Plan[]>("getPlanosAplicativos");
        setavailablePlans(data);
      } catch (error) {
        console.error("Erro ao carregar planos:", error);
      }
    };
    const fetchParametros = async () => {
      try {
        const { data } = await http.get<Parametros[]>("getParametros");
        setParametros(data);
      } catch (error) {
        console.error("Erro ao carregar parametros:", error);
      }
    };
    const fetchDepoiments = async () => {
      try {
        const { data } = await http.get<Depoiments[]>("getDepoimentos");
        setDepoiments(data);
      } catch (error) {
        console.error("Erro ao carregar depoimentos:", error);
      }
    };
    const fetchPosts = async () => {
      try {
        const { data } = await http.get<Posts[]>("getPosts");
        setPosts(data);
      } catch (error) {
        console.error("Erro ao carregar cidades:", error);
      }
    };

    const promises = [
      fetchCities(),
      fetchPlans(),
      fetchDepoiments(),
      fetchPosts(),
      fetchParametros(),
    ];
    Promise.all(promises)
      .then(() =>
        console.log("Todas as requisições foram carregadas com sucesso")
      )
      .catch((error) =>
        console.error("Erro ao carregar as requisições:", error)
      );
  }, []);

  return (
    <CityContext.Provider
      value={{
        selectedCity,
        availableCities,
        availablePlans,
        depoiments,
        posts,
        parametros,
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
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
}
