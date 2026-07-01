import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elavivephysio.com'

const servicesSlugs = ['spine-back', 'knee-joint', 'shoulder', 'sports-injury', 'post-surgical-rehab', 'neuro-rehab']
const blogSlugs = ['morning-habits-back-pain', 'after-acl-surgery', 'painkillers-not-a-plan', 'return-to-running-after-knee-injury', 'office-chair-posture', 'first-physiotherapy-visit']

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/about', '/services', '/contact', '/blog'].map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '/' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route === '/' ? 1.0 : route === '/contact' ? 0.9 : 0.8,
  }))

  const serviceRoutes = servicesSlugs.map(slug => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blogRoutes = blogSlugs.map(slug => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes]
}
