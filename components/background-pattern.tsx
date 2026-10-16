"use client"

import { useEffect, useRef } from "react"

type Node = {
  x: number
  y: number
  phase: number
  speed: number
  range: number
  size: number
  accent: boolean
}

function seededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

export default function BackgroundPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, visible: false }
    const eased = { x: pointer.x, y: pointer.y }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let width = window.innerWidth
    let height = window.innerHeight
    let nodes: Node[] = []
    let frame = 0
    let isDark = document.documentElement.classList.contains("dark")

    const createNodes = () => {
      const random = seededRandom(Math.round(width * 3.7 + height * 7.1))
      const count = Math.min(74, Math.max(34, Math.round((width * height) / 21000)))
      nodes = Array.from({ length: count }, (_, index) => ({
        x: random() * width,
        y: random() * height,
        phase: random() * Math.PI * 2,
        speed: 0.22 + random() * 0.38,
        range: 5 + random() * 12,
        size: index % 9 === 0 ? 1.8 : 0.8 + random() * 0.7,
        accent: index % 8 === 0,
      }))
    }

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      createNodes()
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.visible = true
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`)
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`)
    }

    const handlePointerLeave = () => {
      pointer.visible = false
    }

    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark")
    })

    const render = (timestamp: number) => {
      const time = reducedMotion ? 0 : timestamp / 1000
      eased.x += (pointer.x - eased.x) * 0.09
      eased.y += (pointer.y - eased.y) * 0.09
      context.clearRect(0, 0, width, height)

      const positions = nodes.map((node) => {
        let x = node.x + Math.sin(time * node.speed + node.phase) * node.range
        let y = node.y + Math.cos(time * node.speed * 0.78 + node.phase) * node.range

        if (pointer.visible) {
          const dx = eased.x - x
          const dy = eased.y - y
          const distance = Math.hypot(dx, dy)
          if (distance < 280) {
            const pull = (1 - distance / 280) * 0.105
            x += dx * pull
            y += dy * pull
          }
        }

        return { x, y, node }
      })

      const baseLine = isDark ? "136, 143, 154" : "115, 119, 126"
      const accentLine = isDark ? "105, 177, 255" : "35, 131, 226"

      for (let index = 0; index < positions.length; index += 1) {
        for (let otherIndex = index + 1; otherIndex < positions.length; otherIndex += 1) {
          const a = positions[index]
          const b = positions[otherIndex]
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (distance > 128) continue

          context.beginPath()
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.lineWidth = 0.65
          context.strokeStyle = `rgba(${baseLine}, ${(1 - distance / 128) * (isDark ? 0.12 : 0.1)})`
          context.stroke()
        }
      }

      if (pointer.visible) {
        const glow = context.createRadialGradient(eased.x, eased.y, 0, eased.x, eased.y, 260)
        glow.addColorStop(0, `rgba(${accentLine}, ${isDark ? 0.12 : 0.1})`)
        glow.addColorStop(0.5, `rgba(${accentLine}, ${isDark ? 0.045 : 0.035})`)
        glow.addColorStop(1, `rgba(${accentLine}, 0)`)
        context.fillStyle = glow
        context.fillRect(eased.x - 260, eased.y - 260, 520, 520)

        positions.forEach(({ x, y }) => {
          const distance = Math.hypot(x - eased.x, y - eased.y)
          if (distance > 235) return
          context.beginPath()
          context.moveTo(eased.x, eased.y)
          context.lineTo(x, y)
          context.lineWidth = 0.8
          context.strokeStyle = `rgba(${accentLine}, ${(1 - distance / 235) * 0.24})`
          context.stroke()
        })
      }

      positions.forEach(({ x, y, node }) => {
        context.beginPath()
        context.arc(x, y, node.size, 0, Math.PI * 2)
        context.fillStyle = node.accent
          ? `rgba(${accentLine}, ${isDark ? 0.55 : 0.48})`
          : `rgba(${baseLine}, ${isDark ? 0.34 : 0.28})`
        context.fill()

        if (node.accent) {
          context.beginPath()
          context.arc(x, y, node.size + 4.5, 0, Math.PI * 2)
          context.strokeStyle = `rgba(${accentLine}, ${isDark ? 0.11 : 0.09})`
          context.lineWidth = 1
          context.stroke()
        }
      })

      if (!reducedMotion) frame = window.requestAnimationFrame(render)
    }

    resize()
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", handlePointerLeave)
    frame = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frame)
      themeObserver.disconnect()
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", handlePointerMove)
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden bg-background" aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.3] dark:opacity-[0.1] [background-image:radial-gradient(hsl(var(--foreground)/0.2)_0.55px,transparent_0.55px)] [background-size:20px_20px]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-90" />
      <div className="absolute -left-48 -top-48 h-[34rem] w-[34rem] rounded-full bg-primary/[0.04] blur-[120px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--background)/0.08),hsl(var(--background)/0.48)_42%,hsl(var(--background)/0.78))]" />
    </div>
  )
}
