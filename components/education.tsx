"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { BookOpen, GraduationCap, Trophy } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const courseTerms = [
  {
    term: "1A",
    courses: [
      ["COMMST 192", "Communication in the Engineering Profession"],
      ["ECE 105", "Classical Mechanics"],
      ["ECE 150", "Fundamentals of Programming"],
      ["ECE 190", "Engineering Profession and Practice"],
      ["ECE 198", "Project Studio"],
      ["MATH 115", "Linear Algebra for Engineering"],
      ["MATH 117", "Calculus 1 for Engineering"],
    ],
  },
  {
    term: "1B",
    courses: [
      ["ECE 102", "Information Session"],
      ["ECE 106", "Electricity and Magnetism"],
      ["ECE 108", "Discrete Mathematics and Logic 1"],
      ["ECE 124", "Digital Circuits and Systems"],
      ["ECE 140", "Linear Circuits"],
      ["ECE 192", "Engineering Economics and Impact on Society"],
      ["MATH 119", "Calculus 2 for Engineering"],
    ],
  },
  {
    term: "2A",
    courses: [
      ["ECE 109", "Materials Chemistry for Engineers"],
      ["ECE 201", "Information Session"],
      ["ECE 204", "Numerical Methods"],
      ["ECE 205", "Advanced Calculus 1 for Electrical and Computer Engineers"],
      ["ECE 222", "Digital Computers"],
      ["ECE 240", "Electronic Circuits 1"],
      ["ECE 250", "Algorithms and Data Structures"],
    ],
  },
  {
    term: "2B",
    courses: [
      ["ECE 202", "Information Session"],
      ["ECE 203", "Probability Theory and Statistics 1"],
      ["ECE 207", "Signals and Systems"],
      ["ECE 208", "Discrete Mathematics and Logic 2"],
      ["ECE 224", "Embedded Microprocessor Systems"],
      ["ECE 252", "Systems Programming and Concurrency"],
      ["ECE 298", "Instrumentation and Prototyping Laboratory"],
    ],
  },
  {
    term: "3A",
    courses: [
      ["ECE 301", "Information Session"],
      ["ECE 318", "Communication Systems"],
      ["ECE 327", "Digital Hardware Systems"],
      ["ECE 350", "Real-Time Operating Systems"],
      ["ECE 380", "Analog Control Systems"],
      ["ECON 101", "Introduction to Microeconomics"],
    ],
  },
]

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="education" className="section-shell">
      <div className="container px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-10 flex items-end gap-6">
            <div>
              <p className="circuit-kicker">Academic foundation</p>
              <h2 className="section-heading mb-0">Education</h2>
            </div>
            <div className="mb-2 hidden h-px flex-1 bg-primary/25 md:block" />
          </div>

          <div className="border-y border-primary/25 bg-background/40 backdrop-blur-sm">
            <div className="grid gap-8 px-1 py-9 md:grid-cols-[1.25fr_0.75fr] md:items-center md:px-8 md:py-12">
              <div className="flex items-start gap-5">
                <div className="circuit-icon flex h-14 w-14 shrink-0 items-center justify-center">
                  <GraduationCap className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-3xl font-semibold leading-tight text-foreground md:text-4xl">University of Waterloo</h3>
                  <p className="mt-2 text-lg font-medium text-primary">B.A.Sc. Computer Engineering</p>
                  <p className="mt-1 text-sm text-muted-foreground">Waterloo, ON | 2023 - Expected January 2028</p>
                </div>
              </div>

              <div className="border-l border-primary/25 pl-5 md:pl-8">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Trophy className="h-4 w-4 text-accent" />
                  Scholarships
                </div>
                <p className="text-5xl font-semibold text-primary md:text-6xl">$15,000</p>
              </div>
            </div>

            <div className="border-t border-border/70 px-1 py-7 md:px-8">
              <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Courses Taken</h3>
                </div>
                <p className="text-sm text-muted-foreground">Core sequence through 3A plus ECON 101.</p>
              </div>
              <Tabs defaultValue="3A" className="w-full">
                <TabsList className="grid h-auto w-full grid-cols-5 rounded-none border border-border/70 bg-background/35 p-1">
                  {courseTerms.map(({ term }) => (
                    <TabsTrigger
                      key={term}
                      value={term}
                      className="rounded-none px-2 py-2.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:text-sm"
                    >
                      {term}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {courseTerms.map(({ term, courses }) => (
                  <TabsContent key={term} value={term} className="mt-5">
                    <div className="grid gap-px overflow-hidden border border-border/70 bg-border/70 sm:grid-cols-2">
                      {courses.map(([code, title]) => (
                        <div key={code} className="flex min-h-16 items-start gap-3 bg-background/80 px-4 py-3 backdrop-blur-sm">
                          <Badge className="circuit-chip mt-0.5 shrink-0 px-2.5 py-1 text-xs">{code}</Badge>
                          <span className="text-sm leading-relaxed text-foreground/85">{title}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
