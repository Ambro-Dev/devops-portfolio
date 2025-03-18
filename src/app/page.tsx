// src/app/(landing)/page.tsx
import { Hero } from "@/components/home/hero";
import { TechCube } from "@/components/home/tech-cube";
import { DevOpsPipeline } from "@/components/home/devops-pipeline";
import { TerminalDemo } from "@/components/home/terminal-demo";
import { ProjectShowcase } from "@/components/projects/project-showcase";
import { EasterEggTerminal } from "@/components/terminal/easter-egg-terminal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-animation";

export function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Technologies Section */}
      <section id="technologies" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <StaggerContainer>
            <StaggerItem customVariant="slideUp">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
                Stack Technologiczny
              </h2>
            </StaggerItem>
            <StaggerItem customVariant="slideUp">
              <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-center">
                Pracuję z nowoczesnymi technologiami, które umożliwiają
                tworzenie skalowalnych, wydajnych i bezpiecznych aplikacji.
              </p>
            </StaggerItem>
            <StaggerItem customVariant="fadeIn">
              <TechCube />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* DevOps Pipeline Section */}
      <DevOpsPipeline />

      {/* Terminal Demo Section */}
      <section id="terminal-demo" className="py-24">
        <div className="container mx-auto px-4">
          <StaggerContainer>
            <StaggerItem customVariant="slideUp">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
                CI/CD Pipeline Demo
              </h2>
            </StaggerItem>
            <StaggerItem customVariant="slideUp">
              <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-center">
                Zobacz symulację działania pipeline&apos;u CI/CD, który
                automatyzuje procesy buildowania, testowania i wdrażania
                aplikacji.
              </p>
            </StaggerItem>
            <StaggerItem customVariant="fadeIn">
              <TerminalDemo />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="featured-projects" className="py-24 bg-muted/30">
        <ProjectShowcase limit={3} showFilters={false} featured={true} />
      </section>

      {/* Easter Egg Terminal */}
      <EasterEggTerminal />
    </>
  );
}

// src/app/(landing)/layout.tsx
import { PageTransition } from "@/components/animations/page-transition";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
