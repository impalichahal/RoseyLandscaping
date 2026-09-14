import { useEffect } from 'react'
import ContactForm from '../components/ContactForm'
import { ADDRESS, BUSINESS_HOURS, BUSINESS_PHONE, EMAIL, GOOGLE_MAP_URL, defaultMeta } from '../config/siteConfig'

export default function Contact() {
  useEffect(() => {
    document.title = `Contact | ${defaultMeta.title}`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Contact our landscaping studio to request a quote for your next outdoor project.')
  }, [])

  return (
    <>
      <section className="bg-[#f5f5f3] py-20">
        <div className="container max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#2e7d32]">Contact</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#222222] md:text-6xl">Let’s plan your next outdoor transformation.</h1>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] bg-[#f5f5f3] p-7 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
              <h2 className="text-3xl font-semibold text-[#222222]">Get in touch</h2>
              <ul className="mt-6 space-y-4 text-[#444]">
                <li><strong className="text-[#222]">Phone:</strong> <a href={`tel:${BUSINESS_PHONE}`} className="text-[#2e7d32]">{BUSINESS_PHONE}</a></li>
                <li><strong className="text-[#222]">Email:</strong> <a href={`mailto:${EMAIL}`} className="text-[#2e7d32]">{EMAIL}</a></li>
                <li><strong className="text-[#222]">Address:</strong> {ADDRESS}</li>
                <li><strong className="text-[#222]">Hours:</strong> {BUSINESS_HOURS}</li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-[#e7e7e7] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
              <iframe
                title="Map to Rosey Landscaping"
                src={GOOGLE_MAP_URL}
                className="h-[360px] w-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  )
}
