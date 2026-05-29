import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900", className)} {...props} />;
}

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-leaf/40 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-leaf text-white shadow-lg shadow-leaf/20 hover:bg-teal-700",
        variant === "secondary" && "border border-slate-200 bg-white text-ink hover:border-leaf/50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
        variant === "ghost" && "text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
        className
      )}
      {...props}
    />
  );
}

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200", className)}
      {...props}
    />
  );
}
