"use client";

import { useDesktopStore } from "@/store/desktopStore";
import DockIcon from "./DockIcon";
import { useState } from "react";

export default function Dock() {
  const apps = useDesktopStore(s => s.apps);
  const installedApps = useDesktopStore(s => s.installedApps);
  const { openApp, restoreApp } = useDesktopStore();
  const soundEffects = useDesktopStore((s) => s.soundEffects);

  const playClick = () => {
    if (!soundEffects) return;
    new Audio("/startup.mp3").play().catch(() => {});
  };  

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

const getSize = (index: number) => {
  if (hoveredIndex === null) return 56;

  const distance = Math.abs(index - hoveredIndex);

  if (distance === 0) return 88;
  if (distance === 1) return 78;
  if (distance === 2) return 68;
  if (distance === 3) return 62;

  return 56;
};

const appIcons: Record<string, string> = {
  about: "/icons/about.png",
  music: "/icons/music.png",
  gallery: "/icons/gallery.png",
  settings: "/icons/settings.png",
  camera: "/icons/camera.png",
  shell: "/icons/shell.png",
  wiki: "/icons/wikipedia.png",
  notes: "/icons/notes.png",
  calculator: "/icons/calculator.png",
  doom: "/icons/doom.png",
  store: "/icons/store.png",
  calendar: "/icons/calendar.png",
  weather: "/icons/weather.png",
  files: "/icons/files.png",
};
  
const visibleDockItems = apps
  .filter(app => installedApps.includes(app.id))
  .map(app => ({
    ...app,
    dockId: `${app.id}-dock`,
    icon: appIcons[app.id],
    onClick: () => (app.isMinimized ? restoreApp(app.id) : openApp(app.id)),
  }));

  return (
    <div id="dock"
      className="
        fixed
        bottom-5
        left-1/2
        -translate-x-1/2
        z-50

        flex
        items-end
        gap-3

        px-4
        py-3

        rounded-[1.75rem]

        bg-white/10
        backdrop-blur-2xl
        border
        border-white/20

        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
      "
    >
      {visibleDockItems.map((item, index) => (
        <DockIcon
          key={item.id}
          dockId={item.dockId}
          icon={item.icon!}
          isOpen={item.isOpen!}
          onClick={item.onClick}
          size={getSize(index)}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );  
}