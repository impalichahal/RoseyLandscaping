import { useEffect } from 'react'
import ServiceCard from '../components/ServiceCard'
import CTASection from '../components/CTASection'
import SectionHeading from '../components/SectionHeading'
import { services } from '../data/services'
import { defaultMeta } from '../config/siteConfig'

export default function Services() {
  useEffect(() => {
    document.title = `Services | ${defaultMeta.title}`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Explore our landscaping, outdoor living, and construction services for residential and commercial spaces.')
  }, [])

  return (
    <>
      <section className="bg-[#f5f5f3] py-20">
        <div className="container max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#2e7d32]">Our services</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#222222] md:text-6xl">Complete landscaping and outdoor construction services.</h1>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="What we do"
            title="Solutions designed for the way you live outside."
            text="Whether you're refreshing a front entry, building a backyard retreat, or upgrading a commercial property, we create outdoor environments that feel elevated and functional."
          />
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
