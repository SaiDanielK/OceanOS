"use client";

import { useDesktopStore } from "@/store/desktopStore";
import Image from "next/image";
import { useMemo } from "react";

const themes = ["ocean", "midnight", "sunset"] as const;
type WallpaperOption = "ocean" | "midnight" | "sunset";

type ThemeLabel = (typeof themes)[number];

const wallpapers: Array<{ id: WallpaperOption; label: string; image: string }> = [
  { id: "ocean", label: "Ocean", image: "/wallpaper.jpg" },
  { id: "midnight", label: "Midnight", image: "/midnight.jpg" },
  { id: "sunset", label: "Sunset", image: "/sunset.jpg" },
];

const themeMeta: Record<ThemeLabel, { name: string; accent: string; gradient: string }> = {
  ocean: { name: "Ocean", accent: "bg-cyan-500", gradient: "from-cyan-500 via-sky-500 to-blue-600" },
  midnight: { name: "Midnight", accent: "bg-slate-700", gradient: "from-slate-800 via-slate-700 to-slate-900" },
  sunset: { name: "Sunset", accent: "bg-orange-500", gradient: "from-orange-500 via-amber-500 to-rose-500" },
};

export default function Settings() {
  const theme = useDesktopStore((s) => s.theme);
  const wallpaper = useDesktopStore((s) => s.wallpaper);
  const soundEffects = useDesktopStore((s) => s.soundEffects);
  const reducedMotion = useDesktopStore((s) => s.reducedMotion);
  const installedApps = useDesktopStore((s) => s.installedApps);

  const setTheme = useDesktopStore((s) => s.setTheme);
  const setWallpaper = useDesktopStore((s) => s.setWallpaper);
  const toggleSoundEffects = useDesktopStore((s) => s.toggleSoundEffects);
  const toggleReducedMotion = useDesktopStore((s) => s.toggleReducedMotion);

  const appSummary = useMemo(() => {
    const installedCount = installedApps.length;
    const pinnedCount = installedApps.filter((id) => ["settings", "files", "store", "weather"].includes(id)).length;
    return { installedCount, pinnedCount };
  }, [installedApps]);

  return (
    <div className="h-full w-full overflow-y-auto bg-slate-950/90 p-6 text-white scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/70">Personalization</p>
          <h1 className="mt-1 text-3xl font-semibold">Settings</h1>
          <p className="mt-2 max-w-xl text-sm text-white/60">
            Tune the desktop theme, wallpaper, sound behavior, and launcher experience in real time.
          </p>
        </div>
        <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${themeMeta[theme].gradient} p-[1px]`}>
          <div className="rounded-[15px] bg-slate-950/90 px-3 py-2 text-right">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">Active theme</div>
            <div className="text-sm font-semibold text-white">{themeMeta[theme].name}</div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <section className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Appearance</h2>
            <span className="text-sm text-white/50">Theme and wallpaper</span>
          </div>

          <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-2 text-sm font-medium text-white/80">Theme</div>
              <div id="theme-selector" className="grid gap-2 sm:grid-cols-3">
                {themes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTheme(item)}
                    className={`rounded-2xl border p-3 text-left transition ${
                      theme === item
                        ? "border-cyan-400/60 bg-white/15"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className={`mb-2 h-8 w-8 rounded-full ${themeMeta[item].accent}`} />
                    <div className="text-sm font-medium capitalize">{themeMeta[item].name}</div>
                    <div className="mt-1 text-xs text-white/50">{item === "ocean" ? "Bright and airy" : item === "midnight" ? "Deep and focused" : "Warm and vivid"}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-medium text-white/80">Wallpaper</div>
              <div id="wallpaper-selector" className="grid gap-2">
                {wallpapers.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setWallpaper(item.id)}
                    className={`group overflow-hidden rounded-2xl border text-left transition ${
                      wallpaper === item.id
                        ? "border-cyan-400/60 bg-white/10"
                        : "border-white/10 bg-black/20 hover:bg-white/10"
                    }`}
                  >
                    <div className="relative h-20 w-full">
                      <Image src={item.image} alt={item.label} fill className="object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 text-sm">
                      <span>{item.label}</span>
                      <span className="text-[11px] uppercase tracking-[0.22em] text-white/50">{wallpaper === item.id ? "Active" : "Set"}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">System behavior</h2>
            <span className="text-sm text-white/50">Accessibility and feedback</span>
          </div>
          <div id="system-toggles" className="space-y-2">
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 py-3 transition hover:bg-white/10">
              <div>
                <div className="font-medium">Sound effects</div>
                <div className="text-sm text-white/55">Play subtle feedback when launching apps or changing controls.</div>
              </div>
              <div className="relative">
                <input type="checkbox" checked={soundEffects} onChange={toggleSoundEffects} className="peer sr-only" />
                <div className="h-6 w-11 rounded-full bg-white/20 transition peer-checked:bg-cyan-500" />
                <div className="absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
              </div>
            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 py-3 transition hover:bg-white/10">
              <div>
                <div className="font-medium">Reduced motion</div>
                <div className="text-sm text-white/55">Disable launcher animations for a calmer experience.</div>
              </div>
              <div className="relative">
                <input type="checkbox" checked={reducedMotion} onChange={toggleReducedMotion} className="peer sr-only" />
                <div className="h-6 w-11 rounded-full bg-white/20 transition peer-checked:bg-cyan-500" />
                <div className="absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
              </div>
            </label>
          </div>
        </section>

        <section className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Desktop overview</h2>
            <span className="text-sm text-white/50">Live status</span>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">Installed apps</div>
              <div className="mt-2 text-2xl font-semibold">{appSummary.installedCount}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">Pinned shortcuts</div>
              <div className="mt-2 text-2xl font-semibold">{appSummary.pinnedCount}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">Current theme</div>
              <div className="mt-2 text-2xl font-semibold capitalize">{theme}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}