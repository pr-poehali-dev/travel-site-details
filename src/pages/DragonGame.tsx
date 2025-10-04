import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import confetti from 'canvas-confetti'

interface Dragon {
  id: number
  x: number
  y: number
  size: number
}

export default function DragonGame() {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isGameActive, setIsGameActive] = useState(false)
  const [dragons, setDragons] = useState<Dragon[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('dragon_game_high_score')
    if (saved) setHighScore(parseInt(saved, 10))
  }, [])

  useEffect(() => {
    if (timeLeft === 0 && isGameActive) {
      setIsGameActive(false)
      setGameOver(true)
      if (score > highScore) {
        setHighScore(score)
        localStorage.setItem('dragon_game_high_score', score.toString())
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#C9A86A', '#FF6B35', '#4A4A4A']
        })
      }
    }
  }, [timeLeft, isGameActive, score, highScore])

  useEffect(() => {
    if (!isGameActive) return

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isGameActive])

  useEffect(() => {
    if (!isGameActive) return

    const interval = setInterval(() => {
      const newDragon: Dragon = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 10,
        size: Math.random() * 40 + 60
      }
      setDragons(prev => [...prev, newDragon])

      setTimeout(() => {
        setDragons(prev => prev.filter(d => d.id !== newDragon.id))
      }, 2000)
    }, 800)

    return () => clearInterval(interval)
  }, [isGameActive])

  const handleDragonClick = (id: number) => {
    setDragons(prev => prev.filter(d => d.id !== id))
    setScore(prev => prev + 10)
  }

  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setDragons([])
    setIsGameActive(true)
    setGameOver(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-got-black via-gray-900 to-got-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMDEsMTY4LDEwNiwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

      <Link 
        to="/" 
        className="absolute top-8 left-8 inline-flex items-center gap-3 px-6 py-3 bg-got-black/80 border-2 border-got-gold/50 text-got-gold rounded-lg hover:border-got-fire transition-all duration-300 group backdrop-blur-md z-50"
      >
        <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-cinzel">Назад</span>
      </Link>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-cinzel font-bold mb-4 text-got-gold">
            Охота на Драконов
          </h1>
          <p className="text-xl text-got-gold/70">Нажимайте на драконов, пока не закончилось время!</p>
        </div>

        <div className="flex justify-center gap-8 mb-8">
          <div className="bg-got-black/60 border-2 border-got-gold/30 rounded-lg px-8 py-4 backdrop-blur-md">
            <div className="text-sm text-got-gold/70 mb-1">Очки</div>
            <div className="text-4xl font-bold text-got-fire">{score}</div>
          </div>
          <div className="bg-got-black/60 border-2 border-got-gold/30 rounded-lg px-8 py-4 backdrop-blur-md">
            <div className="text-sm text-got-gold/70 mb-1">Время</div>
            <div className="text-4xl font-bold text-got-ice">{timeLeft}с</div>
          </div>
          <div className="bg-got-black/60 border-2 border-got-gold/30 rounded-lg px-8 py-4 backdrop-blur-md">
            <div className="text-sm text-got-gold/70 mb-1">Рекорд</div>
            <div className="text-4xl font-bold text-got-gold">{highScore}</div>
          </div>
        </div>

        {!isGameActive && !gameOver && (
          <div className="text-center">
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-got-fire to-orange-600 hover:from-got-fire/90 hover:to-orange-700 text-white border-2 border-got-gold/50 h-16 px-12 text-xl font-cinzel"
            >
              <Icon name="Flame" size={24} className="mr-3" />
              Начать охоту
            </Button>
          </div>
        )}

        {gameOver && (
          <div className="text-center">
            <div className="bg-got-black/80 border-4 border-got-gold rounded-2xl p-12 max-w-md mx-auto backdrop-blur-md">
              <h2 className="text-4xl font-cinzel font-bold text-got-gold mb-4">
                Игра окончена!
              </h2>
              <p className="text-2xl text-got-gold/80 mb-6">
                Ваш счёт: <span className="text-got-fire font-bold">{score}</span>
              </p>
              {score === highScore && score > 0 && (
                <p className="text-xl text-got-fire mb-6">🏆 Новый рекорд!</p>
              )}
              <Button
                onClick={startGame}
                className="bg-gradient-to-r from-got-fire to-orange-600 hover:from-got-fire/90 hover:to-orange-700 text-white border-2 border-got-gold/50 h-14 px-10 text-lg font-cinzel"
              >
                Играть снова
              </Button>
            </div>
          </div>
        )}

        {isGameActive && (
          <div className="relative w-full h-[500px] bg-got-black/40 border-4 border-got-gold/30 rounded-2xl overflow-hidden backdrop-blur-sm">
            {dragons.map(dragon => (
              <button
                key={dragon.id}
                onClick={() => handleDragonClick(dragon.id)}
                className="absolute transition-all duration-200 hover:scale-110 cursor-pointer"
                style={{
                  left: `${dragon.x}%`,
                  top: `${dragon.y}%`,
                  fontSize: `${dragon.size}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                🐉
              </button>
            ))}
            {dragons.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-got-gold/30 text-2xl font-cinzel">
                Ждите драконов...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
