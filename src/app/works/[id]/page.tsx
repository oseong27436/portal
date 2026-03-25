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
    year: "2026",
    tech: ["Next.js", "Google Maps API", "Supabase", "Google Auth"],
    href: "https://gmepu.vercel.app",
    color: "#f5c800",
    desc: "지도에 메모 뿌리기",
    story: [
      "서비스디자인 수업 첫 팀 회의 다음날 바로 만들었다. 팀원이 아이디어 회의에서 '스팟마다 기록 남기기'를 던졌고, 나는 그걸 그날 밤 구현해서 오후 1시에 단톡방에 링크를 올렸다. 팀원 반응은 '하루만에 이게 나와요?'였다.",
      "지메뿌는 지도(지) + 메모(메) + 뿌리기(뿌)의 합성어. Google Auth로 로그인하면 현재 위치에 짧은 메모를 뿌릴 수 있다. 뿌려진 메모는 지도 위에 포스트잇 핀으로 쌓이고, 전체/친구/🔥핫 필터로 탐색할 수 있다. 메모를 많이 쓸수록 그 장소에 대화방을 열 권한이 생기는 구조다.",
      "팀 과제 최종 아이템으로 채택됐다. 컨셉은 '한국판 지도 기반 레딧'. 레딧이 AI 학습 소스 1위인 것처럼, 지메뿌도 위치 기반 데이터 자산이 된다는 논리다. 엑싯 전략은 네이버 지도 인수. 가장 많이 공격받을 질문인 '네이버 지도와 차이점'에 대한 선제 대응이기도 하다.",
    ],
    screens: [
      { src: "/shot-gmepu-login.png", caption: "메모 뿌리기 — Google 로그인 필요, 실제 메모 핀 분포" },
      { src: "/shot-gmepu-map.png", caption: "홍대/신촌 일대 — 실제 누적된 메모 35개 클러스터" },
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
