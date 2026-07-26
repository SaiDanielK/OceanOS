"use client";

import { useState } from "react";
import { useDesktopStore } from "@/store/desktopStore";

type MediaFile = {
  name: string;
  type: "music" | "video" | "image" | "note";
  path?: string;
};

type FolderFile = {
  name: string;
  type: "folder";
};

type FileItem = MediaFile | FolderFile;

const homeFolders: FolderFile[] = [
  {
    name: "Music",
    type: "folder",
  },
  {
    name: "Videos",
    type: "folder",
  },
  {
    name: "Pictures",
    type: "folder",
  },
  {
    name: "Desktop",
    type: "folder",
  },
];

const musicFiles: MediaFile[] = [
  "bighome.mp3",
  "BlindingLights.mp3",
  "fever.mp3",
  "go.mp3",
  "GoldenHour.mp3",
  "heat.mp3",
  "likemebetter.mp3",
  "Sunflower.mp3",
  "SweetVenom.mp3",
  "xo.mp3",
].map((name) => ({
  name,
  type: "music",
  path: `/music/${name}`,
}));

const videoFiles: MediaFile[] = [
  "one.mp4",
  "two.mp4",
  "three.mp4",
].map((name) => ({
  name,
  type: "video",
  path: `/videos/${name}`,
}));

const pictureFiles: MediaFile[] = [
  "Beach.jpg",
  "City.jpg",
  "Forest.jpg",
  "Mountain.jpg",
  "Ocean.jpg",
  "Sunset.jpg",
].map((name) => ({
  name,
  type: "image",
  path: `/gallery/${name.toLowerCase()}`,
}));

const desktopFiles: MediaFile[] = [
  {
    name: "Welcome Notes.txt",
    type: "note",
    path: "welcome",
  },
  {
    name: "OceanOS Notes.txt",
    type: "note",
    path: "todos",
  },
];

export default function Files() {
  const openMusicFile = useDesktopStore((state) => state.openMusicFile);

  const openVideoFile = useDesktopStore((state) => state.openVideoFile);

  const openImageFile = useDesktopStore((state) => state.openImageFile);

  const openNoteFile = useDesktopStore((state) => state.openNoteFile);

  const [currentFolder, setCurrentFolder] = useState("Home");

  const getFiles = (): FileItem[] => {
    if (currentFolder === "Music") {
      return musicFiles;
    }

    if (currentFolder === "Videos") {
      return videoFiles;
    }

    if (currentFolder === "Pictures") {
      return pictureFiles;
    }

    if (currentFolder === "Desktop") {
      return desktopFiles;
    }

    return homeFolders;
  };

  const openFile = (file: FileItem) => {
    if (file.type === "folder") {
      setCurrentFolder(file.name);
      return;
    }

    if (file.type === "music") {
      openMusicFile(file);
      return;
    }

    if (file.type === "video") {
      openVideoFile(file);
      return;
    }

    if (file.type === "image") {
      openImageFile(file);
      return;
    }

    if (file.type === "note") {
      openNoteFile(file);
      return;
    }
  };

  const items = getFiles();

  return (
    <div className="h-full w-full overflow-y-auto text-white">
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <div>
          <h1 className="text-2xl font-semibold">Files</h1>

          <p className="text-sm text-white/50">
            Home / {currentFolder}
          </p>
        </div>

        {currentFolder !== "Home" && (
          <button
            onClick={() => setCurrentFolder("Home")}
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl transition hover:bg-white/20"
          >
            ← Home
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 overflow-y-auto p-6">
        {items.map((item) => (
          <button
            key={item.name}
            onClick={() => openFile(item)}
            className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition hover:scale-105 hover:bg-white/20"
          >
            <div className="text-4xl">
              {item.type === "folder" && "📁"}
              {item.type === "music" && "🎵"}
              {item.type === "video" && "🎬"}
              {item.type === "image" && "🖼️"}
              {item.type === "note" && "📝"}
            </div>

            <p className="break-words text-center text-sm text-white/90">
              {item.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}