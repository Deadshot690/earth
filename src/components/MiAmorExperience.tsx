import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { miAmorNote, brand } from "@/content/content";
import { useExperience } from "@/lib/experience";

export function MiAmorExperience() {
  const { setNoteOpen, setCreditsOpen } = useExperience();
  const [step, setStep] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (step >= miAmorNote.lines.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 900 : 2400);
    return () => clearTimeout(t);
  }, [step]);

  const revealed = step >= miAmorNote.lines.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="grain fixed inset-0 z-80 overflow-y-auto bg-background"
    >
      <button
        onClick={() => setNoteOpen(false)}
        aria-label="Close"
        className="fixed top-4 right-4 z-10 rounded-full border border-border bg-card/70 p-2 backdrop-blur transition hover:border-primary"
      >
        <X className="h-5 w-5" />
      </button>

      {!revealed ? (
        <div className="flex min-h-svh items-center justify-center px-6 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
              transition={{ duration: 1 }}
              className="max-w-2xl font-display text-2xl leading-relaxed sm:text-4xl"
            >
              {miAmorNote.lines[Math.min(step, miAmorNote.lines.length - 1)]}
            </motion.p>
          </AnimatePresence>
          <button
            onClick={() => setStep(miAmorNote.lines.length)}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.4em] text-subtle uppercase transition hover:text-foreground"
          >
            Skip
          </button>
        </div>
      ) : (
        <div className="relative mx-auto w-[min(46rem,92vw)] py-16 text-center sm:py-24">
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: [0, 0.7, 0], y: -160 }}
              transition={{
                duration: 7 + (i % 5),
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{ left: `${(i * 7.3) % 96}%` }}
              className="pointer-events-none absolute bottom-0 text-primary"
              aria-hidden
            >
              <Heart className="h-4 w-4 fill-current" />
            </motion.span>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[0.65rem] tracking-[0.5em] text-primary uppercase">
              {brand.name} {brand.sub} presents
            </p>
            <h1 className="mt-5 font-title text-4xl leading-[0.95] tracking-[0.06em] text-primary sm:text-7xl">
              {miAmorNote.title}
            </h1>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            src={miAmorNote.photo}
            alt={brand.personName}
            className="mx-auto mt-10 h-52 w-52 rounded-full border-2 border-primary/60 object-cover shadow-[var(--shadow-glow)] sm:h-64 sm:w-64"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mx-auto mt-10 max-w-xl px-4 text-left"
          >
            {miAmorNote.message.split("\n\n").map((para, i) => (
              <p key={i} className="mb-4 leading-relaxed whitespace-pre-line text-muted-foreground">
                {para}
              </p>
            ))}
            <p className="mt-6 text-right font-display text-lg text-rose">{miAmorNote.signature}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={() => {
                setNoteOpen(false);
                setCreditsOpen(true);
              }}
              className="rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow"
            >
              Roll The Credits
            </button>
            <button
              onClick={() => setNoteOpen(false)}
              className="rounded border border-border px-6 py-3 text-sm font-semibold transition hover:border-primary"
            >
              Back To Browsing
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
