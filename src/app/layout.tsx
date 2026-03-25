import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nexusflow.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Aura - Next-Gen Workflow Automation',
    template: '%s | Aura',
  },
  description: 'Automate your business processes with Aura. Build complex workflows visually and let autonomous agents execute them 24/7.',
  keywords: [
    'AI automation',
    'workflow automation',
    'autonomous agents',
    'business process automation',
    'SaaS',
    'B2B'
  ],
  authors: [{ name: 'Aura Team' }],
  creator: 'Aura Inc.',
  publisher: 'Aura Inc.',
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
    siteName: 'Aura',
    title: 'Aura - Automate Work. Amplify Teams.',
    description: 'Build AI-powered workflows that run 24/7. From sales follow-ups to customer onboarding—let intelligent agents handle the repetitive work.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aura Platform Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aura - Next-Gen Automation',
    description: 'The definitive platform for building autonomous AI agents.',
    images: ['/og-image.png'],
    creator: '@aurahq',
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
    { media: '(prefers-color-scheme: light)', color: '#030407' },
    { media: '(prefers-color-scheme: dark)', color: '#030407' },
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
      <body className={`${outfit.variable} ${jakarta.variable} font-sans antialiased selection:bg-primary selection:text-white`}>
        <Providers key="providers">
          {children}
        </Providers>
      </body>
    </html>
  );
}
