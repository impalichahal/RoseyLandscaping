import { useState } from 'react'
import { FORM_ENDPOINT } from '../config/siteConfig'

const initialState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  contactMethod: 'Phone',
  message: '',
}

const validators = {
  name: (value) => value.trim().length >= 2,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value) => value.trim().length >= 7,
  service: (value) => value.trim().length > 0,
  message: (value) => value.trim().length >= 10,
}

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const validate = () => {
    const nextErrors = {}
    Object.entries(validators).forEach(([field, validateField]) => {
      if (!validateField(formData[field])) {
        nextErrors[field] = 'Please enter a valid value.'
      }
    })
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setStatus('success')
      setFormData(initialState)
      setErrors({})
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[28px] bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.08)] md:p-8" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#222222]">Name</label>
          <input id="name" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fbfbfa] px-4 py-3 text-[#222]" />
          {errors.name && <p className="mt-2 text-sm text-[#b42318]">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#222222]">Email</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fbfbfa] px-4 py-3 text-[#222]" />
          {errors.email && <p className="mt-2 text-sm text-[#b42318]">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#222222]">Phone</label>
          <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fbfbfa] px-4 py-3 text-[#222]" />
          {errors.phone && <p className="mt-2 text-sm text-[#b42318]">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-medium text-[#222222]">Service</label>
          <select id="service" name="service" value={formData.service} onChange={handleChange} className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fbfbfa] px-4 py-3 text-[#222]">
            <option value="">Select a service</option>
            <option value="Driveways">Driveways</option>
            <option value="Front Yard Landscaping">Front Yard Landscaping</option>
            <option value="Backyard Landscaping">Backyard Landscaping</option>
            <option value="Swimming Pool Design">Swimming Pool Design</option>
            <option value="Outdoor Kitchen">Outdoor Kitchen</option>
            <option value="Decks & Pergolas">Decks & Pergolas</option>
            <option value="Stonework">Stonework</option>
          </select>
          {errors.service && <p className="mt-2 text-sm text-[#b42318]">{errors.service}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contactMethod" className="mb-2 block text-sm font-medium text-[#222222]">Preferred Contact Method</label>
        <select id="contactMethod" name="contactMethod" value={formData.contactMethod} onChange={handleChange} className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fbfbfa] px-4 py-3 text-[#222]">
          <option value="Phone">Phone</option>
          <option value="Email">Email</option>
          <option value="Text">Text</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#222222]">Message</label>
        <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fbfbfa] px-4 py-3 text-[#222]" />
        {errors.message && <p className="mt-2 text-sm text-[#b42318]">{errors.message}</p>}
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="rounded-full bg-[#2e7d32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#256b2a] disabled:cursor-not-allowed disabled:opacity-60" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Request a Free Quote'}
        </button>
        {status === 'success' && <p className="text-sm font-medium text-[#2e7d32]">Your request has been submitted successfully.</p>}
        {status === 'error' && <p className="text-sm font-medium text-[#b42318]">Please fix the highlighted fields and try again.</p>}
      </div>

      <p className="mt-4 text-xs text-[#666]">
        Form configuration is ready for a future email endpoint. Update the value in <span className="font-semibold">src/config/siteConfig.js</span>.
      </p>
    </form>
  )
}
