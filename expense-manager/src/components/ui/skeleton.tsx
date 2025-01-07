import { ny } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={ny("bg-secondary/40 animate-pulse rounded-sm", className)}
      {...props}
    />
  );
}

export { Skeleton };
