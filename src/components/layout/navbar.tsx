// src/components/layout/navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSound } from "@/hooks/use-sound-effects";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projekty" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "O mnie" },
  { href: "/contact", label: "Kontakt" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { playSound } = useSound();

  // Obsługa stanu scrollowania
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Zamknięcie menu po nawigacji
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    playSound("ui");
  };

  const navbarVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <motion.header
      initial="initial"
      animate="animate"
      variants={navbarVariants}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/50 py-2 shadow-sm"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-heading font-bold text-xl text-foreground"
            onClick={() => playSound("click")}
          >
            JD<span className="text-primary">.</span>Dev
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative text-foreground/80 hover:text-foreground transition-colors",
                    pathname === link.href && "text-foreground font-medium"
                  )}
                  onMouseEnter={() => playSound("hover")}
                  onClick={() => playSound("click")}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeSwitcher />
        </nav>

        {/* Mobile Navigation Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 top-[56px] z-40 bg-background md:hidden"
          >
            <nav className="flex flex-col h-full p-6">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay:
                        0.1 * navLinks.findIndex((l) => l.href === link.href),
                    }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block py-2 text-foreground/80 hover:text-foreground text-xl font-medium transition-colors",
                        pathname === link.href && "text-primary font-medium"
                      )}
                      onClick={() => {
                        setIsOpen(false);
                        playSound("click");
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
