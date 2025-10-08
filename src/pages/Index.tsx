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
import MaxEventBanner from '@/components/MaxEventBanner'
import EnergySystem from '@/components/EnergySystem'
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
    name: 'Бали - Остров Богов',
    country: 'Индонезия',
    description: 'Тропический рай с древними храмами, рисовыми террасами и живописными пляжами',
    image: '/img/6930efc9-60b7-4e40-8cef-0658723a667f.jpg',
    category: 'Тропический курорт',
    highlights: ['Храм Танах Лот', 'Рисовые террасы Тегаллаланг', 'Вулкан Батур', 'Убуд'],
    climate: 'Тропический климат с сухим и влажным сезонами',
    bestTime: 'Апрель-октябрь (сухой сезон)',
    activities: ['Серфинг', 'Дайвинг', 'Йога-ретриты', 'Посещение храмов'],
    culture: 'Балийская культура с уникальными традициями и церемониями',
    history: 'Древние индуистские традиции на мусульманском острове',
    cuisine: ['Наси горенг', 'Сатай', 'Бабигулинг', 'Тропические фрукты'],
    transportation: 'Скутеры, такси, трансфер',
    accommodation: ['Виллы', 'Бунгало', 'Отели'],
    budget: '1000-3000₽ в день',
    language: 'Индонезийский, английский',
    currency: 'Индонезийская рупия',
    safety: 'Безопасно для туристов',
    tips: ['Уважайте местные традиции', 'Торгуйтесь на рынках', 'Арендуйте скутер']
  },
  {
    id: '2',
    name: 'Исландия - Земля огня и льда',
    country: 'Исландия',
    description: 'Удивительная страна с ледниками, вулканами, гейзерами и северным сиянием',
    image: '/img/5a0ae15a-245d-4579-a7d0-347604412c6e.jpg',
    category: 'Природное чудо',
    highlights: ['Голубая лагуна', 'Водопад Гюдльфосс', 'Гейзер Строккюр', 'Ледниковая лагуна Йокульсарлон'],
    climate: 'Субарктический климат с прохладным летом и мягкой зимой',
    bestTime: 'Июнь-август (летний сезон), сентябрь-март (северное сияние)',
    activities: ['Наблюдение за северным сиянием', 'Купание в горячих источниках', 'Треккинг по ледникам', 'Китовое сафари'],
    culture: 'Скандинавские традиции с уникальным фольклором и эльфами',
    history: 'Заселена викингами в 9 веке, старейший парламент в мире',
    cuisine: ['Скир', 'Хотдог по-исландски', 'Ферментированная акула', 'Свежая рыба'],
    transportation: 'Аренда автомобиля, экскурсионные автобусы',
    accommodation: ['Отели', 'Гостевые дома', 'Кемпинги'],
    budget: '5000-10000₽ в день',
    language: 'Исландский, английский',
    currency: 'Исландская крона',
    safety: 'Очень безопасно для путешественников',
    tips: ['Бронируйте жильё заранее', 'Берегите природу', 'Готовьтесь к переменчивой погоде']
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
  
  const travelQuotes = [
    { text: "Мир - это книга, и те, кто не путешествует, читают только одну страницу", author: "Святой Августин" },
    { text: "Путешествие - это награда само по себе", author: "Ибн Баттута" },
    { text: "Не все те, кто странствует, потеряны", author: "Дж. Р. Р. Толкин" },
    { text: "Жизнь - это либо отважное приключение, либо ничего", author: "Хелен Келлер" },
    { text: "Путешествуй, пока молод и способен", author: "Будда" },
    { text: "Приключение стоит того", author: "Амелия Эрхарт" },
    { text: "Собирайте впечатления, а не вещи", author: "Народная мудрость" },
    { text: "Лучшие виды открываются после самого трудного подъёма", author: "Народная мудрость" },
    { text: "Путешествие делает человека скромным", author: "Гюстав Флобер" },
    { text: "Мы путешествуем не для того, чтобы сбежать от жизни, а для того, чтобы жизнь не ускользнула от нас", author: "Аноним" },
    { text: "Инвестируйте в путешествия - это единственное, что делает вас богаче", author: "Народная мудрость" },
    { text: "Путешествие учит терпимости", author: "Бенджамин Дизраэли" },
    { text: "Где бы ты ни был - будь там полностью", author: "Конфуций" },
    { text: "Путешествие - это единственное, на что тратишь деньги и становишься богаче", author: "Аноним" },
    { text: "Жизнь начинается там, где заканчивается зона комфорта", author: "Нил Дональд Уолш" },
    { text: "Открывай новые места, создавай новые воспоминания", author: "Народная мудрость" },
    { text: "Путешествие - это способ измерить жизнь", author: "Авиценна" },
    { text: "Каждое путешествие начинается с первого шага", author: "Лао Цзы" },
    { text: "Мир слишком велик, чтобы сидеть дома", author: "Народная мудрость" },
    { text: "Лучшее образование - это путешествие", author: "Марк Твен" }
  ]
  
  const playQuoteSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1u+zjiwgVbfz8qGDKAU=')
    audio.volume = 0.3
    audio.play().catch(() => {})
  }

  const changeQuote = () => {
    playQuoteSound()
    setCurrentQuote((prev) => (prev + 1) % travelQuotes.length)
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
    setCurrentQuote(Math.floor(Math.random() * travelQuotes.length))
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
      <div className="min-h-screen bg-gradient-to-br from-max-violet via-max-purple to-black">
        {/* Navigation */}
        <nav className="border-b-2 border-max-pink/30 bg-black/90 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setActiveSection('home')} 
                className="flex items-center space-x-2 sm:space-x-3"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-max-pink to-max-purple flex items-center justify-center shadow-lg shadow-max-pink/50">
                  <Icon name="Plane" size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent">СТРАННИК</h1>
              </button>
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => setActiveSection('home')} 
                  className="text-max-pink/80 hover:text-max-pink transition-colors font-bold"
                >
                  Главная
                </button>
                <button 
                  onClick={() => setActiveSection('map')} 
                  className="text-max-pink transition-colors font-bold"
                >
                  Карта
                </button>
                <Link 
                  to="/hotels" 
                  className="text-max-pink/80 hover:text-max-pink transition-colors font-bold flex items-center gap-1"
                >
                  <Icon name="Hotel" size={16} />
                  Отели
                </Link>
                <button 
                  onClick={() => setActiveSection('kingdoms')} 
                  className="text-max-pink/80 hover:text-max-pink transition-colors font-bold"
                >
                  Направления
                </button>
                <Link 
                  to="/news" 
                  className="text-max-pink/80 hover:text-max-pink transition-colors font-bold"
                >
                  Новости
                </Link>
                <Link 
                  to="/radar" 
                  className="text-max-pink/80 hover:text-max-pink transition-colors font-bold flex items-center gap-1"
                >
                  <Icon name="Plane" size={16} />
                  Радар
                </Link>
              </div>
              <div className="md:hidden">
                <Link 
                  to="/hotels" 
                  className="text-max-pink/80 hover:text-max-pink transition-colors flex items-center gap-1 text-sm"
                >
                  <Icon name="Hotel" size={18} />
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
      <div className="min-h-screen bg-gradient-to-br from-max-violet via-max-purple to-black text-white">
        <nav className="border-b-2 border-max-pink/30 bg-black/90 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setActiveSection('home')} 
                className="flex items-center space-x-3"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-max-pink to-max-purple flex items-center justify-center shadow-lg shadow-max-pink/50">
                  <Icon name="Plane" size={28} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent">СТРАННИК</h1>
              </button>
              <Button 
                onClick={() => setActiveSection('home')}
                className="bg-gradient-to-r from-max-pink to-max-purple hover:from-max-purple hover:to-max-pink shadow-lg shadow-max-pink/50 text-white font-bold"
              >
                Назад
              </Button>
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent mb-4">🌍 Семь Регионов Мира</h2>
            <p className="text-xl text-max-pink/80">Откройте для себя уникальные направления для путешествий</p>
            <p className="text-sm text-max-pink/60 mt-2">✈️ Туристический сайт • Найдите своё следующее приключение</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {kingdoms.map((kingdom) => (
              <Dialog key={kingdom.id}>
                <DialogTrigger asChild>
                  <div className="relative bg-black/80 border-2 border-max-pink/40 hover:border-max-pink rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer group shadow-lg hover:shadow-max-pink/50">
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"
                      style={{ backgroundImage: `url(${kingdom.image})` }}
                    />
                    <div className="relative z-10 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                      <div className="text-7xl mb-4 text-center transform group-hover:scale-110 transition-transform">{kingdom.sigil}</div>
                      <h3 className="text-2xl font-bold text-max-pink text-center mb-2">{kingdom.name}</h3>
                      <p className="text-max-pink/70 text-center italic text-sm mb-3">"{kingdom.words}"</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-max-pink font-bold">📍 Город:</span>
                          <span className="text-white">{kingdom.seat}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-max-pink font-bold">🌍 Регион:</span>
                          <span className="text-white text-xs">{kingdom.house}</span>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <span className="text-max-pink/60 text-xs">✈️ Узнать больше →</span>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-black/95 border-2 border-max-pink/50 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="text-7xl mb-4 text-center">{kingdom.sigil}</div>
                    <DialogTitle className="text-4xl text-max-pink text-center">{kingdom.name}</DialogTitle>
                    <DialogDescription className="text-max-pink/70 text-center italic text-xl">
                      "{kingdom.words}"
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-6">
                    <div className="bg-black/60 border-2 border-max-pink/30 rounded-lg p-4">
                      <h3 className="text-max-pink font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="MapPin" size={20} />
                        Главный город
                      </h3>
                      <p className="text-white">{kingdom.seat}</p>
                    </div>
                    <div className="bg-black/60 border-2 border-max-pink/30 rounded-lg p-4">
                      <h3 className="text-max-pink font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="Globe" size={20} />
                        Туристический регион
                      </h3>
                      <p className="text-white">{kingdom.house}</p>
                    </div>
                    <div className="bg-black/60 border-2 border-max-pink/30 rounded-lg p-4">
                      <h3 className="text-max-pink font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="BookOpen" size={20} />
                        Описание
                      </h3>
                      <p className="text-white/90">{kingdom.description}</p>
                    </div>
                    <div className="bg-black/60 border-2 border-max-pink/30 rounded-lg p-4">
                      <h3 className="text-max-pink font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="Plane" size={20} />
                        Популярные направления
                      </h3>
                      <p className="text-white/90">{kingdom.rulers}</p>
                    </div>
                    <div className="bg-black/60 border-2 border-max-pink/30 rounded-lg p-4">
                      <h3 className="text-max-pink font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="Heart" size={20} />
                        Что посмотреть
                      </h3>
                      <p className="text-white/90">{kingdom.culture}</p>
                    </div>
                    <div className="bg-black/60 border-2 border-max-pink/30 rounded-lg p-4">
                      <h3 className="text-max-pink font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="Sun" size={20} />
                        Климат и погода
                      </h3>
                      <p className="text-white/90">{kingdom.climate}</p>
                    </div>
                    <div className="bg-black/60 border-2 border-max-pink/30 rounded-lg p-4">
                      <h3 className="text-max-pink font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="Building2" size={20} />
                        Популярные города
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {kingdom.cities.map((city, idx) => (
                          <span key={idx} className="bg-max-pink/20 text-max-pink px-3 py-1 rounded-full text-sm border border-max-pink/40">
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-black/60 border-2 border-max-pink/30 rounded-lg p-4">
                      <h3 className="text-max-pink font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="Map" size={20} />
                        Достопримечательности
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {kingdom.landmarks.map((landmark, idx) => (
                          <span key={idx} className="bg-max-purple/20 text-max-pink px-3 py-1 rounded-full text-sm border border-max-purple/40">
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
      <div className="min-h-screen bg-gradient-to-br from-max-violet via-max-purple to-black">
        {/* Navigation */}
        <nav className="border-b-2 border-max-pink/30 bg-black/90 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-max-pink to-max-purple flex items-center justify-center shadow-lg shadow-max-pink/50">
                  <Icon name="Plane" size={28} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent">СТРАННИК</h1>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <button 
                  onClick={() => setActiveSection('home')} 
                  className="text-max-pink/80 hover:text-max-pink transition-colors font-bold"
                >
                  Главная
                </button>
                <button 
                  onClick={() => setActiveSection('map')} 
                  className="text-max-pink/80 hover:text-max-pink transition-colors font-bold"
                >
                  Карта
                </button>
                <button 
                  onClick={() => setActiveSection('kingdoms')} 
                  className="text-max-pink/80 hover:text-max-pink transition-colors font-bold"
                >
                  Направления
                </button>
                <Link 
                  to="/news" 
                  className="text-max-pink/80 hover:text-max-pink transition-colors font-bold"
                >
                  Новости
                </Link>
                <Link 
                  to="/radar" 
                  className="text-max-pink/80 hover:text-max-pink transition-colors font-bold flex items-center gap-1"
                >
                  <Icon name="Plane" size={16} />
                  Радар
                </Link>
                <button 
                  onClick={() => setActiveSection('about')} 
                  className="text-max-pink transition-colors font-bold"
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
      className="min-h-screen bg-gradient-to-br from-max-violet via-max-purple to-black text-white"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <EnergySystem />

      {/* Swipe Indicator */
      {showSwipeHint && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 lg:hidden pointer-events-none animate-bounce">
          <div className="bg-black/80 backdrop-blur-md border-2 border-max-pink/50 rounded-full px-6 py-3 flex items-center gap-3 shadow-lg shadow-max-pink/30">
            <Icon name="ChevronLeft" size={20} className="text-max-pink/50" />
            <span className="text-max-pink/70 text-sm font-bold">👈 Свайп для навигации 👉</span>
            <Icon name="ChevronRight" size={20} className="text-max-pink/50" />
          </div>
        </div>
      )}

      {/* Section Progress Indicator */}
      <div className="fixed top-24 right-4 z-40 lg:hidden flex flex-col gap-3">
        {sections.map((section) => {
          const sectionNames: Record<string, string> = {
            home: 'Главная',
            map: 'Карта',
            kingdoms: 'Направления',
            about: 'О нас'
          }
          return (
            <div
              key={section}
              className="flex items-center gap-2"
            >
              <span className={`text-xs font-bold transition-all ${
                activeSection === section 
                  ? 'text-max-pink' 
                  : 'text-max-pink/40'
              }`}>
                {activeSection === section && sectionNames[section]}
              </span>
              <div
                className={`rounded-full transition-all ${
                  activeSection === section 
                    ? 'bg-max-pink w-3 h-3 shadow-lg shadow-max-pink/50' 
                    : 'bg-max-pink/30 w-2 h-2'
                }`}
              />
            </div>
          )
        })}
      </div>

      <AirlineAds />
      {/* Navigation */}
      <nav className="border-b-2 border-max-pink/30 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-max-pink to-max-purple flex items-center justify-center shadow-lg shadow-max-pink/50">
                <Icon name="Plane" size={28} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent">СТРАННИК</h1>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <button 
                onClick={() => setActiveSection('home')} 
                className="text-max-pink transition-colors font-bold"
              >
                Главная
              </button>
              <button 
                onClick={() => setActiveSection('map')} 
                className="text-max-pink/80 hover:text-max-pink transition-colors font-bold"
              >
                Карта
              </button>
              <button 
                onClick={() => setActiveSection('kingdoms')} 
                className="text-max-pink/80 hover:text-max-pink transition-colors font-bold"
              >
                Направления
              </button>
              <button 
                onClick={() => setActiveSection('about')} 
                className="text-max-pink/80 hover:text-max-pink transition-colors font-bold"
              >
                О проекте
              </button>
              <Link 
                to="/news" 
                className="text-max-pink/80 hover:text-max-pink transition-colors font-bold"
              >
                Новости
              </Link>
              <Link 
                to="/radar" 
                className="text-max-pink/80 hover:text-max-pink transition-colors font-bold flex items-center gap-1"
              >
                <Icon name="Plane" size={16} />
                Радар
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-max-pink/20 hover:bg-max-pink/30 transition-colors border border-max-pink/50"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} className="text-max-pink" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black/95 border-t-2 border-max-pink/30 backdrop-blur-md">
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              <button 
                onClick={() => {
                  setActiveSection('home')
                  setIsMobileMenuOpen(false)
                }} 
                className="text-max-pink transition-colors font-bold text-left p-3 hover:bg-max-pink/10 rounded-lg"
              >
                Главная
              </button>
              <button 
                onClick={() => {
                  setActiveSection('map')
                  setIsMobileMenuOpen(false)
                }} 
                className="text-max-pink/80 hover:text-max-pink transition-colors font-bold text-left p-3 hover:bg-max-pink/10 rounded-lg"
              >
                Карта
              </button>
              <button 
                onClick={() => {
                  setActiveSection('kingdoms')
                  setIsMobileMenuOpen(false)
                }} 
                className="text-max-pink/80 hover:text-max-pink transition-colors font-bold text-left p-3 hover:bg-max-pink/10 rounded-lg"
              >
                Направления
              </button>
              <button 
                onClick={() => {
                  setActiveSection('about')
                  setIsMobileMenuOpen(false)
                }} 
                className="text-max-pink/80 hover:text-max-pink transition-colors font-bold text-left p-3 hover:bg-max-pink/10 rounded-lg"
              >
                О проекте
              </button>
              <Link 
                to="/news" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-max-pink/80 hover:text-max-pink transition-colors font-bold text-left p-3 hover:bg-max-pink/10 rounded-lg"
              >
                Новости
              </Link>
              <Link 
                to="/radar" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-max-pink/80 hover:text-max-pink transition-colors font-bold flex items-center gap-2 p-3 hover:bg-max-pink/10 rounded-lg"
              >
                <Icon name="Plane" size={16} />
                Радар
              </Link>
            </div>
          </div>
        )}
      </nav>

      <MaxEventBanner />

      {/* Theme Timer */}
      <div className="bg-black border-b-2 border-max-pink/30 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="text-max-pink font-bold text-sm md:text-lg text-center">✈️ До конца тематики осталось:</div>
            <div className="flex gap-2 md:gap-4">
              <div className="bg-black/80 border-2 border-max-pink/50 rounded-lg px-3 md:px-4 py-2 shadow-lg shadow-max-pink/20">
                <div className="text-xl md:text-2xl font-bold text-max-pink">{timeLeft.days}</div>
                <div className="text-xs text-max-pink/70">дней</div>
              </div>
              <div className="bg-black/80 border-2 border-max-pink/50 rounded-lg px-3 md:px-4 py-2 shadow-lg shadow-max-pink/20">
                <div className="text-xl md:text-2xl font-bold text-max-pink">{timeLeft.hours}</div>
                <div className="text-xs text-max-pink/70">часов</div>
              </div>
              <div className="bg-black/80 border-2 border-max-pink/50 rounded-lg px-3 md:px-4 py-2 shadow-lg shadow-max-pink/20">
                <div className="text-xl md:text-2xl font-bold text-max-pink">{timeLeft.minutes}</div>
                <div className="text-xs text-max-pink/70">минут</div>
              </div>
              <div className="bg-black/80 border-2 border-max-pink/50 rounded-lg px-3 md:px-4 py-2 shadow-lg shadow-max-pink/20">
                <div className="text-xl md:text-2xl font-bold text-max-pink">{timeLeft.seconds}</div>
                <div className="text-xs text-max-pink/70">секунд</div>
              </div>
            </div>
            <Link 
              to="/game" 
              className="bg-gradient-to-r from-max-pink to-max-purple hover:from-max-purple hover:to-max-pink text-white px-4 md:px-6 py-2 rounded-lg shadow-lg shadow-max-pink/50 font-bold transition-all"
            >
              🎮 Играть
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
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-max-purple/40 to-black/80" />
        </div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-3 h-3 bg-max-pink rounded-full animate-pulse shadow-lg shadow-max-pink/50"></div>
          <div className="absolute top-40 right-20 w-4 h-4 bg-max-purple rounded-full animate-pulse shadow-lg shadow-max-purple/50"></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-max-pink rounded-full animate-pulse shadow-lg shadow-max-pink/50"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-max-purple rounded-full animate-pulse shadow-lg shadow-max-purple/50"></div>
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-max-pink rounded-full animate-pulse shadow-lg shadow-max-pink/50"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 md:px-6">
          <div className="mb-6 md:mb-8 animate-fade-in">
            <div key={quoteKey} className="inline-flex flex-col items-center space-y-2 bg-black/60 backdrop-blur-md rounded-lg px-4 md:px-8 py-3 md:py-4 mb-6 md:mb-8 border-2 border-max-pink/50 quote-fade-in shadow-lg shadow-max-pink/30">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-max-pink rounded-full animate-pulse"></div>
                <span className="text-sm md:text-lg font-bold text-max-pink italic quote-glow">"{travelQuotes[currentQuote].text}"</span>
                <div className="w-2 h-2 bg-max-pink rounded-full animate-pulse"></div>
              </div>
              <span className="text-xs md:text-sm text-max-pink/70 quote-fade-in">— {travelQuotes[currentQuote].author}</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 md:mb-8 leading-none tracking-wider">
            <span className="bg-gradient-to-r from-max-pink via-max-purple to-max-pink bg-clip-text text-transparent drop-shadow-2xl">
              СЕМЬ РЕГИОНОВ
            </span><br />
            <span className="text-max-pink text-3xl sm:text-4xl md:text-5xl lg:text-6xl">✈️ МИРА ✈️</span>
          </h1>
          
          <p className="text-base md:text-xl lg:text-2xl mb-4 md:mb-6 text-max-pink/70 max-w-3xl mx-auto font-light italic px-4">
            Это сайт для путешествий
          </p>
          
          <p className="text-sm md:text-lg mb-8 md:mb-12 text-max-pink/60 max-w-3xl mx-auto font-light px-4">
            Откройте для себя самые захватывающие направления планеты. 
            Каждое путешествие — это новая история в книге вашей жизни.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-max-pink to-max-purple hover:from-max-purple hover:to-max-pink text-white shadow-lg shadow-max-pink/50 h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold relative overflow-hidden group w-full sm:w-auto"
              onClick={() => window.open('https://www.booking.com', '_blank')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-max-pink/20 to-max-purple/20 animate-pulse"></div>
              <Icon name="Hotel" size={24} className="mr-3 relative z-10" />
              <span className="relative z-10">Забронировать отель</span>
            </Button>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-max-purple to-fuchsia-600 hover:from-max-purple/90 hover:to-fuchsia-700 text-white shadow-lg shadow-max-purple/50 h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold relative overflow-hidden group w-full sm:w-auto"
              onClick={() => setActiveSection('kingdoms')}
            >
              <Icon name="Compass" size={24} className="mr-3" />
              Исследовать регионы
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-max-pink/50 text-max-pink hover:bg-max-pink/20 hover:border-max-pink h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold bg-black/60 backdrop-blur-sm transition-all hover:scale-105 w-full sm:w-auto"
              onClick={changeQuote}
            >
              <Icon name="Sparkles" size={24} className="mr-3" />
              Вдохновение
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
          <div className="bg-black/95 backdrop-blur-xl border-2 border-max-pink/50 rounded-lg overflow-hidden h-full flex flex-col shadow-2xl">
            <div className="bg-gradient-to-r from-max-pink to-max-purple px-4 py-3 flex items-center justify-between">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <Icon name="Play" size={20} />
                🎥 Видео - Сезон {currentSeason}, Серия {currentEpisode}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsVideoMinimized(!isVideoMinimized)}
                  className="p-2 hover:bg-white/20 rounded transition-colors"
                  title={isVideoMinimized ? "Развернуть" : "Свернуть"}
                >
                  <Icon name={isVideoMinimized ? "Maximize2" : "Minimize2"} size={20} className="text-white" />
                </button>
                <button
                  onClick={() => setIsVideoPlayerOpen(false)}
                  className="p-2 hover:bg-white/20 rounded transition-colors"
                  title="Закрыть"
                >
                  <Icon name="X" size={20} className="text-white" />
                </button>
              </div>
            </div>
            
            {!isVideoMinimized && (
              <div className="bg-black/80 px-4 py-3 border-b-2 border-max-pink/30">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-max-pink text-sm font-bold mb-2 block">Сезон:</label>
                    <Select value={currentSeason.toString()} onValueChange={(val) => setCurrentSeason(Number(val))}>
                      <SelectTrigger className="bg-black/60 border-max-pink/50 text-max-pink">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-max-pink/50">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((season) => (
                          <SelectItem key={season} value={season.toString()} className="text-max-pink hover:bg-max-pink/20">
                            Сезон {season}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <label className="text-max-pink text-sm font-bold mb-2 block">Серия:</label>
                    <Select value={currentEpisode.toString()} onValueChange={(val) => setCurrentEpisode(Number(val))}>
                      <SelectTrigger className="bg-black/60 border-max-pink/50 text-max-pink">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-max-pink/50">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((episode) => (
                          <SelectItem key={episode} value={episode.toString()} className="text-max-pink hover:bg-max-pink/20">
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
                    className="flex-1 bg-black/60 border-2 border-max-pink/50 text-max-pink py-2 px-4 rounded-lg hover:bg-max-pink/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-bold flex items-center justify-center gap-2"
                  >
                    <Icon name="ChevronLeft" size={20} />
                    <span className="hidden md:inline">Предыдущая</span>
                    <span className="md:hidden">Пред.</span>
                  </button>
                  
                  <div className="text-max-pink/70 text-sm text-center px-2">
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
                    className="flex-1 bg-black/60 border-2 border-max-pink/50 text-max-pink py-2 px-4 rounded-lg hover:bg-max-pink/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-bold flex items-center justify-center gap-2"
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
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border-2 border-max-pink/50 rounded-lg px-4 py-2 text-max-pink text-sm font-bold">
                📺 VK Video • RU
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popular Categories Section */}
      <section className="py-8 md:py-16 px-4 md:px-6 relative bg-gradient-to-r from-max-violet via-max-purple/20 to-max-violet backdrop-blur-sm border-y-2 border-max-pink/30">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent">
              ✈️ Популярные категории путешествий ✈️
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="bg-black/80 border-2 border-max-pink/50 rounded-lg p-4 md:p-6 backdrop-blur-md hover:border-max-pink hover:scale-105 transition-all cursor-pointer shadow-lg hover:shadow-max-pink/50">
                    <div className="text-3xl md:text-5xl mb-2 md:mb-3">🐺</div>
                    <h4 className="text-max-pink font-bold text-sm md:text-lg mb-1 md:mb-2">Дом Старков</h4>
                    <p className="text-max-pink/60 text-xs md:text-sm italic">"Зима близко"</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-black/95 backdrop-blur-xl border-2 border-max-pink/50">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-max-pink mb-4">🐺 Дом Старков из Винтерфелла</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-white max-h-[60vh] overflow-y-auto">
                    <p className="text-xl italic text-max-pink/80">"Зима близко"</p>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">📜 История:</h4>
                      <p>Старки правят Севером уже тысячи лет, со времён Эпохи Героев. Они произошли от Брандона Строителя, который возвёл Стену и основал дом Старков в Винтерфелле.</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">👑 Правители:</h4>
                      <p>Эддард "Нед" Старк, Лорд Винтерфелла и Хранитель Севера. После его смерти - Робб Старк, Король Севера.</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">🏰 Резиденция:</h4>
                      <p>Винтерфелл - древний замок на Севере с горячими источниками под стенами и криптами, где покоятся все Старки.</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">⚔️ Характеристики:</h4>
                      <p>Честь, справедливость, верность. Старки почитают Старых Богов и славятся своей неподкупностью и благородством.</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">👥 Известные члены:</h4>
                      <p>Эддард Старк, Кейтилин Старк, Робб Старк, Санса Старк, Арья Старк, Бран Старк, Рикон Старк, Джон Сноу (бастард)</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <div className="bg-black/80 border-2 border-max-pink/50 rounded-lg p-4 md:p-6 backdrop-blur-md hover:border-max-pink hover:scale-105 transition-all cursor-pointer shadow-lg hover:shadow-max-pink/50">
                    <div className="text-3xl md:text-5xl mb-2 md:mb-3">🦁</div>
                    <h4 className="text-max-pink font-bold text-sm md:text-lg mb-1 md:mb-2">Дом Ланнистеров</h4>
                    <p className="text-max-pink/60 text-xs md:text-sm italic">"Услышь мой рёв!"</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-black/95 backdrop-blur-xl border-2 border-max-pink/50">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-max-pink mb-4">🦁 Дом Ланнистеров из Бобрового Утёса</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-white max-h-[60vh] overflow-y-auto">
                    <p className="text-xl italic text-max-pink/80">"Услышь мой рёв!" (неофициальный девиз: "Ланнистеры всегда платят свои долги")</p>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">📜 История:</h4>
                      <p>Богатейший дом Вестероса, происходящий от Ланна Умного. Их богатство происходит из золотых рудников под Бобровым Утёсом.</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">👑 Правители:</h4>
                      <p>Тайвин Ланнистер - Лорд Бобрового Утёса, Хранитель Запада и Десница Короля при нескольких правителях.</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">🏰 Резиденция:</h4>
                      <p>Бобровый Утёс - огромная крепость, вырезанная из скалы над морем, с золотыми рудниками в глубинах.</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">⚔️ Характеристики:</h4>
                      <p>Богатство, власть, амбиции, хитрость. Ланнистеры славятся своей гордостью и стремлением к власти.</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">👥 Известные члены:</h4>
                      <p>Тайвин Ланнистер, Серсея Ланнистер, Джейме Ланнистер, Тирион Ланнистер</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <div className="bg-black/80 border-2 border-max-pink/50 rounded-lg p-4 md:p-6 backdrop-blur-md hover:border-max-pink hover:scale-105 transition-all cursor-pointer shadow-lg hover:shadow-max-pink/50">
                    <div className="text-3xl md:text-5xl mb-2 md:mb-3">🐉</div>
                    <h4 className="text-max-pink font-bold text-sm md:text-lg mb-1 md:mb-2">Дом Таргариенов</h4>
                    <p className="text-max-pink/60 text-xs md:text-sm italic">"Огонь и кровь"</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-black/95 backdrop-blur-xl border-2 border-max-pink/50">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-max-pink mb-4">🐉 Дом Таргариенов из Драконьего Камня</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-white max-h-[60vh] overflow-y-auto">
                    <p className="text-xl italic text-max-pink/80">"Огонь и кровь"</p>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">📜 История:</h4>
                      <p>Древний валирийский дом, единственный выживший после Рока Валирии. Эйгон Завоеватель на драконах объединил Семь Королевств 300 лет назад.</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">👑 Правители:</h4>
                      <p>Правили Железным Троном почти 300 лет, пока их не свергли во время восстания Роберта Баратеона.</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">🏰 Резиденция:</h4>
                      <p>Драконий Камень - мрачная крепость на острове, построенная с помощью валирийской магии в форме драконов.</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">⚔️ Характеристики:</h4>
                      <p>Драконья кровь, огнестойкость, склонность к безумию. "Когда рождается Таргариен, боги подбрасывают монетку".</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">👥 Известные члены:</h4>
                      <p>Эйгон Завоеватель, Безумный Король Эйрис II, Рейгар Таргариен, Визерис Таргариен, Дейнерис Таргариен</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <div className="bg-black/80 border-2 border-max-pink/50 rounded-lg p-4 md:p-6 backdrop-blur-md hover:border-max-pink hover:scale-105 transition-all cursor-pointer shadow-lg hover:shadow-max-pink/50">
                    <div className="text-3xl md:text-5xl mb-2 md:mb-3">🦌</div>
                    <h4 className="text-max-pink font-bold text-sm md:text-lg mb-1 md:mb-2">Дом Баратеонов</h4>
                    <p className="text-max-pink/60 text-xs md:text-sm italic">"Наша ярость"</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-black/95 backdrop-blur-xl border-2 border-max-pink/50">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-max-pink mb-4">🦌 Дом Баратеонов из Штормового Предела</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-white max-h-[60vh] overflow-y-auto">
                    <p className="text-xl italic text-max-pink/80">"Наша ярость"</p>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">📜 История:</h4>
                      <p>Относительно молодой дом, основанный бастардом Таргариенов. Роберт Баратеон возглавил восстание и сверг Таргариенов, став королём.</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">👑 Правители:</h4>
                      <p>Роберт Баратеон - Король Семи Королевств после свержения Таргариенов. Его братья: Станнис и Ренли.</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">🏰 Резиденция:</h4>
                      <p>Штормовой Предел - неприступная крепость, построенная с использованием магии, способная выдержать любой шторм.</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">⚔️ Характеристики:</h4>
                      <p>Сила, ярость, воинственность. Баратеоны известны своим боевым духом и мощью в бою.</p>
                    </div>
                    <div>
                      <h4 className="text-max-pink font-bold text-lg mb-2">👥 Известные члены:</h4>
                      <p>Роберт Баратеон, Станнис Баратеон, Ренли Баратеон, Джоффри (официально Баратеон)</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - MAX Style */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-max-purple/10 via-black/0 to-max-violet/10 pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent">
              ✈️ Избранные направления ✈️
            </h2>
            <p className="text-xl text-max-pink/60 max-w-3xl mx-auto font-light italic">
              "Мир слишком велик, чтобы сидеть дома"
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {destinations.map((destination) => (
              <Dialog key={destination.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer bg-black/80 backdrop-blur-md border-2 border-max-pink/40 hover:border-max-pink transition-all duration-500 hover:scale-105 overflow-hidden shadow-lg hover:shadow-max-pink/50">
                    <div className="relative overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-max-purple/30 to-transparent" />
                      <div className="absolute top-6 right-6">
                        <Badge className="bg-gradient-to-r from-max-pink to-max-purple text-white shadow-lg shadow-max-pink/50 font-bold">
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
                      <div className="flex items-center text-max-pink group-hover:text-max-purple transition-colors">
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
        <div className="absolute inset-0 bg-gradient-to-r from-max-pink/20 via-max-purple/20 to-max-violet/20" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent">
            Создайте свой маршрут
          </h2>
          <p className="text-xl mb-12 text-white/70 max-w-3xl mx-auto font-light">
            Планируйте и сохраняйте персональные туристические маршруты 
            с помощью интерактивных инструментов
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-max-pink to-max-purple hover:from-max-purple hover:to-max-pink text-white shadow-lg shadow-max-pink/50 h-14 px-8 text-lg font-semibold"
            onClick={() => window.open('https://www.utair.ru', '_blank')}
          >
            <Icon name="MapPin" size={24} className="mr-3" />
            Начать планирование
          </Button>
        </div>
      </section>

      {/* Footer - MAX Style */}
      <footer className="bg-black/40 backdrop-blur-md border-t-2 border-max-pink/30 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-max-pink to-max-purple flex items-center justify-center shadow-lg shadow-max-pink/50">
              <Icon name="Plane" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent">Странник</span>
          </div>
          <p className="text-max-pink/60 text-lg mb-6">
            Откройте мир через интерактивные путешествия • 2024
          </p>
          <div className="flex flex-col items-center gap-6">
            <p className="text-white/70 text-sm font-medium">Мы в соцсетях и на платформах</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => window.open('https://t.me/Strannik_com', '_blank')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/50 px-6 py-2 flex items-center gap-2"
              >
                <Icon name="Send" size={20} />
                Telegram
              </Button>
              <Button
                onClick={() => window.open('https://max.ru/join/XXufWuRT_4_-U687UWq2zVs905JbNy7FjvfipRLO9ao', '_blank')}
                className="bg-gradient-to-r from-max-pink to-max-purple hover:from-max-purple hover:to-max-pink text-white shadow-lg shadow-max-pink/50 px-6 py-2 flex items-center gap-2"
              >
                <Icon name="Tv" size={20} />
                MAX
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}