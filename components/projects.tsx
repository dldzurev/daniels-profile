"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUpRight,
  Braces,
  Cpu,
  Database,
  FlaskConical,
  Layers3,
  Network,
  QrCode,
  Radio,
  TrendingUp,
  Trophy,
  Workflow,
} from "lucide-react"
import { useRouter } from "next/navigation"

const featuredProjects = [
  {
    id: "real-time-executive",
    title: "Real-Time Executive",
    category: "Operating Systems",
    description:
      "Built an RTX in C on an ARM Cortex-A9/DE1-SoC with first-fit memory allocation, priority-based preemptive scheduling, and task lifecycle management.",
    icon: Workflow,
    skills: ["C", "ARM Cortex-A9", "DE1-SoC", "RTOS", "Preemptive Scheduling", "Memory Allocation"],
  },
  {
    id: "concurrent-network-systems",
    title: "Concurrent Network Systems",
    category: "Systems & Networking",
    description:
      "Built C and Linux systems using pthreads, libcurl, pipes and shared-memory IPC, synchronization, sockets, parallel web crawling, and asynchronous event-driven I/O.",
    icon: Network,
    skills: ["C", "Linux", "pthreads", "libcurl", "Shared Memory", "Sockets", "Async I/O"],
  },
  {
    id: "fpga-mvm-accelerator",
    title: "FPGA MVM Accelerator",
    category: "Digital Hardware",
    description:
      "Built a parameterized SystemVerilog matrix-vector multiplication engine with pipelined 8-lane dot-product units, memory buffers, accumulators, and FSM control; verified in Vivado at 350+ MHz.",
    icon: Cpu,
    skills: ["SystemVerilog", "FPGA", "Vivado", "Pipelining", "FSM", "350+ MHz"],
  },
  {
    id: "conductor",
    title: "Conductor",
    category: "Software Orchestration",
    description:
      "Built a Python and FastAPI orchestration platform that automates end-to-end workflows across Slack, Gmail, Notion, and AI voice agents through external APIs.",
    icon: Braces,
    skills: ["Python", "FastAPI", "Slack API", "Gmail API", "Notion API", "AI Voice Agents"],
  },
  {
    id: "hackathon-winner",
    title: "$10,000 Hackathon Win",
    category: "Applied AI",
    description:
      "Built a Chrome extension that generates personalized company software tutorials from Figma designs and account context using Vertex AI.",
    icon: Trophy,
    skills: ["Python", "JavaScript", "Vertex AI", "Chrome Extension", "Figma"],
  },
]

