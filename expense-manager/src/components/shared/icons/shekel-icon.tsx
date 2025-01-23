import { ny } from "@/lib/utils";

export default function ShekelIcon({ className }: { className?: string }) {
  return (
    <span
      className={ny("text-2xl text-secondary-foreground font-bold", className)}
    >
      ₪
    </span>
  );
}
