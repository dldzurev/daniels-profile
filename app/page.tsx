import { ModeToggle } from "@/components/mode-toggle"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import ScrollToTop from "@/components/scroll-to-top"
import { Toaster } from "@/components/ui/toaster"
import StatsBanner from "@/components/stats-banner"
import ResumeButton from "@/components/resume-button"
import SectionTransition from "@/components/section-transition"
import ThreeDBackground from "@/components/3d-background"
import BackgroundPattern from "@/components/background-pattern"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* 3D Background for hero section only */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <ThreeDBackground />
      </div>

      {/* Background pattern for other sections */}
      <div className="fixed top-0 left-0 w-full h-screen -z-20">
        <BackgroundPattern />
      </div>

      <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
        <ResumeButton />
        <ModeToggle />
      </div>

      <ScrollToTop />
      <Toaster />

      <Hero />

      {/* Gradient transition div */}
      <div className="h-32 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900"></div>

      <SectionTransition bgClass="bg-gray-50 dark:bg-gray-900">
        <Experience />
      </SectionTransition>

      <SectionTransition bgClass="bg-white dark:bg-gray-800">
        <Projects />
      </SectionTransition>

      <SectionTransition bgClass="bg-gray-50 dark:bg-gray-900">
        <Skills />
      </SectionTransition>

      <SectionTransition bgClass="bg-white dark:bg-gray-800">
        <Education />
      </SectionTransition>

      <SectionTransition bgClass="bg-gray-50 dark:bg-gray-900">
        <StatsBanner />
      </SectionTransition>

      <SectionTransition bgClass="bg-white dark:bg-gray-800">
        <About />
      </SectionTransition>

      <SectionTransition bgClass="bg-gray-50 dark:bg-gray-900">
        <Contact />
      </SectionTransition>
    </main>
  )
}
