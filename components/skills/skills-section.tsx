"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Skill } from "@/data/skills"
import { SkillCard } from "@/components/skills/skill-card"
import { CertModal } from "@/components/skills/cert-modal"
import { CertSlideshow } from "@/components/skills/cert-slideshow"

const FILTERS = [
  { id: "all", label: "All" },
  { id: "certified", label: "Certified" },
  { id: "technical", label: "Technical" },
  { id: "tool", label: "Tools" },
  { id: "language", label: "Languages" },
] as const

type FilterId = (typeof FILTERS)[number]["id"]

interface SkillsSectionProps {
  skills: Skill[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
    const [viewMode, setViewMode] = useState<"grid" | "certs">("grid")
    const [activeFilter, setActiveFilter] = useState<FilterId>("all")
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const certifiedSkills = useMemo(
      () => skills.filter((s) => s.certified && s.cert),
      [skills]
    )

    const filteredSkills = useMemo(() => {
      switch (activeFilter) {
        case "certified":
          return skills.filter((s) => s.certified && s.cert)
        case "technical":
          return skills.filter((s) => s.type === "technical")
        case "tool":
          return skills.filter((s) => s.type === "tool")
        case "language":
          return skills.filter((s) => s.type === "language")
        default:
          return skills
      }
    }, [skills, activeFilter])

    const handleOpenModal = (skill: Skill) => {
      if (!skill.certified || !skill.cert) return
      setSelectedSkill(skill)
      setIsModalOpen(true)
    }

    const handleCloseModal = () => {
      setIsModalOpen(false)
      setSelectedSkill(null)
    }

    return (
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Skills &amp; Certifications</h2>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-xl">
                A snapshot of the technologies, tools, and languages I use most often, along with selected
                certifications.
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-2 md:mt-0 items-start md:items-end">
              <div className="inline-flex rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={
                    "px-3 py-1.5 text-xs md:text-sm rounded-full transition-colors " +
                    (viewMode === "grid"
                      ? "bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900"
                      : "text-slate-600 dark:text-slate-300")
                  }
                >
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("certs")}
                  className={
                    "px-3 py-1.5 text-xs md:text-sm rounded-full transition-colors " +
                    (viewMode === "certs"
                      ? "bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900"
                      : "text-slate-600 dark:text-slate-300")
                  }
                >
                  Certifications
                </button>
              </div>

              {viewMode === "grid" && (
                <div className="flex flex-wrap gap-2">
                  {FILTERS.map((filter) => {
                    const isActive = activeFilter === filter.id
                    return (
                      <button
                        key={filter.id}
                        type="button"
                        onClick={() => setActiveFilter(filter.id)}
                        className={
                          "px-3 py-1.5 rounded-full text-xs md:text-sm border transition-colors " +
                          (isActive
                            ? "bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900 border-slate-900 dark:border-slate-50"
                            : "bg-transparent text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800")
                        }
                      >
                        {filter.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {viewMode === "grid" ? (
              <motion.div
                key={`grid-${activeFilter}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <SkillCard skill={skill} onOpenModal={handleOpenModal} />
                  </motion.div>
                ))}

                {filteredSkills.length === 0 && (
                  <p className="col-span-full text-sm text-slate-500 dark:text-slate-400">
                    No skills match this filter yet.
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="certs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
              >
                <CertSlideshow skills={certifiedSkills} onOpenModal={handleOpenModal} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <CertModal
          open={isModalOpen}
          onClose={handleCloseModal}
          cert={selectedSkill?.cert ?? null}
          skillLabel={selectedSkill?.label}
        />
      </section>
    )
}
