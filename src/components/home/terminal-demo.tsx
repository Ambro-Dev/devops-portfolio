// src/components/home/terminal-demo.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/lib/theme";
import { useSound } from "@/hooks/use-sound-effects";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Maximize2, Minimize2, X } from "lucide-react";

// Typ dla pojedynczej linii terminala
interface TerminalLine {
  id: string;
  content: string;
  type: "command" | "output" | "error" | "info" | "success";
  delay: number;
}

// Predefiniowane demonstrujące CI/CD pipeline
const deploymentDemo: TerminalLine[] = [
  {
    id: "1",
    content: "$ git push origin main",
    type: "command",
    delay: 500,
  },
  {
    id: "2",
    content: "Enumerating objects: 16, done.",
    type: "output",
    delay: 800,
  },
  {
    id: "3",
    content: "Counting objects: 100% (16/16), done.",
    type: "output",
    delay: 400,
  },
  {
    id: "4",
    content: "Compressing objects: 100% (10/10), done.",
    type: "output",
    delay: 600,
  },
  {
    id: "5",
    content: "Writing objects: 100% (10/10), 1.23 KiB | 1.23 MiB/s, done.",
    type: "output",
    delay: 500,
  },
  {
    id: "6",
    content: "Total 10 (delta 6), reused 0 (delta 0), pack-reused 0",
    type: "output",
    delay: 300,
  },
  {
    id: "7",
    content: "remote: 🚀 CI Build Started...",
    type: "info",
    delay: 1000,
  },
  {
    id: "8",
    content: "remote: 📦 Installing dependencies...",
    type: "info",
    delay: 1500,
  },
  {
    id: "9",
    content: "remote: ✅ Dependencies installed successfully",
    type: "success",
    delay: 800,
  },
  {
    id: "10",
    content: "remote: 🔍 Running tests...",
    type: "info",
    delay: 1200,
  },
  {
    id: "11",
    content: "remote: ✅ All tests passed successfully (128 tests)",
    type: "success",
    delay: 1000,
  },
  {
    id: "12",
    content: "remote: 🔨 Building application...",
    type: "info",
    delay: 1800,
  },
  {
    id: "13",
    content: "remote: ✅ Build successful",
    type: "success",
    delay: 1000,
  },
  {
    id: "14",
    content: "remote: 🐳 Building Docker image...",
    type: "info",
    delay: 1500,
  },
  {
    id: "15",
    content: "remote: ✅ Docker image built and pushed to registry",
    type: "success",
    delay: 1200,
  },
  {
    id: "16",
    content: "remote: 🚢 Deploying to Kubernetes cluster...",
    type: "info",
    delay: 2000,
  },
  {
    id: "17",
    content: "remote: 🔄 Updating deployment...",
    type: "info",
    delay: 1000,
  },
  {
    id: "18",
    content: "remote: 🔄 Rolling update in progress...",
    type: "info",
    delay: 1500,
  },
  {
    id: "19",
    content: "remote: ✅ Deployment successful",
    type: "success",
    delay: 800,
  },
  {
    id: "20",
    content: "remote: 🔍 Running health checks...",
    type: "info",
    delay: 1200,
  },
  {
    id: "21",
    content: "remote: ✅ All services are healthy",
    type: "success",
    delay: 800,
  },
  {
    id: "22",
    content:
      "remote: 🚀 Application deployed and available at https://app.example.com",
    type: "success",
    delay: 1000,
  },
  {
    id: "23",
    content: "$ ",
    type: "command",
    delay: 500,
  },
];

export function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { mode, style } = useThemeStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isDark = mode === "dark";
  const isTerminalTheme = style === "terminal";
  const { playSound } = useSound();

  // Auto scroll na dół terminala
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines]);

  // Zarządzanie animacją terminala
  useEffect(() => {
    if (!isPlaying || currentLineIndex >= deploymentDemo.length) return;

    const currentLine = deploymentDemo[currentLineIndex];

    const timer = setTimeout(() => {
      // Dodaj nową linię do widocznych linii
      setVisibleLines((prev) => [...prev, currentLine]);

      // Efekt dźwiękowy dla różnych typów linii
      if (currentLine.type === "command") {
        playSound("typing");
      } else if (currentLine.type === "success") {
        playSound("success");
      } else if (currentLine.type === "error") {
        playSound("error");
      }

      // Inkrementuj indeks obecnej linii
      setCurrentLineIndex((prev) => prev + 1);

      // Zatrzymaj odtwarzanie jeśli to ostatnia linia
      if (currentLineIndex === deploymentDemo.length - 1) {
        setIsPlaying(false);
      }
    }, currentLine.delay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentLineIndex, playSound]);

  const startDemo = () => {
    setIsPlaying(true);
    playSound("click");
  };

  const pauseDemo = () => {
    setIsPlaying(false);
    playSound("click");
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setVisibleLines([]);
    setCurrentLineIndex(0);
    playSound("ui");
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    playSound("click");
  };

  // Określenie koloru tekstu dla różnych typów linii
  const getLineColor = (type: string) => {
    switch (type) {
      case "command":
        return "text-blue-400";
      case "output":
        return "text-foreground";
      case "error":
        return "text-red-400";
      case "info":
        return "text-yellow-400";
      case "success":
        return "text-green-400";
      default:
        return "text-foreground";
    }
  };

  return (
    <motion.div
      className={`
        relative bg-card border border-border rounded-lg shadow-lg overflow-hidden transition-all duration-300
        ${isFullscreen ? "fixed inset-4 z-50" : "w-full"}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm font-mono ml-2 text-foreground">
            CI/CD Pipeline Demo
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="h-8 w-8"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </Button>
          {isFullscreen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(false)}
              className="h-8 w-8"
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className={`
          p-4 font-mono text-sm h-80 overflow-auto
          ${isFullscreen ? "h-[calc(100%-6rem)]" : ""}
          ${isTerminalTheme ? "bg-[#1E1E1E]" : "bg-card"}
        `}
      >
        <AnimatePresence>
          {visibleLines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-1 ${getLineColor(line.type)}`}
            >
              {line.content}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Migający kursor na końcu aktualnie pisanej linii */}
        {isPlaying && (
          <span className="inline-block w-2 h-4 bg-primary animate-terminal-blink"></span>
        )}
      </div>

      {/* Terminal Controls */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-t border-border">
        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <Button
              variant="outline"
              size="sm"
              onClick={startDemo}
              disabled={currentLineIndex >= deploymentDemo.length}
              onMouseEnter={() => playSound("hover")}
            >
              <Play size={16} className="mr-1" />
              {currentLineIndex === 0 ? "Start" : "Resume"}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={pauseDemo}
              onMouseEnter={() => playSound("hover")}
            >
              <Pause size={16} className="mr-1" />
              Pause
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={resetDemo}
            onMouseEnter={() => playSound("hover")}
          >
            <RotateCcw size={16} className="mr-1" />
            Reset
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          {currentLineIndex} / {deploymentDemo.length}
        </div>
      </div>
    </motion.div>
  );
}
