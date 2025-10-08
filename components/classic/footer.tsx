import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ProfileData } from "@/lib/content"
import { FOOTER_CONFIG } from "@/lib/footer-config"
import { Github, Linkedin, Mail } from "lucide-react"

interface FooterProps {
  profile: ProfileData
}

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="border-t">
      <div className="container px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col items-center justify-center gap-6 max-w-2xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {profile.email && (
              <Button variant="outline" size="icon" asChild>
                <a 
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            )}
            {profile.linkedin && (
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
            )}
            {profile.github && (
              <Button variant="outline" size="icon" asChild>
                <a 
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            )}
            {/* Download CV Button - Hidden */}
            {/* <Button variant="outline" size="icon" asChild>
              <a 
                href="/cv.pdf"
                download
                aria-label="Download CV"
              >
                <FileDown className="h-5 w-5" />
              </a>
            </Button> */}
          </div>
          
          <Separator className="w-full max-w-xs" />
          
          <div className="text-center text-xs md:text-sm text-muted-foreground">
            <p>{FOOTER_CONFIG.copyright(profile.name)}</p>
            {FOOTER_CONFIG.showWebsite && profile.website && (
              <p className="mt-1">
                <a 
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {profile.website.replace('https://', '')}
                </a>
              </p>
            )}
            <p className="mt-2 text-xs">{FOOTER_CONFIG.builtWith}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

