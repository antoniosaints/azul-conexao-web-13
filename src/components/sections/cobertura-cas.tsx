import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Corrige o ícone padrão do Leaflet no Next/Vite
const markerIcon = new L.Icon({
  iconUrl: "/assets/logo.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconSize: [25, 25],
  iconAnchor: [12, 41],
});

const cidades = [
  {
    cidade: "São Mateus do Maranhão",
    coordenadas: [-4.0322232706298, -44.46985003602947],
  },
  {
    cidade: "São Luis Gonzaga",
    coordenadas: [-4.3779435442874615, -44.6705205819622],
  },
  {
    cidade: "Cantanhede",
    coordenadas: [-3.635930954743144, -44.38027176945364],
  },
  {
    cidade: "Miranda",
    coordenadas: [-3.563637481379419, -44.5864563044567],
  },
  {
    cidade: "Matões do Norte",
    coordenadas: [-3.6319673940162565, -44.55770210882281],
  },
  {
    cidade: "Pirapemas",
    coordenadas: [-3.725739016411464, -44.227709394853946],
  },
  {
    cidade: "Coroata",
    coordenadas: [-4.128798012061277, -44.1298739299053],
  },
  {
    cidade: "Peritoró",
    coordenadas: [-4.373141955392519, -44.339285848196056],
  },
  {
    cidade: "Alto Alegre",
    coordenadas: [-4.212277790131448, -44.45421701016184],
  },
  {
    cidade: "Bacabal",
    coordenadas: [-4.226223997432526, -44.78503776027442],
  },
  {
    cidade: "Arari",
    coordenadas: [-3.4558816556280654, -44.77572133456607],
  },
];

export function CoverageSection() {
  // Coordenadas aproximadas do Maranhão (São Luís)
  const maranhaoCoords: [number, number] = [
    -3.9506567657767384, -44.61432162124399,
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-primary md:text-5xl font-bold mb-4">
            Cobertura da CAS
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nossa cobertura se estende ao Estado do Maranhão, veja o mapa abaixo
          </p>
        </div>

        <Card className="max-w-6xl mx-auto shadow-card">
          <CardContent className="p-0">
            <div className="w-full h-[500px] rounded-lg overflow-hidden">
              <MapContainer
                center={maranhaoCoords}
                zoom={9}
                scrollWheelZoom={false}
                className="h-full w-full z-10"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {cidades.map((cidade) => (
                  <Marker
                    key={cidade.cidade}
                    position={cidade.coordenadas}
                    icon={markerIcon}
                  >
                    <Popup>
                      CAS Internet <br /> {cidade.cidade}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
