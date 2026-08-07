import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export default function ResumeButton() {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="circuit-button-secondary gap-2 bg-background/80 backdrop-blur-sm"
    >
      <a href="/Daniel_Dzurevych_Resume.pdf" download="Daniel_Dzurevych_Resume.pdf">
        <FileText className="h-4 w-4" />
        Resume
      </a>
    </Button>
  )
}
