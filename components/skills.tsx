"use client"


import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const programmingSkills = [
    "Python",
    "C++",
    "SQL",
    "HTML/CSS",
    "JavaScript",
    "C#",
    "RISC-V",
    "VHDL",
  ]

  const technologiesSkills = [
    "Jupyter Notebooks",
    "Pandas",
    "Scikit-learn",
    "Docker",
    "Google Cloud (GCP)",
    "Fast API",
    "Vertex AI",
    "Git/Gitlab",
    "Linux",
    "BigQuery",
    "Deepeval",
  ]

  const softSkills = [
    "Problem Solving",
    "Team Collaboration",
    "Communication",
    "Project Management",
    "Time Management",
    "Leadership",
    "Adaptability",
    "Attention to Detail",
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
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-center">
            Skills & Technologies
          </motion.h2>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-none shadow-lg bg-background rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl text-center">Technical Proficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="programming" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="programming">Programming</TabsTrigger>
                    <TabsTrigger value="technologies">Technologies</TabsTrigger>
                    <TabsTrigger value="soft">Soft Skills</TabsTrigger>
                  </TabsList>

                  <TabsContent value="programming" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                      {programmingSkills.map((name) => (
                        <div key={name} className="flex justify-center p-4 rounded-xl bg-muted/30">
                          <span className="font-medium">{name}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="technologies" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                      {technologiesSkills.map((name) => (
                        <div key={name} className="flex justify-center p-4 rounded-xl bg-muted/30">
                          <span className="font-medium">{name}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="soft" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                      {softSkills.map((name) => (
                        <div key={name} className="flex justify-center p-4 rounded-xl bg-muted/30">
                          <span className="font-medium">{name}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/*
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const programmingSkills = [
    { name: "Python", level: "Advanced", category: "Languages" },
    { name: "C++", level: "Advanced", category: "Languages" },
    { name: "SQL", level: "Intermediate", category: "Languages" },
    { name: "HTML/CSS", level: "Intermediate", category: "Languages" },
    { name: "JavaScript", level: "Intermediate", category: "Languages" },
    { name: "C#", level: "Intermediate", category: "Languages" },
    { name: "RISC-V", level: "Intermediate", category: "Languages" },
    { name: "VHDL", level: "Basic", category: "Languages" },
  ]

  const technologiesSkills = [
    { name: "Jupyter Notebooks", level: "Advanced", category: "Data Science" },
    { name: "Pandas", level: "Advanced", category: "Data Science" },
    { name: "Scikit-learn", level: "Advanced", category: "Data Science" },
    { name: "Docker", level: "Intermediate", category: "DevOps" },
    { name: "Google Cloud (GCP)", level: "Intermediate", category: "Cloud" },
    { name: "Fast API", level: "Intermediate", category: "Backend" },
    { name: "Vertex AI", level: "Intermediate", category: "AI" },
    { name: "Git/Gitlab", level: "Advanced", category: "DevOps" },
    { name: "Linux", level: "Intermediate", category: "OS" },
    { name: "BigQuery", level: "Intermediate", category: "Data" },
    { name: "Deepeval", level: "Intermediate", category: "AI" },
  ]

  const softSkills = [
    { name: "Problem Solving", category: "Technical" },
    { name: "Team Collaboration", category: "Interpersonal" },
    { name: "Communication", category: "Interpersonal" },
    { name: "Project Management", category: "Management" },
    { name: "Time Management", category: "Management" },
    { name: "Leadership", category: "Management" },
    { name: "Adaptability", category: "Personal" },
    { name: "Attention to Detail", category: "Technical" },
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

  const getLevelColor = (level) => {
    switch (level) {
      case "Advanced":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "Intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "Basic":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      Languages: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
      "Data Science": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
      DevOps: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      Cloud: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100",
      Backend: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
      AI: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
      OS: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
      Data: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
      Technical: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100",
      Interpersonal: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-100",
      Management: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
      Personal: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100",
    }
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
  }

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-center">
            Skills & Technologies
          </motion.h2>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-none shadow-lg bg-background rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl text-center">Technical Proficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="programming" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="programming">Programming</TabsTrigger>
                    <TabsTrigger value="technologies">Technologies</TabsTrigger>
                    <TabsTrigger value="soft">Soft Skills</TabsTrigger>
                  </TabsList>

                  <TabsContent value="programming" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                      {programmingSkills.map((skill) => (
                        <div key={skill.name} className="flex flex-col items-center p-4 rounded-xl bg-muted/30">
                          <span className="font-medium mb-2">{skill.name}</span>
                          <div className="flex gap-2 mt-1">
                            <Badge className={`text-xs ${getLevelColor(skill.level)}`}>{skill.level}</Badge>
                            <Badge className={`text-xs ${getCategoryColor(skill.category)}`}>{skill.category}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="technologies" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                      {technologiesSkills.map((skill) => (
                        <div key={skill.name} className="flex flex-col items-center p-4 rounded-xl bg-muted/30">
                          <span className="font-medium mb-2">{skill.name}</span>
                          <div className="flex gap-2 mt-1">
                            <Badge className={`text-xs ${getLevelColor(skill.level)}`}>{skill.level}</Badge>
                            <Badge className={`text-xs ${getCategoryColor(skill.category)}`}>{skill.category}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="soft" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                      {softSkills.map((skill) => (
                        <div key={skill.name} className="flex flex-col items-center p-4 rounded-xl bg-muted/30">
                          <span className="font-medium mb-2">{skill.name}</span>
                          <Badge className={`text-xs ${getCategoryColor(skill.category)}`}>{skill.category}</Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
*/