import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { blogPosts } from '../data/blogPosts'
import { defaultMeta } from '../config/siteConfig'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find((item) => item.slug === slug)

  useEffect(() => {
    if (!post) {
      document.title = 'Article Not Found | Rosey Lanscaping'
      return
    }
    document.title = `${post.title} | ${defaultMeta.title}`
  }, [post])

  if (!post) {
    return (
      <section className="section">
        <div className="container max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#2e7d32]">Article not found</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#222]">This article could not be found.</h1>
          <Link to="/blog" className="mt-8 inline-flex rounded-full bg-[#2e7d32] px-6 py-3 text-sm font-semibold text-white">Back to blog</Link>
        </div>
      </section>
    )
  }

  const relatedPosts = blogPosts.filter((item) => item.id !== post.id).slice(0, 3)

  return (
    <>
      <article className="section bg-white">
        <div className="container max-w-4xl">
          <div className="overflow-hidden rounded-[30px]">
            <img src={post.image} alt={post.title} className="h-[420px] w-full object-cover" />
          </div>
          <div className="mt-8">
            <div className="flex flex-wrap gap-4 text-sm uppercase tracking-[0.18em] text-[#5f8f61]">
              <span>{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-[#222222] md:text-6xl">{post.title}</h1>
            <div className="mt-8 space-y-6 text-lg text-[#565656]">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link to="/blog" className="mt-10 inline-flex rounded-full bg-[#2e7d32] px-6 py-3 text-sm font-semibold text-white">Return to blog</Link>
          </div>
        </div>
      </article>

      <section className="section bg-[#f5f5f3]">
        <div className="container">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#222222]">More from the journal</h2>
          <div className="mt-8 grid gap-7 md:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link key={related.id} to={`/blog/${related.slug}`} className="overflow-hidden rounded-[24px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
                <img src={related.image} alt={related.title} className="h-56 w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#5f8f61]">{related.category}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-[#222222]">{related.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
