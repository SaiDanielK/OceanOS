"use client";

import Dock from "./Dock";
import Window from "./Window";

import About from "@/apps/About";
import Music from "@/apps/Music";
import Gallery from "@/apps/Gallery";
import Settings from "@/apps/Settings";
import Camera from "@/apps/Camera";
import OceanShell from "@/apps/OceanShell";
import Notes from "@/apps/Notes";
import Calculator from "@/apps/Calculator";
import Doom from "@/apps/Doom";
import OceanStore from "@/apps/OceanStore";
import Calendar from "@/apps/Calendar";
import Weather from "@/apps/Weather";
import Files from "@/apps/Files";

import { useDesktopStore } from "@/store/desktopStore";
import { useEffect, useState, type PointerEvent as ReactPointerEvent } from "react";
import BootScreen from "@/components/BootScreen";
import Wikipedia from "@/apps/Wikipedia";
import BatteryGauge from "react-battery-gauge";

function ClockWidget({
  currentTime,
  currentDate,
  position,
  onPointerDown,
}: {
  currentTime: string;
  currentDate: string;
  position: { right: number; top: number };
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
}) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
  const hourDeg = ((hours + minutes / 60) / 12) * 360;

  const tickMarks = Array.from({ length: 12 }, (_, index) => {
    const angle = (index / 12) * 360;
    const isHour = index % 3 === 0;
    const length = isHour ? "8px" : "4px";
    const width = isHour ? "2px" : "1px";
    return (
      <div
        key={index}
        className="absolute left-1/2 top-1/2 rounded-full bg-white/80"
        style={{
          height: length,
          width,
          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${isHour ? 28 : 32}px)`,
          transformOrigin: "center center",
        }}
      />
    );
  });

  return (
    <div
      className="absolute z-30 cursor-grab rounded-2xl border border-white/15 bg-slate-950/65 px-4 py-2 shadow-[0_20px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl active:cursor-grabbing"
      style={{ right: `${position.right}px`, top: `${position.top}px`, minWidth: "220px" }}
      onPointerDown={onPointerDown}
    >
      <div className="text-[10px] uppercase tracking-[0.34em] text-white/55">Local time</div>
      <div className="mt-1 text-3xl font-semibold tracking-[0.02em] text-white">
        {currentTime || "--:--"}
      </div>
      <div className="mt-1 text-sm text-white/70">{currentDate || "Loading..."}</div>
      <div className="mt-2 flex justify-center">
        <div className="relative h-20 w-20 rounded-full border border-white/20 bg-gradient-to-br from-white/15 to-white/5 shadow-inner">
          {tickMarks}
          <div className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          <div
            className="absolute left-1/2 top-1/2 h-[5px] w-[26%] origin-bottom rounded-full bg-white"
            style={{ transform: `translate(-50%, -100%) rotate(${hourDeg}deg)` }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[4px] w-[34%] origin-bottom rounded-full bg-white/90"
            style={{ transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)` }}
          />
        </div>
      </div>
    </div>
  );
}

