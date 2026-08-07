"use client"

import { useEffect, useState } from "react"

export default function CircuitScroll() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0)
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed bottom-10 right-5 top-24 z-40 hidden w-7 md:block" aria-hidden="true">
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border/50" />
      <div
        className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-primary transition-[height] duration-150"
        style={{ height: `${Math.min(progress, 1) * 100}%` }}
      />

      {[0, 0.2, 0.4, 0.6, 0.8, 1].map((stop) => {
        const active = progress >= stop

        return (
          <div
            key={stop}
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 border bg-background transition-colors duration-300"
            style={{
              top: `${stop * 100}%`,
              borderColor: active ? "hsl(var(--primary))" : "hsl(var(--border))",
              boxShadow: active ? "0 0 0 5px hsl(var(--primary) / 0.08)" : "none",
            }}
          />
        )
      })}
    </div>
  )
}
