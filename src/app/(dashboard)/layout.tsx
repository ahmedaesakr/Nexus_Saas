import { Sidebar } from "@/components/layout/Sidebar";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="app-shell min-h-screen text-white">
            <Sidebar />
            <main className="md:pl-64 pl-0 min-h-screen transition-all duration-300 relative">
                {children}
            </main>
            <OnboardingModal />
        </div>
    );
}
