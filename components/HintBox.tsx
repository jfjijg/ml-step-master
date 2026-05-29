import { Lightbulb } from "lucide-react";

export function HintBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100">
      <div className="mb-1 flex items-center gap-2 font-bold">
        <Lightbulb size={16} />
        ヒント
      </div>
      {children}
    </div>
  );
}
