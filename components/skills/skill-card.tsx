"use client"

import { cn } from "@/lib/utils"
import type { Skill } from "@/data/skills"

interface SkillCardProps {
  skill: Skill
  onOpenModal?: (skill: Skill) => void
}

export function SkillCard({ skill, onOpenModal }: SkillCardProps) {
  const isCertified = Boolean(skill.certified && skill.cert)

  return (
    <div className="relative p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-md hover:border-slate-400 dark:hover:border-slate-500 transition-colors transition-shadow">
      {isCertified && (
        <span className="absolute top-2 right-2 text-[10px] uppercase tracking-wide bg-yellow-200 dark:bg-yellow-500 text-black px-2 py-0.5 rounded-full">
          Certified
        </span>
      )}

      <div className="mb-2">
        <h3 className="font-semibold text-sm md:text-base mb-1">{skill.label}</h3>
        {skill.level && (
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">Level: {skill.level}</p>
        )}
      </div>

      {skill.usage && (
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-3">{skill.usage}</p>
      )}

      {skill.notes && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{skill.notes}</p>
      )}

      {isCertified && onOpenModal && (
        <button
          type="button"
          onClick={() => onOpenModal(skill)}
          className={cn(
            "mt-2 text-xs md:text-sm underline text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100",
          )}
        >
          View Certificate
        </button>
      )}
    </div>
  )
}
