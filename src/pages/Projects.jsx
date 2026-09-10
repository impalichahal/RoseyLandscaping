import { useEffect, useMemo, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import CTASection from '../components/CTASection'
import { projectCategories, projects } from '../data/projects'
import { defaultMeta } from '../config/siteConfig'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    document.title = `Projects | ${defaultMeta.title}`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Browse our landscaping and outdoor living project gallery.')
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((project) => project.type === activeFilter || project.category === activeFilter)
  }, [activeFilter])

  return (
    <>
      <section className="bg-[#f5f5f3] py-20">
        <div className="container max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#2e7d32]">Our work</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#222222] md:text-6xl">Project gallery.</h1>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mb-8 flex flex-wrap gap-3">
            {projectCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  activeFilter === category ? 'bg-[#2e7d32] text-white' : 'border border-[#e6e6e6] bg-[#f8f8f7] text-[#333]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
