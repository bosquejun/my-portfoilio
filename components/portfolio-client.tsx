"use client";

import { BackToTop } from "@/components/back-to-top";
import { TemplateSwitcher } from "@/components/template-switcher";
import { EducationData, ExperienceData, ProfileData, SkillCategory } from "@/lib/content";
import { DEFAULT_TEMPLATE, TemplateType } from "@/lib/template-config";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

interface PortfolioClientProps {
  profile: ProfileData;
  skills: SkillCategory[];
  experience: ExperienceData[];
  education: EducationData;
}

// Dynamic imports for code splitting - only load the template being used
const ClassicTemplate = dynamic(() => import("./classic"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  ),
});

const ModernTemplate = dynamic(() => import("./modern"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  ),
});

export function PortfolioClient({ profile, skills, experience, education }: PortfolioClientProps) {                 
  const [currentTemplate, setCurrentTemplate] = useState<TemplateType>(DEFAULT_TEMPLATE);
  const [mounted, setMounted] = useState(false);

  // Load template preference from localStorage
  useEffect(() => {
    const savedTemplate = localStorage.getItem("portfolio-template") as TemplateType;
    if (savedTemplate && (savedTemplate === "classic" || savedTemplate === "modern")) {
      setCurrentTemplate(savedTemplate);
    }
    setMounted(true);
  }, []);

  // Save template preference to localStorage
  const handleTemplateChange = (template: TemplateType) => {
    setCurrentTemplate(template);
    localStorage.setItem("portfolio-template", template);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {currentTemplate === "classic" ? (
        <ClassicTemplate
          profile={profile}
          skills={skills}
          experience={experience}
          education={education}
        />
      ) : (
        <ModernTemplate
          profile={profile}
          skills={skills}
          experience={experience}
          education={education}
        />
      )}
      
      <BackToTop />
      <TemplateSwitcher
        currentTemplate={currentTemplate}
        onTemplateChange={handleTemplateChange}
      />
    </div>
  );
}
