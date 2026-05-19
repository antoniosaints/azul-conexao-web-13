import { useEffect, useRef } from "react";

type ColorMode =
  | {
      type: "palette";
      hues?: number[];
    }
  | {
      type: "monochrome";
      hue: number;
      variance?: number;
    };

type FireworksConfig = {
  onlyNewYear?: boolean;
  density?: number;
  initialBursts?: number;
  maxParticles?: number;
  zIndex?: number;
  drawBackground?: boolean;
  colorMode?: ColorMode;
};

type FireworksProps = {
  config?: FireworksConfig;
};

type Rocket = {
  type: "rocket";
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  hue: number;
  trail: { x: number; y: number }[];
};

type Streak = {
  type: "streak";
  cx: number;
  cy: number;
  angle: number;
  distance: number;
  speed: number;
  length: number;
  maxDistance: number;
  width: number;
  hue: number;
  alpha: number;
  decay: number;
  curve: number;
};

type Dot = {
  type: "dot";
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  alpha: number;
  decay: number;
};

type Particle = Rocket | Streak | Dot;

const DEFAULT_CONFIG: Required<FireworksConfig> = {
  onlyNewYear: false,
  density: 0.035,
  initialBursts: 7,
  maxParticles: 700,
  zIndex: 9999,
  drawBackground: false,
  colorMode: {
    type: "monochrome",
    hue: 195,
  },
};

const TAU = Math.PI * 2;

const random = (min: number, max: number) => min + Math.random() * (max - min);

