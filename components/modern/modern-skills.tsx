"use client";

import { SkillCategory } from "@/lib/content";
import { motion } from "motion/react";
import { Container } from "./container";

interface ModernSkillsSectionProps {
  skills: SkillCategory[];
}

export function ModernSkillsSection({ skills }: ModernSkillsSectionProps) {
  return (
    <section id="skills" className="border-divide border-x py-16 md:py-20">
      <Container className="px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-12"
        >
          Skills & <span className="text-primary">Expertise</span>
        </motion.h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group h-full flex"
            >
              {/* Gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative border-divide border bg-background/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col flex-1">
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-foreground">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-auto">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs md:text-sm font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
