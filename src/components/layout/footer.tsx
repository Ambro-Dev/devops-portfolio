// src/components/layout/footer.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useSound } from "@/hooks/use-sound-effects";
import { useSoundStore } from "@/hooks/use-sound-effects";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Footer() {
  const { enabled: soundEnabled, toggleEnabled: toggleSound } = useSoundStore();
  const { playSound } = useSound();
  const [year] = useState(() => new Date().getFullYear());

  const handleSoundToggle = () => {
    toggleSound();
    if (!soundEnabled) {
      playSound("ui");
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-heading font-bold text-xl text-foreground"
                onClick={() => playSound("click")}
              >
                JD<span className="text-primary">.</span>Dev
              </motion.div>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Fullstack Developer oraz DevOps Engineer z pasją do tworzenia
              skalowalnych i wydajnych aplikacji web. Ekspert w dziedzinie
              automatyzacji, konteneryzacji i infrastruktury jako kod.
            </p>
            <div className="flex space-x-4 mb-4">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onMouseEnter={() => playSound("hover")}
                onClick={() => playSound("click")}
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onMouseEnter={() => playSound("hover")}
                onClick={() => playSound("click")}
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onMouseEnter={() => playSound("hover")}
                onClick={() => playSound("click")}
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:contact@example.com"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onMouseEnter={() => playSound("hover")}
                onClick={() => playSound("click")}
              >
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </motion.a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-heading font-medium text-lg mb-4">Menu</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/projects", label: "Projekty" },
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "O mnie" },
                { href: "/contact", label: "Kontakt" },
              ].map((link) => (
                <motion.li key={link.href} whileHover={{ x: 2 }}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onMouseEnter={() => playSound("hover")}
                    onClick={() => playSound("click")}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Tech Stack */}
          <div>
            <h3 className="font-heading font-medium text-lg mb-4">
              Tech Stack
            </h3>
            <ul className="space-y-2">
              {[
                { label: "React & Next.js" },
                { label: "TypeScript" },
                { label: "Docker & Kubernetes" },
                { label: "AWS & Google Cloud" },
                { label: "CI/CD (GitHub Actions, Jenkins)" },
                { label: "Node.js & Express" },
              ].map((tech, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 2 }}
                  className="text-muted-foreground"
                >
                  {tech.label}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {year} John Doe. Wszelkie prawa zastrzeżone.
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSoundToggle}
              className="text-xs"
              onMouseEnter={() => playSound("hover")}
            >
              Dźwięki: {soundEnabled ? "Włączone" : "Wyłączone"}
            </Button>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              onMouseEnter={() => playSound("hover")}
              onClick={(e) => {
                e.preventDefault();
                playSound("click");
                alert(
                  'Easter egg found! Type "terminal" anywhere on the page to access the Linux terminal.'
                );
              }}
            >
              v1.0.0
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
