"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Typewriter from "typewriter-effect"

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-100 to-background dark:from-gray-900 dark:to-background"
        style={{
          opacity: Math.min(1, scrollY / 500),
        }}
      />

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-gray-100/50 dark:bg-gray-800/30 blur-3xl"
          style={{
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10 px-4 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
        >
          Daniel Dzurevych
        </motion.h1>

        <div className="h-12 mb-2">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString('<span class="text-2xl md:text-3xl font-medium">Computer Engineering Student and Builder</span>')
                .callFunction(() => {
                  document.querySelector(".second-typewriter")?.classList.remove("hidden")
                })
                .start()
            }}
            options={{
              cursor: "",
              delay: 50,
              html: true,
            }}
          />
        </div>

        <div className="h-10 mb-4 second-typewriter hidden">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  '<span class="text-lg md:text-xl text-muted-foreground">Passionate about building solutions to real problems line by line</span>',
                )
                .callFunction(() => {
                  document.querySelector(".buttons-container")?.classList.remove("opacity-0")
                })
                .start()
            }}
            options={{
              cursor: "",
              delay: 70,
              html: true,
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 buttons-container opacity-0"
        >
          <Button size="lg" className="rounded-full gap-2" onClick={() => scrollToSection("contact")}>
            <Mail className="h-4 w-4" />
            Contact Me
          </Button>
          <Button size="lg" className="rounded-full gap-2" onClick={() => scrollToSection("projects")}>
            View Projects
          </Button>
          <Button size="lg" className="rounded-full gap-2" onClick={() => scrollToSection("experience")}>
            View Work Experience
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center gap-4"
        >
          <div className="flex items-center justify-center">
            <Link href="https://linkedin.com/in/daniel-dzurevych-bbb448274" target="_blank" rel="noopener noreferrer">
              <div className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <Link href="https://github.com/dldzurev" target="_blank" rel="noopener noreferrer">
              <div className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <Link href="mailto:dldzurev@uwaterloo.ca">
              <div className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </div>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <div
        className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce cursor-pointer"
        onClick={() => scrollToSection("experience")}
      >
        <Button variant="ghost" size="icon" className="rounded-full">
          <ArrowDown className="h-6 w-6" />
          <span className="sr-only">Scroll Down</span>
        </Button>
      </div>
    </section>
  )
}
