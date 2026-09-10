import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import CTASection from '../components/CTASection'
import { serviceDetails, services } from '../data/services'
import { defaultMeta } from '../config/siteConfig'

export default function ServiceDetail() {
  const { serviceSlug } = useParams()
  const service = serviceDetails[serviceSlug]
  const gallery = services
    .filter((item) => item.slug !== serviceSlug)
    .slice(0, 2)

  useEffect(() => {
    if (!service) {
      document.title = 'Service Not Found | Rosey Lanscaping'
      return
    }
    document.title = `${service.title} | ${defaultMeta.title}`
  }, [service])

  if (!service) {
    return (
      <section className="section">
        <div className="container max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#2e7d32]">Service unavailable</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#222]">We couldn’t find that service.</h1>
          <Link to="/services" className="mt-8 inline-flex rounded-full bg-[#2e7d32] px-6 py-3 text-sm font-semibold text-white">Back to services</Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#1e1e1e] py-20 text-white">
        <div className="absolute inset-0">
          <img src={service.image} alt={service.title} className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-[#111111]/60 to-[#111111]/40" />
        </div>
        <div className="container relative z-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-[#dbebdd]">{service.accent}</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] md:text-6xl">{service.title}</h1>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-lg text-[#565656]">{service.description}</p>
            <div className="mt-8 grid gap-4">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl border border-[#e7e7e7] bg-[#f8f8f7] p-4 text-[#222]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf3ee] text-[#2e7d32]">✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[26px] bg-[#f5f5f3] p-7 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
            <h2 className="text-3xl font-semibold text-[#222222]">What this includes</h2>
            <ul className="mt-6 space-y-4 text-[#505050]">
              <li>• Site planning and material selection</li>
              <li>• Full outdoor construction coordination</li>
              <li>• Premium finishing details and field supervision</li>
              <li>• Styling and planting integration</li>
            </ul>
            <Link to="/contact" className="mt-8 inline-flex rounded-full bg-[#2e7d32] px-6 py-3 text-sm font-semibold text-white">Request a quote</Link>
          </div>
        </div>
      </section>

      <section className="section bg-[#f5f5f3]">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#2e7d32]">Our process</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#222222]">From first idea to final detail.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['01', 'Discover', 'We listen, visit your property, and understand how the space needs to work.'],
                ['02', 'Design', 'We shape the layout, materials, planting, and details into one clear direction.'],
                ['03', 'Build', 'Our team brings the design to life with careful coordination and craftsmanship.'],
              ].map(([number, title, text]) => (
                <div key={number} className="border-t-2 border-[#2e7d32] pt-4">
                  <p className="text-sm font-semibold text-[#2e7d32]">{number}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-[#222222]">{title}</h3>
                  <p className="mt-3 text-sm text-[#5b5b5b]">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <img src={service.image} alt={`${service.title} example`} className="h-[360px] w-full rounded-[26px] object-cover" />
            {gallery.map((item) => (
              <img key={item.id} src={item.image} alt={`${service.title} detail inspiration`} className="h-[360px] w-full rounded-[26px] object-cover md:hidden" />
            ))}
            <img src={gallery[0].image} alt={`${service.title} material inspiration`} className="hidden h-[360px] w-full rounded-[26px] object-cover md:block" />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
