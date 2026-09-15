"use client";

import { useEffect, useState } from "react";
import ShaderPlane from "./ShaderPlane";

export default function ShaderHeroPage() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background:
            "linear-gradient(135deg, #dfeee0 0%, #b5d3c0 28%, #78a7a0 58%, #214d4e 100%)",
        }}
      />
    );
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <ShaderPlane />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.9rem",
            textAlign: "center",
            padding: "1.5rem 2rem",
            borderRadius: "1rem",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.62), rgba(0,0,0,0.08) 45%, rgba(0,0,0,0.18))",
              filter: "blur(0.5px)",
              borderRadius: "1rem",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2.2rem, 6vw, 5rem)",
                lineHeight: 1,
                letterSpacing: "-0.06em",
                fontWeight: 800,
                color: "#f4f7f3",
                textShadow: "0 4px 18px rgba(0,0,0,0.35)",
              }}
            >
              FlyRank AI
            </h1>
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(0.9rem, 1.7vw, 1.2rem)",
                color: "rgba(244, 247, 243, 0.9)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textShadow: "0 2px 10px rgba(0,0,0,0.28)",
              }}
            >
              Search smarter. Rank faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
