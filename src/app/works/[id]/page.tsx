import { notFound } from "next/navigation";
import Link from "next/link";

const projects: Record<string, {
  name: string;
  slug: string;
  year: string;
  tech: string[];
  href: string;
  color: string;
  desc: string;
  story: string[];
  screens: { src: string; caption: string }[];
}> = {
  stocks: {
    name: "Stocks",
    slug: "stocks",
    year: "2025",
    tech: ["Next.js", "Yahoo Finance", "Recharts", "Supabase"],
    href: "https://stocks-pearl-one.vercel.app",
    color: "#0ea5e9",
    desc: "해외 주식 포트폴리오 트래커",
    story: [
      "주식을 시작했는데 수익률 계산을 매번 엑셀로 하기가 너무 귀찮았다.",
      "그냥 내가 원하는 대로 만들어버리자 싶었음. 티커 검색하면 실시간 시세 붙어서 바로 추가되고, 원화/달러 환산도 자동으로. 그리고 친구들이랑 수익률 비교하는 그룹 기능도 넣었다.",
      "처음엔 나 혼자 쓰려고 만든 건데 친구들한테 보여줬더니 다들 써보고 싶다고 해서 로그인 기능이랑 그룹 기능까지 추가하게 됐다.",
    ],
    screens: [
      { src: "/shot-stocks-1.png", caption: "랜딩 페이지" },
      { src: "/shot-stocks-dashboard.png", caption: "대시보드 — 실시간 포트폴리오" },
    ],
  },
  gmepu: {
    name: "지메뿌",
    slug: "gmepu",
    year: "2025",
    tech: ["Next.js", "Google Maps", "Framer Motion", "Supabase"],
    href: "https://gmepu.vercel.app",
    color: "#f5c800",
    desc: "지도에 메모 뿌리기",
    story: [
      "길 걷다가 '이 골목 야경 진짜 예쁜데 아무도 모르겠지'라는 생각이 들었다. 그걸 지도에 붙여놓으면 어떨까.",
      "지메뿌는 지도 + 메모 + 뿌리기의 합성어다. 현재 위치에 짧은 메모를 남기면 그 위치에 핀으로 꽂힌다. 지나가는 사람들이 내 메모를 볼 수 있고, 나도 모르는 사람의 메모를 발견할 수 있다.",
      "SNS처럼 팔로우 없이, 그냥 공간으로 연결되는 느낌을 만들고 싶었다.",
    ],
    screens: [
      { src: "/shot-gmepu-1.png", caption: "랜딩 페이지" },
      { src: "/shot-gmepu-map.png", caption: "지도 — 메모들이 핀으로 꽂혀있다" },
    ],
  },
  inbody: {
    name: "Inbody",
    slug: "inbody",
    year: "2025",
    tech: ["Next.js", "Recharts", "Supabase"],
    href: "https://inbody-tau.vercel.app",
    color: "#22c55e",
    desc: "인바디 기록 대시보드",
    story: [
      "헬스장에서 인바디 찍을 때마다 종이로 주는데 그게 쌓이기만 하고 변화를 한눈에 볼 수가 없었다.",
      "체중, 골격근량, 체지방률을 날짜별로 입력해두면 그래프로 추세를 볼 수 있다. 내 몸 변화를 데이터로 보니까 운동 자극이 확실히 됨.",
      "기록 자체는 사적인 것이라 완전히 개인용으로 만들었다. 내가 쓰는 용도.",
    ],
    screens: [
      { src: "/shot-inbody-1.png", caption: "대시보드 — 체성분 변화 그래프" },
    ],
  },
};

export default async function WorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = projects[id];
  if (!p) notFound();

  return (
    <main style={{ minHeight: "100vh" }}>
      {/* Nav */}
      <nav className="nav-fixed">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none", color: "#000" }}>
          Oseong
        </Link>
        <div className="nav-links">
          <Link href="/#works" style={{ textDecoration: "none", color: "#000" }}>Works</Link>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      <div style={{ paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ padding: "80px 80px 60px", maxWidth: 1200, margin: "0 auto" }}>
          <Link href="/" className="back-link">
            ← Works
          </Link>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>
                {p.year}
              </div>
              <h1 style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "clamp(48px, 7vw, 96px)",
                fontWeight: "normal",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: 16,
              }}>
                {p.name}
              </h1>
              <p style={{ fontSize: 16, color: "#666", fontFamily: "'IBM Plex Mono', monospace" }}>
                {p.desc}
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "flex-start", paddingTop: 8 }}>
              {p.tech.map(t => (
                <span key={t} style={{
                  padding: "6px 14px", border: "1px solid #e0e0e0", borderRadius: 100,
                  fontSize: 11, color: "#555", fontFamily: "'IBM Plex Mono', monospace",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Main screenshot */}
        <section style={{ padding: "0 80px", maxWidth: 1200, margin: "0 auto 80px" }}>
          <div style={{
            borderRadius: 20, overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.screens[0].src}
              alt={p.screens[0].caption}
              style={{ width: "100%", display: "block" }}
            />
          </div>
          <p style={{ marginTop: 12, fontSize: 11, color: "#999", fontFamily: "'IBM Plex Mono', monospace" }}>
            {p.screens[0].caption}
          </p>
        </section>

        {/* Story + second screen */}
        <section style={{
          padding: "0 80px 80px", maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start",
        }}>
          {/* Story */}
          <div>
            <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 24 }}>
              Story
            </div>
            {p.story.map((para, i) => (
              <p key={i} style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: 16,
                lineHeight: 2,
                color: "#333",
                marginBottom: 24,
              }}>
                {para}
              </p>
            ))}
          </div>

          {/* Second screenshot */}
          {p.screens[1] && (
            <div style={{ position: "sticky", top: 100 }}>
              <div style={{
                borderRadius: 16, overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.screens[1].src}
                  alt={p.screens[1].caption}
                  style={{ width: "100%", display: "block" }}
                />
              </div>
              <p style={{ marginTop: 10, fontSize: 11, color: "#999", fontFamily: "'IBM Plex Mono', monospace" }}>
                {p.screens[1].caption}
              </p>
            </div>
          )}
        </section>

        {/* CTA */}
        <section style={{
          padding: "80px",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          maxWidth: 1200, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 24,
        }}>
          <div>
            <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>
              Live Site
            </div>
            <p style={{ fontSize: 14, color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
              {p.href.replace("https://", "")}
            </p>
          </div>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "16px 32px",
              background: "#000", color: "#fff",
              borderRadius: 30, textDecoration: "none",
              fontSize: 13, fontFamily: "'IBM Plex Mono', monospace",
              transition: "opacity 0.2s",
            }}
          >
            실제 사이트 보기 ↗
          </a>
        </section>
      </div>
    </main>
  );
}
