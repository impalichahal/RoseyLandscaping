import { useEffect, useState } from 'react'
import { testimonials } from '../data/testimonials'

export default function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const current = testimonials[activeIndex]

  return (
    <div className="rounded-[30px] bg-[#1f1f1f] p-6 text-white shadow-[0_18px_45px_rgba(0,0,0,0.18)] md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.2em] text-[#dfe9e1]">Client love</p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xl"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setActiveIndex((activeIndex + 1) % testimonials.length)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xl"
          >
            →
          </button>
        </div>
      </div>

      <blockquote className="text-2xl font-medium leading-tight md:text-4xl">
        “{current.quote}”
      </blockquote>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
        <div>
          <p className="text-lg font-semibold text-white">{current.name}</p>
          <p className="text-sm text-[#d1d5d0]">{current.location}</p>
        </div>
        <div className="text-right">
          <p className="text-sm uppercase tracking-[0.2em] text-[#dfe9e1]">{current.projectType}</p>
          <p className="mt-1 text-[#f6d365]">{'★'.repeat(current.rating)}</p>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.name}
            type="button"
            aria-label={`Show testimonial ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-10 bg-[#2e7d32]' : 'w-2.5 bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  )
}
