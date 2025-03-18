// src/components/animations/stagger-animation.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  childrenDelay?: number;
  viewport?: boolean;
}

export function StaggerContainer({
  children,
  className = "",
  delay = 0,
  childrenDelay = 0.1,
  viewport = true,
}: StaggerContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: childrenDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      viewport={viewport ? { once: true, amount: 0.25 } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  customVariant?: "fadeIn" | "slideUp" | "slideRight" | "scale";
}

export function StaggerItem({
  children,
  className = "",
  customVariant = "fadeIn",
}: StaggerItemProps) {
  // Predefiniowane warianty animacji
  const variantTypes = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5 } },
    },
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    },
    slideRight: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    },
  };

  return (
    <motion.div variants={variantTypes[customVariant]} className={className}>
      {children}
    </motion.div>
  );
}
