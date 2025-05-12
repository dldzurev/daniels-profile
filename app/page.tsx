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

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
        <ResumeButton />
        <ModeToggle />
      </div>

      <ScrollToTop />
      <Toaster />

      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <StatsBanner />
      <About />
      <Contact />
    </main>
  )
}
