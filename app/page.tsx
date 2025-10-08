import { PortfolioClient } from "@/components/portfolio-client";
import { getEducation, getExperience, getProfile, getSkills } from "@/lib/content";

export default function Home() {
  const profile = getProfile();
  const skills = getSkills();
  const experience = getExperience();
  const education = getEducation();

  return (
    <PortfolioClient
      profile={profile}
      skills={skills}
      experience={experience}
      education={education}
    />
  );
}
