"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui";

export function NavigationHeader() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-auto flex items-center gap-3 font-extrabold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-leaf text-white">ML</span>
          <span>ML Step Master</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-bold text-slate-600 dark:text-slate-300 sm:flex">
          <Link href="/">ホーム</Link>
          <Link href="/roadmap">ロードマップ</Link>
        </nav>
        <Button variant="secondary" className="h-10 w-10 px-0" onClick={() => setDark((value) => !value)} aria-label="表示テーマを切り替える">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </div>
    </header>
  );
}
