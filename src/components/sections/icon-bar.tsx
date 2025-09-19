const icons = [
  {
    name: "WI-FI Grátis",
    icon: "/assets/info/WIFI.svg",
  },
  {
    name: "Suporte Total",
    icon: "/assets/info/SUPORTE.svg",
  },
  {
    name: "Ponto Gamer",
    icon: "/assets/info/GAME.svg",
  },
  {
    name: "WI-FI Plus",
    icon: "/assets/info/WIFI_PLUS.svg",
  },
  {
    name: "WI-FI Premium",
    icon: "/assets/info/WIFI_PREMIUM.svg",
  },
  {
    name: "Ponto Smart",
    icon: "/assets/info/PONTO_SMART.svg",
  },
];
export function IconBar() {
  return (
    <header className="z-50 w-full hidden md:block bg-gradient-to-l from-success/100 to-primary/100">
      <div className="container mx-auto px-4">
        <div className="py-4 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {icons.map((icon, index) => (
            <div
              key={index}
              className="flex flex-col transition-all duration-300 hover:scale-105 items-center justify-between text-white"
            >
              <img src={icon.icon} className="w-12" alt={icon.name} /> {icon.name}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
