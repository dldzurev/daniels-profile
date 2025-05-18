"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function About() {
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
    <section id="about" className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          













          

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-none shadow-lg bg-background rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Other Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Power Lifting",
                    "Piano",
                    "Fluent in Ukrainian",
                    "Skiing",
                    "Passionate about Building",
                    "Strong Interest in AI Agents",
                  ].map((interest) => (
                    <Badge
                      key={interest}
                      className="rounded-full px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
