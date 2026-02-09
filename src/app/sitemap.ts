import { MetadataRoute } from 'next';

/**
 * Dynamic Sitemap Generator for Nexus DAM SaaS
 * 
 * This sitemap follows programmatic SEO best practices:
 * - All important pages are included
 * - Proper priority hierarchy (homepage > main sections > sub-pages)
 * - changeFrequency based on content update patterns
 * - Base URL is configurable for production deployment
 */

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nexus.app';
    const currentDate = new Date();

    return [
        // Landing Page - Highest Priority
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        // Main Dashboard
        {
            url: `${baseUrl}/dashboard`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        // Core Features
        {
            url: `${baseUrl}/assets`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/analytics`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/integrations`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/users`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/settings`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];
}
