import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const MAINTENANCE_END_TIME = Date.now() + 24 * 60 * 60 * 1000;

export default function MaintenanceMode() {
  const [timeLeft, setTimeLeft] = useState(MAINTENANCE_END_TIME - Date.now());
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(true);

  useEffect(() => {
    const savedEndTime = localStorage.getItem('maintenanceEndTime');
    
    if (!savedEndTime) {
      localStorage.setItem('maintenanceEndTime', MAINTENANCE_END_TIME.toString());
    } else {
      const endTime = parseInt(savedEndTime);
      if (Date.now() >= endTime) {
        setIsMaintenanceMode(false);
        return;
      }
    }

    const timer = setInterval(() => {
      const savedTime = localStorage.getItem('maintenanceEndTime');
      if (savedTime) {
        const remaining = parseInt(savedTime) - Date.now();
        
        if (remaining <= 0) {
          setIsMaintenanceMode(false);
          clearInterval(timer);
        } else {
          setTimeLeft(remaining);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMaintenanceMode) {
    return null;
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]" />
      
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="mb-8 sm:mb-12 animate-pulse">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <Icon name="Settings" size={40} className="text-white sm:w-12 sm:h-12 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6">
          Технические работы
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 sm:mb-12 max-w-xl mx-auto px-4">
          Мы проводим плановое обновление системы. 
          Сайт скоро вернётся в работу с новыми возможностями!
        </p>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Clock" size={20} className="text-blue-400 sm:w-6 sm:h-6" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Время до запуска</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-1 sm:mb-2">
                {String(hours).padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm text-slate-400">часов</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-400 mb-1 sm:mb-2">
                {String(minutes).padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm text-slate-400">минут</div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400 mb-1 sm:mb-2">
                {String(seconds).padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm text-slate-400">секунд</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-slate-400 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <Icon name="Mail" size={16} className="sm:w-5 sm:h-5" />
            <span>support@strannik.ru</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full" />
          <div className="flex items-center gap-2">
            <Icon name="Phone" size={16} className="sm:w-5 sm:h-5" />
            <span>8 (800) 555-35-35</span>
          </div>
        </div>
      </div>
    </div>
  );
}
