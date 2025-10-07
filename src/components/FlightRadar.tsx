import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface Flight {
  id: string;
  callsign: string;
  airline: string;
  aircraft: string;
  aircraft_model: string;
  departure: string;
  departure_city: string;
  arrival: string;
  arrival_city: string;
  position: { x: number; y: number };
  altitude: number;
  speed: number;
  heading: number;
  latitude: number;
  longitude: number;
  status: string;
  aircraft_age: number;
  photo_url: string;
}

const airlines = [
  { name: 'Аэрофлот', code: 'SU', country: 'Россия' },
  { name: 'S7 Airlines', code: 'S7', country: 'Россия' },
  { name: 'Победа', code: 'DP', country: 'Россия' },
  { name: 'Utair', code: 'UT', country: 'Россия' },
  { name: 'Уральские авиалинии', code: 'U6', country: 'Россия' },
  { name: 'Emirates', code: 'EK', country: 'ОАЭ' },
  { name: 'Turkish Airlines', code: 'TK', country: 'Турция' },
  { name: 'Lufthansa', code: 'LH', country: 'Германия' },
  { name: 'Air France', code: 'AF', country: 'Франция' },
  { name: 'British Airways', code: 'BA', country: 'Великобритания' },
  { name: 'Qatar Airways', code: 'QR', country: 'Катар' },
  { name: 'Singapore Airlines', code: 'SQ', country: 'Сингапур' },
  { name: 'ANA', code: 'NH', country: 'Япония' },
  { name: 'Delta Air Lines', code: 'DL', country: 'США' },
  { name: 'United Airlines', code: 'UA', country: 'США' },
];

const aircraftModels = [
  'Boeing 737-800', 'Boeing 737 MAX', 'Boeing 777-300ER', 'Boeing 787-9',
  'Airbus A320neo', 'Airbus A321', 'Airbus A350-900', 'Airbus A380',
  'Embraer E190', 'Bombardier CRJ-900', 'Sukhoi Superjet 100'
];

const airports = [
  { code: 'SVO', city: 'Москва (Шереметьево)', lat: 55.9726, lng: 37.4146 },
  { code: 'DME', city: 'Москва (Домодедово)', lat: 55.4088, lng: 37.9063 },
  { code: 'LED', city: 'Санкт-Петербург', lat: 59.8003, lng: 30.2625 },
  { code: 'AER', city: 'Сочи', lat: 43.4499, lng: 39.9566 },
  { code: 'SVX', city: 'Екатеринбург', lat: 56.7431, lng: 60.8027 },
  { code: 'KZN', city: 'Казань', lat: 55.6062, lng: 49.2787 },
  { code: 'VVO', city: 'Владивосток', lat: 43.3990, lng: 132.1485 },
  { code: 'CDG', city: 'Париж', lat: 49.0097, lng: 2.5479 },
  { code: 'LHR', city: 'Лондон', lat: 51.4700, lng: -0.4543 },
  { code: 'DXB', city: 'Дубай', lat: 25.2532, lng: 55.3657 },
  { code: 'IST', city: 'Стамбул', lat: 41.2753, lng: 28.7519 },
  { code: 'NRT', city: 'Токио', lat: 35.7647, lng: 140.3864 },
  { code: 'JFK', city: 'Нью-Йорк', lat: 40.6413, lng: -73.7781 },
  { code: 'FCO', city: 'Рим', lat: 41.8003, lng: 12.2389 },
  { code: 'MAD', city: 'Мадрид', lat: 40.4983, lng: -3.5676 },
  { code: 'BKK', city: 'Бангкок', lat: 13.6900, lng: 100.7501 },
  { code: 'SIN', city: 'Сингапур', lat: 1.3644, lng: 103.9915 },
];

