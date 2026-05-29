import { cn } from "@/lib/utils";

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700", className)} aria-label={`進捗 ${value}%`}>
      <div className="h-full rounded-full bg-leaf transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
