"use client";

import Spline from "@splinetool/react-spline";

export default function SplineCharacter() {
  return (
    <div style={{ width: 400, height: 400, borderRadius: 24, overflow: "hidden" }}>
      <Spline scene="https://prod.spline.design/SH30CCjAdI8K15MS/scene.splinecode" />
    </div>
  );
}
