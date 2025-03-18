// src/components/projects/project-card.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Github, ExternalLink } from "lucide-react";
import { useSound } from "@/hooks/use-sound-effects";

// Typ dla projektu
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { playSound } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full border-border hover:border-primary/80 transition-colors duration-300">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          {project.featured && (
            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="p-5">
          <h3 className="text-xl font-heading font-medium mt-2 mb-3">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto">
            <Button
              variant="default"
              size="sm"
              asChild
              onMouseEnter={() => playSound("hover")}
            >
              <Link
                href={`/projects/${project.slug}`}
                onClick={() => playSound("click")}
              >
                <Eye className="mr-1 h-4 w-4" />
                Zobacz szczegóły
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  asChild
                  onMouseEnter={() => playSound("hover")}
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("click")}
                  >
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
              )}

              {project.demoUrl && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  asChild
                  onMouseEnter={() => playSound("hover")}
                >
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("click")}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Live Demo</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
