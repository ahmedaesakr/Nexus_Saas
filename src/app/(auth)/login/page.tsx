import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Sign in to your Nexus Flow account",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "/login",
    },
};

export default function LoginPage() {
    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
                <p className="text-gray-400">
                    Enter your credentials to access your workspace
                </p>
            </div>

            <LoginForm />

            <p className="text-center text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                    href="/signup"
                    className="font-medium text-primary hover:text-primary-hover transition-colors"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
}
