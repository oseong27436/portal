"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SB = "https://ovbkdgjrkstzyahidyzv.supabase.co/storage/v1/object/public/portal";

const projectsMap: Record<string, {
  name: string;
  desc: string;
  tech: string[];
  preview: string;
  href: string;
  colSpan: number;
  rowSpan: number;
}> = {
  bridge: {
    name: "Bridge",
    desc: "한일 이벤트 발견 플랫폼",
    tech: ["Next.js", "Supabase", "shadcn/ui", "dnd-kit"],
    preview: `${SB}/preview-bridge.jpg`,
    href: "https://bridge-green-theta.vercel.app",
    colSpan: 1,
    rowSpan: 1,
  },
  stocks: {
    name: "Stocks",
    desc: "주식 포트폴리오 트래커",
    tech: ["Next.js", "Yahoo Finance", "Recharts", "Supabase"],
    preview: `${SB}/preview-stocks.jpg`,
    href: "https://stocks-pearl-one.vercel.app",
    colSpan: 1,
    rowSpan: 1,
  },
  gmepu: {
    name: "지메뿌",
    desc: "지도에 메모 뿌리기",
    tech: ["Next.js", "Google Maps", "Framer Motion", "Supabase"],
    preview: `${SB}/preview-gmepu.jpg`,
    href: "https://gmepu.vercel.app",
    colSpan: 1,
    rowSpan: 1,
  },
};

const DEFAULT_ORDER = ["bridge", "stocks", "gmepu"];

export default function DraggableWorks() {
  const [order, setOrder] = useState<string[]>(DEFAULT_ORDER);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [synced, setSynced] = useState(false);

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
      </div>
      <div className="works-grid-layout">
        {order.map((id) => {
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
              onClick={() => (window.location.href = `/works/${id}`)}
              className="work-card"
              style={cardStyle}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.preview}
                alt={p.name}
                draggable={false}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "top",
                }}
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
