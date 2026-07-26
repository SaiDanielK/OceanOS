"use client";

import { useDesktopStore } from "@/store/desktopStore";
import Image from "next/image";

const themes = ["ocean", "midnight", "sunset"] as const;
type WallpaperOption = "ocean" | "midnight" | "sunset";

const wallpapers: Array<{ id: WallpaperOption; label: string; image: string }> = [
  { id: "ocean", label: "Ocean", image: "/wallpaper.jpg" },
  { id: "midnight", label: "Midnight", image: "/themes/midnight.jpg" },
  { id: "sunset", label: "Sunset", image: "/themes/sunset.jpg" },
];

const themeColors: Record<typeof themes[number], string> = {
	ocean: "bg-cyan-500",
	midnight: "bg-slate-700",
	sunset: "bg-orange-500",
};

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
    <div className="h-full w-full bg-black/70 p-8 text-white overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-white/60">
          Personalize your OceanOS experience.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="text-xl">🎨</span> Theme
          </h2>
          <div id="theme-selector" className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm flex gap-4">
            {themes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTheme(item)}
                className={`flex-1 rounded-xl p-3 text-center transition ${
                  theme === item
                    ? "bg-white/20 border border-white/30"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${themeColors[item]}`} />
                <span className="text-sm font-medium capitalize">{item}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="text-xl">🖼️</span> Wallpaper
          </h2>
          <div id="wallpaper-selector" className="grid grid-cols-3 gap-4">
            {wallpapers.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setWallpaper(item.id as WallpaperOption)}
                className={`group rounded-2xl overflow-hidden border-2 text-left transition ${
                  wallpaper === item.id
                    ? "border-cyan-400"
                    : "border-transparent hover:border-white/40"
                }`}
              >
                <div className="relative h-24 w-full">
                  <Image src={item.image} alt={item.label} layout="fill" objectFit="cover" className="transition-transform group-hover:scale-105" />
                </div>
                <div className="p-2 bg-black/30">
                  <div className="text-sm font-medium">{item.label}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="text-xl">⚙️</span> System
          </h2>
          <div id="system-toggles" className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm space-y-1">
            <label className="flex items-center justify-between rounded-xl p-3 cursor-pointer hover:bg-white/10 transition">
              <span className="font-medium">Sound Effects</span>
              <div className="relative">
                <input type="checkbox" checked={soundEffects} onChange={toggleSoundEffects} className="sr-only peer" />
                <div className="w-11 h-6 bg-white/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </div>
            </label>
            <div className="h-px bg-white/10" />
            <label className="flex items-center justify-between rounded-xl p-3 cursor-pointer hover:bg-white/10 transition">
              <span className="font-medium">Reduced Motion</span>
              <div className="relative">
                <input type="checkbox" checked={reducedMotion} onChange={toggleReducedMotion} className="sr-only peer" />
                <div className="w-11 h-6 bg-white/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </div>
            </label>
          </div>
        </section>
      </div>

    </div>
  );
}