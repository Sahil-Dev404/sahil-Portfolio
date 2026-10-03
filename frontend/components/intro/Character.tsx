"use client";

import { useEffect, useRef, useState } from "react";
import animationData from "@/public/lottie/huyml_pusher.json";
import styles from "./Character.module.css";

interface CharacterProps {
  isPushing?: boolean;
}

export default function Character({ isPushing = true }: CharacterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<any>(null);
  const [isLottieReady, setIsLottieReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Dynamically import lottie-web for robust client-side rendering
    import("lottie-web").then((lottieModule) => {
      if (!isMounted || !containerRef.current) return;

      const lottie = lottieModule.default || lottieModule;

      try {
        const anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
            progressiveLoad: true,
          },
        });

        animRef.current = anim;

        const onDOMLoaded = () => {
          if (!isMounted) return;
          setIsLottieReady(true);
          // Loop the active walk cycle (frames 30 to 146)
          anim.playSegments([30, 146], true);
          anim.setSpeed(1.2);
        };

        anim.addEventListener("DOMLoaded", onDOMLoaded);
      } catch (err) {
        console.error("Failed to load pusher lottie animation:", err);
      }
    });

    return () => {
      isMounted = false;
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, []);

  // Sync play/pause with pushing state
  useEffect(() => {
    if (!animRef.current) return;
    if (isPushing) {
      animRef.current.play();
    } else {
      animRef.current.pause();
    }
  }, [isPushing]);

  return (
    <div className={styles.charWrapper}>
      {/* Ground shadow beneath feet */}
      <div className={styles.groundShadow} aria-hidden="true" />

      {/* High-fidelity fallback image shown instantly while Lottie initializes */}
      <img
        src="/images/pusher.png"
        alt="Sahil pushing the portfolio wall"
        className={`${styles.fallbackImg} ${isLottieReady ? styles.hidden : ""}`}
        draggable={false}
      />

      {/* Official Vector Lottie container with animated walking legs */}
      <div
        ref={containerRef}
        className={`${styles.lottieBox} ${isLottieReady ? styles.visible : ""}`}
      />
    </div>
  );
}
