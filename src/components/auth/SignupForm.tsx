"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export function SignupForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const inviteToken = searchParams.get("invite") || "";
    const invitedEmail = searchParams.get("email") || "";
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: invitedEmail,
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    inviteToken: inviteToken || undefined,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Something went wrong");
            }

            toast.success("Account created! Signing you in...");

            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Account created but failed to auto-login. Please login manually.");
                router.push("/login");
            } else {
                router.push("/dashboard");
            }

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
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
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="field-input px-4 py-3.5"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Work Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    required
                    readOnly={Boolean(invitedEmail)}
                    className="field-input px-4 py-3.5"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    minLength={8}
                    className="field-input px-4 py-3.5"
                />
                <p className="text-xs text-gray-500">Must be at least 8 characters</p>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="primary-button btn-tactile w-full py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
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
