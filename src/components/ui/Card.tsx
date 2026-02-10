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
                    "rounded-xl transition-all duration-200",
                    variant === "default" && "bg-white dark:bg-[#0c1018] border border-gray-100 dark:border-white/5 shadow-sm",
                    variant === "glass" && "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg",
                    variant === "outline" && "bg-transparent border border-gray-200 dark:border-white/10",
                    className
                )}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

export { Card };
