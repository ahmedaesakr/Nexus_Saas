import { Handle, Position } from "@xyflow/react";

export function TriggerNode({ data, selected }: { data: any; selected?: boolean }) {
    return (
        <div
            className={`
        rounded-xl border-2 bg-amber-950/20 backdrop-blur-md p-4 min-w-[240px] shadow-lg
        ${selected ? "border-amber-400 shadow-amber-500/20" : "border-amber-500/20"}
        transition-all duration-300
      `}
        >
            <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-amber-400 text-lg">bolt</span>
                </div>
                <div>
                    <div className="font-semibold text-white text-sm">{data.label || "Trigger"}</div>
                    <div className="text-[10px] uppercase tracking-wider text-amber-300/70 font-bold">{data.type || "webhook"}</div>
                </div>
            </div>

            <div className="text-xs text-gray-400 bg-black/20 p-2 rounded border border-white/5 font-mono mb-2">
                {data.description || "Start workflow..."}
            </div>

            <Handle type="source" position={Position.Bottom} className="!bg-amber-400 !w-3 !h-3" />
        </div>
    );
}
