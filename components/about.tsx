"use client"

import { Badge } from "@/components/ui/badge"

export default function About() {
  return (
    <section id="about" className="section-shell">
      <div className="container px-4">
        <div className="mx-auto grid max-w-6xl gap-8 border-y border-primary/25 py-10 md:grid-cols-[0.7fr_1.3fr] md:items-center md:py-14">
          <div>
            <p className="circuit-kicker">Off the clock</p>
            <h2 className="section-heading mb-0">Other Interests</h2>
          </div>
          <div className="flex flex-wrap gap-2">
              {[
                "Marathon Running | 3:29",
                "Powerlifting",
                "Skiing",
                "Piano",
                "Investing",
              ].map((interest) => (
                <Badge
                  key={interest}
                  className="circuit-chip px-3 py-1 text-sm hover:bg-primary/10"
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
