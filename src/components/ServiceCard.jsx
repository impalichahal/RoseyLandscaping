import { Link } from 'react-router-dom'

export default function ServiceCard({ service }) {
  return (
    <article className="service-card group relative overflow-hidden rounded-[28px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
      <div className="relative h-[300px] overflow-hidden">
        <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
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
        <Link
          to={`/services/${service.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2e7d32] transition group-hover:gap-3"
        >
          Learn more <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
