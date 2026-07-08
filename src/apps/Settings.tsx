"use client";

import { useDesktopStore } from "@/store/desktopStore";

const themes = ["ocean", "midnight", "sunset"] as const;
type WallpaperOption = "ocean" | "midnight" | "sunset";

const wallpapers: Array<{ id: WallpaperOption; label: string; image: string }> = [
  { id: "ocean", label: "Ocean", image: "/wallpaper.jpg" },
  { id: "midnight", label: "Midnight", image: "/themes/midnight.jpg" },
  { id: "sunset", label: "Sunset", image: "/themes/sunset.jpg" },
];

export default function Settings() {
  const theme = useDesktopStore((s) => s.theme);
  const wallpaper = useDesktopStore((s) => s.wallpaper);
  const soundEffects = useDesktopStore((s) => s.soundEffects);
  const reducedMotion = useDesktopStore((s) => s.reducedMotion);

  const setTheme = useDesktopStore((s) => s.setTheme);
  const setWallpaper = useDesktopStore((s) => s.setWallpaper);
  const toggleSoundEffects = useDesktopStore((s) => s.toggleSoundEffects);
  const toggleReducedMotion = useDesktopStore((s) => s.toggleReducedMotion);

  return (
    <div className="h-full w-full bg-black/70 p-6 text-white overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      <div>
        <h1 className="text-2xl font-semibold">Personalize Ocean OS</h1>
        <p className="mt-2 text-sm text-white/60">
          Choose a color mood for your desktop shell.
        </p>
      </div>

      <section className="mt-6">
        <h2 className="text-xs uppercase tracking-[0.36em] text-white/40">Theme</h2>
        <div className="mt-3 flex gap-3">
          {themes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTheme(item)}
              className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                theme === item
                  ? "bg-white text-slate-950"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xs uppercase tracking-[0.36em] text-white/40">Wallpaper</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {wallpapers.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setWallpaper(item.id as WallpaperOption)}
              className={`group rounded-3xl overflow-hidden border p-2 text-left transition ${
                wallpaper === item.id
                  ? "border-white bg-white/10"
                  : "border-white/10 bg-white/5 hover:border-white/40"
              }`}
            >
              <div
                className="h-20 rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="mt-3 text-sm font-medium">{item.label}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xs uppercase tracking-[0.36em] text-white/40">System</h2>
        <div className="mt-3 space-y-3">
          <label className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3">
            <span>Sound effects</span>
            <input
              type="checkbox"
              checked={soundEffects}
              onChange={toggleSoundEffects}
              className="h-5 w-5 rounded border-white/20 bg-slate-950"
            />
          </label>

          <label className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3">
            <span>Reduced motion</span>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={toggleReducedMotion}
              className="h-5 w-5 rounded border-white/20 bg-slate-950"
            />
          </label>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm text-white/60">About this build</div>
        <div className="mt-3 rounded-2xl bg-white/10 p-4">
          <div className="text-xs uppercase tracking-[0.36em] text-white/40">Version</div>
          <div className="mt-2 text-lg font-semibold">1.0.0</div>
        </div>
      </section>
    </div>
  );
}