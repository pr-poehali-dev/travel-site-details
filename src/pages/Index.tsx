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
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [quoteKey, setQuoteKey] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [showSwipeHint, setShowSwipeHint] = useState(true)
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false)
  const [isVideoMinimized, setIsVideoMinimized] = useState(false)
  const [currentSeason, setCurrentSeason] = useState(1)
  const [currentEpisode, setCurrentEpisode] = useState(1)
  
  const gotQuotes = [
    { text: "Зима близко", author: "Дом Старков" },
    { text: "Ланнистеры всегда платят свои долги", author: "Дом Ланнистеров" },
    { text: "Огонь и кровь", author: "Дом Таргариенов" },
    { text: "Что мертво, умереть не может", author: "Дом Грейджоев" },
    { text: "Услышь мой рёв!", author: "Дом Ланнистеров" },
    { text: "Наша ярость", author: "Дом Баратеонов" },
    { text: "Вырастая крепнем", author: "Дом Тиреллов" },
    { text: "Семья, долг, честь", author: "Дом Талли" },
    { text: "Высок как честь", author: "Дом Арренов" },
    { text: "Несгибаемые, непокорённые, несломленные", author: "Дом Мартеллов" },
    { text: "Когда играешь в игру престолов, ты либо побеждаешь, либо умираешь", author: "Серсея Ланнистер" },
    { text: "Хаос — это лестница", author: "Мизинец" },
    { text: "Ночь темна и полна ужасов", author: "Мелисандра" },
    { text: "Что знают живые о смерти?", author: "Иггритт" },
    { text: "Любой человек, который должен говорить 'Я король', — не настоящий король", author: "Тайвин Ланнистер" },
    { text: "Когда снега падут и ветры завоют, одинокий волк умрёт, но стая выживет", author: "Нед Старк" },
    { text: "Драконы не понимают разницы между тем, что их и что не их", author: "Дейенерис Таргариен" },
    { text: "Я пью вино и знаю вещи", author: "Тирион Ланнистер" },
    { text: "Власть — это тень на стене", author: "Варис" },
    { text: "Не будь дураком. Только дурак доверяет Ланнистеру", author: "Нед Старк" }
  ]
  
  const playQuoteSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1u+zjiwgVbfz8qGDKAU=')
    audio.volume = 0.3
    audio.play().catch(() => {})
  }

  const changeQuote = () => {
    playQuoteSound()
    setCurrentQuote((prev) => (prev + 1) % gotQuotes.length)
    setQuoteKey(prev => prev + 1)
  }

  const sections = ['home', 'map', 'kingdoms', 'about']
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    const currentIndex = sections.indexOf(activeSection)
    
    if (isLeftSwipe && currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1])
      playQuoteSound()
      setShowSwipeHint(false)
    }
    
    if (isRightSwipe && currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1])
      playQuoteSound()
      setShowSwipeHint(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setCurrentQuote(Math.floor(Math.random() * gotQuotes.length))
  }, [])
  
  const playSwordSound = () => {
    const audio = new Audio('https://www.soundjay.com/misc/sounds/sword-unsheathe-1.mp3')
    audio.volume = 0.3
    audio.play().catch(() => {})
  }
  
  const toggleMusic = () => {
    const music = document.getElementById('background-music') as HTMLAudioElement
    if (music) {
      if (isMusicPlaying) {
        music.pause()
      } else {
        music.volume = 0.2
        music.play().catch(() => {})
      }
      setIsMusicPlaying(!isMusicPlaying)
    }
  }
  
  useEffect(() => {
    const music = document.getElementById('background-music') as HTMLAudioElement
    if (music) {
      music.volume = 0.2
      music.play().catch(() => {})
      setIsMusicPlaying(true)
    }
  }, [])
  
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
      <div className="min-h-screen bg-gradient-to-br from-got-black via-got-iron to-got-black">
        <audio id="background-music" loop>
          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        </audio>
        {/* Navigation */}
        <nav className="border-b-4 border-got-gold/50 bg-got-black/90 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setActiveSection('home')} 
                className="flex items-center space-x-2 sm:space-x-3"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-got-fire to-orange-600 flex items-center justify-center border-2 border-got-gold/50">
                  <Icon name="Crown" size={20} className="text-got-gold sm:w-6 sm:h-6" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-got-gold">⚔️ Железный Трон</h1>
              </button>
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => setActiveSection('home')} 
                  className="text-got-gold/80 hover:text-got-gold transition-colors font-bold"
                >
                  Главная
                </button>
                <button 
                  onClick={() => setActiveSection('map')} 
                  className="text-got-fire transition-colors font-bold"
                >
                  Карта Вестероса
                </button>
                <Link 
                  to="/hotels" 
                  className="text-got-gold/80 hover:text-got-gold transition-colors font-bold flex items-center gap-1"
                >
                  <Icon name="Castle" size={16} />
                  Замки
                </Link>
                <button 
                  onClick={() => setActiveSection('kingdoms')} 
                  className="text-got-gold/80 hover:text-got-gold transition-colors font-bold"
                >
                  Королевства
                </button>
                <Link 
                  to="/news" 
                  className="text-got-gold/80 hover:text-got-gold transition-colors font-bold"
                >
                  Летописи
                </Link>
                <Link 
                  to="/radar" 
                  className="text-got-gold/80 hover:text-got-gold transition-colors font-bold flex items-center gap-1"
                >
                  <Icon name="Swords" size={16} />
                  Поле Битвы
                </Link>
              </div>
              <div className="md:hidden">
                <Link 
                  to="/hotels" 
                  className="text-got-gold/80 hover:text-got-gold transition-colors flex items-center gap-1 text-sm"
                >
                  <Icon name="Castle" size={18} />
                </Link>
              </div>
              <Dialog open={isRouteModalOpen} onOpenChange={setIsRouteModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-got-fire to-orange-600 hover:from-orange-600 hover:to-got-fire border-2 border-got-gold/50 text-white font-bold">
                    <Icon name="Scroll" size={16} className="mr-2" />
                    Мой путь
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-got-black/95 backdrop-blur-xl border-4 border-got-gold/50">
                  <DialogHeader>
                    <DialogTitle className="text-got-gold text-2xl font-bold">⚔️ Выберите свой путь</DialogTitle>
                    <DialogDescription className="text-got-gold/70">
                      Откуда и куда планируете путешествовать по Семи Королевствам?
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

  if (activeSection === 'kingdoms') {
    useEffect(() => {
      const music = document.getElementById('background-music') as HTMLAudioElement
      if (music && !isMusicPlaying) {
        music.volume = 0.2
        music.play().catch(() => {})
        setIsMusicPlaying(true)
      }
    }, [])

    const kingdoms = [
      {
        id: 1,
        name: 'Скандинавия и Север Европы',
        seat: 'Осло, Норвегия',
        house: 'Северные страны',
        sigil: '🐺',
        words: 'Приключения ждут в снегах',
        description: 'Величественные фьорды, северное сияние и древние леса. Идеальное место для зимних путешествий и любителей природы.',
        image: '/img/522cf6b9-fd24-42e4-9730-280a91bcb203.jpg',
        rulers: 'Популярные направления: Норвегия, Швеция, Финляндия, Исландия',
        culture: 'Викинги, сауны, минимализм, северное сияние',
        climate: 'Холодный, с долгими зимами и белыми ночами летом',
        cities: ['Осло', 'Стокгольм', 'Рейкьявик', 'Хельсинки'],
        landmarks: ['Фьорды Норвегии', 'Северное сияние', 'Ледниковые лагуны'],
      },
      {
        id: 2,
        name: 'Центральная Европа',
        seat: 'Прага, Чехия',
        house: 'Речные города',
        sigil: '🐟',
        words: 'История течёт как река',
        description: 'Плодородные земли с замками вдоль рек, торговые пути и средневековая архитектура.',
        image: '/img/4ed418e5-4f27-4409-8e38-c9ea65a72b4d.jpg',
        rulers: 'Популярные направления: Чехия, Австрия, Венгрия, Германия',
        culture: 'Замки, пивные традиции, классическая музыка',
        climate: 'Умеренный континентальный, комфортный для путешествий',
        cities: ['Прага', 'Вена', 'Будапешт', 'Мюнхен'],
        landmarks: ['Пражский Град', 'Дунай', 'Замки на Рейне'],
      },
      {
        id: 3,
        name: 'Альпийский регион',
        seat: 'Цюрих, Швейцария',
        house: 'Горные вершины',
        sigil: '🦅',
        words: 'Высоко как небеса',
        description: 'Горные курорты мирового класса, защищённые величественными Альпами.',
        image: '/img/40830da6-a720-4917-9901-a744595522bd.jpg',
        rulers: 'Популярные направления: Швейцария, Австрия, Северная Италия',
        culture: 'Горнолыжный спорт, альпийские традиции, премиум туризм',
        climate: 'Горный, идеален для зимних видов спорта',
        cities: ['Цюрих', 'Женева', 'Инсбрук', 'Милан'],
        landmarks: ['Маттерхорн', 'Юнгфрауйох', 'Озеро Комо'],
      },
      {
        id: 4,
        name: 'Французская Ривьера',
        seat: 'Ницца, Франция',
        house: 'Лазурный берег',
        sigil: '🦁',
        words: 'Роскошь и элегантность!',
        description: 'Богатейший курортный регион с золотыми пляжами и роскошными яхтами.',
        image: '/img/f57fd4a2-ef7e-47e0-a907-9f15b9ef10f4.jpg',
        rulers: 'Популярные направления: Французская Ривьера, Монако, Канны',
        culture: 'Высокая мода, гастрономия, кинофестивали',
        climate: 'Средиземноморский, тёплый и солнечный',
        cities: ['Ницца', 'Канны', 'Монако', 'Сен-Тропе'],
        landmarks: ['Лазурный берег', 'Казино Монте-Карло', 'Променад де Англе'],
      },
      {
        id: 5,
        name: 'Английская провинция',
        seat: 'Котсуолдс, Англия',
        house: 'Зелёные холмы',
        sigil: '🌹',
        words: 'Традиции расцветают',
        description: 'Самые живописные сельские пейзажи с садами и поместьями.',
        image: '/img/280bc9d6-b0a4-48d2-8610-27c38a6b38ff.jpg',
        rulers: 'Популярные направления: Котсуолдс, Озёрный край, Шотландия',
        culture: 'Пабы, чайные традиции, литературное наследие',
        climate: 'Умеренный морской, зелёный круглый год',
        cities: ['Оксфорд', 'Бат', 'Эдинбург', 'Йорк'],
        landmarks: ['Стоунхендж', 'Озёрный край', 'Шотландское нагорье'],
      },
      {
        id: 6,
        name: 'Атлантическое побережье',
        seat: 'Дублин, Ирландия',
        house: 'Штормовые берега',
        sigil: '🦌',
        words: 'Наша страсть',
        description: 'Драматичные утёсы и берега, постоянно овеваемые атлантическими ветрами.',
        image: '/img/cc3d2e26-f83d-4900-8ed1-e3c9911024c0.jpg',
        rulers: 'Популярные направления: Ирландия, Бретань, Северная Испания',
        culture: 'Кельтские традиции, музыка, виски и сидр',
        climate: 'Океанический, влажный с частыми ветрами',
        cities: ['Дублин', 'Корк', 'Сантьяго', 'Брест'],
        landmarks: ['Утёсы Мохер', 'Дорога гигантов', 'Камино де Сантьяго'],
      },
      {
        id: 7,
        name: 'Средиземноморье и Северная Африка',
        seat: 'Марракеш, Марокко',
        house: 'Пустынные оазисы',
        sigil: '☀️',
        words: 'Солнце, песок, свобода',
        description: 'Жаркие пустыни, экзотические базары и древние города под палящим солнцем.',
        image: '/img/1fd23cb0-ed9a-4b72-b891-5667b0e95398.jpg',
        rulers: 'Популярные направления: Марокко, Тунис, Южная Испания',
        culture: 'Восточные базары, хаммамы, пряная кухня',
        climate: 'Жаркий пустынный и средиземноморский',
        cities: ['Марракеш', 'Фес', 'Севилья', 'Гранада'],
        landmarks: ['Сахара', 'Альгамбра', 'Медина Марракеша'],
      }
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-got-black via-got-iron to-got-black text-white">
        <audio id="background-music" loop>
          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        </audio>
        <nav className="border-b-4 border-got-gold/50 bg-got-black/90 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setActiveSection('home')} 
                className="flex items-center space-x-3"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-got-fire to-orange-600 flex items-center justify-center border-2 border-got-gold/50">
                  <Icon name="Crown" size={28} className="text-got-gold" />
                </div>
                <h1 className="text-2xl font-bold text-got-gold">⚔️ Железный Трон</h1>
              </button>
              <Button 
                onClick={() => setActiveSection('home')}
                className="bg-gradient-to-r from-got-fire to-orange-600 hover:from-orange-600 hover:to-got-fire border-2 border-got-gold/50 text-white font-bold"
              >
                Назад
              </Button>
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-got-gold mb-4">🌍 Семь Регионов Мира</h2>
            <p className="text-xl text-got-gold/80">Откройте для себя уникальные направления для путешествий</p>
            <p className="text-sm text-got-gold/60 mt-2">✈️ Туристический сайт с тематическим дизайном • Найдите своё следующее приключение</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {kingdoms.map((kingdom) => (
              <Dialog key={kingdom.id}>
                <DialogTrigger asChild>
                  <div className="relative bg-got-black/80 border-3 border-got-gold/40 hover:border-got-fire rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer group">
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"
                      style={{ backgroundImage: `url(${kingdom.image})` }}
                    />
                    <div className="relative z-10 p-6 bg-gradient-to-t from-got-black/90 via-got-black/70 to-transparent">
                      <div className="text-7xl mb-4 text-center transform group-hover:scale-110 transition-transform">{kingdom.sigil}</div>
                      <h3 className="text-2xl font-bold text-got-gold text-center mb-2">{kingdom.name}</h3>
                      <p className="text-got-gold/70 text-center italic text-sm mb-3">"{kingdom.words}"</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-got-fire font-bold">📍 Город:</span>
                          <span className="text-white">{kingdom.seat}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-got-fire font-bold">🌍 Регион:</span>
                          <span className="text-white text-xs">{kingdom.house}</span>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <span className="text-got-gold/60 text-xs">✈️ Узнать больше →</span>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-got-black/95 border-4 border-got-gold/50 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="text-7xl mb-4 text-center">{kingdom.sigil}</div>
                    <DialogTitle className="text-4xl text-got-gold text-center">{kingdom.name}</DialogTitle>
                    <DialogDescription className="text-got-gold/70 text-center italic text-xl">
                      "{kingdom.words}"
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-6">
                    <div className="bg-got-black/60 border-2 border-got-gold/30 rounded-lg p-4">
                      <h3 className="text-got-fire font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="MapPin" size={20} />
                        Главный город
                      </h3>
                      <p className="text-white">{kingdom.seat}</p>
                    </div>
                    <div className="bg-got-black/60 border-2 border-got-gold/30 rounded-lg p-4">
                      <h3 className="text-got-fire font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="Globe" size={20} />
                        Туристический регион
                      </h3>
                      <p className="text-white">{kingdom.house}</p>
                    </div>
                    <div className="bg-got-black/60 border-2 border-got-gold/30 rounded-lg p-4">
                      <h3 className="text-got-fire font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="BookOpen" size={20} />
                        Описание
                      </h3>
                      <p className="text-white/90">{kingdom.description}</p>
                    </div>
                    <div className="bg-got-black/60 border-2 border-got-gold/30 rounded-lg p-4">
                      <h3 className="text-got-fire font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="Plane" size={20} />
                        Популярные направления
                      </h3>
                      <p className="text-white/90">{kingdom.rulers}</p>
                    </div>
                    <div className="bg-got-black/60 border-2 border-got-gold/30 rounded-lg p-4">
                      <h3 className="text-got-fire font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="Heart" size={20} />
                        Что посмотреть
                      </h3>
                      <p className="text-white/90">{kingdom.culture}</p>
                    </div>
                    <div className="bg-got-black/60 border-2 border-got-gold/30 rounded-lg p-4">
                      <h3 className="text-got-fire font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="Sun" size={20} />
                        Климат и погода
                      </h3>
                      <p className="text-white/90">{kingdom.climate}</p>
                    </div>
                    <div className="bg-got-black/60 border-2 border-got-gold/30 rounded-lg p-4">
                      <h3 className="text-got-fire font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="Building2" size={20} />
                        Популярные города
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {kingdom.cities.map((city, idx) => (
                          <span key={idx} className="bg-got-gold/20 text-got-gold px-3 py-1 rounded-full text-sm border border-got-gold/40">
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-got-black/60 border-2 border-got-gold/30 rounded-lg p-4">
                      <h3 className="text-got-fire font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="Map" size={20} />
                        Достопримечательности
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {kingdom.landmarks.map((landmark, idx) => (
                          <span key={idx} className="bg-got-fire/20 text-got-gold px-3 py-1 rounded-full text-sm border border-got-fire/40">
                            {landmark}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (activeSection === 'about') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-got-black via-got-iron to-got-black">
        <audio id="background-music" loop>
          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        </audio>
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
              <div className="hidden md:flex items-center space-x-6">
                <button
                  onClick={toggleMusic}
                  className="p-2 rounded-lg bg-got-gold/20 hover:bg-got-gold/30 transition-colors border border-got-gold/50"
                  title={isMusicPlaying ? 'Остановить музыку' : 'Играть музыку'}
                >
                  <Icon name={isMusicPlaying ? 'Volume2' : 'VolumeX'} size={20} className="text-got-gold" />
                </button>
                <button 
                  onClick={() => setActiveSection('home')} 
                  className="text-got-gold/80 hover:text-got-gold transition-colors font-bold"
                >
                  Главная
                </button>
                <button 
                  onClick={() => setActiveSection('map')} 
                  className="text-got-gold/80 hover:text-got-gold transition-colors font-bold"
                >
                  Карта
                </button>
                <button 
                  onClick={() => setActiveSection('kingdoms')} 
                  className="text-got-gold/80 hover:text-got-gold transition-colors font-bold"
                >
                  Королевства
                </button>
                <Link 
                  to="/news" 
                  className="text-got-gold/80 hover:text-got-gold transition-colors font-bold"
                >
                  Летописи
                </Link>
                <Link 
                  to="/radar" 
                  className="text-got-gold/80 hover:text-got-gold transition-colors font-bold flex items-center gap-1"
                >
                  <Icon name="Swords" size={16} />
                  Поле Битвы
                </Link>
                <button 
                  onClick={() => setActiveSection('about')} 
                  className="text-got-fire transition-colors font-bold"
                >
                  О проекте
                </button>
              </div>
              <Dialog open={isRouteModalOpen} onOpenChange={setIsRouteModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-got-fire to-orange-600 hover:from-orange-600 hover:to-got-fire border-2 border-got-gold/50 text-white font-bold">
                    <Icon name="Scroll" size={16} className="mr-2" />
                    Мой путь
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-got-black/95 backdrop-blur-xl border-4 border-got-gold/50">
                  <DialogHeader>
                    <DialogTitle className="text-got-gold text-2xl font-bold">⚔️ Выберите свой путь</DialogTitle>
                    <DialogDescription className="text-got-gold/70">
                      Откуда и куда планируете путешествовать по Семи Королевствам?
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
    <div 
      className="min-h-screen bg-gradient-to-br from-got-black via-got-iron to-got-black text-white"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <audio id="background-music" loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      {/* Swipe Indicator */}
      {showSwipeHint && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 lg:hidden pointer-events-none animate-bounce">
          <div className="bg-got-black/80 backdrop-blur-md border-2 border-got-gold/50 rounded-full px-6 py-3 flex items-center gap-3">
            <Icon name="ChevronLeft" size={20} className="text-got-gold/50" />
            <span className="text-got-gold/70 text-sm font-bold">👈 Свайп для навигации 👉</span>
            <Icon name="ChevronRight" size={20} className="text-got-gold/50" />
          </div>
        </div>
      )}

      {/* Section Progress Indicator */}
      <div className="fixed top-24 right-4 z-40 lg:hidden flex flex-col gap-3">
        {sections.map((section) => {
          const sectionNames: Record<string, string> = {
            home: 'Главная',
            map: 'Карта',
            kingdoms: 'Королевства',
            about: 'О нас'
          }
          return (
            <div
              key={section}
              className="flex items-center gap-2"
            >
              <span className={`text-xs font-bold transition-all ${
                activeSection === section 
                  ? 'text-got-fire' 
                  : 'text-got-gold/40'
              }`}>
                {activeSection === section && sectionNames[section]}
              </span>
              <div
                className={`rounded-full transition-all ${
                  activeSection === section 
                    ? 'bg-got-fire w-3 h-3 shadow-lg shadow-got-fire/50' 
                    : 'bg-got-gold/30 w-2 h-2'
                }`}
              />
            </div>
          )
        })}
      </div>

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
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={toggleMusic}
                className="p-2 rounded-lg bg-got-gold/20 hover:bg-got-gold/30 transition-colors border border-got-gold/50"
                title={isMusicPlaying ? 'Остановить музыку' : 'Играть музыку'}
              >
                <Icon name={isMusicPlaying ? 'Volume2' : 'VolumeX'} size={20} className="text-got-gold" />
              </button>
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
              <button 
                onClick={() => setActiveSection('kingdoms')} 
                className="text-got-gold/80 hover:text-got-gold transition-colors font-bold"
              >
                Королевства
              </button>
              <button 
                onClick={() => setActiveSection('about')} 
                className="text-got-gold/80 hover:text-got-gold transition-colors font-bold"
              >
                О проекте
              </button>
              <Link 
                to="/news" 
                className="text-got-gold/80 hover:text-got-gold transition-colors font-bold"
              >
                Летописи
              </Link>
              <Link 
                to="/radar" 
                className="text-got-gold/80 hover:text-got-gold transition-colors font-bold flex items-center gap-1"
              >
                <Icon name="Swords" size={16} />
                Поле Битвы
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-got-gold/20 hover:bg-got-gold/30 transition-colors border border-got-gold/50"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} className="text-got-gold" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-got-black/95 border-t-2 border-got-gold/30 backdrop-blur-md">
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              <button
                onClick={toggleMusic}
                className="flex items-center gap-3 p-3 rounded-lg bg-got-gold/20 hover:bg-got-gold/30 transition-colors border border-got-gold/50"
              >
                <Icon name={isMusicPlaying ? 'Volume2' : 'VolumeX'} size={20} className="text-got-gold" />
                <span className="text-got-gold font-bold">{isMusicPlaying ? 'Остановить музыку' : 'Играть музыку'}</span>
              </button>
              <button 
                onClick={() => {
                  setActiveSection('home')
                  setIsMobileMenuOpen(false)
                }} 
                className="text-got-fire transition-colors font-bold text-left p-3 hover:bg-got-gold/10 rounded-lg"
              >
                Главная
              </button>
              <button 
                onClick={() => {
                  setActiveSection('map')
                  setIsMobileMenuOpen(false)
                }} 
                className="text-got-gold/80 hover:text-got-gold transition-colors font-bold text-left p-3 hover:bg-got-gold/10 rounded-lg"
              >
                Карта
              </button>
              <button 
                onClick={() => {
                  setActiveSection('kingdoms')
                  setIsMobileMenuOpen(false)
                }} 
                className="text-got-gold/80 hover:text-got-gold transition-colors font-bold text-left p-3 hover:bg-got-gold/10 rounded-lg"
              >
                Королевства
              </button>
              <button 
                onClick={() => {
                  setActiveSection('about')
                  setIsMobileMenuOpen(false)
                }} 
                className="text-got-gold/80 hover:text-got-gold transition-colors font-bold text-left p-3 hover:bg-got-gold/10 rounded-lg"
              >
                О проекте
              </button>
              <Link 
                to="/news" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-got-gold/80 hover:text-got-gold transition-colors font-bold text-left p-3 hover:bg-got-gold/10 rounded-lg"
              >
                Летописи
              </Link>
              <Link 
                to="/radar" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-got-gold/80 hover:text-got-gold transition-colors font-bold flex items-center gap-2 p-3 hover:bg-got-gold/10 rounded-lg"
              >
                <Icon name="Swords" size={16} />
                Поле Битвы
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* GOT Theme Timer */}
      <div className="bg-got-black border-b-4 border-got-gold/50 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="text-got-gold font-bold text-sm md:text-lg text-center">⚔️ До конца тематики осталось:</div>
            <div className="flex gap-2 md:gap-4">
              <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg px-3 md:px-4 py-2">
                <div className="text-xl md:text-2xl font-bold text-got-fire">{timeLeft.days}</div>
                <div className="text-xs text-got-gold/70">дней</div>
              </div>
              <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg px-3 md:px-4 py-2">
                <div className="text-xl md:text-2xl font-bold text-got-fire">{timeLeft.hours}</div>
                <div className="text-xs text-got-gold/70">часов</div>
              </div>
              <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg px-3 md:px-4 py-2">
                <div className="text-xl md:text-2xl font-bold text-got-fire">{timeLeft.minutes}</div>
                <div className="text-xs text-got-gold/70">минут</div>
              </div>
              <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg px-3 md:px-4 py-2">
                <div className="text-xl md:text-2xl font-bold text-got-fire">{timeLeft.seconds}</div>
                <div className="text-xs text-got-gold/70">секунд</div>
              </div>
            </div>
            <Link 
              to="/game" 
              className="bg-gradient-to-r from-got-fire to-orange-600 hover:from-got-fire/90 hover:to-orange-700 text-white px-4 md:px-6 py-2 rounded-lg border-2 border-got-gold/50 font-bold transition-all"
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
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 md:px-6">
          <div className="mb-6 md:mb-8 animate-fade-in">
            <div key={quoteKey} className="inline-flex flex-col items-center space-y-2 bg-got-black/60 backdrop-blur-md rounded-lg px-4 md:px-8 py-3 md:py-4 mb-6 md:mb-8 border-2 border-got-gold/50 quote-fade-in">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-got-fire rounded-full animate-pulse"></div>
                <span className="text-sm md:text-lg font-bold text-got-gold italic quote-glow">"{gotQuotes[currentQuote].text}"</span>
                <div className="w-2 h-2 bg-got-fire rounded-full animate-pulse"></div>
              </div>
              <span className="text-xs md:text-sm text-got-gold/70 quote-fade-in">— {gotQuotes[currentQuote].author}</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 md:mb-8 leading-none tracking-wider">
            <span className="bg-gradient-to-r from-got-gold via-got-fire to-got-gold bg-clip-text text-transparent drop-shadow-2xl">
              СЕМЬ КОРОЛЕВСТВ
            </span><br />
            <span className="text-got-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">⚔️ ВЕСТЕРОСА ⚔️</span>
          </h1>
          
          <p className="text-base md:text-xl lg:text-2xl mb-8 md:mb-12 text-got-gold/70 max-w-3xl mx-auto font-light italic px-4">
            "Когда ты играешь в игру престолов, ты либо побеждаешь, либо умираешь. 
            Третьего не дано." — Серсея Ланнистер
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-got-fire to-orange-600 hover:from-got-fire/90 hover:to-orange-700 text-white border-2 border-got-gold/50 h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold relative overflow-hidden group w-full sm:w-auto"
              onClick={() => setActiveSection('map')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-got-fire/20 to-orange-600/20 animate-pulse"></div>
              <Icon name="Map" size={24} className="mr-3 relative z-10" />
              <span className="relative z-10">Карта Вестероса</span>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-got-gold/50 text-got-gold hover:bg-got-gold/20 hover:border-got-gold h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold bg-got-black/60 backdrop-blur-sm transition-all hover:scale-105 w-full sm:w-auto"
              onClick={changeQuote}
            >
              <Icon name="Scroll" size={24} className="mr-3" />
              Новая цитата
            </Button>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-2 border-got-gold/50 h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold relative overflow-hidden group w-full sm:w-auto"
              onClick={() => setIsVideoPlayerOpen(true)}
            >
              <Icon name="Play" size={24} className="mr-3" />
              Смотреть сериал
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Video Player */}
      {isVideoPlayerOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 ${
            isVideoMinimized 
              ? 'bottom-4 right-4 w-80 h-48' 
              : 'inset-4 md:inset-8'
          }`}
        >
          <div className="bg-got-black/95 backdrop-blur-xl border-4 border-got-gold/50 rounded-lg overflow-hidden h-full flex flex-col shadow-2xl">
            <div className="bg-gradient-to-r from-got-fire to-orange-600 px-4 py-3 flex items-center justify-between">
              <h3 className="text-got-gold font-bold text-lg flex items-center gap-2">
                <Icon name="Play" size={20} />
                🐉 Игра Престолов - Сезон {currentSeason}, Серия {currentEpisode}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsVideoMinimized(!isVideoMinimized)}
                  className="p-2 hover:bg-got-gold/20 rounded transition-colors"
                  title={isVideoMinimized ? "Развернуть" : "Свернуть"}
                >
                  <Icon name={isVideoMinimized ? "Maximize2" : "Minimize2"} size={20} className="text-got-gold" />
                </button>
                <button
                  onClick={() => setIsVideoPlayerOpen(false)}
                  className="p-2 hover:bg-got-gold/20 rounded transition-colors"
                  title="Закрыть"
                >
                  <Icon name="X" size={20} className="text-got-gold" />
                </button>
              </div>
            </div>
            
            {!isVideoMinimized && (
              <div className="bg-got-black/80 px-4 py-3 border-b-2 border-got-gold/30">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-got-gold text-sm font-bold mb-2 block">Сезон:</label>
                    <Select value={currentSeason.toString()} onValueChange={(val) => setCurrentSeason(Number(val))}>
                      <SelectTrigger className="bg-got-black/60 border-got-gold/50 text-got-gold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-got-black/95 border-got-gold/50">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((season) => (
                          <SelectItem key={season} value={season.toString()} className="text-got-gold hover:bg-got-gold/20">
                            Сезон {season}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <label className="text-got-gold text-sm font-bold mb-2 block">Серия:</label>
                    <Select value={currentEpisode.toString()} onValueChange={(val) => setCurrentEpisode(Number(val))}>
                      <SelectTrigger className="bg-got-black/60 border-got-gold/50 text-got-gold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-got-black/95 border-got-gold/50">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((episode) => (
                          <SelectItem key={episode} value={episode.toString()} className="text-got-gold hover:bg-got-gold/20">
                            Серия {episode}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      if (currentEpisode > 1) {
                        setCurrentEpisode(currentEpisode - 1)
                      } else if (currentSeason > 1) {
                        setCurrentSeason(currentSeason - 1)
                        setCurrentEpisode(10)
                      }
                    }}
                    disabled={currentSeason === 1 && currentEpisode === 1}
                    className="flex-1 bg-got-black/60 border-2 border-got-gold/50 text-got-gold py-2 px-4 rounded-lg hover:bg-got-gold/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-bold flex items-center justify-center gap-2"
                  >
                    <Icon name="ChevronLeft" size={20} />
                    <span className="hidden md:inline">Предыдущая</span>
                    <span className="md:hidden">Пред.</span>
                  </button>
                  
                  <div className="text-got-gold/70 text-sm text-center px-2">
                    🇷🇺 VK Video
                  </div>
                  
                  <button
                    onClick={() => {
                      if (currentEpisode < 10) {
                        setCurrentEpisode(currentEpisode + 1)
                      } else if (currentSeason < 8) {
                        setCurrentSeason(currentSeason + 1)
                        setCurrentEpisode(1)
                      }
                    }}
                    disabled={currentSeason === 8 && currentEpisode === 10}
                    className="flex-1 bg-got-black/60 border-2 border-got-gold/50 text-got-gold py-2 px-4 rounded-lg hover:bg-got-gold/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-bold flex items-center justify-center gap-2"
                  >
                    <span className="hidden md:inline">Следующая</span>
                    <span className="md:hidden">След.</span>
                    <Icon name="ChevronRight" size={20} />
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex-1 bg-black relative">
              <iframe
                key={`s${currentSeason}e${currentEpisode}`}
                className="w-full h-full"
                src={`https://vk.com/video_ext.php?oid=-1&id=456239017&hd=2`}
                title="Game of Thrones"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
              <div className="absolute bottom-4 left-4 bg-got-black/80 backdrop-blur-md border-2 border-got-gold/50 rounded-lg px-4 py-2 text-got-gold text-sm font-bold">
                📺 VK Video • RU
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Great Houses Section */}
      <section className="py-8 md:py-16 px-4 md:px-6 relative bg-gradient-to-r from-got-black via-got-iron/20 to-got-black backdrop-blur-sm border-y-4 border-got-gold/30">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-got-gold">
              ⚔️ Великие Дома Вестероса ⚔️
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg p-4 md:p-6 backdrop-blur-md hover:border-got-fire hover:scale-105 transition-all cursor-pointer">
                    <div className="text-3xl md:text-5xl mb-2 md:mb-3">🐺</div>
                    <h4 className="text-got-gold font-bold text-sm md:text-lg mb-1 md:mb-2">Дом Старков</h4>
                    <p className="text-got-gold/60 text-xs md:text-sm italic">"Зима близко"</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-got-black/95 backdrop-blur-xl border-4 border-got-gold/50">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-got-gold mb-4">🐺 Дом Старков из Винтерфелла</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-white max-h-[60vh] overflow-y-auto">
                    <p className="text-xl italic text-got-gold/80">"Зима близко"</p>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">📜 История:</h4>
                      <p>Старки правят Севером уже тысячи лет, со времён Эпохи Героев. Они произошли от Брандона Строителя, который возвёл Стену и основал дом Старков в Винтерфелле.</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">👑 Правители:</h4>
                      <p>Эддард "Нед" Старк, Лорд Винтерфелла и Хранитель Севера. После его смерти - Робб Старк, Король Севера.</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">🏰 Резиденция:</h4>
                      <p>Винтерфелл - древний замок на Севере с горячими источниками под стенами и криптами, где покоятся все Старки.</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">⚔️ Характеристики:</h4>
                      <p>Честь, справедливость, верность. Старки почитают Старых Богов и славятся своей неподкупностью и благородством.</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">👥 Известные члены:</h4>
                      <p>Эддард Старк, Кейтилин Старк, Робб Старк, Санса Старк, Арья Старк, Бран Старк, Рикон Старк, Джон Сноу (бастард)</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg p-4 md:p-6 backdrop-blur-md hover:border-got-fire hover:scale-105 transition-all cursor-pointer">
                    <div className="text-3xl md:text-5xl mb-2 md:mb-3">🦁</div>
                    <h4 className="text-got-gold font-bold text-sm md:text-lg mb-1 md:mb-2">Дом Ланнистеров</h4>
                    <p className="text-got-gold/60 text-xs md:text-sm italic">"Услышь мой рёв!"</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-got-black/95 backdrop-blur-xl border-4 border-got-gold/50">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-got-gold mb-4">🦁 Дом Ланнистеров из Бобрового Утёса</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-white max-h-[60vh] overflow-y-auto">
                    <p className="text-xl italic text-got-gold/80">"Услышь мой рёв!" (неофициальный девиз: "Ланнистеры всегда платят свои долги")</p>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">📜 История:</h4>
                      <p>Богатейший дом Вестероса, происходящий от Ланна Умного. Их богатство происходит из золотых рудников под Бобровым Утёсом.</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">👑 Правители:</h4>
                      <p>Тайвин Ланнистер - Лорд Бобрового Утёса, Хранитель Запада и Десница Короля при нескольких правителях.</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">🏰 Резиденция:</h4>
                      <p>Бобровый Утёс - огромная крепость, вырезанная из скалы над морем, с золотыми рудниками в глубинах.</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">⚔️ Характеристики:</h4>
                      <p>Богатство, власть, амбиции, хитрость. Ланнистеры славятся своей гордостью и стремлением к власти.</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">👥 Известные члены:</h4>
                      <p>Тайвин Ланнистер, Серсея Ланнистер, Джейме Ланнистер, Тирион Ланнистер</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg p-4 md:p-6 backdrop-blur-md hover:border-got-fire hover:scale-105 transition-all cursor-pointer">
                    <div className="text-3xl md:text-5xl mb-2 md:mb-3">🐉</div>
                    <h4 className="text-got-gold font-bold text-sm md:text-lg mb-1 md:mb-2">Дом Таргариенов</h4>
                    <p className="text-got-gold/60 text-xs md:text-sm italic">"Огонь и кровь"</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-got-black/95 backdrop-blur-xl border-4 border-got-gold/50">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-got-gold mb-4">🐉 Дом Таргариенов из Драконьего Камня</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-white max-h-[60vh] overflow-y-auto">
                    <p className="text-xl italic text-got-gold/80">"Огонь и кровь"</p>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">📜 История:</h4>
                      <p>Древний валирийский дом, единственный выживший после Рока Валирии. Эйгон Завоеватель на драконах объединил Семь Королевств 300 лет назад.</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">👑 Правители:</h4>
                      <p>Правили Железным Троном почти 300 лет, пока их не свергли во время восстания Роберта Баратеона.</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">🏰 Резиденция:</h4>
                      <p>Драконий Камень - мрачная крепость на острове, построенная с помощью валирийской магии в форме драконов.</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">⚔️ Характеристики:</h4>
                      <p>Драконья кровь, огнестойкость, склонность к безумию. "Когда рождается Таргариен, боги подбрасывают монетку".</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">👥 Известные члены:</h4>
                      <p>Эйгон Завоеватель, Безумный Король Эйрис II, Рейгар Таргариен, Визерис Таргариен, Дейнерис Таргариен</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <div className="bg-got-black/80 border-2 border-got-gold/50 rounded-lg p-4 md:p-6 backdrop-blur-md hover:border-got-fire hover:scale-105 transition-all cursor-pointer">
                    <div className="text-3xl md:text-5xl mb-2 md:mb-3">🦌</div>
                    <h4 className="text-got-gold font-bold text-sm md:text-lg mb-1 md:mb-2">Дом Баратеонов</h4>
                    <p className="text-got-gold/60 text-xs md:text-sm italic">"Наша ярость"</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-got-black/95 backdrop-blur-xl border-4 border-got-gold/50">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-got-gold mb-4">🦌 Дом Баратеонов из Штормового Предела</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-white max-h-[60vh] overflow-y-auto">
                    <p className="text-xl italic text-got-gold/80">"Наша ярость"</p>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">📜 История:</h4>
                      <p>Относительно молодой дом, основанный бастардом Таргариенов. Роберт Баратеон возглавил восстание и сверг Таргариенов, став королём.</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">👑 Правители:</h4>
                      <p>Роберт Баратеон - Король Семи Королевств после свержения Таргариенов. Его братья: Станнис и Ренли.</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">🏰 Резиденция:</h4>
                      <p>Штормовой Предел - неприступная крепость, построенная с использованием магии, способная выдержать любой шторм.</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">⚔️ Характеристики:</h4>
                      <p>Сила, ярость, воинственность. Баратеоны известны своим боевым духом и мощью в бою.</p>
                    </div>
                    <div>
                      <h4 className="text-got-fire font-bold text-lg mb-2">👥 Известные члены:</h4>
                      <p>Роберт Баратеон, Станнис Баратеон, Ренли Баратеон, Джоффри (официально Баратеон)</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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