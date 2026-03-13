"use client";

import { useEffect, useRef } from "react";

export default function EyeCharacter() {
  const leftEyeRef = useRef<SVGGElement>(null);
  const rightEyeRef = useRef<SVGGElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const moveEyes = (e: MouseEvent) => {
      if (!svgRef.current || !leftEyeRef.current || !rightEyeRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();

      const eyes = [
        { ref: leftEyeRef, cx: 60, cy: 50 },
        { ref: rightEyeRef, cx: 140, cy: 50 },
      ];

      eyes.forEach(({ ref, cx, cy }) => {
        const eyeX = rect.left + (cx / 200) * rect.width;
        const eyeY = rect.top + (cy / 100) * rect.height;
        const dx = e.clientX - eyeX;
        const dy = e.clientY - eyeY;
        const angle = Math.atan2(dy, dx);
        const dist = 10;
        const ox = Math.cos(angle) * dist;
        const oy = Math.sin(angle) * dist;
        ref.current!.setAttribute("transform", `translate(${ox}, ${oy})`);
      });
    };

    window.addEventListener("mousemove", moveEyes);
    return () => window.removeEventListener("mousemove", moveEyes);
  }, []);

  return (
    <svg
      ref={svgRef}
      width="200"
      height="100"
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 왼쪽 눈 흰자 */}
      <ellipse cx="60" cy="50" rx="38" ry="38" fill="white" stroke="#111" strokeWidth="2.5" />
      {/* 왼쪽 눈동자 그룹 (마우스 따라 이동) */}
      <g ref={leftEyeRef}>
        <circle cx="60" cy="50" r="16" fill="#111" />
        <circle cx="67" cy="43" r="5" fill="white" />
      </g>

      {/* 오른쪽 눈 흰자 */}
      <ellipse cx="140" cy="50" rx="38" ry="38" fill="white" stroke="#111" strokeWidth="2.5" />
      {/* 오른쪽 눈동자 그룹 (마우스 따라 이동) */}
      <g ref={rightEyeRef}>
        <circle cx="140" cy="50" r="16" fill="#111" />
        <circle cx="147" cy="43" r="5" fill="white" />
      </g>
    </svg>
  );
}
