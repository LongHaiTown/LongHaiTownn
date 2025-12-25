"use client"

import { motion } from "framer-motion"
import { Search, ArrowRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import type { PostMeta } from "../../lib/posts"

interface Props {
  posts: PostMeta[]
}

type NormalizedPost = PostMeta & {
  lang: "en" | "vi"
  category: string
  summary: string
  tags: string[]
}

export default function BlogClient({ posts }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  /* =========================
     1. READ STATE FROM URL
     ========================= */

  const lang = (searchParams.get("lang") as "en" | "vi") ?? "en"
  const category = searchParams.get("category") ?? "all"
  const q = searchParams.get("q") ?? ""
  const page = Number(searchParams.get("page")) || 1

  /* =========================
     2. NORMALIZE POSTS (STATIC)
     ========================= */

  const normalizedPosts: NormalizedPost[] = posts.map((post) => ({
    ...post,
    lang: (post as any).lang ?? "en",
    category: post.category ?? "uncategorized",
    summary: post.summary ?? "",
    tags: Array.isArray(post.tags) ? post.tags : [],
  }))

  const normalize = (v: string) => v.toLocaleLowerCase("vi")

  /* =========================
     3. FILTER LOGIC
     ========================= */

  const postsByLang = normalizedPosts.filter((p) => p.lang === lang)

  const filteredPosts = postsByLang.filter((post) => {
    const matchCategory =
      category === "all" || post.category === category

    const matchSearch =
      !q ||
      normalize(post.title).includes(normalize(q)) ||
      normalize(post.summary).includes(normalize(q))

    return matchCategory && matchSearch
  })

  /* =========================
     4. PAGINATION
     ========================= */

  const POSTS_PER_PAGE = 8
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  )

  /* =========================
     5. HELPERS: UPDATE URL
     ========================= */

  function updateParams(next: Record<string, string | number | null>) {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "all") {
        params.delete(key)
      } else {
        params.set(key, String(value))
      }
    })

    router.replace(`/blog?${params.toString()}`, { scroll: false })
  }

  /* =========================
     6. DERIVED DATA
     ========================= */

  const categories = [
    "all",
    ...Array.from(new Set(postsByLang.map((p) => p.category))),
  ]

  const allTags = Array.from(
    new Set(postsByLang.flatMap((p) => p.tags))
  )

  /* =========================
     7. ANIMATION VARIANTS
     ========================= */

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true },
  }

  /* =========================
     8. RENDER
     ========================= */

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      {/* ===== HEADER ===== */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp}>
            <h1 className="text-5xl font-bold mb-4">
              Insights & Stories
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
              Exploring AI, systems design, and software engineering.
            </p>
          </motion.div>

          {/* SEARCH + LANG */}
          <div className="mt-10 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-4 top-3.5 text-slate-400"
              />
              <input
                value={q}
                placeholder={
                  lang === "en"
                    ? "Search articles..."
                    : "Tìm kiếm bài viết..."
                }
                onChange={(e) =>
                  updateParams({
                    q: e.target.value,
                    page: 1,
                  })
                }
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800"
              />
            </div>

            <div className="flex gap-2">
              {(["en", "vi"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() =>
                    updateParams({
                      lang: l,
                      category: "all",
                      q: "",
                      page: 1,
                    })
                  }
                  className={`px-3 py-2 rounded-lg border ${
                    lang === l
                      ? "bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900"
                      : "text-slate-500"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN ===== */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-12">
          {/* SIDEBAR */}
          <aside>
            <h3 className="text-sm uppercase mb-4 text-slate-500">
              Categories
            </h3>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() =>
                  updateParams({
                    category: c,
                    page: 1,
                  })
                }
                className={`block w-full text-left px-3 py-2 rounded ${
                  category === c
                    ? "bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900"
                    : "text-slate-500"
                }`}
              >
                {c}
              </button>
            ))}
          </aside>

          {/* POSTS */}
          <div className="lg:col-span-3 space-y-10">
            {paginatedPosts.map((post) => (
              <motion.article
                key={post.slug}
                {...fadeInUp}
                className="border-b pb-8"
              >
                <div className="grid md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-2">
                      <a href={`/blog/${post.slug}`}>{post.title}</a>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {post.summary}
                    </p>

                    <div className="flex gap-2 mb-4 flex-wrap">
                      {post.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() =>
                            updateParams({
                              q: tag,
                              category: "all",
                              page: 1,
                            })
                          }
                          className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <a
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 font-medium"
                    >
                      Read more <ArrowRight size={16} />
                    </a>
                  </div>

                  <a
                    href={`/blog/${post.slug}`}
                    className="hidden md:block relative h-40 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800"
                    aria-label={`View image for ${post.title}`}
                  >
                    <img
                      src={post.heroImage || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </a>
                </div>
              </motion.article>
            ))}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex gap-2 justify-center">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      updateParams({ page: i + 1 })
                    }
                    className={`px-4 py-2 rounded ${
                      page === i + 1
                        ? "bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900"
                        : "bg-slate-100 dark:bg-slate-800"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
