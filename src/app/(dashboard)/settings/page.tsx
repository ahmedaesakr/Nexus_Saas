"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type BillingUsageResponse = {
    plan: "FREE" | "STARTER" | "PRO" | "ENTERPRISE";
    usage: {
        workflows: { current: number; limit: number | null; remaining: number | null };
        agents: { current: number; limit: number | null; remaining: number | null };
        monthlyExecutions: { current: number; limit: number | null; remaining: number | null };
    };
};

type OrganizationSettingsResponse = {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
    plan: "FREE" | "STARTER" | "PRO" | "ENTERPRISE";
    role: "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";
};

type TeamMember = {
    id: string;
    name: string | null;
    email: string;
    role: "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";
    image: string | null;
};

type TeamResponse = {
    canManage: boolean;
    currentUserId: string;
    currentUserRole: "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";
    members: TeamMember[];
};

function formatLimit(limit: number | null): string {
    return limit === null ? "Unlimited" : String(limit);
}

function roleLabel(role: TeamMember["role"]): string {
    if (role === "OWNER") return "Owner";
    if (role === "ADMIN") return "Admin";
    if (role === "MEMBER") return "Member";
    return "Viewer";
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");
    const [billingData, setBillingData] = useState<BillingUsageResponse | null>(null);
    const [billingError, setBillingError] = useState<string | null>(null);
    const [organization, setOrganization] = useState<OrganizationSettingsResponse | null>(null);
    const [workspaceName, setWorkspaceName] = useState("");
    const [generalStatus, setGeneralStatus] = useState<string | null>(null);
    const [teamData, setTeamData] = useState<TeamResponse | null>(null);
    const [teamError, setTeamError] = useState<string | null>(null);
    const [teamStatus, setTeamStatus] = useState<string | null>(null);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState<"ADMIN" | "MEMBER" | "VIEWER">("MEMBER");
    const [isSaving, setIsSaving] = useState(false);
    const [isInviting, setIsInviting] = useState(false);

    const tabs = [
        { id: "general", label: "General", icon: "settings" },
        { id: "billing", label: "Billing & Plans", icon: "credit_card" },
        { id: "team", label: "Team Members", icon: "group" },
        { id: "api", label: "API Keys", icon: "key" },
        { id: "notifications", label: "Notifications", icon: "notifications" },
    ];

    useEffect(() => {
        const fetchBilling = async () => {
            try {
                const response = await fetch("/api/billing/usage");
                if (!response.ok) {
                    throw new Error("Failed to load billing usage");
                }
                const data = (await response.json()) as BillingUsageResponse;
                setBillingData(data);
            } catch (error) {
                setBillingError("Unable to load billing usage");
            }
        };

        fetchBilling();
    }, []);

    useEffect(() => {
        const fetchOrganization = async () => {
            try {
                const response = await fetch("/api/settings/organization");
                if (!response.ok) {
                    throw new Error("Failed to load organization settings");
                }
                const data = (await response.json()) as OrganizationSettingsResponse;
                setOrganization(data);
                setWorkspaceName(data.name);
            } catch (error) {
                setGeneralStatus("Unable to load organization settings");
            }
        };

        const fetchTeam = async () => {
            try {
                const response = await fetch("/api/settings/team");
                if (!response.ok) {
                    throw new Error("Failed to load team members");
                }
                const data = (await response.json()) as TeamResponse;
                setTeamData(data);
            } catch (error) {
                setTeamError("Unable to load team members");
            }
        };

        fetchOrganization();
        fetchTeam();
    }, []);

    const saveGeneralSettings = async () => {
        setIsSaving(true);
        setGeneralStatus(null);

        try {
            const response = await fetch("/api/settings/organization", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: workspaceName }),
            });

            if (!response.ok) {
                const payload = await response.json();
                throw new Error(payload?.message || "Failed to save settings");
            }

            const updated = (await response.json()) as OrganizationSettingsResponse;
            setOrganization((prev) => (prev ? { ...prev, ...updated } : null));
            setWorkspaceName(updated.name);
            setGeneralStatus("Workspace settings saved.");
        } catch (error) {
            setGeneralStatus(error instanceof Error ? error.message : "Failed to save settings");
        } finally {
            setIsSaving(false);
        }
    };

    const updateMemberRole = async (userId: string, role: TeamMember["role"]) => {
        setTeamStatus(null);

        try {
            const response = await fetch(`/api/settings/team/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role }),
            });

            if (!response.ok) {
                const payload = await response.json();
                throw new Error(payload?.message || "Failed to update member role");
            }

            const updated = (await response.json()) as TeamMember;
            setTeamData((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    members: prev.members.map((member) => (member.id === userId ? { ...member, role: updated.role } : member)),
                };
            });
            setTeamStatus("Role updated.");
        } catch (error) {
            setTeamStatus(error instanceof Error ? error.message : "Failed to update member role");
        }
    };

    const removeMember = async (userId: string) => {
        setTeamStatus(null);

        try {
            const response = await fetch(`/api/settings/team/${userId}`, { method: "DELETE" });

            if (!response.ok) {
                const payload = await response.json();
                throw new Error(payload?.message || "Failed to remove member");
            }

            setTeamData((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    members: prev.members.filter((member) => member.id !== userId),
                };
            });
            setTeamStatus("Member removed.");
        } catch (error) {
            setTeamStatus(error instanceof Error ? error.message : "Failed to remove member");
        }
    };

    const sendInvite = async () => {
        setIsInviting(true);
        setTeamStatus(null);

        try {
            const response = await fetch("/api/settings/team/invite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
            });

            if (!response.ok) {
                const payload = await response.json();
                throw new Error(payload?.message || "Failed to send invite");
            }

            setInviteEmail("");
            setInviteRole("MEMBER");
            setTeamStatus("Invite sent.");
        } catch (error) {
            setTeamStatus(error instanceof Error ? error.message : "Failed to send invite");
        } finally {
            setIsInviting(false);
        }
    };

    return (
        <div className="p-8 container animate-fade-in space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                    <p className="text-gray-400">Manage your workspace preferences and configuration.</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="w-full lg:w-64 space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                    ? "bg-primary text-white shadow-[0_0_15px_rgba(13,89,242,0.3)]"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-[#0c1018] border border-white/10 rounded-2xl p-8 min-h-[500px]">
                    {activeTab === "general" && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-xl font-bold text-white mb-4">Workspace General</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Workspace Name</label>
                                    <input
                                        type="text"
                                        value={workspaceName}
                                        onChange={(e) => setWorkspaceName(e.target.value)}
                                        disabled={!organization || (organization.role !== "OWNER" && organization.role !== "ADMIN")}
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Support Email</label>
                                    <input
                                        type="email"
                                        value={organization?.slug ? `${organization.slug}@nexusflow.app` : ""}
                                        disabled
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <button
                                    onClick={saveGeneralSettings}
                                    disabled={!organization || (organization.role !== "OWNER" && organization.role !== "ADMIN") || isSaving}
                                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(13,89,242,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                                {generalStatus && <p className="text-sm text-gray-400 mt-3">{generalStatus}</p>}
                            </div>
                        </div>
                    )}

                    {activeTab === "billing" && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-xl font-bold text-white mb-4">Plan & Billing</h2>

                            <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/10 mb-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                <div className="flex justify-between items-start relative z-10">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Current Plan</p>
                                        <h3 className="text-2xl font-bold text-white">
                                            {billingData ? `${billingData.plan} Plan` : "Loading..."}
                                        </h3>
                                        <p className="text-sm text-gray-400 mt-2">
                                            {billingData ? "Usage and limits update in real time." : "Fetching billing details..."}
                                        </p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/20 text-xs font-bold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        Active
                                    </span>
                                </div>
                            </div>

                            {billingData && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-sm text-gray-400">Workflows</p>
                                        <p className="text-xl font-semibold text-white mt-1">
                                            {billingData.usage.workflows.current} / {formatLimit(billingData.usage.workflows.limit)}
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-sm text-gray-400">Agents</p>
                                        <p className="text-xl font-semibold text-white mt-1">
                                            {billingData.usage.agents.current} / {formatLimit(billingData.usage.agents.limit)}
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-sm text-gray-400">Monthly Executions</p>
                                        <p className="text-xl font-semibold text-white mt-1">
                                            {billingData.usage.monthlyExecutions.current} / {formatLimit(billingData.usage.monthlyExecutions.limit)}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {billingError && (
                                <p className="text-sm text-red-400">{billingError}</p>
                            )}

                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-white">Payment Method</h3>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                                            <span className="material-symbols-outlined text-gray-800">credit_card</span>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Visa ending in 4242</p>
                                            <p className="text-xs text-gray-500">Expires 12/28</p>
                                        </div>
                                    </div>
                                    <button className="text-sm text-primary hover:text-white transition-colors">Edit</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "team" && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-xl font-bold text-white mb-4">Team Members</h2>
                            {teamError && <p className="text-sm text-red-400">{teamError}</p>}
                            {teamStatus && <p className="text-sm text-gray-400">{teamStatus}</p>}

                            {teamData?.canManage && (
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <p className="text-sm font-medium text-white mb-3">Invite Member</p>
                                    <div className="grid grid-cols-1 md:grid-cols-[1fr_180px_auto] gap-3">
                                        <input
                                            type="email"
                                            value={inviteEmail}
                                            onChange={(e) => setInviteEmail(e.target.value)}
                                            placeholder="name@company.com"
                                            className="px-3 py-2 bg-[#0f1420] border border-white/10 rounded-lg text-sm text-white outline-none focus:border-primary"
                                        />
                                        <select
                                            value={inviteRole}
                                            onChange={(e) => setInviteRole(e.target.value as "ADMIN" | "MEMBER" | "VIEWER")}
                                            className="px-3 py-2 bg-[#0f1420] border border-white/10 rounded-lg text-sm text-white outline-none focus:border-primary"
                                        >
                                            {teamData.currentUserRole === "OWNER" && <option value="ADMIN">Admin</option>}
                                            <option value="MEMBER">Member</option>
                                            <option value="VIEWER">Viewer</option>
                                        </select>
                                        <button
                                            onClick={sendInvite}
                                            disabled={!inviteEmail || isInviting}
                                            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {isInviting && <Loader2 className="w-4 h-4 animate-spin" />}
                                            {isInviting ? "Sending..." : "Send Invite"}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {!teamData && !teamError && (
                                <p className="text-sm text-gray-400">Loading team members...</p>
                            )}

                            {teamData && (
                                <div className="bg-[#0f1420] border border-white/10 rounded-2xl overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/10 bg-white/5">
                                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Member</th>
                                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {teamData.members.map((member) => {
                                                const isCurrentUser = member.id === teamData.currentUserId;
                                                const canManage = teamData.canManage && !isCurrentUser && member.role !== "OWNER";
                                                return (
                                                    <tr key={member.id} className="hover:bg-white/5 transition-colors">
                                                        <td className="px-4 py-3">
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-medium text-white">{member.name || "Unnamed User"}</span>
                                                                <span className="text-xs text-gray-400">{member.email}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {member.role === "OWNER" ? (
                                                                <p className="text-xs text-gray-300">{roleLabel(member.role)}</p>
                                                            ) : (
                                                                <select
                                                                    value={member.role}
                                                                    onChange={(e) => updateMemberRole(member.id, e.target.value as TeamMember["role"])}
                                                                    disabled={!canManage}
                                                                    className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs focus:border-primary outline-none disabled:opacity-50"
                                                                >
                                                                    <option value="ADMIN">Admin</option>
                                                                    <option value="MEMBER">Member</option>
                                                                    <option value="VIEWER">Viewer</option>
                                                                </select>
                                                            )}
                                                            {!canManage && member.role !== "OWNER" && (
                                                                <p className="text-[11px] text-gray-500 mt-1">{roleLabel(member.role)}</p>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 text-right">
                                                            <button
                                                                onClick={() => removeMember(member.id)}
                                                                disabled={!canManage}
                                                                className="text-xs px-3 py-1 rounded border border-white/10 text-gray-300 hover:text-red-400 hover:border-red-400/40 disabled:opacity-40 disabled:cursor-not-allowed"
                                                            >
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {(activeTab === "api" || activeTab === "notifications") && (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-fade-in min-h-[300px]">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                <span className="material-symbols-outlined text-3xl text-gray-600">construction</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Under Construction</h3>
                                <p className="text-gray-400 max-w-sm mx-auto">This module is currently being built by our autonomous agents. Check back soon.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
