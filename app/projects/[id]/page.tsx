"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Github } from "lucide-react"
import Link from "next/link"
import VideoPlayer from "@/components/video-player"
import { motion } from "framer-motion"

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  // This would normally fetch from an API, but we'll use a static list for this example
  useEffect(() => {
    const projects = [
      {
        id: "hackathon-winner",
        title: "$10,000 Hackathon Winner",
        description:
          "Built a chrome extension connected to Vertex AI that automatically creates company templated dynamic tutorials from FIGMA designs, personalized based on account information.",
        skills: ["Python", "JavaScript", "Vertex AI", "Chrome Extension", "FIGMA"],
        iconColor: "text-yellow-500",
        iconBg: "bg-yellow-500/10",
        githubUrl: "https://github.com",
        videoUrl: "/DSC_1061.JPG", // <-- changed to include leading slash
        detailedDescription: `
          Won a $10,000 hackathon by developing a Chrome extension that leverages Vertex AI to automatically generate 
          company-templated tutorials from FIGMA designs. The extension analyzes design elements and creates 
          personalized tutorials based on user account information, significantly reducing the time required for 
          creating documentation and onboarding materials.
          
          The solution uses Python for the backend processing, JavaScript for the Chrome extension, and integrates 
          with Vertex AI for intelligent content generation. This project demonstrated my ability to quickly develop 
          innovative solutions that solve real business problems.
        `,
      },
      {
        id: "cpp-data-analysis",
        title: "C++ Data Analysis Tool",
        description:
          "Created a data analysis tool that parses CSV rows, builds a graph, and uses hashing for O(1) lookup. Successfully tested for up to 2 million data points.",
        skills: ["C++", "Data Analysis", "Hashing", "Algorithms"],
        iconColor: "text-emerald-500",
        iconBg: "bg-emerald-500/10",
        githubUrl: "https://github.com",
        videoUrl: "/Screenshot 2025-05-18 174344.png",
        detailedDescription: `
          Developed a high-performance data analysis tool in C++ that efficiently processes large CSV datasets. 
          The tool parses CSV rows, constructs a graph representation of the data, and implements a hash-based 
          lookup system for O(1) time complexity queries.
          
          Performance testing confirmed the tool's scalability, successfully handling datasets with up to 2 million 
          data points while maintaining fast response times. The implementation showcases advanced data structure 
          knowledge and algorithm optimization techniques.
        `,
      },
      {
        id: "morse-code",
        title: "Morse Code Device",
        description: "Created a text to morse code device connected to an LED using a microprocessor with RISC-V.",
        skills: ["RISC-V", "Microprocessor", "Hardware"],
        iconColor: "text-purple-500",
        iconBg: "bg-purple-500/10",
        githubUrl: "https://github.com",
        videoUrl: "/Image.jpeg",
        detailedDescription: `
          Designed and built a text-to-morse code converter device using a RISC-V microprocessor. The device 
          takes text input and translates it into morse code, which is then visually displayed through an LED.
          
          This project combined hardware design with low-level programming, demonstrating my ability to work 
          with microprocessors and implement communication protocols. The RISC-V architecture provided an 
          excellent platform for learning about computer architecture and embedded systems programming.
        `,
      },
      {
        id: "ph-sensing",
        title: "pH Sensing Device",
        description:
          "Designed, constructed and programmed a pH irregularity sensing device using STM32 microcontroller in C.",
        skills: ["C", "STM32", "Microcontroller", "Hardware Design"],
        iconColor: "text-blue-500",

        iconBg: "bg-blue-500/10",
        docsUrl:"/Customer Definition_ (1).pdf",

        detailedDescription: `
          Designed, constructed, and programmed a pH irregularity sensing device using an STM32 microcontroller 
          programmed in C. The device accurately measures and monitors pH levels, alerting users when readings 
          fall outside of predefined parameters.
          
          This project involved sensor integration, analog-to-digital conversion, and implementing a responsive 
          alert system. The completed device demonstrates practical applications of microcontroller programming 
          and sensor technology in environmental monitoring.
        `,
      },
      {
        id: "qr-code",
        title: "QR Code Application System",
        description:
          "Created a QR code connected to a form submission website that automatically populated a spreadsheet to optimize application process at career fairs for previous employer (Chandos).",
        skills: ["Web Development", "QR Code", "Form Submission", "Spreadsheet Automation"],
        iconColor: "text-pink-500",
        iconBg: "bg-pink-500/10",
        detailedDescription: `
          Developed a streamlined application system for Chandos that utilized QR codes to direct applicants to 
          a custom-built form submission website. The system automatically populated a spreadsheet with applicant 
          information, significantly optimizing the application process at career fairs.
          
          This solution eliminated manual data entry, reduced errors, and provided real-time access to applicant 
          information. The project showcased my ability to identify inefficient processes and implement practical 
          technological solutions that save time and improve data management.
        `,
      },
    ]

    const foundProject = projects.find((p) => p.id === params.id)
    setProject(foundProject)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Button onClick={() => router.push("/#projects")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 sm:px-6 max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6" onClick={() => router.push("/#projects")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="border-none shadow-lg bg-white dark:bg-gray-800 rounded-2xl overflow-hidden mb-8">
            <CardHeader className={`${project.iconBg} bg-opacity-30`}>
              <CardTitle className="text-3xl font-bold text-center">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-8">
                {project.videoUrl.endsWith(".mp4") ? (
                  <VideoPlayer src={project.videoUrl} />
                ) : (
                  <img
                    src={project.videoUrl}
                    alt={project.title}
                    className="block mx-auto w-3/4 h-auto rounded-lg"
                  />
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Overview</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Details</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{project.detailedDescription}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <Badge key={skill} className="rounded-full px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
               
                <div className="pt-4">
    {project.docsUrl ? (
      <Link href={project.docsUrl} target="_blank" rel="noopener noreferrer">
        <Button className="w-full sm:w-auto">
          Project Docs
        </Button>
      </Link>
    ) : (
      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
        <Button className="w-full sm:w-auto gap-2">
          <Github className="h-4 w-4" /> View Code on GitHub
        </Button>
      </Link>
    )}
  </div>

              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
