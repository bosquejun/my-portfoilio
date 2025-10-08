import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'content')

export interface ProfileData {
  name: string
  title: string
  location: string
  email: string
  phone?: string
  linkedin: string
  github: string
  website?: string
  summary: string
}

export interface SkillCategory {
  name: string
  skills: string[]
}

export interface ExperienceData {
  title: string
  company: string
  period: string
  order: number
  description: string[]
}

export interface EducationData {
  degree: string
  school: string
  period: string
  languages: string[]
}

export function getProfile(): ProfileData {
  const fullPath = path.join(contentDirectory, 'profile.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    name: data.name,
    title: data.title,
    location: data.location,
    email: data.email,
    phone: data.phone,
    linkedin: data.linkedin,
    github: data.github,
    website: data.website,
    summary: content.replace(/^#\s+About Me\s+/m, '').trim()
  }
}

export function getSkills(): SkillCategory[] {
  const fullPath = path.join(contentDirectory, 'skills.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContents)
  
  return data.categories as SkillCategory[]
}

export function getExperience(): ExperienceData[] {
  const experienceDirectory = path.join(contentDirectory, 'experience')
  const fileNames = fs.readdirSync(experienceDirectory)
  
  const experiences = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const fullPath = path.join(experienceDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      // Parse bullet points from markdown content
      const description = content
        .trim()
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^-\s*/, '').trim())
      
      return {
        title: data.title,
        company: data.company,
        period: data.period,
        order: data.order,
        description
      }
    })
    .sort((a, b) => a.order - b.order)
  
  return experiences
}

export function getEducation(): EducationData {
  const fullPath = path.join(contentDirectory, 'education.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContents)
  
  return {
    degree: data.degree,
    school: data.school,
    period: data.period,
    languages: data.languages
  }
}

