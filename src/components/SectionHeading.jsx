export default function SectionHeading({ eyebrow, title, text, align = 'left', className = '' }) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'mx-auto max-w-3xl text-center' : ''} ${className}`}>
      {eyebrow && (
        <span className="mb-4 inline-block rounded-full border border-[#dfe8dc] bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2e7d32]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#222222] md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-lg text-[#555]">{text}</p>}
    </div>
  )
}
