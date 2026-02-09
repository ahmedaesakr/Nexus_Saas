import { Sidebar } from "@/components/layout/Sidebar";

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
        </div>
    );
}
