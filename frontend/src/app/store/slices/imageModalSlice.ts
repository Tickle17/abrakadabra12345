import { create } from 'zustand';

export type PImageModalStore = {
  open: boolean;
  imageUrl: string;
  setOpen: (open: boolean) => void;
  setImageUrl: (url: string) => void;
  openModalWithImage: (url: string) => void;
};

export const useImageModalStore = create<PImageModalStore>(set => ({
  open: false,
  imageUrl: '',
  setOpen: open => set({ open }),
  setImageUrl: url => set({ imageUrl: url }),
  openModalWithImage: url => set({ open: true, imageUrl: url }),
}));
