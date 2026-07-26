"use client";

import { useEffect, useRef, useState } from "react";

type BootScreenProps = {
  onFinish: () => void;
};

const steps = [
  { progress: 4, delay: 450, text: "Loading kernel..." },
  { progress: 12, delay: 600, text: "Initializing hardware..." },
  { progress: 21, delay: 500, text: "Mounting virtual filesystem..." },
  { progress: 34, delay: 900, text: "Starting Ocean Services..." },
  { progress: 47, delay: 700, text: "Loading Ocean UI..." },
  { progress: 59, delay: 900, text: "Preparing desktop..." },
  { progress: 74, delay: 700, text: "Connecting Ocean Shell..." },
  { progress: 87, delay: 800, text: "Launching applications..." },
  { progress: 96, delay: 700, text: "Optimizing workspace..." },
  { progress: 100, delay: 500, text: "Welcome." },
];

const bootLogs = [
  "[ OK ] Kernel loaded",
  "[ OK ] OceanFS mounted",
  "[ OK ] Network initialized",
  "[ OK ] Ocean UI ready",
  "[ OK ] Desktop compositor running",
  "[ OK ] User session started",
];

export default function BootScreen({ onFinish }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(steps[0].text);
  const [logs, setLogs] = useState<string[]>([]);
  const [exiting, setExiting] = useState(false);
  const [started, setStarted] = useState(false);

  const timers = useRef<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!started) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.play().catch((err) => console.error("Audio play failed:", err));

    let total = 0;

    steps.forEach((step, index) => {
      total += step.delay;

      timers.current.push(
        window.setTimeout(() => {
          setProgress(step.progress);
          setMessage(step.text);

          if (bootLogs[index]) {
            setLogs((prev) => [...prev, bootLogs[index]]);
          }

          if (index === steps.length - 1) {
            setExiting(true);

            timers.current.push(
              window.setTimeout(() => {
                onFinish();
              }, 900)
            );
          }
        }, total)
      );
    });

    return () => {
      timers.current.forEach(clearTimeout);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [onFinish, started]);

  const handleStart = () => {
    if (started) return;
    setStarted(true);
  };

  useEffect(() => {
    audioRef.current = new Audio("/startup.mp3");
    audioRef.current.volume = 0.45;
  }, []);

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-cover bg-center
        transition-opacity duration-1000
        ${exiting ? "opacity-0 scale-105" : "opacity-100"}
      `}
      style={{
        backgroundImage: "url('/ocean.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {!started && (
        <div
          className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center text-center text-white"
          onClick={handleStart}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleStart()}
        >
          <div className="animate-pulse">
            <div className="mb-6 flex h-24 w-24 items-center justify-center ml-18 rounded-full bg-cyan-400/20 shadow-[0_0_60px_rgba(56,189,248,.5)]">
              <span className="text-5xl">🌊</span>
            </div>
            <h1 className="text-5xl font-semibold tracking-wide">Ocean OS</h1>
            <p className="mt-4 text-lg text-white/70">
              Click anywhere to start
            </p>
            <div className="mt-8 text-sm text-white/60">
              💻 Best experienced in fullscreen (F11)
            </div>
          </div>
        </div>
      )}

      {started && (
      <div className="relative w-[720px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-10">

        <div className="flex flex-col items-center">

          <div className="mb-6 h-24 w-24 rounded-full bg-cyan-400/20 flex items-center justify-center animate-pulse shadow-[0_0_60px_rgba(56,189,248,.5)]">
            <span className="text-5xl">🌊</span>
          </div>

          <h1 className="text-5xl font-semibold tracking-wide text-white">
            Ocean OS
          </h1>

          <p className="mt-2 text-white/60 text-lg">
            {message}
          </p>

          <div className="mt-8 w-full">

            <div className="mb-2 flex justify-between text-white/60 text-sm font-mono">
              <span>System Boot</span>
              <span>{progress}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 transition-all duration-700 ease-out"
                style={{
                  width: `${progress}%`,
                  boxShadow:
                    "0 0 20px rgba(56,189,248,.9),0 0 50px rgba(37,99,235,.6)",
                }}
              />
            </div>
          </div>

          <div className="mt-8 h-40 w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-sm text-green-400">
            {logs.map((log, i) => (
              <div
                key={i}
                className="animate-[fadeIn_.4s_ease]"
              >
                {log}
              </div>
            ))}

            <span className="animate-pulse">▋</span>
          </div>

          <div className="mt-8 text-center text-xs tracking-wider text-white/40">
            OCEAN OS v2.0 (Updating to 3.0 Beta Soon!) • BUILD 2607
          </div>

          <div className="mt-4 text-sm text-white/60">
            💻 Best experienced in fullscreen (F11)
          </div>
        </div>
      </div>
      )}
    </div>
  );
}