import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://nexusflow.app').replace(/\/$/, '');

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/_next/',
                '/dashboard',
                '/workflows',
                '/agents',
                '/executions',
                '/integrations',
                '/templates',
                '/users',
                '/settings',
                '/login',
                '/signup',
            ],
        },
        sitemap: [
            `${baseUrl}/sitemap.xml`,
        ],
        host: baseUrl,
    };
}
