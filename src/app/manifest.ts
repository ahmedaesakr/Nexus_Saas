import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Nexus Flow - AI Automation Platform',
        short_name: 'Nexus Flow',
        description: 'Build and deploy autonomous AI agents to automate your business workflows.',
        start_url: '/',
        display: 'standalone',
        background_color: '#050a14',
        theme_color: '#0d59f2',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/icon-maskable-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/icon-maskable-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
        categories: ['productivity', 'business', 'utilities'],
        orientation: 'portrait',
    };
}
