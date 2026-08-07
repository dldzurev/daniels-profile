"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Braces, Cpu, Network, Workflow } from "lucide-react"

const skillGroups = [
  {
    id: "languages",
    label: "Languages",
    icon: Braces,
    skills: ["C", "C++", "Python", "Bash", "SystemVerilog", "VHDL", "ARM Assembly", "C#", "SQL"],
  },
  {
    id: "systems",
    label: "Systems & Concurrency",
    icon: Workflow,
    skills: ["Linux", "POSIX", "System Calls", "Sockets", "pthreads", "Shared Memory", "Async I/O", "Event-Driven I/O"],
  },
  {
    id: "networking",
    label: "Networking",
    icon: Network,
    skills: ["TCP", "Ethernet", "ICMP", "SSH", "TFTP", "ARP", "OSPF", "BGP"],
  },
  {
    id: "hardware",
    label: "Hardware & Tools",
    icon: Cpu,
    skills: ["RISC-V", "FPGA", "USB Serial", "UART", "RS-232", "I2C", "Microcontrollers", "ADCs", "Git", "CMake", "Vivado"],
  },
]

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="section-shell">
      <div className="container px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65 }}
          className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.68fr_1.32fr]"
        >
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="circuit-kicker">Engineering toolkit</p>
            <h2 className="section-heading">Skills & Technologies</h2>
            <p className="max-w-sm border-l border-primary/35 pl-5 leading-relaxed text-muted-foreground">
              Low-level software, networking, concurrency, and hardware systems built to work together.
            </p>
          </div>

          <Tabs defaultValue="languages" className="sharp-card p-4 sm:p-6">
            <TabsList className="mb-7 grid h-auto grid-cols-2 gap-2 bg-transparent p-0 sm:grid-cols-4">
              {skillGroups.map(({ id, label, icon: Icon }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="min-h-20 flex-col gap-2 border border-border/70 bg-background/45 px-3 py-3 text-xs data-[state=active]:border-primary/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                  <span className="text-center leading-tight">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {skillGroups.map(({ id, label, skills }) => (
              <TabsContent key={id} value={id} className="mt-0 focus-visible:outline-none">
                <div className="mb-5 flex items-end justify-between gap-4 border-b border-border/70 pb-4">
                  <h3 className="text-2xl font-semibold text-foreground">{label}</h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {skills.length} skills
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: index * 0.025 }}
                      className="circuit-chip relative flex min-h-14 items-center px-4 text-sm font-medium"
                    >
                      <span className="mr-3 h-1.5 w-1.5 shrink-0 bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.08)]" />
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
