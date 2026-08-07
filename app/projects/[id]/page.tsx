"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock3, ExternalLink, FileText, Github } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import BackgroundPattern from "@/components/background-pattern"

type Project = {
  title: string
  category: string
  description: string
  details: string[]
  skills: string[]
  githubUrl?: string
  devpostUrl?: string
  docsUrl?: string
  mediaUrl?: string
  comingSoon?: boolean
}

const projects: Record<string, Project> = {
  "real-time-executive": {
    title: "Real-Time Executive",
    category: "Operating Systems",
    description:
      "A real-time executive built in C on an ARM Cortex-A9 and DE1-SoC, covering memory allocation, preemptive scheduling, and task lifecycle management.",
    details: [],
    skills: ["C", "ARM Cortex-A9", "DE1-SoC", "RTOS", "Preemptive Scheduling", "Memory Allocation"],
    comingSoon: true,
  },
  "concurrent-network-systems": {
    title: "Concurrent Network Systems",
    category: "Systems & Networking",
    description:
      "A collection of concurrent C and Linux systems using process communication, synchronization, network I/O, and parallel execution.",
    details: [],
    skills: ["C", "Linux", "pthreads", "libcurl", "Pipes", "Shared Memory", "Sockets", "Async I/O"],
    comingSoon: true,
  },
  "fpga-mvm-accelerator": {
    title: "FPGA MVM Accelerator",
    category: "Digital Hardware",
    description:
      "A parameterized SystemVerilog matrix-vector multiplication engine designed for high-throughput FPGA execution.",
    details: [],
    skills: ["SystemVerilog", "FPGA", "Vivado", "Pipelining", "FSM", "350+ MHz"],
    comingSoon: true,
  },
  conductor: {
    title: "Conductor",
    category: "Software Orchestration",
    description:
      "A Python and FastAPI orchestration platform for automating end-to-end workflows across communication and productivity tools.",
    details: [
      "Built an orchestration backend in Python and FastAPI.",
      "Automated workflows spanning Slack, Gmail, Notion, and AI voice agents.",
      "Connected services through external APIs to coordinate multi-application workflows from one system.",
    ],
    skills: ["Python", "FastAPI", "Slack API", "Gmail API", "Notion API", "AI Voice Agents"],
    githubUrl: "https://github.com/dldzurev/Spurhacks-2025",
    devpostUrl: "https://devpost.com/software/conductor-65x9i7",
    mediaUrl: "https://www.youtube.com/embed/V2578vWWx10?start=2",
  },
  "hackathon-winner": {
    title: "$10,000 Hackathon Win",
    category: "Applied AI",
    description:
      "A Chrome extension that turns Figma designs and account context into personalized company software tutorials.",
    details: [
      "Built the extension interface and workflow automation in JavaScript.",
      "Used Vertex AI to generate personalized, company-templated tutorials.",
      "Won the $10,000 grand prize by delivering a working business solution under hackathon constraints.",
    ],
    skills: ["Python", "JavaScript", "Vertex AI", "Chrome Extension", "Figma"],
    mediaUrl: "/DSC_1061.JPG",
  },
  orchestrator: {
    title: "Orchestrator",
    category: "Financial Systems",
    description:
      "A no-code trading platform for building, running, and backtesting strategies across equities, crypto, and forex.",
    details: [
      "Built a visual strategy builder for defining market conditions, indicators, and buy or sell logic without code.",
      "Implemented technical indicators and historical backtesting with Python, FastAPI, Pandas, and NumPy.",
      "Connected real-time market data through Finnhub WebSocket streams with synthetic data generation for reliable offline testing.",
    ],
    skills: ["Python", "FastAPI", "JavaScript", "Pandas", "NumPy", "WebSockets", "Finnhub API", "Trading"],
    githubUrl: "https://github.com/dldzurev/Orchestrator",
    devpostUrl: "https://devpost.com/software/orchestrator",
    mediaUrl: "/demo.mp4",
  },
  "context-co": {
    title: "Context Co",
    category: "Product / Software",
    description: "Project page and supporting materials are being prepared.",
    details: [],
    skills: [],
    comingSoon: true,
  },
  "cpp-data-analysis": {
    title: "C++ Data Analysis Tool",
    category: "Algorithms & Data",
    description:
      "A high-performance analysis tool that parses CSV data, constructs a graph, and supports constant-time hash lookup.",
    details: [
      "Designed graph and hash-based data structures for efficient traversal and O(1) key lookup.",
      "Built a CSV ingestion pipeline and object-oriented analysis workflow in C++.",
      "Validated performance and scalability with datasets containing up to two million data points.",
    ],
    skills: ["C++", "Data Analysis", "Object-Oriented Programming", "Algorithms", "Runtime Optimization"],
    mediaUrl: "/Screenshot 2025-05-18 174344.png",
  },
  "morse-code": {
    title: "Morse Code Device",
    category: "Embedded Systems",
    description: "A RISC-V microprocessor system that translates text input into Morse code displayed through an LED.",
    details: [
      "Programmed the text-to-Morse conversion logic for a RISC-V microprocessor.",
      "Connected software output to an LED interface for timed visual signal playback.",
      "Applied low-level programming and computer architecture concepts in a working embedded device.",
    ],
    skills: ["RISC-V", "Microprocessor", "Hardware", "Assembly", "Embedded Systems"],
    mediaUrl: "/Image.jpeg",
  },
  "ph-sensing": {
    title: "pH Sensing Device",
    category: "Sensing & Hardware",
    description: "An STM32-based device programmed in C to monitor pH measurements and detect irregular readings.",
    details: [
      "Integrated a pH sensor with an STM32 microcontroller and programmed the device in C.",
      "Processed analog measurements and detected readings outside configured thresholds.",
      "Designed and assembled a complete prototype for practical environmental monitoring.",
    ],
    skills: ["C", "STM32", "Microcontroller", "Hardware Design", "Low-Level Programming"],
    docsUrl: "/Customer Definition_ (1).pdf",
  },
  "qr-code": {
    title: "QR Code Application System",
    category: "Workflow Automation",
    description:
      "A QR-based application workflow that automated form collection and spreadsheet entry for Chandos career fairs.",
    details: [
      "Connected QR codes to a custom form workflow for fast applicant intake at career fairs.",
      "Automated spreadsheet population to remove manual entry and make applicant data immediately accessible.",
      "Delivered a practical internal tool that simplified an existing recruiting process.",
    ],
    skills: ["Web Development", "QR Codes", "Form Workflows", "Spreadsheet Automation"],
  },
}

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const id = Array.isArray(params.id) ? params.id[0] : params.id
  const project = id ? projects[id] : undefined

  if (!project) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <h1 className="mb-5 text-3xl font-semibold text-foreground">Project not found</h1>
        <Button className="circuit-button-secondary" onClick={() => router.push("/#projects")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden py-10 md:py-16">
      <div className="fixed inset-0 -z-20">
        <BackgroundPattern />
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <Button variant="ghost" className="circuit-button-secondary mb-12" onClick={() => router.push("/#projects")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>

        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-12 max-w-4xl"
        >
          <p className="circuit-kicker">{project.category}</p>
          <h1 className="section-heading mb-6 text-5xl md:text-7xl">{project.title}</h1>
          <p className="max-w-3xl border-l border-primary/40 pl-5 text-xl leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </motion.header>

        {project.comingSoon ? (
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="sharp-card relative flex min-h-[430px] overflow-hidden"
          >
            <div className="absolute inset-x-0 top-1/2 h-px bg-primary/15" aria-hidden="true" />
            <div className="absolute bottom-0 left-1/3 top-0 w-px bg-primary/10" aria-hidden="true" />
            <div className="relative m-auto max-w-2xl px-6 py-16 text-center md:px-12">
              <div className="circuit-icon mx-auto mb-7 flex h-14 w-14 items-center justify-center">
                <Clock3 className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <p className="circuit-kicker">Documentation in progress</p>
              <h2 className="mb-4 text-3xl font-semibold text-foreground md:text-4xl">Project page to be updated</h2>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
                A complete write-up, architecture breakdown, and demo will be added here soon.
              </p>
              {project.skills.length > 0 && (
                <div className="mt-8 flex flex-wrap justify-center gap-2 border-t border-border/70 pt-7">
                  {project.skills.map((skill) => (
                    <Badge key={skill} className="circuit-chip px-3 py-1.5">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </motion.section>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_310px]"
          >
            <div className="space-y-7">
            {project.mediaUrl && (
              <div className="sharp-card overflow-hidden p-2">
                {project.mediaUrl.startsWith("https://www.youtube.com/embed") ? (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <iframe
                      src={project.mediaUrl}
                      title={project.title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : project.mediaUrl.endsWith(".mp4") ? (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <video src={project.mediaUrl} controls preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                ) : (
                  <img src={project.mediaUrl} alt={project.title} className="aspect-video w-full object-cover" />
                )}
              </div>
            )}

            <section className="sharp-card p-6 md:p-8">
              <div className="mb-7 flex items-center justify-between border-b border-border/70 pb-5">
                <h2 className="text-2xl font-semibold text-foreground">Build Details</h2>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{project.details.length} highlights</span>
              </div>
              <ul className="space-y-6">
                {project.details.map((detail, index) => (
                  <li key={detail} className="grid grid-cols-[32px_1fr] gap-4 leading-relaxed">
                    <span className="flex h-8 w-8 items-center justify-center border border-primary/30 bg-primary/5 text-xs font-semibold text-primary">
                      0{index + 1}
                    </span>
                    <span className="pt-1 text-foreground/90">{detail}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="sharp-card p-6">
              <h2 className="mb-5 text-lg font-semibold text-foreground">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <Badge key={skill} className="circuit-chip px-3 py-1.5">
                    {skill}
                  </Badge>
                ))}
              </div>

              {(project.githubUrl || project.devpostUrl || project.docsUrl) && (
                <div className="mt-7 space-y-3 border-t border-border/70 pt-6">
                  {project.githubUrl && (
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="circuit-button w-full justify-between">
                        GitHub <Github className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {project.devpostUrl && (
                    <Link href={project.devpostUrl} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="circuit-button-secondary w-full justify-between">
                        Devpost <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {project.docsUrl && (
                    <Link href={project.docsUrl} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="circuit-button-secondary w-full justify-between">
                        Project Docs <FileText className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </aside>
          </motion.div>
        )}
      </div>
    </main>
  )
}
