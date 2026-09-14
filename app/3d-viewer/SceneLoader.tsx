"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="h-[460px] w-full overflow-hidden rounded-xl border border-white/10 bg-slate-800/70">
      <div className="h-full w-full animate-pulse bg-slate-700/80" />
    </div>
  ),
});

export default function SceneLoader() {
  return <Scene />;
}
