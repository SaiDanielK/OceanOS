"use client";

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

import Guide from "@/components/Guide";
import { useDesktopStore } from "@/store/desktopStore";
import { useEffect, useState, useRef, type PointerEvent as ReactPointerEvent, type DragEvent as ReactDragEvent } from "react";
import BootScreen from "@/components/BootScreen";
import Wikipedia from "@/apps/Wikipedia";


const appMap: Record<string, {
  component: React.ComponentType,
  title: string,
  width?: number,
  height?: number
}> = {
  about: { component: About, title: "About", width: 460, height: 430 },
  music: { component: Music, title: "Music", width: 420, height: 790 },
  gallery: { component: Gallery, title: "Gallery", width: 405, height: 430 },
  settings: { component: Settings, title: "Settings", width: 620, height: 600 },
  camera: { component: Camera, title: "Camera", width: 420, height: 455 },
  shell: { component: OceanShell, title: "Ocean Shell", width: 400, height: 420 },
  wiki: { component: Wikipedia, title: "Web Browser", width: 430, height: 479 },
  notes: { component: Notes, title: "Notes", width: 800, height: 600 },
  calculator: { component: Calculator, title: "Calculator", width: 429, height: 575 },
  doom: { component: Doom, title: "TikTok", width: 470, height: 718 },
  store: { component: OceanStore, title: "Ocean Store", width: 750, height: 800 },
  calendar: { component: Calendar, title: "Calendar", width: 750, height: 800 },
  weather: { component: Weather, title: "Weather", width: 400, height: 500 },
  files: { component: Files, title: "Files", width: 600, height: 450 },
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


function ClockWidget({
  currentTime,
  currentDate,
}: {
  currentTime: string;
  currentDate: string;
}) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const [position, setPosition] = useState({ right: 16, top: 56 });
  const [dragState, setDragState] = useState<{
    startX: number;
    startY: number;
    startRight: number;
    startTop: number;
  } | null>(null);

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
      onPointerDown={(event) => {
        event.preventDefault();
        setDragState({
          startX: event.clientX,
          startY: event.clientY,
          startRight: position.right,
          startTop: position.top,
        });
      }}
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
  theme,
}: {
  currentTime: string;
  currentDate: string;
  onShutdown: () => void;
  theme: "ocean" | "midnight" | "sunset";
}) {
  const [wifiOpen, setWifiOpen] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [soundVolumeTop, setSoundVolumeTop] = useState(80);
  const [soundMutedTop, setSoundMutedTop] = useState(false);
  const [soundDeviceTop] = useState("Ocean Speakers");
  const [networkStatus] = useState({ ssid: "Ocean Network", strength: 4 });
  const wifiRef = useRef<HTMLDivElement | null>(null);
  const soundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleWindowClick = () => setActiveMenu(null);
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (wifiOpen && wifiRef.current && !wifiRef.current.contains(target)) {
        setWifiOpen(false);
      }
      if (soundOpen && soundRef.current && !soundRef.current.contains(target)) {
        setSoundOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wifiOpen, soundOpen]);

  const menuSections = [
    {
      id: "finder",
      label: "Finder",
      items: [
        { label: "Open Files", icon: "📁", onSelect: () => useDesktopStore.getState().openApp("files") },
        { label: "About OceanOS", icon: "🌊", onSelect: () => useDesktopStore.getState().openApp("about") },
        { label: "Open Settings", icon: "⚙️", onSelect: () => useDesktopStore.getState().openApp("settings") },
        { label: "Close all apps", icon: "✕", accent: "text-rose-300", onSelect: () => useDesktopStore.getState().closeAllApps() },
      ],
    },
    {
      id: "file",
      label: "File",
      items: [
        { label: "New Note", icon: "📝", onSelect: () => useDesktopStore.getState().openApp("notes") },
        { label: "Open Files", icon: "📂", onSelect: () => useDesktopStore.getState().openApp("files") },
        { label: "Open Gallery", icon: "🖼️", onSelect: () => useDesktopStore.getState().openApp("gallery") },
        { label: "Open Music", icon: "🎵", onSelect: () => useDesktopStore.getState().openApp("music") },
      ],
    },
    {
      id: "edit",
      label: "Edit",
      items: [
        { label: "Edit in Notes", icon: "✍️", onSelect: () => useDesktopStore.getState().openApp("notes") },
        { label: "Open Calculator", icon: "🧮", onSelect: () => useDesktopStore.getState().openApp("calculator") },
        { label: "Open Shell", icon: "⌨️", onSelect: () => useDesktopStore.getState().openApp("shell") },
        { label: "Open Settings", icon: "⚡", onSelect: () => useDesktopStore.getState().openApp("settings") },
      ],
    },
    {
      id: "view",
      label: "View",
      items: [
        { label: "Browse Gallery", icon: "🌅", onSelect: () => useDesktopStore.getState().openApp("gallery") },
        { label: "Check Weather", icon: "☁️", onSelect: () => useDesktopStore.getState().openApp("weather") },
        { label: "Open Calendar", icon: "🗓️", onSelect: () => useDesktopStore.getState().openApp("calendar") },
        { label: "Open Store", icon: "🛍️", onSelect: () => useDesktopStore.getState().openApp("store") },
      ],
    },
    {
      id: "go",
      label: "Go",
      items: [
        { label: "Go to Files", icon: "📁", onSelect: () => useDesktopStore.getState().openApp("files") },
        { label: "Go to Music", icon: "🎧", onSelect: () => useDesktopStore.getState().openApp("music") },
        { label: "Go to Gallery", icon: "🖼️", onSelect: () => useDesktopStore.getState().openApp("gallery") },
        { label: "Go to Store", icon: "🛒", onSelect: () => useDesktopStore.getState().openApp("store") },
      ],
    },
    {
      id: "help",
      label: "Help",
      items: [
        { label: "About OceanOS", icon: "💡", onSelect: () => useDesktopStore.getState().openApp("about") },
        { label: "Open Settings", icon: "🎛️", onSelect: () => useDesktopStore.getState().openApp("settings") },
        { label: "Launch Files", icon: "📂", onSelect: () => useDesktopStore.getState().openApp("files") },
        { label: "Close all windows", icon: "🌌", accent: "text-cyan-200", onSelect: () => useDesktopStore.getState().closeAllApps() },
      ],
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex h-10 items-center justify-between border-b border-white/15 bg-black/20 px-4 text-sm text-white/95 shadow-[0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md">
      <div className="flex items-center gap-4">
        <img src="/logo.jpg" alt="OceanOS Logo" className="h-6 w-6 rounded-full" />
        <span className="inline-block bg-gradient-to-r from-blue-100 to-cyan-400 bg-clip-text font-serif italic text-transparent">OceanOS</span>
        <div className="flex items-center gap-1.5 text-white/80">
          {menuSections.map((menu) => (
            <div key={menu.id} className="relative">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveMenu((current) => (current === menu.id ? null : menu.id));
                  setWifiOpen(false);
                  setSoundOpen(false);
                }}
                style={{ fontFamily: "Arial, sans-serif" }}
                className={`pointer-events-auto rounded-full px-2.5 py-1 text-[13px] tracking-[0.12em] transition-all duration-200 ${
                  activeMenu === menu.id
                    ? "bg-white/20 text-white shadow-[0_8px_24px_rgba(255,255,255,0.12)]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                } ${menu.id === "finder" ? "font-bold" : "font-normal"}`}
              >
                {menu.label}
              </button>
              <div
                onClick={(event) => event.stopPropagation()}
                className={`absolute left-0 top-full mt-2 w-60 origin-top overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 ${
                  activeMenu === menu.id
                    ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none -translate-y-2 scale-[0.97] opacity-0"
                }`}
              >
                <div className="border-b border-white/10 bg-gradient-to-r from-cyan-400/15 via-sky-400/10 to-transparent px-3 py-2 text-[10px] uppercase tracking-[0.32em] text-cyan-100/80">
                  {menu.label} menu
                </div>
                <div className="space-y-1 p-1.5">
                  {menu.items.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        item.onSelect();
                        setActiveMenu(null);
                      }}
                      className="group flex w-full items-center gap-2 rounded-xl border border-transparent px-2 py-2 text-left transition-all duration-200 hover:border-cyan-400/30 hover:bg-white/10"
                    >
                      <span className={`flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-sm ${item.accent ?? "text-cyan-100"}`}>
                        {item.icon}
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-white">{item.label}</span>
                      </span>
                      <span className="text-[11px] text-white/35 transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
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
          <span className="inline-flex items-center justify-center">
            <img src="/charging.png" alt="Battery" className="h-7.5 w-8 object-contain" />
          </span>
          <span ref={wifiRef} className="relative inline-flex h-4 w-8 items-center justify-center">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setWifiOpen((prev) => !prev);
                setSoundOpen(false);
              }}
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/15"
            >
              <img src="/wifi.png" alt="Wi-Fi" className="h-4 w-4" />
            </button>
            {wifiOpen ? (
              <div onMouseDown={(e) => e.stopPropagation()} className="absolute right-0 top-full z-50 mt-2 w-52 rounded-[24px] border border-slate-200/60 bg-white/95 p-3 text-left text-sm text-slate-900 shadow-[0_20px_45px_rgba(15,23,42,0.18)] backdrop-blur-md">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold">Wi-Fi</span>
                  <span className="rounded-full bg-slate-900 px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-white">Connected</span>
                </div>
                <div className="rounded-3xl border border-slate-200/70 bg-slate-50 p-3 shadow-sm">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
                    <span>Ocean Network</span>
                    <span className="text-[11px] text-slate-500">4 bars</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-600">Status: Connected</div>
                </div>
              </div>
            ) : null}
          </span>
          <span ref={soundRef} className="relative inline-flex h-4 w-8 items-center justify-center">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSoundOpen((prev) => !prev);
                setWifiOpen(false);
              }}
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/15"
            >
              <img src="/sound.png" alt="Sound" className="h-4 w-4" />
            </button>
            {soundOpen ? (
              <div onMouseDown={(e) => e.stopPropagation()} className="absolute right-0 top-full z-50 mt-2 w-52 rounded-[24px] border border-slate-200/60 bg-white/95 p-3 text-left text-sm text-slate-900 shadow-[0_20px_45px_rgba(15,23,42,0.18)] backdrop-blur-md">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold">Sound</span>
                  <span className="text-[11px] text-slate-500">Playing</span>
                </div>
                <div className="rounded-3xl border border-slate-200/70 bg-slate-50 p-3 shadow-sm">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
                    <span>Ocean Speakers</span>
                    <span className="text-[11px] text-slate-500">80%</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-600">Output: Center</div>
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
        <span className={`${theme === "midnight" ? "text-white/80" : "text-white/70"}`}>{currentDate}</span>
        <span className={`${theme === "midnight" ? "text-white" : "text-white/90"}`}>{currentTime}</span>
      </div>
    </div>
  );
}

