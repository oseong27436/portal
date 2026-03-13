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
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
