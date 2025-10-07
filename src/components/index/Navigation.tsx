import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import Icon from '@/components/ui/icon'
import { Link } from 'react-router-dom'

interface NavigationProps {
  isMusicPlaying: boolean
  toggleMusic: () => void
  activeSection: string
  setActiveSection: (section: string) => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
  isRouteModalOpen: boolean
  setIsRouteModalOpen: (open: boolean) => void
  selectedFromCity: string
  setSelectedFromCity: (city: string) => void
  selectedToCountry: string
  setSelectedToCountry: (country: string) => void
  departureDate: string
  setDepartureDate: (date: string) => void
  returnDate: string
  setReturnDate: (date: string) => void
  isRoundTrip: boolean
  setIsRoundTrip: (checked: boolean) => void
  countries: Array<{ name: string; flag: string; code: string; airport: string }>
  russianCities: Array<{ name: string; code: string }>
  variant?: 'default' | 'map' | 'kingdoms' | 'about'
}

export default function Navigation({
  isMusicPlaying,
  toggleMusic,
  activeSection,
  setActiveSection,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isRouteModalOpen,
  setIsRouteModalOpen,
  selectedFromCity,
  setSelectedFromCity,
  selectedToCountry,
  setSelectedToCountry,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  isRoundTrip,
  setIsRoundTrip,
  countries,
  russianCities,
  variant = 'default'
}: NavigationProps) {
  return (
    <nav className="border-b-4 border-got-gold/50 bg-got-black/90 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setActiveSection('home')} 
            className="flex items-center space-x-2 sm:space-x-3"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-r from-got-fire to-orange-600 flex items-center justify-center border-2 border-got-gold/50">
              <Icon name="Crown" size={variant === 'default' ? 28 : 20} className="text-got-gold" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-got-gold">⚔️ Железный Трон</h1>
          </button>

          {variant === 'map' && (
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => setActiveSection('home')} className="text-got-gold/80 hover:text-got-gold transition-colors font-bold">
                Главная
              </button>
              <button onClick={() => setActiveSection('map')} className="text-got-fire transition-colors font-bold">
                Карта Вестероса
              </button>
              <Link to="/hotels" className="text-got-gold/80 hover:text-got-gold transition-colors font-bold flex items-center gap-1">
                <Icon name="Castle" size={16} />
                Замки
              </Link>
              <button onClick={() => setActiveSection('kingdoms')} className="text-got-gold/80 hover:text-got-gold transition-colors font-bold">
                Королевства
              </button>
              <Link to="/news" className="text-got-gold/80 hover:text-got-gold transition-colors font-bold">
                Летописи
              </Link>
              <Link to="/radar" className="text-got-gold/80 hover:text-got-gold transition-colors font-bold flex items-center gap-1">
                <Icon name="Swords" size={16} />
                Поле Битвы
              </Link>
            </div>
          )}

          {variant === 'kingdoms' && (
            <Button 
              onClick={() => setActiveSection('home')}
              className="bg-gradient-to-r from-got-fire to-orange-600 hover:from-orange-600 hover:to-got-fire border-2 border-got-gold/50 text-white font-bold"
            >
              Назад
            </Button>
          )}

          {variant === 'about' && (
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={toggleMusic} className="p-2 rounded-lg bg-got-gold/20 hover:bg-got-gold/30 transition-colors border border-got-gold/50" title={isMusicPlaying ? 'Остановить музыку' : 'Играть музыку'}>
                <Icon name={isMusicPlaying ? 'Volume2' : 'VolumeX'} size={20} className="text-got-gold" />
              </button>
              <button onClick={() => setActiveSection('home')} className="text-got-gold/80 hover:text-got-gold transition-colors font-bold">
                Главная
              </button>
              <button onClick={() => setActiveSection('map')} className="text-got-gold/80 hover:text-got-gold transition-colors font-bold">
                Карта
              </button>
              <button onClick={() => setActiveSection('kingdoms')} className="text-got-gold/80 hover:text-got-gold transition-colors font-bold">
                Королевства
              </button>
              <Link to="/news" className="text-got-gold/80 hover:text-got-gold transition-colors font-bold">
                Летописи
              </Link>
              <Link to="/radar" className="text-got-gold/80 hover:text-got-gold transition-colors font-bold flex items-center gap-1">
                <Icon name="Swords" size={16} />
                Поле Битвы
              </Link>
              <button onClick={() => setActiveSection('about')} className="text-got-fire transition-colors font-bold">
                О проекте
              </button>
            </div>
          )}

          {variant === 'default' && (
            <>
              <div className="hidden lg:flex items-center space-x-6">
                <button onClick={toggleMusic} className="p-2 rounded-lg bg-got-gold/20 hover:bg-got-gold/30 transition-colors border border-got-gold/50" title={isMusicPlaying ? 'Остановить музыку' : 'Играть музыку'}>
                  <Icon name={isMusicPlaying ? 'Volume2' : 'VolumeX'} size={20} className="text-got-gold" />
                </button>
                <button onClick={() => setActiveSection('home')} className="text-got-fire transition-colors font-bold">
                  Главная
                </button>
                <button onClick={() => setActiveSection('map')} className="text-got-gold/80 hover:text-got-gold transition-colors font-bold">
                  Карта
                </button>
                <button onClick={() => setActiveSection('kingdoms')} className="text-got-gold/80 hover:text-got-gold transition-colors font-bold">
                  Королевства
                </button>
                <button onClick={() => setActiveSection('about')} className="text-got-gold/80 hover:text-got-gold transition-colors font-bold">
                  О проекте
                </button>
                <Link to="/news" className="text-got-gold/80 hover:text-got-gold transition-colors font-bold">
                  Летописи
                </Link>
                <Link to="/radar" className="text-got-gold/80 hover:text-got-gold transition-colors font-bold flex items-center gap-1">
                  <Icon name="Swords" size={16} />
                  Поле Битвы
                </Link>
              </div>

              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-lg bg-got-gold/20 hover:bg-got-gold/30 transition-colors border border-got-gold/50">
                <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} className="text-got-gold" />
              </button>
            </>
          )}

          {variant === 'map' && (
            <div className="md:hidden">
              <Link to="/hotels" className="text-got-gold/80 hover:text-got-gold transition-colors flex items-center gap-1 text-sm">
                <Icon name="Castle" size={18} />
              </Link>
            </div>
          )}

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
                        <SelectItem key={city.code} value={city.code} className="text-white hover:bg-white/10">
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
                        <SelectItem key={country.code} value={country.code} className="text-white hover:bg-white/10">
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
                      
                      let aeroflotUrl = `https://www.aeroflot.ru/sb/booking?from=${selectedFromCity}&to=${destinationAirport}&departure=${departureDate}&passengers=1&class=economy&direct=false`
                      
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

      {isMobileMenuOpen && variant === 'default' && (
        <div className="lg:hidden bg-got-black/95 border-t-2 border-got-gold/30 backdrop-blur-md">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <button onClick={toggleMusic} className="flex items-center gap-3 p-3 rounded-lg bg-got-gold/20 hover:bg-got-gold/30 transition-colors border border-got-gold/50">
              <Icon name={isMusicPlaying ? 'Volume2' : 'VolumeX'} size={20} className="text-got-gold" />
              <span className="text-got-gold font-bold">{isMusicPlaying ? 'Остановить музыку' : 'Играть музыку'}</span>
            </button>
            <button onClick={() => { setActiveSection('home'); setIsMobileMenuOpen(false); }} className="text-got-fire transition-colors font-bold text-left p-3 hover:bg-got-gold/10 rounded-lg">
              Главная
            </button>
            <button onClick={() => { setActiveSection('map'); setIsMobileMenuOpen(false); }} className="text-got-gold/80 hover:text-got-gold transition-colors font-bold text-left p-3 hover:bg-got-gold/10 rounded-lg">
              Карта
            </button>
            <button onClick={() => { setActiveSection('kingdoms'); setIsMobileMenuOpen(false); }} className="text-got-gold/80 hover:text-got-gold transition-colors font-bold text-left p-3 hover:bg-got-gold/10 rounded-lg">
              Королевства
            </button>
            <button onClick={() => { setActiveSection('about'); setIsMobileMenuOpen(false); }} className="text-got-gold/80 hover:text-got-gold transition-colors font-bold text-left p-3 hover:bg-got-gold/10 rounded-lg">
              О проекте
            </button>
            <Link to="/news" onClick={() => setIsMobileMenuOpen(false)} className="text-got-gold/80 hover:text-got-gold transition-colors font-bold text-left p-3 hover:bg-got-gold/10 rounded-lg">
              Летописи
            </Link>
            <Link to="/radar" onClick={() => setIsMobileMenuOpen(false)} className="text-got-gold/80 hover:text-got-gold transition-colors font-bold flex items-center gap-2 p-3 hover:bg-got-gold/10 rounded-lg">
              <Icon name="Swords" size={16} />
              Поле Битвы
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
