export type Skill = {
  label: string
  type: "technical" | "tool" | "language" | "soft"
  level?: string
  certified?: boolean
  cert?: {
    issuer: string
    name: string
    date: string
    url?: string
    score?: string
    image?: string
  }
  usage?: string
  notes?: string
}
// Data is now stored in backend/skills.json for consistency with
// hero, experience, and projects.
