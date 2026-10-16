"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion"
import { ArrowDownRight, Command, FileText, Search, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

const sections = [
  { id: "experience", label: "Experience", number: "01" },
  { id: "projects", label: "Projects", number: "02" },
  { id: "skills", label: "Skills", number: "03" },
  { id: "education", label: "Education", number: "04" },
  { id: "about", label: "About", number: "05" },
  { id: "contact", label: "Contact", number: "06" },
]

function CursorFollower() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const smoothX = useSpring(x, { stiffness: 520, damping: 38, mass: 0.22 })
  const smoothY = useSpring(y, { stiffness: 520, damping: 38, mass: 0.22 })
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
      const target = event.target as HTMLElement | null
      setActive(Boolean(target?.closest("a, button, input, textarea, [role='tab'], [data-cursor]")))
    }
    const leave = () => setVisible(false)

    window.addEventListener("pointermove", move, { passive: true })
    document.documentElement.addEventListener("pointerleave", leave)
    return () => {
      window.removeEventListener("pointermove", move)
      document.documentElement.removeEventListener("pointerleave", leave)
    }
  }, [x, y])

  return (
    <motion.div
      className="cursor-shell"
      style={{ x: smoothX, y: smoothY, opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div className="cursor-orbit" data-active={active}>
        <span className="cursor-bracket cursor-bracket-tl" />
        <span className="cursor-bracket cursor-bracket-tr" />
        <span className="cursor-bracket cursor-bracket-br" />
        <span className="cursor-bracket cursor-bracket-bl" />
        <span className="cursor-satellite" />
      </div>
      <div className="cursor-dot" />
    </motion.div>
  )
}

export default function SiteChrome() {
  const [activeSection, setActiveSection] = useState("experience")
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (!element) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: "-36% 0px -56%", threshold: 0 },
      )
      observer.observe(element)
      observers.push(observer)
    })

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0)
    }
    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setPaletteOpen((current) => !current)
      } else if (event.key === "/" && !isTyping) {
        event.preventDefault()
        setPaletteOpen(true)
      } else if (event.key === "Escape") {
        setPaletteOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      observers.forEach((observer) => observer.disconnect())
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = paletteOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [paletteOpen])

  const navigateTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" })
    else window.location.href = `/#${id}`
    setPaletteOpen(false)
  }

  return (
    <>
      <CursorFollower />

      <div className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-border/40" aria-hidden="true">
        <motion.div className="h-full origin-left bg-primary" style={{ scaleX: Math.min(progress, 1) }} />
      </div>

      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-3 sm:top-5 sm:px-5">
        <div className="pointer-events-auto mx-auto flex h-14 max-w-6xl items-center gap-2 rounded-2xl border border-border/85 bg-background/80 px-2.5 shadow-[0_10px_40px_hsl(40_10%_10%/0.08)] backdrop-blur-2xl dark:shadow-[0_12px_50px_hsl(0_0%_0%/0.32)]">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex h-9 items-center gap-2 rounded-xl px-2.5 text-sm font-semibold transition-colors hover:bg-muted"
            aria-label="Back to top"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground text-[10px] font-bold text-background transition-transform group-hover:rotate-3">
              DD
            </span>
            <span className="hidden sm:inline">Daniel</span>
          </button>

          <div className="mx-1 hidden h-5 w-px bg-border lg:block" />

          <nav className="hidden min-w-0 flex-1 items-center gap-0.5 lg:flex" aria-label="Portfolio sections">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => navigateTo(id)}
                className={`relative rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                  activeSection === id ? "text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {label}
                {activeSection === id && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="flex h-9 items-center gap-2 rounded-xl border border-border bg-card/75 px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Open quick navigation"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Navigate</span>
              <span className="hidden items-center gap-0.5 rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[9px] md:flex">
                <Command className="h-2.5 w-2.5" />K
              </span>
            </button>
            <a
              href="/Daniel_Dzurevych_Resume.pdf"
              download="Daniel_Dzurevych_Resume.pdf"
              className="hidden h-9 items-center gap-2 rounded-xl border border-border bg-card/75 px-3 text-xs font-medium transition-colors hover:bg-muted sm:flex"
            >
              <FileText className="h-3.5 w-3.5" />
              Resume
            </a>
            <ModeToggle />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-start justify-center bg-foreground/20 px-4 pt-[12vh] backdrop-blur-md dark:bg-black/45"
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setPaletteOpen(false)
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              role="dialog"
              aria-modal="true"
              aria-label="Quick navigation"
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-popover shadow-[0_30px_100px_hsl(40_10%_10%/0.22)]"
            >
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 text-sm text-muted-foreground">Jump to a page…</div>
                <button
                  type="button"
                  onClick={() => setPaletteOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-muted"
                  aria-label="Close navigation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-2">
                <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Pages
                </p>
                {sections.map(({ id, label, number }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => navigateTo(id)}
                    className="group flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card font-mono text-[10px] text-muted-foreground">
                      {number}
                    </span>
                    <span className="flex-1 text-sm font-medium">{label}</span>
                    <ArrowDownRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  </button>
                ))}
              </div>
              <div className="border-t border-border bg-muted/45 px-4 py-3 text-xs text-muted-foreground">
                Press <span className="font-mono text-foreground">Esc</span> to close · <span className="font-mono text-foreground">/</span> to open
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
