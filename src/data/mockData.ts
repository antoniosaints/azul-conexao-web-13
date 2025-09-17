import type { City } from '@/contexts/CityContext';

// Interface para dados que podem ser filtrados por cidade
export interface CityFilterable {
  cities: string[]; // IDs das cidades onde o item aparece
}

// Planos com filtro de cidade
export interface Plan extends CityFilterable {
  id: number;
  name: string;
  speed: string;
  price: number;
  originalPrice: number;
  features: string[];
  apps: string[]; // Aplicativos incluídos no plano
  isHighlight: boolean;
  isPremium: boolean;
  isVisible: boolean;
  color: string;
}

// Depoimentos com filtro de cidade
export interface Testimonial extends CityFilterable {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: string;
}

// Posts do blog com filtro de cidade
export interface BlogPost extends CityFilterable {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
}

// Banners do carrossel com filtro de cidade
export interface CarouselSlide extends CityFilterable {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

// Mock data - Planos
export const mockPlans: Plan[] = [
  {
    id: 1,
    name: "Básico",
    speed: "100 MB",
    price: 59.90,
    originalPrice: 79.90,
    features: [
      "Velocidade de 100 Mbps",
      "WiFi grátis incluso", 
      "Instalação gratuita",
      "Suporte 24h",
      "Sem fidelidade",
    ],
    apps: [],
    isHighlight: false,
    isPremium: false,
    isVisible: true,
    color: "from-muted to-muted/50",
    cities: ['1', '2', '3', '4', '5', '6', '7', '8'], // Disponível em todas as cidades
  },
  {
    id: 2,
    name: "Plus",
    speed: "300 MB", 
    price: 89.90,
    originalPrice: 119.90,
    features: [
      "Velocidade de 300 Mbps",
      "WiFi 6 grátis incluso",
      "Instalação gratuita", 
      "Suporte 24h prioritário",
      "Sem fidelidade",
      "Netflix incluso",
    ],
    apps: ["netflix", "looke"],
    isHighlight: true,
    isPremium: false,
    isVisible: true,
    color: "from-primary to-primary-glow",
    cities: ['1', '2', '3', '4', '5', '6'], // Disponível em 6 cidades
  },
  {
    id: 3,
    name: "Premium",
    speed: "600 MB",
    price: 129.90,
    originalPrice: 169.90,
    features: [
      "Velocidade de 600 Mbps",
      "WiFi 6E grátis incluso",
      "Instalação gratuita",
      "Suporte 24h VIP", 
      "Sem fidelidade",
      "Netflix + Amazon Prime",
      "IP fixo gratuito",
    ],
    apps: ["netflix", "prime-video", "looke", "deezer"],
    isHighlight: false,
    isPremium: true,
    isVisible: true,
    color: "from-gradient-premium via-primary to-accent",
    cities: ['1', '2', '3'], // Disponível apenas nas 3 principais cidades
  },
];

// Mock data - Depoimentos
export const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Oliveira",
    location: "Moema, São Paulo",
    rating: 5,
    comment: "Internet muito rápida e estável. O suporte é excelente, sempre me atenderam super bem quando precisei. Recomendo!",
    cities: ['1'], // São Paulo
  },
  {
    id: 2,
    name: "Ana Costa",
    location: "Copacabana, Rio de Janeiro", 
    rating: 5,
    comment: "Melhor custo-benefício da região! A velocidade é exatamente como prometido e nunca tive problemas.",
    cities: ['2'], // Rio de Janeiro
  },
  {
    id: 3,
    name: "Roberto Santos",
    location: "Savassi, Belo Horizonte",
    rating: 5,
    comment: "Migrei de outra operadora e a diferença é notável. Streaming em 4K sem travamentos!",
    cities: ['3'], // Belo Horizonte
  },
  {
    id: 4,
    name: "Juliana Lima",
    location: "Pituba, Salvador",
    rating: 5,
    comment: "Atendimento nota 10! A instalação foi rápida e o técnico muito profissional.",
    cities: ['4'], // Salvador
  },
  {
    id: 5,
    name: "Pedro Martins",
    location: "Aldeota, Fortaleza",
    rating: 5,
    comment: "Finalmente uma internet que funciona de verdade! Trabalho home office e não tenho mais problemas.",
    cities: ['5'], // Fortaleza
  },
  {
    id: 6,
    name: "Marina Souza",
    location: "Asa Sul, Brasília",
    rating: 5,
    comment: "Preço justo e qualidade excepcional. Toda família está satisfeita com o serviço.",
    cities: ['6'], // Brasília
  },
];

// Mock data - Posts do Blog
export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Como escolher a velocidade ideal para sua casa",
    excerpt: "Descubra qual plano de internet é perfeito para suas necessidades e quantas pessoas vivem na sua casa.",
    author: "Equipe CAS Internet",
    date: "2024-12-10",
    image: "/placeholder.svg",
    readTime: "5 min",
    cities: ['1', '2', '3', '4', '5', '6', '7', '8'], // Todas as cidades
  },
  {
    id: 2,
    title: "Fibra ótica vs Internet comum: qual a diferença?",
    excerpt: "Entenda as vantagens da fibra ótica e por que ela é superior às conexões tradicionais.",
    author: "Equipe CAS Internet",
    date: "2024-12-08",
    image: "/placeholder.svg",
    readTime: "7 min",
    cities: ['1', '2', '3', '4'], // Cidades principais
  },
  {
    id: 3,
    title: "Dicas para otimizar sua rede Wi-Fi",
    excerpt: "Aprenda a posicionar seu roteador e configurar sua rede para ter a melhor performance.",
    author: "Equipe CAS Internet",
    date: "2024-12-05",
    image: "/placeholder.svg", 
    readTime: "4 min",
    cities: ['1', '2', '3', '4', '5', '6'], // Cidades com planos Plus
  },
];

// Mock data - Slides do Carrossel
export const mockCarouselSlides: CarouselSlide[] = [
  {
    id: 1,
    title: "Internet Fibra Ótica",
    subtitle: "Ultra velocidade para sua casa",
    description: "Planos a partir de R$ 59,90 com instalação gratuita e sem fidelidade",
    image: "/placeholder.svg",
    ctaText: "Ver Planos",
    ctaLink: "#planos",
    cities: ['1', '2', '3', '4', '5', '6', '7', '8'], // Todas as cidades
  },
  {
    id: 2, 
    title: "Netflix Incluso",
    subtitle: "Entretenimento sem limites",
    description: "Contrate o plano Plus ou Premium e ganhe Netflix por 12 meses",
    image: "/placeholder.svg", 
    ctaText: "Aproveitar Oferta",
    ctaLink: "#planos",
    cities: ['1', '2', '3', '4', '5', '6'], // Cidades com Netflix
  },
  {
    id: 3,
    title: "Suporte 24 horas",
    subtitle: "Estamos sempre aqui",
    description: "Atendimento técnico especializado todos os dias da semana",
    image: "/placeholder.svg",
    ctaText: "Falar Conosco", 
    ctaLink: "#contato",
    cities: ['1', '2', '3', '4', '5', '6', '7', '8'], // Todas as cidades
  },
];

// Funções utilitárias para filtrar por cidade
export function filterByCity<T extends CityFilterable>(items: T[], cityId: string): T[] {
  return items.filter(item => item.cities.includes(cityId));
}

export function getAvailableCitiesForItem<T extends CityFilterable>(item: T, allCities: City[]): City[] {
  return allCities.filter(city => item.cities.includes(city.id));
}