import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMeta {
  slug: string
  title: string
  date: string
  readTime: string
  category: string
  tags: string[]
  heroImage?: string
  summary: string
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const fullPath = path.join(POSTS_DIR, filename)
      const raw = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        readTime: data.readTime || '',
        category: data.category || '',
        tags: data.tags || [],
        heroImage: data.heroImage || '',
        summary: data.summary || '',
      } as PostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostContent(slug: string) {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { content, data } = matter(raw)
  return { content, meta: data as Partial<PostMeta> }
}
