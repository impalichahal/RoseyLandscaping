import { useEffect } from 'react'
import BlogCard from '../components/BlogCard'
import CTASection from '../components/CTASection'
import { blogPosts } from '../data/blogPosts'
import { defaultMeta } from '../config/siteConfig'

export default function Blog() {
  useEffect(() => {
    document.title = `Blog | ${defaultMeta.title}`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Read design ideas, project stories, and seasonal landscaping guidance from our team.')
  }, [])

  return (
    <>
      <section className="bg-[#f5f5f3] py-20">
        <div className="container max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#2e7d32]">Latest posts</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#222222] md:text-6xl">Ideas for a more beautiful outdoor life.</h1>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  )
}
