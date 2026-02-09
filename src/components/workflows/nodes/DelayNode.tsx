import { Handle, Position } from "@xyflow/react";

export function DelayNode({ data, selected }: { data: any; selected?: boolean }) {
    return (
        <div
            className={`
        rounded-full border-2 bg-gray-900/50 backdrop-blur-md px-6 py-3 min-w-[160px] shadow-lg flex items-center justify-center gap-3
        ${selected ? "border-white shadow-white/20" : "border-white/10"}
        transition-all duration-300
      `}
        >
            <Handle type="target" position={Position.Top} className="!bg-gray-400 !w-3 !h-3" />

            <span className="material-symbols-outlined text-gray-400 text-lg">schedule</span>
            <div className="font-mono text-sm text-gray-300">
                {data.duration || "5s"} Delay
            </div>

            <Handle type="source" position={Position.Bottom} className="!bg-gray-400 !w-3 !h-3" />
        </div>
    );
}
