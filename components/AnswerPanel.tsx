import { CheckCircle2 } from "lucide-react";

export function AnswerPanel({ code }: { code: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-950 p-4 text-slate-50 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-emerald-200">
        <CheckCircle2 size={16} />
        解答例
      </div>
      <pre className="overflow-auto whitespace-pre-wrap text-sm leading-7">{code}</pre>
    </div>
  );
}
