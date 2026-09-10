import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { COMPANY_NAME } from '../config/siteConfig'
import { services } from '../data/services'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) {
      setServicesOpen(false)
    }
  }, [mobileOpen])

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#f5f5f3]/90 shadow-[0_12px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3" aria-label="Go to homepage">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2e7d32] text-lg font-bold text-white">
            V
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2e7d32]">Rosey</div>
            <div className="text-lg font-semibold text-[#222222]">{COMPANY_NAME}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map((item) =>
            item.label === 'Services' ? (
              <div key={item.to} className="relative">
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-[#222222] transition hover:text-[#2e7d32]"
                  onClick={() => setServicesOpen((open) => !open)}
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                >
                  {item.label}
                  <span aria-hidden="true">▾</span>
                </button>
                {servicesOpen && (
                  <div id="services-menu" className="absolute left-0 top-full mt-4 w-72 rounded-2xl border border-[#e7e7e7] bg-white p-3 shadow-[0_20px_50px_rgba(16,24,40,0.12)]">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services/${service.slug}`}
                        className="block rounded-xl px-3 py-2 text-sm text-[#3e3e3e] transition hover:bg-[#f5f5f3] hover:text-[#2e7d32]"
                        onClick={() => setServicesOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? 'text-[#2e7d32]' : 'text-[#222222] hover:text-[#2e7d32]'}`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href="tel:+15552147846" className="text-sm font-medium text-[#222222] transition hover:text-[#2e7d32]">
            +1 (555) 214-7846
          </a>
          <Link to="/contact" className="rounded-full bg-[#2e7d32] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(46,125,50,0.28)] transition hover:-translate-y-0.5 hover:bg-[#256b2a]">
            Get a Free Quote
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dfe7df] bg-white/80 text-[#222] lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className="text-xl">☰</span>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#e9e9e9] bg-[#f8f8f7] lg:hidden">
          <div className="container flex flex-col gap-1 py-4">
            {navItems.map((item) =>
              item.label === 'Services' ? (
                <div key={item.to} className="rounded-2xl border border-[#e6e6e6] bg-white">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-[#222222]"
                    onClick={() => setServicesOpen((open) => !open)}
                    aria-expanded={servicesOpen}
                  >
                    {item.label}
                    <span>{servicesOpen ? '−' : '+'}</span>
                  </button>
                  {servicesOpen && (
                    <div className="border-t border-[#efefef] px-4 py-2">
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services/${service.slug}`}
                          className="block rounded-xl px-2 py-2 text-sm text-[#4d4d4d]"
                          onClick={() => setMobileOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 font-medium ${isActive ? 'bg-[#edf3ee] text-[#2e7d32]' : 'text-[#222222]'}`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ),
            )}
            <Link
              to="/contact"
              className="mt-3 rounded-full bg-[#2e7d32] px-5 py-3 text-center font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
