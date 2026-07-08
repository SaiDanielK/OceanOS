"use client";

import { useEffect, useState } from "react";

type BootScreenProps = {
  onFinish: () => void;
};

export default function BootScreen({ onFinish }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [message, setMessage] = useState("Loading kernel...");
  const checkpoints = [
    { progress: 6, delay: 400 },
    { progress: 15, delay: 700 },
    { progress: 28, delay: 500 },
    { progress: 39, delay: 1200 },
    { progress: 55, delay: 600 },
    { progress: 68, delay: 1400 },
    { progress: 82, delay: 800 },
    { progress: 93, delay: 1200 },
    { progress: 98, delay: 900 },
    { progress: 100, delay: 300 },
  ];
  const messages = [
    "Loading kernel...",
    "Initializing Ocean UI...",
    "Preparing desktop...",
    "Starting applications...",
    "Loading system services...",
    "Optimizing workspace...",
    "Connecting Ocean Shell...",
    "Finalizing startup...",
    "Almost ready...",
    "Welcome."
  ];  

  useEffect(() => {
    const audio = new Audio("/startup.mp3");

    audio.volume = 0.5;

    audio.play().catch(() => {
    });

    let index = 0;

    const nextStep = () => {
      if (index >= checkpoints.length) {
        setExiting(true);

        setTimeout(() => {
          onFinish();
        }, 700);

        return;
      }

      setProgress(checkpoints[index].progress);

      setMessage(
        messages[Math.min(index, messages.length - 1)]
      );

      setTimeout(() => {
        index++;
        nextStep();
      }, checkpoints[index].delay);
      
      setTimeout(() => {
        audio.play().catch(() => {});
      }, 250);
    };

    nextStep();
  }, [onFinish]);

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        flex flex-col items-center justify-center
        text-white
        bg-cover bg-center
        transition-transform duration-700 ease-in-out
        ${exiting ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}
      `}
      style={{
        backgroundImage: "url('/ocean.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex flex-col items-center gap-6 w-[600px]">
        <h1 className="text-5xl font-semibold tracking-wide drop-shadow-xl">
          Starting Ocean-OS
        </h1>
        <p
          className="
            text-lg
            text-white/70
            transition-opacity
            duration-500
          "
        >
          {message}
        </p>

        <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden border border-white/10">
          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-cyan-400
              via-sky-400
              to-blue-600
              transition-all
              duration-500
              ease-out
            "
            style={{ width: `${progress}%`, boxShadow: "0 0 15px rgba(56,189,248,.8), 0 0 35px rgba(59,130,246,.6)", }}
          />
        </div>

        <p className="text-xs text-white/70">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}