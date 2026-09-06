export default function SavedPage() {
  return (
    <main className="flex flex-1 flex-col px-5 py-12 lg:px-10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        Library
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground">Saved</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
        Saved recommendations will appear here as you build your shortlist.
      </p>
    </main>
  );
}
