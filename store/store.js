import { create } from "zustand";

export const useGuestStore = create((set) => ({
  adults: 1,
  children: 0,
  guestAdded: false,
  setGuestAdded: (guestAdded) => set((state) => ({ ...state, guestAdded })),
  setAdults: (adults) => set((state) => ({ ...state, adults })),
  setChildren: (children) => set((state) => ({ ...state, children })),
}));

export const useDateStore = create((set) => ({
  startDate: new Date(),
  endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  setStartDate: (startDate) => set((state) => ({ ...state, startDate })),
  setEndDate: (endDate) => set((state) => ({ ...state, endDate })),
}));

export const useDestinationStore = create((set) => ({
  destination: null,
  center: {
    lat: null,
    lng: null,
  },
  setDestination: (destination) => set((state) => ({ ...state, destination })),
  setCenter: (center) => set((state) => ({ ...state, center })),
}));

export const useGenreStore = create((set) => ({
  genre: null,
  setGenre: (genre) => set((state) => ({ ...state, genre })),
}));
