import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
import { Input } from '@/components/ui/input';

const PAYMENT_URL = 'https://functions.poehali.dev/ec989dc1-d07b-4723-9485-30e0299f7cfa';
const CHECK_PAYMENT_URL = 'https://functions.poehali.dev/5c0bdb08-caca-45a4-9c3a-95ab2e300df9';

export default function Radar() {
  const [searchParams] = useSearchParams();
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const subscribed = localStorage.getItem('radar_subscribed') === 'true';
    setIsSubscribed(subscribed);

    const paymentStatus = searchParams.get('payment');
    const paymentId = searchParams.get('payment_id');
    
    if (paymentStatus === 'success' && paymentId && !isCheckingPayment) {
      setIsCheckingPayment(true);
      checkPaymentStatus(paymentId);
    }
  }, [searchParams]);

  const checkPaymentStatus = async (paymentId: string) => {
    try {
      const response = await fetch(`${CHECK_PAYMENT_URL}?payment_id=${paymentId}`);
      const data = await response.json();
      
      if (data.subscription_active) {
        localStorage.setItem('radar_subscribed', 'true');
        localStorage.setItem('radar_payment_id', paymentId);
        setIsSubscribed(true);
        
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981']
        });
        
        toast({
          title: "Оплата успешна! 🎉",
          description: "Добро пожаловать в Радар Странника!",
        });
        
        window.history.replaceState({}, '', '/radar');
      } else {
        toast({
          title: "Ожидание оплаты",
          description: "Платёж ещё обрабатывается. Попробуйте обновить страницу через минуту.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка проверки платежа",
        description: "Не удалось проверить статус оплаты",
        variant: "destructive"
      });
    } finally {
      setIsCheckingPayment(false);
    }
  };

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Некорректный email",
        description: "Пожалуйста, введите правильный email",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch(PAYMENT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount: 990,
          return_url: window.location.origin
        })
      });

      const data = await response.json();
      
      if (data.payment_url) {
        localStorage.setItem('radar_pending_payment_id', data.payment_id);
        window.location.href = `${data.payment_url}?payment_id=${data.payment_id}`;
      } else {
        throw new Error('No payment URL received');
      }
    } catch (error) {
      toast({
        title: "Ошибка создания платежа",
        description: "Что-то пошло не так. Попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
        <div className="absolute top-4 right-4 z-[1001] flex items-center gap-3">
          <Button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/95 border-2 border-purple-500/30 text-purple-200 rounded-xl hover:border-purple-400/60 hover:bg-slate-900 transition-all duration-300 backdrop-blur-md shadow-lg"
          >
            <Icon name={isDarkTheme ? "Sun" : "Moon"} size={18} />
            <span>{isDarkTheme ? "Светлая" : "Тёмная"}</span>
          </Button>
          
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/95 border-2 border-cyan-500/30 text-cyan-200 rounded-xl hover:border-cyan-400/60 hover:bg-slate-900 transition-all duration-300 backdrop-blur-md shadow-lg"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMTYsMTgwLDI1NCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute text-cyan-400/20 animate-float"
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
        className="absolute top-8 left-4 sm:left-8 inline-flex items-center gap-3 px-6 py-3 bg-slate-900/60 border-2 border-purple-500/30 text-purple-200 rounded-2xl hover:border-cyan-400/60 hover:bg-slate-900/80 transition-all duration-300 group backdrop-blur-md z-10"
      >
        <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Назад на главную</span>
      </Link>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-block mb-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/50 relative">
              <Icon name="Radar" size={80} className="text-white animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 animate-ping opacity-20"></div>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Радар Странника
          </h1>

          <p className="text-xl sm:text-2xl text-purple-200/80 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
            Отслеживайте все самолёты в небе в реальном времени. Смотрите маршруты, высоту, скорость и информацию о каждом рейсе
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 rounded-full">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-green-300 font-semibold">Функция работает</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 rounded-3xl p-8 backdrop-blur-sm hover:border-blue-400/50 transition-all">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-500/20 flex items-center justify-center">
              <Icon name="MapPin" size={32} className="text-blue-400" />
            </div>
            <h3 className="text-blue-300 font-bold text-xl mb-3 text-center">Отслеживание в реальном времени</h3>
            <p className="text-purple-300/70 text-center">Следите за любым рейсом в небе: актуальная позиция обновляется каждые 2 секунды</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-3xl p-8 backdrop-blur-sm hover:border-cyan-400/50 transition-all">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
              <Icon name="Info" size={32} className="text-cyan-400" />
            </div>
            <h3 className="text-cyan-300 font-bold text-xl mb-3 text-center">Детальная информация</h3>
            <p className="text-purple-300/70 text-center">Высота, скорость, курс, модель самолёта, аэропорты вылета и прилёта — всё в одном месте</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-sm hover:border-purple-400/50 transition-all">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-purple-500/20 flex items-center justify-center">
              <Icon name="Globe" size={32} className="text-purple-400" />
            </div>
            <h3 className="text-purple-300 font-bold text-xl mb-3 text-center">Интерактивная карта</h3>
            <p className="text-purple-300/70 text-center">Тёмная карта мира с возможностью приближения и просмотра любого участка неба</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 border-2 border-cyan-500/30 rounded-3xl p-10 backdrop-blur-md shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl mb-4">
                <Icon name="Lock" size={40} className="text-yellow-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Доступно по подписке</h2>
              <p className="text-purple-200/80 text-lg max-w-2xl mx-auto">
                Радар Странника — это премиум-функция. Оформите подписку, чтобы получить доступ ко всем возможностям
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-slate-900/60 border border-cyan-500/20 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={20} className="text-cyan-400" />
                </div>
                <span className="text-purple-200">Отслеживание всех рейсов онлайн</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/60 border border-cyan-500/20 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={20} className="text-cyan-400" />
                </div>
                <span className="text-purple-200">Интерактивная карта мира</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/60 border border-cyan-500/20 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={20} className="text-cyan-400" />
                </div>
                <span className="text-purple-200">Маршруты полётов</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/60 border border-cyan-500/20 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={20} className="text-cyan-400" />
                </div>
                <span className="text-purple-200">Поиск по рейсам</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/40 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-cyan-300/70 text-sm mb-1">Премиум подписка</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">990₽</span>
                    <span className="text-cyan-300/70">/месяц</span>
                  </div>
                </div>
                <Button
                  onClick={() => setShowSubscriptionDialog(true)}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-2xl shadow-lg shadow-cyan-500/25 text-lg font-semibold px-8 h-14"
                >
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Оформить подписку
                </Button>
              </div>
            </div>

            <p className="text-center text-purple-300/60 text-sm">
              Безопасная оплата через ЮКассу • Реальная обработка платежей
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-purple-300/60">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse delay-150"></div>
          </div>
        </div>
      </div>

      <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
        <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-500/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Оформление подписки
            </DialogTitle>
            <DialogDescription className="text-purple-200/80 text-center">
              Введите ваш email для оформления подписки
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-6">
            <div className="bg-slate-800/60 border border-cyan-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-200">Премиум подписка</span>
                <span className="text-white font-bold">990₽</span>
              </div>
              <div className="text-purple-300/60 text-sm">Ежемесячное списание</div>
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium block">Email для чека</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900/60 border-cyan-500/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-purple-200/70">
                <Icon name="Check" size={16} className="text-cyan-400" />
                <span>Отслеживание всех рейсов</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-200/70">
                <Icon name="Check" size={16} className="text-cyan-400" />
                <span>Данные в реальном времени</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-200/70">
                <Icon name="Check" size={16} className="text-cyan-400" />
                <span>Полная информация о рейсах</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setShowSubscriptionDialog(false)}
              variant="outline"
              className="flex-1 border-purple-500/30 text-purple-200 hover:bg-purple-500/10"
              disabled={isProcessing}
            >
              Отмена
            </Button>
            <Button
              onClick={handleSubscribe}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                  Обработка...
                </>
              ) : (
                <>
                  <Icon name="CreditCard" size={18} className="mr-2" />
                  Оплатить 990₽
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="relative bg-black/40 backdrop-blur-md border-t-2 border-cyan-500/30 py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-cyan-300/60 text-sm mb-4">
            Откройте мир через интерактивные путешествия • 2024
          </p>
          <div className="flex flex-col items-center gap-3">
            <p className="text-white/70 text-xs">Мы в соцсетях</p>
            <Button
              onClick={() => window.open('https://t.me/Strannik_com', '_blank')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 px-4 py-1.5 text-sm flex items-center gap-2"
            >
              <Icon name="Send" size={16} />
              Смотреть
            </Button>
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