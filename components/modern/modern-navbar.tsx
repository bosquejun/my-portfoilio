"use client";

import { ProfileData } from "@/lib/content";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useState } from "react";
import { ThemeToggle } from "../theme-toggle";
import { Container } from "./container";

// Centralize nav items for easier maintenance
const NAV_ITEMS = [
  { title: "About", href: "#about" },
  { title: "Skills", href: "#skills" },
  { title: "Experience", href: "#experience" },
  { title: "Education", href: "#education" },
];

interface ModernNavbarProps {
  profile: ProfileData;
}

export const ModernNavbar = ({ profile }: ModernNavbarProps) => (
  <Container as="nav" className="z-10 w-full">
    <FloatingNav items={NAV_ITEMS} name={profile.name} />
    <DesktopNav items={NAV_ITEMS} name={profile.name} photo={profile.photo} />
    <MobileNav items={NAV_ITEMS} name={profile.name} />
  </Container>
);

const getFirstName = (name: string) => name.split(" ")[0] || name;

import { useEffect, useRef } from "react";

const MobileNav = ({
  items,
  name,
}: {
  items: { title: string; href: string }[];
  name: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Listen for scroll to toggle background/blur
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 8) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  }, []);

  const scrollToSection = useCallback(
    (href: string) => {
      const element = document.querySelector(href);
      if (element) {
        // Different offsets for mobile navigation
        const isMobile = window.innerWidth < 768;
        const headerOffset = isMobile ? 100 : 100; // Consistent for modern template
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        setIsOpen(false);
      }
    },
    []
  );

  return (
    <div
      ref={navRef}
      className={[
        "fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-2 md:hidden transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border"
          : "bg-transparent",
      ].join(" ")}
      style={{ WebkitBackdropFilter: scrolled ? "blur(12px)" : undefined, backdropFilter: scrolled ? "blur(12px)" : undefined }}
    >
      <button
        onClick={handleScrollToTop}
        className="text-lg font-bold tracking-tight hover:text-primary transition-colors"
        aria-label="Scroll to top"
      >
        {getFirstName(name)}
      </button>
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="shadow-aceternity flex size-6 flex-col items-center justify-center rounded-md"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <Menu className="size-4 shrink-0 text-gray-600" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] h-full w-full bg-white shadow-lg dark:bg-neutral-900"
          >
            <div className="absolute right-4 bottom-4">
              <ThemeToggle />
            </div>

            <div className="flex items-center justify-between p-2">
              <button
                onClick={handleScrollToTop}
                className="text-lg font-bold tracking-tight hover:text-primary transition-colors"
                aria-label="Scroll to top"
              >
                {getFirstName(name)}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="shadow-aceternity flex size-6 flex-col items-center justify-center rounded-md"
                aria-label="Close menu"
              >
                <X className="size-4 shrink-0 text-gray-600" />
              </button>
            </div>
            <nav className="divide-divide border-divide mt-6 flex flex-col divide-y border-t" aria-label="Mobile navigation">
              {items.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-2 font-medium text-gray-600 transition duration-200 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-neutral-300 text-left"
                  aria-label={`Go to ${item.title}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                  >
                    {item.title}
                  </motion.div>
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DesktopNav = ({
  items,
}: {
  items: { title: string; href: string }[];
  name: string;
  photo?: string;
}) => {
  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80; // Height of header + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  return (
    <div className="hidden md:flex h-16 w-full bg-transparent items-center" aria-label="Desktop navigation">
      {/* Left: First name button */}
      <div className="flex flex-1 items-center">
        {/* <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
          aria-label="Scroll to top"
        >
          <Avatar>
            <AvatarImage
              src={photo}
              alt={name}
            />
            <AvatarFallback>
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </button> */}
      </div>
      {/* Center: Nav items */}
      <div className="flex flex-1 justify-center items-center gap-10">
        {items.map((item) => (
          <button
            key={item.title}
            onClick={() => scrollToSection(item.href)}
            className="font-medium text-gray-600 transition duration-200 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-neutral-300"
            aria-label={`Go to ${item.title}`}
          >
            {item.title}
          </button>
        ))}
      </div>
      {/* Right: Theme toggle */}
      <div className="flex flex-1 justify-end items-center gap-2">
        <ThemeToggle />
      </div>
    </div>
  );
};

const FloatingNav = ({
  items,
  name,
}: {
  items: { title: string; href: string }[];
  name: string;
}) => {
  const { scrollY } = useScroll();
  const springConfig = {
    stiffness: 300,
    damping: 30,
  };
  const y = useSpring(
    useTransform(scrollY, [100, 120], [-100, 10]),
    springConfig,
  );

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 100; // Height of floating nav + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  return (
    <motion.nav
      style={{ y }}
      className="shadow-aceternity fixed inset-x-0 top-0 z-50 mx-auto hidden max-w-[calc(80rem-4rem)] items-center justify-between bg-white/80 px-8 py-4 backdrop-blur-sm md:flex xl:rounded-2xl border-l border-r border-divide dark:bg-neutral-900/80 dark:shadow-[0px_2px_0px_0px_var(--color-neutral-800),0px_-2px_0px_0px_var(--color-neutral-800)]"
      aria-label="Floating navigation"
    >
      <div className="flex items-center gap-12">
        {items.map((item) => (
          <button
            key={item.title}
            onClick={() => scrollToSection(item.href)}
            className="font-medium text-gray-600 px-2 py-1 transition duration-200 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-neutral-300"
            aria-label={`Go to ${item.title}`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="absolute right-6 flex items-center gap-3">
        <ThemeToggle />
      </div>
    </motion.nav>
  );
};
