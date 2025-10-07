import { AboutSection } from "@/components/about-section"
import { EducationSection } from "@/components/education-section"
import { ExperienceSection } from "@/components/experience-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { SkillsSection } from "@/components/skills-section"
import { getEducation, getExperience, getProfile, getSkills } from "@/lib/content"

export default function Home() {
  const profile = getProfile()
  const skills = getSkills()
  const experience = getExperience()
  const education = getEducation()

  return (
    <div className="min-h-screen flex flex-col">
      <Header profile={profile} />
      <main className="flex-1">
        <AboutSection profile={profile} />
        <SkillsSection skills={skills} />
        <ExperienceSection experience={experience} />
        <EducationSection education={education} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
