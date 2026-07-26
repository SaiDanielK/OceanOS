"use client";

import { useEffect, useState } from "react";
import { usePhotoStore } from "@/store/photoStore";
import { useDesktopStore } from "@/store/desktopStore";

export const images = [
  {
    title: "Beach",
    src: "/gallery/beach.jpg",
    camera: false,
  },
  {
    title: "City",
    src: "/gallery/city.jpg",
    camera: false,
  },
  {
    title: "Forest",
    src: "/gallery/forest.jpg",
    camera: false,
  },
  {
    title: "Mountain",
    src: "/gallery/mountain.jpg",
    camera: false,
  },
  {
    title: "Ocean",
    src: "/gallery/ocean.jpg",
    camera: false,
  },
  {
    title: "Sunset",
    src: "/gallery/sunset.jpg",
    camera: false,
  },
];

type GalleryPhoto = {
  id?: number;
  title: string;
  src: string;
  camera: boolean;
};

export default function Gallery() {
  const photos = usePhotoStore((state) => state.photos);
  const removePhoto = usePhotoStore((state) => state.removePhoto);

  const selectedImage = useDesktopStore((state) => state.selectedImage);

  const allPhotos: GalleryPhoto[] = [
    ...images,
    ...photos.map((photo) => ({
      ...photo,
      camera: true,
    })),
  ];

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    () => {
      if (!selectedImage) return null;

      const foundIndex = allPhotos.findIndex(
        (image) => image.src === selectedImage.path
      );

      return foundIndex !== -1 ? foundIndex : null;
    }
  );

  useEffect(() => {
    if (!selectedImage) return;

    const foundIndex = allPhotos.findIndex(
      (image) => image.src === selectedImage.path
    );

    if (foundIndex !== -1) {
      setSelectedPhotoIndex(foundIndex);
    }
  }, [selectedImage, photos]);

  const selectedPhoto =
    selectedPhotoIndex !== null ? allPhotos[selectedPhotoIndex] : null;

  if (selectedPhoto && selectedPhotoIndex !== null) {
    return (
      <div className="flex h-full flex-col bg-black text-white">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl hover:bg-white/20"
          >
            ← Back
          </button>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setSelectedPhotoIndex(
                  (prev) => (prev! - 1 + allPhotos.length) % allPhotos.length
                )
              }
              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl hover:bg-white/20"
            >
              ← Prev
            </button>

            <button
              onClick={() =>
                setSelectedPhotoIndex((prev) => (prev! + 1) % allPhotos.length)
              }
              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl hover:bg-white/20"
            >
              Next →
            </button>
          </div>

          {selectedPhoto.camera ? (
            <button
              onClick={() => {
                if (!selectedPhoto.id) return;
                removePhoto(selectedPhoto.id);
                setSelectedPhotoIndex(null);
              }}
              className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-2 backdrop-blur-xl hover:bg-red-400/20"
            >
              🗑️
            </button>
          ) : (
            <div className="w-10" />
          )}
        </div>

        <div className="flex flex-1 items-center justify-center p-6">
          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.title}
            className="max-h-full max-w-full select-none object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6 text-white scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      <h1 className="mb-6 text-3xl font-semibold">Gallery</h1>

      <div className="grid grid-cols-3 gap-3">
        {allPhotos.map((photo, index) => (
          <div
            key={photo.id ?? index}
            onClick={() => setSelectedPhotoIndex(index)}
            className="cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:scale-[1.03] hover:bg-white/10"
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="aspect-square w-full select-none object-cover"
            />

            <div className="border-t border-white/10 px-2 py-2">
              <p className="truncate text-sm">{photo.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}