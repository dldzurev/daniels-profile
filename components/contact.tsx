"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send email using mailto link
      const mailtoLink = `mailto:dldzurev@uwaterloo.ca?subject=${encodeURIComponent(
        formData.subject,
      )}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`

      window.open(mailtoLink, "_blank")

      // Show success toast
      toast({
        title: "Message ready to send!",
        description:
          "Your email client has been opened with your message. Please send the email to complete the process.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      })

      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      // Show error toast
      toast({
        title: "Error preparing message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
        action: <ToastAction altText="Close">Close</ToastAction>,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="contact" className="section-shell">
      <div className="container px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <p className="circuit-kicker">Start a conversation</p>
            <h2 className="section-heading mb-0">Get In Touch</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[0.82fr_1.18fr] md:gap-8">
            <motion.div variants={itemVariants}>
              <Card className="sharp-card h-full">
                <CardHeader className="p-6 pb-4 md:p-8 md:pb-5">
                  <CardTitle className="text-2xl font-semibold tracking-[-0.03em] text-foreground">Contact Information</CardTitle>
                  <CardDescription>Feel free to reach out through any of these channels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1 px-3 pb-4 md:px-5 md:pb-6">
                  <div className="flex items-center rounded-xl px-3 py-3 transition-colors hover:bg-muted/70">
                    <div className="circuit-icon mr-4 p-2">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <Link
                        href="mailto:dldzurev@uwaterloo.ca"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        dldzurev@uwaterloo.ca
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center rounded-xl px-3 py-3 transition-colors hover:bg-muted/70">
                    <div className="circuit-icon mr-4 p-2">
                      <Linkedin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">LinkedIn</p>
                      <Link
                        href="https://linkedin.com/in/daniel-dzurevych-bbb448274"
                       
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        linkedin.com
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center rounded-xl px-3 py-3 transition-colors hover:bg-muted/70">
                    <div className="circuit-icon mr-4 p-2">
                      <Github className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">GitHub</p>
                      <Link
                        href="https://github.com/dldzurev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        github.com
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start rounded-xl px-3 py-3 transition-colors hover:bg-muted/70">
                    <div className="circuit-icon mr-4 p-2">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">Waterloo, Ontario, Canada</p>
                      <p className="font-medium">Toronto, Ontario, Canada</p>
                      <p className="font-medium">San Francisco, California, USA</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="sharp-card h-full">
                <CardHeader className="p-6 pb-4 md:p-8 md:pb-5">
                  <CardTitle className="text-2xl font-semibold tracking-[-0.03em] text-foreground">Send Me a Message</CardTitle>
                  <CardDescription>I'll get back to you as soon as possible</CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6 md:px-8 md:pb-8">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="h-11 rounded-lg border-border/80 bg-background/70 shadow-none focus-visible:ring-primary/25"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="h-11 rounded-lg border-border/80 bg-background/70 shadow-none focus-visible:ring-primary/25"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="h-11 rounded-lg border-border/80 bg-background/70 shadow-none focus-visible:ring-primary/25"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="min-h-[130px] rounded-lg border-border/80 bg-background/70 shadow-none focus-visible:ring-primary/25"
                      />
                    </div>

                    <Button type="submit" className="circuit-button h-11 w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
