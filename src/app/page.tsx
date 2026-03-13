"use client";

import { useEffect, useRef, useState } from "react";

const galleryItems = Array.from({ length: 16 }, (_, i) => i + 1);

const tags = ["Design", "Development", "Portfolio", "Bento Grid", "Colourful", "Fun", "Gradient", "Grid", "Illustrative", "Interactive", "Light", "Unusual Layout"];

type Emotion = "stay" | "dance" | "sorry" | "run" | "sit" | "pushup" | "walk" | "wtf" | "punch";

const emotions: Record<Emotion, { label: string; emoji: string; situation: string; quote: string }> = {
  stay:   { label: "stay",   emoji: "😐", situation: "Oseong은 저녁밥 고민 중...",            quote: "어서 오세요" },
  dance:  { label: "dance",  emoji: "🕺", situation: "Oseong은 기분이 좋아 보인다.",           quote: "아 예 아 예" },
  sorry:  { label: "sorry",  emoji: "🙇", situation: "Oseong은 별 생각 없어 보인다...",        quote: "미안하게 됐음다" },
  run:    { label: "run",    emoji: "🏃", situation: "Oseong은 바빠 보인다.",                  quote: "" },
  sit:    { label: "sit",    emoji: "💭", situation: "Oseong에게 뭔가 고민이 있는 걸까...?",   quote: "" },
  pushup: { label: "pushup", emoji: "💪", situation: "Oseong은 운동하러 갔다",                 quote: "백만스물 하나... 백만스물 둘..." },
  walk:   { label: "walk",   emoji: "🚶", situation: "Oseong이 걷는 중",                      quote: "이제 쓰는 것도 귀찮네 어휴" },
  wtf:    { label: "wtf",    emoji: "🤯", situation: "Oseong이 극혐하고 있다.",                quote: "만지지 마세요" },
  punch:  { label: "punch",  emoji: "👊", situation: "tmi : Oseong은 두 달동안 복싱을 다녔다", quote: "아 원투 원투" },
};

const emotionKeys = Object.keys(emotions) as Emotion[];

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<Record<Emotion, HTMLVideoElement | null>>({} as Record<Emotion, HTMLVideoElement | null>);
  const introRef = useRef<HTMLDivElement>(null);
  const [emotion, setEmotion] = useState<Emotion>("stay");
  const [introVisible, setIntroVisible] = useState(true);

  const handleEmotion = (e: Emotion) => {
    const prev = videoRefs.current[emotion];
    if (prev) prev.pause();
    setEmotion(e);
    const next = videoRefs.current[e];
    if (next) { next.currentTime = 0; next.play(); }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (introRef.current) introRef.current.classList.add("fade-out");
      setTimeout(() => setIntroVisible(false), 800);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.transition = "opacity 1s ease, transform 1s ease";
      requestAnimationFrame(() => {
        if (titleRef.current) {
          titleRef.current.style.opacity = "1";
          titleRef.current.style.transform = "translateY(0)";
        }
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              (entry.target as HTMLElement).style.opacity = "1";
              (entry.target as HTMLElement).style.transform = "translateY(0)";
            }, idx * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    itemsRef.current.forEach((el) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(60px)";
        el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {introVisible && (
        <div ref={introRef} className="intro-overlay">
          <video
            src="/sit.webm"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: 320, height: 320, objectFit: "contain" }}
          />
        </div>
      )}

      <nav className="nav-fixed">
        <div className="nav-logo">Oseong</div>
        <div className="nav-links">
          <a href="#">Works</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      <main className="main-container">
        {/* Header */}
        <section className="header-section">
          {/* Left: video + buttons */}
          <div className="header-left">
            <div style={{ position: "relative", width: "100%", maxWidth: 500, height: 500 }}>
              <div className="video-blob" />
              {emotionKeys.map((e) => (
                <video
                  key={e}
                  ref={(el) => { videoRefs.current[e] = el; }}
                  src={`/${e}.webm`}
                  autoPlay={e === "stay"}
                  loop
                  muted
                  playsInline
                  preload="auto"
                  style={{
                    width: "100%", height: 500, objectFit: "contain",
                    position: "absolute", top: 0, left: 0, zIndex: 1,
                    display: emotion === e ? "block" : "none",
                  }}
                />
              ))}
            </div>

            {/* Emotion buttons (text only) */}
            <div className="emotion-buttons" style={{ justifyContent: "center" }}>
              {(Object.keys(emotions) as Emotion[]).map((e) => (
                <button
                  key={e}
                  className={`emotion-btn${emotion === e ? " active" : ""}`}
                  onClick={() => handleEmotion(e)}
                >
                  <span className="emotion-btn-emoji">{emotions[e].emoji}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: name + info + situation */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 32 }}>
            {/* Name */}
            <h1
              ref={titleRef}
              className="header-title font-windsor"
              style={{ marginBottom: 0 }}
            >
              <span className="highlight">Oseong Shin</span>
            </h1>

            {/* Info table */}
            <div className="meta-info">
              <div className="meta-row">
                <div className="meta-label">Birth</div>
                <div className="meta-value">2001. 11. 14</div>
              </div>
              <div className="meta-row">
                <div className="meta-label">MBTI</div>
                <div className="meta-value">INFP</div>
              </div>
              <div className="meta-row">
                <div className="meta-label">About</div>
                <div className="meta-value">아이디어가 있으면 만들어내야만 하는 성격.</div>
              </div>
            </div>

            {/* Emotion */}
            <div>
              <p className="emotion-situation">{emotions[emotion].situation}</p>
              {emotions[emotion].quote && <p className="emotion-quote">"{emotions[emotion].quote}"</p>}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="gallery-section">
          <div className="gallery-grid">
            {galleryItems.map((n, i) => (
              <div
                key={n}
                className={`gallery-item item-${n}`}
                ref={(el) => { itemsRef.current[i] = el; }}
              />
            ))}
          </div>
        </section>

        {/* Tags */}
        <section className="tags-section">
          <div className="tags-label">Tags</div>
          <div className="tags-list">
            {tags.map((tag) => (
              <button key={tag} className="tag">{tag}</button>
            ))}
          </div>
        </section>

        {/* Credits */}
        <section className="credits-section">
          <div className="credit-item">
            <div className="credit-label">Fonts</div>
            <div className="credit-value">
              <a href="#">IBM Plex Mono</a>
            </div>
          </div>
          <div className="credit-item">
            <div className="credit-label">Built with</div>
            <div className="credit-value">
              <a href="#">Next.js</a>, <a href="#">Vercel</a>, <a href="#">Supabase</a>
            </div>
          </div>
          <div className="credit-item">
            <div className="credit-label">Made by</div>
            <div className="credit-value">
              <a href="https://github.com/oseong27436" target="_blank" rel="noopener noreferrer">Oseong</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
