"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-8 w-14 cursor-pointer items-center border border-border/80 bg-background/80 p-1 backdrop-blur-sm"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="absolute left-1.5 flex items-center justify-center">
        <Sun className={`h-4 w-4 ${isDark ? "text-muted-foreground" : "text-primary"}`} />
      </div>
      <div className="absolute right-1.5 flex items-center justify-center">
        <Moon className={`h-4 w-4 ${isDark ? "text-primary" : "text-muted-foreground"}`} />
      </div>
      <div
        className={`absolute h-5 w-5 border border-primary/40 bg-card shadow-sm transition-transform duration-300 ${
          isDark ? "transform translate-x-7" : ""
        }`}
      />
    </button>
  )
}
