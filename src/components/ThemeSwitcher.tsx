"use client";

import { useEffect, useState } from "react";

const PALETTES = [
  { id: "original", label: "Original", bg: "#f5f0e8", ink: "#3a2e2a" },
  { id: "soft-blush", label: "Soft Blush", bg: "#faf1f0", ink: "#4b4550" },
  { id: "bold-rose", label: "Bold Rose", bg: "#f5d9de", ink: "#3a2f42" },
  { id: "plum-slate", label: "Plum Slate", bg: "#ece7ea", ink: "#2e2b38" },
  { id: "berry-mauve", label: "Berry Mauve", bg: "#f2dfe0", ink: "#46293a" },
  { id: "lilac-fog", label: "Lilac Fog", bg: "#f3ecf5", ink: "#453552" },
] as const;

const THEME_KEY = "atf-theme";
const MODE_KEY = "atf-mode";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>("original");
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.dataset.theme ?? "original");
    setMode(root.dataset.mode === "dark" ? "dark" : "light");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "original") {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = theme;
    }
    root.dataset.mode = mode;
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem(MODE_KEY, mode);
  }, [theme, mode, mounted]);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 rounded-2xl border border-ink/10 bg-cream/95 p-3 shadow-lg backdrop-blur-sm">
      <div className="flex gap-1.5">
        {PALETTES.map((p) => (
          <button
            key={p.id}
            type="button"
            title={p.label}
            aria-label={p.label}
            aria-pressed={theme === p.id}
            onClick={() => setTheme(p.id)}
            className={`h-7 w-7 rounded-full border-2 transition-transform ${
              theme === p.id ? "scale-110 border-blush" : "border-transparent"
            }`}
            style={{
              background: `conic-gradient(${p.ink} 0deg 180deg, ${p.bg} 180deg 360deg)`,
            }}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => setMode((m) => (m === "light" ? "dark" : "light"))}
        className="rounded-full bg-ink px-3 py-1 text-xs uppercase tracking-wide text-cream"
      >
        {mode === "light" ? "Dark mode" : "Light mode"}
      </button>
    </div>
  );
}
