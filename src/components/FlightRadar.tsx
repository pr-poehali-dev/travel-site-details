import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

interface Flight {
  id: string;
  callsign: string;
  airline: string;
  aircraft: string;
  departure: string;
  arrival: string;
  position: [number, number];
  altitude: number;
  speed: number;
  heading: number;
  status: 'active' | 'landed' | 'delayed';
  route: [number, number][];
}

const generateFlights = (): Flight[] => {
  const airlines = ['Аэрофлот', 'S7', 'Победа', 'Уральские авиалинии', 'Smartavia', 'Emirates', 'Turkish Airlines', 'Lufthansa', 'Air France', 'British Airways'];
  const aircrafts = ['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A350', 'Boeing 787', 'Airbus A321', 'Embraer E190', 'Bombardier CRJ'];
  const cities = [
    { name: 'Москва', coords: [55.7558, 37.6173] },
    { name: 'Санкт-Петербург', coords: [59.9311, 30.3609] },
    { name: 'Сочи', coords: [43.5855, 39.7231] },
    { name: 'Екатеринбург', coords: [56.8389, 60.6057] },
    { name: 'Казань', coords: [55.7887, 49.1221] },
    { name: 'Владивосток', coords: [43.1056, 131.8735] },
    { name: 'Париж', coords: [48.8566, 2.3522] },
    { name: 'Лондон', coords: [51.5074, -0.1278] },
    { name: 'Дубай', coords: [25.2048, 55.2708] },
    { name: 'Стамбул', coords: [41.0082, 28.9784] },
    { name: 'Токио', coords: [35.6762, 139.6503] },
    { name: 'Нью-Йорк', coords: [40.7128, -74.0060] },
  ];

  const flights: Flight[] = [];
  for (let i = 0; i < 50; i++) {
    const dep = cities[Math.floor(Math.random() * cities.length)];
    let arr = cities[Math.floor(Math.random() * cities.length)];
    while (arr.name === dep.name) {
      arr = cities[Math.floor(Math.random() * cities.length)];
    }

    const progress = Math.random();
    const lat = dep.coords[0] + (arr.coords[0] - dep.coords[0]) * progress;
    const lng = dep.coords[1] + (arr.coords[1] - dep.coords[1]) * progress;

    const route: [number, number][] = [];
    for (let j = 0; j <= 10; j++) {
      const routeLat = dep.coords[0] + (arr.coords[0] - dep.coords[0]) * (j / 10);
      const routeLng = dep.coords[1] + (arr.coords[1] - dep.coords[1]) * (j / 10);
      route.push([routeLat, routeLng]);
    }

    flights.push({
      id: `FL${1000 + i}`,
      callsign: `${airlines[Math.floor(Math.random() * airlines.length)].substring(0, 2).toUpperCase()}${100 + i}`,
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      aircraft: aircrafts[Math.floor(Math.random() * aircrafts.length)],
      departure: dep.name,
      arrival: arr.name,
      position: [lat, lng],
      altitude: Math.floor(8000 + Math.random() * 4000),
      speed: Math.floor(700 + Math.random() * 300),
      heading: Math.floor(Math.random() * 360),
      status: Math.random() > 0.1 ? 'active' : 'delayed',
      route,
    });
  }
  return flights;
};

