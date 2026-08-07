"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, BriefcaseBusiness, Cpu, FolderKanban, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

type HeroAction = "contact" | "projects" | "experience"

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/daniel-dzurevych-bbb448274",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/dldzurev",
    icon: Github,
  },
  {
    label: "Email",
    href: "mailto:dldzurev@uwaterloo.ca",
    icon: Mail,
  },
]

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const [activeAction, setActiveAction] = useState<HeroAction | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative flex min-h-[86svh] items-center overflow-hidden px-4 pb-16 pt-28 sm:pb-20">
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="relative"
          >
            <div className="circuit-kicker flex items-center gap-3">
              <span className="h-2 w-2 border border-primary bg-background shadow-[0_0_0_5px_hsl(var(--primary)/0.08)]" />
              Computer engineer focused on making a difference
            </div>

            <h1 className="mb-8 max-w-4xl">
              <span className="block text-5xl font-medium leading-none text-foreground sm:text-6xl md:text-7xl">
                Daniel Luke
              </span>
              <span className="script-heading mt-2 block text-6xl text-primary sm:text-7xl md:text-8xl">
                Dzurevych
              </span>
            </h1>

            <div className="mb-9 max-w-2xl border-l border-primary/45 pl-5">
              <p className="text-xl font-medium leading-relaxed text-foreground md:text-2xl">
                Passionate about building real solutions to real problems.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="circuit-icon flex h-11 w-11 items-center justify-center"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
              <span className="ml-2 hidden h-px w-20 bg-primary/30 sm:block" aria-hidden="true" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative flex min-h-[390px] items-center justify-center sm:min-h-[440px] lg:min-h-[520px]"
          >
            <svg className="absolute inset-0 h-full w-full overflow-visible text-primary/42" viewBox="0 0 520 520" aria-hidden="true">
              <path
                d="M 0 88 H 116 V 164 H 174"
                fill="none"
                stroke={activeAction === "contact" ? "hsl(var(--accent))" : "currentColor"}
                strokeWidth={activeAction === "contact" ? "2.8" : "1.4"}
                style={{ filter: activeAction === "contact" ? "drop-shadow(0 0 6px hsl(var(--accent) / 0.75))" : "none", transition: "all 220ms ease" }}
              />
              <path
                d="M 520 126 H 402 V 190 H 346"
                fill="none"
                stroke={activeAction === "experience" ? "hsl(var(--accent))" : "currentColor"}
                strokeWidth={activeAction === "experience" ? "2.8" : "1.4"}
                style={{ filter: activeAction === "experience" ? "drop-shadow(0 0 6px hsl(var(--accent) / 0.75))" : "none", transition: "all 220ms ease" }}
              />
              <path
                d="M 0 404 H 120 V 340 H 174"
                fill="none"
                stroke={activeAction === "projects" ? "hsl(var(--accent))" : "currentColor"}
                strokeWidth={activeAction === "projects" ? "2.8" : "1.4"}
                style={{ filter: activeAction === "projects" ? "drop-shadow(0 0 6px hsl(var(--accent) / 0.75))" : "none", transition: "all 220ms ease" }}
              />
              <path d="M 520 430 H 408 V 354 H 346" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path
                d="M 90 0 V 78 H 174 V 124"
                fill="none"
                stroke={activeAction === "contact" ? "hsl(var(--accent))" : "currentColor"}
                strokeWidth={activeAction === "contact" ? "2.8" : "1.4"}
                style={{ filter: activeAction === "contact" ? "drop-shadow(0 0 6px hsl(var(--accent) / 0.75))" : "none", transition: "all 220ms ease" }}
              />
              <path
                d="M 430 0 V 82 H 346 V 124"
                fill="none"
                stroke={activeAction === "experience" ? "hsl(var(--accent))" : "currentColor"}
                strokeWidth={activeAction === "experience" ? "2.8" : "1.4"}
                style={{ filter: activeAction === "experience" ? "drop-shadow(0 0 6px hsl(var(--accent) / 0.75))" : "none", transition: "all 220ms ease" }}
              />
              <path
                d="M 92 520 V 448 H 174 V 396"
                fill="none"
                stroke={activeAction === "projects" ? "hsl(var(--accent))" : "currentColor"}
                strokeWidth={activeAction === "projects" ? "2.8" : "1.4"}
                style={{ filter: activeAction === "projects" ? "drop-shadow(0 0 6px hsl(var(--accent) / 0.75))" : "none", transition: "all 220ms ease" }}
              />
              <path d="M 428 520 V 444 H 346 V 396" fill="none" stroke="currentColor" strokeWidth="1.4" />

              <path
                d="M 0 88 H 116 V 164 H 174"
                fill="none"
                stroke="hsl(var(--accent))"
                strokeDasharray="20 238"
                strokeDashoffset={220 - (scrollY % 258)}
                strokeWidth="3"
              />
              <path
                d="M 520 430 H 408 V 354 H 346"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeDasharray="22 250"
                strokeDashoffset={(scrollY % 272) - 248}
                strokeWidth="3"
              />

              {[
                [116, 88],
                [402, 126],
                [120, 404],
                [408, 430],
                [90, 78],
                [430, 82],
                [92, 448],
                [428, 444],
              ].map(([x, y]) => (
                <rect key={`${x}-${y}`} x={x - 4} y={y - 4} width="8" height="8" fill="hsl(var(--background))" stroke="currentColor" />
              ))}
            </svg>

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-64 w-64 items-center justify-center border border-primary/45 bg-card/55 shadow-[0_28px_90px_hsl(var(--primary)/0.12)] backdrop-blur-sm sm:h-72 sm:w-72"
            >
              <div className="absolute inset-3 border border-primary/20" />
              <div className="absolute inset-7 border border-dashed border-primary/25" />
              <div className="absolute -left-2 top-12 h-8 w-4 border-y border-primary/50 bg-background" />
              <div className="absolute -right-2 bottom-12 h-8 w-4 border-y border-primary/50 bg-background" />
              <div className="absolute left-12 -top-2 h-4 w-8 border-x border-primary/50 bg-background" />
              <div className="absolute bottom-[-8px] right-12 h-4 w-8 border-x border-primary/50 bg-background" />
              <div className="relative flex h-20 w-20 items-center justify-center border border-primary/35 bg-background/65 sm:h-24 sm:w-24">
                <Cpu className="h-9 w-9 text-primary sm:h-11 sm:w-11" strokeWidth={1.35} />
              </div>

              <button
                type="button"
                data-hero-action="contact"
                className={`absolute left-4 top-4 flex min-h-12 w-[104px] items-center justify-center gap-2 border bg-background/80 px-2 text-[10px] font-semibold uppercase leading-tight text-foreground backdrop-blur-sm transition-all duration-200 sm:left-5 sm:top-5 ${activeAction === "contact" ? "border-accent text-primary shadow-[0_0_22px_hsl(var(--accent)/0.35)]" : "border-primary/30 hover:border-accent"}`}
                onMouseEnter={() => setActiveAction("contact")}
                onMouseLeave={() => setActiveAction(null)}
                onFocus={() => setActiveAction("contact")}
                onBlur={() => setActiveAction(null)}
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                Contact Me
              </button>
              <button
                type="button"
                data-hero-action="experience"
                className={`absolute right-4 top-4 flex min-h-12 w-[104px] items-center justify-center gap-2 border bg-background/80 px-2 text-[10px] font-semibold uppercase leading-tight text-foreground backdrop-blur-sm transition-all duration-200 sm:right-5 sm:top-5 ${activeAction === "experience" ? "border-accent text-primary shadow-[0_0_22px_hsl(var(--accent)/0.35)]" : "border-primary/30 hover:border-accent"}`}
                onMouseEnter={() => setActiveAction("experience")}
                onMouseLeave={() => setActiveAction(null)}
                onFocus={() => setActiveAction("experience")}
                onBlur={() => setActiveAction(null)}
                onClick={() => scrollToSection("experience")}
              >
                <BriefcaseBusiness className="h-4 w-4 shrink-0 text-primary" />
                <span>Work Experience</span>
              </button>
              <button
                type="button"
                data-hero-action="projects"
                className={`absolute bottom-4 left-4 flex min-h-12 w-[104px] items-center justify-center gap-2 border bg-background/80 px-2 text-[10px] font-semibold uppercase leading-tight text-foreground backdrop-blur-sm transition-all duration-200 sm:bottom-5 sm:left-5 ${activeAction === "projects" ? "border-accent text-primary shadow-[0_0_22px_hsl(var(--accent)/0.35)]" : "border-primary/30 hover:border-accent"}`}
                onMouseEnter={() => setActiveAction("projects")}
                onMouseLeave={() => setActiveAction(null)}
                onFocus={() => setActiveAction("projects")}
                onBlur={() => setActiveAction(null)}
                onClick={() => scrollToSection("projects")}
              >
                <FolderKanban className="h-4 w-4 shrink-0 text-primary" />
                Projects
              </button>
              <span className="absolute bottom-8 right-8 h-2 w-2 border border-primary/40 bg-background shadow-[0_0_0_5px_hsl(var(--primary)/0.07)]" aria-hidden="true" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        className="group absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
        onClick={() => scrollToSection("experience")}
      >
        <span className="hidden sm:inline">Trace the work</span>
        <span className="circuit-button-secondary flex h-10 w-10 items-center justify-center">
          <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
        </span>
      </button>
    </section>
  )
}
