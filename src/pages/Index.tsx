import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import Icon from '@/components/ui/icon'
import ModernWorldMap from '@/components/ModernWorldMap'
import About from '@/components/About'
import AirlineAds from '@/components/AirlineAds'
import { Link } from 'react-router-dom'

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
    name: 'Стена и Земли За Стеной',
    country: 'Север Вестероса',
    description: 'Величественная Ледяная Стена высотой 700 футов, защищающая королевства от одичалых и Белых Ходоков',
    image: '/img/6930efc9-60b7-4e40-8cef-0658723a667f.jpg',
    category: 'Крепость',
    highlights: ['Чёрный Замок', 'Ледяная Стена', 'Башня Призраков', 'Лес Призраков'],
    climate: 'Суровый северный климат с долгими зимами и коротким летом',
    bestTime: 'Лето для путешествий, но помните: Зима близко!',
    activities: ['Дозор на Стене', 'Охота на одичалых', 'Изучение древних рун', 'Тренировки с мечом'],
    culture: 'Суровая культура Ночного Дозора, присяга на всю жизнь',
    history: 'Построена 8000 лет назад для защиты от Белых Ходоков',
    cuisine: ['Солёная говядина', 'Чёрный хлеб', 'Луковый суп', 'Эль Ночного Дозора'],
    transportation: 'Верхом на конях, пешие походы вдоль Стены',
    accommodation: ['Чёрный Замок', 'Сторожевые башни', 'Военные бараки'],
    budget: 'Бесплатно для братьев Ночного Дозора',
    language: 'Общий язык Вестероса',
    currency: 'Золотые драконы',
    safety: 'Опасно! Белые Ходоки и одичалые!',
    tips: ['Носите тёплую одежду', 'Не ходите за Стену в одиночку', 'Всегда держите валирийскую сталь наготове']
  },
  {
    id: '2',
    name: 'Дорн - Королевство Солнца',
    country: 'Южный Вестерос',
    description: 'Жаркое королевство с золотыми дворцами, экзотической культурой и непокорённым духом',
    image: '/img/5a0ae15a-245d-4579-a7d0-347604412c6e.jpg',
    category: 'Королевство',
    highlights: ['Солнечное Копьё', 'Водные Сады', 'Песчаные дюны', 'Дворец Мартеллов'],
    climate: 'Жаркий пустынный климат круглый год',
    bestTime: 'Весна и осень, когда жара терпима',
    activities: ['Поединки на копьях', 'Изучение ядов', 'Танцы змей', 'Пиры во дворце'],
    culture: 'Свободолюбивая культура с равноправием полов',
    history: 'Единственное королевство, не покорённое драконами Таргариенов',
    cuisine: ['Пряное мясо', 'Экзотические фрукты', 'Дорнийское вино', 'Змеиное мясо'],
    transportation: 'Верблюды, лошади, паланкины',
    accommodation: ['Дворцы знати', 'Песчаные замки', 'Караван-сараи'],
    budget: '100-500 золотых драконов',
    language: 'Общий язык с дорнийским акцентом',
    currency: 'Золотые драконы',
    safety: 'Берегитесь ядов и песчаных змей!',
    tips: ['Уважайте законы Дорна', 'Пейте много воды', 'Не оскорбляйте Мартеллов']
  }
]

