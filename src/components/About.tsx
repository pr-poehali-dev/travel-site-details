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
    <div className="bg-gradient-to-br from-slate-950 via-max-violet to-slate-900">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-max-purple/30 to-transparent">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-max-pink to-max-purple flex items-center justify-center mr-4 shadow-lg shadow-max-pink/50">
              <Icon name="Plane" size={36} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent">О проекте Странник</h1>
          </div>
          <p className="text-xl text-max-pink/80 max-w-3xl mx-auto leading-relaxed">
            Мы создали современную платформу для путешественников, которая превращает планирование поездок 
            в увлекательный и простой процесс. Наша миссия — дать каждому путешественнику доступ к проверенной 
            информации о любой точке планеты и помочь создать незабываемые маршруты.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent">Зачем мы это делаем?</h2>
              <div className="space-y-4 text-lg text-white">
                <p>
                  <span className="text-max-pink font-semibold">Каждое путешествие</span> начинается с мечты и вопросов: 
                  "Куда поехать?", "Что там посмотреть?", "Когда лучше ехать?"
                </p>
                <p>
                  Мы собрали информацию о <span className="text-max-purple font-semibold">всех странах мира</span> 
                  в одном месте, чтобы вы могли:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={20} className="text-max-pink mt-1 flex-shrink-0" />
                    <span>Быстро найти идеальное направление для своих интересов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={20} className="text-max-pink mt-1 flex-shrink-0" />
                    <span>Узнать все необходимое о стране до поездки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={20} className="text-max-pink mt-1 flex-shrink-0" />
                    <span>Спланировать маршрут с учетом всех деталей</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={20} className="text-max-pink mt-1 flex-shrink-0" />
                    <span>Путешествовать осознанно и безопасно</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-max-pink/20 to-max-purple/20 rounded-2xl p-8 border-2 border-max-pink/30 backdrop-blur-sm shadow-lg shadow-max-pink/20">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-max-pink mb-2">{stat.number}</div>
                      <div className="text-sm text-max-purple/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-max-purple/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent">Что делает наш сайт особенным</h2>
            <p className="text-xl text-max-pink/80 max-w-2xl mx-auto">
              Мы создали комплексный инструмент для современных путешественников
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-2 border-max-pink/20 hover:border-max-pink/40 transition-all hover:shadow-lg hover:shadow-max-pink/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-max-pink/20 to-max-purple/20 flex items-center justify-center mb-4 border border-max-pink/30">
                    <Icon name={feature.icon as any} size={24} className="text-max-pink" />
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-max-pink/70">{feature.description}</p>
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
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent">Наши принципы</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border-2 border-max-pink/20 text-center hover:border-max-pink/40 transition-all">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-max-pink to-max-purple flex items-center justify-center mx-auto mb-4 shadow-lg shadow-max-pink/50">
                  <Icon name="Target" size={32} className="text-white" />
                </div>
                <CardTitle className="text-white">Точность информации</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-max-pink/70">
                  Вся информация проверяется и обновляется. Мы используем официальные источники 
                  и данные от путешественников.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-2 border-max-purple/20 text-center hover:border-max-purple/40 transition-all">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-max-purple to-max-violet flex items-center justify-center mx-auto mb-4 shadow-lg shadow-max-purple/50">
                  <Icon name="Heart" size={32} className="text-white" />
                </div>
                <CardTitle className="text-white">Любовь к путешествиям</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-max-purple/70">
                  Мы сами страстные путешественники и понимаем, что нужно для идеальной поездки.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-2 border-max-violet/20 text-center hover:border-max-violet/40 transition-all">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-max-violet to-max-pink flex items-center justify-center mx-auto mb-4 shadow-lg shadow-max-violet/50">
                  <Icon name="Users" size={32} className="text-white" />
                </div>
                <CardTitle className="text-white">Сообщество</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-max-violet/70">
                  Мы строим сообщество путешественников, где каждый может поделиться опытом и советами.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-max-pink via-max-purple to-max-violet text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Начните своё путешествие</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Откройте для себя мир с помощью нашей интерактивной карты и детальных гидов по странам
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white hover:bg-white/90 text-max-purple shadow-lg shadow-white/20">
              <Icon name="Map" size={20} className="mr-2" />
              Исследовать карту
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-max-purple">
              <Icon name="Bookmark" size={20} className="mr-2" />
              Сохранить в избранное
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-max-pink to-max-purple bg-clip-text text-transparent">Создано с любовью к путешествиям</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-max-pink/80 mb-8">
              Наша команда состоит из опытных путешественников, географов и разработчиков, 
              которые объединили свои знания, чтобы создать лучший ресурс для планирования путешествий.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline" className="text-sm border-max-pink/30 text-max-pink hover:bg-max-pink/10">География</Badge>
              <Badge variant="outline" className="text-sm border-max-purple/30 text-max-purple hover:bg-max-purple/10">Культурология</Badge>
              <Badge variant="outline" className="text-sm border-max-violet/30 text-max-violet hover:bg-max-violet/10">IT-разработка</Badge>
              <Badge variant="outline" className="text-sm border-max-pink/30 text-max-pink hover:bg-max-pink/10">Дизайн</Badge>
              <Badge variant="outline" className="text-sm border-max-purple/30 text-max-purple hover:bg-max-purple/10">Туризм</Badge>
              <Badge variant="outline" className="text-sm border-max-violet/30 text-max-violet hover:bg-max-violet/10">Переводы</Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
