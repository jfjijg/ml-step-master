"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { getLevel } from "@/lib/course-data";
import { NavigationHeader } from "@/components/NavigationHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { Button, Card } from "@/components/ui";
import { useProgress } from "@/components/use-progress";
import { useMemo, useState } from "react";

function highlight(content: string, points: string[]) {
  const pattern = new RegExp(`(${points.map((point) => point.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return content.split(pattern).map((part, index) =>
    points.includes(part) ? (
      <strong key={`${part}-${index}`} className="rounded-md bg-leaf/10 px-1.5 py-0.5 text-leaf">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export function SlideViewer() {
  const params = useParams<{ levelId: string }>();
  const level = getLevel(params.levelId);
  const [index, setIndex] = useState(0);
  const { progress, completeSlide, completeLevel, isLevelDone } = useProgress();

  if (!level) notFound();

  const slide = level.slides[index];
  const slideKey = `${level.id}:${index}`;
  const completedCount = level.slides.filter((_, slideIndex) => progress.completedSlides.includes(`${level.id}:${slideIndex}`)).length;
  const slideProgress = Math.round((completedCount / level.slides.length) * 100);
  const canFinishLevel = useMemo(
    () => level.slides.every((_, slideIndex) => progress.completedSlides.includes(`${level.id}:${slideIndex}`)) && level.exercises.every((exercise) => progress.completedExercises.includes(exercise.id)),
    [level, progress]
  );

  return (
    <div className="min-h-screen dark:bg-slate-950">
      <NavigationHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/roadmap" className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
              <ArrowLeft size={16} />
              ロードマップへ
            </Link>
            <h1 className="text-3xl font-black">{`Level ${level.order}: ${level.title}`}</h1>
          </div>
          <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold dark:border-slate-700 dark:bg-slate-900" href={`/levels/${level.id}/exercises`}>
            演習へ進む
            <ArrowRight size={16} />
          </Link>
        </div>

        <Card className="mb-5 p-5">
          <div className="mb-2 flex items-center justify-between text-sm font-bold">
            <span>{`スライド ${index + 1} / ${level.slides.length}`}</span>
            <span>{slideProgress}% 完了</span>
          </div>
          <ProgressBar value={slideProgress} />
        </Card>

        <Card className="p-6 sm:p-8">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-sm font-extrabold uppercase tracking-normal text-leaf">{level.difficulty}</p>
            <h2 className="text-3xl font-black leading-tight">{slide.title}</h2>
            <p className="mt-6 text-lg leading-10 text-slate-700 dark:text-slate-200">{highlight(slide.content, slide.points)}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {slide.points.map((point) => (
                <div key={point} className="rounded-lg border border-slate-200 bg-slate-50 p-4 font-bold dark:border-slate-700 dark:bg-slate-800">
                  {point}
                </div>
              ))}
            </div>

            {slide.flow && (
              <div className="mt-8 grid gap-3 md:grid-cols-4">
                {slide.flow.map((step, flowIndex) => (
                  <div key={step} className="relative rounded-lg border border-leaf/30 bg-leaf/10 p-4 text-sm font-extrabold text-leaf">
                    <span className="mb-2 block text-xs text-leaf/70">{`Step ${flowIndex + 1}`}</span>
                    {step}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Button variant="secondary" disabled={index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))}>
            <ArrowLeft size={16} />
            前へ
          </Button>
          <div className="flex flex-wrap gap-3">
            <Button variant={progress.completedSlides.includes(slideKey) ? "secondary" : "primary"} onClick={() => completeSlide(level.id, index)}>
              <CheckCircle2 size={16} />
              このスライドを完了
            </Button>
            <Button disabled={index === level.slides.length - 1} onClick={() => setIndex((value) => Math.min(level.slides.length - 1, value + 1))}>
              次へ
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        <Card className="mt-6 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-black">Level 完了状況</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">全スライドと全演習を終えると完了バッジが付きます。</p>
            </div>
            <Button disabled={!canFinishLevel || isLevelDone(level.id)} onClick={() => completeLevel(level.id)}>
              <CheckCircle2 size={16} />
              Levelを完了
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
