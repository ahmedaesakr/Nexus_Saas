import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nexusflow.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Nexus Flow - Autonomous Workflow OS",
    template: "%s | Nexus Flow",
  },
  description:
    "Nexus Flow is a Web3-native workflow platform for orchestrating agents, automations, and execution pipelines from one control plane.",
  keywords: [
    "AI automation",
    "workflow automation",
    "autonomous agents",
    "web3 SaaS",
    "agent orchestration",
    "B2B",
  ],
  authors: [{ name: "Nexus Flow Team" }],
  creator: "Nexus Flow",
  publisher: "Nexus Flow",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Nexus Flow",
    title: "Nexus Flow - Automate Operators, Agents, And Execution",
    description:
      "Build autonomous workflow systems with a premium control layer for agents, triggers, integrations, and execution telemetry.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nexus Flow Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Flow - Autonomous Workflow OS",
    description: "Build, monitor, and scale autonomous workflows from one command surface.",
    images: ["/og-image.png"],
    creator: "@nexusflow",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon-192.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#050505" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
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
      <body className={`${outfit.variable} ${jakarta.variable} font-sans antialiased selection:bg-primary selection:text-black`}>
        <Providers key="providers">{children}</Providers>
      </body>
    </html>
  );
}
