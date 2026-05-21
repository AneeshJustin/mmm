export function DamaskPattern({ opacity = 0.12 }: { opacity?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="damask-scroll"
          x="0"
          y="0"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M60 10 C45 25 25 35 25 55 C25 75 45 85 60 100 C75 85 95 75 95 55 C95 35 75 25 60 10Z"
            fill="currentColor"
            opacity="0.35"
          />
          <circle cx="60" cy="55" r="8" fill="currentColor" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#damask-scroll)" />
    </svg>
  )
}

export function FloralPaperPattern({ opacity = 0.15 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        backgroundImage: `radial-gradient(circle at 20% 30%, rgba(190,120,140,0.25) 0%, transparent 45%),
          radial-gradient(circle at 80% 70%, rgba(160,100,130,0.2) 0%, transparent 40%),
          radial-gradient(circle at 50% 50%, rgba(220,180,200,0.15) 0%, transparent 55%)`,
      }}
    />
  )
}
