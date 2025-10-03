import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Icon from '@/components/ui/icon'
import { type Country } from '@/data/countries'

interface CountryDialogProps {
  country: Country
  isTopDestination: boolean
  continentColor: string
}

export default function CountryDialog({ country, isTopDestination, continentColor }: CountryDialogProps) {
  return (
    <DialogContent className="max-w-4xl bg-slate-900 border-slate-700 text-white">
      <DialogHeader>
        <DialogTitle className="text-3xl flex items-center gap-4">
          <span className="text-4xl">{country.flag}</span>
          <div>
            {country.name}
            <div className="flex items-center gap-2 mt-2">
              <Badge 
                style={{ backgroundColor: continentColor }}
                className="text-white"
              >
                {country.continent}
              </Badge>
              {isTopDestination && (
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
  )
}
