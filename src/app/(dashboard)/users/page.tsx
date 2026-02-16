"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TeamMember {
    id: string;
    name: string | null;
    email: string;
    role: string;
    image: string | null;
    createdAt: string;
}

interface TeamData {
    members: TeamMember[];
    canManage: boolean;
    currentUser: { id: string; role: string };
}

export default function TeamPage() {
    const [data, setData] = useState<TeamData | null>(null);
    const [loading, setLoading] = useState(true);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("MEMBER");
    const [showInvite, setShowInvite] = useState(false);
    const [sending, setSending] = useState(false);

    const fetchTeam = () => {
        fetch("/api/settings/team")
            .then((res) => (res.ok ? res.json() : null))
            .then(setData)
            .catch(() => setData(null))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchTeam(); }, []);

    const handleInvite = async () => {
        if (!inviteEmail) return;
        setSending(true);
        try {
            const res = await fetch("/api/settings/team/invite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to send invite");
            }
            toast.success("Invite sent!");
            setInviteEmail("");
            setShowInvite(false);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSending(false);
        }
    };

    const handleRoleChange = async (userId: string, role: string) => {
        try {
            const res = await fetch(`/api/settings/team/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }
            toast.success("Role updated");
            fetchTeam();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleRemove = async (userId: string, name: string | null) => {
        if (!confirm(`Remove ${name || "this member"} from the team?`)) return;
        try {
            const res = await fetch(`/api/settings/team/${userId}`, { method: "DELETE" });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }
            toast.success("Member removed");
            fetchTeam();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if (loading) {
        return (
            <div className="p-8 container animate-fade-in space-y-8">
                <div className="h-8 w-48 bg-white/5 rounded animate-pulse" />
                <div className="h-64 rounded-2xl bg-white/5 animate-pulse" />
            </div>
        );
    }

    const members = data?.members ?? [];
    const canManage = data?.canManage ?? false;

    return (
        <div className="p-8 container animate-fade-in space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Team Members</h1>
                    <p className="text-gray-400">Manage access and roles for your workspace.</p>
                </div>
                {canManage && (
                    <button
                        onClick={() => setShowInvite(!showInvite)}
                        className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold shadow-[0_0_20px_rgba(13,89,242,0.3)] hover:shadow-[0_0_30px_rgba(13,89,242,0.5)] transition-all btn-tactile flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined">person_add</span>
                        Invite Member
                    </button>
                )}
            </div>

            {/* Invite Form */}
            {showInvite && (
                <div className="p-6 bg-[#0c1018] border border-white/10 rounded-2xl flex flex-col sm:flex-row gap-4">
                    <input
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="Email address"
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 outline-none focus:border-primary transition-colors"
                    />
                    <select
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value)}
                        aria-label="Select role for invite"
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-primary transition-colors"
                    >
                        <option value="ADMIN">Admin</option>
                        <option value="MEMBER">Member</option>
                        <option value="VIEWER">Viewer</option>
                    </select>
                    <button
                        onClick={handleInvite}
                        disabled={sending || !inviteEmail}
                        className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-all disabled:opacity-50"
                    >
                        {sending ? "Sending..." : "Send Invite"}
                    </button>
                </div>
            )}

            {/* Users Table */}
            <div className="bg-[#0c1018] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            {canManage && (
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {members.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    No team members found
                                </td>
                            </tr>
                        ) : (
                            members.map((user) => {
                                const initials = (user.name || user.email).split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
                                const isCurrentUser = user.id === data?.currentUser.id;
                                return (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                                    {initials}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{user.name || "Unnamed"}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {canManage && !isCurrentUser && user.role !== "OWNER" ? (
                                                <select
                                                    value={user.role}
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                    aria-label={`Role for ${user.name || user.email}`}
                                                    className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs focus:border-primary outline-none"
                                                >
                                                    <option value="ADMIN">Admin</option>
                                                    <option value="MEMBER">Member</option>
                                                    <option value="VIEWER">Viewer</option>
                                                </select>
                                            ) : (
                                                <span className="capitalize text-xs">{user.role.toLowerCase()}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border bg-green-500/10 text-green-400 border-green-500/20">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                <span>Active</span>
                                            </div>
                                        </td>
                                        {canManage && (
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                {!isCurrentUser && user.role !== "OWNER" && (
                                                    <button
                                                        onClick={() => handleRemove(user.id, user.name)}
                                                        className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-red-400 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">delete</span>
                                                    </button>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
