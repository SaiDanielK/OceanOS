import { create } from "zustand";

type ThemeOption = "ocean" | "midnight" | "sunset";
type WallpaperOption = "ocean" | "midnight" | "sunset";

type MediaFile = {
	name: string;
	type: "music" | "video" | "image" | "note";
	path?: string;
};

type DesktopStore = {
  aboutOpen: boolean;
  musicOpen: boolean;
  galleryOpen: boolean;
  settingsOpen: boolean;
  shellOpen: boolean;
  wikiOpen: boolean;
  notesOpen: boolean;
  calculatorOpen: boolean;
  doomOpen: boolean;
  storeOpen: boolean;
  calendarOpen: boolean;
  weatherOpen: boolean;
  aboutMinimized: boolean;
  musicMinimized: boolean;
  galleryMinimized: boolean;
  settingsMinimized: boolean;  
  shellMinimized: boolean;
  wikiMinimized: boolean;
  notesMinimized: boolean;
  calculatorMinimized: boolean;
  doomMinimized: boolean;
  storeMinimized: boolean;
  calendarMinimized: boolean;
  weatherMinimized: boolean;

  highestZIndex: number;
  aboutZIndex: number;
  musicZIndex: number;
  galleryZIndex: number;
  settingsZIndex: number;
  shellZIndex: number;
  wikiZIndex: number;
  notesZIndex: number;
  calculatorZIndex: number;
  doomZIndex: number;
  storeZIndex: number;
  calendarZIndex: number;
  weatherZIndex: number;

  focusAbout: () => void;
  focusMusic: () => void;
  focusGallery: () => void;
  focusSettings: () => void;
  focusShell: () => void;
  focusWiki: () => void;
  focusNotes: () => void;
  focusCalculator: () => void;
  focusDoom: () => void;
  focusStore: () => void;
  focusCalendar: () => void;
  focusWeather: () => void;
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
  openWiki: () => void;
  closeWiki: () => void;
  openNotes: () => void;
  closeNotes: () => void;
  openCalculator: () => void;
  closeCalculator: () => void;
  closeDoom: () => void;
  openDoom: () => void;
  closeStore: () => void;
  openStore: () => void;
  openWeather: () => void;
  closeWeather: () => void;
  closeAllApps: () => void;
  minimizeAbout: () => void;
  restoreAbout: () => void;
  minimizeMusic: () => void;
  restoreMusic: () => void;
  minimizeGallery: () => void;
  restoreGallery: () => void;
  minimizeSettings: () => void;
  restoreSettings: () => void;
  minimizeShell: () => void;
  restoreShell: () => void;
  minimizeWiki: () => void;
  restoreWiki: () => void;
  minimizeNotes: () => void;
  restoreNotes: () => void;
  minimizeCalculator: () => void;
  restoreCalculator: () => void;
  minimizeDoom: () => void;
  restoreDoom: () => void;
  minimizeStore: () => void;
  restoreStore: () => void;
  openCalendar: () => void;
  closeCalendar: () => void;
  minimizeCalendar: () => void;
  restoreCalendar: () => void;
  minimizeWeather: () => void;
  restoreWeather: () => void;

  filesOpen: boolean;
  filesMinimized: boolean;
  filesZIndex: number;

  openFiles: () => void;
  closeFiles: () => void;

  minimizeFiles: () => void;
  restoreFiles: () => void;

  focusFiles: () => void;

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

export const useDesktopStore = create<DesktopStore>((set) => ({
  aboutOpen: true,
  musicOpen: false,
  galleryOpen: false,
  settingsOpen: false,
  cameraOpen: false,
  shellOpen: false,
  wikiOpen: false,
  notesOpen: false,
  calculatorOpen: false,
  doomOpen: false,
  storeOpen: false,
  calendarOpen: false,
  weatherOpen: false,
  filesOpen: false,
  aboutMinimized: false,
  musicMinimized: false,
  galleryMinimized: false,
  settingsMinimized: false,
  cameraMinimized: false,
  shellMinimized: false,
  wikiMinimized: false,
  notesMinimized: false,
  calculatorMinimized: false,
  doomMinimized: false,
  storeMinimized: false,
  calendarMinimized: false,
  weatherMinimized: false,
  filesMinimized: false,
  theme: "ocean",
  wallpaper: "ocean",
  soundEffects: true,
  reducedMotion: false,
  selectedMusic:null,
  selectedVideo:null,
  selectedImage:null,
  selectedNote:null,  
  installedApps: [
    "about",
    "music",
    "gallery",
    "settings",
    "camera",
    "shell",
    "wiki",
    "notes",
    "calculator",
    "doom",
    "files",
    "store",
  ],

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
  openWiki: () => set((state) => ({ wikiOpen: true, wikiMinimized: false, highestZIndex: state.highestZIndex + 1, wikiZIndex: state.highestZIndex + 1 })),
  closeWiki: () => set({ wikiOpen: false }),
  minimizeWiki: () => set({ wikiMinimized: true }),
  restoreWiki: () => set((state) => ({ wikiMinimized: false, highestZIndex: state.highestZIndex + 1, wikiZIndex: state.highestZIndex + 1, })),
  openNotes: () => set((state) => ({ notesOpen: true, notesMinimized: false, highestZIndex: state.highestZIndex + 1, notesZIndex: state.highestZIndex + 1 })),
  closeNotes: () => set({ notesOpen: false }),
  minimizeNotes: () => set({ notesMinimized: true }),
  restoreNotes: () => set((state) => ({ notesMinimized: false, highestZIndex: state.highestZIndex + 1, notesZIndex: state.highestZIndex + 1, })),  
  openCalculator: () => set((state) => ({ calculatorOpen: true, calculatorMinimized: false, highestZIndex: state.highestZIndex + 1, calculatorZIndex: state.highestZIndex + 1 })),
  closeCalculator: () => set({ calculatorOpen: false }),
  minimizeCalculator: () => set({ calculatorMinimized: true }),
  restoreCalculator: () => set((state) => ({ calculatorMinimized: false, highestZIndex: state.highestZIndex + 1, calculatorZIndex: state.highestZIndex + 1, })),
  closeDoom: () => set({ doomOpen: false }),
  openDoom: () => set((state) => ({ doomOpen: true, doomMinimized: false, highestZIndex: state.highestZIndex + 1, doomZIndex: state.highestZIndex + 1 })),
  openStore: () => set((state) => ({ storeOpen: true, storeMinimized: false, highestZIndex: state.highestZIndex + 1, storeZIndex: state.highestZIndex + 1 })),
  closeStore: () => set({ storeOpen: false }),
  minimizeStore: () => set({ storeMinimized: true }),
  restoreStore: () => set((state) => ({ storeMinimized: false, highestZIndex: state.highestZIndex + 1, storeZIndex: state.highestZIndex + 1, })),
  focusStore: () => set((state) => ({ highestZIndex: state.highestZIndex + 1, storeZIndex: state.highestZIndex + 1 })),
  openCalendar: () => set((state) => ({ calendarOpen: true, calendarMinimized: false, highestZIndex: state.highestZIndex + 1, calendarZIndex: state.highestZIndex + 1 })),
  closeCalendar: () => set({ calendarOpen: false }),
  minimizeCalendar: () => set({ calendarMinimized: true }),
  restoreCalendar: () => set((state) => ({ calendarMinimized: false, highestZIndex: state.highestZIndex + 1, calendarZIndex: state.highestZIndex + 1 })),
  focusCalendar: () => set((state) => ({ highestZIndex: state.highestZIndex + 1, calendarZIndex: state.highestZIndex + 1 })),
  openWeather: () => set((state) => ({ weatherOpen: true, weatherMinimized: false, highestZIndex: state.highestZIndex + 1, weatherZIndex: state.highestZIndex + 1 })),
  closeWeather: () => set({ weatherOpen: false }),
  minimizeWeather: () => set({ weatherMinimized: true }),
  restoreWeather: () => set((state) => ({ weatherMinimized: false, highestZIndex: state.highestZIndex + 1, weatherZIndex: state.highestZIndex + 1 })),
  focusWeather: () => set((state) => ({ highestZIndex: state.highestZIndex + 1, weatherZIndex: state.highestZIndex + 1 })),  
  closeAllApps: () => {
    set((state) => {
      const s = useDesktopStore.getState();
      s.closeAbout(); s.closeMusic(); s.closeGallery(); s.closeSettings();
      s.closeCamera(); s.closeShell(); s.closeWiki(); s.closeNotes();
      s.closeCalculator(); s.closeDoom(); s.closeStore(); s.closeCalendar();
      s.closeWeather(); s.closeFiles();
      return {};
    });
  },
  minimizeDoom: () => set({ doomMinimized: true }),
  restoreDoom: () => set((state) => ({ doomMinimized: false, highestZIndex: state.highestZIndex + 1, doomZIndex: state.highestZIndex + 1 })),
  focusDoom: () => set((state) => ({ highestZIndex: state.highestZIndex + 1, doomZIndex: state.highestZIndex + 1 })),
  
  highestZIndex: 100,
  aboutZIndex: 101,
  musicZIndex: 102,
  galleryZIndex: 103,
  settingsZIndex: 104,
  cameraZIndex: 105,
  shellZIndex: 106,
  wikiZIndex: 107,
  notesZIndex: 108,
  calculatorZIndex: 109,
  doomZIndex: 110,
  storeZIndex: 111,
  filesZIndex: 112,
  calendarZIndex: 113,
  weatherZIndex: 114,


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
  focusWiki: () => set((state) => ({
    highestZIndex: state.highestZIndex + 1,
    wikiZIndex: state.highestZIndex + 1,
  })),
  focusNotes: () => set((state) => ({
    highestZIndex: state.highestZIndex + 1,
    notesZIndex: state.highestZIndex + 1,
  })),
  focusCalculator: () => set((state) => ({
    highestZIndex: state.highestZIndex + 1,
    calculatorZIndex: state.highestZIndex + 1,
  })),
  focusFiles:()=>set((state)=>({
    highestZIndex:state.highestZIndex+1,
    filesZIndex:state.highestZIndex+1
  })),

  openFiles: () =>
    set((state)=>({
    filesOpen:true,
    filesMinimized:false,
    highestZIndex:state.highestZIndex+1,
    filesZIndex:state.highestZIndex+1
  })),

  closeFiles:()=>set({
    filesOpen:false
  }),

  minimizeFiles:()=>set({
    filesMinimized:true
  }),

  restoreFiles:()=>set((state)=>({
    filesMinimized:false,
    highestZIndex:state.highestZIndex+1,
    filesZIndex:state.highestZIndex+1
  })),

  openMusicFile:(file)=>
  set((state)=>({
    selectedMusic:file,
    musicOpen:true,
    musicMinimized:false,
    highestZIndex:state.highestZIndex+1,
    musicZIndex:state.highestZIndex+1
  })),

  openVideoFile:(file)=>
  set((state)=>({
    selectedVideo:file,
    doomOpen:true,
    doomMinimized:false,
    highestZIndex:state.highestZIndex+1,
    doomZIndex:state.highestZIndex+1
  })),

  openImageFile:(file)=>
  set((state)=>({
    selectedImage:file,
    galleryOpen:true,
    galleryMinimized:false,
    highestZIndex:state.highestZIndex+1,
    galleryZIndex:state.highestZIndex+1
  })),

  openNoteFile:(file)=>
  set((state)=>({
    selectedNote:file,
    notesOpen:true,
    notesMinimized:false,
    highestZIndex:state.highestZIndex+1,
    notesZIndex:state.highestZIndex+1
  })),

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