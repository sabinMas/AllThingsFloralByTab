"use client";

import { useEffect, useState } from "react";

const PALETTES = [
  { id: "original", label: "Original", swatch: "#3a2e2a" },
  { id: "mauve-blush", label: "Mauve Blush", swatch: "#382f38" },
  { id: "dusty-orchid", label: "Dusty Orchid", swatch: "#3d3140" },
  { id: "rosewater-slate", label: "Rosewater Slate", swatch: "#362f3a" },
  { id: "lavender-blush", label: "Lavender Blush", swatch: "#332d3d" },
  { id: "antique-rose", label: "Antique Rose", swatch: "#3b2f37" },
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
            className={`h-6 w-6 rounded-full border-2 transition-transform ${
              theme === p.id ? "scale-110 border-blush" : "border-transparent"
            }`}
            style={{ backgroundColor: p.swatch }}
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
