import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import { type Country } from '@/data/countries'

interface CountryCardProps {
  country: Country
  isTopDestination: boolean
  continentColor: string
}

export default function CountryCard({ country, isTopDestination, continentColor }: CountryCardProps) {
  return (
    <Card className="cursor-pointer hover:scale-105 transition-all duration-300 bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{country.flag}</span>
            <div>
              <h3 className="font-bold">{country.name}</h3>
              <p className="text-sm text-slate-400 font-normal">
                {country.continent}
              </p>
            </div>
          </div>
          {isTopDestination && (
            <Badge className="bg-yellow-500 text-black text-xs">
              <Icon name="Star" size={12} className="mr-1" />
              ТОП
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-slate-300 mb-4 line-clamp-2">
          {country.description}
        </p>
        <div className="flex items-center justify-between">
          <Badge 
            style={{ backgroundColor: continentColor }}
            className="text-white text-xs"
          >
            {country.destinations} мест
          </Badge>
          <Icon name="ArrowRight" size={16} className="text-blue-400" />
        </div>
      </CardContent>
    </Card>
  )
}
