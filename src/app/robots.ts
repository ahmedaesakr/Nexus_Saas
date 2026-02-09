import { MetadataRoute } from 'next';

/**
 * Robots.txt Generator for Nexus DAM SaaS
 * 
 * Best practices implemented:
 * - Allow all crawlers by default
 * - Reference sitemap for discovery
 * - Block sensitive routes (API, internal paths)
 * - Allow main pages for indexing
 */

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nexus.app';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',           // API routes should not be indexed
                    '/_next/',         // Next.js internals
                    '/private/',       // Future private routes
                    '/*.json$',        // JSON files
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/api/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
