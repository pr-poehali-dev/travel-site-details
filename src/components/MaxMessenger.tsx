import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const MaxMessenger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Messenger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-max-pink to-max-purple rounded-full shadow-2xl shadow-max-pink/50 flex items-center justify-center hover:scale-110 transition-all duration-300 border-4 border-white/20"
      >
        <Icon name={isOpen ? "X" : "MessageCircle"} size={28} className="text-white" />
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xs font-bold">1</span>
          </div>
        )}
      </button>

      {/* Messenger Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-black/95 backdrop-blur-xl border-2 border-max-pink/50 rounded-2xl shadow-2xl shadow-max-pink/30 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-max-pink to-max-purple p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Tv" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">MAX Поддержка</h3>
                <p className="text-white/80 text-xs">Обычно отвечает мгновенно</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <Icon name="Minimize2" size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {/* Bot Message */}
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-max-pink to-max-purple rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Bot" size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-max-purple/20 border border-max-purple/30 rounded-2xl rounded-tl-none p-3">
                  <p className="text-white text-sm">
                    👋 Привет! Добро пожаловать в MAX × СТРАННИК!
                  </p>
                </div>
                <p className="text-max-pink/50 text-xs mt-1">Только что</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-max-pink to-max-purple rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Bot" size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-max-purple/20 border border-max-purple/30 rounded-2xl rounded-tl-none p-3">
                  <p className="text-white text-sm">
                    У нас для вас специальное событие — подписка на премиум всего за <span className="text-yellow-400 font-bold">⚡ 100 энергии</span> на 7 дней!
                  </p>
                </div>
                <p className="text-max-pink/50 text-xs mt-1">Только что</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-max-pink to-max-purple rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Bot" size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-max-purple/20 border border-max-purple/30 rounded-2xl rounded-tl-none p-3">
                  <p className="text-white text-sm mb-3">
                    Что вас интересует?
                  </p>
                  <div className="space-y-2">
                    <a
                      href="/news"
                      className="block bg-max-pink/10 hover:bg-max-pink/20 border border-max-pink/30 rounded-lg p-2 text-max-pink text-sm font-medium transition-colors"
                    >
                      📰 Новости РБК
                    </a>
                    <a
                      href="/radar"
                      className="block bg-max-pink/10 hover:bg-max-pink/20 border border-max-pink/30 rounded-lg p-2 text-max-pink text-sm font-medium transition-colors"
                    >
                      ✈️ Радар самолётов
                    </a>
                    <a
                      href="/hotels"
                      className="block bg-max-pink/10 hover:bg-max-pink/20 border border-max-pink/30 rounded-lg p-2 text-max-pink text-sm font-medium transition-colors"
                    >
                      🏨 Отели
                    </a>
                    <a
                      href="https://max.ru/join/XXufWuRT_4_-U687UWq2zVs905JbNy7FjvfipRLO9ao"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gradient-to-r from-max-pink to-max-purple hover:from-max-purple hover:to-max-pink border border-max-pink/30 rounded-lg p-2 text-white text-sm font-bold transition-all shadow-lg"
                    >
                      📺 Канал MAX
                    </a>
                  </div>
                </div>
                <p className="text-max-pink/50 text-xs mt-1">Только что</p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-max-pink/20 bg-black/40">
            <div className="flex gap-2 items-center bg-white/5 border border-max-pink/30 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Напишите сообщение..."
                className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-sm"
                disabled
              />
              <button className="text-max-pink/50 cursor-not-allowed">
                <Icon name="Send" size={20} />
              </button>
            </div>
            <p className="text-white/40 text-xs text-center mt-2">
              Чат в режиме демонстрации
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MaxMessenger;
