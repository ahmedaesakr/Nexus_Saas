import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Nexus Flow - Autonomous Workflow OS",
        short_name: "Nexus",
        description: "Coordinate agents, workflows, and execution systems from one premium Web3-native control surface.",
        start_url: "/",
        display: "standalone",
        background_color: "#050505",
        theme_color: "#8CFF4B",
        icons: [
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/icon-maskable-192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/icon-maskable-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
        categories: ["productivity", "business", "utilities"],
        orientation: "portrait",
    };
}
