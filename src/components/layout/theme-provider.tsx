// src/components/layout/theme-provider.tsx
"use client";

import * as React from "react";
import { useThemeStore, getThemeClass } from "@/lib/theme";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode, style } = useThemeStore();

  // Aktualizacja klasy dokumentu przy zmianie motywu
  useEffect(() => {
    const themeClass = getThemeClass(mode, style);

    // Usuń wszystkie klasy motywów
    document.documentElement.classList.forEach((className) => {
      if (className.startsWith("theme-")) {
        document.documentElement.classList.remove(className);
      }
    });

    // Dodaj aktualną klasę motywu
    document.documentElement.classList.add(themeClass);

    // Aktualizacja metadanych dla przeglądarki
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  }, [mode, style]);

  return <>{children}</>;
}
