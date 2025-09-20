import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import Icon from '@/components/ui/icon'
import { allCountries, type Country } from '@/data/countries'

// Оптимальные координаты с максимальным разделением стран
const improvedCountries: Country[] = [
  // Европа - левый верх
  {
    ...allCountries.find(c => c.id === 'iceland')!,
    coordinates: { x: 5, y: 5 }
  },
  {
    ...allCountries.find(c => c.id === 'norway')!,
    coordinates: { x: 15, y: 8 }
  },
  {
    ...allCountries.find(c => c.id === 'germany')!,
    coordinates: { x: 17, y: 13 }
  },
  {
    ...allCountries.find(c => c.id === 'switzerland')!,
    coordinates: { x: 16, y: 17 }
  },
  {
    ...allCountries.find(c => c.id === 'france')!,
    coordinates: { x: 12, y: 19 }
  },
  {
    ...allCountries.find(c => c.id === 'spain')!,
    coordinates: { x: 8, y: 23 }
  },
  {
    ...allCountries.find(c => c.id === 'italy')!,
    coordinates: { x: 19, y: 22 }
  },
  {
    ...allCountries.find(c => c.id === 'greece')!,
    coordinates: { x: 23, y: 26 }
  },

  // Азия - центр и правый верх (больше разброс)
  {
    ...allCountries.find(c => c.id === 'china')!,
    coordinates: { x: 72, y: 15 }
  },
  {
    ...allCountries.find(c => c.id === 'japan')!,
    coordinates: { x: 87, y: 18 }
  },
  {
    ...allCountries.find(c => c.id === 'southkorea')!,
    coordinates: { x: 82, y: 22 }
  },
  {
    ...allCountries.find(c => c.id === 'india')!,
    coordinates: { x: 60, y: 28 }
  },
  {
    ...allCountries.find(c => c.id === 'thailand')!,
    coordinates: { x: 68, y: 32 }
  },
  {
    ...allCountries.find(c => c.id === 'maldives')!,
    coordinates: { x: 58, y: 40 }
  },

  // Африка - центральная левая область
  {
    ...allCountries.find(c => c.id === 'morocco')!,
    coordinates: { x: 6, y: 32 }
  },
  {
    ...allCountries.find(c => c.id === 'egypt')!,
    coordinates: { x: 27, y: 35 }
  },
  {
    ...allCountries.find(c => c.id === 'kenya')!,
    coordinates: { x: 30, y: 45 }
  },
  {
    ...allCountries.find(c => c.id === 'southafrica')!,
    coordinates: { x: 24, y: 58 }
  },

  // Северная Америка - левая центральная область
  {
    ...allCountries.find(c => c.id === 'canada')!,
    coordinates: { x: 38, y: 12 }
  },
  {
    ...allCountries.find(c => c.id === 'usa')!,
    coordinates: { x: 42, y: 22 }
  },
  {
    ...allCountries.find(c => c.id === 'mexico')!,
    coordinates: { x: 38, y: 32 }
  },

  // Южная Америка - левая нижняя область
  {
    ...allCountries.find(c => c.id === 'peru')!,
    coordinates: { x: 44, y: 42 }
  },
  {
    ...allCountries.find(c => c.id === 'brazil')!,
    coordinates: { x: 48, y: 48 }
  },
  {
    ...allCountries.find(c => c.id === 'argentina')!,
    coordinates: { x: 46, y: 55 }
  },
  {
    ...allCountries.find(c => c.id === 'chile')!,
    coordinates: { x: 42, y: 60 }
  },

  // Океания - правая нижняя область
  {
    ...allCountries.find(c => c.id === 'fiji')!,
    coordinates: { x: 92, y: 42 }
  },
  {
    ...allCountries.find(c => c.id === 'australia')!,
    coordinates: { x: 78, y: 52 }
  },
  {
    ...allCountries.find(c => c.id === 'newzealand')!,
    coordinates: { x: 85, y: 60 }
  }
]

