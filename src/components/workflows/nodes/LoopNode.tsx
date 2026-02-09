import { Handle, Position } from "@xyflow/react";

export function LoopNode({ data, selected }: { data: any; selected?: boolean }) {
    return (
        <div
            className={`
        rounded-xl border-2 bg-purple-950/20 backdrop-blur-md p-4 min-w-[240px] shadow-lg
        ${selected ? "border-purple-400 shadow-purple-500/20" : "border-purple-500/20"}
        transition-all duration-300
      `}
        >
            <Handle type="target" position={Position.Top} className="!bg-purple-400 !w-3 !h-3" />

            <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-purple-400 text-lg">repeat</span>
                </div>
                <div>
                    <div className="font-semibold text-white text-sm">{data.label || "Loop"}</div>
                    <div className="text-[10px] uppercase tracking-wider text-purple-300/70 font-bold">For Each Item</div>
                </div>
            </div>

            <div className="text-xs text-gray-400 bg-black/20 p-2 rounded border border-white/5 font-mono mb-2">
                {data.items || "array_variable"}
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-500 mt-2">
                <span>Loop Body →</span>
                <span>Next Step ↓</span>
            </div>

            <Handle type="source" position={Position.Right} id="body" className="!bg-purple-400 !w-3 !h-3" />
            <Handle type="source" position={Position.Bottom} id="next" className="!bg-gray-400 !w-3 !h-3" />
        </div>
    );
}
