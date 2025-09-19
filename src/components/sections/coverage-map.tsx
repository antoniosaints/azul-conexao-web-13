import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Wifi, Signal } from "lucide-react";

// Fix para o ícone padrão do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const cities = [
  {
    name: "São Mateus do Maranhão",
    coordinates: [-4.0322232706298, -44.46985003602947] as [number, number],
    population: "15.000",
    plans: ["100MB", "200MB", "500MB"]
  },
  {
    name: "São Luis Gonzaga",
    coordinates: [-4.3779435442874615, -44.6705205819622] as [number, number],
    population: "18.000",
    plans: ["100MB", "200MB", "500MB", "1GB"]
  },
  {
    name: "Cantanhede",
    coordinates: [-3.635930954743144, -44.38027176945364] as [number, number],
    population: "20.000",
    plans: ["100MB", "200MB", "500MB", "1GB"]
  },
  {
    name: "Miranda",
    coordinates: [-3.563637481379419, -44.5864563044567] as [number, number],
    population: "8.500",
    plans: ["100MB", "200MB"]
  },
  {
    name: "Matões do Norte",
    coordinates: [-3.6319673940162565, -44.55770210882281] as [number, number],
    population: "12.000",
    plans: ["100MB", "200MB", "500MB"]
  },
  {
    name: "Pirapemas",
    coordinates: [-3.725739016411464, -44.227709394853946] as [number, number],
    population: "14.000",
    plans: ["100MB", "200MB", "500MB"]
  },
  {
    name: "Coroata",
    coordinates: [-4.128798012061277, -44.1298739299053] as [number, number],
    population: "65.000",
    plans: ["100MB", "200MB", "500MB", "1GB", "2GB"]
  },
  {
    name: "Peritoró",
    coordinates: [-4.373141955392519, -44.339285848196056] as [number, number],
    population: "16.000",
    plans: ["100MB", "200MB", "500MB"]
  },
  {
    name: "Alto Alegre",
    coordinates: [-4.212277790131448, -44.45421701016184] as [number, number],
    population: "25.000",
    plans: ["100MB", "200MB", "500MB", "1GB"]
  },
  {
    name: "Bacabal",
    coordinates: [-4.226223997432526, -44.78503776027442] as [number, number],
    population: "105.000",
    plans: ["100MB", "200MB", "500MB", "1GB", "2GB"]
  },
  {
    name: "Arari",
    coordinates: [-3.4558816556280654, -44.77572133456607] as [number, number],
    population: "35.000",
    plans: ["100MB", "200MB", "500MB", "1GB"]
  },
];

export function CoverageMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Centro aproximado do Maranhão
    const centerPosition: [number, number] = [-3.9506567657767384, -44.61432162124399];

    // Inicializar o mapa
    map.current = L.map(mapContainer.current).setView(centerPosition, 9);

    // Adicionar tiles do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.current);

    // Ícone personalizado da CAS
    const casIcon = L.icon({
      iconUrl: '/assets/logo.png',
      iconRetinaUrl: '/assets/logo.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
      className: 'cas-marker'
    });

    // Adicionar marcadores para cada cidade
    cities.forEach((city) => {
      if (!map.current) return;

      const marker = L.marker(city.coordinates, { icon: casIcon }).addTo(map.current);

      // Criar popup personalizado
      const popupContent = `
        <div style="padding: 8px; min-width: 200px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0;">
            <div style="width: 20px; height: 20px; background: hsl(var(--primary)); border-radius: 4px; display: flex; align-items: center; justify-center;">
              <span style="color: white; font-size: 12px; font-weight: bold;">📶</span>
            </div>
            <span style="font-weight: bold; color: hsl(var(--primary)); font-size: 16px;">CAS Internet</span>
          </div>
          
          <div style="margin-bottom: 8px;">
            <h3 style="font-weight: 600; font-size: 14px; margin: 0 0 4px 0;">${city.name}</h3>
            <p style="font-size: 12px; color: #64748b; margin: 0;">População: ~${city.population} habitantes</p>
          </div>
          
          <div style="margin-bottom: 12px;">
            <p style="font-size: 12px; font-weight: 500; margin: 0 0 8px 0;">📡 Planos disponíveis:</p>
            <div style="display: flex; flex-wrap: wrap; gap: 4px;">
              ${city.plans.map(plan => `
                <span style="padding: 2px 8px; background: hsl(var(--primary) / 0.1); color: hsl(var(--primary)); font-size: 10px; border-radius: 12px; border: 1px solid hsl(var(--primary) / 0.2);">
                  ${plan}
                </span>
              `).join('')}
            </div>
          </div>
          
          <div style="padding-top: 8px; border-top: 1px solid #e2e8f0;">
            <button style="width: 100%; background: hsl(var(--primary)); color: white; font-size: 12px; padding: 8px 12px; border: none; border-radius: 6px; cursor: pointer; transition: opacity 0.2s;" 
                    onmouseover="this.style.opacity='0.9'" 
                    onmouseout="this.style.opacity='1'">
              Ver Planos para ${city.name.split(' ')[0]}
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        minWidth: 200,
        maxWidth: 300,
        className: 'custom-popup'
      });
    });

    // Adicionar estilos CSS personalizados
    const style = document.createElement('style');
    style.textContent = `
      .cas-marker {
        border-radius: 50% !important;
        border: 3px solid white !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
        transition: transform 0.2s ease !important;
      }
      .cas-marker:hover {
        transform: scale(1.1) !important;
        z-index: 1000 !important;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 8px !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
      }
      .leaflet-popup-content {
        margin: 12px 16px !important;
        font-family: inherit !important;
      }
      .custom-popup .leaflet-popup-close-button {
        color: #64748b !important;
        font-size: 16px !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-primary md:text-5xl font-bold mb-4">
            Cobertura da CAS Internet
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nossa cobertura se estende por todo o Estado do Maranhão. Clique nos marcadores para ver os detalhes de cada cidade
          </p>
        </div>

        <Card className="max-w-7xl mx-auto shadow-xl mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Mapa Interativo - Maranhão
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-[600px] rounded-b-lg overflow-hidden">
              <div 
                ref={mapContainer} 
                className="h-full w-full z-10"
                style={{ borderRadius: '0 0 8px 8px' }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Lista de Cidades */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Todas as Cidades Atendidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {cities.map((city) => (
              <Card key={city.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{city.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">População: ~{city.population}</p>
                      <div className="flex flex-wrap gap-1">
                        {city.plans.slice(0, 3).map((plan) => (
                          <span 
                            key={plan} 
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {plan}
                          </span>
                        ))}
                        {city.plans.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{city.plans.length - 3} planos</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex justify-center mb-3">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">{cities.length}</div>
            <div className="text-sm text-muted-foreground">Cidades Atendidas</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-success/10 to-success/5">
            <div className="flex justify-center mb-3">
              <Signal className="w-8 h-8 text-success" />
            </div>
            <div className="text-2xl font-bold text-success mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Fibra Ótica</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
            <div className="flex justify-center mb-3">
              <Wifi className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-500 mb-1">24/7</div>
            <div className="text-sm text-muted-foreground">Suporte Online</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5">
            <div className="flex justify-center mb-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">MA</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-purple-500 mb-1">11</div>
            <div className="text-sm text-muted-foreground">Municípios</div>
          </Card>
        </div>
      </div>
    </section>
  );
}