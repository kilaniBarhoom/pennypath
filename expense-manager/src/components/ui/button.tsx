import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { ny } from "@/lib/utils";
import LoadingSpinner from "../shared/icons/loading-icon";

const buttonVariants = cva(
  "inline-flex items-center tracking-wider transition-all duration-50 shadow ease-in-out justify-center rounded-sm text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-primary/50 font-medium rounded-sm focus:outline-none",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-secondary-foreground/5 shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-blue-500 dark:text-primary underline-offset-4 hover:underline font-sans",
        hover:
          "text-secondary-foreground/40 bg-transparent hover:text-secondary-foreground ",
        success: "text-white bg-green-500 hover:bg-green-500/70",
        navBtn:
          "text-secondary-foreground bg-secondary-foreground/10 border shadow-inner shadow-secondary-foreground/20",
        none: "",
      },
      size: {
        default: "h-10 p-4",
        sm: "h-8 rounded-sm px-3 text-xs",
        lg: "h-11 rounded-sm px-8 text-lg",
        icon: "h-10 w-10",
        xs: "h-6 w-6",
        link: "h-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  Icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: "left" | "right";
  iconClassNames?: string;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      Icon,
      children,
      iconPosition = "right",
      iconClassNames,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={ny(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {Icon && iconPosition === "left" && (
          <Icon className={ny("me-2 size-5", iconClassNames)} />
        )}
        {loading && <LoadingSpinner className="me-2 h-4 w-4 animate-spin" />}
        {children}
        {Icon && iconPosition === "right" && (
          <Icon className={ny("ms-2 size-5", iconClassNames)} />
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