const planeIcon = (rotation: number) => L.divIcon({
  className: 'custom-plane-icon',
  html: `
    <div style="transform: rotate(${rotation}deg); width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
      </svg>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function FlightRadar() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([55.7558, 37.6173]);
  const [mapZoom, setMapZoom] = useState(4);
  const [showFlightList, setShowFlightList] = useState(true);

  useEffect(() => {
    const initialFlights = generateFlights();
    setFlights(initialFlights);

    const interval = setInterval(() => {
      setFlights(prevFlights =>
        prevFlights.map(flight => {
          const newHeading = flight.heading + (Math.random() - 0.5) * 5;
          const speed = flight.speed / 111000;
          const radians = (newHeading * Math.PI) / 180;
          const newLat = flight.position[0] + Math.cos(radians) * speed * 0.1;
          const newLng = flight.position[1] + Math.sin(radians) * speed * 0.1;

          return {
            ...flight,
            position: [newLat, newLng],
            heading: newHeading,
            altitude: Math.max(0, flight.altitude + (Math.random() - 0.5) * 100),
            speed: Math.max(400, Math.min(1000, flight.speed + (Math.random() - 0.5) * 20)),
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const filteredFlights = flights.filter(
    flight =>
      flight.callsign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.airline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.departure.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.arrival.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFlightClick = (flight: Flight) => {
    setSelectedFlight(flight);
    setMapCenter(flight.position);
    setMapZoom(8);
  };

  return (
    <div className="relative w-full h-screen bg-slate-950">
      <div className="absolute top-4 left-4 z-[1000] flex gap-2">
        <div className="bg-slate-900/95 backdrop-blur-md border-2 border-cyan-500/30 rounded-xl p-3 shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="Radar" size={24} className="text-cyan-400" />
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
              className="text-xs"
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
                  className="p-3 border-b border-slate-700/50 hover:bg-cyan-500/10 cursor-pointer transition-colors"
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
                    <span>↑ {flight.altitude.toLocaleString()}м</span>
                    <span>→ {flight.speed}км/ч</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {selectedFlight && (
        <Card className="absolute top-4 right-4 z-[1000] bg-slate-900/95 backdrop-blur-md border-2 border-cyan-500/30 w-96 max-h-[calc(100vh-120px)] overflow-auto">
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
          <div className="p-4 space-y-4">
            <div>
              <div className="text-slate-400 text-sm mb-1">Авиакомпания</div>
              <div className="text-white font-semibold">{selectedFlight.airline}</div>
            </div>
            <div>
              <div className="text-slate-400 text-sm mb-1">Воздушное судно</div>
              <div className="text-white font-semibold">{selectedFlight.aircraft}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-slate-400 text-sm mb-1">Вылет</div>
                <div className="text-white font-semibold">{selectedFlight.departure}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">Прилёт</div>
                <div className="text-white font-semibold">{selectedFlight.arrival}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <div className="text-slate-400 text-xs mb-1">Высота</div>
                <div className="text-cyan-400 font-bold text-lg">{selectedFlight.altitude.toLocaleString()}</div>
                <div className="text-slate-500 text-xs">метров</div>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <div className="text-slate-400 text-xs mb-1">Скорость</div>
                <div className="text-cyan-400 font-bold text-lg">{selectedFlight.speed}</div>
                <div className="text-slate-500 text-xs">км/ч</div>
              </div>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg">
              <div className="text-slate-400 text-xs mb-1">Курс</div>
              <div className="text-cyan-400 font-bold text-lg">{Math.round(selectedFlight.heading)}°</div>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg">
              <div className="text-slate-400 text-xs mb-2">Координаты</div>
              <div className="text-white text-sm font-mono">
                {selectedFlight.position[0].toFixed(4)}°N,{' '}
                {selectedFlight.position[1].toFixed(4)}°E
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

      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="w-full h-full"
        zoomControl={false}
        attributionControl={false}
      >
        <MapUpdater center={mapCenter} zoom={mapZoom} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {flights.map((flight) => (
          <div key={flight.id}>
            <Marker
              position={flight.position}
              icon={planeIcon(flight.heading)}
              eventHandlers={{
                click: () => handleFlightClick(flight),
              }}
            >
              <Popup>
                <div className="text-xs">
                  <div className="font-bold text-cyan-600 mb-1">{flight.callsign}</div>
                  <div className="text-slate-700">{flight.airline}</div>
                  <div className="text-slate-600 mt-1">
                    {flight.departure} → {flight.arrival}
                  </div>
                  <div className="text-slate-500 text-xs mt-1">
                    ↑ {flight.altitude.toLocaleString()}м • → {flight.speed}км/ч
                  </div>
                </div>
              </Popup>
            </Marker>
            {selectedFlight?.id === flight.id && (
              <Polyline
                positions={flight.route}
                pathOptions={{ color: '#06b6d4', weight: 2, opacity: 0.6, dashArray: '5, 10' }}
              />
            )}
          </div>
        ))}
      </MapContainer>

      <style>{`
        .leaflet-container {
          background: #0f172a;
        }
        .custom-plane-icon {
          background: transparent;
          border: none;
        }
        .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 8px;
        }
        .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </div>
  );
}
