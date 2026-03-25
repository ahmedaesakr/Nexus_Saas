import { Suspense } from "react";
import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Create your Nexus Flow account and start orchestrating workflows",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "/signup",
    },
};

export default function SignupPage() {
    return (
        <div className="space-y-6 liquid-glass liquid-glass-elevated p-8 rounded-[28px]">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white">Get started free</h1>
                <p className="text-gray-400">
                    Launch your first autonomous workflow system
                </p>
            </div>

            <Suspense fallback={<div className="h-80 animate-pulse rounded-xl bg-white/5" />}>
                <SignupForm />
            </Suspense>

            <p className="text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-primary hover:text-primary-hover transition-colors"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}
