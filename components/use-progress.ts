"use client";

import { useEffect, useMemo, useState } from "react";
import { emptyProgress, calculateProgress, isLevelCompleted, type ProgressState, unique } from "@/lib/progress";

const STORAGE_KEY = "ml-step-master-progress";

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(emptyProgress);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProgress({ ...emptyProgress, ...JSON.parse(saved) });
      } catch {
        setProgress(emptyProgress);
      }
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [isReady, progress]);

  const percent = useMemo(() => calculateProgress(progress), [progress]);

  function addTo<K extends keyof ProgressState>(key: K, value: string) {
    setProgress((current) => ({ ...current, [key]: unique([...current[key], value]) }));
  }

  function completeSlide(levelId: string, slideIndex: number) {
    addTo("completedSlides", `${levelId}:${slideIndex}`);
  }

  function completeExercise(exerciseId: string) {
    addTo("completedExercises", exerciseId);
  }

  function completeLevel(levelId: string) {
    addTo("completedLevels", levelId);
  }

  function resetProgress() {
    setProgress(emptyProgress);
  }

  return {
    progress,
    percent,
    isReady,
    completeSlide,
    completeExercise,
    completeLevel,
    resetProgress,
    isLevelDone: (levelId: string) => isLevelCompleted(levelId, progress)
  };
}
