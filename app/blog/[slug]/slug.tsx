"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Moon, Sun, ArrowLeft, Share2, Bookmark, Clock, CalendarDays } from "lucide-react"
import Link from "next/link"

export default function ArticlePage() {
  const [isDark, setIsDark] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      setScrollProgress((scrolled / totalScroll) * 100)

      const sections = document.querySelectorAll("[data-section]")
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top < 300) {
          setActiveSection(section.getAttribute("data-section") || "")
        }
      })
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const article = {
    title: "Building Scalable Microservices Architecture",
    date: "November 28, 2025",
    readTime: "8 min read",
    category: "Architecture",
    author: {
      name: "Alex Morgan",
      role: "Senior Software Engineer",
      bio: "Passionate about building scalable systems and sharing knowledge with the dev community.",
      image: "/professional-headshot.png",
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
    heroImage: "/microservices-architecture-diagram.jpg",
    tags: ["System Design", "Backend", "Microservices", "Architecture"],
    tableOfContents: [
      { id: "introduction", title: "Introduction", level: 1 },
      { id: "fundamentals", title: "Core Fundamentals", level: 1 },
      { id: "design-patterns", title: "Design Patterns", level: 1 },
      { id: "api-gateway", title: "API Gateway Pattern", level: 2 },
      { id: "service-mesh", title: "Service Mesh", level: 2 },
      { id: "implementation", title: "Implementation Strategies", level: 1 },
      { id: "deployment", title: "Deployment & Monitoring", level: 1 },
      { id: "conclusion", title: "Conclusion", level: 1 },
    ],
    relatedPosts: [
      {
        id: 2,
        title: "Fine-tuning Large Language Models for Production",
        excerpt: "Practical guide to optimizing LLMs for specific use cases...",
        readTime: "12 min read",
        image: "/large-language-model-training.jpg",
      },
      {
        id: 4,
        title: "Distributed Systems: Handling Failures Gracefully",
        excerpt: "Best practices for building fault-tolerant systems...",
        readTime: "14 min read",
        image: "/distributed-system-topology.jpg",
      },
      {
        id: 3,
        title: "React Performance Optimization Techniques",
        excerpt: "Essential strategies for improving React app performance...",
        readTime: "10 min read",
        image: "/react-performance-optimization.jpg",
      },
    ],
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  }

  const scrollVariant = {
    initial: { scaleX: 0 },
    animate: { scaleX: scrollProgress / 100 },
    transition: { duration: 0.3 },
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-slate-900 dark:bg-slate-50 origin-left z-50"
          style={{ scaleX: scrollProgress / 100 }}
        />

        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Back to Blog</span>
            </Link>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <article className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar TOC - Desktop Only */}
            <aside className="hidden lg:block lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="sticky top-24 space-y-6"
              >
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-slate-600 dark:text-slate-400">
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {article.tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm transition-colors ${
                          activeSection === item.id
                            ? "text-slate-900 dark:text-slate-50 font-medium"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        } ${item.level === 2 ? "pl-4" : ""}`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="flex gap-3">
                  <button
                    className="flex-1 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    title="Share"
                  >
                    <Share2 size={18} className="mx-auto" />
                  </button>
                  <button
                    className="flex-1 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    title="Save"
                  >
                    <Bookmark size={18} className="mx-auto" />
                  </button>
                </div>
              </motion.div>
            </aside>

            {/* Main Article */}
            <div className="lg:col-span-3">
              {/* Article Header */}
              <motion.header {...fadeInUp} className="mb-12">
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">{article.title}</h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-8">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{article.readTime}</span>
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded">
                      {article.category}
                    </span>
                  </div>
                </div>
              </motion.header>

              {/* Hero Image */}
              <motion.figure {...fadeInUp} className="mb-12 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img
                  src={article.heroImage || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-96 object-cover"
                />
              </motion.figure>

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="prose prose-slate dark:prose-invert max-w-none"
              >
                <section data-section="introduction" id="introduction" className="mb-12">
                  <h2 className="text-3xl font-bold mb-4 mt-0">Introduction</h2>
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
                    In today's rapidly evolving software landscape, building scalable systems has become a cornerstone
                    of modern development. Microservices architecture represents a paradigm shift from monolithic
                    applications, enabling organizations to develop, deploy, and scale individual services
                    independently.
                  </p>
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    This comprehensive guide explores the principles, patterns, and practices necessary to implement
                    microservices successfully at scale. We'll dive into real-world examples and best practices that
                    have helped numerous organizations achieve remarkable scalability and resilience.
                  </p>
                </section>

                <section data-section="fundamentals" id="fundamentals" className="mb-12">
                  <h2 className="text-3xl font-bold mb-4">Core Fundamentals</h2>
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
                    Microservices architecture is built on several core principles that distinguish it from traditional
                    monolithic approaches:
                  </p>
                  <ul className="space-y-3 text-slate-700 dark:text-slate-300 mb-6">
                    <li className="flex gap-4">
                      <span className="text-slate-400 flex-shrink-0">•</span>
                      <span>
                        <strong>Service Independence:</strong> Each microservice is independently deployable and
                        scalable, allowing teams to work in parallel.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-slate-400 flex-shrink-0">•</span>
                      <span>
                        <strong>Single Responsibility:</strong> Each service handles one specific business capability,
                        maintaining clear boundaries.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-slate-400 flex-shrink-0">•</span>
                      <span>
                        <strong>Technology Diversity:</strong> Different services can utilize different technology
                        stacks based on their specific requirements.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-slate-400 flex-shrink-0">•</span>
                      <span>
                        <strong>Autonomous Data Management:</strong> Each service manages its own data store, preventing
                        tight coupling through shared databases.
                      </span>
                    </li>
                  </ul>
                </section>

                <section data-section="design-patterns" id="design-patterns" className="mb-12">
                  <h2 className="text-3xl font-bold mb-6">Design Patterns</h2>

                  <h3 data-section="api-gateway" id="api-gateway" className="text-2xl font-bold mb-3">
                    API Gateway Pattern
                  </h3>
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                    The API Gateway serves as a single entry point for client requests, providing routing, load
                    balancing, and cross-cutting concerns like authentication and rate limiting. This pattern simplifies
                    client interaction while protecting internal services from direct exposure.
                  </p>

                  <h3 data-section="service-mesh" id="service-mesh" className="text-2xl font-bold mb-3">
                    Service Mesh
                  </h3>
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                    A service mesh provides sophisticated inter-service communication capabilities including traffic
                    management, security policies, and observability without requiring changes to application code.
                    Popular implementations like Istio and Linkerd have become industry standards.
                  </p>
                </section>

                <section data-section="implementation" id="implementation" className="mb-12">
                  <h2 className="text-3xl font-bold mb-4">Implementation Strategies</h2>
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
                    Implementing microservices requires careful planning and incremental adoption. Start with
                    domain-driven design to identify service boundaries, then gradually refactor your monolith into
                    independently deployable services.
                  </p>
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
                    Key considerations include:
                  </p>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-300 mb-6">
                    <li className="flex gap-4">
                      <span className="text-slate-400 flex-shrink-0">•</span>
                      <span>Containerization using Docker and orchestration with Kubernetes</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-slate-400 flex-shrink-0">•</span>
                      <span>Implementing circuit breakers and retry logic for resilience</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-slate-400 flex-shrink-0">•</span>
                      <span>Distributed tracing for observability across services</span>
                    </li>
                  </ul>
                </section>

                <section data-section="deployment" id="deployment" className="mb-12">
                  <h2 className="text-3xl font-bold mb-4">Deployment & Monitoring</h2>
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
                    Continuous deployment pipelines are essential for microservices. Each service should have its own
                    deployment cycle, enabling rapid iteration while maintaining system stability.
                  </p>
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    Implement comprehensive monitoring and logging strategies to track service health, performance
                    metrics, and error rates across your distributed system. Tools like Prometheus, Grafana, and ELK
                    stack provide valuable insights into system behavior.
                  </p>
                </section>

                <section data-section="conclusion" id="conclusion" className="mb-12">
                  <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    Building scalable microservices architecture requires thoughtful planning, robust tooling, and a
                    commitment to best practices. By following the patterns and strategies outlined in this guide, you
                    can create systems that scale seamlessly and adapt to evolving business requirements.
                  </p>
                </section>
              </motion.div>

              <motion.section {...fadeInUp} className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
                <div className="flex gap-6 items-start">
                  <img
                    src={article.author.image || "/placeholder.svg"}
                    alt={article.author.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{article.author.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{article.author.role}</p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{article.author.bio}</p>
                    <div className="flex gap-4">
                      <a
                        href={article.author.twitter}
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
                      >
                        Twitter
                      </a>
                      <a
                        href={article.author.github}
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </motion.section>

              <motion.section {...fadeInUp} className="mt-20">
                <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {article.relatedPosts.map((post, idx) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="group cursor-pointer"
                    >
                      <div className="relative h-48 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 mb-4">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{post.excerpt}</p>
                      <span className="text-xs text-slate-500 dark:text-slate-500">{post.readTime}</span>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>
        </article>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-800 mt-20">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm">© 2025 Alex Morgan. All rights reserved.</p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors text-sm"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors text-sm"
              >
                Terms
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
