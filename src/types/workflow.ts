import { Node, Edge } from '@xyflow/react';

export type NodeType =
    | 'trigger'      // Start node (webhook, schedule, manual)
    | 'action'       // Do something (send email, update record)
    | 'condition'    // If/else branching
    | 'loop'         // Iterate over items
    | 'delay'        // Wait for time period
    | 'ai-agent';    // AI-powered task

export interface WorkflowNodeData extends Record<string, unknown> {
    label: string;
    description?: string;
    config?: Record<string, any>;
    status?: 'idle' | 'running' | 'success' | 'error';
    icon?: string;
}

export type IntegrationType = 'slack' | 'gmail' | 'google-sheets' | 'salesforce' | 'hubspot';

export interface Template {
    id: string;
    title: string;
    description: string;
    category: 'sales' | 'marketing' | 'support' | 'operations';
    estimatedTime: string;
    requiredIntegrations: string[];
    nodes: Node<WorkflowNodeData>[];
    edges: Edge[];
}
