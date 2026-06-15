import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://novum-mu.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/manifesto', '/about', '/lab', '/apply', '/contact'];
  const now = new Date();
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