export default function Desktop() {
  const [booting, setBooting] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [shutdownOverlayVisible, setShutdownOverlayVisible] = useState(false);
  const [shutdownOverlayActive, setShutdownOverlayActive] = useState(false);
  const [wifiOpen, setWifiOpen] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const [userIp, setUserIp] = useState("Loading...");
  const [wifiStatus, setWifiStatus] = useState({ connected: true, ssid: "Ocean Network", strength: 4 });
  const [wifiConnecting, setWifiConnecting] = useState(false);
  const [soundVolume, setSoundVolume] = useState(80);
  const [soundMuted, setSoundMuted] = useState(false);
  const [soundDevice, setSoundDevice] = useState("Ocean Speakers");
  const wifiRef = useRef<HTMLDivElement | null>(null);
  const soundRef = useRef<HTMLDivElement | null>(null);
  const wifiConnectTimer = useRef<number | null>(null);

  const apps = useDesktopStore((state) => state.apps);
  const { openApp, closeApp, focusApp, minimizeApp, updateAppPosition } = useDesktopStore();
  const wallpaper = useDesktopStore((state) => state.wallpaper);
  const installedApps = useDesktopStore((state) => state.installedApps);
  const soundEffects = useDesktopStore((state) => state.soundEffects);
  const reducedMotion = useDesktopStore((state) => state.reducedMotion);

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
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const year = now.getFullYear();

      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
      );
      setCurrentDate(`${month}/${day}/${year}`);
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.ipify.org?format=json", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setUserIp(data.ip || "Unknown"))
      .catch(() => setUserIp("Unknown"));

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (wifiOpen && wifiRef.current && !wifiRef.current.contains(target)) {
        setWifiOpen(false);
      }
      if (soundOpen && soundRef.current && !soundRef.current.contains(target)) {
        setSoundOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wifiOpen, soundOpen]);

  useEffect(() => {
    return () => {
      if (wifiConnectTimer.current) {
        window.clearTimeout(wifiConnectTimer.current);
      }
    };
  }, []);

  const appCatalog = [
    { id: "about", name: "About", keywords: ["about", "info", "profile"], onOpen: () => openApp('about') },
    { id: "music", name: "Music", keywords: ["music", "audio", "player", "songs"], onOpen: () => openApp('music') },
    { id: "gallery", name: "Gallery", keywords: ["gallery", "photos", "images", "pictures"], onOpen: () => openApp('gallery') },
    { id: "settings", name: "Settings", keywords: ["settings", "config", "preferences"], onOpen: () => openApp('settings') },
    { id: "camera", name: "Camera", keywords: ["camera", "photo", "cam"], onOpen: () => openApp('camera') },
    { id: "shell", name: "Ocean Shell", keywords: ["shell", "terminal", "command", "console"], onOpen: () => openApp('shell') },
    { id: "wiki", name: "Web Browser", keywords: ["browser", "web", "wiki", "internet"], onOpen: () => openApp('wiki') },
    { id: "notes", name: "Notes", keywords: ["notes", "text", "memo", "write"], onOpen: () => openApp('notes') },
    { id: "calculator", name: "Calculator", keywords: ["calculator", "math", "sum"], onOpen: () => openApp('calculator') },
    { id: "doom", name: "TikTok", keywords: ["tik", "tok", "doom", "video", "app"], onOpen: () => openApp('doom') },
    { id: "store", name: "App Store", keywords: ["store", "app", "install"], onOpen: () => openApp('store') },
    { id: "calendar", name: "Calendar", keywords: ["calendar", "schedule", "date"], onOpen: () => openApp('calendar') },
    { id: "weather", name: "Weather", keywords: ["weather", "forecast", "temperature"], onOpen: () => openApp('weather') },
    { id: "files", name: "Files", keywords: ["files", "finder", "documents"], onOpen: () => openApp('files') },
  ];

  const filteredApps = searchQuery.trim()
    ? appCatalog.filter((app) => {
        const haystack = `${app.name} ${app.keywords.join(" ")}`.toLowerCase();        
        return (
          installedApps.includes(app.id) && haystack.includes(searchQuery.trim().toLowerCase())
        );
      })
    : appCatalog;

  const desktopApps = appCatalog.filter((app) => installedApps.includes(app.id));
  const [bottomBarOrder, setBottomBarOrder] = useState<string[]>(installedApps);
  const [draggedApp, setDraggedApp] = useState<string | null>(null);
  const [dragOverApp, setDragOverApp] = useState<string | null>(null);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [bottomBarSearchQuery, setBottomBarSearchQuery] = useState("");
  const [bottomBarLauncherOpen, setBottomBarLauncherOpen] = useState(false);
  const [bottomBarLauncherClosing, setBottomBarLauncherClosing] = useState(false);
  const [bottomBarLauncherQuery, setBottomBarLauncherQuery] = useState("");

  useEffect(() => {
    setBottomBarOrder((currentOrder) => {
      const ordered = currentOrder.filter((id) => installedApps.includes(id));
      const missing = installedApps.filter((id) => !ordered.includes(id));
      return [...ordered, ...missing];
    });
  }, [installedApps]);

  useEffect(() => {
    if (!activeAppId) return;
    const activeApp = apps.find((app) => app.id === activeAppId);
    if (!activeApp || !activeApp.isOpen) {
      setActiveAppId(null);
    }
  }, [apps, activeAppId]);

  const shouldShowResults = searchFocused && searchQuery.trim().length > 0;
  const bottomBarSearchResults = bottomBarSearchQuery.trim()
    ? appCatalog.filter((app) => {
        const haystack = `${app.name} ${app.keywords.join(" ")}`.toLowerCase();
        return installedApps.includes(app.id) && haystack.includes(bottomBarSearchQuery.trim().toLowerCase());
      })
    : appCatalog.filter((app) => installedApps.includes(app.id)).slice(0, 6);
  const bottomBarLauncherResults = bottomBarLauncherQuery.trim()
    ? appCatalog.filter((app) => {
        const haystack = `${app.name} ${app.keywords.join(" ")}`.toLowerCase();
        return installedApps.includes(app.id) && haystack.includes(bottomBarLauncherQuery.trim().toLowerCase());
      })
    : appCatalog.filter((app) => installedApps.includes(app.id)).slice(0, 8);

  const handleSelectApp = (appId: string) => {
    setSelectedApp(appId);
  };

  const playSystemSound = (frequency: number) => {
    if (!soundEffects || typeof window === "undefined") return;

    const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return;

    const context = new AudioContextCtor();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.04, context.currentTime + 0.08);

    gainNode.gain.setValueAtTime(0.0001, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.05, context.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.22);
    context.close().catch(() => undefined);
  };

  const handleBottomBarClick = (appId: string) => {
    setSelectedApp(appId);
    setActiveAppId(appId);
    const appState = apps.find((app) => app.id === appId);

    if (!appState) return;

    if (appState.isOpen && !appState.isMinimized) {
      playSystemSound(420);
      minimizeApp(appId);
      return;
    }

    if (appState.isOpen && appState.isMinimized) {
      playSystemSound(520);
      useDesktopStore.getState().restoreApp(appId);
      return;
    }

    playSystemSound(560);
    openApp(appId);
  };

  const handleDragStart = (event: React.DragEvent<HTMLButtonElement>, appId: string) => {
    setDraggedApp(appId);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", appId);
  };

  const handleDragOver = (event: React.DragEvent<HTMLButtonElement>, appId: string) => {
    event.preventDefault();
    setDragOverApp(appId);
  };

  const handleDragLeave = () => {
    setDragOverApp(null);
  };

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>, appId: string) => {
    event.preventDefault();
    const sourceId = draggedApp ?? event.dataTransfer.getData("text/plain");
    if (!sourceId || sourceId === appId) {
      setDraggedApp(null);
      setDragOverApp(null);
      return;
    }

    setBottomBarOrder((order) => {
      const next = [...order];
      const sourceIndex = next.indexOf(sourceId);
      const targetIndex = next.indexOf(appId);
      if (sourceIndex === -1 || targetIndex === -1) return next;
      next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, sourceId);
      return next;
    });
    setDraggedApp(null);
    setDragOverApp(null);
  };

  const handleLaunchApp = (app: (typeof appCatalog)[number]): void => {
    app.onOpen();
    setSearchQuery("");
    setBottomBarSearchQuery("");
    setBottomBarLauncherQuery("");
    setBottomBarLauncherOpen(false);
    setSelectedApp(app.id);
    setActiveAppId(app.id);
  };

  const handleBottomBarSearchSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const firstMatch = bottomBarSearchResults[0];
    if (firstMatch) {
      handleLaunchApp(firstMatch);
    }
  };

  const closeBottomBarLauncher = () => {
    setBottomBarLauncherClosing(true);
    window.setTimeout(() => {
      setBottomBarLauncherOpen(false);
      setBottomBarLauncherClosing(false);
    }, 220);
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
        useDesktopStore.getState().openApp('shell');
        break;
      case "settings":
        useDesktopStore.getState().openApp('settings');
        break;
      case "files":
        useDesktopStore.getState().openApp('files');
        break;
      case "store":
        useDesktopStore.getState().openApp('store');
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
    midnight: "/midnight.jpg",
    sunset: "/sunset.jpg",
  };

  const theme = useDesktopStore((state) => state.theme);
  const themeClasses: Record<typeof theme, string> = {
    ocean: "bg-gradient-to-b from-blue-500 to-blue-700",
    midnight: "bg-gradient-to-b from-gray-900 to-gray-800",
    sunset: "bg-gradient-to-b from-orange-500 to-pink-500",
  };
  const bottomBarThemeClasses: Record<typeof theme, Record<string, string>> = {
    ocean: {
      root: "border-cyan-500/25 bg-slate-100/95 text-slate-900 shadow-[0_-12px_34px_rgba(14,116,144,0.16)]",
      button: "border-cyan-400/20 bg-white/90 text-slate-900 hover:bg-cyan-50",
      search: "border-cyan-400/20 bg-gradient-to-r from-white/95 to-cyan-50/90 text-slate-900",
      accent: "bg-cyan-500",
      icon: "text-slate-900",
    },
    midnight: {
      root: "border-slate-700/70 bg-slate-900/95 text-white shadow-[0_-12px_34px_rgba(2,8,23,0.34)]",
      button: "border-slate-600/70 bg-slate-800/85 text-white hover:bg-slate-700",
      search: "border-slate-600/70 bg-gradient-to-r from-slate-800/95 to-slate-700/95 text-white",
      accent: "bg-cyan-400",
      icon: "text-white",
    },
    sunset: {
      root: "border-orange-400/30 bg-orange-50/95 text-slate-900 shadow-[0_-12px_34px_rgba(249,115,22,0.18)]",
      button: "border-orange-300/50 bg-white/90 text-slate-900 hover:bg-orange-100",
      search: "border-orange-300/50 bg-gradient-to-r from-white/95 to-orange-100/90 text-slate-900",
      accent: "bg-orange-500",
      icon: "text-slate-900",
    },
  };
  const bottomBarClasses = bottomBarThemeClasses[theme];

  return (
    <>
      <style jsx global>{`
        @keyframes launcherBackdropOpen {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes launcherBackdropClose {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes launcherRiseOpen {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes launcherRiseClose {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
        }

        .launcher-overlay {
          animation: launcherBackdropOpen 220ms ease-out both;
        }

        .launcher-overlay.closing {
          animation: launcherBackdropClose 220ms ease-in both;
        }

        .launcher-panel {
          animation: launcherRiseOpen 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
          transform-origin: left bottom;
        }

        .launcher-panel.closing {
          animation: launcherRiseClose 220ms cubic-bezier(0.22, 1, 0.36, 1) both;
          transform-origin: left bottom;
        }

        .launcher-overlay.reduced-motion,
        .launcher-overlay.reduced-motion.closing,
        .launcher-panel.reduced-motion,
        .launcher-panel.reduced-motion.closing {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>

      {booting && <BootScreen onFinish={() => setBooting(false)} />}
      {!booting && <Guide />}

        <main
          className={`w-screen h-screen bg-cover bg-center relative overflow-hidden ${theme ? themeClasses[theme] : ''}`}
          style={{
            backgroundImage: `url('${wallpaperMap[wallpaper]}')`,
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            setContextMenu({ x: event.clientX, y: event.clientY });
          }}
          onClick={() => {
            setSelectedApp(null);
          }}
        >
        <TopBar currentTime={currentTime} currentDate={currentDate} onShutdown={handleShutdown} theme={theme} />
        <div id="widgets-container" className="pointer-events-none absolute inset-0">
          <div className="pointer-events-auto"> <ClockWidget currentTime={currentTime} currentDate={currentDate} />
            <WeatherWidget />
          </div>
        </div>

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
          <div id="search-bar" className="pointer-events-auto w-full max-w-[560px] rounded-2xl border border-white/15 bg-slate-950/70 p-2 shadow-[0_16px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
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

        <div
          id="desktop-grid"
          className="pointer-events-auto absolute left-8 top-[46px] right-8 bottom-[72px] overflow-auto pb-8 pt-4"
          style={{ columnWidth: "140px", columnGap: "0.19rem", columnFill: "auto" }}
        >
          {desktopApps.map((app) => {
            const isSelected = selectedApp === app.id;
            return (
              <button
                key={app.id}
                id={`${app.id}-desktop-icon`}
                type="button"
                onPointerDown={(event) => event.preventDefault()}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleSelectApp(app.id);
                }}
                onDoubleClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleLaunchApp(app);
                }}
                className={`group relative inline-flex w-full max-w-[140px] flex-col items-center gap-1 rounded-xl px-1 py-1 text-white transition break-inside-avoid ${isSelected ? "opacity-80 border border-blue-500 bg-white/5" : "opacity-100"}`}
              >
                <div className="relative flex h-18 w-18 items-center justify-center rounded-2xl bg-transparent">
                  <img src={appIcons[app.id]} alt={`${app.name} icon`} className="h-14 w-14 object-contain" />
                  {isSelected ? (
                    <span className="absolute left-0 top-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white shadow-lg">
                      ✓
                    </span>
                  ) : null}
                </div>
                <span className="text-xs font-medium text-white">{app.name}</span>
              </button>
            );
          })}
        </div>

        <div id="bottom-bar" className={`pointer-events-auto fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between overflow-visible border-t px-3 py-2 backdrop-blur-sm ${bottomBarClasses.root}`}>
          <div className="flex min-w-[260px] items-center gap-1.5">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                if (bottomBarLauncherOpen) {
                  closeBottomBarLauncher();
                } else {
                  setBottomBarLauncherOpen(true);
                  setBottomBarLauncherClosing(false);
                }
              }}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border shadow-[0_6px_16px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 ${bottomBarClasses.button}`}
              aria-label="Open launcher"
            >
              <img src="/open.webp" alt="Open" className={`h-5 w-5 ${theme === "midnight" ? "brightness-0 invert" : ""}`} />
            </button>
            <div className="relative">
              <div className={`flex items-center rounded-2xl border px-2.5 py-1.5 shadow-[0_6px_16px_rgba(15,23,42,0.10)] ${bottomBarClasses.search}`}>
                <span className={`mr-1.5 text-sm ${bottomBarClasses.icon}`}>🔎</span>
                <input
                  type="text"
                  value={bottomBarSearchQuery}
                  onChange={(event) => setBottomBarSearchQuery(event.target.value)}
                  onKeyDown={handleBottomBarSearchSubmit}
                  placeholder="Search apps"
                  className={`w-40 bg-transparent py-1 text-sm outline-none placeholder:opacity-70 ${theme === "midnight" ? "text-white placeholder:text-white/70" : bottomBarClasses.icon}`}
                />
              </div>
              {bottomBarSearchQuery.trim().length > 0 && bottomBarSearchResults.length > 0 ? (
                <div className="absolute bottom-full left-0 mb-2 w-[220px] rounded-2xl border border-slate-200/70 bg-white/95 p-2 shadow-2xl">
                  {bottomBarSearchResults.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => handleLaunchApp(app)}
                      className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-sm text-slate-800 transition hover:bg-slate-100"
                    >
                      <span>{app.name}</span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Open</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-1 justify-center gap-2 overflow-x-auto px-1">
            {bottomBarOrder.map((appId) => {
              const appItem = appCatalog.find((item) => item.id === appId);
              const appState = apps.find((app) => app.id === appId);
              const isActive = !!appState?.isOpen && !appState?.isMinimized;
              const isMinimized = !!appState?.isOpen && !!appState?.isMinimized;
              const isDragging = draggedApp === appId;
              const isDragOver = dragOverApp === appId;

              if (!appItem) return null;
              return (
                <button
                  key={appId}
                  type="button"
                  draggable
                  onDragStart={(event) => handleDragStart(event, appId)}
                  onDragOver={(event) => handleDragOver(event, appId)}
                  onDragLeave={handleDragLeave}
                  onDrop={(event) => handleDrop(event, appId)}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleBottomBarClick(appId);
                  }}
                  className={`relative flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-200 ease-out active:shadow-inner ${bottomBarClasses.button} ${isDragging ? "scale-105 shadow-xl" : "shadow-sm"} ${isDragOver && !isDragging ? "scale-105" : ""}`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-9 w-9 items-center justify-center">
                      <img src={appIcons[appId]} alt={`${appItem.name} icon`} className="h-9 w-9 object-contain" />
                    </div>
                    <span className={`h-1 w-6 rounded-full transition ${isActive ? bottomBarClasses.accent : isMinimized ? "bg-slate-400" : "bg-transparent"}`} />
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            {bottomBarLauncherOpen || bottomBarLauncherClosing ? (
              <div className={`launcher-overlay fixed inset-0 z-[70] flex items-end justify-start bg-transparent p-4 ${bottomBarLauncherClosing ? "closing" : ""} ${reducedMotion ? "reduced-motion" : ""}`} onClick={() => closeBottomBarLauncher()}>
                <div className={`launcher-panel ml-2 w-full max-w-[760px] rounded-[32px] border border-white/15 bg-slate-950 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] ${bottomBarLauncherClosing ? "closing" : ""} ${reducedMotion ? "reduced-motion" : ""}`} onClick={(event) => event.stopPropagation()}>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.32em] text-cyan-300/70">Windows-style launcher</div>
                      <div className="text-lg font-semibold text-white">Open apps</div>
                    </div>
                    <button type="button" onClick={() => closeBottomBarLauncher()} className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/80 transition hover:bg-white/15">Close</button>
                  </div>
                  <div className="mt-4 flex items-center rounded-2xl border border-white/10 bg-white/10 px-3 py-2">
                    <span className="mr-2 text-white/70">🔎</span>
                    <input
                      type="text"
                      value={bottomBarLauncherQuery}
                      onChange={(event) => setBottomBarLauncherQuery(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && bottomBarLauncherResults[0]) {
                          event.preventDefault();
                          handleLaunchApp(bottomBarLauncherResults[0]);
                        }
                      }}
                      placeholder="Search and launch apps"
                      className="w-full bg-transparent py-1 text-sm text-white outline-none placeholder:text-white/45"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {bottomBarLauncherResults.map((app) => (
                      <button key={app.id} type="button" onClick={() => handleLaunchApp(app)} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-3 py-3 text-left text-sm text-white/80 transition hover:-translate-y-0.5 hover:bg-white/20">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/70 text-lg shadow-inner">
                          <img src={appIcons[app.id]} alt={app.name} className="h-8 w-8" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{app.name}</div>
                          <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">Launch</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
            <div ref={wifiRef} className="relative">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setWifiOpen((prev) => !prev);
                  setSoundOpen(false);
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-slate-900 transition hover:bg-white/20"
                aria-label="Wi-Fi"
              >
                <img src="/wifi.png" alt="Wi-Fi" className="h-5 w-5" />
              </button>
              {wifiOpen ? (
                <div onMouseDown={(e) => e.stopPropagation()} className="absolute right-0 bottom-full z-50 mb-3 w-64 rounded-[28px] border border-slate-200/70 bg-gradient-to-br from-white/95 via-slate-100/90 to-slate-200/85 p-4 text-sm text-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.25)] backdrop-blur-md">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-white">Wi</span>
                      Wi-Fi
                    </div>
                    <span className="rounded-full bg-cyan-500 px-2 py-1 text-[11px] uppercase tracking-[0.25em] text-white">Connected</span>
                  </div>
                  <div className="rounded-3xl border border-slate-300/70 bg-white/90 p-3 shadow-sm">
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
                      <span>{wifiStatus.ssid}</span>
                      <span className="text-[11px] text-slate-500">{wifiStatus.strength} bars</span>
                    </div>
                    <div className="mt-2 text-[12px] text-slate-600">Connected to the network with a solid signal.</div>
                    <div className="mt-3 text-[12px] text-slate-600">IP: {userIp}</div>
                  </div>
                  <div className="mt-3 rounded-3xl bg-slate-950/5 p-3 text-[12px] text-slate-700">
                    <div className="mb-2 font-semibold text-slate-900">Available networks</div>
                    {[
                      { ssid: "Ocean Network", strength: 4 },
                      { ssid: "Coastal Guest", strength: 3 },
                      { ssid: "Beach Cafe", strength: 2 },
                      { ssid: "Starboard Hub", strength: 1 },
                    ].map((network) => (
                      <button
                        key={network.ssid}
                        type="button"
                        onClick={() => {
                          if (network.ssid === wifiStatus.ssid || wifiConnecting) return;
                          setWifiConnecting(true);
                          if (wifiConnectTimer.current) {
                            window.clearTimeout(wifiConnectTimer.current);
                          }
                          wifiConnectTimer.current = window.setTimeout(() => {
                            setWifiStatus({ connected: true, ssid: network.ssid, strength: network.strength });
                            setWifiConnecting(false);
                            wifiConnectTimer.current = null;
                          }, 1400);
                        }}
                        className="flex w-full items-center justify-between rounded-2xl border border-slate-200/70 bg-white/90 px-3 py-2 text-left transition hover:border-cyan-400/70 hover:bg-cyan-50"
                      >
                        <div>
                          <div className="font-medium text-slate-900">{network.ssid}</div>
                          <div className="text-[11px] text-slate-500">{network.strength} bars</div>
                        </div>
                        <span className="text-[11px] text-slate-600">
                          {network.ssid === wifiStatus.ssid ? "Connected" : wifiConnecting ? "Connecting..." : "Connect"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div ref={soundRef} className="relative">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSoundOpen((prev) => !prev);
                  setWifiOpen(false);
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-slate-900 transition hover:bg-white/20"
                aria-label="Sound"
              >
                <img src="/sound.png" alt="Sound" className="h-5 w-5" />
              </button>
              {soundOpen ? (
                <div onMouseDown={(e) => e.stopPropagation()} className="absolute right-0 bottom-full mb-3 w-56 rounded-[28px] border border-slate-200/60 bg-gradient-to-br from-white/90 via-slate-100/85 to-slate-200/80 p-4 text-sm text-slate-900 shadow-[0_30px_70px_rgba(15,23,42,0.18)] backdrop-blur-md">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900 text-white">Sd</span>
                      Sound
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Active</span>
                  </div>
                  <div className="rounded-3xl border border-slate-300/60 bg-white/90 p-3 shadow-sm">
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
                      <span>{soundDevice}</span>
                      <span className="text-[11px] text-slate-500">{soundMuted ? "Muted" : `${soundVolume}%`}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setSoundMuted((s) => !s); }}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-900"
                        aria-label="Toggle mute"
                      >
                        {soundMuted ? "🔇" : "🔊"}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={soundVolume}
                        onChange={(e) => setSoundVolume(Number((e.target as HTMLInputElement).value))}
                        className="w-full"
                        aria-label="Volume"
                      />
                    </div>
                    <div className="mt-3 flex items-center gap-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 w-6 rounded ${i < Math.round((soundVolume / 100) * 10) && !soundMuted ? "bg-cyan-500" : "bg-slate-200/60"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 grid gap-2 text-[11px] text-slate-600">
                    <div className="flex items-center justify-between text-slate-700"><span>Output</span><span>{soundDevice}</span></div>
                    <div className="flex items-center justify-between text-slate-700"><span>Balance</span><span>Center</span></div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-center text-slate-900">
              <img src="/charging.png" alt="Battery" className="h-7.5 w-8 object-contain" />
            </div>
            <div className={`flex flex-col items-end text-right ${theme === "midnight" ? "text-white" : "text-slate-900"}`}>
              <span className="text-base font-semibold tracking-tight">{currentTime}</span>
              <span className={`text-[12px] ${theme === "midnight" ? "text-white/70" : "text-slate-700"}`}>{currentDate}</span>
            </div>
          </div>
        </div>

        {apps.map((app) => {
          const App = appMap[app.id]?.component;
          if (!App) return null;
          return (
            <Window
              key={app.id}
              title={appMap[app.id].title}
              dockId={`${app.id}-desktop-icon`}
              windowId={`${app.id}-window`}
              isOpen={app.isOpen}
              isMinimized={app.isMinimized}
              onClose={() => closeApp(app.id)}
              onMinimize={() => minimizeApp(app.id)}
              zIndex={app.zIndex}
              onFocus={() => focusApp(app.id)}
              width={appMap[app.id].width}
              height={appMap[app.id].height}
              position={app.position}
              onPositionChange={(newPos) => updateAppPosition(app.id, newPos)}
            >
              <App />
            </Window>
          );
        })}
      </main>
    </>
  );
}