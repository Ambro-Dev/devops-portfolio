// src/lib/theme.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark";
export type ThemeStyle = "default" | "cyberpunk" | "terminal" | "space";

export interface ThemeState {
  mode: ThemeMode;
  style: ThemeStyle;
  setMode: (mode: ThemeMode) => void;
  setStyle: (style: ThemeStyle) => void;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "dark",
      style: "default",
      setMode: (mode) => set({ mode }),
      setStyle: (style) => set({ style }),
      toggleMode: () =>
        set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
    }),
    {
      name: "portfolio-theme",
    }
  )
);

// Funkcja pomocnicza do ustawienia klasy CSS dla aktualnego motywu
export const getThemeClass = (mode: ThemeMode, style: ThemeStyle): string => {
  return `theme-${style}-${mode}`;
};
