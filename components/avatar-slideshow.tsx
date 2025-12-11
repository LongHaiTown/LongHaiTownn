"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface AvatarSlideshowProps {
  images: string[]
  className?: string
}

export function AvatarSlideshow({ images, className }: AvatarSlideshowProps) {
  if (!images || images.length === 0) return null

  return (
    <div
      className={cn(
        "relative border border-slate-250 dark:border-slate-700 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900",
        // Frame cố định — ảnh sẽ tự scale theo width
        "aspect-[16/9]",
        className,
      )}
    >
      <Carousel className="w-full h-full">
        <CarouselContent className="w-full h-full">
          {images.map((src, idx) => (
            <CarouselItem key={idx} className="w-full h-full">
                
              <img
  src={src}
  alt={`Avatar ${idx + 1}`}
  loading="lazy"
  className="
    h-full w-full
    object-cover object-center
    transition-transform duration-500
    scale-[1.06]     
  "
/>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  )
}