const generateRegistration = (airline: string, index: number): string => {
  const prefixes: Record<string, string> = {
    'Аэрофлот': 'VP-B', 'S7 Airlines': 'VP-B', 'Победа': 'VP-B', 'Utair': 'VP-B',
    'Уральские авиалинии': 'VP-B', 'Emirates': 'A6-E', 'Turkish Airlines': 'TC-J',
    'Lufthansa': 'D-A', 'Air France': 'F-G', 'British Airways': 'G-X',
    'Qatar Airways': 'A7-B', 'Singapore Airlines': '9V-S', 'ANA': 'JA',
    'Delta Air Lines': 'N', 'United Airlines': 'N'
  };
  
  const prefix = prefixes[airline] || 'N';
  const suffix = (index + 100).toString().padStart(3, '0');
  return `${prefix}${suffix}`;
};

const latLngToScreen = (lat: number, lng: number) => {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
};

const generateRealisticFlights = (): Flight[] => {
  const flights: Flight[] = [];
  const now = Date.now();

  for (let i = 0; i < 60; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const model = aircraftModels[Math.floor(Math.random() * aircraftModels.length)];
    const registration = generateRegistration(airline.name, i);
    
    const depAirport = airports[Math.floor(Math.random() * airports.length)];
    let arrAirport = airports[Math.floor(Math.random() * airports.length)];
    while (arrAirport.code === depAirport.code) {
      arrAirport = airports[Math.floor(Math.random() * airports.length)];
    }

    const latDiff = arrAirport.lat - depAirport.lat;
    const lngDiff = arrAirport.lng - depAirport.lng;
    const progress = (Math.sin(now / 100000 + i) + 1) / 2;
    
    const currentLat = depAirport.lat + latDiff * progress;
    const currentLng = depAirport.lng + lngDiff * progress;
    
    const position = latLngToScreen(currentLat, currentLng);
    
    const heading = Math.atan2(lngDiff, latDiff) * (180 / Math.PI);
    
    const hash = registration.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const age = 1 + (hash % 25);
    const imageId = 1000 + (hash % 100);

    flights.push({
      id: `${airline.code}${100 + i}-${now}`,
      callsign: `${airline.code}${100 + i}`,
      airline: airline.name,
      aircraft: registration,
      aircraft_model: model,
      departure: depAirport.code,
      departure_city: depAirport.city,
      arrival: arrAirport.code,
      arrival_city: arrAirport.city,
      position,
      altitude: 8000 + Math.floor(Math.random() * 4000),
      speed: 700 + Math.floor(Math.random() * 300),
      heading: heading + 90,
      latitude: currentLat,
      longitude: currentLng,
      status: Math.random() > 0.05 ? 'active' : 'delayed',
      aircraft_age: age,
      photo_url: `https://picsum.photos/seed/aircraft-${imageId}/800/600`,
    });
  }

  return flights;
};

