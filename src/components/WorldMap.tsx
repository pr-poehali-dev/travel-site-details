import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Icon from '@/components/ui/icon'
import { allCountries, type Country } from '@/data/countries'

const countries = allCountries.slice(0, 15) // Показываем первые 15 стран для лучшей производительности

const allCountriesForGrid: Country[] = [
  {
    id: 'switzerland',
    name: 'Швейцария',
    nameEn: 'Switzerland',
    continent: 'Европа',
    destinations: 15,
    flag: '🇨🇭',
    description: 'Альпийская страна с величественными горами, кристальными озерами и богатой культурой',
    coordinates: { x: 48, y: 28 },
    popularDestinations: ['Церматт', 'Интерлакен', 'Юнгфрауйох', 'Женева', 'Цюрих'],
    climate: 'Континентальный альпийский',
    bestTime: 'Июнь-сентябрь, декабрь-март',
    currency: 'Швейцарский франк (CHF)',
    language: 'Немецкий, французский, итальянский',
    visaRequired: true
  },
  {
    id: 'maldives',
    name: 'Мальдивы',
    nameEn: 'Maldives',
    continent: 'Азия',
    destinations: 8,
    flag: '🇲🇻',
    description: 'Тропический рай с бирюзовыми лагунами и роскошными курортами на воде',
    coordinates: { x: 65, y: 58 },
    popularDestinations: ['Мале', 'Атолл Ари', 'Северный Мале', 'Баа атолл'],
    climate: 'Тропический муссонный',
    bestTime: 'Ноябрь-апрель',
    currency: 'Мальдивская руфия (MVR)',
    language: 'Дивехи, английский',
    visaRequired: false
  },
  {
    id: 'japan',
    name: 'Япония',
    nameEn: 'Japan',
    continent: 'Азия',
    destinations: 25,
    flag: '🇯🇵',
    description: 'Страна восходящего солнца с уникальной культурой, древними традициями и современными технологиями',
    coordinates: { x: 82, y: 35 },
    popularDestinations: ['Токио', 'Киото', 'Осака', 'Нара', 'Фудзияма'],
    climate: 'Субтропический и умеренный',
    bestTime: 'Март-май, сентябрь-ноябрь',
    currency: 'Японская иена (JPY)',
    language: 'Японский',
    visaRequired: true
  },
  {
    id: 'iceland',
    name: 'Исландия',
    nameEn: 'Iceland',
    continent: 'Европа',
    destinations: 12,
    flag: '🇮🇸',
    description: 'Остров огня и льда с гейзерами, водопадами и северным сиянием',
    coordinates: { x: 35, y: 18 },
    popularDestinations: ['Рейкьявик', 'Гейзер', 'Гульфосс', 'Голубая лагуна'],
    climate: 'Субарктический морской',
    bestTime: 'Июнь-август',
    currency: 'Исландская крона (ISK)',
    language: 'Исландский',
    visaRequired: true
  },
  {
    id: 'peru',
    name: 'Перу',
    nameEn: 'Peru',
    continent: 'Южная Америка',
    destinations: 18,
    flag: '🇵🇪',
    description: 'Земля древних инков с мистическим Мачу-Пикчу и богатой историей',
    coordinates: { x: 22, y: 65 },
    popularDestinations: ['Мачу-Пикчу', 'Куско', 'Лима', 'Пустыня Наска'],
    climate: 'Разнообразный: от тропического до горного',
    bestTime: 'Май-сентябрь',
    currency: 'Перуанский соль (PEN)',
    language: 'Испанский, кечуа',
    visaRequired: false
  },
  {
    id: 'egypt',
    name: 'Египет',
    nameEn: 'Egypt',
    continent: 'Африка',
    destinations: 20,
    flag: '🇪🇬',
    description: 'Колыбель древней цивилизации с пирамидами и сокровищами фараонов',
    coordinates: { x: 53, y: 48 },
    popularDestinations: ['Каир', 'Пирамиды Гизы', 'Луксор', 'Красное море'],
    climate: 'Сухой пустынный',
    bestTime: 'Октябрь-апрель',
    currency: 'Египетский фунт (EGP)',
    language: 'Арабский',
    visaRequired: true
  }
]

