import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  image: string;
}

interface NewsResponse {
  news: NewsItem[];
  total: number;
  source: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'relevance'>('date');

  const categories = [
    { id: 'all', name: 'Все новости', icon: 'Globe' },
    { id: 'tourism', name: 'Туризм', icon: 'Plane', keywords: ['туризм', 'туристы', 'отель', 'путешеств', 'курорт', 'отдых', 'виза'] },
    { id: 'economy', name: 'Экономика', icon: 'TrendingUp', keywords: ['экономик', 'бизнес', 'рынок', 'компани', 'доллар', 'рубл', 'цен', 'инвести'] },
    { id: 'world', name: 'В мире', icon: 'MapPin', keywords: ['стран', 'мир', 'сша', 'европ', 'кита', 'япони', 'международн'] },
    { id: 'politics', name: 'Политика', icon: 'Users', keywords: ['политик', 'правительств', 'президент', 'министр', 'дума', 'закон'] },
    { id: 'tech', name: 'Технологии', icon: 'Laptop', keywords: ['технолог', 'it', 'интернет', 'приложени', 'софт', 'цифров', 'гаджет'] }
  ];

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://functions.poehali.dev/084472ef-27eb-4b91-825c-a6a707d8c933');
      
      if (!response.ok) {
        throw new Error('Не удалось загрузить новости');
      }
      
      const data: NewsResponse = await response.json();
      setNews(data.news.slice(0, 20));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNews();
    
    const interval = setInterval(() => {
      fetchNews();
    }, 4 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNewsCategory = (newsItem: NewsItem): string => {
    const text = (newsItem.title + ' ' + newsItem.description).toLowerCase();
    
    for (const category of categories) {
      if (category.id === 'all') continue;
      if (category.keywords?.some(keyword => text.includes(keyword))) {
        return category.id;
      }
    }
    return 'other';
  };

  const filteredNews = useMemo(() => {
    let filtered = news;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => getNewsCategory(item) === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }

    if (sortBy === 'date') {
      filtered = [...filtered].sort((a, b) => 
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );
    } else if (sortBy === 'relevance' && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = [...filtered].sort((a, b) => {
        const aScore = (a.title.toLowerCase().includes(query) ? 10 : 0) + 
                       (a.description.toLowerCase().includes(query) ? 1 : 0);
        const bScore = (b.title.toLowerCase().includes(query) ? 10 : 0) + 
                       (b.description.toLowerCase().includes(query) ? 1 : 0);
        return bScore - aScore;
      });
    }

    return filtered;
  }, [news, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzhjNWNkNiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>

      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
          >
            <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Назад на главную</span>
          </Link>

          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-purple-500/50">
                <Icon name="Newspaper" size={50} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-black mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Новости РБК
            </h1>
            <p className="text-lg sm:text-2xl text-purple-200/80 max-w-4xl mx-auto font-light leading-relaxed mb-4">
              Актуальные новости о путешествиях, туризме, экономике и мире
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-purple-300/70">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>Автообновление каждые 4 часа</span>
              </div>
              <Button
                onClick={fetchNews}
                variant="ghost"
                size="sm"
                className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 h-8"
                disabled={loading}
              >
                <Icon name={loading ? "Loader2" : "RefreshCw"} size={14} className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
                Обновить
              </Button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-12 space-y-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Поиск новостей по заголовку или описанию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-14 pr-6 text-lg bg-slate-900/60 border-2 border-purple-500/30 text-white placeholder:text-purple-300/50 focus:border-cyan-400/60 backdrop-blur-md rounded-2xl"
              />
              <Icon 
                name="Search" 
                size={24} 
                className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-purple-400 hover:text-cyan-400 transition-colors"
                >
                  <Icon name="X" size={20} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-lg shadow-pink-500/50'
                      : 'bg-slate-900/60 border-2 border-purple-500/30 text-purple-200 hover:border-cyan-400/60'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon name={category.icon as any} size={18} />
                    {category.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Badge variant="outline" className="border-purple-400/40 text-purple-200 text-base px-4 py-2">
                Найдено новостей: {filteredNews.length}
              </Badge>

              <div className="flex items-center gap-2 bg-slate-900/60 border-2 border-purple-500/30 rounded-xl px-4 py-2">
                <Icon name="ArrowUpDown" size={18} className="text-purple-300" />
                <span className="text-purple-300 text-sm font-medium">Сортировка:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'relevance')}
                  className="bg-transparent text-white font-semibold outline-none cursor-pointer"
                >
                  <option value="date" className="bg-slate-900">По дате</option>
                  <option value="relevance" className="bg-slate-900">По релевантности</option>
                </select>
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-500 border-t-cyan-400 mb-6"></div>
              <p className="text-cyan-300 text-xl">Загружаем свежие новости...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <div className="inline-block p-6 bg-red-500/20 border-2 border-red-500/50 rounded-2xl mb-6">
                <Icon name="AlertCircle" size={64} className="text-red-400 mx-auto" />
              </div>
              <p className="text-red-300 text-xl">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Попробовать снова
              </Button>
            </div>
          )}

          {!loading && !error && filteredNews.length > 0 && (
            <div className="space-y-8">
              {filteredNews.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-gradient-to-br from-slate-900/90 to-purple-900/50 backdrop-blur-xl border-2 border-purple-500/30 rounded-3xl overflow-hidden hover:border-cyan-400/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30">
                    <div className="flex flex-col lg:flex-row">
                      {item.image && (
                        <div className="lg:w-1/2 xl:w-2/5 relative overflow-hidden">
                          <div className="aspect-video lg:aspect-auto lg:h-full">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent opacity-80"></div>
                          </div>
                          
                          <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-purple-400/40">
                            <Icon name="TrendingUp" size={18} className="text-cyan-400" />
                            <span className="text-cyan-100 text-sm font-semibold">Топ новость</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="lg:w-1/2 xl:w-3/5 p-8 sm:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 animate-pulse"></div>
                          <span className="text-purple-300/70 text-sm font-medium flex items-center gap-2">
                            <Icon name="Clock" size={16} />
                            {formatDate(item.pubDate)}
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h2>

                        <p className="text-purple-100/80 text-base sm:text-lg mb-8 leading-relaxed line-clamp-4">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-3 text-cyan-400 text-lg font-semibold group-hover:gap-5 transition-all">
                          <span>Читать полностью</span>
                          <Icon 
                            name="ArrowRight" 
                            size={24} 
                            className="group-hover:translate-x-2 transition-transform duration-300" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {!loading && !error && filteredNews.length === 0 && news.length > 0 && (
            <div className="text-center py-20">
              <Icon name="SearchX" size={80} className="text-purple-400/50 mx-auto mb-6" />
              <p className="text-purple-300 text-xl mb-4">Новости по вашему запросу не найдены</p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Сбросить фильтры
              </Button>
            </div>
          )}

          {!loading && !error && news.length === 0 && (
            <div className="text-center py-20">
              <Icon name="Inbox" size={80} className="text-purple-400/50 mx-auto mb-6" />
              <p className="text-purple-300 text-xl">Новости пока не загружены</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}