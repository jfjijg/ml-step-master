"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, Code2, Map } from "lucide-react";
import { levels } from "@/lib/course-data";
import { NavigationHeader } from "@/components/NavigationHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { Card } from "@/components/ui";
import { useProgress } from "@/components/use-progress";

export function HomePage() {
  const { percent, isLevelDone } = useProgress();
  const allDone = percent === 100;

  return (
    <div className="min-h-screen dark:bg-slate-950">
      <NavigationHeader />
      <main>
        <section className="mx-auto grid min-h-[calc(88vh-64px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-extrabold uppercase tracking-normal text-leaf">Machine Learning Roadmap</p>
            <h1 className="text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">機械学習を、段階ごとに迷わず進める。</h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-600 dark:text-slate-300">
              ML Step Master は、Python を少し使える初心者が、データ理解、教師あり学習、評価、特徴量設計、教師なし学習、実践プロジェクトまで順番に学べるアプリです。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-leaf px-6 font-extrabold text-white shadow-lg shadow-leaf/20" href="/roadmap">
                学習を始める
                <ArrowRight size={18} />
              </Link>
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 font-extrabold dark:border-slate-700 dark:bg-slate-900" href="/levels/level-1/slides">
                Level 1 へ
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image src="/ml-hero.png" alt="機械学習を段階的に学ぶイメージ" width={1100} height={720} priority className="rounded-lg object-cover shadow-soft" />
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_2fr] lg:px-8">
            <Card className="p-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-leaf">
                <Award size={18} />
                全体の進捗率
              </div>
              <div className="mb-4 text-4xl font-black">{percent}%</div>
              <ProgressBar value={percent} />
              {allDone && <p className="mt-4 rounded-lg bg-leaf/10 p-3 text-sm font-bold text-leaf">全Level完了です。実践プロジェクトまで走り切りました。</p>}
            </Card>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["ロードマップ", "難易度別に6段階で進めます。", Map],
                ["説明スライド", "短い文章と図解風カードで概念を整理します。", BookOpen],
                ["コード演習", "CodeMirrorで書いて、キーワードで簡易チェックします。", Code2]
              ].map(([title, text, Icon]) => (
                <Card key={String(title)} className="p-5">
                  <Icon className="mb-4 text-leaf" size={24} />
                  <h3 className="font-extrabold">{title as string}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{text as string}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-extrabold uppercase tracking-normal text-leaf">Learning Stages</p>
              <h2 className="text-2xl font-black">学習ステージ一覧</h2>
            </div>
            <Link href="/roadmap" className="text-sm font-extrabold text-leaf">すべて見る</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {levels.map((level) => (
              <Card key={level.id} className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-black">{`Level ${level.order}`}</span>
                  <span className="text-sm font-bold text-slate-500">{isLevelDone(level.id) ? "完了" : "未完了"}</span>
                </div>
                <h3 className="font-extrabold">{level.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{level.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
