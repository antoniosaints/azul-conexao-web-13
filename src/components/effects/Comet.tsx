import { useEffect, useRef } from "react";

export default function Comet() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    interface Comet {
      x: number;
      y: number;
      vx: number; // velocidade X (normalizado)
      vy: number; // velocidade Y (normalizado)
      life: number;
    }

    let comet: Comet | null = null;

    function spawnComet() {
      const startX = -100;
      const startY = Math.random() * canvas.height * 0.4;

      const endX = canvas.width + 200;
      const endY = startY + canvas.height * 0.6;

      // calcula vetor da diagonal
      const dx = endX - startX;
      const dy = endY - startY;

      // normaliza o vetor
      const len = Math.sqrt(dx * dx + dy * dy);
      const speed = 7; // velocidade geral
      const vx = (dx / len) * speed;
      const vy = (dy / len) * speed;

      comet = {
        x: startX,
        y: startY,
        vx,
        vy,
        life: 1, // opacidade
      };
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!comet && Math.random() < 0.005) {
        spawnComet();
      }

      if (comet) {
        comet.x += comet.vx;
        comet.y += comet.vy;
        comet.life -= 0.007; // fade

        ctx.save();
        ctx.globalAlpha = comet.life;
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(comet.x - comet.vx * 3, comet.y - comet.vy * 3);
        ctx.lineTo(comet.x, comet.y);
        ctx.stroke();
        ctx.restore();

        if (comet.life <= 0) comet = null;
      }

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
