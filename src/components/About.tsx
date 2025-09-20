import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

export default function About() {
  const features = [
    {
      icon: "Globe",
      title: "Интерактивная карта мира",
      description: "Изучайте страны мира, кликая по интерактивным точкам на карте"
    },
    {
      icon: "BookOpen",
      title: "Детальная информация",
      description: "Полная информация о каждой стране: климат, культура, история, кухня"
    },
    {
      icon: "MapPin",
      title: "Популярные направления",
      description: "Списки лучших мест для посещения в каждой стране"
    },
    {
      icon: "Route",
      title: "Планирование маршрутов",
      description: "Создавайте и сохраняйте персональные туристические маршруты"
    },
    {
      icon: "Info",
      title: "Практические советы",
      description: "Визовые требования, валюта, безопасность и полезные рекомендации"
    },
    {
      icon: "Users",
      title: "Культурные особенности",
      description: "Узнайте о традициях, языках и обычаях разных народов"
    }
  ]

  const stats = [
    { number: "195+", label: "Стран мира" },
    { number: "7", label: "Континентов" },
    { number: "1000+", label: "Направлений" },
    { number: "50+", label: "Языков" }
  ]

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-parchment/30 to-background">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Icon name="Compass" size={48} className="text-vintage-gold mr-4" />
            <h1 className="text-5xl font-bold">О проекте Странник</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Мы создали этот сайт, чтобы превратить планирование путешествий в увлекательное приключение. 
            Наша миссия — дать каждому путешественнику доступ к подробной, проверенной информации о любой 
            точке планеты и помочь создать незабываемые маршруты.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Зачем мы это делаем?</h2>
              <div className="space-y-4 text-lg">
                <p>
                  <span className="text-primary font-semibold">Каждое путешествие</span> начинается с мечты и вопросов: 
                  "Куда поехать?", "Что там посмотреть?", "Когда лучше ехать?"
                </p>
                <p>
                  Мы собрали информацию о <span className="text-vintage-gold font-semibold">всех странах мира</span> 
                  в одном месте, чтобы вы могли:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={20} className="text-green-500 mt-1 flex-shrink-0" />
                    <span>Быстро найти идеальное направление для своих интересов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={20} className="text-green-500 mt-1 flex-shrink-0" />
                    <span>Узнать все необходимое о стране до поездки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={20} className="text-green-500 mt-1 flex-shrink-0" />
                    <span>Спланировать маршрут с учетом всех деталей</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={20} className="text-green-500 mt-1 flex-shrink-0" />
                    <span>Путешествовать осознанно и безопасно</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-vintage-gold/20 to-adventure-teal/20 rounded-2xl p-8 border-2 border-vintage-gold/30">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-parchment/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Что делает наш сайт особенным</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Мы создали комплексный инструмент для современных путешественников
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 border-vintage-gold/20 hover:border-vintage-gold/40 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-vintage-gold/20 flex items-center justify-center mb-4">
                    <Icon name={feature.icon as any} size={24} className="text-vintage-gold" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наши принципы</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Icon name="Target" size={32} className="text-adventure-teal mx-auto mb-4" />
                <CardTitle>Точность информации</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Вся информация проверяется и обновляется. Мы используем официальные источники 
                  и данные от путешественников.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Icon name="Heart" size={32} className="text-vintage-gold mx-auto mb-4" />
                <CardTitle>Любовь к путешествиям</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Мы сами страстные путешественники и понимаем, что нужно для идеальной поездки.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Icon name="Users" size={32} className="text-map-brown mx-auto mb-4" />
                <CardTitle>Сообщество</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Мы строим сообщество путешественников, где каждый может поделиться опытом и советами.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-adventure-teal to-map-brown text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Начните своё путешествие</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Откройте для себя мир с помощью нашей интерактивной карты и детальных гидов по странам
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-vintage-gold hover:bg-vintage-gold/90 text-charcoal">
              <Icon name="Map" size={20} className="mr-2" />
              Исследовать карту
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal">
              <Icon name="Bookmark" size={20} className="mr-2" />
              Сохранить в избранное
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Создано с любовью к путешествиям</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8">
              Наша команда состоит из опытных путешественников, географов и разработчиков, 
              которые объединили свои знания, чтобы создать лучший ресурс для планирования путешествий.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline" className="text-sm">География</Badge>
              <Badge variant="outline" className="text-sm">Культурология</Badge>
              <Badge variant="outline" className="text-sm">IT-разработка</Badge>
              <Badge variant="outline" className="text-sm">Дизайн</Badge>
              <Badge variant="outline" className="text-sm">Туризм</Badge>
              <Badge variant="outline" className="text-sm">Переводы</Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}