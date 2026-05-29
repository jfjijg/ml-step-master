import { levels, totalProgressItems } from "@/lib/course-data";

export type ProgressState = {
  completedLevels: string[];
  completedSlides: string[];
  completedExercises: string[];
};

export const emptyProgress: ProgressState = {
  completedLevels: [],
  completedSlides: [],
  completedExercises: []
};

export function unique(items: string[]) {
  return Array.from(new Set(items));
}

export function calculateProgress(progress: ProgressState) {
  const completed =
    unique(progress.completedLevels).length +
    unique(progress.completedSlides).length +
    unique(progress.completedExercises).length;

  return Math.round((completed / totalProgressItems) * 100);
}

export function isLevelCompleted(levelId: string, progress: ProgressState) {
  if (progress.completedLevels.includes(levelId)) return true;
  const level = levels.find((item) => item.id === levelId);
  if (!level) return false;
  const slidesDone = level.slides.every((_, index) => progress.completedSlides.includes(`${levelId}:${index}`));
  const exercisesDone = level.exercises.every((exercise) => progress.completedExercises.includes(exercise.id));
  return slidesDone && exercisesDone;
}
