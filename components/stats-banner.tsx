"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function StatsBanner() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    {
      value: "5",
      label: "Internships",
    },
    {
      value: "10+",
      label: "Technical Projects",
    },
    {
      value: "$10k",
      label: "Hackathon Win",
    },
    {
      value: "$15k",
      label: "Scholarships",
    },
  ]

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
    <section className="py-10 md:py-16">
      <div className="container px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 border-y border-primary/25 bg-background/30 backdrop-blur-sm lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative px-4 py-8 text-center md:py-11 lg:border-l lg:first:border-l-0"
              >
                <span className="absolute right-0 top-0 h-2 w-2 translate-x-1/2 -translate-y-1/2 border border-primary bg-background" />
                <p className="mb-2 text-4xl font-semibold text-primary md:text-5xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
