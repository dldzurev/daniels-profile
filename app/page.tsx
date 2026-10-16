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
import SectionTransition from "@/components/section-transition"
import BackgroundPattern from "@/components/background-pattern"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="fixed left-0 top-0 -z-20 h-screen w-full">
        <BackgroundPattern />
      </div>

      <ScrollToTop />
      <Toaster />

      <Hero />

      <SectionTransition>
        <Experience />
      </SectionTransition>

      <SectionTransition>
        <Projects />
      </SectionTransition>

      <SectionTransition>
        <Skills />
      </SectionTransition>

      <SectionTransition>
        <Education />
      </SectionTransition>

      <SectionTransition>
        <StatsBanner />
      </SectionTransition>

      <SectionTransition>
        <About />
      </SectionTransition>

      <SectionTransition>
        <Contact />
      </SectionTransition>

    </main>
  )
}
