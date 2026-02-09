"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function SignupForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate signup delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        router.push("/dashboard");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">
                    Full Name
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder:text-gray-500 transition-all"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Work Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder:text-gray-500 transition-all"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    required
                    minLength={8}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder:text-gray-500 transition-all"
                />
                <p className="text-xs text-gray-500">Must be at least 8 characters</p>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold shadow-[0_0_20px_rgba(13,89,242,0.3)] hover:shadow-[0_0_30px_rgba(13,89,242,0.5)] transition-all btn-tactile disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating account...
                    </>
                ) : (
                    "Create account"
                )}
            </button>

            <p className="text-xs text-center text-gray-500 px-4">
                By clicking continue, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-gray-300">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-gray-300">
                    Privacy Policy
                </Link>
                .
            </p>
        </form>
    );
}
