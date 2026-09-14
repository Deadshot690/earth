import { useState } from "react";
import { motion } from "framer-motion";
import { brand, img } from "@/content/content";
import { Wordmark } from "@/components/Wordmark";

const profiles = [
  { id: "Vaidehi", name: brand.personName, image: img.profile },
  { id: "main", name: "The Main Character", image: img.mainCharacter },
];

export function ProfileSelector({ onSelect }: { onSelect: () => void }) {
  const [chosen, setChosen] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="grain fixed inset-0 z-80 flex flex-col items-center justify-center bg-background px-6"
    >
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10">
        <Wordmark size="sm" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-display text-3xl sm:text-5xl"
      >
        Who's watching?
      </motion.h1>

      <div className="mt-10 flex w-full max-w-3xl flex-wrap items-start justify-center gap-6 sm:mt-14 sm:gap-10">
        {profiles.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: chosen && chosen !== p.id ? 0.15 : 1,
              y: 0,
              scale: chosen === p.id ? 1.12 : 1,
            }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
            onClick={() => {
              setChosen(p.id);
              setTimeout(onSelect, 750);
            }}
            className="group w-24 focus-visible:outline-none sm:w-36"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-transparent transition duration-300 group-hover:border-primary group-focus-visible:border-primary">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/20 transition group-hover:bg-transparent" />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground transition group-hover:text-foreground sm:text-sm">
              {p.name}
            </p>
          </motion.button>
        ))}
      </div>

      <p className="mt-12 text-[0.65rem] tracking-[0.4em] text-subtle">{brand.universe.toUpperCase()}</p>
    </motion.div>
  );
}
