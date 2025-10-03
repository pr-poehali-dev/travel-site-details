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
}

export const hotels: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Tokyo Grand Palace',
    countryId: 'japan',
    city: 'Токио',
    stars: 5,
    price: 25000,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    rating: 4.9,
    reviews: 1847,
    amenities: ['Wi-Fi', 'Бассейн', 'Спа', 'Ресторан', 'Фитнес'],
    description: 'Роскошный отель в центре Токио с видом на город'
  },
  {
    id: 'hotel-2',
    name: 'Kyoto Heritage Inn',
    countryId: 'japan',
    city: 'Киото',
    stars: 4,
    price: 15000,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    rating: 4.7,
    reviews: 923,
    amenities: ['Wi-Fi', 'Онсэн', 'Ресторан', 'Сад'],
    description: 'Традиционный японский отель с горячими источниками'
  },
  {
    id: 'hotel-3',
    name: 'Roma Luxury Hotel',
    countryId: 'italy',
    city: 'Рим',
    stars: 5,
    price: 30000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.8,
    reviews: 2134,
    amenities: ['Wi-Fi', 'Бассейн', 'Спа', 'Ресторан', 'Терраса'],
    description: 'Элегантный отель рядом с Колизеем'
  },
  {
    id: 'hotel-4',
    name: 'Venice Canal View',
    countryId: 'italy',
    city: 'Венеция',
    stars: 4,
    price: 18000,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    rating: 4.6,
    reviews: 1456,
    amenities: ['Wi-Fi', 'Вид на канал', 'Ресторан', 'Терраса'],
    description: 'Уютный отель с видом на венецианские каналы'
  },
  {
    id: 'hotel-5',
    name: 'Paris Eiffel Residence',
    countryId: 'france',
    city: 'Париж',
    stars: 5,
    price: 35000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.9,
    reviews: 3241,
    amenities: ['Wi-Fi', 'Спа', 'Ресторан', 'Вид на Эйфелеву башню', 'Бар'],
    description: 'Роскошный отель с панорамным видом на Эйфелеву башню'
  },
  {
    id: 'hotel-6',
    name: 'Provence Villa Hotel',
    countryId: 'france',
    city: 'Прованс',
    stars: 4,
    price: 12000,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    rating: 4.5,
    reviews: 687,
    amenities: ['Wi-Fi', 'Бассейн', 'Сад', 'Винный погреб'],
    description: 'Очаровательная вилла в сердце Прованса'
  },
  {
    id: 'hotel-7',
    name: 'Bangkok Sky Tower',
    countryId: 'thailand',
    city: 'Бангкок',
    stars: 5,
    price: 8000,
    image: 'https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=800',
    rating: 4.8,
    reviews: 2891,
    amenities: ['Wi-Fi', 'Бассейн на крыше', 'Спа', 'Ресторан', 'Фитнес'],
    description: 'Современный небоскрёб с бассейном на крыше'
  },
  {
    id: 'hotel-8',
    name: 'Phuket Beach Resort',
    countryId: 'thailand',
    city: 'Пхукет',
    stars: 4,
    price: 6000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.7,
    reviews: 1567,
    amenities: ['Wi-Fi', 'Пляж', 'Бассейн', 'Спа', 'Дайвинг'],
    description: 'Тропический курорт на берегу Андаманского моря'
  },
  {
    id: 'hotel-9',
    name: 'New York Plaza Hotel',
    countryId: 'usa',
    city: 'Нью-Йорк',
    stars: 5,
    price: 40000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.9,
    reviews: 4521,
    amenities: ['Wi-Fi', 'Спа', 'Ресторан', 'Бар', 'Консьерж'],
    description: 'Легендарный отель на Пятой авеню'
  },
  {
    id: 'hotel-10',
    name: 'Miami Beach Resort',
    countryId: 'usa',
    city: 'Майами',
    stars: 4,
    price: 20000,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
    rating: 4.6,
    reviews: 2134,
    amenities: ['Wi-Fi', 'Пляж', 'Бассейн', 'Ресторан', 'Ночной клуб'],
    description: 'Стильный отель на знаменитом пляже Майами'
  },
  {
    id: 'hotel-11',
    name: 'Sydney Harbour Grand',
    countryId: 'australia',
    city: 'Сидней',
    stars: 5,
    price: 28000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.8,
    reviews: 1923,
    amenities: ['Wi-Fi', 'Вид на оперу', 'Спа', 'Ресторан', 'Бассейн'],
    description: 'Премиальный отель с видом на Сиднейскую оперу'
  },
  {
    id: 'hotel-12',
    name: 'Great Barrier Reef Resort',
    countryId: 'australia',
    city: 'Кэрнс',
    stars: 4,
    price: 15000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.7,
    reviews: 1245,
    amenities: ['Wi-Fi', 'Дайвинг', 'Бассейн', 'Ресторан', 'Экскурсии'],
    description: 'Курорт для исследования Большого Барьерного рифа'
  },
  {
    id: 'hotel-13',
    name: 'Barcelona Beach Hotel',
    countryId: 'spain',
    city: 'Барселона',
    stars: 5,
    price: 22000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.8,
    reviews: 2567,
    amenities: ['Wi-Fi', 'Пляж', 'Спа', 'Ресторан', 'Терраса'],
    description: 'Современный отель на берегу Средиземного моря'
  },
  {
    id: 'hotel-14',
    name: 'Madrid Royal Suite',
    countryId: 'spain',
    city: 'Мадрид',
    stars: 4,
    price: 14000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.6,
    reviews: 1432,
    amenities: ['Wi-Fi', 'Ресторан', 'Фитнес', 'Бар'],
    description: 'Элегантный отель в центре испанской столицы'
  },
  {
    id: 'hotel-15',
    name: 'Berlin Luxury Hotel',
    countryId: 'germany',
    city: 'Берлин',
    stars: 5,
    price: 26000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.7,
    reviews: 1876,
    amenities: ['Wi-Fi', 'Спа', 'Ресторан', 'Бар', 'Конференц-зал'],
    description: 'Премиум отель в историческом центре Берлина'
  },
  {
    id: 'hotel-16',
    name: 'Munich Bavarian Inn',
    countryId: 'germany',
    city: 'Мюнхен',
    stars: 4,
    price: 16000,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    rating: 4.5,
    reviews: 1234,
    amenities: ['Wi-Fi', 'Пивной сад', 'Ресторан', 'Сауна'],
    description: 'Традиционный баварский отель с пивным садом'
  },
  {
    id: 'hotel-17',
    name: 'Dubai Palm Jumeirah Resort',
    countryId: 'india',
    city: 'Мумбаи',
    stars: 5,
    price: 18000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.9,
    reviews: 3421,
    amenities: ['Wi-Fi', 'Частный пляж', 'Спа', 'Аквапарк', 'Рестораны'],
    description: 'Ультра-роскошный курорт на искусственном острове'
  },
  {
    id: 'hotel-18',
    name: 'Goa Beach Paradise',
    countryId: 'india',
    city: 'Гоа',
    stars: 4,
    price: 5000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.6,
    reviews: 2134,
    amenities: ['Wi-Fi', 'Пляж', 'Бассейн', 'Йога', 'Аюрведа'],
    description: 'Тропический рай на берегу Аравийского моря'
  },
  {
    id: 'hotel-19',
    name: 'Rio Copacabana Palace',
    countryId: 'brazil',
    city: 'Рио-де-Жанейро',
    stars: 5,
    price: 24000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.8,
    reviews: 2891,
    amenities: ['Wi-Fi', 'Пляж Копакабана', 'Спа', 'Ресторан', 'Бассейн'],
    description: 'Легендарный отель на пляже Копакабана'
  },
  {
    id: 'hotel-20',
    name: 'Сhina Beijing Imperial',
    countryId: 'china',
    city: 'Пекин',
    stars: 5,
    price: 20000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.7,
    reviews: 1654,
    amenities: ['Wi-Fi', 'Спа', 'Ресторан', 'Сад', 'Чайная церемония'],
    description: 'Роскошный отель в традиционном китайском стиле'
  },
  {
    id: 'hotel-21',
    name: 'Shanghai Bund View',
    countryId: 'china',
    city: 'Шанхай',
    stars: 4,
    price: 14000,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    rating: 4.6,
    reviews: 1432,
    amenities: ['Wi-Fi', 'Вид на набережную', 'Ресторан', 'Бар'],
    description: 'Современный отель с видом на набережную Бунд'
  },
  {
    id: 'hotel-22',
    name: 'Seoul Gangnam Tower',
    countryId: 'southkorea',
    city: 'Сеул',
    stars: 5,
    price: 19000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.8,
    reviews: 2341,
    amenities: ['Wi-Fi', 'Спа', 'Ресторан', 'Караоке', 'Бар на крыше'],
    description: 'Ультрасовременный отель в районе Каннам'
  },
  {
    id: 'hotel-23',
    name: 'Maldives Water Villa',
    countryId: 'maldives',
    city: 'Мале',
    stars: 5,
    price: 45000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 5.0,
    reviews: 1876,
    amenities: ['Wi-Fi', 'Частная вилла', 'Дайвинг', 'Спа', 'Ресторан'],
    description: 'Эксклюзивные виллы на воде в райском уголке'
  },
  {
    id: 'hotel-24',
    name: 'Cairo Pyramids View',
    countryId: 'egypt',
    city: 'Каир',
    stars: 4,
    price: 10000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.5,
    reviews: 2134,
    amenities: ['Wi-Fi', 'Вид на пирамиды', 'Бассейн', 'Ресторан'],
    description: 'Уникальный отель с видом на пирамиды Гизы'
  }
];
