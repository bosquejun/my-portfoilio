"use client";

import { ProfileData } from "@/lib/content";
import { Download, Github, Globe, Linkedin, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ModernButton } from "./button";
import { Container } from "./container";
import { Heading } from "./heading";
import { MeshGradient } from "./mesh-gradient";
import { SubHeading } from "./subheading";

interface ModernHeroProps {
  profile: ProfileData;
}

export const ModernHero = ({ profile }: ModernHeroProps) => {
  return (
    <section className="relative border-divide border-x -mt-16" id="about">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 dark:block hidden">
        <MeshGradient
          // colors={["hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--primary))"]}
          speed={0.5}
        />
      </div>

      <Container className="relative flex flex-col items-center justify-center px-4 pt-36 pb-16 md:pt-36 md:pb-32">
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
            {profile.photo ? (
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                priority
                className="rounded-full object-cover border-4 border-border shadow-2xl"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary shadow-2xl">
                <span className="text-5xl md:text-7xl font-bold text-primary">
                  {profile.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Name and Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-2 md:space-y-4"
        >
          <Heading className="mt-4 space-y-4">
            {profile.name.split(" ").slice(0, 2).join(" ")}
          </Heading>
          <SubHeading className="!text-primary">
            {profile.title}
          </SubHeading>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 flex items-center gap-2 text-muted-foreground"
        >
          <MapPin className="h-4 w-4" />
          <span className="text-sm md:text-base">{profile.location}</span>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SubHeading className="mx-auto mt-6 max-w-2xl">
            {profile.summary}
          </SubHeading>
        </motion.div>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {profile.email && (
            <ModernButton variant="secondary" as={Link} href={`mailto:${profile.email}`}>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Email</span>
              </div>
            </ModernButton>
          )}
          
          {profile.linkedin && (
            <ModernButton
              variant="secondary"
              as={Link}
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </div>
            </ModernButton>
          )}
          
          {profile.github && (
            <ModernButton
              variant="secondary"
              as={Link}
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <span className="hidden sm:inline">GitHub</span>
              </div>
            </ModernButton>
          )}

          {profile.website && (
            <ModernButton
              variant="secondary"
              as={Link}
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Website</span>
              </div>
            </ModernButton>
          )}
        </motion.div>

        {/* Download CV Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6"
        >
          <ModernButton as={Link} href="/cv.pdf" download className="px-8">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              <span>Download CV</span>
            </div>
          </ModernButton>
        </motion.div>
      </Container>
    </section>
  );
};
