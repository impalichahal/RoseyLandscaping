import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import BlogCard from '../components/BlogCard'
import TestimonialSlider from '../components/TestimonialSlider'
import AwardCard from '../components/AwardCard'
import CTASection from '../components/CTASection'
import { services } from '../data/services'
import { blogPosts } from '../data/blogPosts'
import { awards } from '../data/awards'
import { HOME_META } from '../config/siteConfig'
import { useEffect } from 'react'

const trustItems = [
  '8+ Years Experience',
  '415+ Projects',
  'Licensed Professionals',
  'Quality Workmanship',
]

export default function Home() {
  useEffect(() => {
    document.title = HOME_META.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', HOME_META.description)
    }
  }, [])

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1800&q=80"
            alt="Luxury landscape design"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/90 via-[#121212]/45 to-[#121212]/40" />
        </div>
        <div className="container relative z-10 grid min-h-[720px] items-center py-24 lg:grid-cols-2 lg:py-10">
          <div className="max-w-xl text-white">
            <p className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#eef7ef]">
              LANDSCAPE DESIGN & CONSTRUCTION
            </p>
            <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-6xl xl:text-7xl">
              Transform Your Outdoor Space
            </h1>
            <p className="mt-6 max-w-lg text-lg text-[#ebebeb] md:text-xl">
              Thoughtfully designed landscapes built for the way you live.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/services" className="rounded-full bg-[#2e7d32] px-7 py-4 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(46,125,50,0.35)] transition hover:-translate-y-0.5 hover:bg-[#256b2a]">
                Explore Our Services
              </Link>
              <Link to="/contact" className="rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/16">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e9e9e9] bg-white">
        <div className="container grid gap-6 py-8 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item} className="flex items-center justify-center gap-3 rounded-full border border-[#eaeaea] bg-[#f7f7f6] px-5 py-4 text-center text-sm font-medium text-[#333]">
              <span className="text-[#2e7d32]">•</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-[#f5f5f3]">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&w=1200&q=80" alt="Outdoor living design" className="h-[600px] w-full rounded-[30px] object-cover shadow-[0_26px_60px_rgba(0,0,0,0.12)]" />
              <img src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80" alt="Landscape detail" className="absolute -bottom-8 right-6 h-44 w-44 rounded-[24px] border-8 border-white object-cover shadow-[0_16px_30px_rgba(0,0,0,0.14)] md:h-52 md:w-52" />
            </div>
            <div>
              <SectionHeading
                eyebrow="About us"
                title="Designing outdoor spaces that feel as good as they look."
                text="At Rosey Lanscaping, we combine thoughtful planning, premium materials, and precise craftsmanship to create landscapes that feel natural, elevated, and built to last."
              />
              <p className="mt-2 text-lg text-[#575757]">
                Whether you are creating a tranquil garden retreat, a high-end entertainment zone, or a complete exterior transformation, we align every detail to your property, lifestyle, and long-term goals.
              </p>
              <ul className="mt-6 space-y-4 text-[#333]">
                <li className="flex items-start gap-3"><span className="mt-1 text-[#2e7d32]">✓</span> Full-service landscaping and outdoor construction</li>
                <li className="flex items-start gap-3"><span className="mt-1 text-[#2e7d32]">✓</span> Custom design tailored to your property and routine</li>
                <li className="flex items-start gap-3"><span className="mt-1 text-[#2e7d32]">✓</span> Trusted project management from concept to completion</li>
              </ul>
              <Link to="/about" className="mt-8 inline-flex rounded-full bg-[#2e7d32] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(46,125,50,0.28)]">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Our services"
            title="Outdoor solutions tailored to how you live."
            text="Explore our signature services for residential, commercial, and outdoor living projects."
            align="center"
          />
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Insights"
            title="Fresh ideas for beautiful outdoor living."
            text="Thoughtful guidance, material inspiration, and practical design tips for your next project."
            align="center"
          />
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {blogPosts.slice(0, 4).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#f1f3f0]">
        <div className="container">
          <SectionHeading
            eyebrow="Testimonials"
            title="Clients trust us to create spaces they love returning to."
            align="center"
          />
          <TestimonialSlider />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHeading eyebrow="Recognition" title="Awards & recognition." align="center" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {awards.map((award) => (
              <AwardCard key={award.name} award={award} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
