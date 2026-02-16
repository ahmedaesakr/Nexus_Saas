import { Handle, Position } from "@xyflow/react";
import { Icons } from "../../ui/Icons";
import { WorkflowNodeData } from "../../../types/workflow";

export function AgentNode({ data, selected }: { data: WorkflowNodeData; selected?: boolean }) {
    return (
        <div
            className={`
        rounded-xl border-2 bg-indigo-950/20 backdrop-blur-md p-4 min-w-[240px] shadow-lg
        ${selected ? "border-indigo-400 shadow-indigo-500/20" : "border-indigo-500/20"}
        transition-all duration-300
      `}
        >
            <Handle type="target" position={Position.Top} className="!bg-indigo-400 !w-3 !h-3" />

            <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <Icons.Agent className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                    <div className="font-semibold text-white text-sm">{data.label || "AI Agent"}</div>
                    <div className="text-[10px] uppercase tracking-wider text-indigo-300/70 font-bold">{data.model || "claude-3-sonnet"}</div>
                </div>
            </div>

            <div className="text-xs text-gray-400 bg-black/20 p-2 rounded border border-white/5 font-mono mb-2">
                {data.promptPreview || "System Prompt..."}
            </div>

            <div className="flex gap-2 text-[10px] text-gray-500">
                <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5">Tools: {data.tools?.length || 0}</span>
                <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5">Temp: {data.temperature || 0.7}</span>
            </div>

            <Handle type="source" position={Position.Bottom} className="!bg-indigo-400 !w-3 !h-3" />
        </div>
    );
}
