"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"

const experiences = [
  {
    title: "Software Engineer",
    company: "Until Labs",
    location: "San Francisco, CA",
    period: "January 2026 - May 2026",
    summary: "Hardware automation, experimental controls, and resilient device infrastructure.",
    achievements: [
      "Built a Python self-diagnosing hardware validator for approximately 15 devices that enumerated serial ports, probed expected responses, identified disconnected or misconfigured hardware, and automatically repaired device-to-port mappings.",
      "Designed a JSON-defined protocol orchestration engine for cryopreservation experiments, executing configurable timed, triggered, and parallel procedures across connected equipment with live sensor polling, failure handling, and comprehensive logging for reproducible runs.",
      "Built a company-wide monitoring and response system for 24+ hour experiments using Twilio and Slack; user-defined thresholds could trigger equipment actions and configurable call or text escalation workflows.",
      "Developed Python, C, and C++ drivers and embedded interfaces for approximately 10 devices over USB serial, RS-232, Ethernet, and I2C; designed and soldered ADC and microcontroller interfaces with retry handling, calibration correction, real-time acquisition, and PID control.",
      "Refactored the controls stack around reusable serial-device base classes, fixed threading issues, and automated microcontroller firmware deployment across lab computers, eliminating approximately 10,000 lines of code.",
      "Helped repurpose a Linux workstation as an on-prem data service, installing a NIC, racking networking hardware, and exposing an internally accessible endpoint.",
    ],
    skills: ["Python", "C", "C++", "Linux", "Serial", "RS-232", "Ethernet", "I2C", "PID Control", "Concurrency"],
  },
  {
    title: "Software Engineer",
    company: "Siemens Ruggedcom",
    location: "Toronto, ON",
    period: "May 2025 - August 2025",
    summary: "Embedded networking software for industrial routers and switches.",
    achievements: [
      "Developed and tested C and C++ features for a proprietary networking OS running on industrial routers and switches worldwide.",
      "Built a standardized embedded logging and observability framework reusable across subsystems for errors, diagnostics, and runtime state.",
      "Implemented and debugged C and C++ modules on embedded Linux, validating router and switch behavior under stress tests with zero packet loss and no performance regressions.",
      "Worked with Linux networking and device workflows including SSH, TFTP, Bash, configuration and firmware transfer, diagnostics, and automated hardware validation for production networking equipment.",
    ],
    skills: ["C", "C++", "Embedded Linux", "Networking", "SSH", "TFTP", "Bash", "Hardware Validation"],
  },
  {
    title: "AI Software Developer",
    company: "Questrade Enterprise",
    location: "Toronto, ON",
    period: "September 2024 - December 2024",
    summary: "Evaluation, guardrails, and production analytics for financial AI systems.",
    achievements: [
      "Built a Python LLM evaluation and guardrail platform with automated testing and CI to detect production failure modes and enforce system constraints for an AI-driven financial product.",
      "Built a BigQuery-backed transcription validation pipeline that improved semantic-labeling accuracy by 15%, with automated cleaning and validation for production analytics.",
    ],
    skills: ["Python", "LLM Evaluation", "AI Guardrails", "Automated Testing", "CI/CD", "BigQuery", "Production Analytics"],
  },
  {
    title: "Student Project Coordinator",
    company: "Chandos",
    location: "Various locations across the GTA",
    period: "January 2024 - April 2024",
    summary: "Field coordination, commercial documentation, and project delivery across active construction sites.",
    achievements: [
      "Coordinated safety inspections, subcontractor meetings, and project communications across active GTA construction sites.",
      "Prepared contracts, scopes of work, estimates, and a 2,000+ page project closeout package under schedule constraints.",
      "Created company-wide software tutorials and supported a six-figure legal claim by compiling evidence and coordinating communication between involved parties.",
    ],
    skills: ["Project Coordination", "Bluebeam Revu", "Fieldview", "Viewpoint", "Vista", "SharePoint", "Contracts", "Estimating"],
  },
  {
    title: "Coding Teacher / Developer",
    company: "TCDSB",
    location: "Virtual across Toronto",
    period: "January 2023 - June 2023",
    summary: "An original programming initiative built to make coding approachable for younger students.",
    achievements: [
      "Founded an initiative that taught elementary and high school students programming through project-based lessons and educational games built with HTML, CSS, Python, and Pygame.",
      "Promoted the program across the Toronto Catholic District School Board and delivered nine workshops to more than 150 students.",
    ],
    skills: ["Python", "Pygame", "HTML", "CSS", "Teaching", "Workshop Facilitation", "Presenting", "Leadership"],
  },
]

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const activeExperience = experiences[activeIndex]

  return (
    <section id="experience" className="section-shell relative">
      <div className="container px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-12 grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <p className="circuit-kicker">Where I have built</p>
              <h2 className="section-heading mb-0">Professional Experience</h2>
            </div>
            <p className="max-w-xl border-l border-primary/35 pl-5 text-lg leading-relaxed text-muted-foreground">
              Five roles spanning embedded systems, AI infrastructure, field coordination, and technical education.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 lg:self-start" role="tablist" aria-label="Professional roles">
              {experiences.map((experience, index) => {
                const active = index === activeIndex

                return (
                  <button
                    key={`${experience.company}-${experience.period}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveIndex(index)}
                    className={`group relative min-h-28 border p-4 text-left transition-all duration-300 lg:min-h-32 ${
                      active
                        ? "border-primary/55 bg-primary text-primary-foreground shadow-[0_16px_50px_hsl(var(--primary)/0.14)]"
                        : "border-border/70 bg-card/55 text-foreground backdrop-blur-sm hover:border-primary/40 hover:bg-card/80"
                    }`}
                  >
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <span className={`text-xs font-semibold ${active ? "text-primary-foreground/65" : "text-muted-foreground"}`}>
                        0{index + 1}
                      </span>
                      <ArrowUpRight className={`h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${active ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <div className="text-base font-semibold">{experience.company}</div>
                    <div className={`mt-1 text-xs leading-relaxed ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {experience.period}
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="relative">
              <div className="absolute -left-10 top-16 hidden h-px w-10 bg-primary/35 lg:block" aria-hidden="true" />
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeExperience.company}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className="sharp-card p-5 md:p-8"
                  role="tabpanel"
                >
                  <div className="mb-8 grid gap-5 border-b border-border/70 pb-7 md:grid-cols-[1fr_auto] md:items-start">
                    <div>
                      <p className="circuit-kicker mb-2">{activeExperience.company}</p>
                      <h3 className="text-3xl font-semibold leading-tight text-foreground md:text-4xl">{activeExperience.title}</h3>
                      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{activeExperience.summary}</p>
                    </div>
                    <div className="text-left text-sm md:text-right">
                      <p className="font-semibold text-primary">{activeExperience.period}</p>
                      <p className="mt-1 text-muted-foreground">{activeExperience.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-5">
                    {activeExperience.achievements.map((achievement) => (
                      <li key={achievement} className="grid grid-cols-[12px_1fr] gap-3 leading-relaxed text-foreground/90">
                        <span className="circuit-link-dot" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-2 border-t border-border/70 pt-6">
                    {activeExperience.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="circuit-chip px-3 py-1 text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
