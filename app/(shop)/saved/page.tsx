export default function SavedPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-10 lg:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
        Library
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-zinc-950">Saved</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600">
        Saved recommendations will appear here as you build your shortlist.
      </p>
    </main>
  );
}
