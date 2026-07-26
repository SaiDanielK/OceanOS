"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePhotoStore } from "@/store/photoStore";
import { useDesktopStore } from "@/store/desktopStore";
import { images as defaultImages } from "./Gallery";

type GalleryPhoto = {
	id?: number;
	title: string;
	src: string;
	camera: boolean;
};

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const photos = usePhotoStore(state => state.photos);
  const addPhoto = usePhotoStore(state => state.addPhoto);
  const galleryOpen = useDesktopStore(state => state.apps.find(app => app.id === 'gallery')?.isOpen);
  const openApp = useDesktopStore(state => state.openApp);

  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const thumbnailRef = useRef<HTMLImageElement>(null);

  const [flash, setFlash] = useState(false);
  const [isGalleryViewOpen, setIsGalleryViewOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const allPhotos: GalleryPhoto[] = useMemo(() => [
    ...defaultImages,
    ...photos.map((photo) => ({
      ...photo,
      camera: true,
    })),
  ], [photos]);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Unable to access camera:", err);
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    setFlash(true);

    setTimeout(() => setFlash(false), 120);

    setThumbnail(image);

    if (!galleryOpen) {
      openApp('gallery');
    }
    setTimeout(() => {
      const thumb = thumbnailRef.current;
      const gallery = document.getElementById("gallery-window");

      if (!thumb || !gallery) {
        addPhoto(image);
        setThumbnail(null);
        return;
      }
      const thumbRect = thumb.getBoundingClientRect();
      const galleryRect = gallery.getBoundingClientRect();

      const targetX = galleryRect.left + 80;
      const targetY = galleryRect.top + 80;

      const deltaX =
        targetX - (thumbRect.left + thumbRect.width / 2);

      const deltaY =
        targetY - (thumbRect.top + thumbRect.height / 2);

      const animation = thumb.animate(
        [
          {
            transform: "translate(0px,0px) scale(1)",
            opacity: 1,
          },
          {
            transform: `
              translate(${deltaX}px, ${deltaY}px)
              scale(.05)
            `,
            opacity: 0,
          },
        ],
        {
          duration: 700,
          easing: "cubic-bezier(.22,1,.36,1)",
          fill: "forwards",
        }
      );

      animation.onfinish = () => {
        addPhoto(image);
        setThumbnail(null);
      };

    }, galleryOpen ? 50 : 200);
  };


  return (
    <div className="relative h-full flex flex-col bg-black overflow-hidden">

      <div
        className={`
          absolute
          inset-0
          bg-white
          pointer-events-none
          transition-opacity
          duration-150
          z-20
          ${flash ? "opacity-100" : "opacity-0"}
        `}
      />

      {allPhotos.length > 0 && (
        <button
          onClick={() => {
            setCurrentPhotoIndex(allPhotos.length - 1);
            setIsGalleryViewOpen(true);
          }}
          className="absolute bottom-2.5 left-2.5 w-20 h-20 rounded-full shadow-2xl border-2 border-white z-10 overflow-hidden group"
        >
          <img
            src={thumbnail || allPhotos[allPhotos.length - 1].src}
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
          />
        </button>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="flex-1 object-cover"
      />

      <canvas
        ref={canvasRef}
        className="hidden"
      />

      <div className="h-28 flex items-center justify-center border-t border-white/10 bg-black">

        <button
          onClick={capturePhoto}
          className="
            w-20
            h-20
            rounded-full
            border-4
            border-white
            bg-white/20
            hover:bg-white/40
            active:scale-95
            transition
          "
        />

      </div>

      {isGalleryViewOpen && (
        <div className="absolute inset-0 z-40 bg-black flex flex-col text-white">
          <div className="flex-1 flex items-center justify-center p-4 relative">
            <img
              src={allPhotos[currentPhotoIndex].src}
              alt={allPhotos[currentPhotoIndex].title}
              className="max-w-full max-h-full object-contain select-none"
            />
          </div>

          <div className="h-28 flex items-center justify-between px-6 border-t border-white/10">
            <button
              onClick={() => setCurrentPhotoIndex(prev => (prev - 1 + allPhotos.length) % allPhotos.length)}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl hover:bg-white/20"
            >
              ← Prev
            </button>

            <button
              onClick={() => setIsGalleryViewOpen(false)}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl hover:bg-white/20"
            >
              Done
            </button>

            <button
              onClick={() => setCurrentPhotoIndex(prev => (prev + 1) % allPhotos.length)}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl hover:bg-white/20"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {thumbnail && (
        <img
          ref={thumbnailRef}
          src={thumbnail}
          alt=""
          className="absolute bottom-6 left-6 w-20 h-20 rounded-full shadow-2xl border-2 border-white z-30 pointer-events-none"
        />
      )}

    </div>
  );
}