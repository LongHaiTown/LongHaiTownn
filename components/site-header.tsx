"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const pathname = usePathname()

  const isDark = mounted && theme === "dark"

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-bold text-xl tracking-tight hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
          >
            Than HUYNH VAN
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={
                pathname === "/" ?
                  "font-medium text-slate-900 dark:text-slate-50" :
                  "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
              }
            >
              Home
            </Link>
            <Link
              href="/blog"
              aria-current={pathname.startsWith("/blog") ? "page" : undefined}
              className={
                pathname.startsWith("/blog") ?
                  "font-medium text-slate-900 dark:text-slate-50" :
                  "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
              }
            >
              Blog
            </Link>
            <a
              href="/#projects"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
            >
              Projects
            </a>
          </nav>
        </div>
        {/* <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button> */}
      </div>
    </header>
  )
}
