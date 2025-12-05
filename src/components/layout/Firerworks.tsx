import { useEffect, useRef } from "react";

export default function Fireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();

    // mostrar apenas entre 31/12 e 01/01
    const start = new Date(year, 11, 31);  // 31 de dezembro
    const end = new Date(year + 1, 0, 2);  // até 02 de janeiro

    if (!(now >= start && now < end)) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    const particles: any[] = [];

    function createFirework() {
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const targetY = Math.random() * (canvas.height / 2);

      const firework = {
        x,
        y,
        targetY,
        speed: 4,
        exploded: false,
      };

      particles.push(firework);
    }

    function explode(firework: any) {
      const count = 30;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: firework.x,
          y: firework.y,
          r: 2 + Math.random() * 2,
          color: `hsl(${Math.random() * 360}, 100%, 60%)`,
          alpha: 1,
          decay: 0.015 + Math.random() * 0.02,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          particle: true,
        });
      }
    }

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // foguete subindo
        if (!p.particle) {
          p.y -= p.speed;

          ctx.beginPath();
          ctx.fillStyle = "white";
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();

          if (p.y <= p.targetY) {
            explode(p);
            particles.splice(i, 1);
          }
        }

        // partículas da explosão
        if (p.particle) {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
          }
        }
      });

      if (Math.random() < 0.05) createFirework();

      requestAnimationFrame(update);
    }

    update();

    return () => window.removeEventListener("resize", resize);
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
