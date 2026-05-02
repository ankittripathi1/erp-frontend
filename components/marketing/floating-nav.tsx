"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Modules", href: "#modules" },
  { label: "Why Universitas", href: "#why" },
  { label: "Pricing", href: "#pricing" },
];

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{ paddingTop: scrolled ? 14 : 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-0 pointer-events-none"
    >
      <motion.nav
        aria-label="Primary"
        initial={false}
        animate={{
          maxWidth: scrolled ? 760 : 1280,
          marginLeft: scrolled ? 16 : 0,
          marginRight: scrolled ? 16 : 0,
          paddingLeft: scrolled ? 10 : 28,
          paddingRight: scrolled ? 10 : 28,
          paddingTop: scrolled ? 8 : 16,
          paddingBottom: scrolled ? 8 : 16,
          borderRadius: scrolled ? 999 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-auto w-full flex items-center gap-2 transition-[background,border-color,box-shadow,backdrop-filter] duration-300",
          scrolled
            ? "bg-[var(--color-surface)]/85 backdrop-blur-xl border border-[var(--color-line-2)] shadow-[0_8px_32px_-12px_oklch(20%_0.025_150/0.18)]"
            : "bg-transparent border-transparent",
        )}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center shrink-0 px-1 group"
          aria-label="Universitas — home"
        >
          <span className="wordmark text-[1.55rem] leading-none text-[var(--color-ink)]">
            Universitas
            <span className="text-[var(--color-accent)]">.</span>
          </span>
        </Link>

        {/* Desktop links — centred */}
        <div className="hidden md:flex items-center gap-0.5 mx-auto">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[13.5px] font-medium text-[var(--color-ink-2)] hover:text-[var(--color-ink)] px-3 py-1.5 transition-colors duration-200 after:absolute after:left-3 after:right-3 after:bottom-0.5 after:h-px after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-250 after:ease-out hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-auto md:ml-0 shrink-0">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center px-3.5 h-9 text-[13.5px] font-medium text-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors duration-200"
          >
            Sign in
          </Link>
          <Button asChild size="sm" className="h-9">
            <Link href="/login">Get started</Link>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" strokeWidth={1.75} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6 w-[300px]">
              <VisuallyHidden.Root>
                <SheetTitle>Navigation</SheetTitle>
              </VisuallyHidden.Root>
              <div className="flex flex-col gap-1 mt-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-[var(--color-ink)] py-3 px-3 rounded-md hover:bg-[var(--color-accent-soft)] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="h-px bg-[var(--color-line)] my-3" />
                <Link
                  href="/login"
                  className="text-base font-medium text-[var(--color-ink-2)] py-3 px-3 rounded-md hover:bg-[var(--color-accent-soft)]"
                >
                  Sign in
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </motion.header>
  );
}
