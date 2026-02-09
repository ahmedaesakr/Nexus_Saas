import { Handle, Position } from "@xyflow/react";

export function ConditionNode({ data, selected }: { data: any; selected?: boolean }) {
    return (
        <div
            className={`
        rounded-xl border-2 bg-amber-950/20 backdrop-blur-md p-4 min-w-[200px] shadow-lg
        ${selected ? "border-amber-400 shadow-amber-500/20" : "border-amber-500/20"}
        transition-all duration-300 relative
      `}
        >
            <Handle type="target" position={Position.Top} className="!bg-amber-400 !w-3 !h-3" />

            <div className="flex items-center justify-center gap-2 mb-2">
                <span className="material-symbols-outlined text-amber-400 text-2xl">diamond</span>
                <span className="font-bold text-white text-sm">{data.label || "Condition"}</span>
            </div>

            <div className="text-xs text-center text-gray-400 mb-4 px-2">
                {data.expression || "If variable == value"}
            </div>

            <div className="absolute -bottom-3 left-1/4 -translate-x-1/2 bg-[#0c1018] px-2 py-0.5 rounded text-[10px] text-green-400 border border-green-500/30">
                TRUE
            </div>
            <Handle type="source" position={Position.Bottom} id="true" className="!bg-green-500 !w-3 !h-3 !left-1/4" />

            <div className="absolute -bottom-3 left-3/4 -translate-x-1/2 bg-[#0c1018] px-2 py-0.5 rounded text-[10px] text-red-400 border border-red-500/30">
                FALSE
            </div>
            <Handle type="source" position={Position.Bottom} id="false" className="!bg-red-500 !w-3 !h-3 !left-3/4" />
        </div>
    );
}
