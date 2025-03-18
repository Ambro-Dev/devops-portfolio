// src/components/terminal/easter-egg-terminal.tsx
"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/lib/theme";
import { useSound } from "@/hooks/use-sound-effects";
import { Button } from "@/components/ui/button";
import { X, Minimize2, Maximize2 } from "lucide-react";

// Typy komend terminalowych
interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

// Dostępne komendy
const COMMANDS = {
  help: {
    description: "Wyświetla listę dostępnych komend.",
    usage: "help",
  },
  about: {
    description: "Wyświetla informacje o mnie.",
    usage: "about",
  },
  projects: {
    description: "Wyświetla listę moich projektów.",
    usage: "projects",
  },
  contact: {
    description: "Wyświetla informacje kontaktowe.",
    usage: "contact",
  },
  clear: {
    description: "Czyści ekran terminala.",
    usage: "clear",
  },
  echo: {
    description: "Wyświetla podany tekst.",
    usage: "echo [text]",
  },
  date: {
    description: "Wyświetla aktualną datę i czas.",
    usage: "date",
  },
  skills: {
    description: "Wyświetla moje umiejętności.",
    usage: "skills",
  },
  theme: {
    description: "Zmienia motyw terminala (light, dark).",
    usage: "theme [light|dark]",
  },
  exit: {
    description: "Zamyka terminal.",
    usage: "exit",
  },
};

