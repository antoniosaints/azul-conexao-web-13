import React, { useEffect, useState } from "react";

const isChristmasSeason = () => {
  const now = new Date();
  const year = now.getFullYear();
  const start = new Date(year, 11, 5);  // 06/12
  const end = new Date(year, 11, 27);   // até 26/12
  return now >= start && now < end;
};

export default function ChristmasLights() {
  const [enabled] = useState(isChristmasSeason());

  if (!enabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999
      }}
    >
      {/* Linha superior */}
      <div style={lineStyle}>
        {Array.from({ length: 40 }).map((_, i) => (
          <Bulb key={i} delay={i * 0.15} />
        ))}
      </div>

      {/* Linha inferior */}
      <div style={{ ...lineStyle, top: "auto", bottom: 0 }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <Bulb key={i} delay={i * 0.15} />
        ))}
      </div>
    </div>
  );
}

const lineStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "20px",
  display: "flex",
  justifyContent: "space-between",
};

function Bulb({ delay }: { delay: number }) {
  const colors = ["#ff4d4d", "#4dd14d", "#4da6ff", "#ffd24d"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      style={{
        width: 12,
        height: 18,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 10px ${color}`,
        animation: `blink 1.5s ${delay}s infinite`,
      }}
    />
  );
}
