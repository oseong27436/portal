import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oseong",
  description: "오성의 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const videos = ["stay", "dance", "sorry", "run", "sit", "pushup", "walk", "wtf", "punch"];
  return (
    <html lang="ko">
      <head>
        {videos.map((v) => (
          <link key={v} rel="preload" href={`/${v}.webm`} as="video" type="video/webm" />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
