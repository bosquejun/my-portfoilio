"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SkillCategory } from "@/lib/content"
import { motion } from "motion/react"

interface SkillsSectionProps {
  skills: SkillCategory[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-12 md:py-16 bg-gradient-to-b from-muted/60 to-muted/40">
      <div className="container px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-8"
        >
          Skills
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex"
            >
              <Card className="gap-3 flex flex-col flex-1 min-h-[220px] border border-border bg-background/80 hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex-0 [.border-b]:!pb-0">
                  <CardTitle className="text-base md:text-lg font-semibold flex items-center gap-2">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-start">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs md:text-sm bg-card border border-border font-medium px-2 py-1 rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