export default function ImprovedWorldMap() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null)
  const [filterContinent, setFilterContinent] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const continents = ['Все', 'Европа', 'Азия', 'Африка', 'Северная Америка', 'Южная Америка', 'Океания']
  const categories = ['Все', 'Горы', 'Пляжи', 'Города', 'Природа', 'История', 'Культура']

  const filteredCountries = improvedCountries.filter(country => {
    const matchesContinent = filterContinent === 'all' || filterContinent === 'Все' || country.continent === filterContinent
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         country.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesContinent && matchesSearch
  })

  const filteredGridCountries = allCountries.filter(country => {
    const matchesContinent = filterContinent === 'all' || filterContinent === 'Все' || country.continent === filterContinent
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         country.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesContinent && matchesSearch
  })

  return (
    <div className="bg-background">
      {/* Enhanced Header */}
      <section className="py-12 px-4 bg-gradient-to-b from-vintage-gold/10 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Icon name="Globe" size={40} className="text-vintage-gold" />
              Интерактивная карта мира
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Исследуйте {allCountries.length}+ стран мира. Кликните на точку или выберите из списка ниже
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-8">
            <div className="flex-1">
              <Input
                placeholder="Поиск стран..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filterContinent} onValueChange={setFilterContinent}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Континент" />
              </SelectTrigger>
              <SelectContent>
                {continents.map((continent) => (
                  <SelectItem key={continent} value={continent === 'Все' ? 'all' : continent}>
                    {continent}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Тип путешествия" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category === 'Все' ? 'all' : category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{filteredGridCountries.length}</div>
              <div className="text-sm text-muted-foreground">Стран</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-vintage-gold">7</div>
              <div className="text-sm text-muted-foreground">Континентов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-adventure-teal">500+</div>
              <div className="text-sm text-muted-foreground">Направлений</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-map-brown">195</div>
              <div className="text-sm text-muted-foreground">Всего стран</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Interactive World Map */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="relative max-w-6xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-adventure-teal/10 via-parchment/20 to-vintage-gold/10 rounded-3xl p-8 border-2 border-vintage-gold/20 shadow-2xl">
              <svg
                viewBox="0 0 100 70"
                className="w-full h-auto max-h-[600px]"
                style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))' }}
              >
                {/* Enhanced Continents Background with Gradients */}
                <defs>
                  <linearGradient id="europeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#8b4513" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="asiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2f4f4f" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#d4af37" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="africaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b4513" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#2f4f4f" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* World Background */}
                <rect x="0" y="0" width="100" height="70" fill="#f5e6d3" opacity="0.2" rx="3" />
                
                {/* Enhanced continent shapes */}
                {/* Europe */}
                <path d="M5 5 L25 5 L28 12 L25 25 L20 28 L8 25 L5 18 Z" fill="url(#europeGrad)" stroke="#d4af37" strokeWidth="0.2" opacity="0.6" />
                <text x="15" y="16" textAnchor="middle" className="text-xs font-medium fill-map-brown opacity-60">ЕВРОПА</text>
                
                {/* Asia */}
                <path d="M55 8 L95 8 L95 15 L88 25 L85 35 L78 38 L70 35 L65 30 L60 25 L55 20 Z" fill="url(#asiaGrad)" stroke="#2f4f4f" strokeWidth="0.2" opacity="0.6" />
                <text x="75" y="22" textAnchor="middle" className="text-xs font-medium fill-adventure-teal opacity-60">АЗИЯ</text>
                
                {/* Africa */}
                <path d="M8 28 L28 28 L32 35 L30 45 L28 58 L22 62 L15 60 L10 55 L8 45 Z" fill="url(#africaGrad)" stroke="#8b4513" strokeWidth="0.2" opacity="0.6" />
                <text x="20" y="45" textAnchor="middle" className="text-xs font-medium fill-map-brown opacity-60">АФРИКА</text>
                
                {/* North America */}
                <path d="M25 10 L45 10 L48 18 L45 30 L40 38 L35 40 L30 35 L25 25 Z" fill="url(#europeGrad)" stroke="#d4af37" strokeWidth="0.2" opacity="0.6" />
                <text x="35" y="25" textAnchor="middle" className="text-xs font-medium fill-vintage-gold opacity-60">С. АМЕРИКА</text>
                
                {/* South America */}
                <path d="M30 40 L45 40 L48 48 L45 60 L42 68 L38 70 L35 68 L32 60 L30 50 Z" fill="url(#africaGrad)" stroke="#8b4513" strokeWidth="0.2" opacity="0.6" />
                <text x="38" y="55" textAnchor="middle" className="text-xs font-medium fill-map-brown opacity-60">Ю. АМЕРИКА</text>
                
                {/* Oceania */}
                <path d="M75 45 L95 45 L95 65 L85 68 L75 65 Z" fill="url(#asiaGrad)" stroke="#2f4f4f" strokeWidth="0.2" opacity="0.6" />
                <text x="85" y="56" textAnchor="middle" className="text-xs font-medium fill-adventure-teal opacity-60">ОКЕАНИЯ</text>

                {/* Enhanced Country Points */}
                {filteredCountries.map((country) => (
                  <g key={country.id}>
                    <Dialog>
                      <DialogTrigger asChild>
                        <g className="cursor-pointer">
                          {/* Glow effect */}
                          <circle
                            cx={country.coordinates.x}
                            cy={country.coordinates.y}
                            r="4"
                            fill={hoveredCountry?.id === country.id ? '#d4af37' : '#8b4513'}
                            opacity="0.3"
                            className="animate-pulse"
                          />
                          {/* Main point */}
                          <circle
                            cx={country.coordinates.x}
                            cy={country.coordinates.y}
                            r="2.5"
                            className="transition-all duration-500 hover:r-4"
                            fill={hoveredCountry?.id === country.id ? '#d4af37' : '#8b4513'}
                            stroke="#fff"
                            strokeWidth="1"
                            onMouseEnter={() => setHoveredCountry(country)}
                            onMouseLeave={() => setHoveredCountry(null)}
                            onClick={() => setSelectedCountry(country)}
                          />
                          {/* Hover ring */}
                          {hoveredCountry?.id === country.id && (
                            <circle
                              cx={country.coordinates.x}
                              cy={country.coordinates.y}
                              r="6"
                              fill="none"
                              stroke="#d4af37"
                              strokeWidth="0.5"
                              opacity="0.7"
                              className="animate-ping"
                            />
                          )}
                        </g>
                      </DialogTrigger>
                      
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl flex items-center gap-3">
                            <span className="text-3xl">{country.flag}</span>
                            {country.name}
                            <Badge variant="secondary" className="ml-2 bg-vintage-gold text-charcoal">
                              {country.destinations} мест
                            </Badge>
                          </DialogTitle>
                          <DialogDescription className="text-lg">
                            {country.continent} • {country.description}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Icon name="MapPin" size={16} />
                                Популярные направления
                              </h4>
                              <div className="space-y-2">
                                {country.popularDestinations.map((destination, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <Icon name="Compass" size={14} className="text-vintage-gold" />
                                    <span className="text-sm">{destination}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h5 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-1">
                                  <Icon name="Cloud" size={12} />
                                  Климат
                                </h5>
                                <p className="text-sm">{country.climate}</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-1">
                                  <Icon name="Calendar" size={12} />
                                  Лучшее время
                                </h5>
                                <p className="text-sm">{country.bestTime}</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-1">
                                  <Icon name="DollarSign" size={12} />
                                  Валюта
                                </h5>
                                <p className="text-sm">{country.currency}</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-1">
                                  <Icon name="Globe" size={12} />
                                  Язык
                                </h5>
                                <p className="text-sm">{country.language}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-2">
                              <Icon name={country.visaRequired ? "AlertCircle" : "CheckCircle"} 
                                    size={16} 
                                    className={country.visaRequired ? "text-orange-500" : "text-green-500"} />
                              <span className="text-sm">
                                {country.visaRequired ? "Виза требуется" : "Безвизовый въезд"}
                              </span>
                            </div>
                            <Button size="sm" className="bg-vintage-gold hover:bg-vintage-gold/90 text-charcoal">
                              <Icon name="Plane" size={16} className="mr-2" />
                              Планировать поездку
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Enhanced Country Labels with better positioning */}
                    <text
                      x={country.coordinates.x}
                      y={country.coordinates.y - 4}
                      textAnchor="middle"
                      className="text-xs font-medium pointer-events-none fill-charcoal"
                      style={{ fontSize: '0.6rem' }}
                    >
                      {country.name}
                    </text>
                  </g>
                ))}

                {/* Enhanced Legend */}
                <g transform="translate(5, 60)">
                  <rect x="0" y="0" width="30" height="8" fill="#fff" opacity="0.95" rx="2" stroke="#d4af37" strokeWidth="0.2" />
                  <circle cx="3" cy="4" r="1.5" fill="#8b4513" />
                  <text x="7" y="5" className="text-xs fill-charcoal">Страны для путешествий</text>
                </g>
              </svg>
            </div>

            {/* Enhanced Hover Info */}
            {hoveredCountry && (
              <div className="absolute top-6 right-6 bg-card/95 backdrop-blur-sm border border-vintage-gold/30 rounded-xl p-4 shadow-xl min-w-64">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{hoveredCountry.flag}</span>
                  <div>
                    <h4 className="font-semibold text-lg">{hoveredCountry.name}</h4>
                    <p className="text-sm text-muted-foreground">{hoveredCountry.continent}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    {hoveredCountry.destinations} направлений
                  </Badge>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {hoveredCountry.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Countries Grid */}
      <section className="py-8 px-4 bg-gradient-to-b from-background to-parchment/10">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2">Все страны мира</h3>
            <p className="text-muted-foreground">
              {filteredGridCountries.length} стран {filterContinent !== 'all' && filterContinent !== 'Все' ? `в регионе "${filterContinent}"` : 'доступно для изучения'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGridCountries.map((country) => (
              <Dialog key={`card-${country.id}`}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-vintage-gold/40">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-base">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{country.flag}</span>
                          <div>
                            <h3 className="text-sm font-semibold">{country.name}</h3>
                            <p className="text-xs text-muted-foreground font-normal">
                              {country.continent}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {country.destinations}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {country.description}
                      </p>
                      <div className="flex items-center text-xs text-primary">
                        <Icon name="MousePointer" size={12} className="mr-1" />
                        Подробнее
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                
                {/* Same dialog content as in map */}
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-3">
                      <span className="text-3xl">{country.flag}</span>
                      {country.name}
                      <Badge variant="secondary" className="ml-2 bg-vintage-gold text-charcoal">
                        {country.destinations} мест
                      </Badge>
                    </DialogTitle>
                    <DialogDescription className="text-lg">
                      {country.continent} • {country.description}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Icon name="MapPin" size={16} />
                          Популярные направления
                        </h4>
                        <div className="space-y-2">
                          {country.popularDestinations.map((destination, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Icon name="Compass" size={14} className="text-vintage-gold" />
                              <span className="text-sm">{destination}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-1">
                            <Icon name="Cloud" size={12} />
                            Климат
                          </h5>
                          <p className="text-sm">{country.climate}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-1">
                            <Icon name="Calendar" size={12} />
                            Лучшее время
                          </h5>
                          <p className="text-sm">{country.bestTime}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-1">
                            <Icon name="DollarSign" size={12} />
                            Валюта
                          </h5>
                          <p className="text-sm">{country.currency}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-1">
                            <Icon name="Globe" size={12} />
                            Язык
                          </h5>
                          <p className="text-sm">{country.language}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Icon name={country.visaRequired ? "AlertCircle" : "CheckCircle"} 
                              size={16} 
                              className={country.visaRequired ? "text-orange-500" : "text-green-500"} />
                        <span className="text-sm">
                          {country.visaRequired ? "Виза требуется" : "Безвизовый въезд"}
                        </span>
                      </div>
                      <Button size="sm" className="bg-vintage-gold hover:bg-vintage-gold/90 text-charcoal">
                        <Icon name="Plane" size={16} className="mr-2" />
                        Планировать поездку
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}