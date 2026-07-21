"use client";

import { useDesktopStore } from "@/store/desktopStore";
import DockIcon from "./DockIcon";
import { useState } from "react";

export default function Dock() {
  const aboutOpen = useDesktopStore(s => s.aboutOpen);
  const musicOpen = useDesktopStore(s => s.musicOpen);
  const galleryOpen = useDesktopStore(s => s.galleryOpen);
  const settingsOpen = useDesktopStore(s => s.settingsOpen);
  const cameraOpen = useDesktopStore(s => s.cameraOpen);
  const shellOpen = useDesktopStore(s => s.shellOpen);
  const wikiOpen = useDesktopStore(s => s.wikiOpen);
  const notesOpen = useDesktopStore(s => s.notesOpen);
  const calculatorOpen = useDesktopStore(s => s.calculatorOpen);
  const doomOpen = useDesktopStore(s => s.doomOpen);
  const storeOpen = useDesktopStore(s => s.storeOpen);
  const calendarOpen = useDesktopStore(s => s.calendarOpen);

  const aboutMinimized = useDesktopStore(s => s.aboutMinimized);
  const musicMinimized = useDesktopStore(s => s.musicMinimized);
  const galleryMinimized = useDesktopStore(s => s.galleryMinimized);
  const settingsMinimized = useDesktopStore(s => s.settingsMinimized);
  const cameraMinimized = useDesktopStore(s => s.cameraMinimized);
  const shellMinimized = useDesktopStore(s => s.shellMinimized);
  const wikiMinimized = useDesktopStore(s => s.wikiMinimized);
  const notesMinimized = useDesktopStore(s => s.notesMinimized);
  const calculatorMinimized = useDesktopStore(s => s.calculatorMinimized);
  const doomMinimized = useDesktopStore(s => s.doomMinimized);
  const storeMinimized = useDesktopStore(s => s.storeMinimized);
  const calendarMinimized = useDesktopStore(s => s.calendarMinimized);

  const openAbout = useDesktopStore(s => s.openAbout);
  const openMusic = useDesktopStore(s => s.openMusic);
  const openGallery = useDesktopStore(s => s.openGallery);
  const openSettings = useDesktopStore(s => s.openSettings);
  const openCamera = useDesktopStore(s => s.openCamera);
  const openShell = useDesktopStore(s => s.openShell);
  const openWiki = useDesktopStore(s => s.openWiki);
  const openNotes = useDesktopStore(s => s.openNotes);
  const openCalculator = useDesktopStore(s => s.openCalculator);
  const openDoom = useDesktopStore(s => s.openDoom);
  const openStore = useDesktopStore(s => s.openStore);
  const openCalendar = useDesktopStore(s => s.openCalendar);
  const restoreAbout = useDesktopStore(s => s.restoreAbout);
  const restoreMusic = useDesktopStore(s => s.restoreMusic);
  const restoreGallery = useDesktopStore(s => s.restoreGallery);
  const restoreSettings = useDesktopStore(s => s.restoreSettings);
  const restoreCamera = useDesktopStore(s => s.restoreCamera);
  const restoreShell = useDesktopStore(s => s.restoreShell);
  const restoreWiki = useDesktopStore(s => s.restoreWiki);
  const restoreNotes = useDesktopStore(s => s.restoreNotes);
  const restoreCalculator = useDesktopStore(s => s.restoreCalculator);
  const restoreDoom = useDesktopStore(s => s.restoreDoom);
  const restoreStore = useDesktopStore(s => s.restoreStore);
  const restoreCalendar = useDesktopStore(s => s.restoreCalendar);

  const soundEffects = useDesktopStore((s) => s.soundEffects);

  const playClick = () => {
    if (!soundEffects) return;
    new Audio("/startup.mp3").play().catch(() => {});
  };  

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getSize = (index: number) => {
    if (hoveredIndex === null) return 48;

    const distance =
      Math.abs(index - hoveredIndex);

    if (distance === 0) return 90;
    if (distance === 1) return 72;
    if (distance === 2) return 58;

    return 48;
  };

  const dockItems = [
    {
      id: "about",
      dockId: "about-dock",
      icon: "/icons/about.png",
      isOpen: aboutOpen,
      onClick: () => aboutMinimized ? restoreAbout() : openAbout(),
    },
    {
      id: "music",
      dockId: "music-dock",
      icon: "/icons/music.png",
      isOpen: musicOpen,
      onClick: () => musicMinimized ? restoreMusic() : openMusic(),
    },
    {
      id: "gallery",
      dockId: "gallery-dock",
      icon: "/icons/gallery.png",
      isOpen: galleryOpen,
      onClick: () => galleryMinimized ? restoreGallery() : openGallery(),
    },
    {
      id: "settings",
      dockId: "settings-dock",
      icon: "/icons/settings.png",
      isOpen: settingsOpen,
      onClick: () => settingsMinimized ? restoreSettings() : openSettings(),
    },
    {
      id: "camera",
      dockId: "camera-dock",
      icon: "/icons/camera.png",
      isOpen: cameraOpen,
      onClick: () =>
        cameraMinimized ? restoreCamera() : openCamera(),
    },
    {
      id: "shell",
      dockId: "shell-dock",
      icon: "/icons/shell.png",
      isOpen: shellOpen,
      onClick: () => shellMinimized ? restoreShell() : openShell(),
    },
    {
      id: "wiki",
      dockId: "wiki-dock",
      icon: "/icons/wikipedia.png",
      isOpen: wikiOpen,
      onClick: () => wikiMinimized ? restoreWiki() : openWiki(),
    },
    {
      id: "notes",
      dockId: "notes-dock",
      icon: "/icons/notes.png",
      isOpen: notesOpen,
      onClick: () => notesMinimized ? restoreNotes() : openNotes(),
    },
    {
      id: "calculator",
      dockId: "calculator-dock",
      icon: "/icons/calculator.png",
      isOpen: calculatorOpen,
      onClick: () => calculatorMinimized ? restoreCalculator() : openCalculator(),
    },    
    {
      id: "doom",
      dockId: "doom-dock",
      icon: "/icons/doom.png",
      isOpen: doomOpen,
      onClick: () => doomOpen ? (doomMinimized ? restoreDoom() : openDoom()) : openDoom(),
    },
    {
      id: "store",
      dockId: "store-dock",
      icon: "/icons/store.png",
      isOpen: storeOpen,
      onClick: () => storeOpen ? (storeMinimized ? restoreStore() : openStore()) : openStore(),
    },
    {
      id: "calendar",
      dockId: "calendar-dock",
      icon: "/icons/calendar.png",
      isOpen: calendarOpen,
      onClick: () => calendarOpen ? (calendarMinimized ? restoreCalendar() : openCalendar()) : openCalendar(),
    }
  ];
  
  return (
    <div
      className="
        fixed
        bottom-5
        left-1/2
        -translate-x-1/2
        z-50

        flex
        items-end
        gap-4

        px-6
        py-3

        rounded-3xl

        bg-white/10
        backdrop-blur-2xl
        border
        border-white/20

        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
      "
    >
      {dockItems.map((item, index) => (
        <DockIcon
          key={item.id}
          dockId={item.dockId}
          icon={item.icon}
          isOpen={item.isOpen}
          onClick={item.onClick}
          size={getSize(index)}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );  
}