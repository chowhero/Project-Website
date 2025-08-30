export default function sitemap() {
  return [
    {
      url: 'https://usarmyrbx.pages.dev/', // 改為您嘅 Cloudflare 域名
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.00,
    },
    {
      url: 'https://usarmyrbx.pages.dev/index.html',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: 'https://usarmyrbx.pages.dev/ownership.html',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: 'https://usarmyrbx.pages.dev/specialthanks.html',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: 'https://usarmyrbx.pages.dev/division.html',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: 'https://usarmyrbx.pages.dev/gamepasses.html',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: 'https://usarmyrbx.pages.dev/application.html',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: 'https://usarmyrbx.pages.dev/login.html',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.80,
    },
  ]
}