import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import type { Level } from "@/lib/course-data";
import { Badge, Card } from "@/components/ui";
import { cn } from "@/lib/utils";

export function LevelCard({
  level,
  isDone,
  isActive
}: {
  level: Level;
  isDone: boolean;
  isActive?: boolean;
}) {
  return (
    <Card className={cn("p-5 transition hover:-translate-y-0.5 hover:shadow-soft", isActive && "border-leaf ring-2 ring-leaf/20")}>
      <div className="mb-4 flex items-start gap-3">
        <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-lg font-extrabold", isDone ? "bg-leaf text-white" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100")}>
          {isDone ? <CheckCircle2 size={22} /> : level.order}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge>{level.difficulty}</Badge>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500">
              {isDone ? <CheckCircle2 size={14} /> : <Circle size={14} />}
              {isDone ? "完了済み" : isActive ? "学習中" : "未完了"}
            </span>
          </div>
          <h3 className="text-lg font-extrabold">{`Level ${level.order}: ${level.title}`}</h3>
        </div>
      </div>
      <p className="min-h-16 text-sm leading-7 text-slate-600 dark:text-slate-300">{level.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {level.topics.slice(0, 5).map((topic) => (
          <span key={topic} className="rounded-md bg-slate-50 px-2 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {topic}
          </span>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-leaf px-4 text-sm font-bold text-white" href={`/levels/${level.id}/slides`}>
          スライド
          <ArrowRight size={16} />
        </Link>
        <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold dark:border-slate-700 dark:bg-slate-900" href={`/levels/${level.id}/exercises`}>
          演習
          <ArrowRight size={16} />
        </Link>
      </div>
    </Card>
  );
}
