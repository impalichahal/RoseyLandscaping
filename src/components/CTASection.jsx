import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#1f1f1f] py-24">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1800&q=80"
          alt="Beautiful landscaping"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/85 to-[#121212]/60" />
      </div>
      <div className="container relative z-10 text-center text-white">
        <p className="text-sm uppercase tracking-[0.2em] text-[#dfe9e1]">Start your project</p>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Ready to Transform Your Outdoor Space?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-[#ebebeb]">
          Let’s bring your landscape vision to life with a refined design and a project plan built around your lifestyle.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/contact" className="rounded-full bg-[#2e7d32] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#256b2a]">
            Get a Free Quote
          </Link>
          <a href="tel:+1(236)883-1316" className="rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/15">
            Call Us
          </a>
        </div>
      </div>
    </section>
  )
}
