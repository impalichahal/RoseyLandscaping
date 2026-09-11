import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'
import { defaultMeta } from '../config/siteConfig'

export default function About() {
  useEffect(() => {
    document.title = `About | ${defaultMeta.title}`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Learn more about our landscape design and outdoor construction process.')
  }, [])

  return (
    <>
      <section className="bg-[#f5f5f3] py-20">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#2e7d32]">About us</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#222222] md:text-6xl">Crafting refined outdoor living with purpose.</h1>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80" alt="Luxury landscape design" className="h-[560px] w-full rounded-[30px] object-cover shadow-[0_24px_60px_rgba(0,0,0,0.12)]" />
            <img src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80" alt="Landscape materials close-up" className="absolute -bottom-8 right-6 h-44 w-44 rounded-[22px] border-8 border-white object-cover shadow-[0_18px_35px_rgba(0,0,0,0.14)]" />
          </div>
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Thoughtful design meets dependable craftsmanship."
            />
            <p className="text-lg text-[#565656]">
              We create outdoor environments that feel intentional, beautiful, and easy to live in. From concept to construction, every choice is informed by function, climate, materials, and your daily routine.
            </p>
            <p className="mt-4 text-lg text-[#565656]">
              Our team works across residential and commercial projects with a focus on lasting quality, clear communication, and exceptional finishing details that transform ordinary spaces into memorable places.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-[22px] border border-[#ebebeb] bg-[#f8f8f7] p-5">
                <p className="text-3xl font-semibold text-[#222222]">8+</p>
                <p className="mt-2 text-[#555]">Years of experience</p>
              </div>
              <div className="rounded-[22px] border border-[#ebebeb] bg-[#f8f8f7] p-5">
                <p className="text-3xl font-semibold text-[#222222]">415+</p>
                <p className="mt-2 text-[#555]">Projects completed</p>
              </div>
            </div>
            <Link to="/contact" className="mt-8 inline-flex rounded-full bg-[#2e7d32] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(46,125,50,0.28)]">Book a consultation</Link>
          </div>
        </div>
      </section>

      <section className="section bg-[#f5f5f3]">
        <div className="container">
          <SectionHeading eyebrow="What we value" title="Beautiful, functional spaces that stand the test of time." align="center" />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Planned for living',
                text: 'We design around your schedule, habits, and how you want to enjoy the outdoors every day.',
              },
              {
                title: 'Built with care',
                text: 'Our work is detailed, measured, and executed with respect for materials, site conditions, and finish quality.',
              },
              {
                title: 'Lasting value',
                text: 'Every element is selected to elevate presentation, performance, and long-term return on investment.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[26px] bg-white p-7 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#edf3ee] text-xl text-[#2e7d32]">✦</div>
                <h3 className="text-2xl font-semibold text-[#222222]">{item.title}</h3>
                <p className="mt-3 text-[#585858]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
