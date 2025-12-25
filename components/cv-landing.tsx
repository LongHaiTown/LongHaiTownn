"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, Github, ExternalLink, ChevronDown } from "lucide-react"
import { AvatarSlideshow } from "@/components/avatar-slideshow"
import { SkillsSection } from "@/components/skills/skills-section"
import type { Skill } from "@/data/skills"

interface CVLandingProps {
  avatars: string[]
  hero: {
    name: string
    title: string
    summary: string
    primaryCtaLabel: string
    primaryCtaHref: string
    secondaryCtaLabel: string
    secondaryCtaHref: string
  }
  
  skills: Skill[]

  experience: {
    title: string
    company: {
      name: string
      link?: string
    }
    period: string
    desc: string
    highlights?: string[]   
    tech?: string[]        
    logo?: string
  }[]

  projects: {
    title: string
    desc: string
    tags: string[]
    image: string
    blogSlug?: string
  }[]
}

export function CVLanding({ avatars, hero, skills, experience, projects }: CVLandingProps) {
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
    <section className="px-6 pt-10 pb-10 h-full">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="mb-6 inline-block">
                <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold mb-2 tracking-tight text-balance">{hero.name}</h1>
              <p className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 font-light mb-6">{hero.title}</p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl text-balance">
                {hero.summary}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex gap-3 mt-8"
            >
              <a
                href={hero.primaryCtaHref}
                className="px-8 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
              >
                {hero.primaryCtaLabel}
              </a>
              <a
                href={hero.secondaryCtaHref}
                className="px-8 py-3 border-2 border-slate-900 dark:border-slate-50 text-slate-900 dark:text-slate-50 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                {hero.secondaryCtaLabel}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 flex justify-center lg:justify-start"
            >
              <ChevronDown className="animate-bounce" size={24} />
            </motion.div>
          </div>
         <section className="flex items-center justify-center">
            <AvatarSlideshow images={avatars} className="h-full" />
         </section>

        </div>
      </section>

      {/* Skills section */}
    <SkillsSection skills={skills} />

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Experiences</h2>
            <div className="h-1 w-20 bg-slate-400 dark:bg-slate-600 rounded-full"></div>
          </motion.div>

          <div className="space-y-12">
      {experience.map((job, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="flex gap-6"
        >
          {/* Timeline Dot */}
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-slate-400 dark:bg-slate-600 rounded-full border-4 border-white dark:border-slate-950"></div>
            {idx < experience.length - 1 && (
              <div className="w-[2px] h-24 bg-slate-200 dark:bg-slate-800 mt-4"></div>
            )}
          </div>

          {/* Experience Content */}
          <div className="pb-8">

            {/* Header */}
            <div className="grid grid-cols-[1fr_6rem] gap-4 items-start">
              {/* LEFT */}
              <div>
                <h3 className="text-xl font-bold">
                  {job.title}
                </h3>

                <p className="text-slate-800 dark:text-slate-400 font-medium">
                  {job.company.link ? (
                    <a href={job.company.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {job.company.name}
                    </a>
                  ) : (
                    job.company.name
                  )}
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-500">
                  {job.period}
                </p>
              </div>

              {/* RIGHT — fixed-width logo column */}
              {job.logo && (
                job.company.link ? (
                  <a href={job.company.link} target="_blank" rel="noopener noreferrer" className="block w-full h-16">
                    <img
                      src={job.logo}
                      alt={`${job.company.name} logo`}
                      className="w-full h-16 object-contain rounded"
                    />
                  </a>
                ) : (
                  <img
                    src={job.logo}
                    alt={`${job.company.name} logo`}
                    className="w-full h-16 object-contain rounded"
                  />
                )
              )}

            </div>

            {/* Desc */}
            <p className="text-slate-700 dark:text-slate-300 mb-4">{job.desc}</p>

            {/* Highlights (nếu có) */}
            {job.highlights && (
              <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300 mb-4">
                {job.highlights.map((point: string, i: number) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}

            {/* Tech Tags */}
            {job.tech && (
              <div className="flex flex-wrap gap-2 mt-2">
                {job.tech.map((t: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-xs font-medium rounded-full text-slate-700 dark:text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

        </motion.div>
      ))}
    </div>
        </div>
      </section>

      <section id="projects" className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Featured Researches & Projects</h2>
            <div className="h-1 w-20 bg-slate-400 dark:bg-slate-600 rounded-full"></div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all hover:shadow-lg"
              >
                <div className="relative h-56 bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-xs font-medium rounded-full text-slate-700 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.blogSlug ? `/blog/${project.blogSlug}` : "#"}
                    className="inline-flex items-center gap-2 text-slate-900 dark:text-slate-50 font-medium hover:gap-3 transition-all"
                  >
                    View Project <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Get in Touch</h2>
            <div className="h-1 w-20 bg-slate-400 dark:bg-slate-600 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div {...fadeIn} className="space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                I'm always interested in connecting with fellow engineers, researchers, and builders. Whether you have
                a project idea or just want to chat about tech, feel free to reach out.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:hthan401@gmail.com"
                  className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
                >
                  <Mail size={20} />
                  hthan401@gmail.com
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
                >
                  <Linkedin size={20} />
                  linkedin.com/in/hthan
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
                >
                  <Github size={20} />
                  github.com/LongHaiTown
                </a>
              </div>
            </motion.div>

            <motion.form {...fadeIn} className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            {/* <a
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
            </a> */}
          </div>
        </div>
      </footer>
    </div>
  )
}
