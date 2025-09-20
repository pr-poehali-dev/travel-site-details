import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Icon from '@/components/ui/icon'
import { allCountries, type Country } from '@/data/countries'

const modernCountries: Country[] = [
  // Топ направления - крупнее и ярче
  {
    ...allCountries.find(c => c.id === 'japan')!,
    coordinates: { x: 85, y: 25 }
  },
  {
    ...allCountries.find(c => c.id === 'italy')!,
    coordinates: { x: 20, y: 22 }
  },
  {
    ...allCountries.find(c => c.id === 'france')!,
    coordinates: { x: 15, y: 19 }
  },
  {
    ...allCountries.find(c => c.id === 'thailand')!,
    coordinates: { x: 70, y: 32 }
  },
  {
    ...allCountries.find(c => c.id === 'usa')!,
    coordinates: { x: 40, y: 25 }
  },
  {
    ...allCountries.find(c => c.id === 'australia')!,
    coordinates: { x: 82, y: 55 }
  },

  // Европа
  {
    ...allCountries.find(c => c.id === 'iceland')!,
    coordinates: { x: 8, y: 8 }
  },
  {
    ...allCountries.find(c => c.id === 'norway')!,
    coordinates: { x: 18, y: 12 }
  },
  {
    ...allCountries.find(c => c.id === 'switzerland')!,
    coordinates: { x: 19, y: 17 }
  },
  {
    ...allCountries.find(c => c.id === 'spain')!,
    coordinates: { x: 12, y: 25 }
  },
  {
    ...allCountries.find(c => c.id === 'greece')!,
    coordinates: { x: 25, y: 28 }
  },
  {
    ...allCountries.find(c => c.id === 'germany')!,
    coordinates: { x: 17, y: 15 }
  },

  // Азия
  {
    ...allCountries.find(c => c.id === 'china')!,
    coordinates: { x: 75, y: 20 }
  },
  {
    ...allCountries.find(c => c.id === 'india')!,
    coordinates: { x: 62, y: 30 }
  },
  {
    ...allCountries.find(c => c.id === 'southkorea')!,
    coordinates: { x: 80, y: 28 }
  },
  {
    ...allCountries.find(c => c.id === 'maldives')!,
    coordinates: { x: 58, y: 42 }
  },

  // Африка
  {
    ...allCountries.find(c => c.id === 'morocco')!,
    coordinates: { x: 8, y: 35 }
  },
  {
    ...allCountries.find(c => c.id === 'egypt')!,
    coordinates: { x: 28, y: 38 }
  },
  {
    ...allCountries.find(c => c.id === 'kenya')!,
    coordinates: { x: 32, y: 48 }
  },
  {
    ...allCountries.find(c => c.id === 'southafrica')!,
    coordinates: { x: 26, y: 58 }
  },

  // Америки
  {
    ...allCountries.find(c => c.id === 'canada')!,
    coordinates: { x: 35, y: 15 }
  },
  {
    ...allCountries.find(c => c.id === 'mexico')!,
    coordinates: { x: 35, y: 35 }
  },
  {
    ...allCountries.find(c => c.id === 'brazil')!,
    coordinates: { x: 48, y: 50 }
  },
  {
    ...allCountries.find(c => c.id === 'peru')!,
    coordinates: { x: 42, y: 45 }
  },
  {
    ...allCountries.find(c => c.id === 'argentina')!,
    coordinates: { x: 45, y: 58 }
  },
  {
    ...allCountries.find(c => c.id === 'chile')!,
    coordinates: { x: 40, y: 62 }
  },

  // Океания
  {
    ...allCountries.find(c => c.id === 'newzealand')!,
    coordinates: { x: 88, y: 62 }
  },
  {
    ...allCountries.find(c => c.id === 'fiji')!,
    coordinates: { x: 92, y: 45 }
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
    'Европа': '#3b82f6',
    'Азия': '#ef4444', 
    'Африка': '#f59e0b',
    'Северная Америка': '#10b981',
    'Южная Америка': '#8b5cf6',
    'Океания': '#06b6d4'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Modern Header */}
      <section className="relative z-10 py-16 px-6">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Icon name="Globe" size={24} className="text-blue-400" />
            <span className="text-sm font-medium">Исследуй мир</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
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
                className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-slate-400 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-blue-400 mb-2">{filteredCountries.length}</div>
              <div className="text-slate-300 text-sm">Стран на карте</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-purple-400 mb-2">7</div>
              <div className="text-slate-300 text-sm">Континентов</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-pink-400 mb-2">500+</div>
              <div className="text-slate-300 text-sm">Направлений</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-green-400 mb-2">∞</div>
              <div className="text-slate-300 text-sm">Возможностей</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Tabs */}
      <section className="relative z-10 px-6">
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-1">
              <TabsTrigger value="map" className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white">
                <Icon name="Map" size={16} className="mr-2" />
                Карта
              </TabsTrigger>
              <TabsTrigger value="list" className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white">
                <Icon name="List" size={16} className="mr-2" />
                Список
              </TabsTrigger>
              <TabsTrigger value="stats" className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white">
                <Icon name="BarChart3" size={16} className="mr-2" />
                Статистика
              </TabsTrigger>
            </TabsList>

            {/* Interactive Map Tab */}
            <TabsContent value="map" className="space-y-0">
              <div className="max-w-7xl mx-auto">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                  <svg
                    viewBox="0 0 100 70"
                    className="w-full h-auto max-h-[600px] transition-all duration-1000 ease-out"
                    style={{ 
                      filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
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
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
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
                    <rect x="0" y="0" width="100" height="70" fill="url(#worldGrad)" rx="8" />
                    
                    {/* Glowing Grid */}
                    <g opacity="0.1">
                      {[...Array(20)].map((_, i) => (
                        <line key={`v${i}`} x1={i * 5} y1="0" x2={i * 5} y2="70" stroke="#3b82f6" strokeWidth="0.2" />
                      ))}
                      {[...Array(14)].map((_, i) => (
                        <line key={`h${i}`} x1="0" y1={i * 5} x2="100" y2={i * 5} stroke="#3b82f6" strokeWidth="0.2" />
                      ))}
                    </g>

                    {/* Animated continent outlines */}
                    <g opacity="0.3" className="animate-pulse">
                      <path d="M5 8 L30 8 L32 15 L30 30 L25 32 L8 30 L5 20 Z" 
                            fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2,2">
                        <animate attributeName="stroke-dashoffset" values="0;4;0" dur="3s" repeatCount="indefinite" />
                      </path>
                      <path d="M55 10 L95 10 L95 20 L90 35 L85 40 L70 38 L60 32 L55 25 Z" 
                            fill="none" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2,2">
                        <animate attributeName="stroke-dashoffset" values="0;4;0" dur="4s" repeatCount="indefinite" />
                      </path>
                    </g>

                    {/* Enhanced Country Points with Animations */}
                    {filteredCountries.map((country, index) => {
                      const isTop = topDestinations.includes(country.id)
                      const color = continentColors[country.continent as keyof typeof continentColors] || '#64748b'
                      const isHovered = hoveredCountry?.id === country.id
                      
                      return (
                        <g key={country.id} className="cursor-pointer">
                          <Dialog>
                            <DialogTrigger asChild>
                              <g>
                                {/* Animated ripple effect */}
                                {animationStarted && (
                                  <circle
                                    cx={country.coordinates.x}
                                    cy={country.coordinates.y}
                                    r="8"
                                    fill={color}
                                    opacity="0.2"
                                    className="animate-ping"
                                    style={{
                                      animationDelay: `${index * 0.1}s`,
                                      animationDuration: '2s'
                                    }}
                                  />
                                )}

                                {/* Glow effect for top destinations */}
                                {isTop && (
                                  <circle
                                    cx={country.coordinates.x}
                                    cy={country.coordinates.y}
                                    r="6"
                                    fill={color}
                                    opacity="0.4"
                                    filter="url(#glow)"
                                    className="animate-pulse"
                                  />
                                )}

                                {/* Main point */}
                                <circle
                                  cx={country.coordinates.x}
                                  cy={country.coordinates.y}
                                  r={isTop ? "4" : "3"}
                                  fill={color}
                                  stroke="#ffffff"
                                  strokeWidth={isHovered ? "2" : "1"}
                                  className="transition-all duration-300 hover:scale-150"
                                  onMouseEnter={() => setHoveredCountry(country)}
                                  onMouseLeave={() => setHoveredCountry(null)}
                                  onClick={() => setSelectedCountry(country)}
                                  style={{
                                    transform: animationStarted ? 'scale(1)' : 'scale(0)',
                                    transition: `transform 0.6s ease-out ${index * 0.05}s`,
                                    transformOrigin: `${country.coordinates.x}px ${country.coordinates.y}px`
                                  }}
                                />

                                {/* Country label with better positioning */}
                                <text
                                  x={country.coordinates.x}
                                  y={country.coordinates.y - 6}
                                  textAnchor="middle"
                                  className="text-xs font-semibold fill-white pointer-events-none"
                                  style={{ 
                                    fontSize: isTop ? '0.8rem' : '0.6rem',
                                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))'
                                  }}
                                >
                                  {country.name}
                                </text>

                                {/* Top destination badge */}
                                {isTop && (
                                  <circle
                                    cx={country.coordinates.x + 5}
                                    cy={country.coordinates.y - 5}
                                    r="2"
                                    fill="#fbbf24"
                                    stroke="#ffffff"
                                    strokeWidth="0.5"
                                  />
                                )}
                              </g>
                            </DialogTrigger>
                            
                            {/* Enhanced Modal */}
                            <DialogContent className="max-w-4xl bg-slate-900 border-slate-700 text-white">
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
                                        <Badge className="bg-yellow-500 text-black">
                                          <Icon name="Star" size={12} className="mr-1" />
                                          ТОП
                                        </Badge>
                                      )}
                                      <Badge variant="outline" className="border-slate-600 text-slate-300">
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
                                      <Icon name="MapPin" size={20} className="text-blue-400" />
                                      Популярные направления
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                      {country.popularDestinations.map((destination, i) => (
                                        <div key={i} className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg">
                                          <Icon name="Compass" size={16} className="text-blue-400" />
                                          <span className="text-sm">{destination}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-800 rounded-lg">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Icon name="Cloud" size={16} className="text-blue-400" />
                                        <span className="text-sm font-medium text-slate-300">Климат</span>
                                      </div>
                                      <p className="text-sm">{country.climate}</p>
                                    </div>
                                    <div className="p-4 bg-slate-800 rounded-lg">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Icon name="Calendar" size={16} className="text-green-400" />
                                        <span className="text-sm font-medium text-slate-300">Лучшее время</span>
                                      </div>
                                      <p className="text-sm">{country.bestTime}</p>
                                    </div>
                                    <div className="p-4 bg-slate-800 rounded-lg">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Icon name="DollarSign" size={16} className="text-yellow-400" />
                                        <span className="text-sm font-medium text-slate-300">Валюта</span>
                                      </div>
                                      <p className="text-sm">{country.currency}</p>
                                    </div>
                                    <div className="p-4 bg-slate-800 rounded-lg">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Icon name="Globe" size={16} className="text-purple-400" />
                                        <span className="text-sm font-medium text-slate-300">Язык</span>
                                      </div>
                                      <p className="text-sm">{country.language}</p>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                                    <div className="flex items-center gap-2">
                                      <Icon name={country.visaRequired ? "AlertCircle" : "CheckCircle"} 
                                            size={20} 
                                            className={country.visaRequired ? "text-orange-400" : "text-green-400"} />
                                      <span className="font-medium">
                                        {country.visaRequired ? "Виза требуется" : "Безвизовый въезд"}
                                      </span>
                                    </div>
                                  </div>

                                  <Button size="lg" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
                                    <Icon name="Plane" size={20} className="mr-2" />
                                    Планировать путешествие
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </g>
                      )
                    })}

                    {/* Enhanced Legend */}
                    <g transform="translate(5, 55)">
                      <rect x="0" y="0" width="35" height="12" fill="rgba(0,0,0,0.8)" rx="6" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                      <circle cx="4" cy="6" r="2" fill="#3b82f6" />
                      <text x="8" y="7" className="text-xs fill-white font-medium">Страны для путешествий</text>
                      <circle cx="4" cy="9" r="1.5" fill="#fbbf24" />
                      <text x="8" y="10" className="text-xs fill-white">ТОП направления</text>
                    </g>
                  </svg>
                </div>

                {/* Floating Info Card */}
                {hoveredCountry && (
                  <div className="fixed top-20 right-6 z-50 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-2xl min-w-80 animate-in slide-in-from-right-5 duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{hoveredCountry.flag}</span>
                      <div>
                        <h4 className="text-xl font-bold text-white">{hoveredCountry.name}</h4>
                        <p className="text-slate-400">{hoveredCountry.continent}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Icon name="MapPin" size={16} className="text-blue-400" />
                        <span className="text-sm text-slate-300">{hoveredCountry.destinations} направлений</span>
                      </div>
                      <p className="text-sm text-slate-300 line-clamp-3">
                        {hoveredCountry.description}
                      </p>
                      {topDestinations.includes(hoveredCountry.id) && (
                        <Badge className="bg-yellow-500 text-black text-xs">
                          <Icon name="Star" size={12} className="mr-1" />
                          Популярное направление
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Countries List Tab */}
            <TabsContent value="list" className="space-y-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCountries.map((country) => (
                    <Dialog key={`list-${country.id}`}>
                      <DialogTrigger asChild>
                        <Card className="cursor-pointer hover:scale-105 transition-all duration-300 bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10">
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
                                <Badge className="bg-yellow-500 text-black text-xs">
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
                              <Icon name="ArrowRight" size={16} className="text-blue-400" />
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      {/* Same dialog content as map */}
                    </Dialog>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Statistics Tab */}
            <TabsContent value="stats" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Icon name="BarChart3" size={20} className="text-blue-400" />
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
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            {count} стран
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Icon name="Star" size={20} className="text-yellow-400" />
                      ТОП направления
                    </h3>
                    <div className="space-y-3">
                      {filteredCountries
                        .filter(country => topDestinations.includes(country.id))
                        .map((country) => (
                          <div key={country.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
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
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-4">Готов к путешествию?</h3>
            <p className="text-slate-300 mb-6">
              Выбери страну на карте и начни планировать свое следующее приключение
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
              <Icon name="Plane" size={20} className="mr-2" />
              Начать планирование
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}