import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ServiceCard({ service }) {
  const images = service.images ?? [service.image]
  const carouselImages = images.length > 1 ? [...images, ...images] : images
  const [slideIndex, setSlideIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    if (images.length < 2 || isPaused) return undefined

    const interval = window.setInterval(() => {
      setSlideIndex((current) => current + 1)
    }, 4500)

    return () => window.clearInterval(interval)
  }, [images.length, isPaused])

  useEffect(() => {
    if (slideIndex !== images.length) return undefined

    const resetTimeout = window.setTimeout(() => {
      setIsAnimating(false)
      setSlideIndex(0)
      window.requestAnimationFrame(() => setIsAnimating(true))
    }, 900)

    return () => window.clearTimeout(resetTimeout)
  }, [images.length, slideIndex])

  const carouselStyle = {
    '--service-image-count': images.length,
    transform: `translateX(-${slideIndex * (100 / images.length)}%)`,
    transition: isAnimating ? 'transform 900ms ease-in-out' : 'none',
  }

  return (
    <Link
      to={`/services/${service.slug}`}
      aria-label={`View ${service.title} details`}
      className="service-card group relative block overflow-hidden rounded-[28px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
    >
      <div
        className="service-carousel relative h-[300px] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="service-carousel-track flex h-full" style={carouselStyle}>
          {carouselImages.map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt={index < images.length ? service.title : ''}
              aria-hidden={index >= images.length}
              className="service-carousel-slide h-full object-cover"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/80 via-[#151515]/20 to-transparent" />
      </div>
      <div className="absolute inset-x-0 top-0 p-6">
        <span className="inline-flex rounded-full border border-white/30 bg-black/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white">
          {service.accent}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-[#222222]">{service.title}</h3>
        <p className="mt-3 text-[#5a5a5a]">{service.description}</p>
      </div>
    </Link>
  )
}
