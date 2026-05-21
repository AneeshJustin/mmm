"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  MapPin,
  Music,
  Car,
  Building2,
  PartyPopper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Template } from "@/components/featured-templates";
import { getStoryVideos } from "@/lib/story-videos";
import { CinematicVideoSection } from "@/components/scroll-story/cinematic-video-section";
import { RealisticLanterns } from "@/components/scroll-story/realistic-lanterns";
import {
  DamaskPattern,
  FloralPaperPattern,
} from "@/components/scroll-story/damask-pattern";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollStoryData {
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  message: string;
  date: string;
  time: string;
  venue: string;
  venueAddress: string;
  couplePhoto: string | null;
}

interface ScrollStoryInvitationProps {
  template: Template;
  data: ScrollStoryData;
  compact?: boolean;
  className?: string;
}

const themes = {
  hindu: {
    teal: "#3d8b7a",
    tealDark: "#2d6b5c",
    gold: "#d4af37",
    cream: "#fdf8ef",
    pink: "rgba(232, 196, 208, 0.82)",
    olive: "rgba(138, 143, 92, 0.88)",
  },
  muslim: {
    teal: "#0d9488",
    tealDark: "#065f46",
    gold: "#d4af37",
    cream: "#f0fdf4",
    pink: "rgba(167, 243, 208, 0.75)",
    olive: "rgba(77, 124, 15, 0.85)",
  },
  christian: {
    teal: "#3b6b8c",
    tealDark: "#1e3a5f",
    gold: "#d4af37",
    cream: "#f8fafc",
    pink: "rgba(226, 232, 240, 0.8)",
    olive: "rgba(100, 116, 139, 0.85)",
  },
};

function SectionReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GlassEventCard({
  title,
  date,
  venue,
  time,
  accent,
}: {
  title: string;
  date: string;
  venue: string;
  time: string;
  accent: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative flex-1 min-w-[140px] max-w-[200px] rounded-b-3xl rounded-t-[3rem] px-4 py-8 text-center overflow-hidden"
      style={{
        background: "rgba(255, 252, 247, 0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${accent}44`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, ${accent}22 0%, transparent 60%)`,
        }}
      />
      <h4
        className="text-sm font-bold tracking-[0.2em] uppercase mb-4 relative z-10 text-white"
        style={{ textShadow: `0 0 20px ${accent}` }}
      >
        {title}
      </h4>
      <p className="text-[11px] text-white/85 leading-relaxed relative z-10">
        {date}
      </p>
      <p className="text-[11px] text-white/70 mt-1 relative z-10">{venue}</p>
      <p className="text-[10px] text-white/55 mt-2 relative z-10">{time}</p>
    </motion.div>
  );
}

