"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  Users,
  GraduationCap,
  BookOpen,
  Wallet,
  ShieldCheck,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { FloatingNav } from "@/components/marketing/floating-nav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/* ── images ──────────────────────────────────────────────────────── */
// Replace with your own once ready; these are Unsplash placeholders.
const DASHBOARD_PHOTO =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&fit=crop";
const CAMPUS_PHOTO =
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=2000&q=80&fit=crop";

/* ── data ─────────────────────────────────────────────────────────── */
const MODULES = [
  {
    icon: Users,
    title: "Employee operations",
    copy: "Onboard faculty and staff, assign roles, connect departments, and keep service records clean.",
  },
  {
    icon: GraduationCap,
    title: "Student lifecycle",
    copy: "Move from application to enrollment, batches, sections, guardians, and academic status.",
  },
  {
    icon: BookOpen,
    title: "Academic control",
    copy: "Manage years, terms, programs, courses, timetables, exams, and results in one place.",
  },
  {
    icon: Wallet,
    title: "Fees and accounting",
    copy: "Invoices, payments, refunds, scholarships, payroll, and ledger-ready records.",
  },
  {
    icon: ShieldCheck,
    title: "Permissions and audit",
    copy: "Role-based access for each office, with audit trails for every sensitive action.",
  },
  {
    icon: LayoutDashboard,
    title: "Multi‑campus ready",
    copy: "Hierarchies for institutes, campuses, schools, and departments — from day one.",
  },
];

const REASONS = [
  {
    title: "Built for the Indian university",
    copy: "PAN, Aadhaar, UAN, GST. Indian academic terms, fee structures, and reporting formats — out of the box.",
  },
  {
    title: "One source of truth",
    copy: "Students, employees, courses, fees, and exams in a single relational database. No more reconciling spreadsheets.",
  },
  {
    title: "Modern, fast, calm",
    copy: "A polished web interface that keeps daily operations quiet, with sub-second responses and clear hierarchy.",
  },
];

const STATS = [
  { value: "12+", label: "Connected modules" },
  { value: "1,200+", label: "Permission actions" },
  { value: "Sub-second", label: "Page response" },
  { value: "Multi‑campus", label: "From day one" },
];

