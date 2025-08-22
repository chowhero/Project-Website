import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://us-army-rbx.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.00,
    },
    {
      url: 'https://us-army-rbx.vercel.app/index.html',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: 'https://us-army-rbx.vercel.app/ownership.html',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: 'https://us-army-rbx.vercel.app/specialthanks.html',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: 'https://us-army-rbx.vercel.app/division.html',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: 'https://us-army-rbx.vercel.app/gamepasses.html',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: 'https://us-army-rbx.vercel.app/application.html',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: 'https://us-army-rbx.vercel.app/login.html',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.80,
    },
  ]
}