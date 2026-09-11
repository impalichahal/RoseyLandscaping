import { Link } from 'react-router-dom'
import { ADDRESS, BUSINESS_HOURS, COMPANY_NAME, EMAIL, SOCIAL_LINKS, BUSINESS_PHONE } from '../config/siteConfig'
import { services } from '../data/services'
import logo from '../images/logo.png'

export default function Footer() {
  return (
    <footer className="bg-[#1f1f1f] text-[#f0f0f0]">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Rosey Landscaping logo" className="h-20 w-20 object-contain" />
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[#baddbf]">Rosey</div>
                <h3 className="text-xl font-semibold text-white">{COMPANY_NAME}</h3>
              </div>
            </div>
            <p className="mt-5 max-w-md text-[#d7d7d7]">
              Thoughtful landscaping and outdoor construction designed to elevate everyday living and create lasting value.
            </p>
            <div className="mt-6 flex gap-3">
              {Object.entries(SOCIAL_LINKS).map(([key, value]) => (
                <a key={key} href={value} target="_blank" rel="noreferrer" aria-label={key} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm uppercase text-white transition hover:bg-[#2e7d32]">
                  {key.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#dfe9e1]">Quick links</h4>
            <ul className="mt-5 space-y-3 text-[#d7d7d7]">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#dfe9e1]">Services</h4>
            <ul className="mt-5 space-y-3 text-[#d7d7d7]">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}><Link to={`/services/${service.slug}`}>{service.title}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#dfe9e1]">Contact</h4>
            <ul className="mt-5 space-y-3 text-[#d7d7d7]">
              <li><a href={`tel:${BUSINESS_PHONE}`}>{BUSINESS_PHONE}</a></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li>{ADDRESS}</li>
              <li>{BUSINESS_HOURS}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-[#d7d7d7] md:flex-row md:items-center md:justify-between">
          <p>© 2026 {COMPANY_NAME}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
