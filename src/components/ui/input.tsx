import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  containerClassName?: string;
  layoutCompensation?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      className,
      containerClassName,
      layoutCompensation = true,
      error,
      leftIcon,
      rightIcon,
      type,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-[1px]", containerClassName)}>
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "border-input/50 hover:border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
              {
                "border-red-400 focus-visible:ring-red-400 hover:border-red-600": error,
              },
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightIcon}</div>
          )}
        </div>
        {(layoutCompensation || error) && (
          <span className="text-xs leading-4 text-red-600 empty:min-h-4">{error}</span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
