"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  speed?: number;
  className?: string;
}

export function ParallaxContainer({
  children,
  direction = "up",
  speed = 0.2,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = 100 * speed;

  // Create all possible transform values at the component top level
  const upTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [`0%`, `-${distance}%`]
  );
  const downTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [`0%`, `${distance}%`]
  );
  const leftTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [`0%`, `-${distance}%`]
  );
  const rightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [`0%`, `${distance}%`]
  );

  // Choose the appropriate transform based on direction
  let transform;
  const isVertical = direction === "up" || direction === "down";

  switch (direction) {
    case "up":
      transform = upTransform;
      break;
    case "down":
      transform = downTransform;
      break;
    case "left":
      transform = leftTransform;
      break;
    case "right":
      transform = rightTransform;
      break;
    default:
      transform = upTransform;
  }

  const transformStyle = isVertical ? { y: transform } : { x: transform };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={transformStyle} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
