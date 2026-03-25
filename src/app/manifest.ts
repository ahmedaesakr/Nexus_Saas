import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Aura - AI Automation Platform',
        short_name: 'Aura',
        description: 'Build and deploy autonomous AI agents to automate your business workflows.',
        start_url: '/',
        display: 'standalone',
        background_color: '#030407',
        theme_color: '#00E5FF',
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
