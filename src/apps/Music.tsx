"use client";

import { useEffect, useRef, useState } from "react";
import { useDesktopStore } from "@/store/desktopStore";

const songs = [
  {
    title: "Go Big or Go Home",
    artist: "Enhypen",
    file: "/music/bighome.mp3",
    cover: "/covers/bighome.jpg",
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    file: "/music/BlindingLights.mp3",
    cover: "/covers/BlindingLights.jpg",
  },
  {
    title: "Fever",
    artist: "Enhypen",
    file: "/music/fever.mp3",
    cover: "/covers/fever.jpg",
  },
  {
    title: "GO",
    artist: "Cortis",
    file: "/music/go.mp3",
    cover: "/covers/go.jpg",
  },
  {
    title: "Golden Hour",
    artist: "JVKE",
    file: "/music/GoldenHour.mp3",
    cover: "/covers/GoldenHour.jpg",
  },
  {
    title: "Brought the Heat Back",
    artist: "Enhypen",
    file: "/music/heat.mp3",
    cover: "/covers/heat.jpg",
  },
  {
    title: "I Like Me Better",
    artist: "Lauv",
    file: "/music/likemebetter.mp3",
    cover: "/covers/likemebetter.jpg",
  },
  {
    title: "Sunflower",
    artist: "Post Malone & Swae Lee",
    file: "/music/Sunflower.mp3",
    cover: "/covers/Sunflower.jpg",
  },
  {
    title: "Sweet Venom",
    artist: "Enhypen",
    file: "/music/SweetVenom.mp3",
    cover: "/covers/SweetVenom.jpg",
  },
  {
    title: "XO",
    artist: "Enhypen",
    file: "/music/xo.mp3",
    cover: "/covers/xo.jpg",
  },
];

export default function Music() {
  const selectedMusic = useDesktopStore((state) => state.selectedMusic);

  const [currentSong, setCurrentSong] = useState(() => {
    if (!selectedMusic) {
      return 0;
    }

    const index = songs.findIndex((song) => song.file === selectedMusic.path);

    return index >= 0 ? index : 0;
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!selectedMusic) {
      return;
    }

    const index = songs.findIndex((song) => song.file === selectedMusic.path);

    if (index >= 0) {
      setCurrentSong(index);

      setTimeout(() => {
        audioRef.current?.play();
        setIsPlaying(true);
      }, 100);
    }
  }, [selectedMusic]);

  const togglePlay = () => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSong((prev) => {
      return (prev + 1) % songs.length;
    });

    setTimeout(() => {
      audioRef.current?.play();
      setIsPlaying(true);
    }, 100);
  };

  const handlePrev = () => {
    setCurrentSong((prev) => {
      return (prev - 1 + songs.length) % songs.length;
    });

    setTimeout(() => {
      audioRef.current?.play();
      setIsPlaying(true);
    }, 100);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (time: number) => {
    if (!time) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <img
          src={songs[currentSong].cover}
          alt=""
          className="h-full w-full scale-125 object-cover blur-3xl opacity-40"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex shrink-0 flex-col items-center px-6 pt-6">
        <p className="mb-5 text-xs uppercase tracking-[0.4em] text-white/50">
          Now Playing
        </p>

        <div className="h-64 w-64 overflow-hidden rounded-3xl bg-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <img
            src={songs[currentSong].cover}
            alt={songs[currentSong].title}
            className="h-full w-full object-cover"
          />
        </div>

        <h2 className="mt-6 text-center text-3xl font-semibold">
          {songs[currentSong].title}
        </h2>

        <p className="text-white/60">{songs[currentSong].artist}</p>

        <div className="mt-8 w-full max-w-sm">
          <div
            className="group h-2 cursor-pointer overflow-hidden rounded-full bg-white/10"
            onClick={(e) => {
              if (!audioRef.current) {
                return;
              }

              const rect = e.currentTarget.getBoundingClientRect();

              const percent = (e.clientX - rect.left) / rect.width;

              audioRef.current.currentTime = percent * duration;
            }}
          >
            <div
              className="relative h-full bg-cyan-400 transition-all group-hover:bg-cyan-300"
              style={{
                width: `${progress}%`,
              }}
            >
              <div className="absolute right-0 top-1/2 h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>

          <div className="mt-2 flex justify-between text-xs text-white/50">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/70 backdrop-blur-xl transition hover:bg-white/20"
            title="Previous"
          >
            ◀
          </button>

          <button
            onClick={togglePlay}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-2xl text-black shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

          <button
            onClick={handleNext}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/70 backdrop-blur-xl transition hover:bg-white/20"
            title="Next"
          >
            ▶▶
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex-1 space-y-3 overflow-y-auto px-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {songs.map((song, index) => (
          <div
            key={song.title}
            onClick={() => {
              setCurrentSong(index);

              setTimeout(() => {
                audioRef.current?.play();
                setIsPlaying(true);
              }, 100);
            }}
            className={`flex cursor-pointer items-center gap-4 rounded-2xl border border-white/10 p-3 backdrop-blur-xl transition ${
              index === currentSong
                ? "bg-cyan-400/20"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <img
              src={song.cover}
              alt={song.title}
              className="h-14 w-14 rounded-xl object-cover"
            />

            <div>
              <h3 className="font-medium">{song.title}</h3>

              <p className="text-sm text-white/60">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>

      <audio
        ref={audioRef}
        src={songs[currentSong].file}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onEnded={handleNext}
      />
    </div>
  );
}