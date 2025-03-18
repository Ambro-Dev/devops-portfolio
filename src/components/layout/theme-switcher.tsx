// src/components/layout/theme-switcher.tsx
"use client";

import { useThemeStore, ThemeMode, ThemeStyle } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Palette, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { useSound } from "@/hooks/use-sound-effects";

export function ThemeSwitcher() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mode, style, setMode, setStyle, toggleMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const { playSound } = useSound();

  // Zapobiega hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleModeChange = (newMode: ThemeMode) => {
    setMode(newMode);
    playSound("click");
  };

  const handleStyleChange = (newStyle: ThemeStyle) => {
    setStyle(newStyle);
    playSound("ui");
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full"
          >
            {mode === "light" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Przełącz motyw</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Motyw</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleModeChange("light")}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Jasny</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleModeChange("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Ciemny</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMode("system" as ThemeMode)}>
            <Monitor className="mr-2 h-4 w-4" />
            <span>Systemowy</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full"
          >
            <Palette className="h-5 w-5" />
            <span className="sr-only">Zmień styl</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Styl</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleStyleChange("default")}>
            <span className="h-4 w-4 rounded-full bg-primary mr-2" />
            <span>Domyślny</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStyleChange("cyberpunk")}>
            <span className="h-4 w-4 rounded-full bg-[#ff00a0] mr-2" />
            <span>Cyberpunk</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStyleChange("terminal")}>
            <span className="h-4 w-4 rounded-full bg-[#00ff9d] mr-2" />
            <span>Terminal</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStyleChange("space")}>
            <span className="h-4 w-4 rounded-full bg-[#6e56cf] mr-2" />
            <span>Space</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
