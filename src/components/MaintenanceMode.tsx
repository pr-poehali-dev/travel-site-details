import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const MAINTENANCE_END_TIME = Date.now() + 24 * 60 * 60 * 1000;

export default function MaintenanceMode() {
  const [timeLeft, setTimeLeft] = useState(MAINTENANCE_END_TIME - Date.now());
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    if (isMaintenanceMode && location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, [isMaintenanceMode, location.pathname, navigate]);

  useEffect(() => {
    if (isMaintenanceMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMaintenanceMode]);

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

  if (!isMaintenanceMode) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTEsMTEzLDEzMywwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
      
      <div className="min-h-screen flex flex-col items-center justify-start py-8 sm:py-12">
      
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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-slate-400 text-sm sm:text-base mb-12">
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

        <div className="mt-16 space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
              Что такое хакерская атака?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Узнайте больше о произошедшем инциденте и мерах, которые мы принимаем для защиты ваших данных
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/50">
                  <Icon name="Bug" size={40} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-red-300 mb-3">DDoS атака</h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                    Хакеры организовали массовую атаку на наши серверы, отправляя тысячи запросов одновременно. 
                    Это привело к временной перегрузке системы и недоступности сервиса.
                  </p>
                  <div className="flex items-center gap-2 text-orange-400 text-sm">
                    <Icon name="AlertCircle" size={16} />
                    <span>Атака началась в 03:24 МСК</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/50">
                  <Icon name="ShieldCheck" size={40} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-orange-300 mb-3">Защита данных</h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                    Все ваши данные в полной безопасности! Мы используем многоуровневое шифрование и резервное копирование. 
                    Атака затронула только доступность сервиса, но не базы данных.
                  </p>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <Icon name="CheckCircle2" size={16} />
                    <span>Данные пользователей защищены</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/50">
                  <Icon name="Users" size={40} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-300 mb-3">Наша команда в действии</h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                    Команда из 15 специалистов по кибербезопасности работает 24/7, чтобы восстановить сервис. 
                    Мы отслеживаем каждую стадию восстановления и усиливаем защиту системы.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-2xl font-bold text-cyan-400">15+</div>
                      <div className="text-xs text-slate-400">специалистов</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-2xl font-bold text-cyan-400">24/7</div>
                      <div className="text-xs text-slate-400">мониторинг</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/50">
                  <Icon name="Zap" size={40} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-purple-300 mb-3">Что мы делаем сейчас</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Icon name="ArrowRight" size={18} className="text-purple-400 flex-shrink-0 mt-1" />
                      <p className="text-slate-300 text-sm sm:text-base">Блокируем вредоносный трафик с помощью AI-фильтров</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="ArrowRight" size={18} className="text-purple-400 flex-shrink-0 mt-1" />
                      <p className="text-slate-300 text-sm sm:text-base">Усиливаем серверную инфраструктуру дополнительными мощностями</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="ArrowRight" size={18} className="text-purple-400 flex-shrink-0 mt-1" />
                      <p className="text-slate-300 text-sm sm:text-base">Проводим полный аудит безопасности всех систем</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="ArrowRight" size={18} className="text-purple-400 flex-shrink-0 mt-1" />
                      <p className="text-slate-300 text-sm sm:text-base">Обновляем все протоколы защиты до новейших стандартов</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm text-center mt-12">
            <Icon name="Heart" size={48} className="text-green-400 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-green-300 mb-3">Спасибо за понимание!</h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Мы ценим ваше терпение и доверие. После восстановления сервиса мы предоставим всем пользователям 
              специальный бонус в знак благодарности. Следите за обновлениями!
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}