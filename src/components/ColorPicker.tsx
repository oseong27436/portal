"use client";

import { useRef, useCallback } from "react";

interface Props {
  onColorChange: (hsl: string) => void;
}

export default function ColorPicker({ onColorChange }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const getHueFromEvent = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    return Math.round((x / rect.width) * 360);
  }, []);

  const handleMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const hue = getHueFromEvent(e);
    onColorChange(`hsl(${hue}, 40%, 96%)`);
  }, [getHueFromEvent, onColorChange]);

  const handleUp = useCallback(() => {
    isDragging.current = false;
    window.removeEventListener("mousemove", handleMove);
    window.removeEventListener("mouseup", handleUp);
  }, [handleMove]);

  const handleDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    const hue = getHueFromEvent(e);
    onColorChange(`hsl(${hue}, 40%, 96%)`);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  }, [getHueFromEvent, onColorChange, handleMove, handleUp]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const hue = getHueFromEvent(e);
    onColorChange(`hsl(${hue}, 40%, 96%)`);
  }, [getHueFromEvent, onColorChange]);

  return (
    <div style={{ marginTop: 16 }}>
      <div
        style={{
          fontSize: 11,
          color: "#999",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 8,
        }}
      >
        Background
      </div>
      <div
        ref={trackRef}
        onMouseDown={handleDown}
        onClick={handleClick}
        style={{
          width: 200,
          height: 12,
          borderRadius: 6,
          background:
            "linear-gradient(to right, hsl(0,60%,70%), hsl(30,60%,70%), hsl(60,60%,70%), hsl(90,60%,70%), hsl(120,60%,70%), hsl(150,60%,70%), hsl(180,60%,70%), hsl(210,60%,70%), hsl(240,60%,70%), hsl(270,60%,70%), hsl(300,60%,70%), hsl(330,60%,70%), hsl(360,60%,70%))",
          cursor: "crosshair",
          userSelect: "none",
        }}
      />
    </div>
  );
}
