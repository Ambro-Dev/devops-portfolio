// src/components/projects/project-showcase.tsx
"use client";

import { useState } from "react";
import { Project, ProjectCard } from "./project-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useSound } from "@/hooks/use-sound-effects";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/page-transition";

// Przykładowe dane projektów
const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "cloud-native-app",
    title: "Cloud Native Application",
    description:
      "Scalable microservices application deployed on Kubernetes with complete CI/CD pipeline.",
    coverImage: "/images/projects/cloud-native.jpg",
    technologies: [
      "React",
      "Node.js",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Terraform",
    ],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "2",
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    description:
      "Full-featured online store with product management, cart, and payment processing.",
    coverImage: "/images/projects/ecommerce.jpg",
    technologies: [
      "Next.js",
      "TypeScript",
      "Stripe",
      "MongoDB",
      "Redis",
      "AWS",
    ],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "3",
    slug: "devops-dashboard",
    title: "DevOps Monitoring Dashboard",
    description:
      "Real-time monitoring and alerting system for cloud infrastructure and applications.",
    coverImage: "/images/projects/monitoring.jpg",
    technologies: [
      "Vue.js",
      "Go",
      "Prometheus",
      "Grafana",
      "Kubernetes",
      "GCP",
    ],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "4",
    slug: "serverless-api",
    title: "Serverless API Framework",
    description:
      "Event-driven API architecture using serverless functions and event streams.",
    coverImage: "/images/projects/serverless.jpg",
    technologies: [
      "AWS Lambda",
      "API Gateway",
      "DynamoDB",
      "TypeScript",
      "Serverless Framework",
    ],
    githubUrl: "https://github.com",
  },
  {
    id: "5",
    slug: "blockchain-app",
    title: "Blockchain Application",
    description:
      "Decentralized application with smart contracts and web3 integration.",
    coverImage: "/images/projects/blockchain.jpg",
    technologies: ["Solidity", "Ethereum", "Web3.js", "React", "Hardhat"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "6",
    slug: "data-pipeline",
    title: "Big Data Processing Pipeline",
    description:
      "Scalable data processing system for real-time analytics and reporting.",
    coverImage: "/images/projects/data-pipeline.jpg",
    technologies: ["Apache Kafka", "Spark", "Airflow", "Python", "AWS"],
    githubUrl: "https://github.com",
  },
];

const CATEGORIES = [
  { id: "all", label: "Wszystkie" },
  { id: "web", label: "Web Development" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "mobile", label: "Mobile" },
];

interface ProjectShowcaseProps {
  limit?: number;
  showFilters?: boolean;
  featured?: boolean;
}

export function ProjectShowcase({
  limit = 6,
  showFilters = true,
  featured = false,
}: ProjectShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(limit);
  const { playSound } = useSound();

  // Filtruj projekty wg kategorii i opcjonalnie tylko featured
  const filteredProjects = PROJECTS.filter((project) => {
    if (featured && !project.featured) return false;
    if (activeCategory === "all") return true;

    // Symulowane mapowanie kategorii na technologie
    const categoryTechMap: Record<string, string[]> = {
      web: ["React", "Vue.js", "Next.js", "JavaScript", "TypeScript"],
      cloud: ["AWS", "GCP", "Kubernetes", "Docker", "Terraform"],
      mobile: ["React Native", "Flutter", "Swift", "Kotlin"],
    };

    return project.technologies.some((tech) =>
      categoryTechMap[activeCategory]?.includes(tech)
    );
  });

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = displayedProjects.length < filteredProjects.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
    playSound("click");
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(limit);
    playSound("ui");
  };

  return (
    <section id="projects" className="py-12">
      <div className="container mx-auto px-4">
        <StaggerContainer delay={0.1} childrenDelay={0.05}>
          <StaggerItem>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2 text-center">
              Moje Projekty
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto text-center">
              Portfolio wybranych projektów demonstrujących moje umiejętności w
              zakresie full-stack developmentu i inżynierii DevOps.
            </p>
          </StaggerItem>

          {showFilters && (
            <StaggerItem>
              <Tabs
                defaultValue="all"
                value={activeCategory}
                className="flex flex-col items-center mb-10"
              >
                <TabsList>
                  {CATEGORIES.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </StaggerItem>
          )}

          <StaggerItem>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {displayedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </StaggerItem>

          {hasMore && (
            <StaggerItem>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  className="group"
                  onMouseEnter={() => playSound("hover")}
                >
                  Zobacz więcej
                  <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                </Button>
              </div>
            </StaggerItem>
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}
