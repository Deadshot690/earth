import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { brand, img } from "@/content/content";
import { Wordmark } from "@/components/Wordmark";

export function IntroSequence({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => setPhase(2), 2400),
      setTimeout(() => setPhase(3), 5200),
      setTimeout(onDone, 7200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <motion.div
      className="grain fixed inset-0 z-90 overflow-hidden bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.img
        src={img.intro}
        alt=""
        aria-hidden
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: phase >= 1 ? (phase >= 3 ? 0.18 : 0.48) : 0, scale: 1.06 }}
        transition={{ opacity: { duration: 2 }, scale: { duration: 8, ease: "easeOut" } }}
        className="absolute inset-0 h-full w-full scale-105 object-cover object-center blur-2xl"
      />
      <motion.img
        src={img.intro}
        alt=""
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? (phase >= 3 ? 0.32 : 0.92) : 0 }}
        transition={{ opacity: { duration: 2 } }}
        className="absolute inset-0 h-full w-full object-contain object-center"
      />
      <div className="absolute inset-0 bg-background/55" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.6em", filter: "blur(10px)" }}
          animate={
            phase >= 2
              ? { opacity: phase >= 3 ? 0 : 1, letterSpacing: "0.18em", filter: "blur(0px)" }
              : {}
          }
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Wordmark size="xl" stacked className="items-center" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: phase >= 3 ? 0 : 1 } : {}}
            transition={{ delay: 1, duration: 1.2 }}
            className="mt-6 text-[0.65rem] tracking-[0.6em] text-subtle sm:text-xs"
          >
            {brand.tagline}
          </motion.p>
        </motion.div>
      </div>

      <button
        onClick={onDone}
        className="absolute right-5 bottom-6 rounded border border-border bg-card/50 px-4 py-2 text-xs tracking-[0.25em] text-muted-foreground backdrop-blur-sm transition hover:text-foreground sm:right-8 sm:bottom-8"
      >
        SKIP INTRO
      </button>
    </motion.div>
  );
}