export default function FlightRadar() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFlightList, setShowFlightList] = useState(true);

  useEffect(() => {
    const initialFlights = generateRealisticFlights();
    setFlights(initialFlights);

    const animationInterval = setInterval(() => {
      setFlights(prevFlights =>
        prevFlights.map(flight => {
          const speed = flight.speed / 50000;
          const radians = (flight.heading * Math.PI) / 180;
          let newX = flight.position.x + Math.cos(radians) * speed;
          let newY = flight.position.y + Math.sin(radians) * speed;

          if (newX < 0) newX = 95;
          if (newX > 100) newX = 5;
          if (newY < 0) newY = 95;
          if (newY > 100) newY = 5;

          return {
            ...flight,
            position: { x: newX, y: newY },
            heading: flight.heading + (Math.random() - 0.5) * 1,
            altitude: Math.max(1000, Math.min(12000, flight.altitude + (Math.random() - 0.5) * 100)),
            speed: Math.max(400, Math.min(1000, flight.speed + (Math.random() - 0.5) * 20)),
          };
        })
      );
    }, 2000);

    const regenerateInterval = setInterval(() => {
      setFlights(generateRealisticFlights());
    }, 120000);

    return () => {
      clearInterval(animationInterval);
      clearInterval(regenerateInterval);
    };
  }, []);

  const filteredFlights = flights.filter(
    flight =>
      flight.callsign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.airline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.departure.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.arrival.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.departure_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.arrival_city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFlightClick = (flight: Flight) => {
    setSelectedFlight(flight);
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.05) 0%, transparent 50%),
            linear-gradient(to bottom, #020617 0%, #0f172a 100%)
          `,
        }}
      >
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(6, 182, 212, 0.03) 50px, rgba(6, 182, 212, 0.03) 51px),
              repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(6, 182, 212, 0.03) 50px, rgba(6, 182, 212, 0.03) 51px)
            `
          }}
        />
      </div>

      <Link 
        to="/" 
        className="absolute top-4 right-4 z-[1001] inline-flex items-center gap-2 px-4 py-2 bg-slate-900/95 border-2 border-cyan-500/30 text-cyan-200 rounded-xl hover:border-cyan-400/60 hover:bg-slate-900 transition-all duration-300 backdrop-blur-md shadow-lg"
      >
        <Icon name="Home" size={18} />
        <span>На главную</span>
      </Link>

      <div className="absolute top-4 left-4 z-[1000] flex gap-2">
        <div className="bg-slate-900/95 backdrop-blur-md border-2 border-cyan-500/30 rounded-xl p-3 shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="Radar" size={24} className="text-cyan-400 animate-pulse" />
            <h2 className="text-white font-bold text-lg">Радар Странника</h2>
          </div>
          <div className="relative mb-3">
            <Input
              type="text"
              placeholder="Поиск рейса..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-cyan-500/30 text-white placeholder:text-slate-400"
            />
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={showFlightList ? "default" : "outline"}
              onClick={() => setShowFlightList(!showFlightList)}
              className="text-xs bg-cyan-500 hover:bg-cyan-600"
            >
              <Icon name="List" size={14} className="mr-1" />
              Рейсы ({filteredFlights.length})
            </Button>
          </div>
        </div>

        {showFlightList && (
          <Card className="bg-slate-900/95 backdrop-blur-md border-2 border-cyan-500/30 w-80 max-h-[calc(100vh-120px)] overflow-hidden flex flex-col">
            <div className="p-3 border-b border-cyan-500/20">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Icon name="Plane" size={18} className="text-cyan-400" />
                Активные рейсы
              </h3>
            </div>
            <div className="overflow-y-auto flex-1">
              {filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  onClick={() => handleFlightClick(flight)}
                  className={`p-3 border-b border-slate-700/50 hover:bg-cyan-500/10 cursor-pointer transition-colors ${
                    selectedFlight?.id === flight.id ? 'bg-cyan-500/20' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyan-400 font-bold text-sm">{flight.callsign}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      flight.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {flight.status === 'active' ? 'В полёте' : 'Задержка'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 mb-1">{flight.airline}</div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{flight.departure}</span>
                    <Icon name="ArrowRight" size={12} />
                    <span>{flight.arrival}</span>
                  </div>
                  <div className="flex gap-3 mt-2 text-xs text-slate-500">
                    <span>↑ {Math.round(flight.altitude).toLocaleString()}м</span>
                    <span>→ {Math.round(flight.speed)}км/ч</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {selectedFlight && (
        <Card className="absolute top-4 right-4 z-[1000] bg-slate-900/95 backdrop-blur-md border-2 border-cyan-500/30 w-96 max-h-[calc(100vh-120px)] overflow-auto mr-24">
          <div className="p-4 border-b border-cyan-500/20 flex items-center justify-between">
            <h3 className="text-white font-bold text-lg">{selectedFlight.callsign}</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedFlight(null)}
              className="text-slate-400 hover:text-white"
            >
              <Icon name="X" size={18} />
            </Button>
          </div>
          
          <div className="relative h-48 overflow-hidden">
            <img 
              src={selectedFlight.photo_url} 
              alt={`${selectedFlight.aircraft_model} ${selectedFlight.aircraft}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-3">
              <div className="text-white font-bold text-sm">{selectedFlight.aircraft_model}</div>
              <div className="text-cyan-400 text-xs">{selectedFlight.aircraft}</div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-slate-400 text-sm mb-1">Авиакомпания</div>
                <div className="text-white font-semibold">{selectedFlight.airline}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">Возраст борта</div>
                <div className="text-white font-semibold">{selectedFlight.aircraft_age} {selectedFlight.aircraft_age === 1 ? 'год' : selectedFlight.aircraft_age < 5 ? 'года' : 'лет'}</div>
              </div>
            </div>

            <div>
              <div className="text-slate-400 text-sm mb-1">Бортовой номер</div>
              <div className="text-white font-semibold font-mono text-lg">{selectedFlight.aircraft}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-slate-400 text-sm mb-1">Вылет</div>
                <div className="text-white font-semibold">{selectedFlight.departure}</div>
                <div className="text-slate-500 text-xs mt-1">{selectedFlight.departure_city}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">Прилёт</div>
                <div className="text-white font-semibold">{selectedFlight.arrival}</div>
                <div className="text-slate-500 text-xs mt-1">{selectedFlight.arrival_city}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <div className="text-slate-400 text-xs mb-1">Высота</div>
                <div className="text-cyan-400 font-bold text-lg">{Math.round(flight.altitude).toLocaleString()}</div>
                <div className="text-slate-500 text-xs">метров</div>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <div className="text-slate-400 text-xs mb-1">Скорость</div>
                <div className="text-cyan-400 font-bold text-lg">{Math.round(selectedFlight.speed)}</div>
                <div className="text-slate-500 text-xs">км/ч</div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-3 rounded-lg">
              <div className="text-slate-400 text-xs mb-1">Курс</div>
              <div className="text-cyan-400 font-bold text-lg">{Math.round(selectedFlight.heading)}°</div>
            </div>

            <div className="bg-slate-800/50 p-3 rounded-lg">
              <div className="text-slate-400 text-xs mb-1">Координаты</div>
              <div className="text-white font-mono text-xs">
                {selectedFlight.latitude.toFixed(4)}, {selectedFlight.longitude.toFixed(4)}
              </div>
            </div>

            <div className={`p-3 rounded-lg ${
              selectedFlight.status === 'active' 
                ? 'bg-green-500/10 border border-green-500/30' 
                : 'bg-orange-500/10 border border-orange-500/30'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  selectedFlight.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-orange-400'
                }`}></div>
                <span className={selectedFlight.status === 'active' ? 'text-green-400' : 'text-orange-400'}>
                  {selectedFlight.status === 'active' ? 'Рейс активен' : 'Задержка рейса'}
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="absolute bottom-4 left-4 z-[1000] bg-slate-900/95 backdrop-blur-md border-2 border-cyan-500/30 rounded-xl px-4 py-2">
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-white">Онлайн: {flights.length}</span>
          </div>
          <div className="w-px h-4 bg-cyan-500/30"></div>
          <span className="text-slate-400">Обновление: 2 сек</span>
        </div>
      </div>

      <div className="absolute inset-0">
        {flights.map((flight) => (
          <div
            key={flight.id}
            onClick={() => handleFlightClick(flight)}
            className={`absolute cursor-pointer transition-all duration-500 group ${
              selectedFlight?.id === flight.id ? 'scale-150 z-50' : 'z-10'
            }`}
            style={{
              left: `${flight.position.x}%`,
              top: `${flight.position.y}%`,
              transform: `translate(-50%, -50%) rotate(${flight.heading}deg)`,
            }}
          >
            <div className="relative">
              <Icon 
                name="Plane" 
                size={selectedFlight?.id === flight.id ? 32 : 24} 
                className={`${
                  flight.status === 'active' ? 'text-cyan-400' : 'text-orange-400'
                } drop-shadow-lg transition-all`}
              />
              {selectedFlight?.id === flight.id && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-cyan-500/50 rounded px-2 py-1 whitespace-nowrap text-xs text-cyan-300 font-semibold">
                  {flight.callsign}
                </div>
              )}
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-cyan-500/50 rounded px-2 py-1 whitespace-nowrap text-xs text-white transition-opacity">
                {flight.callsign}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
