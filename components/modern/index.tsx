import { DivideX } from "@/components/modern/divider";
import { ModernEducationSection } from "@/components/modern/modern-education";
import { ModernExperienceSection } from "@/components/modern/modern-experience";
import { ModernFooter } from "@/components/modern/modern-footer";
import { ModernHero } from "@/components/modern/modern-hero";
import { ModernNavbar } from "@/components/modern/modern-navbar";
import { ModernSkillsSection } from "@/components/modern/modern-skills";
import { EducationData, ExperienceData, ProfileData, SkillCategory } from "@/lib/content";

interface ModernTemplateProps {
  profile: ProfileData;
  skills: SkillCategory[];
  experience: ExperienceData[];
  education: EducationData;
}

export function ModernTemplate({ profile, skills, experience, education }: ModernTemplateProps) {
  return (
    <>
      <ModernNavbar profile={profile} />
      <main className="flex-1">
        <ModernHero profile={profile} />
        <DivideX />
        <ModernSkillsSection skills={skills} />
        <DivideX />
        <ModernExperienceSection experience={experience} />
        <DivideX />
        <ModernEducationSection education={education} />
        <DivideX />
      </main>
      <ModernFooter profile={profile} />
    </>
  );
}

export default ModernTemplate;
