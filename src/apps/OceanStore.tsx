"use client";

import { useState } from "react";
import { useDesktopStore } from "@/store/desktopStore";

type StoreApp = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  installed: boolean;
};

const initialApps: StoreApp[] = [
  { id: "about", name: "About", description: "View app info and project details.", category: "Productivity", icon: "/icons/about.png", installed: true },
  { id: "music", name: "Music", description: "Play your favorite tracks and playlists.", category: "Media", icon: "/icons/music.png", installed: true },
  { id: "gallery", name: "Gallery", description: "Browse your saved photos and memories.", category: "Media", icon: "/icons/gallery.png", installed: true },
  { id: "settings", name: "Settings", description: "Customize your OceanOS experience.", category: "System", icon: "/icons/settings.png", installed: true },
  { id: "camera", name: "Camera", description: "Capture photos with the built-in camera.", category: "Media", icon: "/icons/camera.png", installed: true },
  { id: "shell", name: "Ocean Shell", description: "Run commands in a sleek terminal app.", category: "Developer", icon: "/icons/shell.png", installed: true },
  { id: "wiki", name: "Web Browser", description: "Open your favorite websites quickly.", category: "Productivity", icon: "/icons/wikipedia.png", installed: true },
  { id: "notes", name: "Notes", description: "Write down ideas and reminders.", category: "Productivity", icon: "/icons/notes.png", installed: true },
  { id: "calculator", name: "Calculator", description: "Handle everyday math with ease.", category: "Utility", icon: "/icons/calculator.png", installed: true },
  { id: "doom", name: "TikTok", description: "Watch short-form videos and discover creators.", category: "Entertainment", icon: "/icons/doom.png", installed: true },
  { id: "files", name: "Files", description: "Organize documents and downloads.", category: "Productivity", icon: "/icons/files.png", installed: true },
  { id: "weather", name: "Weather", description: "Check current conditions and forecasts.", category: "Utility", icon: "/icons/weather.png", installed: false },
  { id: "calendar", name: "Calendar", description: "Plan your day with a simple calendar app.", category: "Productivity", icon: "/icons/calendar.png", installed: false },
];

export default function OceanStore() {
  const installedApps = useDesktopStore((s) => s.installedApps);
  const toggleAppInstall = useDesktopStore((s) => s.toggleAppInstall);
  const [query, setQuery] = useState("");

  const apps = initialApps.map((app) => ({
    ...app,
    installed: installedApps.includes(app.id),
  }));

  const filteredApps = apps.filter((app) => {
    const text = `${app.name} ${app.description} ${app.category}`.toLowerCase();
    return text.includes(query.trim().toLowerCase());
  });

  const handleToggleInstall = (appId: string) => {
    toggleAppInstall(appId);
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-black/70 p-6 text-white scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Ocean Store</h1>
          <p className="mt-2 text-sm text-white/70">
            Browse your installed apps and discover a few extras you can add to OceanOS.
          </p>
        </div>

        <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
          {apps.filter((app) => app.installed).length} installed
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-3 py-3 shadow-inner shadow-black/20">
        <span className="text-lg">🔎</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search apps"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/45"
        />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/30 hover:bg-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-cyan-400/15">
                <img src={app.icon} alt={app.name} className="h-8 w-8 object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold">{app.name}</h2>
                  {app.installed ? (
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-emerald-200">
                      Installed
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-white/70">{app.description}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/45">{app.category}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleToggleInstall(app.id)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                app.installed
                  ? "border border-white/10 bg-white/10 text-white/70"
                  : "bg-cyan-500 text-white hover:bg-cyan-400"
              }`}
            >
              {app.installed ? "Installed" : "Install"}
            </button>
          </div>
        ))}
      </div>

      {filteredApps.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          No apps match that search yet.
        </div>
      ) : null}
    </div>
  );
}
