"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const projectsMap: Record<string, {
  name: string;
  desc: string;
  tech: string[];
  preview: string;
  href: string;
  colSpan: number;
  rowSpan: number;
}> = {
  stocks: {
    name: "Stocks",
    desc: "주식 포트폴리오 트래커",
    tech: ["Next.js", "Yahoo Finance", "Recharts", "Supabase"],
    preview: "/preview-stocks.png",
    href: "https://stocks-pearl-one.vercel.app",
    colSpan: 2,
    rowSpan: 2,
  },
  gmepu: {
    name: "지메뿌",
    desc: "지도에 메모 뿌리기",
    tech: ["Next.js", "Google Maps", "Framer Motion", "Supabase"],
    preview: "/preview-gmepu.png",
    href: "https://gmepu.vercel.app",
    colSpan: 1,
    rowSpan: 1,
  },
  inbody: {
    name: "Inbody",
    desc: "인바디 기록 대시보드",
    tech: ["Next.js", "Recharts", "Supabase"],
    preview: "/preview-inbody.png",
    href: "https://inbody-tau.vercel.app",
    colSpan: 1,
    rowSpan: 1,
  },
};

const DEFAULT_ORDER = ["stocks", "gmepu", "inbody"];

export default function DraggableWorks() {
  const [order, setOrder] = useState<string[]>(DEFAULT_ORDER);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [synced, setSynced] = useState(false);

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
        if (Array.isArray(parsed) && parsed.every((id) => id in projectsMap)) {
          setOrder(parsed);
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

  if (!synced) return (
    <div className="works-section">
      <div className="works-label">Works</div>
      <div className="works-grid-layout works-loading">
        {DEFAULT_ORDER.map((id) => (
          <div key={id} className="work-card work-card-skeleton"
            style={{ gridColumn: `span ${projectsMap[id].colSpan}` }} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="works-section">
      <div className="works-label">Works</div>
      <div className="works-grid-layout">
        {order.map((id) => {
          const p = projectsMap[id];
          const isDragging = draggingId === id;
          const isOver = overId === id && draggingId !== id;
          return (
            <div
              key={id}
              draggable
              onDragStart={() => handleDragStart(id)}
              onDragOver={(e) => handleDragOver(e, id)}
              onDrop={() => handleDrop(id)}
              onDragEnd={handleDragEnd}
              className="work-card"
              style={{
                gridColumn: `span ${p.colSpan}`,
                gridRow: `span ${p.rowSpan}`,
                opacity: isDragging ? 0.4 : 1,
                outline: isOver ? "2px dashed rgba(255,255,255,0.4)" : "none",
                outlineOffset: "4px",
                transform: isOver ? "scale(1.02)" : "scale(1)",
                cursor: isDragging ? "grabbing" : "grab",
              }}
            >
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