/* ── animation helpers ───────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── page ─────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main className="relative">
      <FloatingNav />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-0">
        {/* Dot grid — fades toward bottom */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-line-2) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage:
              "radial-gradient(ellipse 85% 65% at 50% 0%, black 5%, transparent 72%)",
          }}
        />
        {/* Accent glow behind mockup */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 -z-10 w-[1100px] h-[520px]"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(44% 0.18 148 / 0.10) 0%, transparent 65%)",
            filter: "blur(32px)",
          }}
        />

        {/* Centered text block */}
        <div className="max-w-[920px] mx-auto px-6 pt-32 md:pt-44 text-center">
          {/* Pill label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex justify-center mb-7"
          >
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] font-medium text-[var(--color-ink-3)] border border-[var(--color-line-2)] rounded-full px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              University Management System
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="text-[clamp(2.6rem,6.5vw,5.75rem)] leading-[1.0] tracking-[-0.04em] font-semibold text-[var(--color-ink)]"
          >
            Run your university<br className="hidden sm:block" /> like the institution it is.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            className="mt-6 text-[clamp(0.95rem,1.3vw,1.1rem)] leading-relaxed text-[var(--color-ink-2)] max-w-[52ch] mx-auto"
          >
            Admissions, employees, academics, fees, exams, and institutional
            records — one calm system so every office works from the same
            source of truth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Button asChild size="lg" className="group">
              <Link href="/login">
                <span>Open the portal</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#platform">See the platform</a>
            </Button>
          </motion.div>
        </div>

        {/* Perspective browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 56, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.05, delay: 0.42, ease: EASE }}
          className="relative mt-14 mx-4 sm:mx-8 md:mx-14 lg:mx-24"
          style={{ perspective: "2400px" }}
        >
          <div
            className="relative rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-line)] shadow-[0_32px_100px_-20px_oklch(20%_0.025_150/0.22)]"
            style={{ transform: "rotateX(4deg)", transformOrigin: "50% 0%" }}
          >
            {/* macOS-style chrome */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-line)] bg-[var(--color-surface)]">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
              </div>
              <div className="flex-1 mx-4 h-6 rounded-md bg-[var(--color-surface-2)] flex items-center justify-center">
                <span
                  className="text-[11px] text-[var(--color-ink-3)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  app.universitas.in
                </span>
              </div>
              <div className="w-[52px]" />
            </div>
            {/* Screenshot */}
            <div className="relative aspect-[16/9]">
              <Image
                src={DASHBOARD_PHOTO}
                alt="Universitas dashboard"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1232px"
                className="object-cover object-top"
              />
            </div>
          </div>
          {/* Fade to page bg */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />
        </motion.div>
      </section>

      {/* ── PLATFORM ──────────────────────────────────────────────── */}
      <section className="px-6 py-24 border-t border-[var(--color-line)]" id="platform">
        <div className="max-w-[1180px] mx-auto">
          <FadeIn className="text-center mb-12 max-w-[640px] mx-auto">
            <Badge tone="accent" className="mb-5 mx-auto">
              The platform
            </Badge>
            <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-tight font-semibold">
              Every record, every office, one calm interface.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-line)] shadow-[0_24px_72px_-24px_oklch(20%_0.025_150/0.18)]">
              {/* browser chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--color-line)] bg-[var(--color-surface)]">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-line-2)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-line-2)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-line-2)]" />
                <span
                  className="ml-auto mr-auto text-[11px] text-[var(--color-ink-3)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  app.universitas.in / dashboard
                </span>
                <span aria-hidden className="w-[52px]" />
              </div>
              <div className="relative aspect-[16/9]">
                <Image
                  src={DASHBOARD_PHOTO}
                  alt="Dashboard preview"
                  fill
                  sizes="(max-width: 1180px) 100vw, 1180px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)]/30 to-transparent" />
                <p
                  className="absolute bottom-4 right-4 text-[11px] px-2.5 py-1 rounded-full bg-[var(--color-surface)]/80 backdrop-blur-sm border border-[var(--color-line)] text-[var(--color-ink-3)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Dashboard image coming soon
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────────────────────── */}
      <section className="px-6 py-16 border-t border-[var(--color-line)]">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[1180px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={cardItem}>
              <p
                className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none tracking-tight font-semibold text-[var(--color-ink)] whitespace-nowrap"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[var(--color-ink-3)]">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── MODULES ───────────────────────────────────────────────── */}
      <section
        className="px-6 py-24 md:py-32 border-t border-[var(--color-line)]"
        id="modules"
      >
        <div className="max-w-[1180px] mx-auto">
          <FadeIn className="max-w-[680px] mb-16">
            <Badge tone="accent" className="mb-5">
              Connected modules
            </Badge>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-tight font-semibold">
              Start with employees. Scale into the whole campus.
            </h2>
            <p className="mt-5 text-[var(--color-ink-2)] text-base leading-relaxed max-w-[58ch]">
              Every module shares the same data layer, the same permissions
              system, and the same calm interface — so adding a department or
              office never means stitching tools together.
            </p>
          </FadeIn>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {MODULES.map((mod) => {
              const Icon = mod.icon;
              return (
                <motion.article
                  key={mod.title}
                  variants={cardItem}
                  className="group p-6 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] hover:border-[var(--color-line-2)] hover:bg-[var(--color-bg)] transition-all duration-300"
                >
                  <div className="grid place-items-center h-10 w-10 rounded-[var(--radius-sm)] bg-[var(--color-accent-soft)] text-[var(--color-accent)] mb-5 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mb-2">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                    {mod.copy}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── PHOTO BREAK ───────────────────────────────────────────── */}
      <section className="relative px-6 py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={CAMPUS_PHOTO}
            alt="University library interior"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[oklch(15%_0.012_150/0.70)]" />
        </div>

        <FadeIn className="max-w-[860px] mx-auto text-center">
          <p
            className="text-xs uppercase tracking-[0.18em] mb-6"
            style={{ color: "oklch(85% 0.06 130)" }}
          >
            A note to the registrar
          </p>
          <p
            className="text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.25] tracking-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            "A university runs on careful records, considered decisions, and
            the steady labour of the people behind the scenes."
          </p>
        </FadeIn>
      </section>

      {/* ── AI / INSIGHT ──────────────────────────────────────────── */}
      <section className="px-6 py-24 md:py-32 border-t border-[var(--color-line)]">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <FadeIn>
            <Badge tone="accent" className="mb-5">
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              <span>Intelligent operations</span>
            </Badge>
            <h2 className="text-[clamp(1.875rem,4vw,3rem)] leading-[1.05] tracking-tight font-semibold">
              Ask anything. Move faster.
            </h2>
            <p className="mt-5 text-[var(--color-ink-2)] text-base leading-relaxed max-w-[52ch]">
              Universitas understands your institution&apos;s data structure —
              query attendance, fees, employee records, or academic progress
              with natural language.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-[var(--radius-xl)] bg-[var(--color-ink)] text-[var(--color-accent-ink)] p-8 md:p-10 shadow-[0_24px_72px_-24px_oklch(20%_0.025_150/0.32)]">
              <p
                className="text-xs uppercase tracking-[0.14em] mb-4"
                style={{ color: "oklch(82% 0.05 130)" }}
              >
                Ask Universitas
              </p>
              <p className="text-[clamp(1.25rem,2.5vw,1.875rem)] leading-tight tracking-tight font-medium">
                &ldquo;Show employees on leave this month with pending
                approvals.&rdquo;
              </p>
              <Separator className="my-6 bg-[oklch(40%_0.04_150)]" />
              <p className="text-sm" style={{ color: "oklch(82% 0.04 130)" }}>
                18 matching records — across HR and 4 department workflows.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── WHY ───────────────────────────────────────────────────── */}
      <section
        className="px-6 py-24 md:py-32 border-t border-[var(--color-line)]"
        id="why"
      >
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
            <FadeIn>
              <Badge tone="accent" className="mb-5">
                Why Universitas
              </Badge>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight font-semibold">
                Software that respects your institution.
              </h2>
            </FadeIn>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-10"
            >
              {REASONS.map((r, i) => (
                <motion.div
                  key={r.title}
                  variants={cardItem}
                  className="grid grid-cols-[auto_1fr] gap-5 pb-10 last:pb-0 border-b last:border-b-0 border-[var(--color-line)]"
                >
                  <span
                    className="text-[var(--color-ink-3)] text-sm tabular-nums pt-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight mb-2">
                      {r.title}
                    </h3>
                    <p className="text-[var(--color-ink-2)] leading-relaxed">
                      {r.copy}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── REQUEST DEMO ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "oklch(11% 0.022 150)" }}
        id="pricing"
      >
        {/* subtle dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(oklch(90% 0.01 150) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* top glow */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent"
        />

        <div className="relative max-w-[1180px] mx-auto px-6 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 items-start">
          {/* Left: copy */}
          <FadeIn>
            <p
              className="text-xs uppercase tracking-[0.18em] font-medium mb-6"
              style={{ color: "oklch(65% 0.14 148)" }}
            >
              Get started
            </p>
            <h2
              className="text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.0] tracking-[-0.04em] font-semibold"
              style={{ color: "oklch(97% 0.008 110)" }}
            >
              See it with your institution&apos;s data.
            </h2>
            <p
              className="mt-6 text-[clamp(1rem,1.2vw,1.1rem)] leading-relaxed max-w-[50ch]"
              style={{ color: "oklch(68% 0.016 150)" }}
            >
              Book a 30-minute walkthrough. We&apos;ll map Universitas to your
              current workflows — no generic demo, no sales script.
            </p>

            {/* Email form */}
            <form
              className="mt-10 flex flex-col sm:flex-row gap-3 max-w-[480px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="registrar@university.edu"
                className="flex-1 h-12 px-4 rounded-full text-sm bg-white/8 border border-white/12 text-white placeholder:text-white/30 outline-none focus:border-[oklch(65%_0.14_148)] transition-colors duration-200"
              />
              <Button
                type="submit"
                size="lg"
                className="shrink-0 bg-[oklch(44%_0.18_148)] text-white hover:bg-[oklch(49%_0.20_148)] border-0"
              >
                Book a demo
              </Button>
            </form>
            <p
              className="mt-4 text-xs"
              style={{ color: "oklch(48% 0.014 150)" }}
            >
              Free · 30-minute walkthrough · Response within 24 hours
            </p>
          </FadeIn>

          {/* Right: key facts */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 gap-4 pt-2"
          >
            {[
              { value: "30 min", label: "Demo session" },
              { value: "Free", label: "No cost, ever for demo" },
              { value: "12+", label: "Modules covered" },
              { value: "24 h", label: "Response time" },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={cardItem}
                className="p-5 rounded-[var(--radius-lg)] border"
                style={{
                  background: "oklch(25% 0.018 150 / 0.5)",
                  borderColor: "oklch(35% 0.018 150)",
                }}
              >
                <p
                  className="text-[clamp(1.75rem,3vw,2.25rem)] leading-none tracking-tight font-semibold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "oklch(65% 0.14 148)",
                  }}
                >
                  {s.value}
                </p>
                <p
                  className="mt-2 text-xs uppercase tracking-[0.1em]"
                  style={{ color: "oklch(50% 0.016 150)" }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-6 py-12 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
        <div className="max-w-[1180px] mx-auto flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--color-ink-3)]">
          <span className="wordmark text-xl text-[var(--color-ink-2)]">
            Universitas<span className="text-[var(--color-accent)]">.</span>
          </span>
          <p className="text-xs" style={{ fontFamily: "var(--font-mono)" }}>
            © {new Date().getFullYear()} · v0.1.0 · All rights reserved
          </p>
        </div>
      </footer>
    </main>
  );
}
