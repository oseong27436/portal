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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fde8f0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Oseong" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        {videos.map((v) => (
          <link key={v} rel="preload" href={`/${v}.webm`} as="video" type="video/webm" />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
