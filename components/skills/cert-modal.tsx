"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Skill } from "@/data/skills"

interface CertModalProps {
  open: boolean
  onClose: () => void
  cert: Skill["cert"] | null
  skillLabel?: string
}

export function CertModal({ open, onClose, cert, skillLabel }: CertModalProps) {
  if (!cert) return null

  const handleOpenChange = (next: boolean) => {
    if (!next) onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Certification Details</DialogTitle>
          {skillLabel && <DialogDescription className="mt-1">Skill: {skillLabel}</DialogDescription>}
        </DialogHeader>

        <div className="space-y-3 py-2 text-sm">
          <div>
            <p className="font-medium">Certificate</p>
            <p className="text-slate-700 dark:text-slate-300">{cert.name}</p>
          </div>
          <div>
            <p className="font-medium">Issuer</p>
            <p className="text-slate-700 dark:text-slate-300">{cert.issuer}</p>
          </div>
          <div className="flex gap-4">
            <div>
              <p className="font-medium">Date</p>
              <p className="text-slate-700 dark:text-slate-300">{cert.date}</p>
            </div>
            {cert.score && (
              <div>
                <p className="font-medium">Score</p>
                <p className="text-slate-700 dark:text-slate-300">{cert.score}</p>
              </div>
            )}
          </div>

          {cert.image && (
            <div className="mt-2">
              <p className="font-medium mb-2">Certificate Preview</p>
              <div className="rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img src={cert.image} alt={cert.name} className="w-full h-48 object-contain bg-white" />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {cert.url && (
            <Button asChild>
              <a href={cert.url} target="_blank" rel="noreferrer">
                View Credential
              </a>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
