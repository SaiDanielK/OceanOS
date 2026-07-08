"use client";

import { useState } from "react";
import { usePhotoStore } from "@/store/photoStore";

const images = [
  { title: "Beach", src: "/gallery/beach.jpg", camera: false },
  { title: "Forest", src: "/gallery/forest.jpg", camera: false },
  { title: "Mountain", src: "/gallery/mountain.jpg", camera: false },
  { title: "Ocean", src: "/gallery/ocean.jpg", camera: false },
  { title: "Sunset", src: "/gallery/sunset.jpg", camera: false },
  { title: "City", src: "/gallery/city.jpg", camera: false },
];

type GalleryPhoto = {
  id?: number;
  title: string;
  src: string;
  camera: boolean;
};

export default function Gallery() {
  const photos = usePhotoStore((state) => state.photos);

  const allPhotos: GalleryPhoto[] = [
    ...images,
    ...photos.map((photo) => ({
      ...photo,
      camera: true,
    })),
  ];

  const [selectedPhoto, setSelectedPhoto] =
    useState<GalleryPhoto | null>(null);

  const removePhoto = usePhotoStore((state) => state.removePhoto);  
  if (selectedPhoto) {
    return (
      <div className="h-full bg-black flex flex-col text-white">

        <div className="flex justify-between items-center p-4 border-b border-white/10">

          <button
            onClick={() => setSelectedPhoto(null)}
            className="hover:text-cyan-400 transition"
          >
            ← Back
          </button>

          {selectedPhoto.camera ? (
          <button
            onClick={() => {
              if (!selectedPhoto) return;

              if (selectedPhoto.camera) {
                removePhoto(selectedPhoto.id!);
                setSelectedPhoto(null);
              }
            }}
            className="hover:text-red-400 transition"
          >
            🗑️
          </button>
          ) : (
            <div className="w-6" />
          )}

        </div>

        <div className="flex-1 flex items-center justify-center p-6">

          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.title}
            className="max-w-full max-h-full object-contain select-none"
          />

        </div>

      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent p-6 text-white">

      <h1 className="text-3xl font-semibold mb-6">
        Gallery
      </h1>

      <h2 className="text-xl font-medium mb-4">
        Tip for 1st time users: Photos from your camera enter the gallery automatically. You can also add your own photos by placing them in the <code className="bg-white/10 px-1 rounded">public/gallery</code> folder via GitHub.
      </h2>

      <div id = "gallery-window" className="grid grid-cols-3 gap-3">

        {allPhotos.map((photo, index) => (
          <div
            key={photo.id ?? index}
            onClick={() => setSelectedPhoto(photo)}
            className="
              overflow-hidden
              border
              border-white/10
              bg-black
              cursor-pointer
              transition
              duration-200
              hover:scale-[1.02]
              hover:border-white/30
            "
          >

            <img
              src={photo.src}
              alt={photo.title}
              className="
                w-full
                aspect-square
                object-cover
                select-none
              "
            />

            <div className="px-2 py-1 border-t border-white/10">

              <p className="text-sm truncate">
                {photo.title}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
} 