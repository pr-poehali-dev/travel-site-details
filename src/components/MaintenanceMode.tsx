import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  const totalTime = 24 * 60 * 60 * 1000;
  const progress = Math.max(0, Math.min(100, ((totalTime - timeLeft) / totalTime) * 100));

  const securityMeasures = [
    { icon: 'Shield', text: 'Усилена защита от DDoS-атак', completed: true },
    { icon: 'Lock', text: 'Обновлены SSL-сертификаты', completed: true },
    { icon: 'Database', text: 'Восстановление базы данных', completed: progress > 30 },
    { icon: 'Server', text: 'Проверка серверов на уязвимости', completed: progress > 50 },
    { icon: 'Key', text: 'Смена всех ключей доступа', completed: progress > 70 },
    { icon: 'CheckCircle2', text: 'Тестирование системы безопасности', completed: progress > 85 },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTEsMTEzLDEzMywwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      <Link 
        to="/" 
        className="absolute top-6 sm:top-8 left-4 sm:left-8 inline-flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-slate-900/60 border-2 border-red-500/30 text-red-200 rounded-xl sm:rounded-2xl hover:border-red-400/60 hover:bg-slate-900/80 transition-all duration-300 group backdrop-blur-md z-10"
      >
        <Icon name="ArrowLeft" size={18} className="group-hover:-translate-x-1 transition-transform sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Назад на главную</span>
      </Link>
      
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center overflow-y-auto max-h-screen py-8">
        <div className="inline-block mb-8 sm:mb-12">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-red-500 via-orange-600 to-red-600 flex items-center justify-center shadow-2xl shadow-red-500/50 relative">
            <Icon name="ShieldAlert" size={60} className="text-white sm:w-20 sm:h-20" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-orange-600 to-red-600 animate-ping opacity-20"></div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4 sm:mb-6">
          Технические работы
        </h1>

        <div className="bg-red-500/10 border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 backdrop-blur-sm">
          <div className="flex items-start gap-3 sm:gap-4 text-left">
            <Icon name="AlertTriangle" size={20} className="text-red-400 flex-shrink-0 mt-1 sm:w-6 sm:h-6" />
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-red-300 mb-2">Хакерская атака</h3>
              <p className="text-sm sm:text-base text-slate-300">
                Технические работы ведутся из-за хакерской атаки. 
                Приносим извинения за доставленные неудобства. 
                Наша команда работает над восстановлением безопасности системы.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <Icon name="Clock" size={20} className="text-orange-400 sm:w-6 sm:h-6" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Время до восстановления</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-500/20">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-400 mb-1 sm:mb-2">
                {String(hours).padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm text-slate-400">часов</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-orange-500/20">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 mb-1 sm:mb-2">
                {String(minutes).padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm text-slate-400">минут</div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500/20 to-red-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-500/20">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-1 sm:mb-2">
                {String(seconds).padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm text-slate-400">секунд</div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Icon name="Activity" size={18} className="text-green-400 sm:w-5 sm:h-5" />
              <h3 className="text-sm sm:text-base font-semibold text-white">Прогресс восстановления</h3>
            </div>
            <span className="text-lg sm:text-xl font-bold text-green-400">{Math.round(progress)}%</span>
          </div>
          
          <div className="relative h-3 sm:h-4 bg-slate-800 rounded-full overflow-hidden mb-4 sm:mb-6">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h4 className="text-xs sm:text-sm font-semibold text-slate-300 mb-2 sm:mb-3 flex items-center gap-2">
              <Icon name="CheckCircle" size={16} className="text-green-400" />
              Принятые меры безопасности:
            </h4>
            {securityMeasures.map((measure, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-2 sm:gap-3 text-xs sm:text-sm transition-all duration-300 ${
                  measure.completed ? 'text-green-400' : 'text-slate-500'
                }`}
              >
                <Icon 
                  name={measure.completed ? 'CheckCircle2' : 'Circle'} 
                  size={14} 
                  className={`flex-shrink-0 sm:w-4 sm:h-4 ${
                    measure.completed ? 'text-green-400' : 'text-slate-600'
                  }`} 
                />
                <span className={measure.completed ? 'font-medium' : ''}>{measure.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-slate-400 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <Icon name="Mail" size={16} className="sm:w-5 sm:h-5" />
            <span>security@strannik.ru</span>
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