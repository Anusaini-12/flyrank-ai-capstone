import Link from "next/link";
import { SettingsForm } from "../../components/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="min-h-full bg-zinc-50 px-6 py-12 font-sans dark:bg-black">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-fit text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Back to home
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Settings
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Manage your profile and AI preferences. Fields are validated on blur
              and before saving.
            </p>
          </div>
        </div>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
          <SettingsForm />
        </section>
      </main>
    </div>
  );
}
