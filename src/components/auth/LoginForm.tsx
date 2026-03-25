"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
                setIsLoading(false);
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch {
            setError("Something went wrong");
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => signIn("google", { callbackUrl: "/dashboard" });
    const handleGithubLogin = () => signIn("github", { callbackUrl: "/dashboard" });

    const handleAdminLogin = async () => {
        setIsLoading(true);
        const result = await signIn("credentials", {
            email: "admin@nexus.flow",
            password: "admin",
            redirect: false,
        });

        if (!result?.error) {
            router.push("/dashboard");
            router.refresh();
        } else {
            setIsLoading(false);
            setError("Admin login failed");
        }
    };

    return (
        <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-primary/8 border border-primary/15">
                <button
                    onClick={handleAdminLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                    Quick Admin Login (Dev)
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-300 text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@company.com"
                        required
                        className="field-input px-4 py-3.5"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        className="field-input px-4 py-3.5"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="primary-button btn-tactile w-full py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        "Sign in"
                    )}
                </button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#0a0d0a] px-2 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={handleGithubLogin}
                        className="secondary-button px-4 py-3 text-sm font-medium"
                    >
                        <span className="material-symbols-outlined text-lg">code</span>
                        GitHub
                    </button>
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="secondary-button px-4 py-3 text-sm font-medium"
                    >
                        <span className="material-symbols-outlined text-lg">work</span>
                        Google
                    </button>
                </div>
            </form>
        </div>
    );
}
