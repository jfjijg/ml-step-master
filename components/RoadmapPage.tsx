"use client";

import { RotateCcw } from "lucide-react";
import { levels } from "@/lib/course-data";
import { NavigationHeader } from "@/components/NavigationHeader";
import { LevelCard } from "@/components/LevelCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Button, Card } from "@/components/ui";
import { useProgress } from "@/components/use-progress";

export function RoadmapPage() {
  const { percent, isLevelDone, resetProgress } = useProgress();
  const activeLevel = levels.find((level) => !isLevelDone(level.id))?.id;

  return (
    <div className="min-h-screen dark:bg-slate-950">
      <NavigationHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-5 lg:grid-cols-[1.5fr_0.8fr]">
          <div>
            <p className="mb-2 text-sm font-extrabold uppercase tracking-normal text-leaf">Roadmap</p>
            <h1 className="text-3xl font-black sm:text-4xl">難易度別ロードマップ</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
              Python基礎は扱わず、機械学習の工程そのものに集中します。完了済みLevelにはチェックが付き、現在進めるLevelは強調表示されます。
            </p>
          </div>
          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-extrabold">全体進捗</span>
              <span className="text-2xl font-black text-leaf">{percent}%</span>
            </div>
            <ProgressBar value={percent} />
            <Button variant="ghost" className="mt-4" onClick={resetProgress}>
              <RotateCcw size={16} />
              進捗をリセット
            </Button>
          </Card>
        </div>
        {percent === 100 && (
          <Card className="mb-6 border-leaf bg-leaf/10 p-5 text-leaf">
            <h2 className="font-black">完了バッジ獲得: ML Step Master</h2>
            <p className="mt-2 text-sm font-bold">全Levelのスライドと演習を完了しました。次は自分のデータで小さな予測プロジェクトを作れます。</p>
          </Card>
        )}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {levels.map((level) => (
            <LevelCard key={level.id} level={level} isDone={isLevelDone(level.id)} isActive={activeLevel === level.id} />
          ))}
        </div>
      </main>
    </div>
  );
}
