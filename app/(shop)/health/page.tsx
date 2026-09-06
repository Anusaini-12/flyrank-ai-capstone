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
    <main className="flex flex-1 flex-col px-5 py-12 lg:px-10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        System status
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground">Health</h1>
      <div className="mt-8 max-w-xl rounded-3xl border border-border bg-card p-7 shadow-2xl shadow-foreground/10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-foreground">FlyRank AI</h2>
          <span className="rounded-full border border-primary/25 bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
            {health.status}
          </span>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          Last checked: {health.timestamp}
        </p>
      </div>
    </main>
  );
}
