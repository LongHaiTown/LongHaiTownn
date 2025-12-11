"use client"

import type { Skill } from "@/data/skills"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { motion } from "framer-motion"

interface CertSlideshowProps {
  skills: Skill[]
  onOpenModal: (skill: Skill) => void
}

export function CertSlideshow({ skills, onOpenModal }: CertSlideshowProps) {
  if (!skills.length) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        No certifications available yet.
      </p>
    )
  }

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {skills.map((skill) => (
            <CarouselItem key={skill.label}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="h-full flex items-stretch"
              >
                <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70 shadow-sm p-4 flex flex-col gap-3">
                  <div className="relative w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 aspect-[16/9] flex items-center justify-center">
                    {skill.cert?.image ? (
                      <img
                        src={skill.cert.image}
                        alt={skill.cert.name || skill.label}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        No certificate image provided.
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                        {skill.cert?.name || skill.label}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {skill.cert?.issuer}
                        {skill.cert?.date && ` • ${skill.cert.date}`}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenModal(skill)}
                      className="px-4 py-2 text-xs md:text-sm rounded-lg bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors self-start sm:self-auto"
                    >
                      View Certificate
                    </button>
                  </div>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
