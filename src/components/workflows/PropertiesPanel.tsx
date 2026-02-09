"use client";

import { Node } from "@xyflow/react";

export function PropertiesPanel({
    node,
    onChange
}: {
    node: Node | null;
    onChange: (updatedNode: Node) => void;
}) {
    if (!node) {
        return (
            <div className="p-8 text-center text-gray-500 mt-20">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">touch_app</span>
                <p className="text-sm">Select a node to configure its properties</p>
            </div>
        );
    }

    const handleChange = (field: string, value: any) => {
        onChange({
            ...node,
            data: {
                ...node.data,
                [field]: value,
            },
        });
    };

    return (
        <div className="p-4 space-y-6">
            <div className="pb-4 border-b border-white/10">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Node Label</label>
                <input
                    type="text"
                    value={node.data.label as string || ""}
                    onChange={(e) => handleChange("label", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-primary outline-none"
                />
            </div>

            {node.type === "ai-agent" && (
                <>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Model</label>
                            <select
                                value={(node.data.model as string) || "claude-3-5-sonnet"}
                                onChange={(e) => handleChange("model", e.target.value)}
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-primary outline-none"
                            >
                                <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                                <option value="gpt-4o">GPT-4o</option>
                                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">System Prompt</label>
                            <textarea
                                value={(node.data.promptPreview as string) || ""}
                                onChange={(e) => handleChange("promptPreview", e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-primary outline-none resize-none font-mono"
                                placeholder="You are a helpful assistant..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Temperature</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={(node.data.temperature as number) || 0.7}
                                onChange={(e) => handleChange("temperature", parseFloat(e.target.value))}
                                className="w-full"
                            />
                            <div className="text-right text-xs text-gray-400">{(node.data.temperature as number) || 0.7}</div>
                        </div>
                    </div>
                </>
            )}

            {node.type === "trigger" && (
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Trigger Type</label>
                    <select
                        value={(node.data.type as string) || "webhook"}
                        onChange={(e) => handleChange("type", e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-primary outline-none"
                    >
                        <option value="webhook">Webhook</option>
                        <option value="schedule">Schedule (Cron)</option>
                        <option value="event">App Event</option>
                    </select>
                </div>
            )}

            {node.type === "action" && (
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Service</label>
                    <select
                        value={(node.data.service as string) || "http-request"}
                        onChange={(e) => handleChange("service", e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-primary outline-none"
                    >
                        <option value="http-request">HTTP Request</option>
                        <option value="slack">Slack</option>
                        <option value="gmail">Gmail</option>
                        <option value="salesforce">Salesforce</option>
                    </select>
                </div>
            )}

            {/* Add simplified configs for other types as needed */}
            {node.type === "condition" && (
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Expression</label>
                    <input
                        type="text"
                        value={(node.data.expression as string) || ""}
                        onChange={(e) => handleChange("expression", e.target.value)}
                        placeholder="e.g. variable == 'true'"
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-primary outline-none font-mono"
                    />
                </div>
            )}

            {node.type === "delay" && (
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Duration</label>
                    <input
                        type="text"
                        value={(node.data.duration as string) || ""}
                        onChange={(e) => handleChange("duration", e.target.value)}
                        placeholder="e.g. 5s, 1m, 1h"
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-primary outline-none"
                    />
                </div>
            )}

            <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-gray-600 font-mono">ID: {node.id}</p>
                <p className="text-xs text-gray-600 font-mono">Type: {node.type}</p>
            </div>
        </div>
    );
}
