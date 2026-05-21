"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  User,
  Phone,
  Mail,
  Users,
  Heart,
  HeartOff,
  Loader2,
  MessageCircle,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import { AnimatedPetals } from "@/components/animated-petals";
import { KeralaLamp } from "@/components/rsvp/kerala-lamp";
import { RsvpSuccess } from "@/components/rsvp/rsvp-success";
import {
  submitRsvp,
  buildWhatsAppRsvpUrl,
  type RsvpPayload,
} from "@/lib/rsvp-api";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EVENTS = [
  { id: "wedding", label: "Wedding" },
  { id: "reception", label: "Reception" },
  { id: "mehendi", label: "Mehendi" },
  { id: "haldi", label: "Haldi" },
] as const;

const initialForm = {
  name: "",
  phone: "",
  email: "",
  guestCount: 1,
  attendanceStatus: undefined as undefined | "attending" | "declining",
  events: [] as string[],
  mealPreference: "veg" as "veg" | "non-veg",
  message: "",
};

function GlowInput({
  label,
  icon: Icon,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
}) {
  return (
    <motion.div
      className="group"
      whileFocus={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <label className="block text-kerala-gold/70 text-xs tracking-[0.2em] uppercase mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-kerala-gold/50 group-focus-within:text-kerala-gold transition-colors" />
        <input
          {...props}
          className={cn(
            "w-full pl-12 pr-4 py-4 rounded-xl",
            "bg-white/5 backdrop-blur-md border border-kerala-gold/20",
            "text-kerala-ivory placeholder:text-kerala-ivory/30",
            "focus:outline-none focus:border-kerala-gold/60 focus:shadow-[0_0_24px_rgba(212,175,55,0.25)]",
            "transition-all duration-300",
            props.className,
          )}
        />
      </div>
      {error && <p className="text-rose-400/90 text-xs mt-1.5">{error}</p>}
    </motion.div>
  );
}

export function CinematicRsvpForm({
  invitationId = "default",
}: {
  invitationId?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".rsvp-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [submitted]);

  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Valid email required";
    }
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) {
      e.phone = "Valid phone number required";
    }
    if (!form.attendanceStatus) e.attendanceStatus = "Please select attendance";
    if (form.attendanceStatus === "attending" && form.events.length === 0) {
      e.events = "Select at least one event";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload: RsvpPayload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        guestCount: form.guestCount,
        attendanceStatus: form.attendanceStatus as "attending" | "declining",
        events: form.attendanceStatus === "attending" ? form.events : [],
        mealPreference:
          form.attendanceStatus === "attending" ? form.mealPreference : "none",
        message: form.message.trim(),
        invitationId,
      };
      await submitRsvp(payload);
      setSubmitted(true);
    } catch (err) {
      setErrors({
        submit: err instanceof Error ? err.message : "Submission failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleEvent = (id: string) => {
    setForm((f) => ({
      ...f,
      events: f.events.includes(id)
        ? f.events.filter((e) => e !== id)
        : [...f.events, id],
    }));
  };

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
  };

  if (submitted) {
    return (
      <RsvpSuccess
        attending={form.attendanceStatus === "attending"}
        guestName={form.name.split(" ")[0] || "Guest"}
      />
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-[#0a0f0a] via-[#120a08] to-[#1a0f0a] overflow-hidden"
    >
      <AnimatedPetals count={16} color="gold" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.12),transparent_55%)] pointer-events-none" />

      <div className="absolute top-8 left-8 opacity-60 hidden md:block">
        <KeralaLamp />
      </div>
      <div className="absolute top-8 right-8 opacity-60 hidden md:block scale-x-[-1]">
        <KeralaLamp />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-14 rsvp-reveal"
        >
          <p className="text-kerala-gold/70 tracking-[0.4em] uppercase text-xs mb-4">
            Royal Kerala Celebration
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-kerala-ivory mb-4">
            RSVP With <span className="text-kerala-gold italic">Love</span>
          </h1>
          <p className="text-kerala-ivory/50 text-lg max-w-md mx-auto">
            Kindly respond by sharing your presence — a cinematic moment in our
            wedding story.
          </p>
        </motion.div>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-8 p-6 md:p-10 rounded-3xl border border-kerala-gold/15 bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_64px_rgba(0,0,0,0.4)] rsvp-reveal"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <GlowInput
              label="Guest Name"
              icon={User}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Your full name"
              error={errors.name}
            />
            <GlowInput
              label="Phone Number"
              icon={Phone}
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              placeholder="+91 98765 43210"
              error={errors.phone}
            />
          </div>

          <GlowInput
            label="Email Address"
            icon={Mail}
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@email.com"
            error={errors.email}
          />

          <div className="rsvp-reveal">
            <label className="block text-kerala-gold/70 text-xs tracking-[0.2em] uppercase mb-3">
              Number of Guests
            </label>
            <div className="flex items-center gap-4">
              <Users className="w-4 h-4 text-kerala-gold/50" />
              <input
                type="range"
                min={1}
                max={10}
                value={form.guestCount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, guestCount: Number(e.target.value) }))
                }
                className="flex-1 accent-kerala-gold h-2"
              />
              <span className="text-kerala-gold font-serif text-2xl w-8 text-center">
                {form.guestCount}
              </span>
            </div>
          </div>

          <div className="rsvp-reveal">
            <label className="block text-kerala-gold/70 text-xs tracking-[0.2em] uppercase mb-3">
              Attending Status
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: "attending" as const,
                  label: "Happily Attending",
                  icon: Heart,
                  active:
                    "border-kerala-gold bg-kerala-gold/10 shadow-[0_0_30px_rgba(212,175,55,0.2)]",
                },
                {
                  id: "declining" as const,
                  label: "Regretfully Declining",
                  icon: HeartOff,
                  active: "border-kerala-temple-red/50 bg-kerala-temple-red/10",
                },
              ].map(({ id, label, icon: Icon, active }) => (
                <motion.button
                  key={id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setForm((f) => ({ ...f, attendanceStatus: id }))
                  }
                  className={cn(
                    "flex items-center gap-3 p-5 rounded-xl border transition-all duration-300",
                    form.attendanceStatus === id
                      ? active
                      : "border-white/10 bg-white/5 hover:border-kerala-gold/30",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      form.attendanceStatus === id
                        ? "text-kerala-gold"
                        : "text-kerala-ivory/40",
                    )}
                  />
                  <span className="text-kerala-ivory text-sm font-medium">
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>
            {errors.attendanceStatus && (
              <p className="text-rose-400/90 text-xs mt-2">
                {errors.attendanceStatus}
              </p>
            )}
          </div>

          <AnimatePresence>
            {form.attendanceStatus === "attending" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-8 overflow-hidden"
              >
                <div className="rsvp-reveal">
                  <label className="block text-kerala-gold/70 text-xs tracking-[0.2em] uppercase mb-3">
                    Event Selection
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {EVENTS.map((ev) => (
                      <motion.button
                        key={ev.id}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleEvent(ev.id)}
                        className={cn(
                          "px-5 py-2.5 rounded-full text-sm border transition-all",
                          form.events.includes(ev.id)
                            ? "bg-kerala-gold/20 border-kerala-gold text-kerala-gold"
                            : "border-white/15 text-kerala-ivory/60 hover:border-kerala-gold/40",
                        )}
                      >
                        {ev.label}
                      </motion.button>
                    ))}
                  </div>
                  {errors.events && (
                    <p className="text-rose-400/90 text-xs mt-2">
                      {errors.events}
                    </p>
                  )}
                </div>

                <div className="rsvp-reveal">
                  <label className="block text-kerala-gold/70 text-xs tracking-[0.2em] uppercase mb-3">
                    Meal Preference
                  </label>
                  <div className="flex gap-4">
                    {(["veg", "non-veg"] as const).map((meal) => (
                      <button
                        key={meal}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({ ...f, mealPreference: meal }))
                        }
                        className={cn(
                          "flex-1 py-3 rounded-xl border text-sm capitalize transition-all",
                          form.mealPreference === meal
                            ? "border-kerala-gold bg-kerala-gold/15 text-kerala-gold"
                            : "border-white/10 text-kerala-ivory/50",
                        )}
                      >
                        {meal === "non-veg" ? "Non-Veg" : "Veg"}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="rsvp-reveal">
            <label className="block text-kerala-gold/70 text-xs tracking-[0.2em] uppercase mb-2">
              Special Message / Wishes
            </label>
            <textarea
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              rows={3}
              placeholder="Share your blessings..."
              className="w-full px-4 py-4 rounded-xl bg-white/5 backdrop-blur-md border border-kerala-gold/20 text-kerala-ivory placeholder:text-kerala-ivory/30 focus:outline-none focus:border-kerala-gold/60 focus:shadow-[0_0_24px_rgba(212,175,55,0.2)] resize-none transition-all"
            />
          </div>

          {errors.submit && (
            <p className="text-rose-400 text-center text-sm">{errors.submit}</p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            onClick={handleRipple}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full py-5 rounded-2xl overflow-hidden font-semibold tracking-[0.15em] uppercase text-sm text-kerala-dark disabled:opacity-60"
            style={{
              background:
                "linear-gradient(135deg, #d4af37 0%, #f5e6a8 50%, #c9a227 100%)",
              boxShadow:
                "0 0 40px rgba(212, 175, 55, 0.45), 0 4px 24px rgba(0,0,0,0.3)",
            }}
          >
            <motion.span
              animate={{
                boxShadow: [
                  "0 0 20px rgba(212,175,55,0.4)",
                  "0 0 40px rgba(212,175,55,0.7)",
                  "0 0 20px rgba(212,175,55,0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl pointer-events-none"
            />
            {ripple && (
              <span
                className="absolute rounded-full bg-white/40 animate-ping"
                style={{
                  left: ripple.x - 20,
                  top: ripple.y - 20,
                  width: 40,
                  height: 40,
                }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending Your Love…
                </>
              ) : (
                "Submit RSVP"
              )}
            </span>
          </motion.button>

          <div className="flex flex-wrap justify-center gap-4 pt-2 rsvp-reveal">
            <a
              href={buildWhatsAppRsvpUrl(form)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-emerald-400/90 hover:text-emerald-300 transition"
            >
              <MessageCircle className="w-4 h-4" />
              RSVP via WhatsApp
            </a>
            <Link
              href="/rsvp/qr"
              className="inline-flex items-center gap-2 text-sm text-kerala-gold/70 hover:text-kerala-gold transition"
            >
              <QrCode className="w-4 h-4" />
              QR Code Access
            </Link>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
