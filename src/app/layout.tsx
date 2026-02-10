import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nexusflow.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Nexus Flow - AI Workflow Automation Platform',
    template: '%s | Nexus Flow',
  },
  description: 'Automate your business processes with intelligent AI agents. Build complex workflows visually and let autonomous agents execute them 24/7.',
  keywords: [
    'AI automation',
    'workflow automation',
    'autonomous agents',
    'business process automation',
    'SaaS',
    'B2B'
  ],
  authors: [{ name: 'Nexus Flow Team' }],
  creator: 'Nexus Flow Inc.',
  publisher: 'Nexus Flow Inc.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Nexus Flow',
    title: 'Nexus Flow - Automate Work. Amplify Teams.',
    description: 'Build AI-powered workflows that run 24/7. From sales follow-ups to customer onboarding—let intelligent agents handle the repetitive work.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nexus Flow Platform Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexus Flow - AI Workflow Automation',
    description: 'The no-code platform for building autonomous AI agents.',
    images: ['/og-image.png'],
    creator: '@nexusflow',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon-192.png',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f6f8' },
    { media: '(prefers-color-scheme: dark)', color: '#050a14' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} antialiased selection:bg-primary selection:text-white`}>
        <a
          href="#main-content"
          className="absolute left-0 top-[-100px] z-[100] bg-primary text-white px-4 py-2 rounded-br-lg focus:top-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to content
        </a>
        <Providers key="providers">
          {children}
        </Providers>
      </body>
    </html>
  );
}
