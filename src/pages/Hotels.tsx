import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { hotels } from '@/data/hotels';
import { allCountries } from '@/data/countries';

export default function Hotels() {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedStars, setSelectedStars] = useState<'all' | 4 | 5>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHotels = hotels.filter(hotel => {
    const matchesCountry = selectedCountry === 'all' || hotel.countryId === selectedCountry;
    const matchesStars = selectedStars === 'all' || hotel.stars === selectedStars;
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesStars && matchesSearch;
  });

  const countriesWithHotels = Array.from(new Set(hotels.map(h => h.countryId)))
    .map(countryId => allCountries.find(c => c.id === countryId))
    .filter(Boolean);

  const stats = {
    total: hotels.length,
    countries: countriesWithHotels.length,
    fiveStars: hotels.filter(h => h.stars === 5).length,
    fourStars: hotels.filter(h => h.stars === 4).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      
      <div className="relative z-10">
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>На главную</span>
            </Link>

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Icon name="Hotel" size={24} className="text-blue-400" />
                <span className="text-sm font-medium">Лучшие отели мира</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
                Отели Премиум-класса
              </h1>
              
              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Коллекция отелей 4★ и 5★ в {stats.countries} странах мира. 
                Найдите идеальное место для незабываемого отдыха.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{stats.total}</div>
                  <div className="text-slate-300 text-sm">Отелей</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{stats.countries}</div>
                  <div className="text-slate-300 text-sm">Стран</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.fiveStars}</div>
                  <div className="text-slate-300 text-sm">5★ отелей</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{stats.fourStars}</div>
                  <div className="text-slate-300 text-sm">4★ отелей</div>
                </div>
              </div>

              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Поиск отелей по названию или городу..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-slate-400 rounded-2xl"
                  />
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Star" size={20} className="text-yellow-400" />
                    Количество звёзд
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    <Button
                      onClick={() => setSelectedStars('all')}
                      variant={selectedStars === 'all' ? 'default' : 'outline'}
                      className={selectedStars === 'all' 
                        ? 'bg-blue-500 hover:bg-blue-600 border-0' 
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      }
                    >
                      Все отели
                    </Button>
                    <Button
                      onClick={() => setSelectedStars(5)}
                      variant={selectedStars === 5 ? 'default' : 'outline'}
                      className={selectedStars === 5 
                        ? 'bg-yellow-500 hover:bg-yellow-600 border-0 text-black' 
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      }
                    >
                      <Icon name="Star" size={16} className="mr-1" />
                      5 звёзд
                    </Button>
                    <Button
                      onClick={() => setSelectedStars(4)}
                      variant={selectedStars === 4 ? 'default' : 'outline'}
                      className={selectedStars === 4 
                        ? 'bg-cyan-500 hover:bg-cyan-600 border-0' 
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      }
                    >
                      <Icon name="Star" size={16} className="mr-1" />
                      4 звезды
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Globe" size={20} className="text-blue-400" />
                    Выберите страну
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    <Button
                      onClick={() => setSelectedCountry('all')}
                      variant={selectedCountry === 'all' ? 'default' : 'outline'}
                      className={selectedCountry === 'all' 
                        ? 'bg-purple-500 hover:bg-purple-600 border-0' 
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      }
                    >
                      Все страны
                    </Button>
                    {countriesWithHotels.map(country => country && (
                      <Button
                        key={country.id}
                        onClick={() => setSelectedCountry(country.id)}
                        variant={selectedCountry === country.id ? 'default' : 'outline'}
                        className={selectedCountry === country.id 
                          ? 'bg-blue-500 hover:bg-blue-600 border-0' 
                          : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                        }
                      >
                        <span className="mr-2">{country.flag}</span>
                        {country.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto">
              {filteredHotels.length === 0 ? (
                <div className="text-center py-16">
                  <Icon name="Hotel" size={64} className="mx-auto mb-4 text-slate-600" />
                  <h3 className="text-2xl font-bold mb-2">Отели не найдены</h3>
                  <p className="text-slate-400">Попробуйте изменить фильтры или поисковый запрос</p>
                </div>
              ) : (
                <>
                  <div className="mb-6 text-slate-300">
                    Найдено отелей: <span className="font-bold text-white">{filteredHotels.length}</span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHotels.map(hotel => {
                      const country = allCountries.find(c => c.id === hotel.countryId);
                      return (
                        <Card key={hotel.id} className="bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 transition-all hover:scale-105">
                          <div className="relative h-48 overflow-hidden rounded-t-lg">
                            <img 
                              src={hotel.image} 
                              alt={hotel.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1">
                              <Icon name="Star" size={14} />
                              {hotel.stars}★
                            </div>
                            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-1">
                              <span>{country?.flag}</span>
                              <span>{country?.name}</span>
                            </div>
                          </div>
                          <CardHeader>
                            <CardTitle className="text-xl">{hotel.name}</CardTitle>
                            <CardDescription className="text-slate-300 flex items-center gap-2">
                              <Icon name="MapPin" size={14} />
                              {hotel.city}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-slate-300 mb-4 line-clamp-2">
                              {hotel.description}
                            </p>
                            
                            <div className="flex items-center gap-2 mb-4">
                              <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-lg">
                                <Icon name="Star" size={14} className="text-yellow-400" />
                                <span className="font-bold">{hotel.rating}</span>
                              </div>
                              <span className="text-sm text-slate-400">
                                {hotel.reviews} отзывов
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {hotel.amenities.slice(0, 3).map((amenity, i) => (
                                <Badge key={i} variant="outline" className="border-blue-500/30 text-blue-300 text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                              {hotel.amenities.length > 3 && (
                                <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                                  +{hotel.amenities.length - 3}
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                              <div>
                                <div className="text-sm text-slate-400">от</div>
                                <div className="text-2xl font-bold text-blue-400">
                                  {hotel.price.toLocaleString()} ₽
                                </div>
                                <div className="text-xs text-slate-400">за ночь</div>
                              </div>
                              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0">
                                <Icon name="ExternalLink" size={16} className="mr-2" />
                                Забронировать
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 px-6">
          <div className="container mx-auto text-center max-w-4xl">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4">Не нашли подходящий отель?</h3>
              <p className="text-slate-300 mb-6">
                Свяжитесь с нами, и мы поможем подобрать идеальный вариант для вашего путешествия
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Связаться с нами
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
