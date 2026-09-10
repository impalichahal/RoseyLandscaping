import { Link } from 'react-router-dom'

export default function BlogCard({ post }) {
  return (
    <article className="blog-card group overflow-hidden rounded-[26px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
      <div className="overflow-hidden">
        <img src={post.image} alt={post.title} className="h-[260px] w-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.16em] text-[#7a7a7a]">
          <span>{post.date}</span>
          <span className="text-[#2e7d32]">{post.category}</span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-[#222222]">{post.title}</h3>
        <p className="mt-3 text-[#5a5a5a]">{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2e7d32]">
          Read more <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
