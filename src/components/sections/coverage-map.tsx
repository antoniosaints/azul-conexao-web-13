import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Settings } from "lucide-react";

const cities = [
  {
    name: "São Mateus do Maranhão",
    coordinates: [-44.46985003602947, -4.0322232706298] as [number, number],
  },
  {
    name: "São Luis Gonzaga",
    coordinates: [-44.6705205819622, -4.3779435442874615] as [number, number],
  },
  {
    name: "Cantanhede",
    coordinates: [-44.38027176945364, -3.635930954743144] as [number, number],
  },
  {
    name: "Miranda",
    coordinates: [-44.5864563044567, -3.563637481379419] as [number, number],
  },
  {
    name: "Matões do Norte",
    coordinates: [-44.55770210882281, -3.6319673940162565] as [number, number],
  },
  {
    name: "Pirapemas",
    coordinates: [-44.227709394853946, -3.725739016411464] as [number, number],
  },
  {
    name: "Coroata",
    coordinates: [-44.1298739299053, -4.128798012061277] as [number, number],
  },
  {
    name: "Peritoró",
    coordinates: [-44.339285848196056, -4.373141955392519] as [number, number],
  },
  {
    name: "Alto Alegre",
    coordinates: [-44.45421701016184, -4.212277790131448] as [number, number],
  },
  {
    name: "Bacabal",
    coordinates: [-44.78503776027442, -4.226223997432526] as [number, number],
  },
  {
    name: "Arari",
    coordinates: [-44.77572133456607, -3.4558816556280654] as [number, number],
  },
];

export function CoverageMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-44.61432162124399, -3.9506567657767384], // Maranhão center
        zoom: 8,
        pitch: 0,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      map.current.on('load', () => {
        setMapLoaded(true);
        
        // Add markers for each city
        cities.forEach(city => {
          if (!map.current) return;
          
          // Create custom marker element
          const el = document.createElement('div');
          el.className = 'custom-marker';
          el.style.backgroundColor = 'hsl(var(--primary))';
          el.style.width = '20px';
          el.style.height = '20px';
          el.style.borderRadius = '50%';
          el.style.border = '3px solid white';
          el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
          el.style.cursor = 'pointer';

          // Create popup
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div class="p-2">
              <div class="font-semibold text-sm">CAS Internet</div>
              <div class="text-xs text-muted-foreground">${city.name}</div>
            </div>`
          );

          // Add marker to map
          new mapboxgl.Marker(el)
            .setLngLat(city.coordinates)
            .setPopup(popup)
            .addTo(map.current!);
        });
      });

      setShowTokenInput(false);
    } catch (error) {
      console.error('Erro ao inicializar o mapa:', error);
      alert('Token inválido. Verifique seu token do Mapbox.');
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
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
            Nossa cobertura se estende por todo o Estado do Maranhão. Confira as cidades atendidas no mapa interativo
          </p>
        </div>

        <Card className="max-w-6xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Mapa de Cobertura
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {showTokenInput && (
              <div className="p-6 bg-muted/30">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Settings className="w-4 h-4" />
                    <span>Configure seu token do Mapbox para visualizar o mapa</span>
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Cole seu token público do Mapbox aqui"
                      value={mapboxToken}
                      onChange={(e) => setMapboxToken(e.target.value)}
                      className="text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Obtenha seu token em{' '}
                      <a 
                        href="https://mapbox.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        mapbox.com
                      </a>
                      {' '}na seção Tokens
                    </p>
                  </div>
                  <Button 
                    onClick={initializeMap}
                    disabled={!mapboxToken}
                    className="w-full"
                  >
                    Carregar Mapa
                  </Button>
                </div>
              </div>
            )}
            
            {!showTokenInput && (
              <div className="w-full h-[500px] rounded-b-lg overflow-hidden">
                <div ref={mapContainer} className="w-full h-full" />
              </div>
            )}
            
            {showTokenInput && (
              <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-b-lg">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Configure o token do Mapbox para visualizar o mapa interativo</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cities Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {cities.map((city) => (
            <div key={city.name} className="flex items-center gap-2 p-3 bg-card rounded-lg border">
              <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
              <span className="text-sm font-medium">{city.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}