"use client"

import { useEffect, useRef } from "react"

type Point = { x: number; y: number }

type Trace = {
  points: Point[]
  length: number
  offset: number
  speed: number
  warm: boolean
}

const GRID = 72

function seededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

function traceLength(points: Point[]) {
  return points.slice(1).reduce((total, point, index) => {
    const previous = points[index]
    return total + Math.abs(point.x - previous.x) + Math.abs(point.y - previous.y)
  }, 0)
}

function pointOnTrace(trace: Trace, distance: number) {
  let remaining = ((distance % trace.length) + trace.length) % trace.length

  for (let index = 1; index < trace.points.length; index += 1) {
    const start = trace.points[index - 1]
    const end = trace.points[index]
    const segmentLength = Math.abs(end.x - start.x) + Math.abs(end.y - start.y)

    if (remaining <= segmentLength) {
      const progress = segmentLength === 0 ? 0 : remaining / segmentLength
      return {
        x: start.x + (end.x - start.x) * progress,
        y: start.y + (end.y - start.y) * progress,
      }
    }

    remaining -= segmentLength
  }

  return trace.points[trace.points.length - 1]
}

function createTraces(width: number, height: number) {
  const random = seededRandom(Math.round(width + height) * 19)
  const traces: Trace[] = []
  const count = Math.max(18, Math.ceil((width * height) / 62000))

  for (let index = 0; index < count; index += 1) {
    const horizontal = index % 3 !== 0
    const startX = Math.floor(random() * (width / GRID + 2)) * GRID - GRID
    const startY = Math.floor(random() * (height / GRID + 2)) * GRID - GRID
    const direction = random() > 0.5 ? 1 : -1
    const reach = GRID * (2 + Math.floor(random() * 4))
    const bend = GRID * (1 + Math.floor(random() * 2)) * (random() > 0.5 ? 1 : -1)
    const tail = GRID * (1 + Math.floor(random() * 3)) * direction
    const points = horizontal
      ? [
          { x: startX, y: startY },
          { x: startX + reach * direction, y: startY },
          { x: startX + reach * direction, y: startY + bend },
          { x: startX + reach * direction + tail, y: startY + bend },
        ]
      : [
          { x: startX, y: startY },
          { x: startX, y: startY + reach * direction },
          { x: startX + bend, y: startY + reach * direction },
          { x: startX + bend, y: startY + reach * direction + tail },
        ]

    traces.push({
      points,
      length: traceLength(points),
      offset: random() * 900,
      speed: 22 + random() * 32,
      warm: index % 5 === 0,
    })
  }

  return traces
}

function drawTrace(context: CanvasRenderingContext2D, trace: Trace, yShift: number) {
  context.beginPath()
  trace.points.forEach((point, index) => {
    const y = point.y + yShift
    if (index === 0) context.moveTo(point.x, y)
    else context.lineTo(point.x, y)
  })
  context.stroke()
}

export default function BackgroundPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.45 }
    const easedPointer = { ...pointer }
    let pointerVisible = false
    let width = 0
    let height = 0
    let traces: Trace[] = []
    let scrollY = window.scrollY
    let animationFrame = 0
    let isDark = document.documentElement.classList.contains("dark")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      traces = createTraces(width, height + GRID * 2)
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointerVisible = true
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`)
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`)
    }

    const handlePointerLeave = () => {
      pointerVisible = false
    }

    const handleScroll = () => {
      scrollY = window.scrollY
    }

    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark")
    })

    const draw = (time: number) => {
      easedPointer.x += (pointer.x - easedPointer.x) * 0.12
      easedPointer.y += (pointer.y - easedPointer.y) * 0.12
      context.clearRect(0, 0, width, height)

      const yShift = -((scrollY * 0.035) % GRID)
      const baseColor = isDark ? "rgba(167, 215, 198, 0.13)" : "rgba(24, 79, 66, 0.13)"
      const nodeColor = isDark ? "rgba(218, 187, 133, 0.28)" : "rgba(132, 83, 40, 0.24)"
      const signalGreen = isDark ? "rgba(176, 238, 214, 0.94)" : "rgba(27, 111, 91, 0.86)"
      const signalWarm = isDark ? "rgba(238, 196, 128, 0.9)" : "rgba(157, 93, 39, 0.8)"

      context.lineCap = "square"
      context.lineJoin = "miter"
      context.lineWidth = 1
      context.strokeStyle = baseColor
      traces.forEach((trace) => drawTrace(context, trace, yShift))

      context.fillStyle = nodeColor
      traces.forEach((trace) => {
        trace.points.slice(1, -1).forEach((point) => {
          context.fillRect(point.x - 2, point.y + yShift - 2, 4, 4)
        })
      })

      if (pointerVisible) {
        const glow = context.createRadialGradient(
          easedPointer.x,
          easedPointer.y,
          12,
          easedPointer.x,
          easedPointer.y,
          260,
        )
        glow.addColorStop(0, isDark ? "rgba(176, 238, 214, 0.88)" : "rgba(18, 104, 82, 0.72)")
        glow.addColorStop(0.45, isDark ? "rgba(176, 238, 214, 0.3)" : "rgba(18, 104, 82, 0.25)")
        glow.addColorStop(1, "rgba(18, 104, 82, 0)")
        context.save()
        context.globalCompositeOperation = "lighter"
        context.lineWidth = 1.8
        context.strokeStyle = glow
        traces.forEach((trace) => drawTrace(context, trace, yShift))
        context.restore()
      }

      traces.forEach((trace) => {
        const travel = reducedMotion ? trace.offset : time * (trace.speed / 1000) + trace.offset + scrollY * 0.18
        const signal = pointOnTrace(trace, travel)
        const x = signal.x
        const y = signal.y + yShift
        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) return

        context.save()
        context.shadowBlur = pointerVisible ? 13 : 8
        context.shadowColor = trace.warm ? signalWarm : signalGreen
        context.fillStyle = trace.warm ? signalWarm : signalGreen
        context.fillRect(x - 2, y - 2, 4, 4)
        context.restore()
      })

      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    window.addEventListener("resize", resize)
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", handlePointerLeave)
    animationFrame = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      themeObserver.disconnect()
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("pointermove", handlePointerMove)
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden bg-background" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,hsl(var(--card)),transparent_34%),linear-gradient(145deg,hsl(var(--background)),hsl(39_42%_88%))] dark:bg-[radial-gradient(circle_at_18%_8%,hsl(var(--card)),transparent_34%),linear-gradient(145deg,hsl(var(--background)),hsl(196_17%_12%))]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--background)/0.12),hsl(var(--background)/0.34))]" />
    </div>
  )
}
