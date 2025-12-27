import { useEffect, useState } from "react";

export default function ChristmasLights() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();

    const start = new Date(year, 11, 5); // 06/12
    const end = new Date(year, 11, 27); // até 26/12 (meia-noite vira 27)

    if (now >= start && now < end) {
      setEnabled(true);
    }
  }, []);

  if (!enabled) return null;

  const colors = ["#ff4d4d", "#4dff4d", "#4db8ff", "#ffff4d", "#ff99ff"];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 14px",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: colors[i % colors.length],
            animation: `blink ${0.6 + (i % 5) * 0.15}s infinite alternate`,
          }}
        />
      ))}

      <style>
        {`
        @keyframes blink {
          0% { opacity: 0.2; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1.15); }
        }
        `}
      </style>
    </div>
  );
}
