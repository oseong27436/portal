import { notFound } from "next/navigation";
import Link from "next/link";

const SB = "https://ovbkdgjrkstzyahidyzv.supabase.co/storage/v1/object/public/portal";

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
  bridge: {
    name: "Bridge",
    slug: "bridge",
    year: "2026",
    tech: ["Next.js", "Supabase SSR", "shadcn/ui", "dnd-kit", "next-intl"],
    href: "https://bridge-green-theta.vercel.app",
    color: "#f97316",
    desc: "오사카 국제 교류 커뮤니티 플랫폼",
    overview: "오사카에서 실제로 활동 중인 국제 교류 단체 Bridge의 공식 웹사이트. 일본인과 외국인이 함께 어울리는 이 커뮤니티가 라인 단체방으로만 운영되던 한계를 넘어, 이벤트 등록·참가 예약·코르크보드 리뷰까지 갖춘 플랫폼으로 2026년 6월 정식 운영 예정.",
    story: [
      "전역 후 워킹홀리데이로 오사카에 처음 갔을 때 Bridge를 통해 현지 커뮤니티에 녹아들었다. 이후 고베가쿠인대학(KGU)으로 교환학생(2025년)을 다시 가면서 또 Bridge 활동을 이어갔다.",
      "커뮤니티가 라인 단체방 하나로만 굴러가고 있었다. 이벤트 공지는 묻히고, 누가 참가하는지 파악이 안 되고, 후기는 사라졌다. 직접 만들어주기로 했고, 현재 테스트 마무리 단계로 2026년 6월부터 실제 운영에 들어갈 예정이다.",
    ],
    features: [
      { icon: "📅", title: "이벤트 등록 & 예약", desc: "이벤트 개설부터 참가 예약까지 한 곳에서 처리" },
      { icon: "📌", title: "코르크보드 리뷰", desc: "참여 후기를 포스트잇처럼 드래그해서 코르크보드에 자유 배치" },
      { icon: "🌏", title: "다국어 지원", desc: "일·한·영 전환으로 외국인 멤버도 언어 장벽 없이" },
      { icon: "🛠️", title: "관리자 패널", desc: "호스트가 직접 이벤트 관리, 참가자 확인" },
    ],
    context: "오사카에서 현재 활동 중인 국제 교류 커뮤니티 Bridge(@bridge_jpofficial)의 웹사이트 제작 의뢰를 받아 개발. 2026년 6월 정식 운영 예정.",
    screens: [
      { src: `${SB}/preview-bridge-main.jpg`, caption: "Bridge Osaka 메인 — 국제 교류 이벤트 허브" },
      { src: `${SB}/preview-bridge-cork.jpg`, caption: "みんなのレビュー — 코르크보드 후기" },
    ],
  },
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
      { src: `${SB}/preview-stocks.jpg`, caption: "메인 페이지 — 포트폴리오 트래커" },
    ],
  },
  gmepu: {
    name: "지메뿌",
    slug: "gmepu",
    year: "2026",
    tech: ["Next.js", "Google Maps API", "Supabase", "Framer Motion", "Google Auth"],
    href: "https://gmepu.vercel.app",
    color: "#f5c800",
    desc: "지도에 메모 뿌리기",
    overview: "현재 위치에 짧은 메모를 남기면 지도 위에 포스트잇 핀으로 꽂힌다. 길을 걷다 낯선 사람의 메모를 발견하고, 나도 그 자리에 흔적을 남기는 위치 기반 익명 커뮤니티.",
    story: [
      "지메뿌는 '지도에 메모 뿌리기'의 줄임말. Google 로그인 후 지도를 열면 주변에 다른 사람들이 뿌린 메모들이 보인다. 메모가 많이 쌓인 장소는 숫자 클러스터로 묶이고, 전체 / 친구 / 🔥 핫 필터로 원하는 메모만 골라 볼 수 있다.",
      "메모를 많이 뿌릴수록 그 장소에 대화방을 개설할 수 있는 권한이 생긴다. 팔로우 없이 공간으로만 연결되는 구조다.",
    ],
    features: [
      { icon: "📍", title: "위치 기반 메모 뿌리기", desc: "현재 위치에 짧은 메모를 핀으로 꽂기" },
      { icon: "🗂️", title: "전체 / 친구 / 🔥 핫 필터", desc: "원하는 메모만 골라서 탐색" },
      { icon: "🔢", title: "메모 클러스터링", desc: "밀집 지역은 숫자 뱃지로 묶어 표시" },
      { icon: "💬", title: "위치 기반 대화방", desc: "메모 누적 시 그 장소에 대화방 개설 권한" },
    ],
    context: "서비스디자인 수업 팀 프로젝트 최종 채택 아이템. '한국판 지도 기반 레딧' 컨셉으로, 위치 데이터가 쌓일수록 핫플 데이터 자산이 된다는 논리.",
    screens: [
      { src: `${SB}/preview-gmepu.jpg`, caption: "랜딩 페이지 — 메모 핀 분포" },
      { src: `${SB}/preview-gmepu-map.jpg`, caption: "지도 화면 — 위치 권한 요청 및 메모 탐색" },
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
