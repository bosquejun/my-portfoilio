import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ProfileData } from "@/lib/content"
import { Linkedin, Mail } from "lucide-react"

interface FooterProps {
  profile: ProfileData
}

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="border-t">
      <div className="container px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <a 
                href={`mailto:${profile.email}`}
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a 
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
          
          <Separator className="w-full max-w-xs" />
          
          <div className="text-center text-xs md:text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
            <p className="mt-2">Built with Next.js, Shadcn UI & TailwindCSS</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

