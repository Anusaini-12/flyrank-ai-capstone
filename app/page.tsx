import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col gap-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            FlyRank AI Capstone
          </p>
          <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Build AI-powered experiences with a clean frontend foundation.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Start with the settings form to configure profile details and AI
            preferences with client-side validation.
          </p>
        </div>

        <Link
          href="/settings"
          className="inline-flex h-11 w-fit items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Open settings
        </Link>
      </main>
    </div>
  );
}