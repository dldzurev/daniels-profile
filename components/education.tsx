"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, GraduationCap, Trophy } from "lucide-react"

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="education" className="py-20">
      <div className="container px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-center">
            Education
          </motion.h2>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-none shadow-lg bg-background rounded-2xl hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-primary/5 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 p-2 rounded-full bg-primary/10">
                      <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">University of Waterloo</CardTitle>
                      <p className="text-lg font-medium text-primary">
                        Computer Engineering - Bachelors of Applied Sciences
                      </p>
                      <p className="text-sm text-muted-foreground">Waterloo, ON | 2023-2028</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-lg font-semibold">Relevant Coursework</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-7">
                    {[
                      "Data Structures & Algorithms",
                      "Object Oriented Programming",
                      "Digital Circuits/Systems",
                      "Computer Architecture"
                    ].map((course) => (
                      <Badge key={course} className="rounded-full px-3 py-1 text-sm">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-3">
                    <Trophy className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-lg font-semibold">Academic Achievements</h3>
                  </div>
                  <ul className="space-y-2 ml-7">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-primary">•</span>
                      <span>UW President's scholarship for academic Excellence - $2,000</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-primary">•</span>
                      <span>
                        Various other scholarships for academic excellence, sports and community involvement valued at
                        an additional $4,700
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
