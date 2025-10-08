import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Icon from '@/components/ui/icon'
import { allCountries, type Country } from '@/data/countries'

// Упорядоченное размещение стран по столбикам с увеличенным пространством
const modernCountries: Country[] = [
  // Столбик 1 - Европа (левый край)
  {
    ...allCountries.find(c => c.id === 'iceland')!,
    coordinates: { x: 12, y: 10 }
  },
  {
    ...allCountries.find(c => c.id === 'norway')!,
    coordinates: { x: 12, y: 20 }
  },
  {
    ...allCountries.find(c => c.id === 'germany')!,
    coordinates: { x: 12, y: 30 }
  },
  {
    ...allCountries.find(c => c.id === 'france')!,
    coordinates: { x: 12, y: 40 }
  },
  {
    ...allCountries.find(c => c.id === 'spain')!,
    coordinates: { x: 12, y: 50 }
  },
  {
    ...allCountries.find(c => c.id === 'morocco')!,
    coordinates: { x: 12, y: 60 }
  },

  // Столбик 2 - Европа продолжение
  {
    ...allCountries.find(c => c.id === 'switzerland')!,
    coordinates: { x: 26, y: 10 }
  },
  {
    ...allCountries.find(c => c.id === 'italy')!,
    coordinates: { x: 26, y: 20 }
  },
  {
    ...allCountries.find(c => c.id === 'greece')!,
    coordinates: { x: 26, y: 30 }
  },
  {
    ...allCountries.find(c => c.id === 'egypt')!,
    coordinates: { x: 26, y: 40 }
  },
  {
    ...allCountries.find(c => c.id === 'kenya')!,
    coordinates: { x: 26, y: 50 }
  },
  {
    ...allCountries.find(c => c.id === 'southafrica')!,
    coordinates: { x: 26, y: 60 }
  },

  // Столбик 3 - Северная Америка
  {
    ...allCountries.find(c => c.id === 'canada')!,
    coordinates: { x: 40, y: 10 }
  },
  {
    ...allCountries.find(c => c.id === 'usa')!,
    coordinates: { x: 40, y: 20 }
  },
  {
    ...allCountries.find(c => c.id === 'mexico')!,
    coordinates: { x: 40, y: 30 }
  },

  // Столбик 4 - Южная Америка
  {
    ...allCountries.find(c => c.id === 'peru')!,
    coordinates: { x: 54, y: 10 }
  },
  {
    ...allCountries.find(c => c.id === 'brazil')!,
    coordinates: { x: 54, y: 20 }
  },
  {
    ...allCountries.find(c => c.id === 'argentina')!,
    coordinates: { x: 54, y: 30 }
  },
  {
    ...allCountries.find(c => c.id === 'chile')!,
    coordinates: { x: 54, y: 40 }
  },

  // Столбик 5 - Азия запад
  {
    ...allCountries.find(c => c.id === 'india')!,
    coordinates: { x: 68, y: 10 }
  },
  {
    ...allCountries.find(c => c.id === 'maldives')!,
    coordinates: { x: 68, y: 20 }
  },

  // Столбик 6 - Азия центр
  {
    ...allCountries.find(c => c.id === 'china')!,
    coordinates: { x: 82, y: 10 }
  },
  {
    ...allCountries.find(c => c.id === 'thailand')!,
    coordinates: { x: 82, y: 20 }
  },

  // Столбик 7 - Азия восток
  {
    ...allCountries.find(c => c.id === 'southkorea')!,
    coordinates: { x: 96, y: 10 }
  },
  {
    ...allCountries.find(c => c.id === 'japan')!,
    coordinates: { x: 96, y: 20 }
  },

  // Столбик 8 - Океания
  {
    ...allCountries.find(c => c.id === 'fiji')!,
    coordinates: { x: 110, y: 10 }
  },
  {
    ...allCountries.find(c => c.id === 'australia')!,
    coordinates: { x: 110, y: 20 }
  },
  {
    ...allCountries.find(c => c.id === 'newzealand')!,
    coordinates: { x: 110, y: 30 }
  }
]

const topDestinations = ['japan', 'italy', 'france', 'thailand', 'usa', 'australia']

