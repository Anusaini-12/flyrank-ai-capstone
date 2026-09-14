"use client";

import { Suspense, useEffect, useState } from "react";
import SceneLoader from "./SceneLoader";

export default function Page() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();

    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {reducedMotion ? (
          <div className="h-[460px] w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900">
            <img
              src="/models/headphones.png"
              alt="Headphones"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="h-[460px] w-full overflow-hidden rounded-xl border border-white/10 bg-slate-800/70">
                <div className="h-full w-full animate-pulse bg-slate-700/80" />
              </div>
            }
          >
            <SceneLoader />
          </Suspense>
        )}
      </div>
    </main>
  );
}
