import * as React from "react";

import { ny } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const { t } = useTranslation();
    return (
      <textarea
        className={ny(
          "border-input placeholder:text-muted-foreground bg-secondary-foreground/5 hover:bg-accent hover:text-accent-foreground transition duration-50 focus-visible:ring-ring flex min-h-[60px] w-full rounded-sm border  px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        placeholder={t(props.placeholder ?? "")}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
