import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { memories, memorySections } from "@/content/content";

export function MemoriesGallery() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => ((i ?? 0) + 1) % memories.length);
      if (e.key === "ArrowLeft") setIndex((i) => ((i ?? 0) - 1 + memories.length) % memories.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = index !== null ? memories[index] : null;

  return (
    <>
      <div className="space-y-14 px-4 sm:px-10">
        {memorySections.map((section) => (
          <section key={section.key}>
            <div className="mb-5 max-w-2xl">
              <p className="text-[0.6rem] tracking-[0.35em] text-primary uppercase">{section.eyebrow}</p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl">{section.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{section.description}</p>
            </div>
            <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
              {section.items.map((m, i) => {
                const memoryIndex = memories.findIndex((memory) => memory.id === m.id);
                return (
                  <motion.button
                    key={m.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: Math.min(i * 0.04, 0.35) }}
                    onClick={() => setIndex(memoryIndex)}
                    className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-lg border border-border/60 text-left sm:mb-4"
                  >
                    <div className="relative">
                      <img
                        src={m.image}
                        alt={m.title}
                        loading="lazy"
                        className="w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <p className="text-[0.6rem] tracking-[0.3em] text-primary uppercase">{m.date}</p>
                        <p className="mt-1 font-display text-base">{m.title}</p>
                        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground opacity-0 transition duration-300 group-hover:opacity-100">
                          {m.caption}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-70 flex items-center justify-center bg-background/95 p-4 backdrop-blur-xl"
            onClick={() => setIndex(null)}
          >
            <button
              onClick={() => setIndex(null)}
              aria-label="Close"
              className="absolute top-4 right-4 rounded-full border border-border p-2"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => ((i ?? 0) - 1 + memories.length) % memories.length);
              }}
              className="absolute left-2 rounded-full border border-border bg-card/70 p-2 sm:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => ((i ?? 0) + 1) % memories.length);
              }}
              className="absolute right-2 rounded-full border border-border bg-card/70 p-2 sm:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.figure
              key={active.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl text-center"
            >
              <img
                src={active.image}
                alt={active.title}
                className="max-h-[70svh] w-full rounded-lg object-contain"
              />
              <figcaption className="mt-5">
                <p className="text-[0.65rem] tracking-[0.4em] text-primary uppercase">
                  {active.date}
                </p>
                <p className="mt-2 font-display text-2xl">{active.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{active.caption}</p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
