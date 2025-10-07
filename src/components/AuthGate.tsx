import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const AUTH_URL = 'https://functions.poehali.dev/55f4a97b-07ea-4b41-a680-f562b859f148';

interface User {
  user_id: number;
  email: string;
  energy_balance: number;
  is_new?: boolean;
}

export default function AuthGate({ children, onUserChange }: { children: React.ReactNode; onUserChange?: (user: User | null) => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [energyExpiry, setEnergyExpiry] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
      onUserChange?.(userData);
      
      const expiry = localStorage.getItem('energy_expiry');
      if (expiry) {
        setEnergyExpiry(new Date(expiry));
      }
    } else {
      setShowAuthModal(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!energyExpiry || !user) return;

    const checkExpiry = () => {
      const now = new Date();
      if (now >= energyExpiry) {
        const updatedUser = { ...user, energy_balance: 0 };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        localStorage.removeItem('energy_expiry');
        setEnergyExpiry(null);
        toast({ title: "Энергия истекла", description: "Ваша энергия сгорела через 30 минут", variant: "destructive" });
      }
    };

    const interval = setInterval(checkExpiry, 1000);
    return () => clearInterval(interval);
  }, [energyExpiry, user]);

  const handleAuth = async () => {
    if (!email || !name) {
      toast({ title: "Ошибка", description: "Введите email и имя", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, birth_date: birthDate })
      });

      const data = await response.json();
      
      if (response.ok) {
        setUser(data);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(data));
        onUserChange?.(data);
        setShowAuthModal(false);
        
        toast({
          title: data.is_new ? "Добро пожаловать!" : "С возвращением!",
          description: `У вас ${data.energy_balance} энергии`
        });
      } else {
        toast({ title: "Ошибка", description: data.error, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось войти", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const claimDailyEnergy = async () => {
    if (!user) return;

    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'claim_daily', user_id: user.user_id })
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        const updatedUser = { ...user, energy_balance: data.energy_balance };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        onUserChange?.(updatedUser);
        
        const expiryDate = new Date(Date.now() + 30 * 60 * 1000);
        setEnergyExpiry(expiryDate);
        localStorage.setItem('energy_expiry', expiryDate.toISOString());
        
        toast({
          title: data.is_birthday ? "🎉 С Днём Рождения!" : "Энергия получена!",
          description: `+${data.energy_added} энергии. Истечёт через 30 минут.`
        });
      } else {
        toast({ title: "Не удалось", description: data.error || "Уже получено сегодня", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось получить энергию", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-got-black via-got-iron to-got-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-got-gold border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Dialog open={showAuthModal} onOpenChange={() => {}}>
        <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-500/50 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Вход в Странник
            </DialogTitle>
            <DialogDescription className="text-purple-200/80 text-center">
              Зарегистрируйтесь, чтобы получить доступ ко всем функциям
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div>
              <label className="text-white font-medium block mb-2">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900/60 border-cyan-500/20 text-white"
              />
            </div>

            <div>
              <label className="text-white font-medium block mb-2">Имя</label>
              <Input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-900/60 border-cyan-500/20 text-white"
              />
            </div>

            <div>
              <label className="text-white font-medium block mb-2">Дата рождения (необязательно)</label>
              <Input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="bg-slate-900/60 border-cyan-500/20 text-white"
              />
              <p className="text-purple-300/60 text-xs mt-1">В день рождения получите 150 энергии вместо 50</p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <p className="text-blue-300 text-sm">
                ⚡ При регистрации вы получите 50 энергии для использования сайта
              </p>
            </div>
          </div>

          <Button
            onClick={handleAuth}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
          >
            {isLoading ? "Загрузка..." : "Войти"}
          </Button>
        </DialogContent>
      </Dialog>

      {isAuthenticated && (
        <>
          <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
            <div className="bg-slate-900/95 border-2 border-cyan-500/30 rounded-xl p-3 backdrop-blur-md flex items-center gap-3">
              <Icon name="Zap" size={20} className="text-yellow-400" />
              <div>
                <div className="text-white font-bold">{user?.energy_balance || 0}</div>
                <div className="text-cyan-300/70 text-xs">Энергия</div>
              </div>
              <Button
                onClick={claimDailyEnergy}
                size="sm"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0"
              >
                <Icon name="Gift" size={14} className="mr-1" />
                Получить
              </Button>
            </div>
          </div>
          {children}
        </>
      )}
    </>
  );
}
