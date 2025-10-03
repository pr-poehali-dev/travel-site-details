import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Radar() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMTYsMTgwLDI1NCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-slate-900/60 border-2 border-purple-500/30 text-purple-200 rounded-2xl hover:border-cyan-400/60 hover:bg-slate-900/80 transition-all duration-300 group backdrop-blur-md"
        >
          <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Назад на главную</span>
        </Link>

        <div className="text-center mb-8">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/50">
              <Icon name="Plane" size={50} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Российское небо
          </h1>
          <p className="text-lg sm:text-2xl text-purple-200/80 max-w-4xl mx-auto font-light leading-relaxed mb-4">
            Отслеживание самолётов в реальном времени над территорией России
          </p>
          <div className="flex flex-wrap gap-3 justify-center items-center text-sm text-purple-300/70">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span>Данные в реальном времени</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={16} />
              <span>Территория России</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Activity" size={16} />
              <span>Powered by Flightradar24</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/40 border-2 border-purple-500/30 rounded-3xl p-4 sm:p-6 backdrop-blur-md shadow-2xl">
          <div className="mb-4 flex flex-wrap gap-3 justify-between items-center">
            <div className="flex gap-2">
              <Button 
                variant="outline"
                className="border-purple-500/30 text-purple-200 hover:bg-purple-500/10"
                onClick={() => window.open('https://www.flightradar24.com', '_blank')}
              >
                <Icon name="ExternalLink" size={16} className="mr-2" />
                Открыть на Flightradar24
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-purple-300 text-sm">
              <Icon name="Info" size={16} />
              <span>Нажмите на самолёт для подробной информации</span>
            </div>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden border-2 border-purple-500/20 shadow-lg" style={{ height: 'calc(100vh - 400px)', minHeight: '500px' }}>
            <iframe
              src="https://www.flightradar24.com/55.75,37.62/5"
              className="w-full h-full"
              style={{ border: 'none' }}
              title="Flightradar24 - Российское небо"
              allow="geolocation"
              loading="lazy"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Icon name="Plane" size={20} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-purple-300/60">Коммерческие рейсы</div>
                  <div className="text-lg font-bold text-blue-300">В реальном времени</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Icon name="Navigation" size={20} className="text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs text-purple-300/60">Маршруты полётов</div>
                  <div className="text-lg font-bold text-cyan-300">Детальная информация</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-purple-400" />
                </div>
                <div>
                  <div className="text-xs text-purple-300/60">Обновление данных</div>
                  <div className="text-lg font-bold text-purple-300">Каждые 10 секунд</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={20} className="text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-200/90">
                <strong className="font-semibold">Обратите внимание:</strong> Отображаются только самолёты с включенными транспондерами ADS-B. 
                Военные и некоторые частные рейсы могут быть не видны на радаре.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
