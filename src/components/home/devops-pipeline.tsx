/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/home/devops-pipeline.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { useThemeStore } from "@/lib/theme";
import { useSound } from "@/hooks/use-sound-effects";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Info } from "lucide-react";

// Pipeline stages
const pipelineStages = [
  {
    id: "code",
    name: "Code",
    icon: "/images/pipeline/code.json",
    description:
      "Collaborative development with Git, code reviews, and automated quality checks.",
  },
  {
    id: "build",
    name: "Build",
    icon: "/images/pipeline/build.json",
    description:
      "Automated builds with dependency management and artifact generation.",
  },
  {
    id: "test",
    name: "Test",
    icon: "/images/pipeline/test.json",
    description:
      "Unit tests, integration tests, and end-to-end testing with automated reporting.",
  },
  {
    id: "deploy",
    name: "Deploy",
    icon: "/images/pipeline/deploy.json",
    description:
      "Container-based deployments with Kubernetes for scalability and reliability.",
  },
  {
    id: "monitor",
    name: "Monitor",
    icon: "/images/pipeline/monitor.json",
    description:
      "Comprehensive monitoring with alerts, logs aggregation, and dashboard visualization.",
  },
];

export function DevOpsPipeline() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { mode } = useThemeStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isDark = mode === "dark";
  const { playSound } = useSound();

  // Player refs for controlling Lottie animations
  const playerRefs = useRef<Record<string, any>>({});

  // Observe when component comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Auto-advance animation when playing
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      // Move to the next stage
      setCurrentStageIndex((prev) => {
        const nextIndex = prev + 1;

        // If we reached the end, stop playing
        if (nextIndex >= pipelineStages.length) {
          setIsPlaying(false);
          return prev;
        }

        // Set the next stage as active
        setActiveStage(pipelineStages[nextIndex].id);

        // Control Lottie animations
        Object.keys(playerRefs.current).forEach((id) => {
          const player = playerRefs.current[id];
          if (id === pipelineStages[nextIndex].id) {
            player?.play();
          } else {
            player?.stop();
          }
        });

        playSound("ui");
        return nextIndex;
      });
    }, 2500); // Time for each stage

    return () => clearTimeout(timer);
  }, [isPlaying, currentStageIndex, playSound]);

  const handleStageClick = (stageId: string, index: number) => {
    setActiveStage(stageId);
    setCurrentStageIndex(index);
    setIsPlaying(false);

    // Control Lottie animations
    Object.keys(playerRefs.current).forEach((id) => {
      const player = playerRefs.current[id];
      if (id === stageId) {
        player?.play();
      } else {
        player?.stop();
      }
    });

    playSound("click");
  };

  const playAnimation = () => {
    setIsPlaying(true);

    // Start from the current stage if one is selected, otherwise from beginning
    const startIndex = activeStage
      ? pipelineStages.findIndex((s) => s.id === activeStage)
      : 0;
    setCurrentStageIndex(startIndex);
    setActiveStage(pipelineStages[startIndex].id);

    // Play the Lottie animation for the active stage
    const currentStageId = pipelineStages[startIndex].id;
    playerRefs.current[currentStageId]?.play();

    playSound("click");
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
    playSound("click");
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStageIndex(0);
    setActiveStage(pipelineStages[0].id);

    // Reset all Lottie animations
    Object.keys(playerRefs.current).forEach((id) => {
      const player = playerRefs.current[id];
      if (id === pipelineStages[0].id) {
        player?.stop();
        player?.play();
      } else {
        player?.stop();
      }
    });

    playSound("ui");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div ref={ref} className="w-full py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="container mx-auto px-4"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            DevOps Workflow
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Continuous Integration and Deployment pipeline powering modern
            development workflows.
          </p>
        </motion.div>

        {/* Pipeline Visualization */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-0">
            {/* SVG Pipeline line */}
            <svg
              className="absolute top-10 left-0 w-full h-20 hidden md:block"
              viewBox="0 0 1200 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M100 25 H1100"
                stroke="url(#pipelineGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <defs>
                <linearGradient
                  id="pipelineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    className="text-primary"
                    stopColor="var(--primary)"
                  />
                  <stop
                    offset="50%"
                    className="text-accent"
                    stopColor="var(--accent)"
                  />
                  <stop
                    offset="100%"
                    className="text-primary"
                    stopColor="var(--gradient-end)"
                  />
                </linearGradient>
              </defs>
            </svg>

            {/* Pipeline Stages */}
            {pipelineStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                className={`relative flex flex-col items-center w-full md:w-1/5 p-2 cursor-pointer
                  ${activeStage === stage.id ? "scale-110 z-10" : "opacity-80"}
                `}
                initial={{ scale: 1 }}
                animate={{
                  scale: activeStage === stage.id ? 1.05 : 1,
                  opacity: activeStage && activeStage !== stage.id ? 0.7 : 1,
                }}
                transition={{ duration: 0.3 }}
                onClick={() => handleStageClick(stage.id, index)}
                onMouseEnter={() => playSound("hover")}
              >
                {/* Progress Indicator */}
                <motion.div
                  className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-2 z-20
                    ${
                      currentStageIndex >= index
                        ? "bg-primary border-primary-foreground"
                        : "bg-muted border-muted-foreground"
                    }
                  `}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                />

                {/* Stage Card */}
                <Card
                  className={`
                    w-full h-full transition-all
                    ${
                      activeStage === stage.id
                        ? "border-primary shadow-lg shadow-primary/20"
                        : "hover:border-primary/50"
                    }
                  `}
                >
                  <CardContent className="p-4 flex flex-col items-center">
                    <h3 className="font-heading font-medium mt-2 mb-3">
                      {stage.name}
                    </h3>
                    <div className="w-16 h-16 md:w-20 md:h-20 mb-3">
                      <Player
                        ref={(ref) =>
                          (playerRefs.current[stage.id] = ref) as any
                        }
                        autoplay={activeStage === stage.id}
                        loop
                        src={stage.icon}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <p className="text-xs text-center text-muted-foreground hidden md:block">
                      {stage.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Controls and Description */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Controls */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-xl font-heading font-medium">
              Pipeline Controls
            </h3>
            <div className="flex items-center gap-3">
              {!isPlaying ? (
                <Button
                  onClick={playAnimation}
                  className="flex items-center gap-2"
                  onMouseEnter={() => playSound("hover")}
                >
                  <Play size={18} />
                  Play Animation
                </Button>
              ) : (
                <Button
                  onClick={pauseAnimation}
                  className="flex items-center gap-2"
                  onMouseEnter={() => playSound("hover")}
                >
                  <Pause size={18} />
                  Pause
                </Button>
              )}
              <Button
                variant="outline"
                onClick={resetAnimation}
                className="flex items-center gap-2"
                onMouseEnter={() => playSound("hover")}
              >
                <RotateCcw size={18} />
                Reset
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Click on any stage to view details, or play the animation to see
              the full workflow.
            </p>
          </div>

          {/* Stage Description */}
          <motion.div
            className="bg-muted/50 p-6 rounded-lg border border-border"
            animate={{
              opacity: activeStage ? 1 : 0.7,
              y: activeStage ? 0 : 10,
            }}
          >
            {activeStage ? (
              <>
                <div className="flex items-center mb-3">
                  <Info size={18} className="text-primary mr-2" />
                  <h3 className="text-xl font-heading font-medium">
                    {pipelineStages.find((s) => s.id === activeStage)?.name}{" "}
                    Stage
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {
                    pipelineStages.find((s) => s.id === activeStage)
                      ?.description
                  }
                </p>
              </>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>Select a stage to view details</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
