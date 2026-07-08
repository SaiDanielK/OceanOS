"use client";

import Dock from "./Dock";
import Window from "./Window";

import About from "@/apps/About";
import Music from "@/apps/Music";
import Gallery from "@/apps/Gallery";
import Settings from "@/apps/Settings";
import Camera from "@/apps/Camera";
import OceanShell from "@/apps/OceanShell";

import { useDesktopStore } from "@/store/desktopStore";
import { useState } from "react";
import BootScreen from "@/components/BootScreen";

export default function Desktop() {
  const [booting, setBooting] = useState(true);

  const aboutOpen = useDesktopStore((state) => state.aboutOpen);
  const musicOpen = useDesktopStore((state) => state.musicOpen);
  const galleryOpen = useDesktopStore((state) => state.galleryOpen);
  const settingsOpen = useDesktopStore((state) => state.settingsOpen);
  const cameraOpen = useDesktopStore((state) => state.cameraOpen);
  const shellOpen = useDesktopStore((state) => state.shellOpen);
  const theme = useDesktopStore((state) => state.theme);
  const wallpaper = useDesktopStore((state) => state.wallpaper);

  const closeAbout = useDesktopStore((state) => state.closeAbout);
  const closeMusic = useDesktopStore((state) => state.closeMusic);
  const closeGallery = useDesktopStore((state) => state.closeGallery);
  const closeSettings = useDesktopStore((state) => state.closeSettings);
  const closeCamera = useDesktopStore((state) => state.closeCamera);
  const closeShell = useDesktopStore((state) => state.closeShell);

  const aboutMinimized = useDesktopStore((s) => s.aboutMinimized);
  const musicMinimized = useDesktopStore((s) => s.musicMinimized);
  const galleryMinimized = useDesktopStore((s) => s.galleryMinimized);
  const settingsMinimized = useDesktopStore((s) => s.settingsMinimized);
  const cameraMinimized = useDesktopStore((s) => s.cameraMinimized);
  const shellMinimized = useDesktopStore((s) => s.shellMinimized);

  const minimizeAbout = useDesktopStore((s) => s.minimizeAbout);
  const minimizeMusic = useDesktopStore((s) => s.minimizeMusic);
  const minimizeGallery = useDesktopStore((s) => s.minimizeGallery);
  const minimizeSettings = useDesktopStore((s) => s.minimizeSettings);
  const minimizeCamera = useDesktopStore((s) => s.minimizeCamera);
  const minimizeShell = useDesktopStore((s) => s.minimizeShell);

  const aboutZIndex = useDesktopStore((s) => s.aboutZIndex);
  const musicZIndex = useDesktopStore((s) => s.musicZIndex);
  const galleryZIndex = useDesktopStore((s) => s.galleryZIndex);
  const settingsZIndex = useDesktopStore((s) => s.settingsZIndex);
  const cameraZIndex = useDesktopStore((s) => s.cameraZIndex);
  const shellZIndex = useDesktopStore((s) => s.shellZIndex);

  const focusAbout = useDesktopStore((s) => s.focusAbout);
  const focusMusic = useDesktopStore((s) => s.focusMusic);
  const focusGallery = useDesktopStore((s) => s.focusGallery);
  const focusSettings = useDesktopStore((s) => s.focusSettings);
  const focusCamera = useDesktopStore((s) => s.focusCamera);
  const focusShell = useDesktopStore((s) => s.focusShell);

  const wallpaperMap = {
    ocean: "/wallpaper.jpg",
    midnight: "/themes/midnight.jpg",
    sunset: "/themes/sunset.jpg",
  };

  const themeClasses: Record<typeof theme, string> = {
    ocean: "bg-gradient-to-b from-blue-500 to-blue-700",
    midnight: "bg-gradient-to-b from-gray-900 to-gray-800",
    sunset: "bg-gradient-to-b from-orange-500 to-pink-500",
  };

  return (
    <>
      {booting && <BootScreen onFinish={() => setBooting(false)} />}

      <main
        className={`w-screen h-screen bg-cover bg-center relative overflow-hidden ${themeClasses[theme]}`}
        style={{
          backgroundImage: `url('${wallpaperMap[wallpaper]}')`,
        }}
      >

        <Window
          title="About"
          dockId="about-dock"
          isOpen={aboutOpen}
          isMinimized={aboutMinimized}
          onClose={closeAbout}
          onMinimize={minimizeAbout}
          zIndex={aboutZIndex}
          onFocus={focusAbout}
          x={30}
          y={30}
          width={500}
          height={400}
        >
          <About />
        </Window>

        <Window
          title="Music"
          dockId="music-dock"
          isOpen={musicOpen}
          isMinimized={musicMinimized}
          onClose={closeMusic}
          onMinimize={minimizeMusic}
          zIndex={musicZIndex}
          onFocus={focusMusic}
          x={560}
          y={30}
          width={430}
          height={760}
        >
          <Music />
        </Window>

        <Window
          title="Gallery"
          windowId="gallery-window"
          dockId="gallery-dock"
          isOpen={galleryOpen}
          isMinimized={galleryMinimized}
          onClose={closeGallery}
          onMinimize={minimizeGallery}
          zIndex={galleryZIndex}
          onFocus={focusGallery}
          x={30}
          y={450}
          width={500}
          height={500}
        >
          <Gallery />
        </Window>

        <Window
          title="Camera"
          dockId="camera-dock"
          isOpen={cameraOpen}
          isMinimized={cameraMinimized}
          onClose={closeCamera}
          onMinimize={minimizeCamera}
          zIndex={cameraZIndex}
          onFocus={focusCamera}
          x={1380}
          y={30}
          width={300}
          height={450}
        >
          <Camera />
        </Window>

        <Window
          title="Settings"
          dockId="settings-dock"
          isOpen={settingsOpen}
          isMinimized={settingsMinimized}
          onClose={closeSettings}
          onMinimize={minimizeSettings}
          zIndex={settingsZIndex}
          onFocus={focusSettings}
          x={1020}
          y={490}
          width={667}
          height={350}
        >
          <Settings />
        </Window>

        <Window
          title="Ocean Shell"
          dockId="shell-dock"
          isOpen={shellOpen}
          isMinimized={shellMinimized}
          onClose={closeShell}
          onMinimize={minimizeShell}
          zIndex={shellZIndex}
          onFocus={focusShell}
          x={1005}
          y={30}
          width={360}
          height={448}
        >
          <OceanShell />
        </Window>

        <Dock />
      </main>
    </>
  );
}