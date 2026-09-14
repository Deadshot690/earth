import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ListVideo,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Settings,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { brand, episodes, type MediaItem } from "@/content/content";
import { useExperience } from "@/lib/experience";
import { Wordmark } from "@/components/Wordmark";

function fmt(s: number) {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function VideoPlayer({ item }: { item: MediaItem }) {
  const { closePlayer, saveProgress, progress, play, setCreditsOpen } = useExperience();
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const isReel = !item.video;
  const stills = item.reel?.length ? item.reel : [item.backdrop];

  const start = Math.min(progress[item.id]?.time ?? 0, item.duration - 1);
  const [current, setCurrent] = useState(Math.max(start, 0));
  const [duration, setDuration] = useState(item.duration || 1);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [fullscreen, setFullscreen] = useState(false);
  const [controls, setControls] = useState(true);
  const [failed, setFailed] = useState(false);
  const [titleCard, setTitleCard] = useState(true);
  const [nextPrompt, setNextPrompt] = useState(false);
  const [episodeRailOpen, setEpisodeRailOpen] = useState(false);

  const nextEpisode =
    item.type === "episode" ? episodes.find((e) => (e.episode ?? 0) === (item.episode ?? 0) + 1) : undefined;

  // Title card
  useEffect(() => {
    const t = setTimeout(() => setTitleCard(false), 2600);
    return () => clearTimeout(t);
  }, [item.id]);

  // Virtual clock for reel playback
  useEffect(() => {
    if (!isReel || !playing || titleCard) return;
    const id = setInterval(() => {
      setCurrent((c) => Math.min(c + 0.25, duration));
    }, 250);
    return () => clearInterval(id);
  }, [isReel, playing, duration, titleCard]);

  // Persist progress
  useEffect(() => {
    const id = setInterval(() => saveProgress(item.id, current, duration), 1500);
    return () => clearInterval(id);
  }, [item.id, current, duration, saveProgress]);

  useEffect(() => {
    if (duration && current / duration > 0.9) setNextPrompt(true);
  }, [current, duration]);

  const finish = useCallback(() => {
    saveProgress(item.id, duration, duration);
    if (item.type === "episode" && nextEpisode) {
      setPlaying(false);
      setNextPrompt(true);
      return;
    }
    if (item.type === "episode") {
      closePlayer();
      setCreditsOpen(true);
    } else {
      closePlayer();
    }
  }, [
    closePlayer,
    duration,
    item.id,
    item.type,
    nextEpisode,
    saveProgress,
    setCreditsOpen,
  ]);

  useEffect(() => {
    if (current >= duration && duration > 0 && !(item.type === "episode" && nextEpisode)) finish();
  }, [current, duration, finish, item.type, nextEpisode]);

  // Controls auto-hide
  useEffect(() => {
    if (!controls) return;
    const t = setTimeout(() => setControls(false), 3200);
    return () => clearTimeout(t);
  }, [controls, current]);

  // Video element sync
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    v.volume = volume;
    if (playing) {
      void v.play().catch(() => {
        // Fallback to muted autoplay if browser blocks unmuted autoplay
        v.muted = true;
        setMuted(true);
        void v.play().catch(() => setPlaying(false));
      });
    } else {
      v.pause();
    }
  }, [playing, muted, volume]);

  const seek = (t: number) => {
    setCurrent(t);
    setNextPrompt(false);
    if (videoRef.current) videoRef.current.currentTime = t;
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await shellRef.current?.requestFullscreen();
        setFullscreen(true);
      } else {
        await document.exitFullscreen();
        setFullscreen(false);
      }
    } catch {
      /* fullscreen unavailable */
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePlayer();
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
      if (e.key === "ArrowRight") seek(Math.min(current + 10, duration));
      if (e.key === "ArrowLeft") seek(Math.max(current - 10, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const pct = duration ? (current / duration) * 100 : 0;
  const stillIndex = Math.min(stills.length - 1, Math.floor((current / Math.max(duration, 1)) * stills.length));

  return (
    <motion.div
      ref={shellRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-70 bg-background"
      onMouseMove={() => setControls(true)}
      onTouchStart={() => setControls(true)}
    >
      {/* Stage */}
      <div className="absolute inset-0 grain overflow-hidden">
        {failed ? (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <p className="font-display text-lg text-muted-foreground">
              This memory is temporarily unavailable.
            </p>
          </div>
        ) : item.video ? (
          <video
            ref={videoRef}
            src={item.video}
            poster={item.backdrop}
            playsInline
            className="h-full w-full object-contain"
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || item.duration)}
            onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
            onEnded={finish}
            onError={() => setFailed(true)}
          />
        ) : (
          <AnimatePresence mode="sync">
            <div key={stills[stillIndex]} className="absolute inset-0 flex items-center justify-center bg-black">
              <img
                src={stills[stillIndex]}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-40 scale-105"
              />
              <motion.img
                src={stills[stillIndex]}
                alt={item.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="relative z-10 h-full w-full object-contain"
                onError={() => setFailed(true)}
              />
            </div>
          </AnimatePresence>
        )}
        <div className="pointer-events-none absolute inset-0 bg-background/25" />
      </div>

      {/* Title card overlay */}
      <AnimatePresence>
        {titleCard && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-background"
          >
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <Wordmark size="md" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="text-center"
            >
              {item.type === "episode" && (
                <p className="text-xs tracking-[0.5em] text-subtle">
                  S{String(item.season).padStart(2, "0")} E{String(item.episode).padStart(2, "0")}
                </p>
              )}
              <h2 className="mt-3 font-display text-2xl sm:text-4xl">{item.title}</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next episode prompt */}
      <AnimatePresence>
        {nextPrompt && nextEpisode && !titleCard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute right-4 bottom-28 z-20 w-[min(22rem,85vw)] rounded-lg border border-border bg-card/90 p-4 backdrop-blur-md"
          >
            <p className="text-xs tracking-[0.3em] text-subtle">NEXT EPISODE</p>
            <div className="mt-3 flex gap-3">
              <img
                src={nextEpisode.image}
                alt=""
                loading="lazy"
                className="h-14 w-24 rounded object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{nextEpisode.title}</p>
                <p className="text-xs text-muted-foreground">{nextEpisode.durationLabel}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => play(nextEpisode.id)}
                className="rounded bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow"
              >
                Play Next
              </button>
              <button
                onClick={() => setNextPrompt(false)}
                className="rounded border border-border px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Episode browser */}
      {item.type === "episode" && !titleCard && (
        <aside
          className={`absolute top-20 right-4 bottom-24 z-[40] flex w-[min(21rem,calc(100vw_-_2rem))] flex-col overflow-hidden rounded-xl border border-border/70 bg-background/90 shadow-2xl backdrop-blur-xl ${
            episodeRailOpen ? "flex" : "hidden sm:flex"
          }`}
          aria-label="Season 1 episodes"
        >
          <div className="border-b border-border/70 px-4 py-3">
            <p className="text-[0.6rem] tracking-[0.35em] text-primary uppercase">The Vaidehi Story</p>
            <div className="mt-1 flex items-baseline justify-between gap-3">
              <h2 className="font-display text-lg">Season 1</h2>
              <span className="text-xs text-muted-foreground">{episodes.length} chapters</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Six moving pieces from close-up magic to every unexpected side of Vaidehi's Earth.
            </p>
          </div>

          <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto p-2">
            {episodes.map((episode) => {
              const episodeProgress = progress[episode.id];
              const episodePct =
                episodeProgress && episodeProgress.duration
                  ? Math.min(100, (episodeProgress.time / episodeProgress.duration) * 100)
                  : 0;
              const selected = episode.id === item.id;

              return (
                <button
                  key={episode.id}
                  onClick={() => {
                    if (!selected) play(episode.id);
                    setEpisodeRailOpen(false);
                  }}
                  className={`group flex w-full gap-3 rounded-lg p-2 text-left transition ${
                    selected
                      ? "bg-primary/15 ring-1 ring-primary/60"
                      : "hover:bg-foreground/10"
                  }`}
                  aria-current={selected ? "true" : undefined}
                >
                  <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-md bg-muted">
                    <img
                      src={episode.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-background/35">
                      {selected ? (
                        <span className="h-2 w-2 rounded-full bg-primary shadow-[var(--shadow-glow)]" />
                      ) : (
                        <Play className="h-4 w-4 fill-current opacity-0 transition group-hover:opacity-100" />
                      )}
                    </div>
                    {episodePct > 1 && (
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-muted">
                        <div className="h-full bg-primary" style={{ width: `${episodePct}%` }} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 py-0.5">
                    <p className="text-[0.6rem] tracking-[0.25em] text-subtle uppercase">
                      E{String(episode.episode).padStart(2, "0")}
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold">{episode.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {episode.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      )}

      {/* Controls */}
      <AnimatePresence>
        {controls && !titleCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-30 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between bg-gradient-to-b from-background/90 to-transparent p-4 sm:p-6">
              <button
                onClick={closePlayer}
                aria-label="Close player"
                className="flex items-center gap-2 text-muted-foreground transition hover:text-foreground"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="hidden text-sm sm:inline">Back to {brand.name}</span>
              </button>
              <div className="flex items-center gap-4">
                {item.type === "episode" && (
                  <button
                    onClick={() => setEpisodeRailOpen((open) => !open)}
                    aria-label={episodeRailOpen ? "Hide episodes" : "Show episodes"}
                    className="flex items-center gap-2 text-muted-foreground transition hover:text-foreground sm:hidden"
                  >
                    <ListVideo className="h-5 w-5" />
                    <span className="text-xs">Episodes</span>
                  </button>
                )}
                <button onClick={closePlayer} aria-label="Close" className="text-muted-foreground hover:text-foreground">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="space-y-3 bg-gradient-to-t from-background via-background/70 to-transparent px-4 pt-16 pb-5 sm:px-8 sm:pb-7">
              <div>
                <p className="font-display text-lg sm:text-2xl">{item.title}</p>
                {item.type === "episode" && (
                  <p className="text-xs tracking-[0.3em] text-subtle">
                    S{String(item.season).padStart(2, "0")} E{String(item.episode).padStart(2, "0")}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="w-10 shrink-0 text-xs text-muted-foreground tabular-nums">{fmt(current)}</span>
                <div className="relative h-6 flex-1">
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    step={0.5}
                    value={current}
                    aria-label="Seek"
                    onChange={(e) => seek(Number(e.target.value))}
                    className="absolute inset-0 h-6 w-full cursor-pointer opacity-0"
                  />
                  <div className="pointer-events-none absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                    <div
                      className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-primary glow-primary"
                      style={{ left: `calc(${pct}% - 7px)` }}
                    />
                  </div>
                </div>
                <span className="w-10 shrink-0 text-xs text-muted-foreground tabular-nums">{fmt(duration)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-5">
                  <button
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? "Pause" : "Play"}
                    className="grid h-11 w-11 place-items-center rounded-full bg-foreground/10 transition hover:bg-foreground/20"
                  >
                    {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => seek(Math.max(current - 10, 0))}
                    aria-label="Skip back 10 seconds"
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => seek(Math.min(current + 10, duration))}
                    aria-label="Skip forward 10 seconds"
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    <RotateCw className="h-5 w-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMuted((m) => !m)}
                      aria-label={muted ? "Unmute" : "Mute"}
                      className="text-muted-foreground transition hover:text-foreground"
                    >
                      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={muted ? 0 : volume}
                      aria-label="Volume"
                      onChange={(e) => {
                        setVolume(Number(e.target.value));
                        setMuted(Number(e.target.value) === 0);
                      }}
                      className="hidden h-1 w-24 accent-[oklch(0.53_0.22_25.5)] sm:block"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-5">
                  <button aria-label="Settings" className="text-muted-foreground transition hover:text-foreground">
                    <Settings className="h-5 w-5" />
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    aria-label="Fullscreen"
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    {fullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
