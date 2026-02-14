"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "Nexus Flow has completely transformed how our sales team operates. We've automated 80% of our lead qualification process.",
        author: "Sarah Jenkins",
        role: "VP of Sales",
        company: "TechGrowth Inc.",
        avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        quote: "The visual builder makes it incredibly easy to create complex workflows without writing a single line of code. It's a game changer.",
        author: "Michael Chen",
        role: "Head of Operations",
        company: "ScaleUp Solutions",
        avatar: "https://i.pravatar.cc/150?u=michael"
    },
    {
        quote: "I was skeptical about AI agents at first, but the accuracy and reliability of Nexus Flow blew me away. It's like hiring 10 extra employees.",
        author: "Jessica Williams",
        role: "Marketing Director",
        company: "Creative Pulse",
        avatar: "https://i.pravatar.cc/150?u=jessica"
    }
];

export function TestimonialsSection() {
    return (
        <section className="py-24 bg-[#0c1018] relative z-10 border-y border-white/5">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Loved by Teams
                    </h2>
                    <p className="text-xl text-gray-400">
                        Join thousands of companies automating their growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-2xl bg-[#050a14] border border-white/5 relative"
                        >
                            <span className="material-symbols-outlined text-4xl text-primary/20 absolute top-8 left-8">format_quote</span>
                            <p className="text-gray-300 mb-8 relative z-10 pt-6 italic leading-relaxed">
                                &quot;{t.quote}&quot;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                                    {/* In a real app, use next/image here */}
                                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-xs text-white">
                                        {t.author[0]}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">{t.author}</h4>
                                    <p className="text-gray-500 text-xs">{t.role}, {t.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
