"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Check, CheckCircle2, Play, RotateCcw } from "lucide-react";
import { getLevel } from "@/lib/course-data";
import { AnswerPanel } from "@/components/AnswerPanel";
import { CodeEditor } from "@/components/CodeEditor";
import { HintBox } from "@/components/HintBox";
import { NavigationHeader } from "@/components/NavigationHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { Button, Card, Badge } from "@/components/ui";
import { useProgress } from "@/components/use-progress";
import { useEffect, useMemo, useState } from "react";

function normalize(code: string) {
  return code.replace(/\s+/g, "");
}

export function ExercisePage() {
  const params = useParams<{ levelId: string }>();
  const level = getLevel(params.levelId);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [code, setCode] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [result, setResult] = useState<"idle" | "ok" | "ng">("idle");
  const { progress, completeExercise, completeLevel, isLevelDone } = useProgress();

  if (!level) notFound();

  const exercise = level.exercises[exerciseIndex];

  useEffect(() => {
    setCode(exercise.starterCode);
    setShowAnswer(false);
    setResult("idle");
  }, [exercise]);

  const doneCount = level.exercises.filter((item) => progress.completedExercises.includes(item.id)).length;
  const exerciseProgress = Math.round((doneCount / level.exercises.length) * 100);
  const canFinishLevel = useMemo(
    () => level.slides.every((_, slideIndex) => progress.completedSlides.includes(`${level.id}:${slideIndex}`)) && level.exercises.every((item) => progress.completedExercises.includes(item.id)),
    [level, progress]
  );

  function checkCode() {
    const compact = normalize(code);
    const isOk = exercise.requiredKeywords.every((keyword) => compact.includes(normalize(keyword)));
    setResult(isOk ? "ok" : "ng");
  }

  function runCode() {
    checkCode();
  }

  function markComplete() {
    completeExercise(exercise.id);
    setResult("ok");
  }

  return (
    <div className="min-h-screen dark:bg-slate-950">
      <NavigationHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/roadmap" className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
              <ArrowLeft size={16} />
              ロードマップへ
            </Link>
            <h1 className="text-3xl font-black">{`Level ${level.order}: ${level.title} の演習`}</h1>
          </div>
          <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold dark:border-slate-700 dark:bg-slate-900" href={`/levels/${level.id}/slides`}>
            スライドへ戻る
          </Link>
        </div>

        <Card className="mb-5 p-5">
          <div className="mb-2 flex items-center justify-between text-sm font-bold">
            <span>{`演習 ${exerciseIndex + 1} / ${level.exercises.length}`}</span>
            <span>{exerciseProgress}% 完了</span>
          </div>
          <ProgressBar value={exerciseProgress} />
        </Card>

        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            <Card className="p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge>{exercise.difficulty}</Badge>
                {progress.completedExercises.includes(exercise.id) && <Badge className="bg-leaf/10 text-leaf">完了済み</Badge>}
              </div>
              <h2 className="text-2xl font-black">{exercise.title}</h2>
              <p className="mt-4 leading-8 text-slate-700 dark:text-slate-200">{exercise.description}</p>
              <div className="mt-5">
                <h3 className="mb-2 text-sm font-extrabold">期待する要素</h3>
                <div className="flex flex-wrap gap-2">
                  {exercise.requiredKeywords.map((keyword) => (
                    <span key={keyword} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
            <HintBox>{exercise.hint}</HintBox>
            {showAnswer && <AnswerPanel code={exercise.answerCode} />}
          </div>

          <Card className="p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="font-extrabold">Python Code</span>
              <Button variant="ghost" onClick={() => setCode(exercise.starterCode)}>
                <RotateCcw size={16} />
                リセット
              </Button>
            </div>
            <CodeEditor value={code} onChange={setCode} />
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={runCode}>
                <Play size={16} />
                実行
              </Button>
              <Button variant="secondary" onClick={checkCode}>
                <Check size={16} />
                チェック
              </Button>
              <Button variant="secondary" onClick={() => setShowAnswer((value) => !value)}>
                解答例を表示
              </Button>
              <Button variant="secondary" onClick={markComplete}>
                <CheckCircle2 size={16} />
                完了
              </Button>
            </div>
            {result !== "idle" && (
              <div className={`mt-4 rounded-lg p-4 text-sm font-bold ${result === "ok" ? "bg-leaf/10 text-leaf" : "bg-coral/10 text-red-700 dark:text-red-200"}`}>
                {result === "ok" ? "正解です。必要な要素が含まれています。" : "まだ足りない要素があります。期待する要素とコードを見比べてみましょう。"}
              </div>
            )}
          </Card>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Button variant="secondary" disabled={exerciseIndex === 0} onClick={() => setExerciseIndex((value) => Math.max(0, value - 1))}>
            前の問題
          </Button>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" disabled={exerciseIndex === level.exercises.length - 1} onClick={() => setExerciseIndex((value) => Math.min(level.exercises.length - 1, value + 1))}>
              次の問題
            </Button>
            <Button disabled={!canFinishLevel || isLevelDone(level.id)} onClick={() => completeLevel(level.id)}>
              <CheckCircle2 size={16} />
              Levelを完了
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
