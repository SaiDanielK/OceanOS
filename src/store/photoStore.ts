import { create } from "zustand";

export type Photo = {
  id: number;
  title: string;
  src: string;
};

type PhotoStore = {
  photos: Photo[];
  addPhoto: (src: string) => void;
  removePhoto: (id: number) => void;
};

export const usePhotoStore = create<PhotoStore>((set, get) => ({
  photos: [],

  addPhoto: (src) => {
    const nextNumber = get().photos.length + 1;

    set((state) => ({
      photos: [
        ...state.photos,
        {
          id: Date.now(),
          title: `Photo${nextNumber}`,
          src,
        },
      ],
    }));
  },
  removePhoto: (id) => {
    set((state) => ({
      photos: state.photos.filter((photo) => photo.id !== id),
    }));
  },
}));  