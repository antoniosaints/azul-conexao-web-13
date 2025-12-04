const icons = [
  {
    name: "CAS UP",
    icon: "/assets/info/CAS_UP.svg",
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
    name: "WIFI 6",
    icon: "/assets/info/WI-FI_6.svg",
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
    name: "Super Upload",
    icon: "/assets/info/SUPER_UPLOAD.svg",
  },
];
export function IconBar() {
  return (
    <header className="z-50 w-full bg-gradient-to-l from-success via-primary to-success">
      <div className="container mx-auto px-4">
        <div className="py-4 grid grid-cols-7 md:grid-cols-3 lg:grid-cols-7 gap-2">
          {icons.map((icon, index) => (
            <div
              key={index}
              className="flex flex-col text-[6px] md:text-sm transition-all duration-300 hover:scale-105 items-center text-center justify-between text-white"
            >
              <img src={icon.icon} className="w-8 md:w-16 p-1 md:p-2 text-white" alt={icon.name} /> 
              {icon.name}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
