"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Trophy } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const router = useRouter()

  const projects = [
    {
      id: "hackathon-winner",
      title: "$10,000 Hackathon Winner",
      description:
        "Built a chrome extension connected to Vertex AI that automatically creates company templated dynamic tutorials from FIGMA designs, personalized based on account information.",
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      skills: ["Python", "JavaScript", "Vertex AI", "Chrome Extension", "FIGMA"],
      iconBg: "bg-yellow-500/10",
      videoUrl: "/videos/hackathon-demo.mp4",
    },
    {
      id: "cpp-data-analysis",
      title: "C++ Data Analysis Tool",
      description:
        "Created a data analysis tool that parses CSV rows, builds a graph, and uses hashing for O(1) lookup. Successfully tested for up to 2 million data points.",
      icon: <Database className="h-8 w-8 text-emerald-500" />,
      skills: ["C++", "Data Analysis", "Hashing", "Algorithms"],
      iconBg: "bg-emerald-500/10",
      videoUrl: "/videos/cpp-tool-demo.mp4",
    },
    {
      id: "morse-code",
      title: "Morse Code Device",
      description: "Created a text to morse code device connected to an LED using a microprocessor with RISC-V.",
      icon: <Code className="h-8 w-8 text-purple-500" />,
      skills: ["RISC-V", "Microprocessor", "Hardware"],
      iconBg: "bg-purple-500/10",
      videoUrl: "/videos/morse-code-demo.mp4",
    },
    {
      id: "ph-sensing",
      title: "pH Sensing Device",
      description:
        "Designed, constructed and programmed a pH irregularity sensing device using STM32 microcontroller in C.",
      icon: <Code className="h-8 w-8 text-blue-500" />,
      skills: ["C", "STM32", "Microcontroller", "Hardware Design"],
      iconBg: "bg-blue-500/10",
      videoUrl: "/videos/ph-sensing-demo.mp4",
    },
    {
      id: "qr-code",
      title: "QR Code Application System",
      description:
        "Created a QR code connected to a form submission website that automatically populated a spreadsheet to optimize application process at career fairs for previous employer (Chandos).",
      icon: <Code className="h-8 w-8 text-pink-500" />,
      skills: ["Web Development", "QR Code", "Form Submission", "Spreadsheet Automation"],
      iconBg: "bg-pink-500/10",
      videoUrl: "/videos/qr-code-demo.mp4",
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

  const handleProjectClick = (projectId) => {
    router.push(`/projects/${projectId}`)
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-center">
            Projects & Achievements
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className="h-full overflow-hidden border-none shadow-lg bg-white dark:bg-gray-800 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 rounded-full ${project.iconBg}`}>{project.icon}</div>
                    </div>

                    <h3 className="text-xl font-bold text-center mb-4">{project.title}</h3>

                    <p className="text-muted-foreground text-center mb-6">{project.description}</p>

                    <div className="flex flex-wrap justify-center gap-2 mt-auto">
                      {project.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="rounded-full px-3 py-1 text-xs bg-gray-50 dark:bg-gray-700"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-12">
            <Card className="overflow-hidden border-none shadow-lg bg-white dark:bg-gray-800 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Additional Achievements</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span>
                      UW President's scholarship for academic Excellence - $2,000 and various other scholarships for
                      academic excellence, sports and community involvement valued at an additional $4,700
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span>
                      UW Formula Electric Design Team (full size electric race car): active member of drivetrain design
                      division
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
