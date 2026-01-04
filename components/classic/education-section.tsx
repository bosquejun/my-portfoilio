"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EducationData } from "@/lib/content"
import { GraduationCap } from "lucide-react"
import { motion } from "motion/react"

interface EducationSectionProps {
  education: EducationData
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-12 md:py-16 bg-muted/50">
      <div className="container px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-8"
        >
          Education
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-background/80">
          <CardHeader>
            <div className="flex items-start gap-3">
              <GraduationCap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <CardTitle className="text-lg md:text-xl">{education.degree}</CardTitle>
                <CardDescription className="text-sm md:text-base mt-1">
                  {education.school} • {education.period}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          {/* <CardContent>
            <div className="space-y-2 text-sm md:text-base text-muted-foreground">
              <p className="font-semibold">Languages:</p>
              <p>{education.languages.join(" • ")}</p>
            </div>
          </CardContent> */}
        </Card>
        </motion.div>
      </div>
    </section>
  )
}

