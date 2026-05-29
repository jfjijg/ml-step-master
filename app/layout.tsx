import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ML Step Master",
  description: "Pythonが少し使える初心者のための機械学習ステップ学習アプリ"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
