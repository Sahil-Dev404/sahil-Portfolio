"use client";

import { useEffect, useRef } from "react";

export type ShapeType = "torus" | "wave" | "sphere" | "icosahedron" | "knot";

interface WireframeCanvasProps {
  shape: ShapeType;
  className?: string;
  size?: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function WireframeCanvas({
  shape,
  className = "",
  size = 135,
}: WireframeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotRef = useRef({
    x: shape === "wave" ? 0.85 : 0.45,
    y: shape === "wave" ? -0.45 : 0.65,
    z: 0.1,
    vx: 0.0022,
    vy: 0.0035,
  });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    // Helper: 3D rotation
    const rotate3D = (p: Point3D, rx: number, ry: number, rz: number): Point3D => {
      // Rotate around X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y1 = p.y * cosX - p.z * sinX;
      const z1 = p.y * sinX + p.z * cosX;

      // Rotate around Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x2 = p.x * cosY + z1 * sinY;
      const z2 = -p.x * sinY + z1 * cosY;

      // Rotate around Z
      const cosZ = Math.cos(rz);
      const sinZ = Math.sin(rz);
      const x3 = x2 * cosZ - y1 * sinZ;
      const y3 = x2 * sinZ + y1 * cosZ;

      return { x: x3, y: y3, z: z2 };
    };

    // Helper: Project 3D to 2D
    const project = (p: Point3D, fov: number = 320, cx: number, cy: number) => {
      const distance = 300;
      const z = p.z + distance;
      const scale = z > 10 ? fov / z : 1;
      return {
        x: cx + p.x * scale,
        y: cy + p.y * scale,
        z: p.z,
      };
    };

    const render = () => {
      t += 0.007;

      // Auto rotation when not dragging
      if (!isDraggingRef.current) {
        rotRef.current.x += rotRef.current.vx;
        rotRef.current.y += rotRef.current.vy;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const cx = size / 2;
      const cy = size / 2;
      const rx = rotRef.current.x;
      const ry = rotRef.current.y;
      const rz = rotRef.current.z;

      const geomScale = size / 200;

      ctx.strokeStyle = "#18181B";
      ctx.lineWidth = Math.max(0.9, 1.15 * geomScale);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (shape === "torus") {
        // Torus wireframe matching Image 1
        const R = 54 * geomScale; // major radius
        const r = 24 * geomScale; // minor radius
        const uSteps = 22; // longitudinal rings
        const vSteps = 14; // poloidal circles

        // Longitudinal rings
        for (let i = 0; i < uSteps; i++) {
          const u = (i / uSteps) * Math.PI * 2;
          ctx.beginPath();
          let first = true;
          for (let j = 0; j <= vSteps; j++) {
            const v = (j / vSteps) * Math.PI * 2;
            const p: Point3D = {
              x: (R + r * Math.cos(v)) * Math.cos(u),
              y: (R + r * Math.cos(v)) * Math.sin(u),
              z: r * Math.sin(v),
            };
            const rotP = rotate3D(p, rx, ry, rz);
            const proj = project(rotP, 300, cx, cy);
            if (first) {
              ctx.moveTo(proj.x, proj.y);
              first = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          }
          ctx.stroke();
        }

        // Cross rings
        for (let j = 0; j < vSteps; j++) {
          const v = (j / vSteps) * Math.PI * 2;
          ctx.beginPath();
          let first = true;
          for (let i = 0; i <= uSteps; i++) {
            const u = (i / uSteps) * Math.PI * 2;
            const p: Point3D = {
              x: (R + r * Math.cos(v)) * Math.cos(u),
              y: (R + r * Math.cos(v)) * Math.sin(u),
              z: r * Math.sin(v),
            };
            const rotP = rotate3D(p, rx, ry, rz);
            const proj = project(rotP, 300, cx, cy);
            if (first) {
              ctx.moveTo(proj.x, proj.y);
              first = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          }
          ctx.stroke();
        }
      } else if (shape === "wave") {
        // Undulating wave grid matching Image 3
        const gridN = 16;
        const gridWidth = 110 * geomScale;
        const step = gridWidth / gridN;
        const half = gridWidth / 2;

        // Rows
        for (let i = 0; i <= gridN; i++) {
          const gx = i * step - half;
          ctx.beginPath();
          let first = true;
          for (let j = 0; j <= gridN; j++) {
            const gy = j * step - half;
            // Ripple wave function
            const dist = Math.sqrt(gx * gx + gy * gy) * (0.08 / geomScale);
            const gz =
              (Math.sin(dist - t * 1.5) * 16 +
              Math.cos((gx * 0.05 / geomScale) + t) * 7) * geomScale;

            const rotP = rotate3D({ x: gx, y: gy, z: gz }, rx, ry, rz);
            const proj = project(rotP, 310, cx, cy);
            if (first) {
              ctx.moveTo(proj.x, proj.y);
              first = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          }
          ctx.stroke();
        }

        // Columns
        for (let j = 0; j <= gridN; j++) {
          const gy = j * step - half;
          ctx.beginPath();
          let first = true;
          for (let i = 0; i <= gridN; i++) {
            const gx = i * step - half;
            const dist = Math.sqrt(gx * gx + gy * gy) * (0.08 / geomScale);
            const gz =
              (Math.sin(dist - t * 1.5) * 16 +
              Math.cos((gx * 0.05 / geomScale) + t) * 7) * geomScale;

            const rotP = rotate3D({ x: gx, y: gy, z: gz }, rx, ry, rz);
            const proj = project(rotP, 310, cx, cy);
            if (first) {
              ctx.moveTo(proj.x, proj.y);
              first = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          }
          ctx.stroke();
        }
      } else if (shape === "sphere") {
        // Wireframe Sphere / Globe matching Image 4
        const radius = 60 * geomScale;
        const latCount = 9;
        const lonCount = 12;

        // Latitude circles
        for (let i = 1; i < latCount; i++) {
          const theta = (i / latCount) * Math.PI; // 0 to PI
          const rRing = radius * Math.sin(theta);
          const zRing = radius * Math.cos(theta);

          ctx.beginPath();
          let first = true;
          const segments = 32;
          for (let j = 0; j <= segments; j++) {
            const phi = (j / segments) * Math.PI * 2;
            const p: Point3D = {
              x: rRing * Math.cos(phi),
              y: rRing * Math.sin(phi),
              z: zRing,
            };
            const rotP = rotate3D(p, rx, ry, rz);
            const proj = project(rotP, 300, cx, cy);
            if (first) {
              ctx.moveTo(proj.x, proj.y);
              first = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          }
          ctx.stroke();
        }

        // Longitude circles
        for (let i = 0; i < lonCount; i++) {
          const phi = (i / lonCount) * Math.PI;
          ctx.beginPath();
          let first = true;
          const segments = 32;
          for (let j = 0; j <= segments; j++) {
            const theta = (j / segments) * Math.PI * 2;
            const p: Point3D = {
              x: radius * Math.sin(theta) * Math.cos(phi),
              y: radius * Math.sin(theta) * Math.sin(phi),
              z: radius * Math.cos(theta),
            };
            const rotP = rotate3D(p, rx, ry, rz);
            const proj = project(rotP, 300, cx, cy);
            if (first) {
              ctx.moveTo(proj.x, proj.y);
              first = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          }
          ctx.stroke();
        }
      } else if (shape === "icosahedron") {
        // Polyhedron / Icosahedron
        const phi = (1 + Math.sqrt(5)) / 2;
        const s = 45 * geomScale;
        const rawVerts: [number, number, number][] = [
          [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
          [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
          [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
        ];
        const verts: Point3D[] = rawVerts.map(([x, y, z]) => ({
          x: x * s,
          y: y * s,
          z: z * s,
        }));

        const edges: [number, number][] = [
          [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
          [1, 5], [1, 7], [1, 8], [1, 9],
          [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
          [3, 4], [3, 6], [3, 8], [3, 9],
          [4, 5], [4, 9], [4, 11],
          [5, 9], [5, 11],
          [6, 7], [6, 8], [6, 10],
          [7, 8], [7, 10],
          [8, 9], [10, 11]
        ];

        edges.forEach(([i, j]) => {
          const p1 = rotate3D(verts[i], rx, ry, rz);
          const p2 = rotate3D(verts[j], rx, ry, rz);
          const pr1 = project(p1, 300, cx, cy);
          const pr2 = project(p2, 300, cx, cy);
          ctx.beginPath();
          ctx.moveTo(pr1.x, pr1.y);
          ctx.lineTo(pr2.x, pr2.y);
          ctx.stroke();
        });
      } else if (shape === "knot") {
        // Torus knot (3, 2)
        const segments = 120;
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= segments; i++) {
          const u = (i / segments) * Math.PI * 2 * 3;
          const rKnot = (42 + 18 * Math.cos(2 * u / 3)) * geomScale;
          const p: Point3D = {
            x: rKnot * Math.cos(u),
            y: rKnot * Math.sin(u),
            z: 28 * Math.sin(2 * u / 3) * geomScale,
          };
          const rotP = rotate3D(p, rx, ry, rz);
          const proj = project(rotP, 300, cx, cy);
          if (first) {
            ctx.moveTo(proj.x, proj.y);
            first = false;
          } else {
            ctx.lineTo(proj.x, proj.y);
          }
        }
        ctx.stroke();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Mouse drag handlers to rotate 3D object
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };

      rotRef.current.y += dx * 0.015;
      rotRef.current.x += dy * 0.015;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMouseRef.current.x;
      const dy = e.touches[0].clientY - lastMouseRef.current.y;
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      rotRef.current.y += dx * 0.015;
      rotRef.current.x += dy * 0.015;
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [shape, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`cursor-grab active:cursor-grabbing select-none touch-none ${className}`}
      title="Click & drag to rotate 3D wireframe"
    />
  );
}
