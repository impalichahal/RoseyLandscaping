export default function Button({ children, variant = 'primary', as = 'button', to, href, className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none'
  const variants = {
    primary: 'bg-[#2e7d32] text-white shadow-[0_14px_28px_rgba(46,125,50,0.28)] hover:bg-[#256b2a]',
    secondary: 'bg-white text-[#222222] border border-[#e7e7e7] hover:bg-[#f5f5f3]',
    light: 'bg-white/12 text-white border border-white/40 hover:bg-white/18',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (as === 'a' && href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  if (as === 'link' && to) {
    return (
      <a href={to} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
