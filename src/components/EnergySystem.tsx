import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ENERGY_KEY = 'user_energy';
const LAST_LOGIN_KEY = 'last_login_date';
const DAILY_ENERGY = 50;

export const EnergySystem = () => {
  const [energy, setEnergy] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    checkAndAddDailyEnergy();
    loadEnergy();
  }, []);

  const loadEnergy = () => {
    const stored = localStorage.getItem(ENERGY_KEY);
    setEnergy(stored ? parseInt(stored) : 0);
  };

  const checkAndAddDailyEnergy = () => {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem(LAST_LOGIN_KEY);

    if (lastLogin !== today) {
      const currentEnergy = parseInt(localStorage.getItem(ENERGY_KEY) || '0');
      const newEnergy = currentEnergy + DAILY_ENERGY;
      
      localStorage.setItem(ENERGY_KEY, newEnergy.toString());
      localStorage.setItem(LAST_LOGIN_KEY, today);
      
      setEnergy(newEnergy);
      
      toast({
        title: "⚡ Ежедневная энергия получена!",
        description: `+${DAILY_ENERGY} энергии за вход в систему`,
      });
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-gradient-to-r from-max-purple/90 to-max-pink/90 backdrop-blur-md px-4 py-2 rounded-full border-2 border-max-pink/50 shadow-lg shadow-max-pink/50">
      <Icon name="Zap" size={20} className="text-yellow-400" />
      <span className="text-white font-bold text-lg">{energy}</span>
      <span className="text-white/80 text-sm">энергии</span>
    </div>
  );
};

export const useEnergy = () => {
  const [energy, setEnergy] = useState(0);

  useEffect(() => {
    loadEnergy();
  }, []);

  const loadEnergy = () => {
    const stored = localStorage.getItem(ENERGY_KEY);
    if (!stored) {
      localStorage.setItem(ENERGY_KEY, '100');
      setEnergy(100);
    } else {
      setEnergy(parseInt(stored));
    }
  };

  const spendEnergy = (amount: number): boolean => {
    const currentEnergy = parseInt(localStorage.getItem(ENERGY_KEY) || '0');
    if (currentEnergy >= amount) {
      const newEnergy = currentEnergy - amount;
      localStorage.setItem(ENERGY_KEY, newEnergy.toString());
      setEnergy(newEnergy);
      return true;
    }
    return false;
  };

  const addEnergy = (amount: number) => {
    const currentEnergy = parseInt(localStorage.getItem(ENERGY_KEY) || '0');
    const newEnergy = currentEnergy + amount;
    localStorage.setItem(ENERGY_KEY, newEnergy.toString());
    setEnergy(newEnergy);
  };

  return { energy, spendEnergy, addEnergy, loadEnergy };
};

export default EnergySystem;