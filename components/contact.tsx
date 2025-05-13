"use client"

import { useState } from "react"
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
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
    <section id="contact" className="py-20">
      <div className="container px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-center">
            Get In Touch
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div variants={itemVariants}>
              <Card className="h-full overflow-hidden border-none shadow-lg bg-background rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                  <CardDescription>Feel free to reach out through any of these channels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-primary/10 mr-4">
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

                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-primary/10 mr-4">
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
                        linkedin.com/in/daniel
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-primary/10 mr-4">
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

                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-primary/10 mr-4">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">Waterloo, Ontario, Canada</p>
                      <p className="font-medium">Toronto, Ontario, Canada</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full overflow-hidden border-none shadow-lg bg-background rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl">Send Me a Message</CardTitle>
                  <CardDescription>I'll get back to you as soon as possible</CardDescription>
                </CardHeader>
                <CardContent>
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
                          className="rounded-lg"
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
                          className="rounded-lg"
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
                        className="rounded-lg"
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
                        className="min-h-[120px] rounded-lg"
                      />
                    </div>

                    <Button type="submit" className="w-full rounded-lg" disabled={isSubmitting}>
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
