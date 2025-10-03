interface MapSVGProps {
  animationStarted: boolean
}

export default function MapSVG({ animationStarted }: MapSVGProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
        <svg
          viewBox="0 0 125 75"
          className="w-full h-auto max-h-[700px] transition-all duration-1000 ease-out"
          style={{ 
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
            transform: animationStarted ? 'scale(1)' : 'scale(0.8)',
            opacity: animationStarted ? 1 : 0
          }}
        >
          <defs>
            <linearGradient id="worldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <radialGradient id="glowEffect" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <rect x="0" y="0" width="125" height="75" fill="url(#worldGrad)" rx="8" />
          
          <g opacity="0.1">
            {[...Array(25)].map((_, i) => (
              <line key={`v${i}`} x1={i * 5} y1="0" x2={i * 5} y2="75" stroke="#3b82f6" strokeWidth="0.2" />
            ))}
            {[...Array(15)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 5} x2="125" y2={i * 5} stroke="#3b82f6" strokeWidth="0.2" />
            ))}
          </g>

          <g opacity="0.3" className="animate-pulse">
            <path d="M5 8 L30 8 L32 15 L30 30 L25 32 L8 30 L5 20 Z" 
                  fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2,2">
              <animate attributeName="stroke-dashoffset" values="0;4;0" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M55 10 L95 10 L95 20 L90 35 L85 40 L70 38 L60 32 L55 25 Z" 
                  fill="none" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2,2">
              <animate attributeName="stroke-dashoffset" values="0;4;0" dur="4s" repeatCount="indefinite" />
            </path>
          </g>

          <g transform="translate(5, 65)">
            <rect x="0" y="0" width="40" height="12" fill="rgba(0,0,0,0.8)" rx="6" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <circle cx="4" cy="6" r="2" fill="#3b82f6" />
            <text x="8" y="7" className="text-xs fill-white font-medium">Страны для путешествий</text>
            <circle cx="4" cy="9" r="1.5" fill="#fbbf24" />
            <text x="8" y="10" className="text-xs fill-white">ТОП направления</text>
          </g>
        </svg>
      </div>
    </div>
  )
}
