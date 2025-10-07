import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Radar() {
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

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block mb-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 flex items-center justify-center shadow-2xl shadow-orange-500/50 relative">
              <Icon name="Construction" size={80} className="text-white" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 animate-ping opacity-20"></div>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black mb-6 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent leading-tight">
            Технические работы
          </h1>

          <p className="text-xl sm:text-2xl text-purple-200/80 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
            Радар Странника временно недоступен. Мы улучшаем систему отслеживания самолётов для вас
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-2 border-orange-500/40 rounded-full mb-12">
            <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse"></div>
            <span className="text-orange-300 font-semibold">Ведутся работы</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 rounded-3xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-blue-400" />
              </div>
              <h3 className="text-blue-300 font-bold text-lg mb-2 text-center">Оптимизация</h3>
              <p className="text-purple-300/70 text-sm text-center">Улучшаем производительность радара</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-3xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                <Icon name="Database" size={24} className="text-cyan-400" />
              </div>
              <h3 className="text-cyan-300 font-bold text-lg mb-2 text-center">Новые данные</h3>
              <p className="text-purple-300/70 text-sm text-center">Подключаем больше источников</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-3xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                <Icon name="Sparkles" size={24} className="text-purple-400" />
              </div>
              <h3 className="text-purple-300 font-bold text-lg mb-2 text-center">Новый дизайн</h3>
              <p className="text-purple-300/70 text-sm text-center">Делаем интерфейс удобнее</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 border-2 border-cyan-500/30 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Скоро запустим!</h2>
              <p className="text-purple-200/80 text-lg mb-6 max-w-xl mx-auto">
                Мы работаем над улучшениями и вскоре радар вернётся с новыми возможностями
              </p>
              
              <div className="flex items-center justify-center gap-2 text-cyan-300/60 mb-6">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-150"></div>
              </div>

              <p className="text-purple-300/60 text-sm">
                Следите за обновлениями в нашем Telegram-канале
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative bg-black/40 backdrop-blur-md border-t-2 border-cyan-500/30 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-cyan-300/60 text-sm mb-4">
            Откройте мир через интерактивные путешествия • 2024
          </p>
          <div className="flex flex-col items-center gap-3">
            <p className="text-white/70 text-xs">Мы в соцсетях</p>
            <a
              href="https://t.me/Strannik_com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-1.5 text-sm rounded-lg transition-all"
            >
              <Icon name="Send" size={16} />
              Смотреть
            </a>
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
