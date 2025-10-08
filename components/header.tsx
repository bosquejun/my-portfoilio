"use client"

import { ProfileData } from "@/lib/content"
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

interface HeaderProps {
  profile: ProfileData
}

export function Header({ profile }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex flex-col">
          <h1 className="text-lg md:text-2xl font-bold tracking-tight">{profile.name}</h1>
          <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">{profile.title}</p>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          {/* Download CV Buttons - Hidden */}
          {/* <Button variant="default" size="sm" asChild className="hidden sm:flex">
            <a 
              href="/cv.pdf"
              download
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span>Download CV</span>
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild className="sm:hidden">
            <a 
              href="/cv.pdf"
              download
              aria-label="Download CV"
            >
              <Download className="h-4 w-4" />
            </a>
          </Button> */}
          <ThemeToggle />
        </div>
      </div>
      <div className="border-b">
        <div className="container px-4 md:px-8 py-3">
          <div className="flex flex-wrap gap-3 md:gap-6 text-xs md:text-sm text-muted-foreground">
            {Boolean(profile.email) && (
              <a 
                href={`mailto:${profile.email}`} 
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Mail className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                <span className="hidden sm:inline">{profile.email}</span>
              </a>
            )}
            {
                Boolean(profile.phone) &&  <a 
                href={`tel:${profile.phone}`} 
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Phone className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                <span className="hidden sm:inline">{profile.phone}</span>
              </a>
            }
           
            {Boolean(profile.location) && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                <span className="hidden sm:inline">{profile.location}</span>
              </div>
            )}
            {Boolean(profile.linkedin) && (
              <a 
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            )}
            {
                Boolean(profile.github) && (
                    <a 
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                        <Github className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                        <span className="hidden sm:inline">GitHub</span>
                    </a>
                )
            }
          </div>
        </div>
      </div>
    </header>
  )
}

