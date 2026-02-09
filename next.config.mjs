/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // serverActions: true, // (Next.js 14 default)
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    // typescript: {
    //   ignoreBuildErrors: true, // During prototyping
    // },
    // eslint: {
    //   ignoreDuringBuilds: true, // During prototyping
    // },
};

export default nextConfig;
