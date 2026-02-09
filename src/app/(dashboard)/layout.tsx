import { Sidebar } from "@/components/layout/Sidebar";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <Sidebar />
            <main className="pl-64 min-h-screen transition-all duration-300">
                {children}
            </main>
            <OnboardingModal />
        </div>
    );
}
