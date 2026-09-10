import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <article className="project-card group overflow-hidden rounded-[26px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
      <div className="relative overflow-hidden">
        <img src={project.image} alt={project.title} className="h-[280px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/65 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.18em] text-[#dfe9e1]">{project.category}</p>
          <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 p-5">
        <div>
          <p className="text-sm text-[#555]">{project.location}</p>
        </div>
        <Link to={`/projects/${project.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#2e7d32]">
          View project <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
