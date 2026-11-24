import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SEO } from './src/constants/index.js'

// Fill the HTML shell's metadata from the centralized portfolio data so the
// values are never duplicated by hand in index.html.
const SEO_TOKENS = {
  __SEO_TITLE__: SEO.title,
  __SEO_DESCRIPTION__: SEO.description,
  __SEO_SOCIAL_DESCRIPTION__: SEO.socialDescription,
  __SEO_TWITTER_CARD__: SEO.twitterCard,
  __SEO_THEME_COLOR__: SEO.themeColor,
}

const htmlSeoPlugin = () => ({
  name: 'portfolio-html-seo',
  transformIndexHtml: (html) =>
    html.replace(/__SEO_[A-Z_]+__/g, (token) => SEO_TOKENS[token] ?? token),
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    htmlSeoPlugin(),
  ],
})
