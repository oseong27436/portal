"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// HSL helpers
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  return s === 0
    ? [Math.round(l*255), Math.round(l*255), Math.round(l*255)]
    : [Math.round(hue2rgb(h/360 + 1/3)*255), Math.round(hue2rgb(h/360)*255), Math.round(hue2rgb(h/360 - 1/3)*255)];
}

function rgbToHue(r: number, g: number, b: number): number {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (max === min) return 0;
  const d = max - min;
  let h = max === r ? (g - b) / d + (g < b ? 6 : 0)
        : max === g ? (b - r) / d + 2
        : (r - g) / d + 4;
  return (h / 6) * 360;
}

function ColorPickerCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [picking, setPicking] = useState(false);
  const [swatchColor, setSwatchColor] = useState("#f2ece6");
  const [indicatorPos, setIndicatorPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("site-bg-color");
    if (saved) {
      setSwatchColor(saved);
      document.documentElement.style.setProperty("--site-bg", saved);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const size = canvas.width;
    const cx = size / 2, cy = size / 2, r = size / 2 - 1;
    const imageData = ctx.createImageData(size, size);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - cx, dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > r) continue;
        const hue = ((Math.atan2(dy, dx) * 180 / Math.PI) + 360) % 360;
        const sat = dist / r;
        const [rr, gg, bb] = hslToRgb(hue, sat, 0.5 + (1 - sat) * 0.3);
        const idx = (y * size + x) * 4;
        imageData.data[idx] = rr;
        imageData.data[idx + 1] = gg;
        imageData.data[idx + 2] = bb;
        imageData.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);

  const applyColor = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width, sy = canvas.height / rect.height;
    const x = Math.round((e.clientX - rect.left) * sx);
    const y = Math.round((e.clientY - rect.top) * sy);
    const cx = canvas.width / 2, cy = canvas.height / 2;
    if (Math.sqrt((x-cx)**2 + (y-cy)**2) > canvas.width / 2) return;

    const [rr, gg, bb] = Array.from(ctx.getImageData(x, y, 1, 1).data) as [number, number, number, number];
    const hue = rgbToHue(rr, gg, bb);
    const bg = `hsl(${Math.round(hue)}, 28%, 91%)`;
    document.documentElement.style.setProperty("--site-bg", bg);
    localStorage.setItem("site-bg-color", bg);
    setSwatchColor(bg);
    // 인디케이터 위치: canvas 내 비율로 저장
    const rect2 = canvas.getBoundingClientRect();
    setIndicatorPos({
      x: (e.clientX - rect2.left) / rect2.width * 100,
      y: (e.clientY - rect2.top) / rect2.height * 100,
    });
  }, []);

  return (
    <div className="color-picker-card" style={{ position: "absolute", inset: 0 }}>
      <div className="color-picker-label">Interface color.</div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <canvas
          ref={canvasRef}
          width={180}
          height={180}
          className="color-wheel-canvas"
          onMouseDown={(e) => { setPicking(true); applyColor(e); }}
          onMouseMove={(e) => picking && applyColor(e)}
          onMouseUp={() => setPicking(false)}
          onMouseLeave={() => setPicking(false)}
          onClick={applyColor}
        />
        {indicatorPos && (
          <div style={{
            position: "absolute",
            left: `${indicatorPos.x}%`,
            top: `${indicatorPos.y}%`,
            transform: "translate(-50%, -50%)",
            width: 14,
            height: 14,
            borderRadius: "50%",
            border: "2.5px solid #fff",
            boxShadow: "0 0 0 1.5px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.3)",
            background: swatchColor,
            pointerEvents: "none",
            transition: "left 0.05s, top 0.05s",
          }} />
        )}
      </div>
      <div className="color-swatch-row">
        <div className="color-swatch-dot" style={{ background: swatchColor }} />
        <span className="color-swatch-value">{swatchColor}</span>
      </div>
    </div>
  );
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Category = "works" | "item";

const FILTERS: { label: string; value: "all" | Category }[] = [
  { label: "All", value: "all" },
  { label: "Works", value: "works" },
  { label: "Item", value: "item" },
];

const projectsMap: Record<string, {
  name: string;
  desc: string;
  tech: string[];
  preview: string;
  href: string;
  colSpan: number;
  rowSpan: number;
  category: Category;
}> = {
  stocks: {
    name: "Stocks",
    desc: "주식 포트폴리오 트래커",
    tech: ["Next.js", "Yahoo Finance", "Recharts", "Supabase"],
    preview: "/preview-stocks.png",
    href: "https://stocks-pearl-one.vercel.app",
    colSpan: 1,
    rowSpan: 1,
    category: "works",
  },
  gmepu: {
    name: "지메뿌",
    desc: "지도에 메모 뿌리기",
    tech: ["Next.js", "Google Maps", "Framer Motion", "Supabase"],
    preview: "/preview-gmepu.png",
    href: "https://gmepu.vercel.app",
    colSpan: 1,
    rowSpan: 1,
    category: "works",
  },
  inbody: {
    name: "Inbody",
    desc: "인바디 기록 대시보드",
    tech: ["Next.js", "Recharts", "Supabase"],
    preview: "/preview-inbody.png",
    href: "https://inbody-tau.vercel.app",
    colSpan: 1,
    rowSpan: 1,
    category: "works",
  },
  "color-picker": {
    name: "Interface color.",
    desc: "",
    tech: [],
    preview: "",
    href: "",
    colSpan: 1,
    rowSpan: 1,
    category: "item",
  },
};

