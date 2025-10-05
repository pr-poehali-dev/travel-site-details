export interface Hotel {
  id: string;
  name: string;
  countryId: string;
  city: string;
  stars: 4 | 5;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  amenities: string[];
  description: string;
  bookingUrl: string;
}

export const hotels: Hotel[] = [
  // РОССИЯ
  {
    id: 'hotel-ru-1',
    name: 'Метрополь',
    countryId: 'russia',
    city: 'Москва',
    stars: 5,
    price: 18000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.9,
    reviews: 3241,
    amenities: ['Wi-Fi', 'Спа', 'Ресторан', 'Исторический', 'Бар'],
    description: 'Легендарный отель в центре Москвы с вековой историей',
    bookingUrl: 'https://www.booking.com/hotel/ru/metropol-moscow.html'
  },
  {
    id: 'hotel-ru-2',
    name: 'Лотте Отель',
    countryId: 'russia',
    city: 'Москва',
    stars: 5,
    price: 20000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.8,
    reviews: 2891,
    amenities: ['Wi-Fi', 'Бассейн', 'Спа', 'Ресторан', 'Панорамный вид'],
    description: 'Современный небоскрёб с видом на Красную площадь',
    bookingUrl: 'https://www.booking.com/hotel/ru/lotte-hotel-moscow.html'
  },
  {
    id: 'hotel-ru-3',
    name: 'Астория',
    countryId: 'russia',
    city: 'Санкт-Петербург',
    stars: 5,
    price: 16000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.9,
    reviews: 4127,
    amenities: ['Wi-Fi', 'Исторический', 'Ресторан', 'Вид на собор', 'Спа'],
    description: 'Исторический отель напротив Исаакиевского собора',
    bookingUrl: 'https://www.booking.com/hotel/ru/astoria-st-petersburg.html'
  },
  {
    id: 'hotel-ru-4',
    name: 'Гранд Отель Европа',
    countryId: 'russia',
    city: 'Санкт-Петербург',
    stars: 5,
    price: 22000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 5.0,
    reviews: 3654,
    amenities: ['Wi-Fi', 'Люкс', 'Спа', 'Ресторан', 'Исторический'],
    description: 'Роскошный отель на Невском проспекте с 1875 года',
    bookingUrl: 'https://www.booking.com/hotel/ru/grand-hotel-europe.html'
  },
  {
    id: 'hotel-ru-5',
    name: 'Хаятт Ридженси',
    countryId: 'russia',
    city: 'Сочи',
    stars: 5,
    price: 15000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.8,
    reviews: 2134,
    amenities: ['Wi-Fi', 'Пляж', 'Бассейн', 'Спа', 'Горнолыжный'],
    description: 'Курортный отель на берегу Чёрного моря',
    bookingUrl: 'https://www.booking.com/hotel/ru/hyatt-regency-sochi.html'
  },
  {
    id: 'hotel-ru-6',
    name: 'Radisson Collection',
    countryId: 'russia',
    city: 'Сочи',
    stars: 4,
    price: 12000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.7,
    reviews: 1876,
    amenities: ['Wi-Fi', 'Пляж', 'Бассейн', 'Ресторан', 'Спа'],
    description: 'Современный курорт с частным пляжем',
    bookingUrl: 'https://www.booking.com/hotel/ru/radisson-blu-resort-congress-centre.html'
  },
  {
    id: 'hotel-ru-7',
    name: 'Hilton Garden Inn',
    countryId: 'russia',
    city: 'Казань',
    stars: 4,
    price: 8000,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    rating: 4.6,
    reviews: 1432,
    amenities: ['Wi-Fi', 'Фитнес', 'Ресторан', 'Бар', 'Бизнес-центр'],
    description: 'Комфортный отель в центре Казани',
    bookingUrl: 'https://www.booking.com/hotel/ru/hilton-garden-inn-kazan.html'
  },
  {
    id: 'hotel-ru-8',
    name: 'Doubletree by Hilton',
    countryId: 'russia',
    city: 'Екатеринбург',
    stars: 4,
    price: 7000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.5,
    reviews: 1234,
    amenities: ['Wi-Fi', 'Фитнес', 'Ресторан', 'Бар', 'Спа'],
    description: 'Современный отель на границе Европы и Азии',
    bookingUrl: 'https://www.booking.com/hotel/ru/doubletree-by-hilton-yekaterinburg.html'
  },
  {
    id: 'hotel-ru-9',
    name: 'Azimut Hotel',
    countryId: 'russia',
    city: 'Владивосток',
    stars: 4,
    price: 9000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.6,
    reviews: 987,
    amenities: ['Wi-Fi', 'Вид на бухту', 'Ресторан', 'Фитнес'],
    description: 'Отель с панорамным видом на Золотой Рог',
    bookingUrl: 'https://www.booking.com/hotel/ru/azimut-vladivostok.html'
  },
  {
    id: 'hotel-ru-10',
    name: 'Mercure Irkutsk',
    countryId: 'russia',
    city: 'Иркутск',
    stars: 4,
    price: 6000,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    rating: 4.5,
    reviews: 876,
    amenities: ['Wi-Fi', 'Близость к Байкалу', 'Ресторан', 'Сауна'],
    description: 'Комфортный отель рядом с озером Байкал',
    bookingUrl: 'https://www.booking.com/hotel/ru/mercure-irkutsk.html'
  },

  // ЯПОНИЯ
  {
    id: 'hotel-jp-1',
    name: 'Tokyo Grand Palace',
    countryId: 'japan',
    city: 'Токио',
    stars: 5,
    price: 25000,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    rating: 4.9,
    reviews: 1847,
    amenities: ['Wi-Fi', 'Бассейн', 'Спа', 'Ресторан', 'Фитнес'],
    description: 'Роскошный отель в центре Токио с видом на город',
    bookingUrl: 'https://www.booking.com/hotel/jp/palace-tokyo.html'
  },
  {
    id: 'hotel-jp-2',
    name: 'Kyoto Heritage Inn',
    countryId: 'japan',
    city: 'Киото',
    stars: 4,
    price: 15000,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    rating: 4.7,
    reviews: 923,
    amenities: ['Wi-Fi', 'Онсэн', 'Ресторан', 'Сад'],
    description: 'Традиционный японский отель с горячими источниками',
    bookingUrl: 'https://www.booking.com/hotel/jp/kyoto-heritage.html'
  },
  {
    id: 'hotel-jp-3',
    name: 'Osaka Bay Tower',
    countryId: 'japan',
    city: 'Осака',
    stars: 5,
    price: 20000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.8,
    reviews: 2156,
    amenities: ['Wi-Fi', 'Вид на залив', 'Спа', 'Ресторан', 'Бар'],
    description: 'Современный отель с видом на залив Осака',
    bookingUrl: 'https://www.booking.com/hotel/jp/osaka-bay-tower.html'
  },

  // ИТАЛИЯ
  {
    id: 'hotel-it-1',
    name: 'Roma Luxury Hotel',
    countryId: 'italy',
    city: 'Рим',
    stars: 5,
    price: 30000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.8,
    reviews: 2134,
    amenities: ['Wi-Fi', 'Бассейн', 'Спа', 'Ресторан', 'Терраса'],
    description: 'Элегантный отель рядом с Колизеем',
    bookingUrl: 'https://www.booking.com/hotel/it/rome-cavalieri.html'
  },
  {
    id: 'hotel-it-2',
    name: 'Venice Canal View',
    countryId: 'italy',
    city: 'Венеция',
    stars: 4,
    price: 18000,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    rating: 4.6,
    reviews: 1456,
    amenities: ['Wi-Fi', 'Вид на канал', 'Ресторан', 'Терраса'],
    description: 'Уютный отель с видом на венецианские каналы',
    bookingUrl: 'https://www.booking.com/hotel/it/gritti-palace-venice.html'
  },
  {
    id: 'hotel-it-3',
    name: 'Milan Fashion District',
    countryId: 'italy',
    city: 'Милан',
    stars: 5,
    price: 28000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.9,
    reviews: 1987,
    amenities: ['Wi-Fi', 'Дизайнерский', 'Спа', 'Ресторан', 'Бар'],
    description: 'Роскошный отель в модном квартале Милана',
    bookingUrl: 'https://www.booking.com/hotel/it/bulgari-milano.html'
  },
  {
    id: 'hotel-it-4',
    name: 'Florence Renaissance',
    countryId: 'italy',
    city: 'Флоренция',
    stars: 5,
    price: 26000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.8,
    reviews: 1765,
    amenities: ['Wi-Fi', 'Историческое здание', 'Спа', 'Ресторан', 'Сад'],
    description: 'Дворец эпохи Возрождения в сердце Флоренции',
    bookingUrl: 'https://www.booking.com/hotel/it/four-seasons-firenze.html'
  },

  // ФРАНЦИЯ
  {
    id: 'hotel-fr-1',
    name: 'Paris Eiffel Residence',
    countryId: 'france',
    city: 'Париж',
    stars: 5,
    price: 35000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.9,
    reviews: 3241,
    amenities: ['Wi-Fi', 'Спа', 'Ресторан', 'Вид на Эйфелеву башню', 'Бар'],
    description: 'Роскошный отель с панорамным видом на Эйфелеву башню',
    bookingUrl: 'https://www.booking.com/hotel/fr/shangri-la-paris.html'
  },
  {
    id: 'hotel-fr-2',
    name: 'Provence Villa Hotel',
    countryId: 'france',
    city: 'Прованс',
    stars: 4,
    price: 12000,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    rating: 4.5,
    reviews: 687,
    amenities: ['Wi-Fi', 'Бассейн', 'Сад', 'Винный погреб'],
    description: 'Очаровательная вилла в сердце Прованса',
    bookingUrl: 'https://www.booking.com/hotel/fr/la-bastide-de-gordes.html'
  },
  {
    id: 'hotel-fr-3',
    name: 'Côte d\'Azur Resort',
    countryId: 'france',
    city: 'Ницца',
    stars: 5,
    price: 32000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.9,
    reviews: 2341,
    amenities: ['Wi-Fi', 'Частный пляж', 'Спа', 'Ресторан', 'Казино'],
    description: 'Легендарный отель на Лазурном берегу',
    bookingUrl: 'https://www.booking.com/hotel/fr/negresco-nice.html'
  },

  // ТАИЛАНД
  {
    id: 'hotel-th-1',
    name: 'Bangkok Sky Tower',
    countryId: 'thailand',
    city: 'Бангкок',
    stars: 5,
    price: 8000,
    image: 'https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=800',
    rating: 4.8,
    reviews: 2891,
    amenities: ['Wi-Fi', 'Бассейн на крыше', 'Спа', 'Ресторан', 'Фитнес'],
    description: 'Современный небоскрёб с бассейном на крыше',
    bookingUrl: 'https://www.booking.com/hotel/th/lebua-at-state-tower.html'
  },
  {
    id: 'hotel-th-2',
    name: 'Phuket Beach Resort',
    countryId: 'thailand',
    city: 'Пхукет',
    stars: 4,
    price: 6000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.7,
    reviews: 1567,
    amenities: ['Wi-Fi', 'Пляж', 'Бассейн', 'Спа', 'Дайвинг'],
    description: 'Тропический курорт на берегу Андаманского моря',
    bookingUrl: 'https://www.booking.com/hotel/th/amanpuri-phuket.html'
  },
  {
    id: 'hotel-th-3',
    name: 'Chiang Mai Mountain',
    countryId: 'thailand',
    city: 'Чиангмай',
    stars: 4,
    price: 5000,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    rating: 4.6,
    reviews: 1123,
    amenities: ['Wi-Fi', 'Горы', 'Спа', 'Йога', 'Ресторан'],
    description: 'Спокойный отель в горах Северного Таиланда',
    bookingUrl: 'https://www.booking.com/hotel/th/dhara-dhevi-chiang-mai.html'
  },

  // США
  {
    id: 'hotel-us-1',
    name: 'New York Plaza Hotel',
    countryId: 'usa',
    city: 'Нью-Йорк',
    stars: 5,
    price: 40000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.9,
    reviews: 4521,
    amenities: ['Wi-Fi', 'Спа', 'Ресторан', 'Бар', 'Консьерж'],
    description: 'Легендарный отель на Пятой авеню',
    bookingUrl: 'https://www.booking.com/hotel/us/the-plaza.html'
  },
  {
    id: 'hotel-us-2',
    name: 'Miami Beach Resort',
    countryId: 'usa',
    city: 'Майами',
    stars: 4,
    price: 20000,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
    rating: 4.6,
    reviews: 2134,
    amenities: ['Wi-Fi', 'Пляж', 'Бассейн', 'Ресторан', 'Ночной клуб'],
    description: 'Стильный отель на знаменитом пляже Майами',
    bookingUrl: 'https://www.booking.com/hotel/us/fontainebleau-miami-beach.html'
  },
  {
    id: 'hotel-us-3',
    name: 'Las Vegas Luxury',
    countryId: 'usa',
    city: 'Лас-Вегас',
    stars: 5,
    price: 18000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.8,
    reviews: 5432,
    amenities: ['Wi-Fi', 'Казино', 'Спа', 'Ресторан', 'Шоу'],
    description: 'Грандиозный отель-казино на Стрип',
    bookingUrl: 'https://www.booking.com/hotel/us/bellagio-las-vegas.html'
  },
  {
    id: 'hotel-us-4',
    name: 'San Francisco Bay',
    countryId: 'usa',
    city: 'Сан-Франциско',
    stars: 5,
    price: 28000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.7,
    reviews: 1876,
    amenities: ['Wi-Fi', 'Вид на залив', 'Спа', 'Ресторан', 'Бар'],
    description: 'Элегантный отель с видом на мост Золотые Ворота',
    bookingUrl: 'https://www.booking.com/hotel/us/fairmont-san-francisco.html'
  },

  // АВСТРАЛИЯ
  {
    id: 'hotel-au-1',
    name: 'Sydney Harbour Grand',
    countryId: 'australia',
    city: 'Сидней',
    stars: 5,
    price: 28000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.8,
    reviews: 1923,
    amenities: ['Wi-Fi', 'Вид на оперу', 'Спа', 'Ресторан', 'Бассейн'],
    description: 'Премиальный отель с видом на Сиднейскую оперу',
    bookingUrl: 'https://www.booking.com/hotel/au/park-hyatt-sydney.html'
  },
  {
    id: 'hotel-au-2',
    name: 'Great Barrier Reef Resort',
    countryId: 'australia',
    city: 'Кэрнс',
    stars: 4,
    price: 15000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.7,
    reviews: 1245,
    amenities: ['Wi-Fi', 'Дайвинг', 'Бассейн', 'Ресторан', 'Экскурсии'],
    description: 'Курорт для исследования Большого Барьерного рифа',
    bookingUrl: 'https://www.booking.com/hotel/au/lizard-island-resort.html'
  },
  {
    id: 'hotel-au-3',
    name: 'Melbourne City',
    countryId: 'australia',
    city: 'Мельбурн',
    stars: 5,
    price: 22000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.8,
    reviews: 1654,
    amenities: ['Wi-Fi', 'Спа', 'Ресторан', 'Бар', 'Фитнес'],
    description: 'Современный отель в культурной столице Австралии',
    bookingUrl: 'https://www.booking.com/hotel/au/crown-towers-melbourne.html'
  },

  // ИСПАНИЯ
  {
    id: 'hotel-es-1',
    name: 'Barcelona Beach Hotel',
    countryId: 'spain',
    city: 'Барселона',
    stars: 5,
    price: 22000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.8,
    reviews: 2567,
    amenities: ['Wi-Fi', 'Пляж', 'Спа', 'Ресторан', 'Терраса'],
    description: 'Современный отель на берегу Средиземного моря',
    bookingUrl: 'https://www.booking.com/hotel/es/w-barcelona.html'
  },
  {
    id: 'hotel-es-2',
    name: 'Madrid Royal Suite',
    countryId: 'spain',
    city: 'Мадрид',
    stars: 4,
    price: 14000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.6,
    reviews: 1432,
    amenities: ['Wi-Fi', 'Ресторан', 'Фитнес', 'Бар'],
    description: 'Элегантный отель в центре испанской столицы',
    bookingUrl: 'https://www.booking.com/hotel/es/palacio-de-los-duques-madrid.html'
  },
  {
    id: 'hotel-es-3',
    name: 'Ibiza Beach Club',
    countryId: 'spain',
    city: 'Ибица',
    stars: 5,
    price: 30000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.9,
    reviews: 2987,
    amenities: ['Wi-Fi', 'Пляжный клуб', 'Бассейн', 'Спа', 'Ночной клуб'],
    description: 'Роскошный курорт на легендарном острове',
    bookingUrl: 'https://www.booking.com/hotel/es/nobu-hotel-ibiza-bay.html'
  },

  // ГЕРМАНИЯ
  {
    id: 'hotel-de-1',
    name: 'Berlin Luxury Hotel',
    countryId: 'germany',
    city: 'Берлин',
    stars: 5,
    price: 26000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.7,
    reviews: 1876,
    amenities: ['Wi-Fi', 'Спа', 'Ресторан', 'Бар', 'Конференц-зал'],
    description: 'Премиум отель в историческом центре Берлина',
    bookingUrl: 'https://www.booking.com/hotel/de/adlon-kempinski-berlin.html'
  },
  {
    id: 'hotel-de-2',
    name: 'Munich Bavarian Inn',
    countryId: 'germany',
    city: 'Мюнхен',
    stars: 4,
    price: 16000,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    rating: 4.5,
    reviews: 1234,
    amenities: ['Wi-Fi', 'Пивной сад', 'Ресторан', 'Сауна'],
    description: 'Традиционный баварский отель с пивным садом',
    bookingUrl: 'https://www.booking.com/hotel/de/bayerischer-hof-munich.html'
  },
  {
    id: 'hotel-de-3',
    name: 'Hamburg Harbor View',
    countryId: 'germany',
    city: 'Гамбург',
    stars: 5,
    price: 20000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.7,
    reviews: 1567,
    amenities: ['Wi-Fi', 'Вид на порт', 'Спа', 'Ресторан', 'Бар'],
    description: 'Современный отель в портовом городе',
    bookingUrl: 'https://www.booking.com/hotel/de/the-fontenay-hamburg.html'
  },

  // ИНДИЯ
  {
    id: 'hotel-in-1',
    name: 'Mumbai Palace',
    countryId: 'india',
    city: 'Мумбаи',
    stars: 5,
    price: 12000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.8,
    reviews: 2341,
    amenities: ['Wi-Fi', 'Спа', 'Ресторан', 'Бассейн', 'Историческое здание'],
    description: 'Легендарный отель в историческом здании',
    bookingUrl: 'https://www.booking.com/hotel/in/taj-mahal-palace-mumbai.html'
  },
  {
    id: 'hotel-in-2',
    name: 'Goa Beach Paradise',
    countryId: 'india',
    city: 'Гоа',
    stars: 4,
    price: 5000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.6,
    reviews: 2134,
    amenities: ['Wi-Fi', 'Пляж', 'Бассейн', 'Йога', 'Аюрведа'],
    description: 'Тропический рай на берегу Аравийского моря',
    bookingUrl: 'https://www.booking.com/hotel/in/taj-exotica-goa.html'
  },
  {
    id: 'hotel-in-3',
    name: 'Jaipur Royal Heritage',
    countryId: 'india',
    city: 'Джайпур',
    stars: 5,
    price: 10000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.9,
    reviews: 1876,
    amenities: ['Wi-Fi', 'Дворец', 'Спа', 'Ресторан', 'Сад'],
    description: 'Роскошный дворец в розовом городе',
    bookingUrl: 'https://www.booking.com/hotel/in/rambagh-palace-jaipur.html'
  },

  // БРАЗИЛИЯ
  {
    id: 'hotel-br-1',
    name: 'Rio Copacabana Palace',
    countryId: 'brazil',
    city: 'Рио-де-Жанейро',
    stars: 5,
    price: 24000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.8,
    reviews: 2891,
    amenities: ['Wi-Fi', 'Пляж Копакабана', 'Спа', 'Ресторан', 'Бассейн'],
    description: 'Легендарный отель на пляже Копакабана',
    bookingUrl: 'https://www.booking.com/hotel/br/belmond-copacabana-palace.html'
  },
  {
    id: 'hotel-br-2',
    name: 'São Paulo Business',
    countryId: 'brazil',
    city: 'Сан-Паулу',
    stars: 4,
    price: 11000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.6,
    reviews: 1456,
    amenities: ['Wi-Fi', 'Бизнес-центр', 'Ресторан', 'Фитнес', 'Бар'],
    description: 'Современный отель в деловом центре города',
    bookingUrl: 'https://www.booking.com/hotel/br/unique-sao-paulo.html'
  },

  // КИТАЙ
  {
    id: 'hotel-cn-1',
    name: 'Beijing Imperial',
    countryId: 'china',
    city: 'Пекин',
    stars: 5,
    price: 20000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.7,
    reviews: 1654,
    amenities: ['Wi-Fi', 'Спа', 'Ресторан', 'Сад', 'Чайная церемония'],
    description: 'Роскошный отель в традиционном китайском стиле',
    bookingUrl: 'https://www.booking.com/hotel/cn/peninsula-beijing.html'
  },
  {
    id: 'hotel-cn-2',
    name: 'Shanghai Bund View',
    countryId: 'china',
    city: 'Шанхай',
    stars: 4,
    price: 14000,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    rating: 4.6,
    reviews: 1432,
    amenities: ['Wi-Fi', 'Вид на набережную', 'Ресторан', 'Бар'],
    description: 'Современный отель с видом на набережную Бунд',
    bookingUrl: 'https://www.booking.com/hotel/cn/waldorf-astoria-shanghai.html'
  },
  {
    id: 'hotel-cn-3',
    name: 'Hong Kong Sky',
    countryId: 'china',
    city: 'Гонконг',
    stars: 5,
    price: 32000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.9,
    reviews: 3241,
    amenities: ['Wi-Fi', 'Вид на гавань', 'Спа', 'Мишлен ресторан', 'Бассейн'],
    description: 'Роскошный отель с видом на гавань Виктория',
    bookingUrl: 'https://www.booking.com/hotel/hk/the-peninsula-hong-kong.html'
  },

  // ЮЖНАЯ КОРЕЯ
  {
    id: 'hotel-kr-1',
    name: 'Seoul Gangnam Tower',
    countryId: 'southkorea',
    city: 'Сеул',
    stars: 5,
    price: 19000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.8,
    reviews: 2341,
    amenities: ['Wi-Fi', 'Спа', 'Ресторан', 'Караоке', 'Бар на крыше'],
    description: 'Ультрасовременный отель в районе Каннам',
    bookingUrl: 'https://www.booking.com/hotel/kr/signiel-seoul.html'
  },
  {
    id: 'hotel-kr-2',
    name: 'Busan Ocean View',
    countryId: 'southkorea',
    city: 'Пусан',
    stars: 4,
    price: 12000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.7,
    reviews: 1234,
    amenities: ['Wi-Fi', 'Пляж', 'Спа', 'Ресторан', 'Бассейн'],
    description: 'Современный курорт на берегу моря',
    bookingUrl: 'https://www.booking.com/hotel/kr/park-hyatt-busan.html'
  },

  // МАЛЬДИВЫ
  {
    id: 'hotel-mv-1',
    name: 'Maldives Water Villa',
    countryId: 'maldives',
    city: 'Мале',
    stars: 5,
    price: 45000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 5.0,
    reviews: 1876,
    amenities: ['Wi-Fi', 'Частная вилла', 'Дайвинг', 'Спа', 'Ресторан'],
    description: 'Эксклюзивные виллы на воде в райском уголке',
    bookingUrl: 'https://www.booking.com/hotel/mv/soneva-jani.html'
  },
  {
    id: 'hotel-mv-2',
    name: 'Maldives Coral Resort',
    countryId: 'maldives',
    city: 'Атолл Ари',
    stars: 5,
    price: 40000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.9,
    reviews: 1567,
    amenities: ['Wi-Fi', 'Снорклинг', 'Спа', 'Ресторан', 'Бар'],
    description: 'Роскошный курорт среди коралловых рифов',
    bookingUrl: 'https://www.booking.com/hotel/mv/conrad-rangali-island.html'
  },

  // ЕГИПЕТ
  {
    id: 'hotel-eg-1',
    name: 'Cairo Pyramids View',
    countryId: 'egypt',
    city: 'Каир',
    stars: 4,
    price: 10000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.5,
    reviews: 2134,
    amenities: ['Wi-Fi', 'Вид на пирамиды', 'Бассейн', 'Ресторан'],
    description: 'Уникальный отель с видом на пирамиды Гизы',
    bookingUrl: 'https://www.booking.com/hotel/eg/marriott-mena-house-cairo.html'
  },
  {
    id: 'hotel-eg-2',
    name: 'Sharm El Sheikh Resort',
    countryId: 'egypt',
    city: 'Шарм-эль-Шейх',
    stars: 5,
    price: 15000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.7,
    reviews: 3241,
    amenities: ['Wi-Fi', 'Пляж', 'Дайвинг', 'Спа', 'Бассейн'],
    description: 'Премиум курорт на Красном море',
    bookingUrl: 'https://www.booking.com/hotel/eg/four-seasons-sharm-el-sheikh.html'
  },

  // ОАЭ
  {
    id: 'hotel-ae-1',
    name: 'Dubai Burj Al Arab',
    countryId: 'uae',
    city: 'Дубай',
    stars: 5,
    price: 60000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 5.0,
    reviews: 5432,
    amenities: ['Wi-Fi', 'Роскошь', 'Спа', 'Рестораны', 'Вертолётная площадка'],
    description: 'Самый роскошный отель в мире',
    bookingUrl: 'https://www.booking.com/hotel/ae/burj-al-arab.html'
  },
  {
    id: 'hotel-ae-2',
    name: 'Dubai Palm Resort',
    countryId: 'uae',
    city: 'Дубай',
    stars: 5,
    price: 35000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.9,
    reviews: 4321,
    amenities: ['Wi-Fi', 'Аквапарк', 'Частный пляж', 'Спа', 'Рестораны'],
    description: 'Курорт на искусственном острове Пальма',
    bookingUrl: 'https://www.booking.com/hotel/ae/atlantis-the-palm.html'
  },
  {
    id: 'hotel-ae-3',
    name: 'Abu Dhabi Emirates Palace',
    countryId: 'uae',
    city: 'Абу-Даби',
    stars: 5,
    price: 50000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.9,
    reviews: 3654,
    amenities: ['Wi-Fi', 'Дворец', 'Спа', 'Золото', 'Рестораны'],
    description: 'Дворец-отель с золотой отделкой',
    bookingUrl: 'https://www.booking.com/hotel/ae/emirates-palace.html'
  },

  // ТУРЦИЯ
  {
    id: 'hotel-tr-1',
    name: 'Istanbul Bosphorus',
    countryId: 'turkey',
    city: 'Стамбул',
    stars: 5,
    price: 18000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.8,
    reviews: 2567,
    amenities: ['Wi-Fi', 'Вид на Босфор', 'Спа', 'Ресторан', 'Хаммам'],
    description: 'Роскошный отель на берегу Босфора',
    bookingUrl: 'https://www.booking.com/hotel/tr/ciragan-palace-kempinski.html'
  },
  {
    id: 'hotel-tr-2',
    name: 'Antalya Beach Resort',
    countryId: 'turkey',
    city: 'Анталья',
    stars: 5,
    price: 12000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.7,
    reviews: 3241,
    amenities: ['Wi-Fi', 'Пляж', 'Аквапарк', 'Спа', 'Всё включено'],
    description: 'Огромный курорт на Средиземном море',
    bookingUrl: 'https://www.booking.com/hotel/tr/mardan-palace.html'
  },

  // ГРЕЦИЯ
  {
    id: 'hotel-gr-1',
    name: 'Santorini Sunset',
    countryId: 'greece',
    city: 'Санторини',
    stars: 5,
    price: 28000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.9,
    reviews: 1987,
    amenities: ['Wi-Fi', 'Вид на кальдеру', 'Бассейн', 'Ресторан', 'Романтика'],
    description: 'Белоснежный отель с видом на закат',
    bookingUrl: 'https://www.booking.com/hotel/gr/katikies-santorini.html'
  },
  {
    id: 'hotel-gr-2',
    name: 'Athens Acropolis View',
    countryId: 'greece',
    city: 'Афины',
    stars: 4,
    price: 14000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.7,
    reviews: 1654,
    amenities: ['Wi-Fi', 'Вид на Акрополь', 'Ресторан на крыше', 'Бар'],
    description: 'Элегантный отель с видом на Акрополь',
    bookingUrl: 'https://www.booking.com/hotel/gr/grande-bretagne-athens.html'
  },

  // ВЕЛИКОБРИТАНИЯ
  {
    id: 'hotel-uk-1',
    name: 'London Savoy',
    countryId: 'uk',
    city: 'Лондон',
    stars: 5,
    price: 38000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.9,
    reviews: 4321,
    amenities: ['Wi-Fi', 'Исторический', 'Спа', 'Ресторан', 'Бар'],
    description: 'Легендарный отель на берегу Темзы',
    bookingUrl: 'https://www.booking.com/hotel/gb/the-savoy.html'
  },
  {
    id: 'hotel-uk-2',
    name: 'Edinburgh Castle View',
    countryId: 'uk',
    city: 'Эдинбург',
    stars: 4,
    price: 16000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.7,
    reviews: 1432,
    amenities: ['Wi-Fi', 'Вид на замок', 'Ресторан', 'Бар', 'Виски-бар'],
    description: 'Исторический отель с видом на замок',
    bookingUrl: 'https://www.booking.com/hotel/gb/balmoral-edinburgh.html'
  },

  // ПОРТУГАЛИЯ
  {
    id: 'hotel-pt-1',
    name: 'Lisbon Coastal',
    countryId: 'portugal',
    city: 'Лиссабон',
    stars: 5,
    price: 20000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.8,
    reviews: 1876,
    amenities: ['Wi-Fi', 'Вид на океан', 'Спа', 'Ресторан', 'Терраса'],
    description: 'Элегантный отель на берегу Атлантики',
    bookingUrl: 'https://www.booking.com/hotel/pt/pestana-palace-lisboa.html'
  },

  // КАНАДА
  {
    id: 'hotel-ca-1',
    name: 'Toronto CN Tower View',
    countryId: 'canada',
    city: 'Торонто',
    stars: 5,
    price: 22000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.7,
    reviews: 1654,
    amenities: ['Wi-Fi', 'Вид на башню', 'Спа', 'Ресторан', 'Бар'],
    description: 'Современный отель в центре Торонто',
    bookingUrl: 'https://www.booking.com/hotel/ca/ritz-carlton-toronto.html'
  },

  // МЕКСИКА
  {
    id: 'hotel-mx-1',
    name: 'Cancun Paradise',
    countryId: 'mexico',
    city: 'Канкун',
    stars: 5,
    price: 18000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.8,
    reviews: 3241,
    amenities: ['Wi-Fi', 'Пляж', 'Всё включено', 'Спа', 'Бассейны'],
    description: 'Роскошный курорт на Карибском море',
    bookingUrl: 'https://www.booking.com/hotel/mx/live-aqua-cancun.html'
  },

  // СИНГАПУР
  {
    id: 'hotel-sg-1',
    name: 'Marina Bay Sands',
    countryId: 'singapore',
    city: 'Сингапур',
    stars: 5,
    price: 32000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.9,
    reviews: 5432,
    amenities: ['Wi-Fi', 'Бассейн на крыше', 'Казино', 'Спа', 'Рестораны'],
    description: 'Икона Сингапура с бассейном на 57 этаже',
    bookingUrl: 'https://www.booking.com/hotel/sg/marina-bay-sands.html'
  },

  // ИНДОНЕЗИЯ
  {
    id: 'hotel-id-1',
    name: 'Bali Ubud Resort',
    countryId: 'indonesia',
    city: 'Бали',
    stars: 5,
    price: 14000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.9,
    reviews: 2341,
    amenities: ['Wi-Fi', 'Джунгли', 'Спа', 'Йога', 'Бассейн'],
    description: 'Райский отель в джунглях Убуда',
    bookingUrl: 'https://www.booking.com/hotel/id/hanging-gardens-of-bali.html'
  },

  // ВЬЕТНАМ
  {
    id: 'hotel-vn-1',
    name: 'Hanoi Heritage',
    countryId: 'vietnam',
    city: 'Ханой',
    stars: 5,
    price: 10000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.7,
    reviews: 1432,
    amenities: ['Wi-Fi', 'Колониальный стиль', 'Спа', 'Ресторан', 'Бассейн'],
    description: 'Отель в колониальном французском стиле',
    bookingUrl: 'https://www.booking.com/hotel/vn/sofitel-legend-metropole-hanoi.html'
  }
];
