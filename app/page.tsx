import fs from "fs"
import path from "path"
import { CVLanding } from "@/components/cv-landing"
import { readJson } from "@/lib/backend"
import type { Skill } from "@/data/skills"

type HeroContent = {
  name: string
  title: string
  summary: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}
type ExperienceItem = { title: string; company: string; period: string; desc: string }
type Project = { title: string; desc: string; tags: string[]; image: string; blogSlug?: string }

export default function Page() {
  const avatarsDir = path.join(process.cwd(), "public", "images", "my_avatars")
  let avatars: string[] = []

  if (fs.existsSync(avatarsDir)) {
    avatars = fs
      .readdirSync(avatarsDir)
      .filter((name) => name.match(/\.(png|jpe?g|webp|avif|gif)$/i))
      .map((name) => `/images/my_avatars/${name}`)
  }

  const hero = readJson<HeroContent>("hero.json")
  const skills = readJson<Skill[]>("skills.json")
  const experience = readJson<ExperienceItem[]>("experience.json")
  const projects = readJson<Project[]>("projects.json")

  return (
    <CVLanding
      avatars={avatars}
      hero={hero}
      skills={skills}
      experience={experience}
      projects={projects}
    />
  )

}
