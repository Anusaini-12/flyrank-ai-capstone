"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

const THEME_STORAGE_KEY = "flyrank-theme";

type Theme = "light" | "dark";

const themeListeners = new Set<() => void>();

function getTheme(): Theme {
  return typeof window !== "undefined" && window.localStorage.getItem(THEME_STORAGE_KEY) === "dark"
    ? "dark"
    : "light";
}

function subscribeToTheme(listener: () => void) {
  themeListeners.add(listener);

  return () => themeListeners.delete(listener);
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, () => "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    themeListeners.forEach((listener) => listener());
  }

  const isDark = theme === "dark";
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={toggleTheme}
      className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:border-primary hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon className="size-5" />
    </button>
  );
}
