import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { ny } from "@/lib/utils";
import LoadingSpinner from "../shared/icons/loading-icon";

const buttonVariants = cva(
  "inline-flex items-center tracking-wider transition-all duration-50 ease-in-out justify-center rounded-sm text-sm font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-primary/50 font-medium rounded-sm focus:outline-none",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-blue-500 dark:text-primary underline-offset-4 hover:underline font-sans",
        hover:
          "text-secondary-foreground/40 bg-transparent hover:text-secondary-foreground ",
        success: "text-white bg-green-500 hover:bg-green-500/70",
        navBtn: "text-white bg-blue-500 hover:bg-blue-500/70 font-semibold ",
        none: "",
      },
      size: {
        default: "h-10 p-4",
        sm: "h-8 rounded-sm px-3 text-xs",
        lg: "h-11 rounded-sm px-8",
        icon: "h-9 w-9",
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
          <Icon className="ltr:mr-2 rtl:ml-2 size-6" />
        )}
        {loading && (
          <LoadingSpinner className="ltr:mr-2 rtl:ml-2 h-4 w-4 animate-spin" />
        )}
        {children}
        {Icon && iconPosition === "right" && (
          <Icon className="rtl:mr-2 ltr:ml-2 size-6" />
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
