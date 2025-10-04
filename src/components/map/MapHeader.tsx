import Icon from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface MapHeaderProps {
  totalCountries: number
  filteredCount: number
  searchQuery: string
  filterContinent: string
  selectedCategory: string
  onSearchChange: (value: string) => void
  onContinentChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

export default function MapHeader({
  totalCountries,
  filteredCount,
  searchQuery,
  filterContinent,
  selectedCategory,
  onSearchChange,
  onContinentChange,
  onCategoryChange
}: MapHeaderProps) {
  const continents = ['Все', 'Европа', 'Азия', 'Африка', 'Северная Америка', 'Южная Америка', 'Океания']
  const categories = ['Все', 'Горы', 'Пляжи', 'Города', 'Природа', 'История', 'Культура']

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-vintage-gold/10 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Icon name="Globe" size={40} className="text-vintage-gold" />
            Интерактивная карта мира
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Исследуйте {totalCountries}+ стран мира. Кликните на точку или выберите из списка ниже
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-8">
          <div className="flex-1">
            <Input
              placeholder="Поиск стран..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={filterContinent} onValueChange={onContinentChange}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Континент" />
            </SelectTrigger>
            <SelectContent>
              {continents.map((continent) => (
                <SelectItem key={continent} value={continent === 'Все' ? 'all' : continent}>
                  {continent}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Тип путешествия" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category === 'Все' ? 'all' : category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{filteredCount}</div>
            <div className="text-sm text-muted-foreground">Стран</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-vintage-gold">7</div>
            <div className="text-sm text-muted-foreground">Континентов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-adventure-teal">500+</div>
            <div className="text-sm text-muted-foreground">Направлений</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-map-brown">195</div>
            <div className="text-sm text-muted-foreground">Всего стран</div>
          </div>
        </div>
      </div>
    </section>
  )
}