export default function WorldMap() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null)

  return (
    <div className="bg-background">
      {/* Map Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Карта мира</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Кликните на любую страну, чтобы узнать о ней больше и найти лучшие направления
            </p>
          </div>

          {/* Interactive World Map */}
          <div className="relative max-w-5xl mx-auto mb-12">
            <div className="bg-gradient-to-b from-adventure-teal/20 to-map-brown/20 rounded-2xl p-8 border-2 border-vintage-gold/30">
              <svg
                viewBox="0 0 100 60"
                className="w-full h-auto max-h-[500px]"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
              >
                {/* Continents Background */}
                <rect x="0" y="0" width="100" height="60" fill="#f5e6d3" opacity="0.3" rx="2" />
                
                {/* Simplified continent shapes */}
                {/* Europe */}
                <path d="M35 15 L55 15 L55 35 L35 35 Z" fill="#d4af37" opacity="0.2" />
                {/* Asia */}
                <path d="M55 10 L90 10 L90 45 L55 45 Z" fill="#8b4513" opacity="0.2" />
                {/* Africa */}
                <path d="M40 35 L60 35 L60 55 L40 55 Z" fill="#2f4f4f" opacity="0.2" />
                {/* North America */}
                <path d="M10 10 L35 10 L35 40 L10 40 Z" fill="#d4af37" opacity="0.2" />
                {/* South America */}
                <path d="M15 35 L35 35 L35 55 L15 55 Z" fill="#8b4513" opacity="0.2" />

                {/* Country Points */}
                {countries.map((country) => (
                  <g key={country.id}>
                    <Dialog>
                      <DialogTrigger asChild>
                        <circle
                          cx={country.coordinates.x}
                          cy={country.coordinates.y}
                          r="2"
                          className="cursor-pointer transition-all duration-300 hover:r-3"
                          fill={hoveredCountry?.id === country.id ? '#d4af37' : '#8b4513'}
                          stroke="#fff"
                          strokeWidth="0.5"
                          onMouseEnter={() => setHoveredCountry(country)}
                          onMouseLeave={() => setHoveredCountry(null)}
                          onClick={() => setSelectedCountry(country)}
                        />
                      </DialogTrigger>
                      
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl flex items-center gap-3">
                            <span className="text-3xl">{country.flag}</span>
                            {country.name}
                            <Badge variant="secondary" className="ml-2">
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
                                <h5 className="font-medium text-sm text-muted-foreground mb-1">Климат</h5>
                                <p className="text-sm">{country.climate}</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-sm text-muted-foreground mb-1">Лучшее время</h5>
                                <p className="text-sm">{country.bestTime}</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-sm text-muted-foreground mb-1">Валюта</h5>
                                <p className="text-sm">{country.currency}</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-sm text-muted-foreground mb-1">Язык</h5>
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

                    {/* Country Labels */}
                    <text
                      x={country.coordinates.x}
                      y={country.coordinates.y - 3}
                      textAnchor="middle"
                      className="text-xs font-medium pointer-events-none"
                      fill="#1a1a1a"
                    >
                      {country.name}
                    </text>
                  </g>
                ))}

                {/* Legend */}
                <g transform="translate(5, 50)">
                  <rect x="0" y="0" width="25" height="8" fill="#fff" opacity="0.9" rx="1" />
                  <circle cx="2" cy="2" r="1" fill="#8b4513" />
                  <text x="5" y="3" className="text-xs" fill="#1a1a1a">Направления</text>
                </g>
              </svg>
            </div>

            {/* Hover Info */}
            {hoveredCountry && (
              <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{hoveredCountry.flag}</span>
                  <div>
                    <h4 className="font-semibold">{hoveredCountry.name}</h4>
                    <p className="text-sm text-muted-foreground">{hoveredCountry.continent}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {hoveredCountry.destinations} направлений
                </Badge>
              </div>
            )}
          </div>

          {/* Countries Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCountries.map((country) => (
              <Dialog key={`card-${country.id}`}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{country.flag}</span>
                          <div>
                            <h3 className="text-lg">{country.name}</h3>
                            <p className="text-sm text-muted-foreground font-normal">
                              {country.continent}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {country.destinations}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {country.description}
                      </p>
                      <div className="flex items-center text-sm text-primary">
                        <Icon name="MousePointer" size={16} className="mr-2" />
                        Открыть детали
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-3">
                      <span className="text-3xl">{country.flag}</span>
                      {country.name}
                      <Badge variant="secondary" className="ml-2">
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
                          <h5 className="font-medium text-sm text-muted-foreground mb-1">Климат</h5>
                          <p className="text-sm">{country.climate}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm text-muted-foreground mb-1">Лучшее время</h5>
                          <p className="text-sm">{country.bestTime}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm text-muted-foreground mb-1">Валюта</h5>
                          <p className="text-sm">{country.currency}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm text-muted-foreground mb-1">Язык</h5>
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