"use client";

import { useCallback, useState, useRef } from "react";
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    Connection,
    Edge,
    MarkerType,
    ReactFlowProvider,
    useReactFlow,
    Node,
    OnNodesChange,
    OnEdgesChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { toast } from "sonner";

import { AgentNode } from "./nodes/AgentNode";
import { TriggerNode } from "./nodes/TriggerNode";
import { ActionNode } from "./nodes/ActionNode";
import { ConditionNode } from "./nodes/ConditionNode";
import { LoopNode } from "./nodes/LoopNode";
import { DelayNode } from "./nodes/DelayNode";

const nodeTypes = {
    "ai-agent": AgentNode,
    trigger: TriggerNode,
    action: ActionNode,
    condition: ConditionNode,
    loop: LoopNode,
    delay: DelayNode,
};

interface WorkflowBuilderProps {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: (connection: Connection) => void;
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    onNodeSelect?: (node: Node | null) => void;
}

function Flow({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    onNodeSelect
}: WorkflowBuilderProps) {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { screenToFlowPosition } = useReactFlow();

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const isValidConnection = useCallback(
        (connection: Connection | Edge) => {
            if (connection.source === connection.target) return false;
            return true;
        },
        []
    );

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) {
                return;
            }

            // Validation: Max 1 Trigger
            if (type === 'trigger') {
                const hasTrigger = nodes.some((n) => n.type === 'trigger');
                if (hasTrigger) {
                    toast.warning("Only one Trigger node is allowed per workflow.");
                    return;
                }
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode: Node = {
                id: crypto.randomUUID(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, setNodes, nodes],
    );

    const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        if (onNodeSelect) onNodeSelect(node);
    }, [onNodeSelect]);

    const onPaneClick = useCallback(() => {
        if (onNodeSelect) onNodeSelect(null);
    }, [onNodeSelect]);

    return (
        <div className="w-full h-full bg-[#050a14]" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                onDrop={onDrop}
                onDragOver={onDragOver}
                isValidConnection={isValidConnection}
                nodeTypes={nodeTypes}
                fitView
                className="touch-none"
            >
                <Controls className="!bg-[#0c1018] !border-white/10 !text-white [&>button]:!fill-white [&>button:hover]:!bg-white/10" />
                <MiniMap className="!bg-[#0c1018] !border-white/10" nodeColor="#3b82f6" maskColor="rgba(0, 0, 0, 0.7)" />
                <Background color="#1e293b" gap={16} />
            </ReactFlow>
        </div>
    );
}

export function WorkflowBuilder(props: WorkflowBuilderProps) {
    return (
        <ReactFlowProvider>
            <Flow {...props} />
        </ReactFlowProvider>
    );
}