const DEFAULT_ORDER = ["stocks", "gmepu", "inbody", "color-picker"];

export default function DraggableWorks() {
  const [order, setOrder] = useState<string[]>(DEFAULT_ORDER);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [synced, setSynced] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | Category>("all");

  // Supabase에서 순서 불러오기
  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from("works_config")
        .select("card_order")
        .eq("id", "layout")
        .single();

      if (!error && data?.card_order) {
        const parsed = data.card_order as string[];
        if (Array.isArray(parsed)) {
          const valid = parsed.filter((id) => id in projectsMap);
          const newCards = Object.keys(projectsMap).filter((id) => !valid.includes(id));
          setOrder([...valid, ...newCards]);
        }
      }
      setSynced(true);
    };

    fetchOrder();
  }, []);

  const saveOrder = async (newOrder: string[]) => {
    await supabase
      .from("works_config")
      .update({ card_order: newOrder, updated_at: new Date().toISOString() })
      .eq("id", "layout");
  };

  const handleDragStart = (id: string) => setDraggingId(id);

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    setOverId(id);
  };

  const handleDrop = (targetId: string) => {
    if (!draggingId || draggingId === targetId) return;
    setOrder((prev) => {
      const next = [...prev];
      const fromIdx = next.indexOf(draggingId);
      const toIdx = next.indexOf(targetId);
      [next[fromIdx], next[toIdx]] = [next[toIdx], next[fromIdx]];
      saveOrder(next);
      return next;
    });
    setDraggingId(null);
    setOverId(null);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setOverId(null);
  };

  const filteredOrder = activeFilter === "all"
    ? order
    : order.filter((id) => projectsMap[id].category === activeFilter);

  if (!synced) return (
    <div className="works-section">
      <div className="works-header">
        <div className="works-label">Works</div>
      </div>
      <div className="works-grid-layout works-loading">
        {DEFAULT_ORDER.map((id) => (
          <div key={id} className="work-card work-card-skeleton"
            style={{ gridColumn: `span ${projectsMap[id].colSpan}` }} />
        ))}
      </div>
    </div>
  );

  const anyDragging = draggingId !== null;

  return (
    <div className="works-section">
      <div className="works-header">
        <div className="works-label">Works</div>
        <div className="works-filters">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`works-filter-btn${activeFilter === f.value ? " active" : ""}`}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="works-grid-layout">
        {filteredOrder.map((id) => {
          const p = projectsMap[id];
          const isDragging = draggingId === id;
          const isOver = overId === id && !isDragging;
          const isIdle = anyDragging && !isDragging && !isOver;

          const cardStyle: React.CSSProperties = {
            gridColumn: `span ${p.colSpan}`,
            gridRow: `span ${p.rowSpan}`,
            transition: "opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease",
            cursor: isDragging ? "grabbing" : "grab",
            ...(isDragging && {
              opacity: 0.45,
              transform: "scale(0.97)",
              filter: "blur(1.5px)",
              boxShadow: "none",
            }),
            ...(isOver && {
              transform: "scale(1.03)",
              boxShadow: "0 0 0 2.5px rgba(255,255,255,0.75), 0 16px 48px rgba(0,0,0,0.25)",
            }),
            ...(isIdle && {
              opacity: 0.65,
            }),
          };

          return (
            <div
              key={id}
              draggable
              onDragStart={() => handleDragStart(id)}
              onDragOver={(e) => handleDragOver(e, id)}
              onDrop={() => handleDrop(id)}
              onDragEnd={handleDragEnd}
              onClick={() => id !== "color-picker" && (window.location.href = `/works/${id}`)}
              className="work-card"
              style={{ ...cardStyle, cursor: id === "color-picker" ? "default" : cardStyle.cursor }}
            >
              {id === "color-picker" ? (
                <ColorPickerCard />
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.preview}
                    alt={p.name}
                    draggable={false}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  />
                  <div className="work-card-overlay">
                    <div className="work-card-overlay-content">
                      <div>
                        <div className="work-card-name">{p.name}</div>
                        <div className="work-card-desc">{p.desc}</div>
                      </div>
                      <div className="work-card-bottom">
                        <div className="work-card-tags">
                          {p.tech.map((t) => (
                            <span key={t} className="work-card-tag">{t}</span>
                          ))}
                        </div>
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="work-card-link"
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
