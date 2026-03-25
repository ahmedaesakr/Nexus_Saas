import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "glass" | "outline";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "default", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-[24px] transition-all duration-200",
                    variant === "default" && "surface-panel surface-highlight text-white",
                    variant === "glass" && "liquid-glass liquid-glass-elevated text-white",
                    variant === "outline" && "bg-transparent border border-primary/15 text-white",
                    className
                )}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

export { Card };
