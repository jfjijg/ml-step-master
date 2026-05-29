"use client";

import dynamic from "next/dynamic";
import { python } from "@codemirror/lang-python";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });

export function CodeEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700">
      <CodeMirror
        value={value}
        minHeight="360px"
        extensions={[python()]}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: true,
          autocompletion: true
        }}
        onChange={(nextValue) => onChange(nextValue)}
        theme="light"
      />
    </div>
  );
}
