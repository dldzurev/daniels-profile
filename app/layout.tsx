import type React from "react"
import "@/app/globals.css" 
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Daniel Dzurevych | Computer Engineer",
  description:
    "Daniel Dzurevych is a Computer Engineering student at the University of Waterloo focused on systems, networking, and embedded control.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
