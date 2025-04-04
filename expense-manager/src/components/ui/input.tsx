import * as React from "react";

import { ny } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useTranslation } from "react-i18next";

const InputVariants = cva("relative", {
  variants: {
    iconPosition: {
      left: " absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground",
      right:
        " absolute left-auto right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground",
    },
  },
  defaultVariants: {
    iconPosition: "left",
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof InputVariants> {
  icon?: JSX.Element;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconPosition, error, ...props }, ref) => {
    const { t, i18n } = useTranslation();
    const sharedClassNames =
      "flex h-10 w-full  rounded-sm bg-secondary-foreground/5 focus-visible:border-secondary-foreground/70 hover:border-secondary-foreground/70 shadow-sm hover:bg-accent/40 hover:text-accent-foreground border border-input px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/80 text-foreground shadow-inner focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";
    iconPosition = i18n.dir() === "rtl" ? "left" : "right";
    return (
      <>
        {icon ? (
          <div className="relative inline-block w-full h-10">
            {iconPosition !== "right" && (
              <span className={ny(InputVariants({ iconPosition }))}>
                {icon}
              </span>
            )}
            <input
              type={type}
              className={ny(
                sharedClassNames,
                className,
                iconPosition !== "right" ? "pl-10 pr-4" : "pl-4 pr-10",
                error && "border-destructive"
              )}
              ref={ref}
              placeholder={t(props.placeholder ?? "")}
              {...props}
            />
            {iconPosition === "right" && (
              <span className={ny(InputVariants({ iconPosition }))}>
                {icon}
              </span>
            )}
          </div>
        ) : (
          <input
            type={type}
            className={ny(
              sharedClassNames,
              className,
              error && "border-destructive"
            )}
            ref={ref}
            {...props}
          />
        )}
      </>
    );
  }
);
Input.displayName = "Input";
export { Input };
