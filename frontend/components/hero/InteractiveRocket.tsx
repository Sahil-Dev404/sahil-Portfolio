"use client";

import { useState } from "react";

interface InteractiveRocketProps {
  className?: string;
}

export default function InteractiveRocket({ className = "" }: InteractiveRocketProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBoosted, setIsBoosted] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBoosted(true);
    setTimeout(() => setIsBoosted(false), 900);
  };

  const isFiring = isHovered || isBoosted;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`relative select-none cursor-pointer group/rocket transition-transform duration-300 ${className}`}
      style={{
        width: "165px",
        height: "98px", // Matches 333:198 aspect ratio (1.6818:1)
      }}
    >
      <style jsx>{`
        /* Dynamic combustion flame movement:
           Movement takes place strictly behind the nozzle/wing line (59% 0% -> 24% 100%)
           along the +30.25° exhaust vector with authentic plasma flutters & heat waves */
        @keyframes flame-combustion {
          0% {
            opacity: 0.88;
            filter: brightness(1.15) contrast(1.1);
            transform: scale(1, 1) translate(0px, 0px) skewY(0deg);
          }
          20% {
            opacity: 1;
            filter: brightness(1.38) contrast(1.24);
            transform: scale(1.05, 1.03) translate(1.4px, 0.8px) skewY(0.7deg);
          }
          40% {
            opacity: 0.92;
            filter: brightness(1.14) contrast(1.08);
            transform: scale(1.02, 0.99) translate(0.6px, 0.35px) skewY(-0.5deg);
          }
          60% {
            opacity: 1;
            filter: brightness(1.42) contrast(1.26);
            transform: scale(1.07, 1.04) translate(1.8px, 1.05px) skewY(0.9deg);
          }
          80% {
            opacity: 0.94;
            filter: brightness(1.22) contrast(1.15);
            transform: scale(1.03, 1.01) translate(0.9px, 0.5px) skewY(-0.4deg);
          }
          100% {
            opacity: 0.88;
            filter: brightness(1.15) contrast(1.1);
            transform: scale(1, 1) translate(0px, 0px) skewY(0deg);
          }
        }

        /* Gentle idle flame breathing (ALWAYS VISIBLE & ALIVE) */
        @keyframes flame-idle {
          0%, 100% {
            opacity: 0.35;
            filter: brightness(1.05);
            transform: scale(1, 1);
          }
          50% {
            opacity: 0.65;
            filter: brightness(1.2);
            transform: scale(1.025, 1.015) translate(0.6px, 0.35px);
          }
        }

        /* Engine rumble vibration on the rocket hull when firing */
        @keyframes rocket-rumble {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-0.7px, -0.4px); }
          50% { transform: translate(0.5px, 0.3px); }
          75% { transform: translate(-0.6px, -0.3px); }
        }

        .anim-flame-active {
          animation: flame-combustion 0.1s infinite ease-in-out;
          transform-origin: 36.4% 37.2%;
        }

        .anim-flame-idle {
          animation: flame-idle 2s infinite ease-in-out;
          transform-origin: 36.4% 37.2%;
        }

        .anim-rumble {
          animation: rocket-rumble 0.08s infinite linear;
        }
      `}</style>

      {/* Main Rocket Wrapper: surges slightly forward under engine thrust when firing */}
      <div
        className={`relative w-full h-full transition-all duration-300 ${
          isFiring ? "anim-rumble -translate-x-1.5 -translate-y-1 scale-104" : "hover:scale-102"
        }`}
      >
        {/* Layer 1: BASE COMPLETE ROCKET (100% whole, uncut, seamless artwork with pointed aligned flame tail — ALWAYS VISIBLE) */}
        <div className="absolute inset-0 z-10 pointer-events-none drop-shadow-[0_12px_22px_rgba(0,0,0,0.18)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-collage/rocket-v10-full.png?v=13"
            alt="Rocket ship with pointed aligned thruster fire"
            className="w-full h-full object-contain pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Layer 2: DYNAMIC COMBUSTION FLAME OVERLAY
            Movement is strictly confined to the right of the user's specified black line (69% 0% -> 29% 100%)
            Everything to the left (rocket body, wings, nozzle) remains 100% static & clean */}
        <div
          className={`absolute inset-0 z-15 transition-opacity duration-200 pointer-events-none ${
            isFiring ? "opacity-100 anim-flame-active" : "opacity-50 anim-flame-idle"
          }`}
          style={{
            transformOrigin: "36.4% 37.2%",
            mixBlendMode: "screen",
            clipPath: "polygon(69% 0%, 100% 0%, 100% 100%, 29% 100%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-collage/rocket-v10-flame.png?v=13"
            alt="Rocket engine thruster combustion flame with pointed tail"
            className="w-full h-full object-contain pointer-events-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
