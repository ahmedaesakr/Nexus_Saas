import { Handle, Position } from "@xyflow/react";
import { Icons } from "../../ui/Icons";
import { WorkflowNodeData } from "../../../types/workflow";

export function ActionNode({ data, selected }: { data: WorkflowNodeData; selected?: boolean }) {
    return (
        <div
            className={`
        rounded-xl border-2 bg-blue-950/20 backdrop-blur-md p-4 min-w-[240px] shadow-lg
        ${selected ? "border-blue-400 shadow-blue-500/20" : "border-blue-500/20"}
        transition-all duration-300
      `}
        >
            <Handle type="target" position={Position.Top} className="!bg-blue-400 !w-3 !h-3" />

            <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Icons.Action className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                    <div className="font-semibold text-white text-sm">{data.label || "Action"}</div>
                    <div className="text-[10px] uppercase tracking-wider text-blue-300/70 font-bold">{data.service || "http-request"}</div>
                </div>
            </div>

            <div className="text-xs text-gray-400 bg-black/20 p-2 rounded border border-white/5 font-mono mb-2">
                {data.configPreview || "Configure action..."}
            </div>

            <Handle type="source" position={Position.Bottom} className="!bg-blue-400 !w-3 !h-3" />
        </div>
    );
}