function WeatherWidget() {
  const [weather, setWeather] = useState<{
    temp: string;
    condition: string;
    icon: string;
    location: string;
    feelsLike: string;
    wind: string;
    humidity: string;
  }>({
    temp: "--",
    condition: "Checking weather",
    icon: "☁️",
    location: "Locating...",
    feelsLike: "--",
    wind: "--",
    humidity: "--",
  });
  const [position, setPosition] = useState({ right: 16, top: 250 });
  const [dragState, setDragState] = useState<{
    startX: number;
    startY: number;
    startRight: number;
    startTop: number;
  } | null>(null);

  useEffect(() => {
    const fallbackWeather = {
      temp: "72°F",
      condition: "Clear",
      icon: "☀️",
      location: "Default view",
      feelsLike: "72°F",
      wind: "7 mph",
      humidity: "44% humidity",
    };

    const fetchWeather = async (latitude: number, longitude: number) => {
      try {
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
        );

        if (!weatherResponse.ok) {
          throw new Error("Weather request failed");
        }

        const weatherData = await weatherResponse.json();
        const current = weatherData?.current;
        const code = current?.weather_code ?? 0;
        const temp = current?.temperature_2m;
        const feelsLikeTemp = current?.apparent_temperature;
        const humidity = current?.relative_humidity_2m;
        const wind = current?.wind_speed_10m;

        const weatherCodeMap: Record<number, { label: string; icon: string }> = {
          0: { label: "Clear", icon: "☀️" },
          1: { label: "Mostly clear", icon: "🌤️" },
          2: { label: "Partly cloudy", icon: "⛅" },
          3: { label: "Cloudy", icon: "☁️" },
          45: { label: "Fog", icon: "🌫️" },
          48: { label: "Rime fog", icon: "🌫️" },
          51: { label: "Light drizzle", icon: "🌦️" },
          61: { label: "Rain", icon: "🌧️" },
          71: { label: "Snow", icon: "❄️" },
          95: { label: "Thunderstorm", icon: "⛈️" },
        };

        const match = weatherCodeMap[code] ?? weatherCodeMap[0];
        const tempValue = temp != null ? `${Math.round(temp * 9 / 5 + 32)}°F` : "--";
        const feelsLikeValue = feelsLikeTemp != null ? `${Math.round(feelsLikeTemp * 9 / 5 + 32)}°F` : "--";
        const humidityValue = humidity != null ? `${Math.round(humidity)}% humidity` : "--";
        const windValue = wind != null ? `${Math.round(wind * 0.621371)} mph` : "--";

        let locationName = "Live weather";
        try {
          const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=en&limit=1`
          );
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            const firstResult = geoData?.results?.[0];
            if (firstResult) {
              locationName = [firstResult.name, firstResult.admin1, firstResult.country]
                .filter(Boolean)
                .join(", ");
            }
          }
        } catch {
          locationName = "Live weather";
        }

        setWeather({
          temp: tempValue,
          condition: match.label,
          icon: match.icon,
          location: locationName,
          feelsLike: feelsLikeValue,
          wind: windValue,
          humidity: humidityValue,
        });
      } catch {
        setWeather(fallbackWeather);
      }
    };

    if (typeof window === "undefined" || !navigator.geolocation) {
      setWeather(fallbackWeather);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (geoPosition) => {
        void fetchWeather(geoPosition.coords.latitude, geoPosition.coords.longitude);
      },
      () => {
        setWeather(fallbackWeather);
      }
    );
  }, []);

  useEffect(() => {
    if (!dragState) return;

    const handlePointerMove = (event: PointerEvent) => {
      const maxRight = Math.max(16, window.innerWidth - 300);
      const maxTop = Math.max(56, window.innerHeight - 220);
      const nextRight = Math.min(
        maxRight,
        Math.max(16, dragState.startRight - (event.clientX - dragState.startX))
      );
      const nextTop = Math.min(
        maxTop,
        Math.max(56, dragState.startTop + (event.clientY - dragState.startY))
      );

      setPosition({ right: nextRight, top: nextTop });
    };

    const handlePointerUp = () => setDragState(null);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragState]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragState({
      startX: event.clientX,
      startY: event.clientY,
      startRight: position.right,
      startTop: position.top,
    });
  };

  return (
    <div
      className="absolute z-30 cursor-grab rounded-[24px] border border-white/15 bg-slate-950/70 px-4 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl active:cursor-grabbing"
      style={{ right: `${position.right}px`, top: `${position.top}px` }}
      onPointerDown={handlePointerDown}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-3xl">
            {weather.icon}
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.34em] text-white/55">Weather</div>
            <div className="text-3xl font-semibold text-white">{weather.temp}</div>
            <div className="text-sm text-white/70">{weather.condition}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/45">Feels</div>
          <div className="mt-1 text-sm font-medium text-cyan-200">{weather.feelsLike}</div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-white/65">
        <div>
          <div className="uppercase tracking-[0.24em] text-white/45">Location</div>
          <div className="mt-1 text-sm font-medium text-white">{weather.location}</div>
        </div>
        <div className="text-right">
          <div className="uppercase tracking-[0.24em] text-white/45">Wind</div>
          <div className="mt-1 text-sm font-medium text-white">{weather.wind}</div>
        </div>
      </div>

      <div className="mt-2 text-[11px] uppercase tracking-[0.24em] text-white/45">{weather.humidity}</div>
    </div>
  );
}

function TopBar({
  currentTime,
  currentDate,
  onShutdown,
}: {
  currentTime: string;
  currentDate: string;
  onShutdown: () => void;
}) {
  const [wifiOpen, setWifiOpen] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const closeAllApps = useDesktopStore((state) => state.closeAllApps);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex h-10 items-center justify-between border-b border-white/15 bg-black/20 px-4 text-sm text-white/95 shadow-[0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span>OceanOS</span>
        <button
          type="button"
          onClick={() => useDesktopStore.getState().closeAllApps()}
          className="pointer-events-auto rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-white/80 transition hover:bg-white/20 hover:text-white"
        >
          Close all
        </button>
      </div>
      <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.25em] uppercase">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-10 items-center justify-center">
          <BatteryGauge value={100} />
          </span>
          <span className="relative inline-flex h-4 w-8 items-center justify-center">
            <button
              type="button"
              onClick={() => setWifiOpen((prev) => !prev)}
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/15"
            >
              <img src="/wifi.png" alt="Wi-Fi" className="h-4 w-4" />
            </button>
            {wifiOpen ? (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-white/10 bg-slate-950/95 p-3 text-left text-[11px] text-white shadow-xl backdrop-blur-xl">
                <div className="mb-2 text-xs uppercase text-white/60">Wi-Fi</div>
                <div className="rounded-lg bg-white/10 px-3 py-2">
                  <div className="text-sm font-medium">Connected</div>
                  <div className="text-[11px] text-white/60">Ocean Network</div>
                </div>
              </div>
            ) : null}
          </span>
          <span className="relative inline-flex h-4 w-8 items-center justify-center">
            <button
              type="button"
              onClick={() => setSoundOpen((prev) => !prev)}
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/15"
            >
              <img src="/sound.png" alt="Sound" className="h-4 w-4" />
            </button>
            {soundOpen ? (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-white/10 bg-slate-950/95 p-3 text-left text-[11px] text-white shadow-xl backdrop-blur-xl">
                <div className="mb-2 text-xs uppercase text-white/60">Sound</div>
                <div className="rounded-lg bg-white/10 px-3 py-2">
                  <div className="text-sm font-medium">Volume</div>
                  <div className="text-[11px] text-white/60">80%</div>
                </div>
              </div>
            ) : null}
          </span>
          <button
            type="button"
            onClick={onShutdown}
            className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/15"
            aria-label="Shut down"
          >
            <span className="text-base">⏻</span>
          </button>
        </div>
        <span className="text-white/70">{currentDate}</span>
        <span>{currentTime}</span>
      </div>
    </div>
  );
}

export default function Desktop() {
  const [booting, setBooting] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [widgetPosition, setWidgetPosition] = useState({ right: 16, top: 56 });
  const [dragState, setDragState] = useState<{
    startX: number;
    startY: number;
    startRight: number;
    startTop: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [shutdownOverlayVisible, setShutdownOverlayVisible] = useState(false);
  const [shutdownOverlayActive, setShutdownOverlayActive] = useState(false);

  useEffect(() => {
    const handleWindowClick = () => {
      if (contextMenu) {
        setContextMenu(null);
      }
    };

    window.addEventListener("click", handleWindowClick);

    return () => window.removeEventListener("click", handleWindowClick);
  }, [contextMenu]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
      );
      setCurrentDate(
        now.toLocaleDateString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!dragState) return;

    const handlePointerMove = (event: PointerEvent) => {
      const maxRight = Math.max(16, window.innerWidth - 260);
      const maxTop = Math.max(56, window.innerHeight - 140);
      const nextRight = Math.min(
        maxRight,
        Math.max(16, dragState.startRight - (event.clientX - dragState.startX))
      );
      const nextTop = Math.min(
        maxTop,
        Math.max(56, dragState.startTop + (event.clientY - dragState.startY))
      );

      setWidgetPosition({ right: nextRight, top: nextTop });
    };

    const handlePointerUp = () => setDragState(null);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragState]);

  const handleClockWidgetPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragState({
      startX: event.clientX,
      startY: event.clientY,
      startRight: widgetPosition.right,
      startTop: widgetPosition.top,
    });
  };

  const aboutOpen = useDesktopStore((state) => state.aboutOpen);
  const musicOpen = useDesktopStore((state) => state.musicOpen);
  const galleryOpen = useDesktopStore((state) => state.galleryOpen);
  const settingsOpen = useDesktopStore((state) => state.settingsOpen);
  const cameraOpen = useDesktopStore((state) => state.cameraOpen);
  const shellOpen = useDesktopStore((state) => state.shellOpen);
  const wikiOpen = useDesktopStore((state) => state.wikiOpen);
  const notesOpen = useDesktopStore((state) => state.notesOpen);
  const calculatorOpen = useDesktopStore((state) => state.calculatorOpen);
  const doomOpen = useDesktopStore((state) => state.doomOpen);
  const storeOpen = useDesktopStore((state) => state.storeOpen);
  const calendarOpen = useDesktopStore((state) => state.calendarOpen);
  const weatherOpen = useDesktopStore((state) => state.weatherOpen);
  const theme = useDesktopStore((state) => state.theme);
  const wallpaper = useDesktopStore((state) => state.wallpaper);

  const closeAbout = useDesktopStore((state) => state.closeAbout);
  const closeMusic = useDesktopStore((state) => state.closeMusic);
  const closeGallery = useDesktopStore((state) => state.closeGallery);
  const closeSettings = useDesktopStore((state) => state.closeSettings);
  const closeCamera = useDesktopStore((state) => state.closeCamera);
  const closeShell = useDesktopStore((state) => state.closeShell);
  const closeWiki = useDesktopStore((state) => state.closeWiki);
  const closeNotes = useDesktopStore((state) => state.closeNotes);
  const closeCalculator = useDesktopStore((state) => state.closeCalculator);
  const closeDoom = useDesktopStore((state) => state.closeDoom);
  const closeWeather = useDesktopStore((state) => state.closeWeather);

  const closeStore = useDesktopStore((s) => s.closeStore);
  const minimizeStore = useDesktopStore((s) => s.minimizeStore);
  const closeCalendar = useDesktopStore((s) => s.closeCalendar);

  const aboutMinimized = useDesktopStore((s) => s.aboutMinimized);
  const musicMinimized = useDesktopStore((s) => s.musicMinimized);
  const galleryMinimized = useDesktopStore((s) => s.galleryMinimized);
  const settingsMinimized = useDesktopStore((s) => s.settingsMinimized);
  const cameraMinimized = useDesktopStore((s) => s.cameraMinimized);
  const shellMinimized = useDesktopStore((s) => s.shellMinimized);
  const wikiMinimized = useDesktopStore((s) => s.wikiMinimized);
  const notesMinimized = useDesktopStore((s) => s.notesMinimized);
  const calculatorMinimized = useDesktopStore((s) => s.calculatorMinimized);
  const doomMinimized = useDesktopStore((s) => s.doomMinimized);
  const storeMinimized = useDesktopStore((s) => s.storeMinimized);
  const calendarMinimized = useDesktopStore((s) => s.calendarMinimized);
  const weatherMinimized = useDesktopStore((s) => s.weatherMinimized);

  const minimizeAbout = useDesktopStore((s) => s.minimizeAbout);
  const minimizeMusic = useDesktopStore((s) => s.minimizeMusic);
  const minimizeGallery = useDesktopStore((s) => s.minimizeGallery);
  const minimizeSettings = useDesktopStore((s) => s.minimizeSettings);
  const minimizeCamera = useDesktopStore((s) => s.minimizeCamera);
  const minimizeShell = useDesktopStore((s) => s.minimizeShell);
  const minimizeWiki = useDesktopStore((s) => s.minimizeWiki);
  const minimizeNotes = useDesktopStore((s) => s.minimizeNotes);
  const minimizeCalculator = useDesktopStore((s) => s.minimizeCalculator);
  const minimizeDoom = useDesktopStore((s) => s.minimizeDoom);
  const minimizeCalendar = useDesktopStore((s) => s.minimizeCalendar);
  const minimizeWeather = useDesktopStore((s) => s.minimizeWeather);

  const aboutZIndex = useDesktopStore((s) => s.aboutZIndex);
  const musicZIndex = useDesktopStore((s) => s.musicZIndex);
  const galleryZIndex = useDesktopStore((s) => s.galleryZIndex);
  const settingsZIndex = useDesktopStore((s) => s.settingsZIndex);
  const cameraZIndex = useDesktopStore((s) => s.cameraZIndex);
  const shellZIndex = useDesktopStore((s) => s.shellZIndex);
  const wikiZIndex = useDesktopStore((s) => s.wikiZIndex);
  const notesZIndex = useDesktopStore((s) => s.notesZIndex);
  const calculatorZIndex = useDesktopStore((s) => s.calculatorZIndex);
  const doomZIndex = useDesktopStore((s) => s.doomZIndex);
  const storeZIndex = useDesktopStore((s) => s.storeZIndex);
  const calendarZIndex = useDesktopStore((s) => s.calendarZIndex);
  const weatherZIndex = useDesktopStore((s) => s.weatherZIndex);

  const focusAbout = useDesktopStore((s) => s.focusAbout);
  const focusMusic = useDesktopStore((s) => s.focusMusic);
  const focusGallery = useDesktopStore((s) => s.focusGallery);
  const focusSettings = useDesktopStore((s) => s.focusSettings);
  const focusCamera = useDesktopStore((s) => s.focusCamera);
  const focusShell = useDesktopStore((s) => s.focusShell);
  const focusWiki = useDesktopStore((s) => s.focusWiki);
  const focusNotes = useDesktopStore((s) => s.focusNotes);
  const focusCalculator = useDesktopStore((s) => s.focusCalculator);
  const focusDoom = useDesktopStore((s) => s.focusDoom);
  const focusStore = useDesktopStore((s) => s.focusStore);
  const focusCalendar = useDesktopStore((s) => s.focusCalendar);
  const focusWeather = useDesktopStore((s) => s.focusWeather);

  const openAbout = useDesktopStore((s) => s.openAbout);
  const openMusic = useDesktopStore((s) => s.openMusic);
  const openGallery = useDesktopStore((s) => s.openGallery);
  const openSettings = useDesktopStore((s) => s.openSettings);
  const openCamera = useDesktopStore((s) => s.openCamera);
  const openShell = useDesktopStore((s) => s.openShell);
  const openWiki = useDesktopStore((s) => s.openWiki);
  const openNotes = useDesktopStore((s) => s.openNotes);
  const openCalculator = useDesktopStore((s) => s.openCalculator);
  const openDoom = useDesktopStore((s) => s.openDoom);
  const openStore = useDesktopStore((s) => s.openStore);
  const openCalendar = useDesktopStore((s) => s.openCalendar);
  const openWeather = useDesktopStore((s) => s.openWeather);

  const filesOpen = useDesktopStore((s)=>s.filesOpen);
  const filesMinimized = useDesktopStore((s)=>s.filesMinimized);
  const filesZIndex = useDesktopStore((s)=>s.filesZIndex);

  const openFiles = useDesktopStore((s)=>s.openFiles);
  const closeFiles = useDesktopStore((s)=>s.closeFiles);
  const minimizeFiles = useDesktopStore((s)=>s.minimizeFiles);
  const focusFiles = useDesktopStore((s)=>s.focusFiles);  

  const appCatalog = [
    { id: "about", name: "About", keywords: ["about", "info", "profile"], onOpen: openAbout },
    { id: "music", name: "Music", keywords: ["music", "audio", "player", "songs"], onOpen: openMusic },
    { id: "gallery", name: "Gallery", keywords: ["gallery", "photos", "images", "pictures"], onOpen: openGallery },
    { id: "settings", name: "Settings", keywords: ["settings", "config", "preferences"], onOpen: openSettings },
    { id: "camera", name: "Camera", keywords: ["camera", "photo", "cam"], onOpen: openCamera },
    { id: "shell", name: "Ocean Shell", keywords: ["shell", "terminal", "command", "console"], onOpen: openShell },
    { id: "browser", name: "Web Browser", keywords: ["browser", "web", "wiki", "internet"], onOpen: openWiki },
    { id: "notes", name: "Notes", keywords: ["notes", "text", "memo", "write"], onOpen: openNotes },
    { id: "calculator", name: "Calculator", keywords: ["calculator", "math", "sum"], onOpen: openCalculator },
    { id: "doom", name: "TikTok", keywords: ["tik", "tok", "doom", "video", "app"], onOpen: openDoom },
    { id: "store", name: "App Store", keywords: ["store", "app", "install"], onOpen: openStore },
    { id: "calendar", name: "Calendar", keywords: ["calendar", "schedule", "date"], onOpen: openCalendar },
    { id: "weather", name: "Weather", keywords: ["weather", "forecast", "temperature"], onOpen: openWeather },
    { id: "files", name: "Files", keywords: ["files", "finder", "documents"], onOpen: openFiles },
  ];

  const filteredApps = searchQuery.trim()
    ? appCatalog.filter((app) => {
        const haystack = `${app.name} ${app.keywords.join(" ")}`.toLowerCase();
        return haystack.includes(searchQuery.trim().toLowerCase());
      })
    : appCatalog;

  const shouldShowResults = searchFocused && searchQuery.trim().length > 0;

  const handleLaunchApp = (app: (typeof appCatalog)[number]): void => {
    app.onOpen();
    setSearchQuery("");
  };

  const handleContextMenuAction = (
    action: "close-all" | "terminal" | "settings" | "files" | "store"
  ): void => {
    setContextMenu(null);

    switch (action) {
      case "close-all":
        useDesktopStore.getState().closeAllApps();
        break;
      case "terminal":
        useDesktopStore.getState().openShell();
        break;
      case "settings":
        useDesktopStore.getState().openSettings();
        break;
      case "files":
        useDesktopStore.getState().openFiles();
        break;
      case "store":
        useDesktopStore.getState().openStore();
        break;
      default:
        break;
    }
  };

  const handleShutdown = () => {
    setShutdownOverlayVisible(true);
    requestAnimationFrame(() => setShutdownOverlayActive(true));
  };

  const handleWakeFromShutdown = () => {
    setShutdownOverlayActive(false);
    window.setTimeout(() => setShutdownOverlayVisible(false), 650);
  };

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
        onContextMenu={(event) => {
          event.preventDefault();
          setContextMenu({ x: event.clientX, y: event.clientY });
        }}
      >
        <TopBar currentTime={currentTime} currentDate={currentDate} onShutdown={handleShutdown} />
        <ClockWidget
          currentTime={currentTime}
          currentDate={currentDate}
          position={widgetPosition}
          onPointerDown={handleClockWidgetPointerDown}
        />
        <WeatherWidget />

        {shutdownOverlayVisible ? (
          <div
            className={`absolute inset-0 z-[80] flex cursor-pointer items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-700 ${shutdownOverlayActive ? "opacity-100" : "opacity-0"}`}
            onClick={handleWakeFromShutdown}
            role="presentation"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/wallpaper.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-900/20 to-slate-950/60" />
            <div className="relative z-10 text-center text-white">
              <div className="text-4xl font-semibold uppercase tracking-[0.35em] sm:text-5xl">
                OceanOS
              </div>
              <div className="mt-3 text-sm uppercase tracking-[0.35em] text-white/70">
                Click anywhere to wake
              </div>
            </div>
          </div>
        ) : null}

        {contextMenu ? (
          <div
            className="fixed z-[60] min-w-48 rounded-2xl border border-white/10 bg-slate-950/90 p-1 shadow-2xl backdrop-blur-xl"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <button
              type="button"
              onClick={() => handleContextMenuAction("files")}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/10"
            >
              <span className="text-base">📁</span>
              <span>Files</span>
            </button>
            <button
              type="button"
              onClick={() => handleContextMenuAction("store")}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/10"
            >
              <span className="text-base">🛍️</span>
              <span>App Store</span>
            </button>
            <div className="my-1 h-px bg-white/15" />
            <button
              type="button"
              onClick={() => handleContextMenuAction("close-all")}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/10"
            >
              <span className="text-base">❌</span>
              <span>Close all Applications</span>
            </button>
            <div className="my-1 h-px bg-white/15" />
            <button
              type="button"
              onClick={() => handleContextMenuAction("settings")}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/10"
            >
              <span className="text-base">⚙️</span>
              <span>Personalize</span>
            </button>
          </div>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 top-10 z-50 flex justify-center px-4 pt-3">
          <div className="pointer-events-auto w-full max-w-[560px] rounded-2xl border border-white/15 bg-slate-950/70 p-2 shadow-[0_16px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && filteredApps.length > 0) {
                  event.preventDefault();
                  handleLaunchApp(filteredApps[0]);
                }
              }}
              placeholder="🔎Explore Ocean-OS..."
              className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/45 focus:border-cyan-400/50"
            />

            {shouldShowResults && filteredApps.length > 0 ? (
              <div className="mt-2 max-h-60 overflow-y-auto rounded-xl border border-white/10 bg-black/20">
                {filteredApps.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => handleLaunchApp(app)}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-white/85 transition hover:bg-white/10"
                  >
                    <span>{app.name}</span>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-white/45">
                      Open
                    </span>
                  </button>
                ))}
              </div>
            ) : shouldShowResults ? (
              <div className="mt-2 rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm text-white/60">
                No apps found.
              </div>
            ) : null}
          </div>
        </div>

        <Window
          title="About"
          dockId="about-dock"
          isOpen={aboutOpen}
          isMinimized={aboutMinimized}
          onClose={closeAbout}
          onMinimize={minimizeAbout}
          zIndex={aboutZIndex}
          onFocus={focusAbout}
          width={430}
          height={430}
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
          width={420}
          height={800}
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
          width={405}
          height={430}
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
          width={400}
          height={438}
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
          width={410}
          height={450}
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
          width={400}
          height={420}
        >
          <OceanShell />
        </Window>

        <Window
          title="Web Browser"
          dockId="wiki-dock"
          isOpen={wikiOpen}
          isMinimized={wikiMinimized}
          onClose={closeWiki}
          onMinimize={minimizeWiki}
          zIndex={wikiZIndex}
          onFocus={focusWiki}
          width={430}
          height={479}
        >
          <Wikipedia />
        </Window>

        <Window
          title="Notes"
          dockId="notes-dock"
          isOpen={notesOpen}
          isMinimized={notesMinimized}
          onClose={closeNotes}
          onMinimize={minimizeNotes}
          zIndex={notesZIndex}
          onFocus={focusNotes}
          width={430}
          height={457}
        >
          <Notes />
        </Window>

        <Window
          title="Calculator"
          dockId="calculator-dock"
          isOpen={calculatorOpen}
          isMinimized={calculatorMinimized}
          onClose={closeCalculator}
          onMinimize={minimizeCalculator}
          zIndex={calculatorZIndex}
          onFocus={focusCalculator}
          width={429}
          height={575}
        >
          <Calculator />
        </Window>

        <Window
          title="TikTok"
          dockId="doom-dock"
          isOpen={doomOpen}
          isMinimized={doomMinimized}
          onClose={closeDoom}
          onMinimize={minimizeDoom}
          zIndex={doomZIndex}
          onFocus={focusDoom}
          width={470}
          height={718}
        >
          <Doom />
        </Window>

        <Window
          title="Weather"
          dockId="weather-dock"
          isOpen={weatherOpen}
          isMinimized={weatherMinimized}
          onClose={closeWeather}
          onMinimize={minimizeWeather}
          zIndex={weatherZIndex}
          onFocus={focusWeather}
          width={400}
          height={500}
        >
          <Weather />
        </Window>

        <Window
          title="Calendar"
          dockId="calendar-dock"
          isOpen={calendarOpen}
          isMinimized={calendarMinimized}
          onClose={closeCalendar}
          onMinimize={minimizeCalendar}
          zIndex={calendarZIndex}
          onFocus={focusCalendar}
          width={750}
          height={800}
        >
          <Calendar />
        </Window>

        {storeOpen && (
          <Window
            title="Ocean Store"
            dockId="store-dock"
            isOpen={storeOpen}
            isMinimized={storeMinimized}
            onClose={closeStore}
            onMinimize={minimizeStore}
            zIndex={storeZIndex}
            onFocus={focusStore}
            width={750}
            height={800}
          >
            <OceanStore />
          </Window>
        )}

        {filesOpen && (
          <Window
            title="Files"
            dockId="files-dock"
            isOpen={filesOpen}
            isMinimized={filesMinimized}
            onClose={closeFiles}
            onMinimize={minimizeFiles}
            zIndex={filesZIndex}
            onFocus={focusFiles}
            width={600}
            height={450}
          >
            <Files />
          </Window>
        )}

        <Dock />
      </main>
    </>
  );
}