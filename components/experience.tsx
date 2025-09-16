"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { useEffect, useRef, useState } from "react"

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experiences = [
    {
      title: "Software Engineer",
      company: "SIEMENS",
      location: "Toronto, ON",
      period: "May 2025 - Present",
      achievements: [
        "Developed, and tested features for a proprietary operating system used in switches, routers, and modems worldwide including a new universal embedded logging system",
        "Built efficient SQL queries for relational databases, .NET-based apps to improve production efficiency",
        "Developed C/C++ modules and tests for Ruggedcom industrial routers/switches in a distributed system running on Linux, ensuring high-speed packet forwarding, maintaining efficient system design and zero packet loss",
        "Collaborated with firmware team to create diagnostics software, optimize device performance across deployments, and worked extensively with network protocols such as TFTP for device config and firmware transfer",
      ],
      skills: ["C", "C++", ".NET", "Linux", "Embedded Systems", "Networking"],
    },
    {
      title: "Software Developer",
      company: "Questrade Enterprise",
      location: "Toronto, ON",
      period: "September 2024 - December 2024",
      achievements: [
        "Reduced HR workload by creating an automated pipeline for data cleaning of 600+ person sample (JavaScript) and modeled company-wide statistics (Jupyter Notebooks) to deliver data-driven reports",
        "Developed microservices and automated testing for AI-driven financial products, to monitor hallucination",
        "Created an LLM-OPS platform & prompt evaluation program to ensure accuracy and reliability of output (Python, Scikit-learn, Pandas, Deepeval, Vertex AI, LangGraph)",
        "Assisted in the enhancement of internal chat bot performance by implementing improved vector search methods (Python, C++), leading to more accurate responses for employees",
        "Built, debugged and automated testing for AI guardrails with agile and CI/CD methodologies ensuring compliance and prevent liability by detecting and blocking unauthorized financial advice in customer-facing tool",
        "Improved call transcription accuracy by 15% for the Customer Experience team by helping automate a transcript parser and analyzing trends using BigQuery, enhancing insights while maintaining security of sensitive data",
      ],
      skills: ["Python", "JavaScript", "C++", "AI/ML", "Vertex AI", "AI Guardrails" , "BigQuery", "Pandas", "Scikit-learn", "Deepeval" , "Microservices" , "Finance" , "LLM-Ops" , "Prompt" , "Langraph" , "AUtomated/Unit Testing" , "Compliance/Data Security"],
    },                                           
                           
    {
      title: "Project Coordinator",
      company: "Chandos",
      location: "Various locations across GTA",
      period: "January 2024 - April 2024",
      achievements: [
        "Led on-site safety inspections, coordinated subcontractor meetings, oversaw project communications and assisted a $300,000 legal claim by compiling key evidence, contributing to a more structured legal case",
        "Honed my problem solving skills by planning and implementing solutions to unique interpersonal and random variable challenges resulting in greater efficiency",
        "Prepared and tendered contracts/documents and SOW's, prepared estimates, created closeouts (2000+ page document) under tight deadlines and created company wide software tutorials, improving internal training and onboarding efficiency",
      ],
      skills: ["Project Management", "Problem Solving", "Documentation", "Contract Preparation", "Training", "Communication", "Financial Estimates", "Optomization"],
    },
    {
      title: "Coding Teacher/Developer",
      company: "TCDSB (Toronto Catholic District School Board)",
      location: "Virtual across Toronto",
      period: "January 2023 - June 2023",
      achievements: [
        "Founded initiative that teaches grade school and high school students basic programming using simple projects and educational games I created (HTML, CSS, Python, and Pygame)",
        "Proactively promoted my initiative across TCDSB, leading to 9 successful workshops with 150+ attendees",
      ],
      skills: ["HTML", "CSS", "Python", "Pygame", "Teaching", "Workshop Facilitation", "Presenting", "Leadership"],
    },
  ]

  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const height = rect.height - window.innerHeight
      if (height <= 0) {
        setProgress(0)
        return
      }
      const scrolled = Math.min(Math.max((window.innerHeight - rect.top) / height, 0), 1)
      setProgress(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="experience" ref={sectionRef} className="py-20 relative">
      <div
        className="absolute left-4 top-0 bottom-0 flex justify-center"
        aria-hidden="true"
      >
        <div className="relative w-px bg-gray-300 dark:bg-gray-700 h-full">
          <div
            className="absolute -left-1 w-3 h-3 rounded-full bg-blue-500"
            style={{ top: 0, transform: `translateY(${progress * 100}%)` }}
          />
        </div>
      </div>
      <div className="container px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-center">
            Professional Experience
          </motion.h2>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={itemVariants} className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="md:w-64 md:sticky md:top-20 md:self-start text-center md:text-left mb-4 md:mb-0">
                  <div className="text-gray-600 dark:text-gray-400">{exp.period}</div>
                  <div className="text-gray-600 dark:text-gray-400">{exp.location}</div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold">{exp.title}</h3>
                  <p className="text-gray-800 dark:text-gray-200 text-lg mb-4">{exp.company}</p>

                  <ul className="space-y-4 mb-6">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 mt-1 text-gray-800 dark:text-gray-200">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="rounded-full px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 border-none"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
