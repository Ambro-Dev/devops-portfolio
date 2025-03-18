// src/app/(landing)/layout.tsx
import { PageTransition } from "@/components/animations/page-transition";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
