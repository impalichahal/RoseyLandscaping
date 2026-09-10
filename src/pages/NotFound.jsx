import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section bg-white">
      <div className="container max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-[#2e7d32]">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#222222]">Page not found.</h1>
        <p className="mt-5 text-lg text-[#595959]">
          The page you’re looking for may have moved or no longer exists.
        </p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-[#2e7d32] px-6 py-3 text-sm font-semibold text-white">Back to home</Link>
      </div>
    </section>
  )
}
