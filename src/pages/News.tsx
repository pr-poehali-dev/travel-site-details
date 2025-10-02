import { useEffect } from 'react';
import NewsSection from '@/components/NewsSection';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

export default function News() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzhjNWNkNiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>

      <div className="relative">
        <div className="container mx-auto px-6 py-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
          >
            <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Назад на главную</span>
          </Link>

          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 flex items-center justify-center neon-border-purple">
                <Icon name="Newspaper" size={40} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent neon-text-purple">
              Новости РБК
            </h1>
            <p className="text-xl text-purple-200/70 max-w-3xl mx-auto font-light">
              Актуальные новости о путешествиях, экономике и бизнесе
            </p>
          </div>

          <NewsSection />
        </div>
      </div>
    </div>
  );
}