const countries = [
  { name: 'Швейцария', flag: '🇨🇭', code: 'CH', airport: 'ZUR' },
  { name: 'Мальдивы', flag: '🇲🇻', code: 'MV', airport: 'MLE' },
  { name: 'Япония', flag: '🇯🇵', code: 'JP', airport: 'NRT' },
  { name: 'Исландия', flag: '🇮🇸', code: 'IS', airport: 'KEF' },
  { name: 'Италия', flag: '🇮🇹', code: 'IT', airport: 'FCO' },
  { name: 'Франция', flag: '🇫🇷', code: 'FR', airport: 'CDG' },
  { name: 'Испания', flag: '🇪🇸', code: 'ES', airport: 'MAD' },
  { name: 'Германия', flag: '🇩🇪', code: 'DE', airport: 'FRA' },
  { name: 'Великобритания', flag: '🇬🇧', code: 'GB', airport: 'LHR' },
  { name: 'США', flag: '🇺🇸', code: 'US', airport: 'JFK' },
  { name: 'Канада', flag: '🇨🇦', code: 'CA', airport: 'YYZ' },
  { name: 'Австралия', flag: '🇦🇺', code: 'AU', airport: 'SYD' },
  { name: 'Новая Зеландия', flag: '🇳🇿', code: 'NZ', airport: 'AKL' },
  { name: 'Бразилия', flag: '🇧🇷', code: 'BR', airport: 'GRU' },
  { name: 'Аргентина', flag: '🇦🇷', code: 'AR', airport: 'EZE' },
  { name: 'ОАЭ', flag: '🇦🇪', code: 'AE', airport: 'DXB' },
  { name: 'Турция', flag: '🇹🇷', code: 'TR', airport: 'IST' },
  { name: 'Таиланд', flag: '🇹🇭', code: 'TH', airport: 'BKK' },
  { name: 'Южная Корея', flag: '🇰🇷', code: 'KR', airport: 'ICN' },
  { name: 'Китай', flag: '🇨🇳', code: 'CN', airport: 'PEK' },
  { name: 'Индия', flag: '🇮🇳', code: 'IN', airport: 'DEL' },
  { name: 'Сингапур', flag: '🇸🇬', code: 'SG', airport: 'SIN' },
  { name: 'Мексика', flag: '🇲🇽', code: 'MX', airport: 'MEX' },
  { name: 'Египет', flag: '🇪🇬', code: 'EG', airport: 'CAI' },
  { name: 'Марокко', flag: '🇲🇦', code: 'MA', airport: 'CMN' }
]

const russianCities = [
  { name: 'Москва', code: 'MOW' },
  { name: 'Санкт-Петербург', code: 'LED' },
  { name: 'Екатеринбург', code: 'SVX' },
  { name: 'Новосибирск', code: 'OVB' },
  { name: 'Казань', code: 'KZN' },
  { name: 'Нижний Новгород', code: 'GOJ' },
  { name: 'Челябинск', code: 'CEK' },
  { name: 'Самара', code: 'KUF' },
  { name: 'Ростов-на-Дону', code: 'ROV' },
  { name: 'Уфа', code: 'UFA' }
]

