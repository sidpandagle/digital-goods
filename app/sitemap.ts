import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pixelforgestudio.in';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    },
  ];

  // Fetch dynamic bundle pages
  let bundlePages: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createClient();
    const { data: bundles, error } = await supabase
      .from('bundles')
      .select('id, updated_at')
      .order('created_at', { ascending: false });

    if (!error && bundles) {
      bundlePages = bundles.map((bundle) => ({
        url: `${baseUrl}/bundle/${bundle.id}`,
        lastModified: new Date(bundle.updated_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }));
    }
  } catch (error) {
    console.error('Error fetching bundles for sitemap:', error);
  }

  return [...staticPages, ...bundlePages];
}