export function ScrollStoryInvitation({
  template,
  data,
  compact = false,
  className = "",
}: ScrollStoryInvitationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = themes[template.religion];
  const videos = getStoryVideos(template.religion);
  const sectionMin = compact ? "min-h-[420px]" : "min-h-screen";
  const sectionMinMed = compact ? "min-h-[380px]" : "min-h-[85vh]";
  const parallax = !compact;

  useEffect(() => {
    if (compact || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".story-section-title").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 82%" },
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [compact]);

  const coupleLine = `${data.brideName} & ${data.groomName}`;

  const content = (
    <div
      ref={containerRef}
      data-capture-root
      data-religion={template.religion}
      className={cn(
        "relative bg-black text-[#fdf8ef]",
        compact ? "h-full overflow-y-auto overflow-x-hidden" : "min-h-full",
        className,
      )}
      style={compact ? undefined : { scrollSnapType: "y mandatory" }}
    >
      {/* 1 — Hero: real video + sky lanterns */}
      <CinematicVideoSection
        video={videos.hero}
        overlayClassName="bg-gradient-to-b from-indigo-950/55 via-blue-950/40 to-black/65"
        minHeight={sectionMin}
        parallax={parallax}
        scrollSnap={!compact}
      >
        <RealisticLanterns count={compact ? 12 : 22} />
        <SectionReveal className="flex flex-col items-center justify-end text-center px-6 pb-16 pt-24 min-h-[inherit] max-w-lg mx-auto">
          <motion.p
            className="text-xs tracking-[0.35em] uppercase mb-4 text-amber-200/90"
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Wedding Invitation
          </motion.p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            {data.brideName}
            <span className="block text-2xl md:text-3xl my-2 text-amber-200/95">
              &
            </span>
            {data.groomName}
          </h2>
          <p className="mt-4 text-sm text-white/80 max-w-xs mx-auto drop-shadow-md">
            {data.message}
          </p>
        </SectionReveal>
      </CinematicVideoSection>

      {/* 2 — Names on video + teal veil */}
      <CinematicVideoSection
        video={videos.names}
        overlayClassName="bg-teal-900/72"
        minHeight={sectionMin}
        parallax={parallax}
        scrollSnap={!compact}
      >
        <DamaskPattern opacity={0.1} />
        <RealisticLanterns count={compact ? 8 : 14} />
        <SectionReveal className="flex flex-col items-center justify-center text-center px-6 py-16 max-w-md mx-auto min-h-[inherit]">
          <p className="text-sm text-white/85 mb-2">{data.brideParents}</p>
          <p className="text-sm text-white/85 mb-8">{data.groomParents}</p>
          <h2
            className="story-section-title text-4xl md:text-6xl font-serif font-light tracking-wide"
            style={{ color: theme.cream }}
          >
            {data.brideName}
          </h2>
          <p
            className="text-2xl md:text-3xl font-serif italic my-2"
            style={{ color: theme.gold }}
          >
            &
          </p>
          <h2
            className="story-section-title text-4xl md:text-6xl font-serif font-light tracking-wide"
            style={{ color: theme.cream }}
          >
            {data.groomName}
          </h2>
          <p className="mt-10 text-xs tracking-[0.25em] uppercase text-white/75">
            On the following events
          </p>
        </SectionReveal>
      </CinematicVideoSection>

      {/* 3 — Events over live video */}
      <CinematicVideoSection
        video={videos.events}
        overlayClassName="bg-emerald-950/78"
        minHeight={sectionMinMed}
        parallax={parallax}
        scrollSnap={!compact}
      >
        <DamaskPattern opacity={0.08} />
        <SectionReveal className="flex flex-col items-center justify-center px-4 py-14 w-full max-w-lg mx-auto min-h-[inherit]">
          <div className="flex gap-4 justify-center flex-wrap w-full">
            <GlassEventCard
              title="Mehendi"
              date={data.date}
              venue={data.venue}
              time={data.time}
              accent={theme.teal}
            />
            <GlassEventCard
              title="Haldi"
              date={data.date}
              venue={data.venue}
              time="Morning ceremony"
              accent={theme.teal}
            />
          </div>
          <div className="flex gap-4 justify-center flex-wrap mt-4 w-full">
            <GlassEventCard
              title="Wedding"
              date={data.date}
              venue={data.venue}
              time={data.time}
              accent={theme.gold}
            />
            <GlassEventCard
              title="Reception"
              date={data.date}
              venue={data.venue}
              time="Evening celebration"
              accent={theme.gold}
            />
          </div>
        </SectionReveal>
      </CinematicVideoSection>

      {/* 4 — Meet the couple — video + soft veil */}
      <CinematicVideoSection
        video={videos.couple}
        overlayClassName="bg-rose-950/35"
        minHeight={sectionMin}
        parallax={parallax}
        scrollSnap={!compact}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: theme.pink }}
        />
        <FloralPaperPattern opacity={0.2} />
        <SectionReveal className="flex flex-col items-center justify-center text-center px-6 py-20 max-w-lg mx-auto min-h-[inherit]">
          <p className="text-xs tracking-[0.3em] uppercase text-white/80 mb-3">
            Meet the
          </p>
          <h2 className="story-section-title text-3xl md:text-5xl font-serif text-white tracking-[0.15em] uppercase leading-tight drop-shadow-lg">
            Bride and Groom
          </h2>
          <p className="mt-8 text-sm md:text-base text-white/85 leading-relaxed font-light max-w-md">
            {data.message}
          </p>
          {data.couplePhoto ? (
            <motion.img
              src={data.couplePhoto}
              alt={coupleLine}
              className="mt-8 w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-white/40 shadow-2xl mx-auto"
              initial={{ scale: 0.92, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
            />
          ) : (
            <motion.div
              className="mt-8 w-36 h-36 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 40px rgba(255,255,255,0.1)",
                  "0 0 60px rgba(212,175,55,0.25)",
                  "0 0 40px rgba(255,255,255,0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-4xl font-serif text-white/90">
                {data.brideName[0]}&{data.groomName[0]}
              </span>
            </motion.div>
          )}
        </SectionReveal>
      </CinematicVideoSection>

      {/* 5 — Route / venue — video only */}
      <CinematicVideoSection
        video={videos.route}
        overlayClassName="bg-teal-950/70"
        minHeight={compact ? "min-h-[360px]" : "min-h-[75vh]"}
        parallax={parallax}
        scrollSnap={!compact}
      >
        <DamaskPattern opacity={0.1} />
        <SectionReveal className="flex flex-col items-center justify-center text-center px-6 py-16 min-h-[inherit]">
          <h2 className="story-section-title text-2xl md:text-4xl font-serif tracking-[0.25em] uppercase text-amber-200">
            See the Route
          </h2>
          <p className="mt-4 text-sm text-white/80 flex items-center justify-center gap-2 max-w-sm">
            <MapPin className="w-4 h-4 shrink-0 text-amber-300" />
            {data.venueAddress}
          </p>
          <motion.button
            type="button"
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venueAddress)}`,
                "_blank",
                "noopener,noreferrer",
              )
            }
            className="mt-8 px-8 py-3 rounded-full border border-amber-300/40 text-amber-100 text-xs tracking-[0.2em] uppercase backdrop-blur-md bg-black/25 hover:bg-black/40 transition"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Open ${data.venueAddress} in Google Maps`}
          >
            Open in Maps
          </motion.button>
        </SectionReveal>
      </CinematicVideoSection>

      {/* 6 — Car arrival / journey */}
      <CinematicVideoSection
        video={videos.car}
        overlayClassName="bg-gradient-to-b from-rose-950/50 via-fuchsia-950/35 to-black/55"
        minHeight={compact ? "min-h-[380px]" : "min-h-[80vh]"}
        parallax={parallax}
        scrollSnap={!compact}
      >
        <FloralPaperPattern opacity={0.22} />
        <SectionReveal className="flex flex-col items-center justify-center text-center px-6 py-20 min-h-[inherit]">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Car
              className="w-12 h-12 text-amber-200/90 mx-auto mb-6"
              strokeWidth={1.2}
            />
          </motion.div>
          <p className="text-xs tracking-[0.35em] uppercase text-rose-100/70 mb-3">
            The Journey
          </p>
          <h2 className="story-section-title text-3xl md:text-5xl font-serif tracking-[0.12em] uppercase text-white drop-shadow-lg">
            Arrive in Style
          </h2>
          <p className="mt-6 text-sm text-white/75 max-w-sm leading-relaxed">
            A graceful arrival awaits — vintage charm and golden hour light as
            you make your way to the celebration.
          </p>
          <motion.p
            className="mt-8 text-xs tracking-[0.2em] uppercase text-amber-200/80"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {data.time} · {data.venue}
          </motion.p>
        </SectionReveal>
      </CinematicVideoSection>

      {/* 7 — Grand auditorium / reception hall */}
      <CinematicVideoSection
        video={videos.auditorium}
        overlayClassName="bg-gradient-to-t from-amber-950/85 via-black/50 to-amber-900/40"
        minHeight={sectionMin}
        parallax={parallax}
        scrollSnap={!compact}
      >
        <RealisticLanterns count={compact ? 10 : 16} />
        <DamaskPattern opacity={0.08} />
        <SectionReveal className="flex flex-col items-center justify-center text-center px-6 py-20 min-h-[inherit] max-w-lg mx-auto">
          <Building2
            className="w-11 h-11 text-amber-300/90 mx-auto mb-5"
            strokeWidth={1.2}
          />
          <p className="text-xs tracking-[0.35em] uppercase text-amber-200/70 mb-3">
            The Venue
          </p>
          <h2 className="story-section-title text-3xl md:text-5xl font-serif tracking-[0.1em] uppercase text-amber-50">
            Grand Auditorium
          </h2>
          <p className="mt-2 text-lg font-serif italic text-amber-200/80">
            Reception Hall
          </p>
          <p className="mt-8 text-sm text-white/80 leading-relaxed">
            Golden arches, candlelight, and royal Kerala hospitality — where
            families gather and memories are made.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["Wedding", "Reception"].map((label) => (
              <span
                key={label}
                className="px-5 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase border border-amber-300/35 text-amber-100/90 backdrop-blur-md bg-black/25"
              >
                {label}
              </span>
            ))}
          </div>
        </SectionReveal>
      </CinematicVideoSection>

      {/* 8 — Celebration / follow the magic */}
      <CinematicVideoSection
        video={videos.celebration}
        overlayClassName="bg-stone-900/60"
        minHeight={compact ? "min-h-[320px]" : "min-h-[70vh]"}
        parallax={parallax}
        scrollSnap={!compact}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: theme.olive }}
        />
        <SectionReveal className="flex flex-col items-center justify-center text-center px-6 py-16 min-h-[inherit]">
          <PartyPopper className="w-10 h-10 text-amber-300 mx-auto mb-4" />
          <h2 className="story-section-title text-2xl md:text-3xl font-serif tracking-[0.2em] uppercase text-white/95">
            Follow the Celebration
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2 text-white/90">
            <Calendar className="w-4 h-4 text-amber-300" />
            <span className="text-sm tracking-wide">{data.date}</span>
          </div>
          <p className="mt-2 text-sm text-white/75">{data.time}</p>
          <motion.div
            className="mt-10 w-14 h-14 rounded-full border-2 border-amber-300/40 flex items-center justify-center"
            animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <div className="w-9 h-9 rounded-full border border-amber-200/30" />
          </motion.div>
        </SectionReveal>
      </CinematicVideoSection>

      {/* 9 — Finale palace — real video */}
      <CinematicVideoSection
        video={videos.finale}
        overlayClassName="bg-gradient-to-t from-black/80 via-black/45 to-indigo-950/40"
        minHeight={sectionMin}
        parallax={parallax}
        scrollSnap={!compact}
      >
        <RealisticLanterns count={compact ? 10 : 18} />
        <SectionReveal className="flex flex-col items-center justify-end text-center px-6 pb-20 pt-28 max-w-md mx-auto min-h-[inherit]">
          <h2 className="text-3xl md:text-4xl font-serif text-amber-50 drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
            {data.venue}
          </h2>
          <p className="mt-4 text-sm text-amber-100/75 tracking-wide">
            {data.venueAddress}
          </p>
          <motion.div
            className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-200/35 text-amber-100/90 text-xs tracking-widest uppercase backdrop-blur-md bg-black/30"
            whileHover={{ scale: 1.05 }}
          >
            <Music className="w-3.5 h-3.5" />
            With love, {coupleLine}
          </motion.div>
        </SectionReveal>
      </CinematicVideoSection>
    </div>
  );

  if (compact) {
    return content;
  }

  return (
    <div className={cn("w-full", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-4 right-4 z-50 pointer-events-none"
      >
        <span className="px-3 py-1 rounded-full bg-black/50 text-amber-200/90 text-[10px] tracking-widest uppercase backdrop-blur-md border border-amber-300/25">
          Scroll · Live video
        </span>
      </motion.div>
      {content}
    </div>
  );
}
