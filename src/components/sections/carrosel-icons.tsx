import React, { useState, useEffect } from 'react';

const PartnersCarousel = () => {
  const [position, setPosition] = useState(0);

  // Lista de parceiros com logos (usando placeholders)
  const partners = [
    { id: 1, name: 'Tech Corp', logo: '🚀' },
    { id: 2, name: 'Digital Solutions', logo: '💻' },
    { id: 3, name: 'Innovation Labs', logo: '⚡' },
    { id: 4, name: 'Cloud Systems', logo: '☁️' },
    { id: 5, name: 'Data Analytics', logo: '📊' },
    { id: 6, name: 'AI Partners', logo: '🤖' },
    { id: 7, name: 'Cyber Security', logo: '🔒' },
    { id: 8, name: 'Global Tech', logo: '🌐' }
  ];

  // Duplicar parceiros para loop infinito
  const duplicatedPartners = [...partners, ...partners];

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        const newPos = prev - 1;
        // Reset quando completar um ciclo
        if (Math.abs(newPos) >= (partners.length * 180)) {
          return 0;
        }
        return newPos;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [partners.length]);

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-3">
            Nossos Parceiros
          </h2>
          <p className="text-slate-600 text-lg">
            Empresas que confiam em nossos serviços
          </p>
        </div>

        <div className="relative">
          {/* Gradientes nas bordas */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-100 to-transparent z-10" />

          {/* Container do carrossel */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-8 items-center"
              style={{
                transform: `translateX(${position}px)`,
                willChange: 'transform'
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 w-40 h-32 bg-white rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer"
                >
                  <div className="text-5xl">{partner.logo}</div>
                  <div className="text-sm font-semibold text-slate-700 text-center px-2">
                    {partner.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersCarousel;