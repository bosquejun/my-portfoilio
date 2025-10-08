"use client";

import { EducationData } from "@/lib/content";
import { GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "./container";

interface ModernEducationSectionProps {
  education: EducationData;
}

export function ModernEducationSection({ education }: ModernEducationSectionProps) {
  return (
    <section id="education" className="border-divide border-x py-16 md:py-20">
      <Container className="px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-12"
        >
            <span className="text-primary">Education</span>
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative group">
            {/* Gradient background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative border-divide border bg-background/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    {education.degree}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mt-1">
                    {education.school} • {education.period}
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-semibold text-foreground">Languages:</p>
                    <div className="flex flex-wrap gap-2">
                      {education.languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-3 py-1.5 text-xs md:text-sm font-medium bg-secondary text-secondary-foreground rounded-lg"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
