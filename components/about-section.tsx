import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileData } from "@/lib/content"

interface AboutSectionProps {
  profile: ProfileData
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="py-12 md:py-16">
      <div className="container px-4 md:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              {profile.summary}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

