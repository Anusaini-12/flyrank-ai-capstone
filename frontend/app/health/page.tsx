type HealthData = {
  service: string;
  status: string;
  source: string;
  checkedAt: string;
};

type HealthResponse = {
  slideshow?: {
    title?: string;
  };
};

async function getHealthData(): Promise<HealthData> {
  const response = await fetch("https://httpbin.org/json", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Health data request failed");
  }

  const payload = (await response.json()) as HealthResponse;

  return {
    service: "FlyRank AI",
    status: "Operational",
    source: payload.slideshow?.title ?? "External health endpoint",
    checkedAt: new Date().toISOString(),
  };
}

export default async function HealthPage() {
  const health = await getHealthData();

  return (
    <main className="flex flex-1 flex-col px-6 py-10 lg:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
        System status
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-zinc-950">Health</h1>
      <div className="mt-8 max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-semibold text-zinc-950">{health.service}</h2>
          <span className="rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-900">
            {health.status}
          </span>
        </div>
        <p className="mt-4 text-sm text-zinc-600">
          Fetched source: {health.source}
        </p>
        <p className="mt-4 text-sm text-zinc-600">
          Last checked: {health.checkedAt}
        </p>
      </div>
    </main>
  );
}
