import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

export default function Radar() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);

    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() + 1);

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    const savedCount = localStorage.getItem('radar_subscribers_count');
    if (savedCount) {
      const count = parseInt(savedCount, 10);
      setSubscribersCount(count);
      setDisplayCount(count);
    } else {
      const initialCount = 1247 + Math.floor(Math.random() * 50);
      setSubscribersCount(initialCount);
      setDisplayCount(initialCount);
      localStorage.setItem('radar_subscribers_count', initialCount.toString());
    }

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (displayCount < subscribersCount) {
      setIsAnimating(true);
      const duration = 800;
      const steps = 30;
      const increment = (subscribersCount - displayCount) / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const animationInterval = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setDisplayCount(subscribersCount);
          setIsAnimating(false);
          clearInterval(animationInterval);
        } else {
          setDisplayCount(prev => Math.min(prev + increment, subscribersCount));
        }
      }, stepDuration);

      return () => clearInterval(animationInterval);
    }
  }, [subscribersCount, displayCount]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный email",
        variant: "destructive"
      });
      return;
    }

    setIsSubscribing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCount = subscribersCount + 1;
      setSubscribersCount(newCount);
      localStorage.setItem('radar_subscribers_count', newCount.toString());
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981']
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#3b82f6', '#8b5cf6', '#ec4899']
        });
      }, 200);
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#06b6d4', '#10b981', '#fbbf24']
        });
      }, 400);
      
      toast({
        title: "Вы подписаны! 🎉",
        description: "Мы уведомим вас, когда запустим новую функцию!",
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Что-то пошло не так. Попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMTYsMTgwLDI1NCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      <Link 
        to="/" 
        className="absolute top-8 left-4 sm:left-8 inline-flex items-center gap-3 px-6 py-3 bg-slate-900/60 border-2 border-purple-500/30 text-purple-200 rounded-2xl hover:border-cyan-400/60 hover:bg-slate-900/80 transition-all duration-300 group backdrop-blur-md z-10"
      >
        <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Назад на главную</span>
      </Link>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
        <div className="inline-block mb-8 animate-bounce">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/50 relative">
            <Icon name="Plane" size={80} className="text-white" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 animate-ping opacity-20"></div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-full mb-6">
            <span className="text-yellow-300 font-semibold text-lg flex items-center gap-2">
              <Icon name="Lock" size={20} />
              СКОРО
            </span>
          </div>
        </div>

        <h1 className="text-6xl sm:text-8xl font-black mb-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
          Интрига<br/>скоро раскроется
        </h1>

        <p className="text-xl sm:text-3xl text-purple-200/80 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
          Мы готовим что-то особенное для вас...
        </p>

        <div className="mb-12 bg-gradient-to-r from-slate-900/60 to-slate-800/60 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
          <div className="mb-6">
            <Icon name="Timer" size={32} className="text-cyan-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-cyan-300 mb-2">До запуска осталось:</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-6">
              <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 tabular-nums">
                {timeLeft.days}
              </div>
              <div className="text-purple-300/80 text-sm font-semibold uppercase tracking-wider">Дней</div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-6">
              <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 tabular-nums">
                {timeLeft.hours}
              </div>
              <div className="text-purple-300/80 text-sm font-semibold uppercase tracking-wider">Часов</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
              <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 tabular-nums">
                {timeLeft.minutes}
              </div>
              <div className="text-purple-300/80 text-sm font-semibold uppercase tracking-wider">Минут</div>
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-2xl p-6">
              <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 tabular-nums">
                {timeLeft.seconds}
              </div>
              <div className="text-purple-300/80 text-sm font-semibold uppercase tracking-wider">Секунд</div>
            </div>
          </div>
        </div>

        <div className="mb-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 border-2 border-cyan-500/30 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl mb-4">
                <Icon name="Bell" size={32} className="text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Узнайте первыми о запуске!</h3>
              <p className="text-purple-200/70">Введите email и мы пришлём уведомление</p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="ваш@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pl-14 pr-4 text-lg bg-slate-900/60 border-2 border-purple-500/30 text-white placeholder:text-purple-300/50 focus:border-cyan-400/60 rounded-2xl"
                  disabled={isSubscribing}
                />
                <Icon 
                  name="Mail" 
                  size={24} 
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubscribing}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-2xl shadow-lg shadow-cyan-500/25"
              >
                {isSubscribing ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Подписываем...
                  </>
                ) : (
                  <>
                    <Icon name="BellRing" size={20} className="mr-2" />
                    Уведомить меня о запуске
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-purple-500/20">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="flex items-center gap-2 text-purple-300/60 text-sm">
                  <Icon name="Lock" size={14} />
                  <span>Никакого спама</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full transition-all duration-300 ${isAnimating ? 'scale-110 shadow-lg shadow-green-500/30' : 'scale-100'}`}>
                    <Icon name="Users" size={16} className="text-green-400" />
                    <span className={`text-green-300 font-bold tabular-nums transition-all duration-300 ${isAnimating ? 'text-green-200' : ''}`}>
                      {Math.floor(displayCount).toLocaleString()}
                    </span>
                    <span className="text-green-300/70 text-sm">подписчиков</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Icon name="Radar" size={32} className="text-blue-400" />
            </div>
            <div className="text-blue-300 font-bold text-lg mb-2">Отслеживание</div>
            <div className="text-purple-300/70 text-sm">В реальном времени</div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <Icon name="Globe" size={32} className="text-cyan-400" />
            </div>
            <div className="text-cyan-300 font-bold text-lg mb-2">Интерактивно</div>
            <div className="text-purple-300/70 text-sm">Погружение в детали</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Icon name="Sparkles" size={32} className="text-purple-400" />
            </div>
            <div className="text-purple-300 font-bold text-lg mb-2">Уникально</div>
            <div className="text-purple-300/70 text-sm">Нечто особенное</div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-purple-300/60">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75"></div>
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
}