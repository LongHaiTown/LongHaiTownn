import fs from "fs"
import path from "path"

export function readJson<T>(relativePath: string): T {
  const filePath = path.join(process.cwd(), "backend", relativePath)
  const raw = fs.readFileSync(filePath, "utf8")
  return JSON.parse(raw) as T
}