const hsla = (hue: number, alpha: number, lightness = 66, saturation = 100) =>
  `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;

export default function FireworksEnchanced({ config }: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cfg: Required<FireworksConfig> = {
      ...DEFAULT_CONFIG,
      ...config,
      colorMode: config?.colorMode ?? DEFAULT_CONFIG.colorMode,
    };

    const now = new Date();
    const year = now.getFullYear();

    // mostrar apenas durante todo o mês de junho
    const start = new Date(year, 5, 1); // 01 de junho
    const end = new Date(year, 5, 30); // 01 de julho

    if (!(now >= start && now < end)) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrame = 0;
    let lastTime = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function pickHue() {
      const mode = cfg.colorMode;

      if (mode.type === "monochrome") {
        const variance = mode.variance ?? 8;
        return mode.hue + random(-variance, variance);
      }

      const hues = mode.hues?.length
        ? mode.hues
        : [195, 205, 220, 285, 300, 315];

      return hues[Math.floor(Math.random() * hues.length)];
    }

    function pickEdgePoint() {
      const side = Math.floor(Math.random() * 4);
      const outside = 40;

      switch (side) {
        case 0:
          return {
            x: random(-outside, width + outside),
            y: random(-outside, height * 0.22),
          };

        case 1:
          return {
            x: random(width * 0.78, width + outside),
            y: random(-outside, height + outside),
          };

        case 2:
          return {
            x: random(-outside, width + outside),
            y: random(height * 0.78, height + outside),
          };

        default:
          return {
            x: random(-outside, width * 0.22),
            y: random(-outside, height + outside),
          };
      }
    }

    function createBurst(
      x: number,
      y: number,
      hue = pickHue(),
      partial = Math.random() < 0.7,
    ) {
      const rays = Math.floor(random(18, 34));
      const radius = random(110, 230);

      const startAngle = random(0, TAU);
      const arcSize = partial ? random(TAU * 0.45, TAU * 1.25) : TAU;

      for (let i = 0; i < rays; i++) {
        const angle = startAngle + (arcSize * i) / rays + random(-0.08, 0.08);

        particles.push({
          type: "streak",
          cx: x,
          cy: y,
          angle,
          distance: random(5, 24),
          speed: random(1.4, 3.5),
          length: random(38, 82),
          maxDistance: radius * random(0.65, 1),
          width: random(4, 9),
          hue,
          alpha: random(0.75, 1),
          decay: random(0.008, 0.018),
          curve: random(-0.0015, 0.0015),
        });
      }

      const dots = Math.floor(random(8, 18));

      for (let i = 0; i < dots; i++) {
        const angle = random(0, TAU);
        const speed = random(0.6, 2.2);

        particles.push({
          type: "dot",
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: random(2, 5),
          hue,
          alpha: random(0.65, 1),
          decay: random(0.01, 0.025),
        });
      }
    }

    function createFirework(instant = Math.random() < 0.75) {
      if (particles.length > cfg.maxParticles) return;

      const hue = pickHue();
      const target = pickEdgePoint();

      if (instant) {
        createBurst(target.x, target.y, hue);
        return;
      }

      const startX = random(width * 0.15, width * 0.85);
      const startY = height + 20;

      const dx = target.x - startX;
      const dy = target.y - startY;
      const distance = Math.hypot(dx, dy);
      const speed = random(5, 8);

      particles.push({
        type: "rocket",
        x: startX,
        y: startY,
        tx: target.x,
        ty: target.y,
        vx: (dx / distance) * speed,
        vy: (dy / distance) * speed,
        hue,
        trail: [],
      });
    }

    function drawBackground() {
      if (!cfg.drawBackground) {
        ctx.clearRect(0, 0, width, height);
        return;
      }

      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height),
      );

      gradient.addColorStop(0, "#15156f");
      gradient.addColorStop(0.55, "#101065");
      gradient.addColorStop(1, "#070744");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    function drawRocket(rocket: Rocket) {
      rocket.trail.push({ x: rocket.x, y: rocket.y });

      if (rocket.trail.length > 12) {
        rocket.trail.shift();
      }

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = 18;
      ctx.shadowColor = hsla(rocket.hue, 0.9, 70);

      for (let i = 1; i < rocket.trail.length; i++) {
        const p1 = rocket.trail[i - 1];
        const p2 = rocket.trail[i];

        ctx.strokeStyle = hsla(rocket.hue, i / rocket.trail.length, 70);

        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawStreak(streak: Streak) {
      const headX = streak.cx + Math.cos(streak.angle) * streak.distance;
      const headY = streak.cy + Math.sin(streak.angle) * streak.distance;

      const tailDistance = Math.max(0, streak.distance - streak.length);

      const tailX = streak.cx + Math.cos(streak.angle) * tailDistance;
      const tailY = streak.cy + Math.sin(streak.angle) * tailDistance;

      const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);

      gradient.addColorStop(0, hsla(streak.hue, 0, 58));
      gradient.addColorStop(0.45, hsla(streak.hue, streak.alpha * 0.65, 62));
      gradient.addColorStop(1, hsla(streak.hue, streak.alpha, 78));

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = gradient;
      ctx.lineWidth = streak.width;
      ctx.shadowBlur = 22;
      ctx.shadowColor = hsla(streak.hue, streak.alpha, 65);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(headX, headY);
      ctx.stroke();

      ctx.restore();
    }

    function drawDot(dot: Dot) {
      ctx.save();
      ctx.globalAlpha = dot.alpha;
      ctx.shadowBlur = 18;
      ctx.shadowColor = hsla(dot.hue, dot.alpha, 70);
      ctx.fillStyle = hsla(dot.hue, dot.alpha, 75);

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, TAU);
      ctx.fill();

      ctx.restore();
    }

    function update(timestamp: number) {
      const delta = Math.min(2, (timestamp - lastTime) / 16.67 || 1);
      lastTime = timestamp;

      drawBackground();

      if (Math.random() < cfg.density) {
        createFirework();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        if (particle.type === "rocket") {
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;

          drawRocket(particle);

          const reached =
            Math.hypot(particle.tx - particle.x, particle.ty - particle.y) < 12;

          if (reached) {
            createBurst(particle.tx, particle.ty, particle.hue, true);

            particles.splice(i, 1);
          }
        }

        if (particle.type === "streak") {
          particle.distance += particle.speed * delta;
          particle.angle += particle.curve * delta;
          particle.alpha -= particle.decay * delta;
          particle.width *= 0.996;

          drawStreak(particle);

          if (particle.alpha <= 0 || particle.distance > particle.maxDistance) {
            particles.splice(i, 1);
          }
        }

        if (particle.type === "dot") {
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;
          particle.vy += 0.015 * delta;
          particle.alpha -= particle.decay * delta;

          drawDot(particle);

          if (particle.alpha <= 0) {
            particles.splice(i, 1);
          }
        }
      }

      animationFrame = requestAnimationFrame(update);
    }

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < cfg.initialBursts; i++) {
      setTimeout(() => createFirework(true), i * 180);
    }

    animationFrame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: config?.zIndex ?? DEFAULT_CONFIG.zIndex,
        mixBlendMode: "screen",
      }}
    />
  );
}
