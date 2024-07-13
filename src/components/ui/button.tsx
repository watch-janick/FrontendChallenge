import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

const buttonVariants = cva(
  "inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90 dark:bg-white/25 dark:text-white/85 dark:hover:text-white dark:hover:bg-white/30 dark:border dark:border-white/10",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive/40 dark:border dark:border-destructive dark:hover:bg-destructive/60 dark:text-destructive-foreground/85 dark:hover:text-destructive-foreground",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary hover:bg-secondary/80 text-secondary-foreground dark:text-secondary-foreground/85 dark:hover:text-secondary-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "font-semibold text-primary dark:text-primary/85 darkhover:text-primary",
        "link-destructive": "font-semibold text-red-600/85 dark:hover:text-red-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      loading: {
        true: "cursor-wait",
      },
      disabled: {
        true: "cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      loading: false,
      disabled: false,
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      size,
      loading,
      disabled,
      asChild = false,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, loading, disabled }))}
        ref={ref}
        disabled={Boolean(disabled) || Boolean(loading)}
        {...props}
      >
        {loading && <LoaderCircle className="size-4 animate-spin" />}
        {leftIcon && !loading && leftIcon}
        {children}
        {rightIcon && rightIcon}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