export default function Index() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [activeSection, setActiveSection] = useState<string>('home')
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false)
  const [selectedFromCity, setSelectedFromCity] = useState('')
  const [selectedToCountry, setSelectedToCountry] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [isRoundTrip, setIsRoundTrip] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  useEffect(() => {
    const today = new Date()
    const defaultDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
    const dateString = defaultDate.toISOString().split('T')[0]
    setDepartureDate(dateString)
  }, [])

  useEffect(() => {
    const savedEndDate = localStorage.getItem('got_theme_end_date')
    let targetDate: Date

    if (savedEndDate) {
      targetDate = new Date(parseInt(savedEndDate, 10))
    } else {
      targetDate = new Date()
      targetDate.setTime(targetDate.getTime() + 7 * 24 * 60 * 60 * 1000)
      localStorage.setItem('got_theme_end_date', targetDate.getTime().toString())
    }

    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  if (activeSection === 'map') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Navigation */}
        <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setActiveSection('home')} 
                className="flex items-center space-x-2 sm:space-x-3"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Icon name="Compass" size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">Странник</h1>
              </button>
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
                <Link 
                  to="/hotels" 
                  className="text-white/80 hover:text-white transition-colors font-medium flex items-center gap-1"
                >
                  <Icon name="Hotel" size={16} />
                  Отели
                </Link>
                <button 
                  onClick={() => setActiveSection('about')} 
                  className="text-white/80 hover:text-white transition-colors font-medium"
                >
                  О проекте
                </button>
                <Link 
                  to="/news" 
                  className="text-white/80 hover:text-cyan-400 transition-colors font-medium"
                >
                  Новости
                </Link>
                <Link 
                  to="/radar" 
                  className="text-white/80 hover:text-cyan-400 transition-colors font-medium flex items-center gap-1"
                >
                  <Icon name="Plane" size={16} />
                  Радар
                </Link>
              </div>
              <div className="md:hidden">
                <Link 
                  to="/hotels" 
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-1 text-sm"
                >
                  <Icon name="Hotel" size={18} />
                </Link>
              </div>
              <Dialog open={isRouteModalOpen} onOpenChange={setIsRouteModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white">
                    <Icon name="Route" size={16} className="mr-2" />
                    Мой маршрут
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-slate-800/95 backdrop-blur-xl border border-white/10">
                  <DialogHeader>
                    <DialogTitle className="text-white text-xl font-semibold">Выберите маршрут</DialogTitle>
                    <DialogDescription className="text-white/70">
                      Откуда и куда планируете путешествовать?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-white font-medium">Откуда (Россия)</label>
                      <Select value={selectedFromCity} onValueChange={setSelectedFromCity}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Выберите город отправления" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/20">
                          {russianCities.map((city) => (
                            <SelectItem 
                              key={city.code} 
                              value={city.code}
                              className="text-white hover:bg-white/10"
                            >
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-white font-medium">Куда (Направление)</label>
                      <Select value={selectedToCountry} onValueChange={setSelectedToCountry}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Выберите страну назначения" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/20 max-h-[200px]">
                          {countries.map((country) => (
                            <SelectItem 
                              key={country.code} 
                              value={country.code}
                              className="text-white hover:bg-white/10"
                            >
                              <span className="flex items-center gap-2">
                                {country.flag} {country.name}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-white font-medium">Дата отправления</label>
                      <Input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="bg-white/10 border-white/20 text-white [&::-webkit-calendar-picker-indicator]:invert"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="roundTrip"
                        checked={isRoundTrip}
                        onCheckedChange={(checked) => {
                          setIsRoundTrip(checked as boolean)
                          if (!checked) {
                            setReturnDate('')
                          }
                        }}
                        className="border-white/20 data-[state=checked]:bg-blue-500"
                      />
                      <label htmlFor="roundTrip" className="text-white font-medium cursor-pointer">
                        Обратный билет
                      </label>
                    </div>

                    {isRoundTrip && (
                      <div className="space-y-3">
                        <label className="text-white font-medium">Дата возврата</label>
                        <Input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="bg-white/10 border-white/20 text-white [&::-webkit-calendar-picker-indicator]:invert"
                          min={departureDate || new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => {
                        if (selectedFromCity && selectedToCountry && departureDate) {
                          const selectedCountry = countries.find(c => c.code === selectedToCountry)
                          const destinationAirport = selectedCountry?.airport || selectedToCountry
                          
                          // Формат URL для Aeroflot с предзаполненными полями
                          let aeroflotUrl = `https://www.aeroflot.ru/sb/booking?from=${selectedFromCity}&to=${destinationAirport}&departure=${departureDate}&passengers=1&class=economy&direct=false`
                          
                          // Если выбран обратный билет и указана дата возврата
                          if (isRoundTrip && returnDate) {
                            aeroflotUrl += `&return=${returnDate}&tripType=round`
                          } else {
                            aeroflotUrl += `&tripType=one-way`
                          }
                          
                          window.open(aeroflotUrl, '_blank')
                          setIsRouteModalOpen(false)
                        }
                      }}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 h-12 text-lg font-semibold"
                      disabled={!selectedFromCity || !selectedToCountry || !departureDate || (isRoundTrip && !returnDate)}
                    >
                      <Icon name="Plane" size={20} className="mr-2" />
                      Найти рейсы на Аэрофлот
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
                <Link 
                  to="/news" 
                  className="text-white/80 hover:text-cyan-400 transition-colors font-medium"
                >
                  Новости
                </Link>
                <Link 
                  to="/radar" 
                  className="text-white/80 hover:text-cyan-400 transition-colors font-medium flex items-center gap-1"
                >
                  <Icon name="Plane" size={16} />
                  Радар
                </Link>
                <button 
                  onClick={() => setActiveSection('about')} 
                  className="text-blue-400 transition-colors font-medium"
                >
                  О проекте
                </button>
              </div>
              <Dialog open={isRouteModalOpen} onOpenChange={setIsRouteModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white">
                    <Icon name="Route" size={16} className="mr-2" />
                    Мой маршрут
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-slate-800/95 backdrop-blur-xl border border-white/10">
                  <DialogHeader>
                    <DialogTitle className="text-white text-xl font-semibold">Выберите маршрут</DialogTitle>
                    <DialogDescription className="text-white/70">
                      Откуда и куда планируете путешествовать?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-white font-medium">Откуда (Россия)</label>
                      <Select value={selectedFromCity} onValueChange={setSelectedFromCity}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Выберите город отправления" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/20">
                          {russianCities.map((city) => (
                            <SelectItem 
                              key={city.code} 
                              value={city.code}
                              className="text-white hover:bg-white/10"
                            >
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-white font-medium">Куда (Направление)</label>
                      <Select value={selectedToCountry} onValueChange={setSelectedToCountry}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Выберите страну назначения" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/20 max-h-[200px]">
                          {countries.map((country) => (
                            <SelectItem 
                              key={country.code} 
                              value={country.code}
                              className="text-white hover:bg-white/10"
                            >
                              <span className="flex items-center gap-2">
                                {country.flag} {country.name}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-white font-medium">Дата отправления</label>
                      <Input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="bg-white/10 border-white/20 text-white [&::-webkit-calendar-picker-indicator]:invert"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="roundTrip"
                        checked={isRoundTrip}
                        onCheckedChange={(checked) => {
                          setIsRoundTrip(checked as boolean)
                          if (!checked) {
                            setReturnDate('')
                          }
                        }}
                        className="border-white/20 data-[state=checked]:bg-blue-500"
                      />
                      <label htmlFor="roundTrip" className="text-white font-medium cursor-pointer">
                        Обратный билет
                      </label>
                    </div>

                    {isRoundTrip && (
                      <div className="space-y-3">
                        <label className="text-white font-medium">Дата возврата</label>
                        <Input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="bg-white/10 border-white/20 text-white [&::-webkit-calendar-picker-indicator]:invert"
                          min={departureDate || new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => {
                        if (selectedFromCity && selectedToCountry && departureDate) {
                          const selectedCountry = countries.find(c => c.code === selectedToCountry)
                          const destinationAirport = selectedCountry?.airport || selectedToCountry
                          
                          // Формат URL для Aeroflot с предзаполненными полями
                          let aeroflotUrl = `https://www.aeroflot.ru/sb/booking?from=${selectedFromCity}&to=${destinationAirport}&departure=${departureDate}&passengers=1&class=economy&direct=false`
                          
                          // Если выбран обратный билет и указана дата возврата
                          if (isRoundTrip && returnDate) {
                            aeroflotUrl += `&return=${returnDate}&tripType=round`
                          } else {
                            aeroflotUrl += `&tripType=one-way`
                          }
                          
                          window.open(aeroflotUrl, '_blank')
                          setIsRouteModalOpen(false)
                        }
                      }}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 h-12 text-lg font-semibold"
                      disabled={!selectedFromCity || !selectedToCountry || !departureDate || (isRoundTrip && !returnDate)}
                    >
                      <Icon name="Plane" size={20} className="mr-2" />
                      Найти рейсы на Аэрофлот
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </nav>
        <About />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-got-black via-got-iron to-got-black text-white">
      <AirlineAds />
      {/* Navigation */}
      <nav className="border-b-4 border-got-gold/50 bg-got-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-got-fire to-orange-600 flex items-center justify-center border-2 border-got-gold/50">
                <Icon name="Crown" size={28} className="text-got-gold" />
              </div>
              <h1 className="text-2xl font-bold text-got-gold">⚔️ Железный Трон</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveSection('home')} 
                className="text-got-fire transition-colors font-bold"
              >
                Главная
              </button>
              <button 
                onClick={() => setActiveSection('map')} 
                className="text-got-gold/80 hover:text-got-gold transition-colors font-bold"
              >
                Карта
              </button>
              <a href="#" className="text-got-gold/80 hover:text-got-gold transition-colors font-bold">Королевства</a>
              <button 
                onClick={() => setActiveSection('about')} 
                className="text-white/80 hover:text-white transition-colors font-medium"
              >
                О проекте
              </button>
              <Link 
                to="/news" 
                className="text-white/80 hover:text-cyan-400 transition-colors font-medium"
              >
                Новости
              </Link>
              <Link 
                to="/radar" 
                className="text-white/80 hover:text-cyan-400 transition-colors font-medium flex items-center gap-1"
              >
                <Icon name="Plane" size={16} />
                Радар
              </Link>
            </div>
            <Dialog open={isRouteModalOpen} onOpenChange={setIsRouteModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white">
                  <Icon name="Route" size={16} className="mr-2" />
                  Мой маршрут
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-slate-800/95 backdrop-blur-xl border border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl font-semibold">Выберите маршрут</DialogTitle>
                  <DialogDescription className="text-white/70">
                    Планируйте свою поездку с выбором дат и направлений
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-white font-medium">Откуда (Россия)</label>
                    <Select value={selectedFromCity} onValueChange={setSelectedFromCity}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Выберите город отправления" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
                        {russianCities.map((city) => (
                          <SelectItem 
                            key={city.code} 
                            value={city.code}
                            className="text-white hover:bg-white/10"
                          >
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-white font-medium">Куда (Направление)</label>
                    <Select value={selectedToCountry} onValueChange={setSelectedToCountry}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Выберите страну назначения" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20 max-h-[200px]">
                        {countries.map((country) => (
                          <SelectItem 
                            key={country.code} 
                            value={country.code}
                            className="text-white hover:bg-white/10"
                          >
                            <span className="flex items-center gap-2">
                              {country.flag} {country.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-white font-medium">Дата отправления</label>
                    <Input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="bg-white/10 border-white/20 text-white [&::-webkit-calendar-picker-indicator]:invert"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="roundTrip"
                      checked={isRoundTrip}
                      onChange={(e) => {
                        setIsRoundTrip(e.target.checked)
                        if (!e.target.checked) {
                          setReturnDate('')
                        }
                      }}
                      className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                    />
                    <label htmlFor="roundTrip" className="text-white font-medium">
                      Обратный билет
                    </label>
                  </div>

                  {isRoundTrip && (
                    <div className="space-y-3">
                      <label className="text-white font-medium">Дата возврата</label>
                      <Input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="bg-white/10 border-white/20 text-white [&::-webkit-calendar-picker-indicator]:invert"
                        min={departureDate || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => {
                      if (selectedFromCity && selectedToCountry && departureDate) {
                        const selectedCountry = countries.find(c => c.code === selectedToCountry)
                        const destinationAirport = selectedCountry?.airport || selectedToCountry
                        
                        // Формат URL для Aeroflot с предзаполненными полями
                        let aeroflotUrl = `https://www.aeroflot.ru/sb/booking?from=${selectedFromCity}&to=${destinationAirport}&departure=${departureDate}&passengers=1&class=economy&direct=false`
                        
                        // Если выбран обратный билет и указана дата возврата
                        if (isRoundTrip && returnDate) {
                          aeroflotUrl += `&return=${returnDate}&tripType=round`
                        } else {
                          aeroflotUrl += `&tripType=one-way`
                        }
                        
                        window.open(aeroflotUrl, '_blank')
                        setIsRouteModalOpen(false)
                      }
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 h-12 text-lg font-semibold"
                    disabled={!selectedFromCity || !selectedToCountry || !departureDate || (isRoundTrip && !returnDate)}
                  >
                    <Icon name="ExternalLink" size={18} className="mr-2" />
                    Найти рейсы на Аэрофлот
                  </Button>
                  
                  <div className="text-center text-white/60 text-sm">
                    Поиск авиабилетов с автоматическим заполнением маршрута и дат
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* GOT Theme Timer */}
      <div className="bg-got-black border-b-4 border-got-gold/50 py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-8">
            <div className="text-got-gold font-bold text-lg">⚔️ До конца тематики осталось:</div>
            <div className="flex gap-4">
              <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg px-4 py-2">
                <div className="text-2xl font-bold text-got-fire">{timeLeft.days}</div>
                <div className="text-xs text-got-gold/70">дней</div>
              </div>
              <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg px-4 py-2">
                <div className="text-2xl font-bold text-got-fire">{timeLeft.hours}</div>
                <div className="text-xs text-got-gold/70">часов</div>
              </div>
              <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg px-4 py-2">
                <div className="text-2xl font-bold text-got-fire">{timeLeft.minutes}</div>
                <div className="text-xs text-got-gold/70">минут</div>
              </div>
              <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg px-4 py-2">
                <div className="text-2xl font-bold text-got-fire">{timeLeft.seconds}</div>
                <div className="text-xs text-got-gold/70">секунд</div>
              </div>
            </div>
            <Link 
              to="/game" 
              className="bg-gradient-to-r from-got-fire to-orange-600 hover:from-got-fire/90 hover:to-orange-700 text-white px-6 py-2 rounded-lg border-2 border-got-gold/50 font-bold transition-all"
            >
              🐉 Играть
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: 'url(/img/6547af4c-41dd-4a04-b44f-1947903c0fe1.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-got-black/80 via-got-iron/60 to-got-black/80" />
        </div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-3 h-3 bg-got-fire rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-4 h-4 bg-got-gold rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-got-fire rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-got-gold rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-got-fire rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-got-black/60 backdrop-blur-md rounded-lg px-6 py-3 mb-8 border-2 border-got-gold/50">
              <div className="w-2 h-2 bg-got-fire rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-got-gold">Winter is Coming...</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-wider">
            <span className="bg-gradient-to-r from-got-gold via-got-fire to-got-gold bg-clip-text text-transparent drop-shadow-2xl">
              СЕМЬ КОРОЛЕВСТВ
            </span><br />
            <span className="text-got-gold text-5xl md:text-6xl">⚔️ ВЕСТЕРОСА ⚔️</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-got-gold/70 max-w-3xl mx-auto font-light italic">
            "Когда ты играешь в игру престолов, ты либо побеждаешь, либо умираешь. 
            Третьего не дано." — Серсея Ланнистер
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-got-fire to-orange-600 hover:from-got-fire/90 hover:to-orange-700 text-white border-2 border-got-gold/50 h-14 px-8 text-lg font-bold relative overflow-hidden group"
              onClick={() => setActiveSection('map')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-got-fire/20 to-orange-600/20 animate-pulse"></div>
              <Icon name="Map" size={24} className="mr-3 relative z-10" />
              <span className="relative z-10">Карта Вестероса</span>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-got-gold/50 text-got-gold hover:bg-got-gold/20 hover:border-got-gold h-14 px-8 text-lg font-bold bg-got-black/60 backdrop-blur-sm"
            >
              <Icon name="Sword" size={24} className="mr-3" />
              Присягнуть дому
            </Button>
          </div>
        </div>
      </section>

      {/* Great Houses Section */}
      <section className="py-16 px-6 relative bg-gradient-to-r from-got-black via-got-iron/20 to-got-black backdrop-blur-sm border-y-4 border-got-gold/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-8 text-got-gold">
              ⚔️ Великие Дома Вестероса ⚔️
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg p-6 backdrop-blur-md hover:border-got-fire hover:scale-105 transition-all">
                <div className="text-5xl mb-3">🐺</div>
                <h4 className="text-got-gold font-bold text-lg mb-2">Дом Старков</h4>
                <p className="text-got-gold/60 text-sm italic">"Зима близко"</p>
              </div>
              <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg p-6 backdrop-blur-md hover:border-got-fire hover:scale-105 transition-all">
                <div className="text-5xl mb-3">🦁</div>
                <h4 className="text-got-gold font-bold text-lg mb-2">Дом Ланнистеров</h4>
                <p className="text-got-gold/60 text-sm italic">"Услышь мой рёв!"</p>
              </div>
              <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg p-6 backdrop-blur-md hover:border-got-fire hover:scale-105 transition-all">
                <div className="text-5xl mb-3">🐉</div>
                <h4 className="text-got-gold font-bold text-lg mb-2">Дом Таргариенов</h4>
                <p className="text-got-gold/60 text-sm italic">"Огонь и кровь"</p>
              </div>
              <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg p-6 backdrop-blur-md hover:border-got-fire hover:scale-105 transition-all">
                <div className="text-5xl mb-3">🦌</div>
                <h4 className="text-got-gold font-bold text-lg mb-2">Дом Баратеонов</h4>
                <p className="text-got-gold/60 text-sm italic">"Наша ярость"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Neon Style */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-black/0 to-cyan-950/10 pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-got-gold">
              ⚔️ Великие Земли Вестероса ⚔️
            </h2>
            <p className="text-xl text-got-gold/60 max-w-3xl mx-auto font-light italic">
              "Когда идёт снег и воют северные ветра, одинокий волк умирает, но стая выживает"
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {destinations.map((destination) => (
              <Dialog key={destination.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer bg-got-black/80 backdrop-blur-md border-2 border-got-gold/40 hover:border-got-fire transition-all duration-500 hover:scale-105 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-got-black via-got-iron/30 to-transparent" />
                      <div className="absolute top-6 right-6">
                        <Badge className="bg-gradient-to-r from-got-fire to-orange-600 text-white border-2 border-got-gold/50 font-bold">
                          {destination.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-2xl font-bold text-white mb-2 neon-text-cyan group-hover:neon-text-purple transition-all">{destination.name}</h3>
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

      {/* Footer - Neon Style */}
      <footer className="bg-black/40 backdrop-blur-md border-t-2 border-cyan-500/30 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 flex items-center justify-center neon-border-blue">
              <Icon name="Compass" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent neon-text-blue">Странник</span>
          </div>
          <p className="text-cyan-300/60 text-lg mb-6">
            Откройте мир через интерактивные путешествия • 2024
          </p>
          <div className="flex flex-col items-center gap-4">
            <p className="text-white/70 text-sm">Мы в соцсетях</p>
            <Button
              onClick={() => window.open('https://t.me/Strannik_com', '_blank')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 px-6 py-2 flex items-center gap-2"
            >
              <Icon name="Send" size={20} />
              Смотреть
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}