"use client"

import { Button } from "@/components/ui/button"
import { ProfileData } from "@/lib/content"
import { Download, Github, Globe, Linkedin, Mail, MapPin } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"

interface HeroSectionProps {
  profile: ProfileData
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section id="about" className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5 dark:from-primary/10 dark:via-background dark:to-primary/10" />
      
      <div className="container relative px-4 md:px-8 pt-16">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-3 lg:gap-12 items-center">
          {/* Left Column - Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center lg:justify-end order-1 lg:order-1 col-span-1"
          >
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl" />
              
              {/* Photo container */}
              <div className="relative size-36 sm:size-48 md:size-56 lg:size-64">
                {profile.photo ? (
                  <Image
                    src={profile.photo}
                    alt={profile.name}
                    fill
                    priority
                    className="rounded-full object-cover border-4 border-background shadow-2xl"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center border-4 border-background shadow-2xl">
                    <span className="text-6xl md:text-8xl font-bold text-primary/80">
                      {profile.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Info */}
          <div className="flex flex-col gap-4 md:gap-6 text-center lg:text-left order-2 lg:order-2 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2 md:space-y-3"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {profile.name}
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-medium text-primary">
                {profile.title}
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                <span className="text-sm md:text-base">{profile.location}</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-base lg:text-lg leading-relaxed text-muted-foreground max-w-2xl"
            >
              {profile.summary}
            </motion.p>

            {/* Contact Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start"
            >
              {profile.email && (
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="hidden sm:inline">Email</span>
                  </a>
                </Button>
              )}
              
              {profile.linkedin && (
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </a>
                </Button>
              )}
              
              {profile.github && (
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                </Button>
              )}

              {profile.website && (
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">Website</span>
                  </a>
                </Button>
              )}
            </motion.div>

            {/* Download CV Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2"
            >
              <Button size="lg" asChild className="w-full sm:w-auto">
                <a 
                  href="/cv.pdf"
                  download
                  className="flex items-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download CV</span>
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
