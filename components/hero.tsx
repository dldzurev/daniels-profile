"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowDownRight, ArrowUpRight, BriefcaseBusiness, FolderKanban, Github, Linkedin, Mail } from "lucide-react"
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

const quickLinks: Array<{
  id: HeroAction
  label: string
  target: string
  icon: typeof Mail
  note: string
}> = [
  { id: "experience", label: "Work Experience", target: "experience", icon: BriefcaseBusiness, note: "Five roles" },
  { id: "projects", label: "Projects", target: "projects", icon: FolderKanban, note: "Selected work" },
  { id: "contact", label: "Contact Me", target: "contact", icon: Mail, note: "Let's connect" },
]

export default function Hero() {
  const [activeAction, setActiveAction] = useState<HeroAction>("experience")

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-20 pt-28 sm:pt-32">
      <div className="container relative z-10 mx-auto max-w-6xl px-0">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(350px,0.88fr)] lg:gap-20">
          <motion.div
            initial={{ y: 24 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-45" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Computer engineer focused on making a difference
            </div>

            <h1 className="max-w-4xl text-[clamp(3.75rem,10vw,7.4rem)] font-semibold leading-[0.84] tracking-[-0.07em] text-foreground">
              <span className="block">Daniel Luke</span>
              <span className="mt-2 block text-muted-foreground/55">Dzurevych</span>
            </h1>

            <div className="mt-10 max-w-xl">
              <p className="text-xl font-medium leading-relaxed tracking-[-0.02em] text-foreground md:text-2xl">
                Passionate about building real solutions to real problems.
              </p>
              <p className="mt-4 font-mono text-xs text-muted-foreground">dldzurev@uwaterloo.ca</p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="circuit-button group flex h-11 items-center gap-2 px-4 text-sm font-medium"
              >
                Explore my work
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>

              <div className="flex items-center gap-1.5 rounded-xl border border-border bg-card/70 p-1 shadow-sm backdrop-blur-xl">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, rotate: 1.5 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[470px] lg:mx-0 lg:ml-auto"
          >
            <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-primary/[0.055] blur-3xl" />

            <div className="sharp-card overflow-hidden !rounded-[22px]">
              <div className="flex items-center justify-between border-b border-border/80 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff605c]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd44]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00ca4e]" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Portfolio / Index</span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-8 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground text-sm font-semibold text-background">
                    DD
                  </div>
                  <div>
                    <div className="text-lg font-semibold tracking-[-0.025em]">Daniel Dzurevych</div>
                    <div className="mt-1 text-sm text-muted-foreground">Computer Engineer</div>
                  </div>
                </div>

                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="property-label">Quick index</span>
                  <span className="font-mono text-[10px] text-muted-foreground">03 pages</span>
                </div>

                <div className="overflow-hidden rounded-xl border border-border bg-background/45">
                  {quickLinks.map(({ id, label, target, icon: Icon, note }, index) => {
                    const active = activeAction === id
                    return (
                      <button
                        key={id}
                        type="button"
                        onMouseEnter={() => setActiveAction(id)}
                        onFocus={() => setActiveAction(id)}
                        onClick={() => scrollToSection(target)}
                        className={`group flex w-full items-center gap-3 border-b border-border/75 px-4 py-4 text-left transition-colors last:border-b-0 ${
                          active ? "bg-primary/[0.08]" : "hover:bg-muted/70"
                        }`}
                      >
                        <span className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${active ? "border-primary/20 bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium">{label}</span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">{note}</span>
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
                        <ArrowUpRight className={`h-4 w-4 transition-all ${active ? "translate-x-0.5 -translate-y-0.5 text-primary" : "text-muted-foreground"}`} />
                      </button>
                    )
                  })}
                </div>

              </div>
            </div>
          </motion.div>
        </div>

        <button
          type="button"
          className="group absolute -bottom-14 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground md:flex"
          onClick={() => scrollToSection("experience")}
        >
          Scroll to explore
          <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  )
}
