/** @type {import('next').NextConfig} */
const nextConfig = {
  // 啟用嚴格模式
  reactStrictMode: true,
  
  // 輸出模式（重要！）
  output: 'standalone',  // 或者 'export' 如果你要做純靜態網站
  
  // 圖片設定
  images: {
    unoptimized: true,   // Cloudflare 不需要 Next.js 圖片優化
  },
  
  // 關閉類型檢查（加快 build）
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint 設定
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig