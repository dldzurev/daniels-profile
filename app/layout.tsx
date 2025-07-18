import type React from "react"
import "@/app/globals.css" 
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {

  title: "Daniel Dzurevych - Computer Engineering @ UWaterloo",

  description:
    "Portfolio website of Daniel Dzurevych, a Computer Engineering student at the University of Waterloo",
    generator: 'v0.dev'
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
