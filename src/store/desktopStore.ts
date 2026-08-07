import { create } from "zustand";

type ThemeOption = "ocean" | "midnight" | "sunset";
type WallpaperOption = "ocean" | "midnight" | "sunset";

type MediaFile = {
	name: string;
	type: "music" | "video" | "image" | "note";
	path?: string;
};

type AppState = {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
};

type DesktopStore = {
  highestZIndex: number;
  apps: AppState[];

  openApp: (appId: string) => void;
  closeApp: (appId: string) => void;
  focusApp: (appId: string) => void;
  minimizeApp: (appId: string) => void;
  restoreApp: (appId: string) => void;
  updateAppPosition: (appId: string, position: { x: number; y: number }) => void;

  closeAllApps: () => void;

  theme: ThemeOption;
  wallpaper: WallpaperOption;
  soundEffects: boolean;
  reducedMotion: boolean;

  setTheme: (theme: ThemeOption) => void;
  setWallpaper: (wallpaper: WallpaperOption) => void;
  toggleSoundEffects: () => void;
  toggleReducedMotion: () => void;  

  selectedMusic:MediaFile|null;
  selectedVideo:MediaFile|null;
  selectedImage:MediaFile|null;
  selectedNote:MediaFile|null;

  openMusicFile:(file:MediaFile)=>void;
  openVideoFile:(file:MediaFile)=>void;
  openImageFile:(file:MediaFile)=>void;
  openNoteFile:(file:MediaFile)=>void;  

  installedApps: string[];
  toggleAppInstall: (appId: string) => void;
};

const APP_IDS = ["about", "music", "gallery", "settings", "camera", "shell", "wiki", "notes", "calculator", "doom", "files", "store", "calendar", "weather"];

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  highestZIndex: 1,
  theme: "ocean",
  wallpaper: "ocean",
  soundEffects: true,
  reducedMotion: false,
  selectedMusic:null,
  selectedVideo:null,
  selectedImage:null,
  selectedNote:null,  
  installedApps: ["about", "music", "gallery", "settings", "camera", "shell", "wiki", "notes", "calculator", "doom", "files", "store"],
  apps: APP_IDS.map((id, index) => ({
    id,
    isOpen: false,
    isMinimized: false,
    zIndex: 0,
    position: { x: 50 + index * 20, y: 50 + index * 20 },
  })),

  setTheme: (theme) => set({ theme }),
  setWallpaper: (wallpaper) => set({ wallpaper }),
  toggleSoundEffects: () => set((state) => ({ soundEffects: !state.soundEffects })),
  toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),

  openApp: (appId) => {
    get().focusApp(appId);
    set((state) => ({
      apps: state.apps.map((app) =>
        app.id === appId ? { ...app, isOpen: true, isMinimized: false } : app
      ),
    }));
  },

  closeApp: (appId) => set((state) => ({
    apps: state.apps.map((app) =>
      app.id === appId ? { ...app, isOpen: false } : app
    ),
  })),

  focusApp: (appId) => set((state) => {
    const newZIndex = state.highestZIndex + 1;
    return {
      highestZIndex: newZIndex,
      apps: state.apps.map((app) =>
        app.id === appId ? { ...app, zIndex: newZIndex, isMinimized: false } : app
      ),
    };
  }),

  minimizeApp: (appId) => set((state) => ({
    apps: state.apps.map((app) =>
      app.id === appId ? { ...app, isMinimized: true } : app
    ),
  })),

  restoreApp: (appId) => {
    get().focusApp(appId);
  },

  updateAppPosition: (appId, position) => set(state => ({
    apps: state.apps.map(app => app.id === appId ? { ...app, position } : app)
  })),

  closeAllApps: () => {
    set(state => ({
      apps: state.apps.map(app => ({...app, isOpen: false}))
    }))
  },

  openMusicFile:(file)=>
    set((state) => {
      get().openApp('music');
      return { selectedMusic: file };
    }),

  openVideoFile:(file)=>
    set((state) => {
      get().openApp('doom');
      return { selectedVideo: file };
    }),

  openImageFile:(file)=>
    set((state) => {
      get().openApp('gallery');
      return { selectedImage: file };
    }),

  openNoteFile:(file)=>
    set((state) => {
      get().openApp('notes');
      return { selectedNote: file };
    }),

  toggleAppInstall: (appId) =>
    set((state) => {
      const isInstalled = state.installedApps.includes(appId);
      if (isInstalled) {
        return { installedApps: state.installedApps.filter((id) => id !== appId) };
      } else {
        return { installedApps: [...state.installedApps, appId] };
      }
    }),
}));