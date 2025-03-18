// src/components/home/hero.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
// Używam starsza wersję tsparticles z pakietu react-tsparticles
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine, Container, ISourceOptions } from "tsparticles-engine";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { useThemeStore } from "@/lib/theme";
import useSound from "use-sound";

// Define types for theme store
interface ThemeStore {
  mode: "light" | "dark";
}

// Hook dla useSound musi być zgodny z typami pakietu use-sound
type PlayFunction = ReturnType<typeof useSound>[0];

export function Hero(): JSX.Element {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Get theme with fallback
  const { mode = "light" } = (useThemeStore() || {}) as ThemeStore;

  // Używamy bezpośrednio use-sound zgodnie z jego API
  const [playHoverSound] = useSound("/sounds/hover.mp3", { volume: 0.5 });
  const [playClickSound] = useSound("/sounds/click.mp3", { volume: 0.5 });

  // Set mounted state after component mounts to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Optimize the initialization function with useCallback
  const particlesInit = useCallback(async (engine: Engine): Promise<void> => {
    try {
      // Używamy wersji 2.x.x loadSlim
      await loadSlim(engine);
    } catch (error) {
      console.error("Error initializing particles:", error);
    }
  }, []);

  // Function called when particles are loaded
  const particlesLoaded = useCallback(
    async (container?: Container): Promise<void> => {
      if (container) {
        setIsLoaded(true);
      }
    },
    []
  );

  // Particles configuration based on theme mode
  const getParticlesConfig = useCallback((): ISourceOptions => {
    const isDark = mode === "dark";

    return {
      fpsLimit: 120,
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: isDark ? "#ffffff" : "#000000",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: isDark ? 0.3 : 0.2,
          random: true,
          anim: {
            // W wersji 2.x używa "anim" zamiast "animation"
            enable: true,
            speed: 1,
            opacity_min: 0.1, // W wersji 2.x używa "opacity_min" zamiast "minimumValue"
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            // W wersji 2.x używa "anim" zamiast "animation"
            enable: true,
            speed: 2,
            size_min: 0.1, // W wersji 2.x używa "size_min" zamiast "minimumValue"
            sync: false,
          },
        },
        line_linked: {
          // W wersji 2.x używa "line_linked" zamiast "links"
          enable: true,
          distance: 150,
          color: isDark ? "#ffffff" : "#000000",
          opacity: isDark ? 0.2 : 0.1,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out", // W wersji 2.x używa "out_mode" zamiast "outModes"
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas", // W wersji 2.x używa "detect_on" zamiast "detectOn"
        events: {
          onhover: {
            // W wersji 2.x używa "onhover" zamiast "onHover"
            enable: true,
            mode: "grab",
          },
          onclick: {
            // W wersji 2.x używa "onclick" zamiast "onClick"
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              // W wersji 2.x używa "line_linked" zamiast "links"
              opacity: 1,
            },
          },
          push: {
            particles_nb: 4, // W wersji 2.x używa "particles_nb" zamiast "quantity"
          },
        },
      },
      retina_detect: true, // W wersji 2.x używa "retina_detect" zamiast "detectRetina"
    } as ISourceOptions;
  }, [mode]);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Array for type animation sequence
  const roles = [
    "Fullstack Developer",
    1500,
    "DevOps Engineer",
    1500,
    "UI/UX Enthusiast",
    1500,
    "Cloud Architect",
    1500,
  ];

  // Scroll to section function with error handling
  const scrollToSection = (id: string): void => {
    try {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        playClickSound();
      } else {
        console.warn(`Element with id "${id}" not found.`);
      }
    } catch (error) {
      console.error(`Error scrolling to section "${id}":`, error);
    }
  };

  // If not mounted yet, return nothing or a loading state to avoid hydration issues
  if (!isMounted) {
    return <div className="min-h-screen" />;
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 -z-10">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={getParticlesConfig()}
          className="absolute inset-0"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />

      {/* Content */}
      <div className="container relative z-20 px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="grid gap-6 md:gap-10 lg:grid-cols-2 items-center"
        >
          <div className="flex flex-col gap-6">
            <motion.div variants={itemVariants}>
              <span className="inline-block px-3 py-1 mb-3 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                Witaj, jestem John Doe
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-heading font-bold tracking-tight"
            >
              <div className="flex flex-col">
                <span>Tworzę nowoczesne</span>
                <span className="text-primary">cyfrowe doświadczenia</span>
              </div>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="flex items-center text-xl md:text-2xl font-heading h-12"
            >
              <span className="mr-2">Jestem</span>
              <TypeAnimation
                sequence={roles}
                wrapper="span"
                speed={50}
                className="text-primary font-medium"
                repeat={Infinity}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-prose"
            >
              Specjalizuję się w tworzeniu nowoczesnych, wydajnych i
              skalowalnych aplikacji webowych z wykorzystaniem najnowszych
              technologii oraz wdrażaniu zaawansowanych rozwiązań DevOps.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row gap-4 mt-4"
            >
              <Button
                size="lg"
                className="group"
                onClick={() => scrollToSection("projects")}
                onMouseEnter={() => playHoverSound()}
                type="button"
              >
                Zobacz moje projekty
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("contact")}
                onMouseEnter={() => playHoverSound()}
                type="button"
              >
                Kontakt
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 mt-2">
              <Link
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onMouseEnter={() => playHoverSound()}
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onMouseEnter={() => playHoverSound()}
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="hidden lg:flex items-center justify-center"
          >
            {/* Tu można dodać animowane ilustracje lub diagram */}
            <div className="relative w-full max-w-md aspect-square">
              {/* Placeholder na animację lub grafikę */}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        variants={itemVariants}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-sm text-foreground/60 mb-2">Przewiń w dół</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="h-5 w-5 text-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
