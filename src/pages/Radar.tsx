import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import EnergySystem from '@/components/EnergySystem';
import MaxMessenger from '@/components/MaxMessenger';

export default function Radar() {
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [userEnergy, setUserEnergy] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Check subscription status
    const expiryDate = localStorage.getItem('radar_subscription_expiry');
    if (expiryDate) {
      const expiry = new Date(expiryDate);
      const now = new Date();
      if (expiry > now) {
        setIsSubscribed(true);
      } else {
        // Subscription expired
        localStorage.removeItem('radar_subscription_expiry');
        setIsSubscribed(false);
      }
    }

    // Load user energy
    const energy = parseInt(localStorage.getItem('user_energy') || '0', 10);
    setUserEnergy(energy);
  }, []);

  const handleEnergySubscribe = () => {
    const currentEnergy = parseInt(localStorage.getItem('user_energy') || '0', 10);
    
    if (currentEnergy < 100) {
      toast({
        title: "Недостаточно энергии",
        description: "Вам нужно 100 энергии для подписки",
        variant: "destructive"
      });
      return;
    }

    // Deduct 100 energy
    const newEnergy = currentEnergy - 100;
    localStorage.setItem('user_energy', newEnergy.toString());
    setUserEnergy(newEnergy);

    // Set subscription for 7 days
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    localStorage.setItem('radar_subscription_expiry', expiryDate.toISOString());
    
    setIsSubscribed(true);
    setShowSubscriptionDialog(false);
    
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#a855f7', '#8b5cf6', '#d946ef', '#c026d3']
    });
    
    toast({
      title: "Подписка активирована! 🎉",
      description: "Добро пожаловать в Радар Странника на 7 дней!",
    });
  };

  if (isSubscribed) {
    return (
      <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
        <EnergySystem />
        <MaxMessenger />
        <div className="absolute top-4 right-4 z-[1001] flex items-center gap-3">
          <Button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/95 border-2 border-max-purple/30 text-max-pink rounded-xl hover:border-max-pink/60 hover:bg-slate-900 transition-all duration-300 backdrop-blur-md shadow-lg shadow-max-pink/20"
          >
            <Icon name={isDarkTheme ? "Sun" : "Moon"} size={18} />
            <span>{isDarkTheme ? "Светлая" : "Тёмная"}</span>
          </Button>
          
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/95 border-2 border-max-pink/30 text-max-pink rounded-xl hover:border-max-pink/60 hover:bg-slate-900 transition-all duration-300 backdrop-blur-md shadow-lg shadow-max-pink/20"
          >
            <Icon name="Home" size={18} />
            <span>На главную</span>
          </Link>
        </div>
        
        <div className="w-full h-full">
          <iframe
            src="https://www.flightradar24.com/simple"
            className="w-full h-full border-0"
            title="Flight Radar"
            allow="geolocation"
          />
        </div>

        <style>{`
          iframe {
            margin-top: -60px !important;
            height: calc(100% + 60px) !important;
            margin-left: -300px !important;
            width: calc(100% + 300px) !important;
            ${isDarkTheme ? `
              filter: invert(0.92) hue-rotate(180deg) brightness(0.9) contrast(1.1);
            ` : ''}
          }
          ${isDarkTheme ? `
            iframe img {
              filter: invert(1) hue-rotate(180deg);
            }
          ` : ''}
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-max-violet to-slate-950 relative overflow-hidden">
      <EnergySystem />
      <MaxMessenger />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMzYsMTI1LDI0OSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute text-max-pink/20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${15 + i * 3}s`,
          }}
        >
          <Icon name="Plane" size={40 + i * 10} className="rotate-45" />
        </div>
      ))}

      <Link 
        to="/" 
        className="absolute top-8 left-4 sm:left-8 inline-flex items-center gap-3 px-6 py-3 bg-slate-900/60 border-2 border-max-purple/30 text-max-pink rounded-2xl hover:border-max-pink/60 hover:bg-slate-900/80 transition-all duration-300 group backdrop-blur-md z-10 shadow-lg shadow-max-pink/10"
      >
        <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Назад на главную</span>
      </Link>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-block mb-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-r from-max-pink via-max-purple to-max-violet flex items-center justify-center shadow-2xl shadow-max-pink/50 relative">
              <Icon name="Radar" size={80} className="text-white animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-max-pink via-max-purple to-max-violet animate-ping opacity-20"></div>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black mb-6 bg-gradient-to-r from-max-pink via-max-purple to-max-violet bg-clip-text text-transparent leading-tight">
            Радар Странника
          </h1>

          <p className="text-xl sm:text-2xl text-max-pink/80 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
            Отслеживайте все самолёты в небе в реальном времени. Смотрите маршруты, высоту, скорость и информацию о каждом рейсе
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 rounded-full">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-green-300 font-semibold">Функция работает</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-max-pink/10 to-max-purple/10 border-2 border-max-pink/30 rounded-3xl p-8 backdrop-blur-sm hover:border-max-pink/50 transition-all shadow-lg shadow-max-pink/10">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-max-pink/20 flex items-center justify-center">
              <Icon name="MapPin" size={32} className="text-max-pink" />
            </div>
            <h3 className="text-max-pink font-bold text-xl mb-3 text-center">Отслеживание в реальном времени</h3>
            <p className="text-max-purple/70 text-center">Следите за любым рейсом в небе: актуальная позиция обновляется каждые 2 секунды</p>
          </div>

          <div className="bg-gradient-to-br from-max-purple/10 to-max-violet/10 border-2 border-max-purple/30 rounded-3xl p-8 backdrop-blur-sm hover:border-max-purple/50 transition-all shadow-lg shadow-max-purple/10">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-max-purple/20 flex items-center justify-center">
              <Icon name="Info" size={32} className="text-max-purple" />
            </div>
            <h3 className="text-max-purple font-bold text-xl mb-3 text-center">Детальная информация</h3>
            <p className="text-max-purple/70 text-center">Высота, скорость, курс, модель самолёта, аэропорты вылета и прилёта — всё в одном месте</p>
          </div>

          <div className="bg-gradient-to-br from-max-violet/10 to-max-pink/10 border-2 border-max-violet/30 rounded-3xl p-8 backdrop-blur-sm hover:border-max-violet/50 transition-all shadow-lg shadow-max-violet/10">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-max-violet/20 flex items-center justify-center">
              <Icon name="Globe" size={32} className="text-max-violet" />
            </div>
            <h3 className="text-max-violet font-bold text-xl mb-3 text-center">Интерактивная карта</h3>
            <p className="text-max-purple/70 text-center">Тёмная карта мира с возможностью приближения и просмотра любого участка неба</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 border-2 border-max-pink/30 rounded-3xl p-10 backdrop-blur-md shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-max-pink/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-max-purple/10 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl mb-4">
                <Icon name="Lock" size={40} className="text-yellow-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Доступно по подписке</h2>
              <p className="text-max-pink/80 text-lg max-w-2xl mx-auto">
                Радар Странника + Новости РБК — всё в одной подписке. Получите доступ к полётам в реальном времени и свежим новостям каждый день
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-slate-900/60 border border-max-pink/20 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-max-pink/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={20} className="text-max-pink" />
                </div>
                <span className="text-max-pink">Радар самолётов в реальном времени</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/60 border border-max-pink/20 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-max-pink/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={20} className="text-max-pink" />
                </div>
                <span className="text-max-pink">Свежие новости РБК каждый день</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/60 border border-max-pink/20 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-max-pink/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={20} className="text-max-pink" />
                </div>
                <span className="text-max-pink">Интерактивная карта мира</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/60 border border-max-pink/20 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-max-pink/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={20} className="text-max-pink" />
                </div>
                <span className="text-max-pink">Маршруты рейсов и детали полётов</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-max-pink/20 to-max-purple/20 border-2 border-max-pink/40 rounded-2xl p-6 mb-6 shadow-lg shadow-max-pink/20">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-max-pink/70 text-sm mb-1">Премиум подписка</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-yellow-400">⚡ 100</span>
                    <span className="text-max-pink/70">энергии</span>
                  </div>
                  <div className="text-max-pink/60 text-xs mt-1">на 7 дней</div>
                </div>
                <Button
                  onClick={() => setShowSubscriptionDialog(true)}
                  size="lg"
                  className="bg-gradient-to-r from-max-pink to-max-purple hover:from-max-purple hover:to-max-pink text-white border-0 rounded-2xl shadow-lg shadow-max-pink/50 text-lg font-semibold px-8 h-14"
                >
                  <Icon name="Zap" size={20} className="mr-2" />
                  Оформить подписку
                </Button>
              </div>
            </div>

            <p className="text-center text-max-purple/60 text-sm">
              Энергия спишется автоматически при подписке
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-max-purple/60">
            <div className="w-2 h-2 rounded-full bg-max-pink animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-max-purple animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-max-violet animate-pulse delay-150"></div>
          </div>
        </div>
      </div>

      <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
        <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-max-pink/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent">
              Оформление подписки
            </DialogTitle>
            <DialogDescription className="text-max-pink/80 text-center">
              Подпишитесь на премиум доступ используя энергию
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-6">
            <div className="bg-slate-800/60 border border-max-pink/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-max-pink">Ваша энергия</span>
                <span className="text-yellow-400 font-bold flex items-center gap-1">
                  ⚡ {userEnergy}
                </span>
              </div>
              <div className="text-max-purple/60 text-sm">Текущий баланс</div>
            </div>

            <div className="bg-slate-800/60 border border-max-pink/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-max-pink">Премиум подписка</span>
                <span className="text-yellow-400 font-bold flex items-center gap-1">⚡ 100 энергии</span>
              </div>
              <div className="text-max-purple/60 text-sm">на 7 дней</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-max-pink/70">
                <Icon name="Check" size={16} className="text-max-pink" />
                <span>Радар самолётов онлайн</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-max-pink/70">
                <Icon name="Check" size={16} className="text-max-pink" />
                <span>Новости РБК каждый день</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-max-pink/70">
                <Icon name="Check" size={16} className="text-max-pink" />
                <span>Все функции в одной подписке</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setShowSubscriptionDialog(false)}
              variant="outline"
              className="flex-1 border-max-purple/30 text-max-pink hover:bg-max-purple/10"
            >
              Отмена
            </Button>
            <Button
              onClick={handleEnergySubscribe}
              className="flex-1 bg-gradient-to-r from-max-pink to-max-purple hover:from-max-purple hover:to-max-pink text-white border-0 shadow-lg shadow-max-pink/50"
            >
              <Icon name="Zap" size={18} className="mr-2" />
              Подписаться
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="relative bg-black/40 backdrop-blur-md border-t-2 border-max-pink/30 py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-max-pink/60 text-sm mb-4">
            Откройте мир через интерактивные путешествия • 2024
          </p>
          <div className="flex flex-col items-center gap-3">
            <p className="text-white/70 text-xs">Мы в соцсетях</p>
            <div className="flex gap-3">
              <Button
                onClick={() => window.open('https://t.me/Strannik_com', '_blank')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 px-4 py-1.5 text-sm flex items-center gap-2"
              >
                <Icon name="Send" size={16} />
                Telegram
              </Button>
              <Button
                onClick={() => window.open('https://max.ru/join/XXufWuRT_4_-U687UWq2zVs905JbNy7FjvfipRLO9ao', '_blank')}
                className="bg-gradient-to-r from-max-pink to-max-purple hover:from-max-purple hover:to-max-pink text-white border-0 px-4 py-1.5 text-sm flex items-center gap-2 shadow-lg shadow-max-pink/50"
              >
                <Icon name="Tv" size={16} />
                MAX
              </Button>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 0.2;
          }
          25% {
            opacity: 0.4;
          }
          50% {
            transform: translate(100px, -50px) rotate(45deg);
            opacity: 0.3;
          }
          75% {
            opacity: 0.2;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}