import { redirect } from 'next/navigation'
import { ArrowLeft, Clock, CalendarDays } from 'lucide-react'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkGfm from "remark-gfm"
import rehypePrettyCode from "rehype-pretty-code"
import type { Options as PrettyCodeOptions } from "rehype-pretty-code"

interface Frontmatter {
  title?: string
  date?: string
  readTime?: string
  category?: string
  tags?: string[]
  heroImage?: string
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = (params && typeof (params as any).then === 'function')
    ? await (params as Promise<{ slug: string }>)
    : (params as { slug: string })
  const { slug } = resolvedParams || {}
  console.debug('[blog/[slug]] params resolved:', { slug, resolvedParamsType: typeof resolvedParams })
  if (!slug || typeof slug !== 'string' || !slug.trim()) {
    console.warn('[blog/[slug]] Missing or invalid slug, redirecting to empty')
    redirect('/blog/empty')
  }
  const postsDir = path.join(process.cwd(), 'content', 'posts')
  let fullPath = path.join(postsDir, `${slug}.mdx`)
  console.debug('[blog/[slug]] initial paths:', { postsDir, fullPath })

  if (!fs.existsSync(fullPath)) {
    console.debug('[blog/[slug]] File does not exist, scanning directory for candidates')
    const candidates = fs.existsSync(postsDir)
      ? fs.readdirSync(postsDir)
          .filter(name => name.toLowerCase().endsWith('.mdx'))
          .map(name => ({ name, base: name.replace(/\.mdx$/i, '') }))
      : []
    console.debug('[blog/[slug]] candidates found:', candidates)
    const match = candidates.find(c => c.base.toLowerCase() === String(slug).toLowerCase())
    console.debug('[blog/[slug]] match result:', match)
    if (match) {
      fullPath = path.join(postsDir, match.name)
      console.debug('[blog/[slug]] using matched path:', fullPath)
    } else {
      console.warn('[blog/[slug]] No matching MDX file for slug, redirecting to empty', { slug })
      redirect('/blog/empty')
    }
  }

  // 1. Read MDX file and extract frontmatter for meta
  console.debug('[blog/[slug]] reading file:', fullPath)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as Frontmatter
  console.debug('[blog/[slug]] frontmatter parsed:', fm)

  // 2. Prepare article meta
  const article = {
    title: fm.title || slug,
    date: fm.date || '',
    readTime: fm.readTime || '',
    category: fm.category || '',
    tags: fm.tags || [],
    heroImage: fm.heroImage || '',
  }

  // 3. Render MDX from string to avoid module import issues
  console.debug('[blog/[slug]] rendering MDX via MDXRemote (string-based)')

  const prettyCodeOptions: PrettyCodeOptions = {
    theme: 'one-dark-pro',
    keepBackground: false,
    defaultLang: 'ts',
    onVisitLine(node) {
      if ((node as any).children?.length === 0) {
        ;(node as any).children = [{ type: 'text', value: ' ' }]
      }
    },
    onVisitHighlightedLine(node) {
      const cls = (node as any).properties?.className || []
      ;(node as any).properties = { ...(node as any).properties, className: [...cls, 'highlighted'] }
    },

  }

  const mdxComponents = {
    h1: (props: any) => <h1 {...props} className="text-4xl md:text-5xl font-bold tracking-tight mb-6" />,
    h2: (props: any) => <h2 {...props} className="text-3xl md:text-4xl font-bold mt-12 mb-4" />,
    h3: (props: any) => <h3 {...props} className="text-2xl font-semibold mt-8 mb-3" />,
    p: (props: any) => <p {...props} className="leading-relaxed my-4" />,
    ul: (props: any) => <ul {...props} className="list-disc pl-6 my-4 space-y-2" />,
    ol: (props: any) => <ol {...props} className="list-decimal pl-6 my-4 space-y-2" />,
    a: (props: any) => <a {...props} className="text-primary underline-offset-2 hover:underline" />,
    code: (props: any) => <code {...props} className="rounded px-1 py-0.5 bg-muted text-foreground" />,
    pre: (props: any) => <pre {...props} className="notion-code" />,
    img: (props: any) => <img {...props} className="rounded-lg" />,
  }

  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      {/* Top progress bar (static server-safe) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50" aria-hidden />

      {/* Main Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar TOC - Desktop Only (non-interactive placeholder) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-muted-foreground">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {/* If you later generate a TOC, render items here */}
                  <span className="block text-sm text-muted-foreground">Updating…</span>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Article */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <header className="mb-12">
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">{article.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                <Link
                  href="/blog"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <ArrowLeft size={16} />
                  <span className="text-sm font-medium">Back to Blog</span>
                </Link>

                {article.date && (
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    <span>{article.date}</span>
                  </div>
                )}
                {article.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{article.readTime}</span>
                  </div>
                )}
                {article.category && (
                  <span className="px-2.5 py-0.5 bg-secondary text-secondary-foreground rounded">
                    {article.category}
                  </span>
                )}
              </div>
            </header>

            {/* Hero Image */}
            {article.heroImage && (
              <figure className="mb-12 rounded-xl overflow-hidden bg-card">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-96 object-cover"
                />
              </figure>
            )}

            {/* MDX Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <MDXRemote
                source={content}
                components={mdxComponents as any}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypeAutolinkHeadings, { behavior: "wrap" }],
                      [rehypePrettyCode, prettyCodeOptions],
                    ],
                  },
                }}
              />
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border mt-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2025 Alex Morgan. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
