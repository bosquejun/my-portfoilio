import { EducationSection } from "@/components/classic/education-section";
import { ExperienceSection } from "@/components/classic/experience-section";
import { Footer } from "@/components/classic/footer";
import { HeaderV2 } from "@/components/classic/header-v2";
import { HeroSection } from "@/components/classic/hero-section";
import { SkillsSection } from "@/components/classic/skills-section";
import { EducationData, ExperienceData, ProfileData, SkillCategory } from "@/lib/content";

interface ClassicTemplateProps {
  profile: ProfileData;
  skills: SkillCategory[];
  experience: ExperienceData[];
  education: EducationData;
}

export function ClassicTemplate({ profile, skills, experience, education }: ClassicTemplateProps) {
  return (
    <>
      <HeaderV2 profile={profile} />
      <main className="flex-1">
        <HeroSection profile={profile} />
        <SkillsSection skills={skills} />
        <ExperienceSection experience={experience} />
        <EducationSection education={education} />
      </main>
      <Footer profile={profile} />
    </>
  );
}

export default ClassicTemplate;
