import { Input } from '@/components/ui/input'
import Icon from '@/components/ui/icon'

interface MapHeaderProps {
  totalCountries: number
  filteredCount: number
  searchQuery: string
  onSearchChange: (value: string) => void
}

export default function MapHeader({ totalCountries, filteredCount, searchQuery, onSearchChange }: MapHeaderProps) {
  return (
    <section className="relative z-10 py-16 px-6">
      <div className="container mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <Icon name="Globe" size={24} className="text-blue-400" />
          <span className="text-sm font-medium">Исследуй мир</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Карта Мира
        </h1>
        
        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
          Интерактивное путешествие по {totalCountries}+ странам мира. 
          Открой новые направления и планируй незабываемые приключения.
        </p>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Поиск стран, городов, достопримечательностей..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-slate-400 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-blue-400 mb-2">{filteredCount}</div>
            <div className="text-slate-300 text-sm">Стран на карте</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-purple-400 mb-2">7</div>
            <div className="text-slate-300 text-sm">Континентов</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-pink-400 mb-2">500+</div>
            <div className="text-slate-300 text-sm">Направлений</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-green-400 mb-2">∞</div>
            <div className="text-slate-300 text-sm">Возможностей</div>
          </div>
        </div>
      </div>
    </section>
  )
}
