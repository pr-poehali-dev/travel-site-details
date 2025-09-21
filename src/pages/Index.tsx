import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Icon from '@/components/ui/icon'
import ModernWorldMap from '@/components/ModernWorldMap'
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Navigation */}
        <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Icon name="Compass" size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">Странник</h1>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => setActiveSection('home')} 
                  className="text-white/80 hover:text-white transition-colors font-medium"
                >
                  Главная
                </button>
                <button 
                  onClick={() => setActiveSection('map')} 
                  className="text-blue-400 transition-colors font-medium"
                >
                  Карта
                </button>
                <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">Страны</a>
                <button 
                  onClick={() => setActiveSection('about')} 
                  className="text-white/80 hover:text-white transition-colors font-medium"
                >
                  О проекте
                </button>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white">
                <Icon name="Route" size={16} className="mr-2" />
                Мой маршрут
              </Button>
            </div>
          </div>
        </nav>
        <ModernWorldMap />
      </div>
    )
  }

  if (activeSection === 'about') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Navigation */}
        <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Icon name="Compass" size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">Странник</h1>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => setActiveSection('home')} 
                  className="text-white/80 hover:text-white transition-colors font-medium"
                >
                  Главная
                </button>
                <button 
                  onClick={() => setActiveSection('map')} 
                  className="text-white/80 hover:text-white transition-colors font-medium"
                >
                  Карта
                </button>
                <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">Страны</a>
                <button 
                  onClick={() => setActiveSection('about')} 
                  className="text-blue-400 transition-colors font-medium"
                >
                  О проекте
                </button>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Icon name="Compass" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Странник</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveSection('home')} 
                className="text-blue-400 transition-colors font-medium"
              >
                Главная
              </button>
              <button 
                onClick={() => setActiveSection('map')} 
                className="text-white/80 hover:text-white transition-colors font-medium"
              >
                Карта
              </button>
              <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">Страны</a>
              <button 
                onClick={() => setActiveSection('about')} 
                className="text-white/80 hover:text-white transition-colors font-medium"
              >
                О проекте
              </button>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white">
              <Icon name="Route" size={16} className="mr-2" />
              Мой маршрут
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: 'url(/img/c3564582-71b0-4438-9415-5e1c70f4bb2e.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-blue-300/40 rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white/90">Исследуй мир интерактивно</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ПУТЕШЕСТВИЯ
            </span><br />
            <span className="text-white">БЕЗ ГРАНИЦ</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-white/80 max-w-3xl mx-auto font-light">
            Откройте тайны планеты через интерактивную карту мира. 
            Каждая точка — это история, культура и приключение.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 h-14 px-8 text-lg font-semibold"
              onClick={() => setActiveSection('map')}
            >
              <Icon name="Map" size={24} className="mr-3" />
              Исследовать карту
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 h-14 px-8 text-lg font-semibold bg-white/5 backdrop-blur-sm"
            >
              <Icon name="Compass" size={24} className="mr-3" />
              Начать путешествие
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Популярные направления
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto font-light">
              Кликните на любое место, чтобы погрузиться в его уникальную атмосферу, 
              историю и культурные особенности
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {destinations.map((destination) => (
              <Dialog key={destination.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/10 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-6 right-6">
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                          {destination.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                        <p className="text-white/80 text-sm flex items-center">
                          <Icon name="MapPin" size={16} className="mr-2" />
                          {destination.country}
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-white/70 mb-4 line-clamp-2">{destination.description}</p>
                      <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                        <Icon name="ArrowRight" size={20} className="mr-2" />
                        <span className="font-medium">Узнать подробности</span>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-md border border-white/10">
                  <DialogHeader>
                    <DialogTitle className="text-3xl flex items-center gap-3 text-white">
                      <Icon name="MapPin" size={28} className="text-blue-400" />
                      {destination.name}, {destination.country}
                    </DialogTitle>
                    <DialogDescription className="text-white/70 text-lg">
                      Полная информация о направлении из множества источников
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-8">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-80 object-cover rounded-xl"
                    />

                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">Обзор</TabsTrigger>
                        <TabsTrigger value="culture" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">Культура</TabsTrigger>
                        <TabsTrigger value="practical" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">Практично</TabsTrigger>
                        <TabsTrigger value="tips" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">Советы</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-6 mt-8">
                        <div>
                          <h4 className="font-semibold mb-3 text-white text-lg">Описание</h4>
                          <p className="text-white/70">{destination.description}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-white text-lg">
                            <Icon name="Star" size={20} className="text-yellow-400" />
                            Основные достопримечательности
                          </h4>
                          <ul className="grid grid-cols-2 gap-2">
                            {destination.highlights.map((highlight, index) => (
                              <li key={index} className="text-white/70 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-white text-lg">
                            <Icon name="Activity" size={20} className="text-green-400" />
                            Активности
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {destination.activities.map((activity, index) => (
                              <Badge key={index} variant="outline" className="border-white/20 text-white/80 bg-white/5">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                              <Icon name="Cloud" size={20} className="text-blue-400" />
                              Климат
                            </h4>
                            <p className="text-white/70">{destination.climate}</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                              <Icon name="Calendar" size={20} className="text-purple-400" />
                              Лучшее время
                            </h4>
                            <p className="text-white/70">{destination.bestTime}</p>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="culture" className="space-y-6 mt-8">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-white text-lg">
                            <Icon name="Users" size={20} className="text-pink-400" />
                            Культура
                          </h4>
                          <p className="text-white/70">{destination.culture}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-white text-lg">
                            <Icon name="BookOpen" size={20} className="text-orange-400" />
                            История
                          </h4>
                          <p className="text-white/70">{destination.history}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-white text-lg">
                            <Icon name="ChefHat" size={20} className="text-red-400" />
                            Кухня
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {destination.cuisine.map((dish, index) => (
                              <Badge key={index} className="bg-red-500/20 text-red-300 border-red-500/30">
                                {dish}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                              <Icon name="Globe" size={20} className="text-blue-400" />
                              Язык
                            </h4>
                            <p className="text-white/70">{destination.language}</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                              <Icon name="DollarSign" size={20} className="text-green-400" />
                              Валюта
                            </h4>
                            <p className="text-white/70">{destination.currency}</p>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="practical" className="space-y-6 mt-8">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-white text-lg">
                            <Icon name="Car" size={20} className="text-blue-400" />
                            Транспорт
                          </h4>
                          <p className="text-white/70">{destination.transportation}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-white text-lg">
                            <Icon name="Home" size={20} className="text-purple-400" />
                            Размещение
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {destination.accommodation.map((type, index) => (
                              <Badge key={index} variant="outline" className="border-white/20 text-white/80 bg-white/5">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                              <Icon name="CreditCard" size={20} className="text-green-400" />
                              Бюджет
                            </h4>
                            <p className="text-white/70">{destination.budget}</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                              <Icon name="Shield" size={20} className="text-yellow-400" />
                              Безопасность
                            </h4>
                            <p className="text-white/70">{destination.safety}</p>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="tips" className="space-y-6 mt-8">
                        <div>
                          <h4 className="font-semibold mb-4 flex items-center gap-2 text-white text-lg">
                            <Icon name="Lightbulb" size={20} className="text-yellow-400" />
                            Полезные советы
                          </h4>
                          <ul className="space-y-3">
                            {destination.tips.map((tip, index) => (
                              <li key={index} className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
                                <Icon name="CheckCircle" size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-white/80">{tip}</span>
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Создайте свой маршрут
          </h2>
          <p className="text-xl mb-12 text-white/70 max-w-3xl mx-auto font-light">
            Планируйте и сохраняйте персональные туристические маршруты 
            с помощью интерактивных инструментов
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 h-14 px-8 text-lg font-semibold"
            onClick={() => window.open('https://www.utair.ru', '_blank')}
          >
            <Icon name="MapPin" size={24} className="mr-3" />
            Начать планирование
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Icon name="Compass" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Странник</span>
          </div>
          <p className="text-white/60 text-lg">
            Откройте мир через интерактивные путешествия • 2024
          </p>
        </div>
      </footer>
    </div>
  )
}