import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const MaxEventBanner = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const eventEnd = new Date();
    eventEnd.setDate(eventEnd.getDate() + 7);
    eventEnd.setHours(23, 59, 59);
    
    const now = new Date();
    const diff = eventEnd.getTime() - now.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-max-pink via-max-violet to-max-purple border-4 border-max-fuchsia/50 rounded-3xl p-6 mb-6 shadow-2xl">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 shadow-lg">
            <Icon name="Sparkles" size={32} className="text-white neon-glow-purple" />
          </div>
          <div>
            <h3 className="text-white font-black text-2xl md:text-3xl neon-text-max mb-1">
              🎉 СОБЫТИЕ MAX × СТРАННИК
            </h3>
            <p className="text-white/90 text-sm md:text-base font-semibold">
              Специальные цены на путешествия • Премиум подписка со скидкой
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border-2 border-white/30">
          <Icon name="Timer" size={24} className="text-yellow-300" />
          <div className="text-center">
            <div className="text-3xl font-black text-white neon-text-pink">
              {timeLeft.days}д {timeLeft.hours}ч {timeLeft.minutes}м
            </div>
            <div className="text-xs text-white/80 font-semibold uppercase tracking-wider">
              До конца события
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-max-pink/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-max-violet/30 rounded-full blur-3xl"></div>
    </div>
  );
};

export default MaxEventBanner;
