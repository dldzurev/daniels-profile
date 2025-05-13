"use client"

import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export default function ResumeButton() {
  const handleDownload = () => {
    // Create a link element
    const link = document.createElement("a")

    // Set the href to the resume file
    link.href = "Daniels Intern 2025 Resume.pdf"

    // Set the download attribute to suggest a filename
    link.download = "Daniel_Dzurevych_Resume.pdf"

    // Append to the document
    document.body.appendChild(link)

    // Trigger the download
    link.click()

    // Clean up
    document.body.removeChild(link)
  }

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      size="sm"
      className="gap-2 rounded-full bg-background/80 backdrop-blur-sm border-2"
    >
      <FileText className="h-4 w-4" />
      Resume
    </Button>
  )
}