export default function ModernWorldMap() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeTab, setActiveTab] = useState<string>('map')
  const [animationStarted, setAnimationStarted] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const filteredCountries = modernCountries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    country.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const continentColors = {
    'Европа': '#ec4899',
    'Азия': '#a855f7', 
    'Африка': '#d946ef',
    'Северная Америка': '#c026d3',
    'Южная Америка': '#8b5cf6',
    'Океания': '#e879f9'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-max-violet to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-max-pink rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-max-purple rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-max-violet rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Modern Header */}
      <section className="relative z-10 py-16 px-6">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-max-pink/20">
            <Icon name="Globe" size={24} className="text-max-pink" />
            <span className="text-sm font-medium">Исследуй мир</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-max-pink via-max-purple to-max-violet bg-clip-text text-transparent mb-6">
            Карта Мира
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Интерактивное путешествие по {allCountries.length}+ странам мира. 
            Открой новые направления и планируй незабываемые приключения.
          </p>

          {/* Advanced Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Поиск стран, городов, достопримечательностей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-max-pink/20 text-white placeholder:text-slate-400 rounded-2xl focus:ring-2 focus:ring-max-pink focus:border-transparent"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-max-pink/10 shadow-lg shadow-max-pink/10">
              <div className="text-3xl font-bold text-max-pink mb-2">{filteredCountries.length}</div>
              <div className="text-slate-300 text-sm">Стран на карте</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-max-purple/10 shadow-lg shadow-max-purple/10">
              <div className="text-3xl font-bold text-max-purple mb-2">7</div>
              <div className="text-slate-300 text-sm">Континентов</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-max-violet/10 shadow-lg shadow-max-violet/10">
              <div className="text-3xl font-bold text-max-violet mb-2">500+</div>
              <div className="text-slate-300 text-sm">Направлений</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-max-pink/10 shadow-lg shadow-max-pink/10">
              <div className="text-3xl font-bold text-max-pink mb-2">∞</div>
              <div className="text-slate-300 text-sm">Возможностей</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Tabs */}
      <section className="relative z-10 px-6">
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-white/10 backdrop-blur-sm border border-max-pink/20 rounded-2xl p-1">
              <TabsTrigger value="map" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-max-pink data-[state=active]:to-max-purple data-[state=active]:text-white">
                <Icon name="Map" size={16} className="mr-2" />
                Карта
              </TabsTrigger>
              <TabsTrigger value="list" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-max-pink data-[state=active]:to-max-purple data-[state=active]:text-white">
                <Icon name="List" size={16} className="mr-2" />
                Список
              </TabsTrigger>
              <TabsTrigger value="stats" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-max-pink data-[state=active]:to-max-purple data-[state=active]:text-white">
                <Icon name="BarChart3" size={16} className="mr-2" />
                Статистика
              </TabsTrigger>
            </TabsList>

            {/* Interactive Map Tab */}
            <TabsContent value="map" className="space-y-0">
              <div className="max-w-7xl mx-auto">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-max-pink/10 shadow-2xl shadow-max-pink/20">
                  <svg
                    viewBox="0 0 125 75"
                    className="w-full h-auto max-h-[700px] transition-all duration-1000 ease-out"
                    style={{ 
                      filter: 'drop-shadow(0 20px 40px rgba(236,72,153,0.3))',
                      transform: animationStarted ? 'scale(1)' : 'scale(0.8)',
                      opacity: animationStarted ? 1 : 0
                    }}
                  >
                    {/* Enhanced Background with Gradients */}
                    <defs>
                      <linearGradient id="worldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="50%" stopColor="#334155" />
                        <stop offset="100%" stopColor="#475569" />
                      </linearGradient>
                      <radialGradient id="glowEffect" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                      </radialGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    {/* World Background */}
                    <rect x="0" y="0" width="125" height="75" fill="url(#worldGrad)" rx="8" />
                    
                    {/* Glowing Grid */}
                    <g opacity="0.1">
                      {[...Array(25)].map((_, i) => (
                        <line key={`v${i}`} x1={i * 5} y1="0" x2={i * 5} y2="75" stroke="#ec4899" strokeWidth="0.2" />
                      ))}
                      {[...Array(15)].map((_, i) => (
                        <line key={`h${i}`} x1="0" y1={i * 5} x2="125" y2={i * 5} stroke="#ec4899" strokeWidth="0.2" />
                      ))}
                    </g>

                    {/* Animated continent outlines */}
                    <g opacity="0.3" className="animate-pulse">
                      <path d="M5 8 L30 8 L32 15 L30 30 L25 32 L8 30 L5 20 Z" 
                            fill="none" stroke="#ec4899" strokeWidth="0.5" strokeDasharray="2,2">
                        <animate attributeName="stroke-dashoffset" values="0;4;0" dur="3s" repeatCount="indefinite" />
                      </path>
                      <path d="M55 10 L95 10 L95 20 L90 35 L85 40 L70 38 L60 32 L55 25 Z" 
                            fill="none" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="2,2">
                        <animate attributeName="stroke-dashoffset" values="0;4;0" dur="4s" repeatCount="indefinite" />
                      </path>
                    </g>



                    {/* Enhanced Legend */}
                    <g transform="translate(5, 65)">
                      <rect x="0" y="0" width="40" height="12" fill="rgba(0,0,0,0.8)" rx="6" stroke="rgba(236,72,153,0.2)" strokeWidth="0.5" />
                      <circle cx="4" cy="6" r="2" fill="#ec4899" />
                      <text x="8" y="7" className="text-xs fill-white font-medium">Страны для путешествий</text>
                      <circle cx="4" cy="9" r="1.5" fill="#fbbf24" />
                      <text x="8" y="10" className="text-xs fill-white">ТОП направления</text>
                    </g>
                  </svg>
                </div>


              </div>
            </TabsContent>

            {/* Countries List Tab */}
            <TabsContent value="list" className="space-y-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCountries.map((country) => (
                    <Dialog key={`list-${country.id}`}>
                      <DialogTrigger asChild>
                        <Card className="cursor-pointer hover:scale-105 transition-all duration-300 bg-white/5 backdrop-blur-sm border-max-pink/10 text-white hover:bg-white/10 hover:border-max-pink/30 hover:shadow-lg hover:shadow-max-pink/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-3xl">{country.flag}</span>
                                <div>
                                  <h3 className="font-bold">{country.name}</h3>
                                  <p className="text-sm text-slate-400 font-normal">
                                    {country.continent}
                                  </p>
                                </div>
                              </div>
                              {topDestinations.includes(country.id) && (
                                <Badge className="bg-yellow-500 text-black text-xs shadow-lg shadow-yellow-500/50">
                                  <Icon name="Star" size={12} className="mr-1" />
                                  ТОП
                                </Badge>
                              )}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm text-slate-300 mb-4 line-clamp-2">
                              {country.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge 
                                style={{ backgroundColor: continentColors[country.continent as keyof typeof continentColors] }}
                                className="text-white text-xs"
                              >
                                {country.destinations} мест
                              </Badge>
                              <Icon name="ArrowRight" size={16} className="text-max-pink" />
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      
                      <DialogContent className="max-w-4xl bg-slate-900 border-max-pink/30 text-white">
                        <DialogHeader>
                          <DialogTitle className="text-3xl flex items-center gap-4">
                            <span className="text-4xl">{country.flag}</span>
                            <div>
                              {country.name}
                              <div className="flex items-center gap-2 mt-2">
                                <Badge 
                                  style={{ backgroundColor: continentColors[country.continent as keyof typeof continentColors] }}
                                  className="text-white"
                                >
                                  {country.continent}
                                </Badge>
                                {topDestinations.includes(country.id) && (
                                  <Badge className="bg-yellow-500 text-black shadow-lg shadow-yellow-500/50">
                                    <Icon name="Star" size={12} className="mr-1" />
                                    ТОП
                                  </Badge>
                                )}
                                <Badge variant="outline" className="border-max-pink/30 text-max-pink">
                                  {country.destinations} мест
                                </Badge>
                              </div>
                            </div>
                          </DialogTitle>
                          <DialogDescription className="text-lg text-slate-300">
                            {country.description}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid md:grid-cols-2 gap-8 mt-6">
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Icon name="MapPin" size={20} className="text-max-pink" />
                                Популярные направления
                              </h4>
                              <div className="grid grid-cols-2 gap-3">
                                {country.popularDestinations.map((destination, i) => (
                                  <div key={i} className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg border border-max-pink/10">
                                    <Icon name="Compass" size={16} className="text-max-pink" />
                                    <span className="text-sm">{destination}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-slate-800 rounded-lg border border-max-pink/10">
                                <div className="flex items-center gap-2 mb-2">
                                  <Icon name="Cloud" size={16} className="text-max-pink" />
                                  <span className="text-sm font-medium text-slate-300">Климат</span>
                                </div>
                                <p className="text-sm">{country.climate}</p>
                              </div>
                              <div className="p-4 bg-slate-800 rounded-lg border border-max-purple/10">
                                <div className="flex items-center gap-2 mb-2">
                                  <Icon name="Calendar" size={16} className="text-max-purple" />
                                  <span className="text-sm font-medium text-slate-300">Лучшее время</span>
                                </div>
                                <p className="text-sm">{country.bestTime}</p>
                              </div>
                              <div className="p-4 bg-slate-800 rounded-lg border border-yellow-400/10">
                                <div className="flex items-center gap-2 mb-2">
                                  <Icon name="DollarSign" size={16} className="text-yellow-400" />
                                  <span className="text-sm font-medium text-slate-300">Валюта</span>
                                </div>
                                <p className="text-sm">{country.currency}</p>
                              </div>
                              <div className="p-4 bg-slate-800 rounded-lg border border-max-violet/10">
                                <div className="flex items-center gap-2 mb-2">
                                  <Icon name="Globe" size={16} className="text-max-violet" />
                                  <span className="text-sm font-medium text-slate-300">Язык</span>
                                </div>
                                <p className="text-sm">{country.language}</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-max-pink/10">
                              <div className="flex items-center gap-2">
                                <Icon name={country.visaRequired ? "AlertCircle" : "CheckCircle"} 
                                      size={20} 
                                      className={country.visaRequired ? "text-orange-400" : "text-green-400"} />
                                <span className="font-medium">
                                  {country.visaRequired ? "Виза требуется" : "Безвизовый въезд"}
                                </span>
                              </div>
                            </div>

                            <Button size="lg" className="w-full bg-gradient-to-r from-max-pink to-max-purple hover:from-max-purple hover:to-max-pink text-white border-0 shadow-lg shadow-max-pink/50">
                              <Icon name="Plane" size={20} className="mr-2" />
                              Планировать путешествие
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Statistics Tab */}
            <TabsContent value="stats" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-max-pink/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Icon name="BarChart3" size={20} className="text-max-pink" />
                      По континентам
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(
                        filteredCountries.reduce((acc, country) => {
                          acc[country.continent] = (acc[country.continent] || 0) + 1
                          return acc
                        }, {} as Record<string, number>)
                      ).map(([continent, count]) => (
                        <div key={continent} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: continentColors[continent as keyof typeof continentColors] }}
                            />
                            <span>{continent}</span>
                          </div>
                          <Badge variant="outline" className="border-max-pink/30 text-max-pink">
                            {count} стран
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-max-purple/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Icon name="Star" size={20} className="text-yellow-400" />
                      ТОП направления
                    </h3>
                    <div className="space-y-3">
                      {filteredCountries
                        .filter(country => topDestinations.includes(country.id))
                        .map((country) => (
                          <div key={country.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-max-pink/10">
                            <span className="text-2xl">{country.flag}</span>
                            <div>
                              <h4 className="font-semibold">{country.name}</h4>
                              <p className="text-xs text-slate-400">{country.destinations} направлений</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Modern Footer */}
      <section className="relative z-10 py-12 px-6 mt-16">
        <div className="container mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-max-pink/10">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent">Готов к путешествию?</h3>
            <p className="text-slate-300 mb-6">
              Выбери страну на карте и начни планировать свое следующее приключение
            </p>
            <Button size="lg" className="bg-gradient-to-r from-max-pink to-max-purple hover:from-max-purple hover:to-max-pink text-white border-0 shadow-lg shadow-max-pink/50">
              <Icon name="Plane" size={20} className="mr-2" />
              Начать планирование
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
