import { create } from "zustand";

type ThemeOption = "ocean" | "midnight" | "sunset";
type WallpaperOption = "ocean" | "midnight" | "sunset";

type DesktopStore = {
  aboutOpen: boolean;
  musicOpen: boolean;
  galleryOpen: boolean;
  settingsOpen: boolean;
  shellOpen: boolean;
  aboutMinimized: boolean
  musicMinimized: boolean
  galleryMinimized: boolean
  settingsMinimized: boolean  
  shellMinimized: boolean

  highestZIndex: number;
  aboutZIndex: number;
  musicZIndex: number;
  galleryZIndex: number;
  settingsZIndex: number;
  shellZIndex: number;

  focusAbout: () => void;
  focusMusic: () => void;
  focusGallery: () => void;
  focusSettings: () => void;
  focusShell: () => void;
  openAbout: () => void;
  closeAbout: () => void;
  openMusic: () => void;
  closeMusic: () => void;
  openGallery: () => void;
  closeGallery: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  openShell: () => void;
  closeShell: () => void;
  minimizeAbout: () => void
  restoreAbout: () => void
  minimizeMusic: () => void
  restoreMusic: () => void
  minimizeGallery: () => void
  restoreGallery: () => void
  minimizeSettings: () => void
  restoreSettings: () => void
  minimizeShell: () => void
  restoreShell: () => void

  cameraOpen: boolean;
  cameraMinimized: boolean;

  cameraZIndex: number;

  openCamera: () => void;
  closeCamera: () => void;

  minimizeCamera: () => void;
  restoreCamera: () => void;

  focusCamera: () => void;

  theme: ThemeOption;
  wallpaper: WallpaperOption;
  soundEffects: boolean;
  reducedMotion: boolean;

  setTheme: (theme: ThemeOption) => void;
  setWallpaper: (wallpaper: WallpaperOption) => void;
  toggleSoundEffects: () => void;
  toggleReducedMotion: () => void;  
};

export const useDesktopStore = create<DesktopStore>((set) => ({
  aboutOpen: true,
  musicOpen: false,
  galleryOpen: false,
  settingsOpen: false,
  cameraOpen: false,
  shellOpen: false,

  aboutMinimized: false,
  musicMinimized: false,
  galleryMinimized: false,
  settingsMinimized: false,
  cameraMinimized: false,
  shellMinimized: false,

  theme: "ocean",
  wallpaper: "ocean",
  soundEffects: true,
  reducedMotion: false,

  setTheme: (theme) => set({ theme }),
  setWallpaper: (wallpaper) => set({ wallpaper }),
  toggleSoundEffects: () => set((state) => ({ soundEffects: !state.soundEffects })),
  toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),

  openAbout: () => set((state) => ({ aboutOpen: true, aboutMinimized: false, highestZIndex: state.highestZIndex + 1, aboutZIndex: state.highestZIndex + 1 })),
  closeAbout: () => set({ aboutOpen: false }),
  minimizeAbout: () => set({ aboutMinimized: true }),
  restoreAbout: () => set((state) => ({ aboutMinimized: false, highestZIndex: state.highestZIndex + 1, aboutZIndex: state.highestZIndex + 1 })),
  openMusic: () => set((state) => ({ musicOpen: true, musicMinimized: false, highestZIndex: state.highestZIndex + 1, musicZIndex: state.highestZIndex + 1 })),
  closeMusic: () => set({ musicOpen: false }),
  minimizeMusic: () => set({ musicMinimized: true }),
  restoreMusic: () => set((state) => ({ musicMinimized: false, highestZIndex: state.highestZIndex + 1, musicZIndex: state.highestZIndex + 1, })),
  openGallery: () => set((state) => ({ galleryOpen: true, galleryMinimized: false, highestZIndex: state.highestZIndex + 1, galleryZIndex: state.highestZIndex + 1 })),
  closeGallery: () => set({ galleryOpen: false }),
  minimizeGallery: () => set({ galleryMinimized: true }),
  restoreGallery: () => set((state) => ({ galleryMinimized: false, highestZIndex: state.highestZIndex + 1, galleryZIndex: state.highestZIndex + 1, })),
  openSettings: () => set((state) => ({ settingsOpen: true, settingsMinimized: false, highestZIndex: state.highestZIndex + 1, settingsZIndex: state.highestZIndex + 1 })),
  closeSettings: () => set({ settingsOpen: false }),
  minimizeSettings: () => set({ settingsMinimized: true }),
  restoreSettings: () => set((state) => ({ settingsMinimized: false, highestZIndex: state.highestZIndex + 1, settingsZIndex: state.highestZIndex + 1, })),
  openCamera: () => set((state) => ({ cameraOpen: true, cameraMinimized: false, highestZIndex: state.highestZIndex + 1, cameraZIndex: state.highestZIndex + 1 })),
  closeCamera: () => set({ cameraOpen: false }),
  minimizeCamera: () => set({ cameraMinimized: true }),
  restoreCamera: () => set((state) => ({ cameraMinimized: false, highestZIndex: state.highestZIndex + 1, cameraZIndex: state.highestZIndex + 1, })),
  openShell: () => set((state) => ({ shellOpen: true, shellMinimized: false, highestZIndex: state.highestZIndex + 1, shellZIndex: state.highestZIndex + 1 })),
  closeShell: () => set({ shellOpen: false }),
  minimizeShell: () => set({ shellMinimized: true }),
  restoreShell: () => set((state) => ({ shellMinimized: false, highestZIndex: state.highestZIndex + 1, shellZIndex: state.highestZIndex + 1, })),
  highestZIndex: 100,
  aboutZIndex: 101,
  musicZIndex: 102,
  galleryZIndex: 103,
  settingsZIndex: 104,
  cameraZIndex: 105,
  shellZIndex: 106,

  focusAbout: () => set((state) => ({
    highestZIndex: state.highestZIndex + 1,
    aboutZIndex: state.highestZIndex + 1,
  })),
  focusMusic: () => set((state) => ({
    highestZIndex: state.highestZIndex + 1,
    musicZIndex: state.highestZIndex + 1,
  })),
  focusGallery: () => set((state) => ({
    highestZIndex: state.highestZIndex + 1,
    galleryZIndex: state.highestZIndex + 1,
  })),
  focusSettings: () => set((state) => ({
    highestZIndex: state.highestZIndex + 1,
    settingsZIndex: state.highestZIndex + 1,
  })),
  focusCamera: () => set((state) => ({
    highestZIndex: state.highestZIndex + 1,
    cameraZIndex: state.highestZIndex + 1,
  })),
  focusShell: () => set((state) => ({
    highestZIndex: state.highestZIndex + 1,
    shellZIndex: state.highestZIndex + 1,
  })),
}));