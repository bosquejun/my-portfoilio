"use client";

import { ExperienceData } from "@/lib/content";
import { motion } from "motion/react";
import { TracingBeam } from "../tracing-beam";
import { Container } from "./container";

interface ModernExperienceSectionProps {
  experience: ExperienceData[];
}

export function ModernExperienceSection({ experience }: ModernExperienceSectionProps) {
  return (
    <section id="experience" className="border-divide border-x py-16 md:py-20 bg-muted/30">
      <Container className="px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-12"
        >
          Professional <span className="text-primary">Experience</span>
        </motion.h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line - hidden on mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-px  hidden md:block" />
          
          <TracingBeam>
          <div className="space-y-8 md:ml-0 ml-8">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline dot - hidden on mobile */}
                {/* <div className="absolute left-0 top-8 w-12 h-12 rounded-full bg-primary/10 border-4 border-background hidden md:flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div> */}
                
                <div className="border bg-background/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start gap-3 mb-4">
                    {/* <div className="flex-shrink-0 md:hidden">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                    </div> */}
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-foreground">
                        {job.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground mt-1">
                        <span className="font-semibold">{job.company}</span> • {job.period}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                    {job.description.map((desc, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
          </TracingBeam>
        </div>
      </Container>
    </section>
  );
}
