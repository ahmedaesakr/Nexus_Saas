"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { WorkflowBuilder } from "@/components/workflows/WorkflowBuilder";
import { PropertiesPanel } from "@/components/workflows/PropertiesPanel";
import { TestRunModal } from "@/components/workflows/TestRunModal";
import { useNodesState, useEdgesState, addEdge, Connection, Edge, Node, MarkerType } from "@xyflow/react";

const defaultNodes: Node[] = [
    {
        id: "trigger-1",
        type: "trigger",
        position: { x: 250, y: 5 },
        data: { label: "New Lead (Webhook)", type: "webhook" },
    },
];

const defaultEdges: Edge[] = [];

function BuilderContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const workflowId = searchParams.get("id");

    const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [isTestRunOpen, setIsTestRunOpen] = useState(false);

    const [workflowName, setWorkflowName] = useState("Untitled Workflow");
    const [workflowStatus, setWorkflowStatus] = useState("DRAFT");
    const [currentId, setCurrentId] = useState<string | null>(workflowId);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(!!workflowId);
    const [isEditing, setIsEditing] = useState(false);

    // Load existing workflow
    useEffect(() => {
        if (!workflowId) return;
        fetch(`/api/workflows/${workflowId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load workflow");
                return res.json();
            })
            .then((wf) => {
                setWorkflowName(wf.name);
                setWorkflowStatus(wf.status);
                setCurrentId(wf.id);
                const def = wf.definition || { nodes: [], edges: [] };
                if (def.nodes?.length) setNodes(def.nodes);
                if (def.edges?.length) setEdges(def.edges);
            })
            .catch(() => toast.error("Failed to load workflow"))
            .finally(() => setLoading(false));
    }, [workflowId, setNodes, setEdges]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const definition = { nodes, edges };

            if (currentId) {
                // Update existing
                const res = await fetch(`/api/workflows/${currentId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: workflowName, definition }),
                });
                if (!res.ok) throw new Error("Failed to save");
                toast.success("Workflow saved");
            } else {
                // Create new
                const res = await fetch("/api/workflows", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: workflowName, definition }),
                });
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || "Failed to create");
                }
                const wf = await res.json();
                setCurrentId(wf.id);
                router.replace(`/workflows/builder?id=${wf.id}`);
                toast.success("Workflow created");
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    };

    const handlePublish = async () => {
        if (!currentId) {
            await handleSave();
        }
        if (!currentId) return;

        setSaving(true);
        try {
            const definition = { nodes, edges };
            const res = await fetch(`/api/workflows/${currentId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: workflowName, definition, status: "ACTIVE" }),
            });
            if (!res.ok) throw new Error("Failed to publish");
            setWorkflowStatus("ACTIVE");
            toast.success("Workflow published!");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    };

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, markerEnd: { type: MarkerType.ArrowClosed } }, eds)),
        [setEdges],
    );

    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleNodeChange = (updatedNode: Node) => {
        setNodes((nds) => nds.map((n) => (n.id === updatedNode.id ? updatedNode : n)));
        setSelectedNode(updatedNode);
    };

    const handleNodeSelect = (node: Node | null) => {
        setSelectedNode(node);
    };

    if (loading) {
        return (
            <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-[#0c1018] -m-8">
                <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-5 h-5 border-2 border-gray-500 border-t-primary rounded-full animate-spin" />
                    Loading workflow...
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col bg-[#0c1018] overflow-hidden -m-8 rounded-none">
            {/* Builder Header */}
            <header className="h-16 border-b border-white/10 bg-[#0c1018] flex items-center justify-between px-6 shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <Link href="/workflows" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 transition-colors">
                        <span className="material-symbols-outlined text-gray-400">arrow_back</span>
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={workflowName}
                                    onChange={(e) => setWorkflowName(e.target.value)}
                                    onBlur={() => setIsEditing(false)}
                                    onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
                                    aria-label="Workflow name"
                                    autoFocus
                                    className="text-sm font-bold text-white bg-white/10 border border-white/20 rounded px-2 py-0.5 outline-none focus:border-primary"
                                />
                            ) : (
                                <>
                                    <h1 className="text-sm font-bold text-white">{workflowName}</h1>
                                    <button type="button" onClick={() => setIsEditing(true)}>
                                        <span className="material-symbols-outlined text-gray-500 text-sm cursor-pointer hover:text-white">edit</span>
                                    </button>
                                </>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 capitalize">{workflowStatus.toLowerCase()}{currentId ? "" : " • Unsaved"}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-lg">save</span>
                        {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsTestRunOpen(true)}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">play_arrow</span>
                        Test Run
                    </button>
                    <button
                        type="button"
                        onClick={handlePublish}
                        disabled={saving}
                        className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(13,89,242,0.3)] btn-tactile flex items-center gap-2 disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-lg">rocket_launch</span>
                        Publish
                    </button>
                </div>
            </header>

            {/* Main Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar: Nodes Palette */}
                <div className="w-64 border-r border-white/10 bg-[#0c1018] flex flex-col z-10 shrink-0">
                    <div className="p-4 border-b border-white/10">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 text-sm">search</span>
                            <input
                                type="text"
                                placeholder="Search nodes..."
                                className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                        <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Logic & Flow</h3>
                            <div className="space-y-2">
                                {['Trigger', 'Action', 'Condition', 'Loop', 'Delay'].map((node) => (
                                    <div
                                        key={node}
                                        draggable
                                        onDragStart={(event) => onDragStart(event, node.toLowerCase())}
                                        className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg cursor-grab active:cursor-grabbing transition-all flex items-center gap-3 group"
                                    >
                                        <div className={`w-8 h-8 rounded bg-primary/10 flex items-center justify-center transition-colors
                                            ${node === 'Trigger' ? 'text-amber-400 bg-amber-500/10' :
                                                node === 'Action' ? 'text-blue-400 bg-blue-500/10' :
                                                    node === 'Condition' ? 'text-amber-400 bg-amber-500/10' :
                                                        node === 'Loop' ? 'text-purple-400 bg-purple-500/10' :
                                                            'text-gray-400 bg-gray-500/10'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-lg">
                                                {node === 'Trigger' ? 'bolt' :
                                                    node === 'Action' ? 'api' :
                                                        node === 'Condition' ? 'call_split' :
                                                            node === 'Loop' ? 'repeat' : 'schedule'}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{node}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">AI Agents</h3>
                            <div className="space-y-2">
                                <div
                                    draggable
                                    onDragStart={(event) => onDragStart(event, 'ai-agent')}
                                    className="p-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 rounded-lg cursor-grab transition-all flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                        <span className="material-symbols-outlined text-lg">psychology</span>
                                    </div>
                                    <span className="text-sm font-medium text-indigo-200">AI Agent</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 bg-[#050a14] relative overflow-hidden">
                    <WorkflowBuilder
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        setNodes={setNodes}
                        onNodeSelect={handleNodeSelect}
                    />
                </div>

                {/* Properties Panel */}
                <div className="w-80 border-l border-white/10 bg-[#0c1018] flex flex-col z-10 shrink-0 overflow-y-auto custom-scrollbar">
                    <div className="p-4 border-b border-white/10 bg-[#0c1018] sticky top-0 z-10">
                        <h3 className="text-sm font-bold text-white">Properties</h3>
                    </div>
                    <PropertiesPanel
                        node={selectedNode}
                        onChange={handleNodeChange}
                    />
                </div>
            </div>
            <TestRunModal
                isOpen={isTestRunOpen}
                onClose={() => setIsTestRunOpen(false)}
                nodes={nodes}
                edges={edges}
            />
        </div>
    );
}

export default function WorkflowBuilderPage() {
    return (
        <Suspense fallback={
            <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-[#0c1018] -m-8">
                <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-5 h-5 border-2 border-gray-500 border-t-primary rounded-full animate-spin" />
                    Loading...
                </div>
            </div>
        }>
            <BuilderContent />
        </Suspense>
    );
}
