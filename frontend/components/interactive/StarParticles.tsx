"use client";

import { useEffect, useState } from "react";

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  shape: "circle" | "star" | "rect";
}

interface StarParticlesProps {
  triggerKey: number;
  originX?: number;
  originY?: number;
  onComplete?: () => void;
}

export function spawnStarParticles(count: number = 28): Particle[] {
  const colors = [
    "#FF4A3D", // Accent red
    "#FBBF24", // Warm amber
    "#60A5FA", // Sky blue
    "#34D399", // Emerald green
    "#F472B6", // Pink
    "#A78BFA", // Lavender
    "#FACC15", // Star yellow
  ];
  const particles: Particle[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.45;
    const speed = 4 + Math.random() * 6.5;
    const shapeType: "circle" | "star" | "rect" =
      i % 3 === 0 ? "star" : i % 2 === 0 ? "circle" : "rect";

    particles.push({
      id: now + i,
      x: 0,
      y: 0,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: shapeType === "star" ? 10 + Math.random() * 6 : 4 + Math.random() * 5,
      rotation: Math.random() * 360,
      shape: shapeType,
    });
  }

  return particles;
}

export default function StarParticles({
  triggerKey,
  onComplete,
}: StarParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (triggerKey === 0) return;

    setParticles(spawnStarParticles(26));
    const startTime = performance.now();
    let animId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      if (elapsed > 1100) {
        setParticles([]);
        if (onComplete) onComplete();
        return;
      }

      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.35, // gravity
          rotation: p.rotation + 9,
        }))
      );

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [triggerKey]); // eslint-disable-line react-hooks/exhaustive-deps

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`,
            transition: "opacity 0.2s linear",
          }}
        >
          {p.shape === "star" ? (
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full"
              style={{
                fill: p.color,
                filter: `drop-shadow(0 0 4px ${p.color})`,
              }}
            >
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
            </svg>
          ) : (
            <div
              className={`w-full h-full ${p.shape === "circle" ? "rounded-full" : "rounded-xs"}`}
              style={{
                backgroundColor: p.color,
                boxShadow: `0 0 6px ${p.color}`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
