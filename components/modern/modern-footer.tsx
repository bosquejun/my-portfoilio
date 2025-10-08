"use client";

import { ProfileData } from "@/lib/content";
import { FOOTER_CONFIG } from "@/lib/footer-config";
import { Github, Globe, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "./container";

interface ModernFooterProps {
  profile: ProfileData;
}

export function ModernFooter({ profile }: ModernFooterProps) {
  return (
    <footer className="border-divide border-x border-t">
      <Container className="px-4 md:px-8 py-12 md:py-16">
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="w-12 h-12 rounded-full border-divide border bg-background/50 backdrop-blur-sm flex items-center justify-center hover:bg-muted transition-colors shadow-sm hover:shadow-md"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border-divide border bg-background/50 backdrop-blur-sm flex items-center justify-center hover:bg-muted transition-colors shadow-sm hover:shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border-divide border bg-background/50 backdrop-blur-sm flex items-center justify-center hover:bg-muted transition-colors shadow-sm hover:shadow-md"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border-divide border bg-background/50 backdrop-blur-sm flex items-center justify-center hover:bg-muted transition-colors shadow-sm hover:shadow-md"
                aria-label="Website"
              >
                <Globe className="h-5 w-5" />
              </a>
            )}
          </motion.div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-divide" />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-footer-link space-y-2"
          >
            <p>{FOOTER_CONFIG.copyright(profile.name)}</p>
            {FOOTER_CONFIG.showWebsite && profile.website && (
              <p>
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
            <p className="text-xs">
              {FOOTER_CONFIG.builtWith}
            </p>
          </motion.div>
        </div>
      </Container>
    </footer>
  );
}
