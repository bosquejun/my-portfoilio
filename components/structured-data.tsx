import {
  EducationData,
  ExperienceData,
  ProfileData,
  SkillCategory,
} from "@/lib/content";

interface StructuredDataProps {
  profile: ProfileData;
  skills: SkillCategory[];
  experience: ExperienceData[];
  education: EducationData;
}

export function StructuredData({
  profile,
  skills,
  experience,
  education,
}: StructuredDataProps) {
  const siteUrl = profile.website || "https://jun.is-a.dev";

  // Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: profile.email,
    url: siteUrl,
    image: profile.photo ? `${siteUrl}${profile.photo}` : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    sameAs: [
      profile.linkedin,
      profile.github,
      ...(profile.website ? [profile.website] : []),
    ],
    knowsLanguage: profile.languages.map((lang) => lang.name),
    description: profile.summary,
  };

  // Professional Profile Schema
  const professionalSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
      description: profile.summary,
    },
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} Portfolio`,
    url: siteUrl,
    description: profile.summary,
    author: {
      "@type": "Person",
      name: profile.name,
    },
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${siteUrl}#about`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Skills",
        item: `${siteUrl}#skills`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Experience",
        item: `${siteUrl}#experience`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Education",
        item: `${siteUrl}#education`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Contact",
        item: `${siteUrl}#contact`,
      },
    ],
  };

  // Organization Schema (for work experience) - kept for future use
  // const organizations = experience.map((exp) => ({
  //   "@context": "https://schema.org",
  //   "@type": "Organization",
  //   name: exp.company,
  // }));

  // JobPosting/WorkRole Schema for experience
  const workRoles = experience.map((exp) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: exp.title,
    hiringOrganization: {
      "@type": "Organization",
      name: exp.company,
    },
    employmentType: "FULL_TIME",
    description: exp.description.join(" "),
  }));

  // Educational Credential Schema
  const educationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    educationalLevel: education.degree,
    recognizedBy: {
      "@type": "EducationalOrganization",
      name: education.school,
    },
    dateCreated: education.period,
  };

  // Aggregate all skills
  const allSkills = skills.flatMap((category) => category.skills);

  // Person with detailed skills
  const personWithSkills = {
    ...personSchema,
    knowsAbout: allSkills,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: education.school,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personWithSkills) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {workRoles.map((role, index) => (
        <script
          key={`work-role-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(role) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationSchema) }}
      />
    </>
  );
}
