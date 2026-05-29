import { ExercisePage } from "@/components/ExercisePage";
import { levels } from "@/lib/course-data";

export function generateStaticParams() {
  return levels.map((level) => ({ levelId: level.id }));
}

export default function Page() {
  return <ExercisePage />;
}
