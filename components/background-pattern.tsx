"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function BackgroundPattern() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke={isDark ? "white" : "black"}
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="url(#smallGrid)" />
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke={isDark ? "white" : "black"}
                strokeWidth="1"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-background via-background/90 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-background via-background/90 to-transparent"></div>

      {/* Dark mode specific overlay to add some texture */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-gray-800/30 mix-blend-overlay"></div>
      )}

      {/* Light particles for dark mode */}
      {isDark && (
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${Math.random() * 5 + 1}px`,
                height: `${Math.random() * 5 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                opacity: Math.random() * 0.5,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
