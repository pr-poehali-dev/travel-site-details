import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://functions.poehali.dev/084472ef-27eb-4b91-825c-a6a707d8c933');
        
        if (!response.ok) {
          throw new Error('Не удалось загрузить новости');
        }
        
        const data: NewsResponse = await response.json();
        setNews(data.news);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Icon name="AlertCircle" size={48} className="text-red-400 mx-auto mb-4" />
        <p className="text-white/70">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item, index) => (
        <a 
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block h-full"
        >
          <Card className="bg-black/60 border-2 border-purple-500/30 backdrop-blur-md hover:border-cyan-500/60 transition-all duration-300 group-hover:scale-105 h-full flex flex-col neon-border-purple group-hover:neon-border-blue">
            {item.image && (
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-black/40 to-transparent"></div>
              </div>
            )}
            <CardHeader className="flex-1">
              <CardTitle className="text-lg text-cyan-100 group-hover:text-cyan-400 transition-colors line-clamp-2">
                {item.title}
              </CardTitle>
              <CardDescription className="text-purple-300/60 text-sm flex items-center gap-2">
                <Icon name="Clock" size={14} />
                {formatDate(item.pubDate)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-cyan-200/70 text-sm line-clamp-3">
                {item.description}
              </p>
              <div className="flex items-center gap-2 mt-4 text-cyan-400 text-sm font-medium">
                <span>Читать далее</span>
                <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}