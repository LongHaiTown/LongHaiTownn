"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import type { PostMeta } from '../../lib/posts'

interface Props { posts: PostMeta[] }

export default function BlogClient({ posts }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const categories = ['all', ...Array.from(new Set(posts.map(p => p.category))).filter(Boolean)]
  const allTags = [...new Set(posts.flatMap((post) => post.tags))]

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const q = searchQuery.toLowerCase()
    const matchesSearch = post.title.toLowerCase().includes(q) || post.summary.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  const postsPerPage = 33
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  }

  const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  }

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { staggerChildren: 0.1 },
    viewport: { once: true },
  }

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-balance">Insights & Stories</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Exploring AI, systems design, and software engineering. Sharing technical insights and lessons learned.
            </p>
          </motion.div>

            <motion.div {...fadeIn} className="flex flex-col md:flex-row gap-4 mb-12">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
                />
              </div>
            </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
          <aside className="lg:col-span-1">
            <motion.div {...fadeIn} className="space-y-8">
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-slate-600 dark:text-slate-400">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat)
                        setCurrentPage(1)
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat
                          ? 'bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-medium'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-slate-600 dark:text-slate-400">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 8).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </aside>

          <div className="lg:col-span-3">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {paginatedPosts.map((post) => (
                <motion.article
                  key={post.slug}
                  variants={fadeInUp}
                  className="group border-b border-slate-200 dark:border-slate-800 pb-8 last:border-b-0 transition-opacity"
                >
                  <div className="grid md:grid-cols-3 gap-6 items-start">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{post.date}</span>
                        <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded">
                          {post.category}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{post.readTime}</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                        <a href={`/blog/${post.slug}`} className="inline-block focus:outline-none focus:ring-2 focus:ring-slate-400 rounded">
                          {post.title}
                        </a>
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{post.summary}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-2 text-slate-900 dark:text-slate-50 font-medium group-hover:gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
                        aria-label={`Read more: ${post.title}`}
                      >
                        Read more <ArrowRight size={16} />
                      </a>
                    </div>
                    <a
                      href={`/blog/${post.slug}`}
                      className="hidden md:block relative h-48 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                      aria-label={`View image for ${post.title}`}
                    >
                      <img
                        src={post.heroImage || '/placeholder.svg'}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </a>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {paginatedPosts.length === 0 && (
              <motion.div {...fadeIn} className="text-center py-12">
                <p className="text-slate-500 dark:text-slate-400 text-lg">No articles found. Try adjusting your search or filters.</p>
              </motion.div>
            )}

            {totalPages > 1 && (
              <motion.div {...fadeIn} className="flex justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === i + 1
                        ? 'bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Next
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm">© 2025 Than Huynh Van.</p>

        </div>
      </footer>
    </div>
  )
}