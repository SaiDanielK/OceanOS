"use client";

import { useState } from "react";

const videoList = [
  "/videos/one.mp4",
  "/videos/two.mp4",
  "/videos/three.mp4",
];

export default function Doom() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const goToVideo = (direction: -1 | 1) => {
    setCurrentIndex((prev) => {
      return (prev + direction + videoList.length) % videoList.length;
    });
  };

  const currentVideo = videoList[currentIndex];

  return (
    <div className="h-full w-full overflow-hidden text-white">
      <div className="relative h-full bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_40%)]" />
        <div className="absolute inset-0 bg-black/75" />

        <div className="absolute inset-x-0 top-4 flex items-center justify-between px-4">
          <div className="rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
            OceanOS TikTok Clips
          </div>
          <div className="rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
            {currentIndex + 1}/{videoList.length}
          </div>
        </div>

        <div className="absolute inset-x-6 inset-y-16 rounded-[40px] border border-white/10 bg-black/60 shadow-2xl">
          <div className="relative h-full overflow-hidden rounded-[40px]">
            <video
              key={currentVideo}
              src={currentVideo}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/40" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="rounded-3xl bg-black/60 p-4 text-sm">
                <p className="text-white/80">@Jokester131🤣</p>
                <p className="mt-2 text-lg font-semibold">
                  OceanOS #doomsday #tiktok #😂
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-6 top-1/2 flex w-12 -translate-y-1/2 flex-col items-center gap-4">
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className="h-12 w-12 rounded-3xl border border-white/10 bg-white/10 text-xl transition hover:bg-white/20"
            aria-label={isMuted ? "Mute video" : "Unmute video"}
          >
            {isMuted ? "🔈" : "🔊"}
          </button>
          <button className="h-12 w-12 rounded-3xl border border-white/10 bg-white/10 text-xl">
            ♡
          </button>
          <button className="h-12 w-12 rounded-3xl border border-white/10 bg-white/10 text-xl">
            ↻
          </button>
          <button className="h-12 w-12 rounded-3xl border border-white/10 bg-white/10 text-xl">
            💬
          </button>
          <button className="h-12 w-12 rounded-3xl border border-white/10 bg-white/10 text-xl">
            ⤴
          </button>
          <button
            onClick={() => goToVideo(-1)}
            className="h-12 w-12 rounded-3xl border border-white/10 bg-white/10 text-xl transition hover:bg-white/20"
            aria-label="Scroll up"
          >
            ↑
          </button>
          <button
            onClick={() => goToVideo(1)}
            className="h-12 w-12 rounded-3xl border border-white/10 bg-white/10 text-xl transition hover:bg-white/20"
            aria-label="Scroll down"
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
}
