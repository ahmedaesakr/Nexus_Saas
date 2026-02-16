"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "What types of workflows can I automate?",
        answer: "Nexus Flow can automate almost any text-based or API-driven task. Common use cases include lead qualification, customer support triage, data entry, social media management, and report generation."
    },
    {
        question: "Do I need to know how to code?",
        answer: "Not at all! Our visual workflow builder is completely drag-and-drop. You can build complex logic, loops, and conditions without writing a single line of code."
    },
    {
        question: "How do AI agents work?",
        answer: "Our AI agents are powered by advanced Large Language Models (LLMs) like Claude 3.5 Sonnet and GPT-4o. You give them a system prompt (instructions) and tools (integrations), and they intelligently execute tasks."
    },
    {
        question: "Is my data secure?",
        answer: "Security is our top priority. We use SOC 2 compliant infrastructure, encrypt all data at rest and in transit, and never train our models on your proprietary data without explicit permission."
    },
    {
        question: "Can I connect to my internal tools?",
        answer: "Yes! In addition to our 50+ native integrations, you can use our generic HTTP Request node to connect to any API, or use webhooks to trigger workflows from your internal systems."
    },
    {
        question: "Do you offer a free trial?",
        answer: "Yes, our Free plan is free forever for small usages. For paid plans, we offer a 14-day free trial so you can test the full capabilities of the platform."
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 relative z-10">
            <div className="container max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-xl bg-[#0c1018] border border-white/5 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors focus:outline-none"
                                aria-expanded={openIndex === index}
                            >
                                <span className="font-semibold text-white">{faq.question}</span>
                                <span className={`material-symbols-outlined transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : 'text-gray-500'}`} aria-hidden="true">
                                    expand_more
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
