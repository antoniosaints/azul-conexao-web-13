import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent } from "@/components/ui/card";
import { useCity } from '@/contexts/CityContext';

// Fix para o ícone padrão do Leaflet
delete (L.Icon.Default.prototype)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export function CoverageMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const { selectedCity, availableCities } = useCity();

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Centro aproximado do Maranhão
    const centerPosition: [number, number] = [-3.9506567657767384, -44.61432162124399];

    // Inicializar o mapa
    map.current = L.map(mapContainer.current, {
      zoomControl: false,
    }).setView(centerPosition, 9);

    // Adicionar tiles do OpenStreetMap
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
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
    availableCities.forEach((city) => {
      if (!map.current) return;

      const marker = L.marker(city.geolocalizacao ? city.geolocalizacao.split(',') : centerPosition, { icon: casIcon }).addTo(map.current);

      // Criar popup personalizado
      const popupContent = `
        <div style="padding: 8px; min-width: 200px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0;">
            <div style="width: 20px; height: 20px; border-radius: 4px; display: flex; align-items: center; justify-center;">
              <img src="/assets/logo.png" alt="Logo" style="width: 20px; height: 20px; border-radius: 4px; margin-left: 4px;">
            </div>
            <span style="font-weight: bold; color: hsl(var(--primary)); font-size: 16px;">CAS Internet</span>
          </div>
          
          <div style="margin-bottom: 8px;">
            <h3 style="font-weight: 600; font-size: 14px; margin: 0 0 4px 0;">${city.cidade}</h3>
          </div>
          
          <div style="margin-bottom: 12px;">
            <p style="font-size: 12px; font-weight: 500; margin: 0 0 8px 0;">📡 Planos disponíveis:</p>
          </div>
          
          <div style="padding-top: 8px; border-top: 1px solid #e2e8f0;">
            <button style="width: 100%; background: hsl(var(--primary)); color: white; font-size: 12px; padding: 8px 12px; border: none; border-radius: 6px; cursor: pointer; transition: opacity 0.2s;" 
                    onmouseover="this.style.opacity='0.9'" 
                    onmouseout="this.style.opacity='1'">
              Ver Planos para ${city.cidade}
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
        <div className="text-center">
          <h2 className="text-4xl text-primary md:text-5xl font-bold mb-4">
            Cobertura da CAS Internet
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nossa cobertura se estende por todo o Estado do Maranhão. Clique nos marcadores para ver os detalhes de cada cidade
          </p>
        </div>

        <Card className="max-w-7xl mx-auto mt-4">
          <CardContent className="p-0">
            <div className="w-full h-[600px] rounded-b-lg overflow-hidden">
              <div 
                ref={mapContainer} 
                className="h-full w-full z-10"
                style={{ borderRadius: '8px' }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}