const moreProjects = [
  {
    id: "orchestrator",
    title: "Orchestrator",
    category: "Financial Systems",
    description: "A no-code trading platform for building, running, and backtesting strategies across equities, crypto, and forex.",
    icon: TrendingUp,
    skills: ["Python", "FastAPI", "JavaScript", "Pandas", "WebSockets"],
  },
  {
    id: "context-co",
    title: "Context Co",
    category: "Product / Software",
    description: "Project page and supporting materials are being prepared.",
    icon: Layers3,
    skills: [],
  },
  {
    id: "cpp-data-analysis",
    title: "C++ Data Analysis Tool",
    category: "Algorithms & Data",
    description: "A graph-based CSV analysis tool with constant-time hash lookup, tested with up to two million data points.",
    icon: Database,
    skills: ["C++", "Data Structures", "Hashing", "Performance"],
  },
  {
    id: "morse-code",
    title: "Morse Code Device",
    category: "Embedded Systems",
    description: "A RISC-V microprocessor system that translates text input into Morse code displayed through an LED.",
    icon: Radio,
    skills: ["RISC-V", "Assembly", "Embedded Systems", "Hardware"],
  },
  {
    id: "ph-sensing",
    title: "pH Sensing Device",
    category: "Sensing & Hardware",
    description: "An STM32-based device programmed in C to monitor pH measurements and detect irregular readings.",
    icon: FlaskConical,
    skills: ["C", "STM32", "Sensors", "Hardware Design"],
  },
  {
    id: "qr-code",
    title: "QR Code Application System",
    category: "Workflow Automation",
    description: "A QR-based application workflow that automated form collection and spreadsheet entry for Chandos career fairs.",
    icon: QrCode,
    skills: ["Web Development", "QR Codes", "Spreadsheet Automation"],
  },
]

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const router = useRouter()

  return (
    <section id="projects" className="section-shell">
      <div className="container px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="mx-auto max-w-6xl"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
            className="mb-11 grid gap-5 md:grid-cols-[1fr_0.75fr] md:items-end"
          >
            <div>
              <p className="circuit-kicker">Selected engineering work</p>
              <h2 className="section-heading mb-0">Projects</h2>
            </div>
            <p className="border-l border-primary/35 pl-5 text-lg leading-relaxed text-muted-foreground">
              Systems work from real-time scheduling and concurrent networking to FPGA acceleration and orchestration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
            {featuredProjects.map((project, index) => {
              const Icon = project.icon
              const span = index === 0 ? "lg:col-span-4" : index === 1 ? "lg:col-span-2" : "lg:col-span-2"

              return (
                <motion.div
                  key={project.id}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                  className={span}
                >
                  <button
                    type="button"
                    className="group h-full w-full text-left"
                    onClick={() => router.push(`/projects/${project.id}`)}
                    aria-label={`View ${project.title}`}
                  >
                    <Card className="sharp-card h-full cursor-pointer">
                      <CardContent className={`flex h-full min-h-[330px] flex-col p-6 ${index === 0 ? "md:min-h-[360px] md:p-8" : ""}`}>
                        <div className="mb-8 flex items-start justify-between gap-4">
                          <div className="circuit-icon flex h-12 w-12 items-center justify-center p-3">
                            <Icon className="h-6 w-6" strokeWidth={1.6} />
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-muted-foreground">0{index + 1}</span>
                            <ArrowUpRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                          </div>
                        </div>

                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{project.category}</p>
                        <h3 className={`${index === 0 ? "text-3xl md:text-4xl" : "text-2xl"} mb-4 font-semibold leading-tight text-foreground`}>
                          {project.title}
                        </h3>
                        <p className="mb-7 leading-relaxed text-muted-foreground">{project.description}</p>

                        <div className="mt-auto flex flex-wrap gap-2 border-t border-border/65 pt-5">
                          {project.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="circuit-chip px-3 py-1 text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            id="project-archive"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
            className="mb-6 mt-14 flex items-end justify-between gap-5 border-b border-primary/25 pb-4"
          >
            <div>
              <p className="circuit-kicker mb-1">Additional builds</p>
              <h3 className="text-2xl font-semibold text-foreground md:text-3xl">Project Archive</h3>
            </div>
            <span className="hidden text-sm text-muted-foreground sm:block">Six more systems and experiments</span>
          </motion.div>

          <div className="grid gap-px overflow-hidden border border-border/70 bg-border/70 md:grid-cols-2 lg:grid-cols-3">
            {moreProjects.map((project, index) => {
              const Icon = project.icon

              return (
                <motion.button
                  key={project.id}
                  type="button"
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
                  className="group flex min-h-[280px] flex-col bg-background/75 p-5 text-left backdrop-blur-sm transition-colors duration-300 hover:bg-card/95 md:p-6"
                  onClick={() => router.push(`/projects/${project.id}`)}
                  aria-label={`View ${project.title}`}
                >
                  <div className="mb-8 flex items-start justify-between gap-4">
                    <div className="circuit-icon flex h-10 w-10 items-center justify-center">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-muted-foreground">{String(index + 6).padStart(2, "0")}</span>
                      <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                  </div>

                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{project.category}</p>
                  <h4 className="mb-3 text-xl font-semibold leading-tight text-foreground">{project.title}</h4>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                  {project.skills.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2 border-t border-border/65 pt-4">
                      {project.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="circuit-chip px-2.5 py-1 text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
