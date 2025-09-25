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
    <header className="z-50 w-full bg-gradient-to-l from-success via-primary to-success">
      <div className="container mx-auto px-4">
        <div className="py-4 grid grid-cols-6 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {icons.map((icon, index) => (
            <div
              key={index}
              className="flex flex-col text-xs md:text-lg transition-all duration-300 hover:scale-105 items-center text-center justify-between text-white"
            >
              <img src={icon.icon} className="w-6 md:w-12 text-white" alt={icon.name} /> {icon.name}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
