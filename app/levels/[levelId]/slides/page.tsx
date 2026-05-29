import { SlideViewer } from "@/components/SlideViewer";
import { levels } from "@/lib/course-data";

export function generateStaticParams() {
  return levels.map((level) => ({ levelId: level.id }));
}

export default function Page() {
  return <SlideViewer />;
}
