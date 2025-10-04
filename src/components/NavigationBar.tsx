import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import Icon from '@/components/ui/icon'
import { Link } from 'react-router-dom'

interface NavigationBarProps {
  activeSection: string
  setActiveSection: (section: string) => void
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
  setIsRoundTrip: (roundTrip: boolean) => void
  countries: Array<{ name: string; flag: string; code: string; airport: string }>
  russianCities: Array<{ name: string; code: string }>
  isMobile?: boolean
}

export default function NavigationBar({
  activeSection,
  setActiveSection,
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
  isMobile = false
}: NavigationBarProps) {
  return (
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
              className={`${activeSection === 'home' ? 'text-blue-400' : 'text-white/80 hover:text-white'} transition-colors font-medium`}
            >
              Главная
            </button>
            <button 
              onClick={() => setActiveSection('map')} 
              className={`${activeSection === 'map' ? 'text-blue-400' : 'text-white/80 hover:text-white'} transition-colors font-medium`}
            >
              Карта
            </button>
            {!isMobile && (
              <Link 
                to="/hotels" 
                className="text-white/80 hover:text-white transition-colors font-medium flex items-center gap-1"
              >
                <Icon name="Hotel" size={16} />
                Отели
              </Link>
            )}
            <button 
              onClick={() => setActiveSection('about')} 
              className={`${activeSection === 'about' ? 'text-blue-400' : 'text-white/80 hover:text-white'} transition-colors font-medium`}
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
    </nav>
  )
}
