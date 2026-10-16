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
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border/80 bg-card/85 shadow-sm backdrop-blur-xl lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative border-border/75 px-4 py-8 text-left odd:border-r lg:border-l lg:border-r-0 lg:first:border-l-0 md:py-11"
              >
                <p className="mb-2 text-4xl font-semibold tracking-[-0.05em] text-foreground md:text-5xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
