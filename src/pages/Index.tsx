import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Icon from '@/components/ui/icon'
import WorldMap from '@/components/WorldMap'
import About from '@/components/About'

interface Destination {
  id: string
  name: string
  country: string
  description: string
  image: string
  category: string
  highlights: string[]
  climate: string
  bestTime: string
  activities: string[]
  culture: string
  history: string
  cuisine: string[]
  transportation: string
  accommodation: string[]
  budget: string
  language: string
  currency: string
  safety: string
  tips: string[]
}

const destinations: Destination[] = [
  {
    id: '1',
    name: 'Альпийские пики',
    country: 'Швейцария',
    description: 'Захватывающие горные вершины с кристально чистым воздухом и панорамными видами',
    image: '/img/33a06e67-6498-4583-acaa-3a325092b355.jpg',
    category: 'Горы',
    highlights: ['Маттерхорн', 'Юнгфрауйох', 'Церматт', 'Гриндельвальд'],
    climate: 'Альпийский континентальный климат с холодными зимами и прохладным летом',
    bestTime: 'Июнь-сентябрь для походов, декабрь-март для лыжного спорта',
    activities: ['Горные походы', 'Лыжный спорт', 'Альпинизм', 'Фотография', 'Канатные дороги'],
    culture: 'Смесь немецкой, французской и итальянской культур с богатыми традициями',
    history: 'История насчитывает тысячи лет, от кельтских племен до современной конфедерации',
    cuisine: ['Фондю', 'Раклет', 'Рёшти', 'Швейцарский шоколад', 'Альпийские сыры'],
    transportation: 'Отличная железнодорожная сеть, канатные дороги, автобусы',
    accommodation: ['Горные шале', 'Отели класса люкс', 'Хостелы', 'Кемпинги'],
    budget: '200-500$ в день (высокие цены)',
    language: 'Немецкий, французский, итальянский, ретороманский',
    currency: 'Швейцарский франк (CHF)',
    safety: 'Очень высокий уровень безопасности',
    tips: ['Покупайте Swiss Travel Pass', 'Бронируйте жилье заранее', 'Берите теплую одежду']
  },
  {
    id: '2',
    name: 'Тропический рай',
    country: 'Мальдивы',
    description: 'Кристально чистые воды и белоснежные пляжи в окружении коралловых рифов',
    image: '/img/ad2cac84-6f93-467d-a433-dbc81ec96038.jpg',
    category: 'Пляж',
    highlights: ['Атолл Северный Мале', 'Атолл Ари', 'Баа атолл', 'Подводные рестораны'],
    climate: 'Тропический муссонный климат с постоянно теплой температурой',
    bestTime: 'Ноябрь-апрель (сухой сезон)',
    activities: ['Дайвинг', 'Снорклинг', 'Рыбалка', 'СПА', 'Водные виды спорта'],
    culture: 'Исламская культура с влиянием индийских и арабских традиций',
    history: 'Древняя история мореплавания, влияние буддизма и ислама',
    cuisine: ['Рыбное карри', 'Роши', 'Масхуни', 'Тропические фрукты', 'Кокосовые блюда'],
    transportation: 'Гидросамолеты, скоростные катера между островами',
    accommodation: ['Роскошные резорты', 'Бунгало на воде', 'Гостевые дома'],
    budget: '300-2000$ в день (роскошное направление)',
    language: 'Дивехи, английский',
    currency: 'Мальдивская руфия (MVR), принимается USD',
    safety: 'Высокий уровень безопасности на курортах',
    tips: ['Уважайте местные традиции', 'Алкоголь только на курортах', 'Защита от солнца']
  }
]

