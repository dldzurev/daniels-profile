"use client"

import { Badge } from "@/components/ui/badge"

export default function About() {
  return (
    <section id="about" className="section-shell">
      <div className="container px-4">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-xl md:grid-cols-[0.7fr_1.3fr] md:items-center md:p-10">
          <div>
            <p className="circuit-kicker">Off the clock</p>
            <h2 className="section-heading mb-0">Other Interests</h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
              {[
                "Marathon Running | 3:29",
                "Powerlifting",
                "Skiing",
                "Piano",
                "Investing",
              ].map((interest) => (
                <Badge
                  key={interest}
                  className="circuit-chip cursor-default px-3.5 py-2 text-sm hover:-translate-y-0.5 hover:bg-primary/10"
                >
                  {interest}
                </Badge>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
