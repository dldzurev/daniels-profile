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
      className="relative w-14 h-7 flex items-center rounded-full p-1 cursor-pointer bg-gray-200 dark:bg-gray-700"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="absolute left-1.5 flex items-center justify-center">
        <Sun className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-700"}`} />
      </div>
      <div className="absolute right-1.5 flex items-center justify-center">
        <Moon className={`h-4 w-4 ${isDark ? "text-gray-300" : "text-gray-400"}`} />
      </div>
      <div
        className={`absolute bg-white dark:bg-gray-300 w-5 h-5 rounded-full shadow-md transition-transform duration-300 ${
          isDark ? "transform translate-x-7" : ""
        }`}
      />
    </button>
  )
}
