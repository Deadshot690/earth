import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, X } from "lucide-react";
import { brand, credits } from "@/content/content";
import { useExperience } from "@/lib/experience";
import { Wordmark } from "@/components/Wordmark";

export function CreditsSequence() {
  const { setCreditsOpen, restart, setNoteOpen } = useExperience();
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setEnded(true), 26000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="grain fixed inset-0 z-80 overflow-hidden bg-background"
    >
      <button
        onClick={() => setCreditsOpen(false)}
        aria-label="Close credits"
        className="absolute top-4 right-4 z-20 rounded-full border border-border bg-card/70 p-2 backdrop-blur"
      >
        <X className="h-5 w-5" />
      </button>

      {!ended ? (
        <>
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "-115%" }}
            transition={{ duration: 26, ease: "linear" }}
            className="absolute inset-x-0 flex flex-col items-center gap-10 px-6 text-center"
          >
            <Wordmark size="lg" stacked className="items-center" />
            <p className="text-[0.65rem] tracking-[0.5em] text-subtle uppercase">
              {brand.universe}
            </p>
            <div className="mt-6 space-y-8">
              {credits.map((c) => (
                <div key={`${c.role}-${c.name}`}>
                  <p className="text-[0.6rem] tracking-[0.45em] text-subtle uppercase">{c.role}</p>
                  <p className="mt-2 font-display text-2xl sm:text-3xl">{c.name}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 font-display text-xl text-rose">
              And most of all — for {brand.personName}.
            </p>
          </motion.div>
          <button
            onClick={() => setEnded(true)}
            className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-xs tracking-[0.4em] text-subtle uppercase transition hover:text-foreground"
          >
            Skip Credits
          </button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          className="flex h-full flex-col items-center justify-center gap-8 px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.8em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-title text-3xl text-primary sm:text-6xl"
          >
            THE END
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.6 }}
            className="max-w-md font-display text-lg text-muted-foreground sm:text-2xl"
          >
            …but not really. Season two starts tomorrow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 1.2 }}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={restart}
              className="flex items-center gap-2 rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow"
            >
              <RotateCcw className="h-4 w-4" /> Watch Again
            </button>
            <button
              onClick={() => {
                setCreditsOpen(false);
                setNoteOpen(true);
              }}
              className="rounded border border-border px-6 py-3 text-sm font-semibold transition hover:border-primary"
            >
              Read The Note Again
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
