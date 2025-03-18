// src/hooks/use-sound-effects.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Typy dźwięków
export type SoundType =
  | "click"
  | "hover"
  | "success"
  | "error"
  | "ui"
  | "typing";

// Stan dla efektów dźwiękowych
interface SoundState {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  toggleEnabled: () => void;
}

// Przechowywanie preferencji dźwiękowych
export const useSoundStore = create<SoundState>()(
  persist(
    (set) => ({
      enabled: false, // Domyślnie dźwięki są wyłączone
      setEnabled: (enabled) => set({ enabled }),
      toggleEnabled: () => set((state) => ({ enabled: !state.enabled })),
    }),
    {
      name: "portfolio-sound-preferences",
    }
  )
);

// Hook dla odtwarzania dźwięków
export function useSound() {
  const { enabled } = useSoundStore();

  // Konfiguracja dźwięków
  const soundPaths: Record<SoundType, string> = {
    click: "/sounds/click.mp3",
    hover: "/sounds/hover.mp3",
    success: "/sounds/success.mp3",
    error: "/sounds/error.mp3",
    ui: "/sounds/ui.mp3",
    typing: "/sounds/typing.mp3",
  };

  // Funkcja do odtwarzania konkretnego dźwięku
  const playSound = (type: SoundType) => {
    if (!enabled) return;

    // Tworzenie elementu audio i odtwarzanie
    const audio = new Audio(soundPaths[type]);
    audio.volume = 0.3; // Odpowiednia głośność
    audio.play().catch((err) => console.error("Error playing sound:", err));
  };

  return { playSound };
}
