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
  overview: string;
  story: string[];
  features?: { icon: string; title: string; desc: string; img?: string }[];
  context?: string;
  screens: { src: string; caption: string }[];
}> = {
  stocks: {
    name: "Stocks",
    slug: "stocks",
    year: "2025",
    tech: ["Next.js", "Yahoo Finance", "Recharts", "Supabase", "Google Auth"],
    href: "https://stocks-pearl-one.vercel.app",
    color: "#0ea5e9",
    desc: "해외 주식 포트폴리오 트래커",
    overview: "국내외 주식을 한곳에서 관리하고, 친구들과 수익률을 실시간으로 비교하는 포트폴리오 트래커.",
    story: [
      "주식을 시작했는데 수익률 계산을 매번 엑셀로 하기가 너무 귀찮았다.",
      "티커 검색하면 실시간 시세가 붙어서 바로 추가되고, 원화/달러 환산도 자동으로 계산된다. 처음엔 나 혼자 쓰려고 만든 건데 친구들한테 보여줬더니 다들 써보고 싶다고 해서 그룹 기능까지 추가하게 됐다.",
    ],
    features: [
      { icon: "📊", title: "실시간 시세 연동", desc: "티커 검색 시 현재가 자동 반영" },
      { icon: "💱", title: "원화/달러 자동 환산", desc: "실시간 환율 기반 수익률 계산" },
      { icon: "👥", title: "그룹 수익률 비교", desc: "친구들과 수익률 실시간 랭킹" },
      { icon: "📈", title: "히스토리 그래프", desc: "일별 포트폴리오 스냅샷 자동 저장" },
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
    overview: "현재 위치에 짧은 메모를 남기면 지도 위에 포스트잇 핀으로 꽂힌다. 길을 걷다 낯선 사람의 메모를 발견하고, 나도 그 자리에 흔적을 남기는 위치 기반 익명 커뮤니티.",
    story: [
      "지메뿌는 '지도에 메모 뿌리기'의 줄임말. Google 로그인 후 지도를 열면 주변에 다른 사람들이 뿌린 메모들이 보인다. 메모가 많이 쌓인 장소는 숫자 클러스터로 묶이고, 전체 / 친구 / 🔥 핫 필터로 원하는 메모만 골라 볼 수 있다.",
      "메모를 많이 뿌릴수록 그 장소에 대화방을 개설할 수 있는 권한이 생긴다. 팔로우 없이 공간으로만 연결되는 구조다.",
    ],
    features: [
      { icon: "📍", title: "위치 기반 메모 뿌리기", desc: "현재 위치에 짧은 메모를 핀으로 꽂기", img: "/feat-gmepu-memo.png" },
      { icon: "🗂️", title: "전체 / 친구 / 🔥 핫 필터", desc: "원하는 메모만 골라서 탐색", img: "/feat-gmepu-filter.png" },
      { icon: "🔢", title: "메모 클러스터링", desc: "밀집 지역은 숫자 뱃지로 묶어 표시", img: "/feat-gmepu-cluster.png" },
      { icon: "💬", title: "위치 기반 대화방", desc: "메모 누적 시 그 장소에 대화방 개설 권한" },
    ],
    context: "서비스디자인 수업 팀 프로젝트 최종 채택 아이템. '한국판 지도 기반 레딧' 컨셉으로, 위치 데이터가 쌓일수록 핫플 데이터 자산이 된다는 논리. 장기 전략은 네이버 지도 인수.",
    screens: [
      { src: "/shot-gmepu-login.png", caption: "메모 뿌리기 — Google 로그인 연동, 실제 메모 핀 분포" },
      { src: "/shot-gmepu-map.png", caption: "홍대/신촌 일대 — 실제 누적 메모 클러스터" },
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
    overview: "인바디 측정값을 날짜별로 기록하고 체성분 변화를 그래프로 추적하는 개인용 대시보드.",
    story: [
      "헬스장에서 인바디 찍을 때마다 종이로 주는데 그게 쌓이기만 하고 변화를 한눈에 볼 수가 없었다.",
      "체중, 골격근량, 체지방률을 날짜별로 입력해두면 그래프로 추세를 볼 수 있다. 완전 개인용으로 만들었다.",
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
          <Link href="/" className="back-link">← Works</Link>

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
              <p style={{ fontSize: 16, color: "#666", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 20 }}>
                {p.desc}
              </p>
              <p style={{ fontSize: 15, color: "#333", lineHeight: 1.7, maxWidth: 560 }}>
                {p.overview}
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
            <img src={p.screens[0].src} alt={p.screens[0].caption} style={{ width: "100%", display: "block" }} />
          </div>
          <p style={{ marginTop: 12, fontSize: 11, color: "#999", fontFamily: "'IBM Plex Mono', monospace" }}>
            {p.screens[0].caption}
          </p>
        </section>

        {/* Features */}
        {p.features && (
          <section style={{ padding: "0 80px 80px", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 32 }}>
              Features
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
              {p.features.map((f, i) => (
                <div key={i} style={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 16,
                  background: "#fafafa",
                  overflow: "hidden",
                }}>
                  {f.img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.img} alt={f.title} style={{ width: "100%", display: "block", borderBottom: "1px solid rgba(0,0,0,0.06)" }} />
                  )}
                  <div style={{ padding: "20px 24px" }}>
                    <div style={{ fontSize: 20, marginBottom: 8 }}>{f.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: "#111" }}>{f.title}</div>
                    <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Story + second screen */}
        <section style={{
          padding: "0 80px 80px", maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start",
        }}>
          <div>
            <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 24 }}>
              Background
            </div>
            {p.story.map((para, i) => (
              <p key={i} style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: 16, lineHeight: 2, color: "#333", marginBottom: 24,
              }}>
                {para}
              </p>
            ))}
            {p.context && (
              <div style={{
                marginTop: 8, padding: "20px 24px",
                background: "#f5f5f5", borderRadius: 12,
                fontSize: 13, color: "#555", lineHeight: 1.8,
                fontFamily: "'IBM Plex Mono', monospace",
              }}>
                {p.context}
              </div>
            )}
          </div>

          {p.screens[1] && (
            <div style={{ position: "sticky", top: 100 }}>
              <div style={{
                borderRadius: 16, overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.screens[1].src} alt={p.screens[1].caption} style={{ width: "100%", display: "block" }} />
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
            }}
          >
            실제 사이트 보기 ↗
          </a>
        </section>
      </div>
    </main>
  );
}
