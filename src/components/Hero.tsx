import { motion } from "framer-motion";
import { Info, Play } from "lucide-react";
import { hero } from "@/content/content";
import { useExperience } from "@/lib/experience";

export function Hero() {
  const { play, openDetail } = useExperience();

  return (
    <section className="grain relative min-h-[88svh] w-full overflow-hidden bg-background sm:min-h-[94svh]">
      <div className="absolute inset-0 bg-background">
        {hero.video ? (
          <>
            <img
              src={hero.image}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full scale-110 object-cover object-center blur-3xl opacity-40"
            />
            <video
              src={hero.video}
              poster={hero.image}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-20 blur-sm"
            />
            <div className="absolute inset-y-8 right-4 z-0 flex w-[calc(100%-2rem)] items-center justify-center overflow-hidden rounded-2xl border border-foreground/10 bg-background/35 shadow-2xl sm:inset-y-10 sm:right-8 sm:w-[53%] lg:right-12 lg:w-[47%]">
              <video
                src={hero.video}
                poster={hero.image}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-contain opacity-95"
              />
            </div>
          </>
        ) : (
          <img
            src={hero.image}
            alt=""
            aria-hidden
            className="ken-burns h-full w-full object-cover object-top"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10 sm:bg-gradient-to-r sm:from-background sm:via-background/82 sm:to-background/10" />
        <div className="hero-fade absolute inset-0 opacity-80" />
      </div>

      <div className="relative z-10 flex min-h-[88svh] flex-col justify-end px-4 pb-12 sm:min-h-[94svh] sm:max-w-[58%] sm:justify-center sm:px-10 sm:pt-16 sm:pb-10 lg:max-w-[56%]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-[0.65rem] tracking-[0.5em] text-primary sm:text-xs">{hero.label}</p>
          <p className="mt-3 text-[0.65rem] tracking-[0.4em] text-subtle sm:text-xs">
            {hero.kicker}
          </p>
          <h1 className="mt-3 font-title text-4xl leading-[0.95] tracking-[0.06em] sm:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-4 text-xs tracking-[0.25em] text-subtle uppercase">{hero.meta}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {hero.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => play(hero.playId)}
              className="flex items-center gap-2 rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary-glow sm:text-base"
            >
              <Play className="h-4 w-4 fill-current" /> Play
            </button>
            <button
              onClick={() => openDetail(hero.playId)}
              className="flex items-center gap-2 rounded border border-border bg-card/70 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:border-primary sm:text-base"
            >
              <Info className="h-4 w-4" /> More Info
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
