/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://your-project.pages.dev', // 改為您嘅 Cloudflare 域名
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: 'public',
}