type HealthData = {
  status: string;
  timestamp: string;
};

export default function HealthPage() {
  const health: HealthData = {
    status: "ok",
    timestamp: new Date().toISOString(),
  };

  return (
    <main className="flex flex-1 flex-col px-6 py-10 lg:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
        System status
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-zinc-950">Health</h1>
      <div className="mt-8 max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-semibold text-zinc-950">FlyRank AI</h2>
          <span className="rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-900">
            {health.status}
          </span>
        </div>
        <p className="mt-4 text-sm text-zinc-600">
          Last checked: {health.timestamp}
        </p>
      </div>
    </main>
  );
}
