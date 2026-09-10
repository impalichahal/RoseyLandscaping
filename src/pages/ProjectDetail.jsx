import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { defaultMeta } from '../config/siteConfig'

export default function ProjectDetail() {
  const { projectId } = useParams()
  const project = projects.find((item) => item.id === projectId)

  useEffect(() => {
    if (!project) {
      document.title = 'Project Not Found | Rosey Lanscaping'
      return
    }
    document.title = `${project.title} | ${defaultMeta.title}`
  }, [project])

  if (!project) {
    return (
      <section className="section">
        <div className="container max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#2e7d32]">Project not found</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#222]">This project is no longer available.</h1>
          <Link to="/projects" className="mt-8 inline-flex rounded-full bg-[#2e7d32] px-6 py-3 text-sm font-semibold text-white">Back to projects</Link>
        </div>
      </section>
    )
  }

  const relatedProjects = projects.filter((item) => item.id !== project.id).slice(0, 3)

  return (
    <>
      <section className="relative overflow-hidden bg-[#1a1a1a] py-20 text-white">
        <div className="absolute inset-0">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-[#111111]/60 to-[#111111]/35" />
        </div>
        <div className="container relative z-10 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.2em] text-[#dfe9e1]">{project.category}</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] md:text-6xl">{project.title}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#ececec]">
            <span>{project.location}</span>
            <span>•</span>
            <span>{project.type}</span>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-lg text-[#595959]">{project.description}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {project.gallery.map((image, index) => (
                  <img key={index} src={image} alt={`${project.title} view ${index + 1}`} className="h-56 w-full rounded-[22px] object-cover" />
                ))}
              </div>
            </div>

            <div className="rounded-[28px] bg-[#f5f5f3] p-7 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
              <h2 className="text-3xl font-semibold text-[#222222]">Scope of work</h2>
              <ul className="mt-6 space-y-3 text-[#505050]">
                {project.scope.map((item) => (
                  <li key={item} className="flex gap-3"><span className="text-[#2e7d32]">✓</span> {item}</li>
                ))}
              </ul>
              <Link to="/contact" className="mt-8 inline-flex rounded-full bg-[#2e7d32] px-6 py-3 text-sm font-semibold text-white">Book a consultation</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[#f5f5f3]">
        <div className="container">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#222222]">Related projects</h2>
          <div className="mt-8 grid gap-7 md:grid-cols-3">
            {relatedProjects.map((item) => (
              <Link key={item.id} to={`/projects/${item.id}`} className="overflow-hidden rounded-[24px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
                <img src={item.image} alt={item.title} className="h-60 w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#5f8f61]">{item.category}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-[#222]">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
