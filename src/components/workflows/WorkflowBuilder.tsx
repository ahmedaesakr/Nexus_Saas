"use client";

import { useCallback, useState } from "react";
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { AgentNode } from "./nodes/AgentNode";

// Register custom node types
const nodeTypes = {
    "ai-agent": AgentNode,
    // Add Trigger, Action, etc. later
};

const initialNodes = [
    {
        id: "agent-1",
        type: "ai-agent",
        position: { x: 250, y: 5 },
        data: { label: "Sales Outreach Agent", model: "claude-3-5-sonnet", tools: ["gmail", "linkedin"] },
    },
];

const initialEdges: Edge[] = [];

export function WorkflowBuilder() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, markerEnd: { type: MarkerType.ArrowClosed } }, eds)),
        [setEdges],
    );

    return (
        <div className="w-full h-full bg-[#050a14]">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                className="touch-none"
            >
                <Controls
                    className="!bg-[#0c1018] !border-white/10 !text-white [&>button]:!fill-white [&>button:hover]:!bg-white/10"
                />
                <MiniMap
                    className="!bg-[#0c1018] !border-white/10"
                    nodeColor="#3b82f6"
                    maskColor="rgba(0, 0, 0, 0.7)"
                />
                <Background color="#1e293b" gap={16} />
            </ReactFlow>
        </div>
    );
}
