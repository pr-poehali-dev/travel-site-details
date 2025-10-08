import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface Airline {
  name: string;
  url: string;
  tagline: string;
  color: string;
  icon: string;
}

const airlines: Airline[] = [
  {
    name: 'UTair',
    url: 'https://www.utair.ru/',
    tagline: 'Летаем по всей России',
    color: 'from-red-500 via-orange-500 to-yellow-500',
    icon: 'Plane'
  },
  {
    name: 'Yamal Airlines',
    url: 'https://www.yamal.aero/',
    tagline: 'Северные маршруты',
    color: 'from-max-pink via-max-purple to-max-violet',
    icon: 'PlaneTakeoff'
  }
];

export default function AirlineAds() {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % airlines.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const airline = airlines[currentAd];

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-fade-in">
      <a
        href={airline.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="relative">
          {/* Неоновое свечение */}
          <div className={`absolute inset-0 bg-gradient-to-r ${airline.color} opacity-40 blur-2xl animate-pulse group-hover:opacity-60 transition-opacity duration-300`}></div>
          
          {/* Основная карточка */}
          <div className={`relative bg-black border-2 border-transparent bg-gradient-to-r ${airline.color} bg-clip-border rounded-2xl p-6 shadow-2xl transform group-hover:scale-105 transition-all duration-300 w-80`}>
            <div className="bg-black rounded-xl p-4">
              {/* Иконка самолета с анимацией */}
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${airline.color} animate-pulse`}>
                  <Icon name={airline.icon as any} size={32} className="text-white" />
                </div>
                <div className="flex gap-1">
                  {airlines.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        index === currentAd
                          ? `bg-gradient-to-r ${airline.color}`
                          : 'bg-white/20'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Название авиакомпании */}
              <h3 className={`text-3xl font-black mb-2 bg-gradient-to-r ${airline.color} bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]`}>
                {airline.name}
              </h3>

              {/* Слоган */}
              <p className="text-white/80 text-sm mb-4 font-medium">
                {airline.tagline}
              </p>

              {/* Кнопка действия */}
              <div className={`flex items-center gap-2 text-white font-bold bg-gradient-to-r ${airline.color} px-4 py-2 rounded-lg group-hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300`}>
                <span>Забронировать билет</span>
                <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Мигающий индикатор */}
              <div className="flex items-center gap-2 mt-3">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${airline.color} animate-ping`}></div>
                <span className="text-white/60 text-xs uppercase tracking-wider">Спецпредложение</span>
              </div>
            </div>
          </div>

          {/* Кнопка закрытия */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.currentTarget.closest('.fixed')?.remove();
            }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-black border-2 border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-all duration-200 group/close"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
      </a>
    </div>
  );
}