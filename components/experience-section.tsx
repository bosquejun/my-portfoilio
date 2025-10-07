import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExperienceData } from "@/lib/content"
import { Briefcase } from "lucide-react"

interface ExperienceSectionProps {
  experience: ExperienceData[]
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-12 md:py-16">
      <div className="container px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Experience</h2>
        <div className="relative space-y-6">
          {/* Timeline line - hidden on mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-3 hidden md:block" />
          
          {experience.map((job, index) => (
            <div key={index} className="relative">
              {/* Timeline dot - hidden on mobile */}
              <div className="absolute left-0 top-6 w-6 h-6 rounded-full bg-primary border-4 border-background hidden md:block" />
              
              <Card className="md:ml-12">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 md:hidden">
                      <Briefcase className="h-5 w-5 text-primary mt-1" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg md:text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-sm md:text-base mt-1">
                        <span className="font-semibold">{job.company}</span> • {job.period}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                    {job.description.map((desc, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

