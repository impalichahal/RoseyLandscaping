import { WHATSAPP_NUMBER } from '../config/siteConfig'

export default function WhatsAppButton() {
  const message = 'Welcome To Rosey Landscaping, we would like to know more about your landscaping services.'
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact Rosey Landscaping on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-2xl text-white shadow-[0_18px_40px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-105 focus-visible:outline-none"
      title="Contact Rosey Landscaping on WhatsApp"
    >
      WhatsApp
    </a>
  )
}