export function EasterEggTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([
    {
      command: "",
      output: (
        <>
          <div className="text-green-400 mb-2">
            <span className="font-bold">JDTerminal v1.0.0</span> - Easter Egg
          </div>
          <div className="mb-1">
            Wpisz <span className="text-yellow-400">help</span> aby zobaczyć
            dostępne komendy.
          </div>
        </>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mode, setMode } = useThemeStore();
  const { playSound } = useSound();

  // Nasłuchuj na klawiaturę aby wykryć sekwencję "terminal"
  useEffect(() => {
    const keys: string[] = [];
    const terminalSequence = "terminal";

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      // Ignoruj gdy terminal jest już otwarty
      if (isOpen) return;

      // Ignoruj gdy użytkownik wpisuje w pole input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      keys.push(e.key.toLowerCase());

      // Trzymaj tylko ostatnie 8 klawiszy
      if (keys.length > terminalSequence.length) {
        keys.shift();
      }

      // Sprawdź czy sekwencja to "terminal"
      if (keys.join("") === terminalSequence) {
        setIsOpen(true);
        playSound("success");
        keys.length = 0; // Wyczyść bufor
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, playSound]);

  // Auto-focus input po otwarciu
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Przewijaj w dół po nowej komendzie
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const command = input.trim();
    const args = command.split(" ").slice(1);
    const cmd = command.split(" ")[0].toLowerCase();

    playSound("click");

    let output: React.ReactNode;

    // Obsługa komend
    switch (cmd) {
      case "help":
        output = (
          <div>
            <div className="mb-2 text-yellow-400">Dostępne komendy:</div>
            <div className="grid grid-cols-1 gap-1">
              {Object.entries(COMMANDS).map(([cmd, info]) => (
                <div key={cmd} className="flex">
                  <span className="text-green-400 w-16">{cmd}</span>
                  <span className="text-muted-foreground">
                    {info.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "about":
        output = (
          <div>
            <div className="mb-2 text-green-400 font-bold">John Doe</div>
            <div className="mb-1">
              Fullstack Developer & DevOps Engineer z ponad 5-letnim
              doświadczeniem.
            </div>
            <div className="mb-1">
              Specjalizuję się w tworzeniu aplikacji webowych i rozwiązań
              chmurowych z wykorzystaniem nowoczesnych technologii.
            </div>
            <div>
              Moim celem jest dostarczanie wysokiej jakości oprogramowania,
              które jest skalowalne, wydajne i łatwe w utrzymaniu.
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div>
            <div className="mb-2 text-yellow-400">Moje projekty:</div>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <div className="text-green-400">Cloud Native Application</div>
                <div className="text-muted-foreground text-sm">
                  Skalowalna aplikacja oparta o mikrousługi z pełnym pipeline
                  CI/CD.
                </div>
              </div>
              <div>
                <div className="text-green-400">E-Commerce Platform</div>
                <div className="text-muted-foreground text-sm">
                  Platforma e-commerce z zarządzaniem produktami i płatnościami.
                </div>
              </div>
              <div>
                <div className="text-green-400">
                  DevOps Monitoring Dashboard
                </div>
                <div className="text-muted-foreground text-sm">
                  System monitorowania infrastruktury w czasie rzeczywistym.
                </div>
              </div>
            </div>
            <div className="mt-2">
              Wpisz <span className="text-yellow-400">cd /projects</span> aby
              przejść do szczegółów projektu.
            </div>
          </div>
        );
        break;

      case "contact":
        output = (
          <div>
            <div className="mb-2 text-yellow-400">Informacje kontaktowe:</div>
            <div className="grid grid-cols-1 gap-1">
              <div>
                <span className="text-green-400 w-16 inline-block">Email:</span>
                <span className="text-muted-foreground">
                  contact@example.com
                </span>
              </div>
              <div>
                <span className="text-green-400 w-16 inline-block">
                  GitHub:
                </span>
                <span className="text-muted-foreground">
                  github.com/johndoe
                </span>
              </div>
              <div>
                <span className="text-green-400 w-16 inline-block">
                  LinkedIn:
                </span>
                <span className="text-muted-foreground">
                  linkedin.com/in/johndoe
                </span>
              </div>
              <div>
                <span className="text-green-400 w-16 inline-block">
                  Twitter:
                </span>
                <span className="text-muted-foreground">
                  twitter.com/johndoe
                </span>
              </div>
            </div>
          </div>
        );
        break;

      case "clear":
        setCommandHistory([]);
        output = null;
        break;

      case "echo":
        output = args.join(" ") || "";
        break;

      case "date":
        output = new Date().toLocaleString();
        break;

      case "skills":
        output = (
          <div>
            <div className="mb-2 text-yellow-400">Umiejętności:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div>
                <div className="text-green-400">Frontend:</div>
                <div className="text-muted-foreground text-sm">
                  React, Next.js, TypeScript, TailwindCSS
                </div>
              </div>
              <div>
                <div className="text-green-400">Backend:</div>
                <div className="text-muted-foreground text-sm">
                  Node.js, Express, NestJS, Python, Go
                </div>
              </div>
              <div>
                <div className="text-green-400">DevOps:</div>
                <div className="text-muted-foreground text-sm">
                  Docker, Kubernetes, Terraform, GitHub Actions, Jenkins
                </div>
              </div>
              <div>
                <div className="text-green-400">Cloud:</div>
                <div className="text-muted-foreground text-sm">
                  AWS, Google Cloud, Azure, Serverless
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case "theme":
        if (args[0] === "light" || args[0] === "dark") {
          setMode(args[0]);
          output = `Motyw zmieniony na ${args[0]}.`;
        } else {
          output = "Użycie: theme [light|dark]";
        }
        break;

      case "exit":
        setIsOpen(false);
        output = "Zamykanie terminala...";
        break;

      default:
        output = `Komenda nie znaleziona: ${cmd}. Użyj 'help' aby zobaczyć dostępne komendy.`;
    }

    if (cmd !== "clear") {
      setCommandHistory((prev) => [...prev, { command, output }]);
    }

    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Ctrl+C zamyka terminal
    if (e.ctrlKey && e.key === "c") {
      setIsOpen(false);
      playSound("ui");
    }

    // Tab auto-uzupełnianie
    if (e.key === "Tab") {
      e.preventDefault();

      const partialCmd = input.trim().toLowerCase();

      if (partialCmd) {
        // Znajdź pasujące komendy
        const matchingCmds = Object.keys(COMMANDS).filter((cmd) =>
          cmd.startsWith(partialCmd)
        );

        if (matchingCmds.length === 1) {
          setInput(matchingCmds[0]);
          playSound("ui");
        }
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className={`
        fixed z-50 overflow-hidden
        ${
          isFullscreen
            ? "inset-0 m-0 rounded-none"
            : "left-4 right-4 bottom-4 top-auto rounded-lg max-w-3xl mx-auto h-96"
        }
        bg-black border border-green-700 shadow-xl transition-all duration-300
      `}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-green-800 to-green-900">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm font-mono ml-2 text-green-100">
            jd-terminal ~ - bash
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsFullscreen(!isFullscreen);
              playSound("click");
            }}
            className="h-8 w-8 text-green-200 hover:text-white hover:bg-green-700/50"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsOpen(false);
              playSound("ui");
            }}
            className="h-8 w-8 text-green-200 hover:text-white hover:bg-green-700/50"
          >
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="p-4 font-mono text-sm text-green-100 h-full overflow-auto"
      >
        <AnimatePresence>
          {commandHistory.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-2"
            >
              {item.command && (
                <div className="flex">
                  <span className="text-green-500">jd@portfolio:~$</span>
                  <span className="ml-2">{item.command}</span>
                </div>
              )}
              {item.output && <div className="mt-1 pl-0">{item.output}</div>}
            </motion.div>
          ))}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-green-500">jd@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 ml-2 bg-transparent border-none outline-none text-green-100"
            autoFocus
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </form>
      </div>
    </motion.div>
  );
}
