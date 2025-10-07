import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SkillCategory } from "@/lib/content"

interface SkillsSectionProps {
  skills: SkillCategory[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-12 md:py-16 bg-muted/50">
      <div className="container px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Skills</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((category) => (
            <Card key={category.name}>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs md:text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