export default function Index() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [activeSection, setActiveSection] = useState<string>('home')

  if (activeSection === 'map') {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Compass" size={28} className="text-vintage-gold" />
                <h1 className="text-2xl font-bold text-foreground">Странник</h1>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <button 
                  onClick={() => setActiveSection('home')} 
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Главная
                </button>
                <button 
                  onClick={() => setActiveSection('map')} 
                  className="text-primary transition-colors"
                >
                  Карта
                </button>
                <a href="#" className="text-foreground hover:text-primary transition-colors">Страны</a>
                <button 
                  onClick={() => setActiveSection('about')} 
                  className="text-foreground hover:text-primary transition-colors"
                >
                  О проекте
                </button>
              </div>
              <Button variant="outline" size="sm">
                <Icon name="Route" size={16} className="mr-2" />
                Мой маршрут
              </Button>
            </div>
          </div>
        </nav>
        <WorldMap />
      </div>
    )
  }

  if (activeSection === 'about') {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Compass" size={28} className="text-vintage-gold" />
                <h1 className="text-2xl font-bold text-foreground">Странник</h1>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <button 
                  onClick={() => setActiveSection('home')} 
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Главная
                </button>
                <button 
                  onClick={() => setActiveSection('map')} 
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Карта
                </button>
                <a href="#" className="text-foreground hover:text-primary transition-colors">Страны</a>
                <button 
                  onClick={() => setActiveSection('about')} 
                  className="text-primary transition-colors"
                >
                  О проекте
                </button>
              </div>
              <Button variant="outline" size="sm">
                <Icon name="Route" size={16} className="mr-2" />
                Мой маршрут
              </Button>
            </div>
          </div>
        </nav>
        <About />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Compass" size={28} className="text-vintage-gold" />
              <h1 className="text-2xl font-bold text-foreground">Странник</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => setActiveSection('home')} 
                className="text-primary transition-colors"
              >
                Главная
              </button>
              <button 
                onClick={() => setActiveSection('map')} 
                className="text-foreground hover:text-primary transition-colors"
              >
                Карта
              </button>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Страны</a>
              <button 
                onClick={() => setActiveSection('about')} 
                className="text-foreground hover:text-primary transition-colors"
              >
                О проекте
              </button>
            </div>
            <Button variant="outline" size="sm">
              <Icon name="Route" size={16} className="mr-2" />
              Мой маршрут
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/img/c3564582-71b0-4438-9415-5e1c70f4bb2e.jpg)' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            ПУТЕШЕСТВИЯ<br />
            <span className="text-vintage-gold">ПРИКЛЮЧЕНИЯ</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Открывайте мир через интерактивные истории мест
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-vintage-gold hover:bg-vintage-gold/90 text-charcoal"
              onClick={() => setActiveSection('map')}
            >
              <Icon name="Map" size={20} className="mr-2" />
              Исследовать карту
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal">
              <Icon name="Compass" size={20} className="mr-2" />
              Начать путешествие
            </Button>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Популярные направления</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Кликните на любое место, чтобы узнать его детальную историю, культуру и секреты
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Dialog key={destination.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-vintage-gold text-charcoal">
                          {destination.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {destination.name}
                        <Icon name="MapPin" size={20} className="text-vintage-gold" />
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {destination.country}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{destination.description}</p>
                      <div className="flex items-center text-sm text-primary">
                        <Icon name="Info" size={16} className="mr-2" />
                        Узнать подробности
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                      <Icon name="MapPin" size={24} className="text-vintage-gold" />
                      {destination.name}, {destination.country}
                    </DialogTitle>
                    <DialogDescription>
                      Полная информация о направлении из множества источников
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />

                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Обзор</TabsTrigger>
                        <TabsTrigger value="culture">Культура</TabsTrigger>
                        <TabsTrigger value="practical">Практично</TabsTrigger>
                        <TabsTrigger value="tips">Советы</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Описание</h4>
                          <p className="text-muted-foreground">{destination.description}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Icon name="Star" size={16} />
                            Основные достопримечательности
                          </h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {destination.highlights.map((highlight, index) => (
                              <li key={index} className="text-muted-foreground">{highlight}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Icon name="Activity" size={16} />
                            Активности
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {destination.activities.map((activity, index) => (
                              <Badge key={index} variant="outline">{activity}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Icon name="Cloud" size={16} />
                              Климат
                            </h4>
                            <p className="text-sm text-muted-foreground">{destination.climate}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Icon name="Calendar" size={16} />
                              Лучшее время
                            </h4>
                            <p className="text-sm text-muted-foreground">{destination.bestTime}</p>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="culture" className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Icon name="Users" size={16} />
                            Культура
                          </h4>
                          <p className="text-muted-foreground">{destination.culture}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Icon name="BookOpen" size={16} />
                            История
                          </h4>
                          <p className="text-muted-foreground">{destination.history}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Icon name="ChefHat" size={16} />
                            Кухня
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {destination.cuisine.map((dish, index) => (
                              <Badge key={index} variant="secondary">{dish}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Icon name="Globe" size={16} />
                              Язык
                            </h4>
                            <p className="text-sm text-muted-foreground">{destination.language}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Icon name="DollarSign" size={16} />
                              Валюта
                            </h4>
                            <p className="text-sm text-muted-foreground">{destination.currency}</p>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="practical" className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Icon name="Car" size={16} />
                            Транспорт
                          </h4>
                          <p className="text-muted-foreground">{destination.transportation}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Icon name="Home" size={16} />
                            Размещение
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {destination.accommodation.map((type, index) => (
                              <Badge key={index} variant="outline">{type}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Icon name="CreditCard" size={16} />
                              Бюджет
                            </h4>
                            <p className="text-sm text-muted-foreground">{destination.budget}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Icon name="Shield" size={16} />
                              Безопасность
                            </h4>
                            <p className="text-sm text-muted-foreground">{destination.safety}</p>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="tips" className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Icon name="Lightbulb" size={16} />
                            Полезные советы
                          </h4>
                          <ul className="space-y-2">
                            {destination.tips.map((tip, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Icon name="CheckCircle" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-adventure-teal to-map-brown text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Создайте свой маршрут</h2>
          <p className="text-xl mb-8 opacity-90">
            Планируйте и сохраняйте персональные туристические маршруты
          </p>
          <Button size="lg" className="bg-vintage-gold hover:bg-vintage-gold/90 text-charcoal">
            <Icon name="MapPin" size={20} className="mr-2" />
            Начать планирование
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Compass" size={24} className="text-vintage-gold" />
            <span className="text-xl font-semibold">Странник</span>
          </div>
          <p className="text-muted-foreground">
            Откройте мир через интерактивные путешествия • 2024
          </p>
        </div>
      </footer>
    </div>
  )
}