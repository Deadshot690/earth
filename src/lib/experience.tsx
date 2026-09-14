import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { byId, type MediaItem } from "@/content/content";

type Stage = "intro" | "profile" | "app";

interface Progress {
  [id: string]: { time: number; duration: number; updated: number };
}

interface ExperienceValue {
  stage: Stage;
  setStage: (s: Stage) => void;
  restart: () => void;

  myList: string[];
  toggleMyList: (id: string) => void;
  inMyList: (id: string) => boolean;

  progress: Progress;
  saveProgress: (id: string, time: number, duration: number) => void;
  continueWatching: MediaItem[];

  playingId: string | null;
  play: (id: string) => void;
  closePlayer: () => void;

  detailId: string | null;
  openDetail: (id: string) => void;
  closeDetail: () => void;

  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;

  noteOpen: boolean;
  setNoteOpen: (v: boolean) => void;

  creditsOpen: boolean;
  setCreditsOpen: (v: boolean) => void;

  muted: boolean;
  toggleMuted: () => void;
}

const Ctx = createContext<ExperienceValue | null>(null);

const LS = {
  list: "Anne.mylist",
  progress: "Anne.progress",
};

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — the app keeps working in memory */
  }
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [stage, setStageState] = useState<Stage>("intro");
  const [myList, setMyList] = useState<string[]>([]);
  const [progress, setProgress] = useState<Progress>({});
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMyList(readLS<string[]>(LS.list, []));
    setProgress(readLS<Progress>(LS.progress, {}));
    try {
      if (sessionStorage.getItem("Anne.entered") === "1") setStageState("app");
    } catch {
      /* ignore */
    }
  }, []);

  const setStage = useCallback((s: Stage) => {
    setStageState(s);
    try {
      if (s === "app") sessionStorage.setItem("Anne.entered", "1");
      else sessionStorage.removeItem("Anne.entered");
    } catch {
      /* ignore */
    }
  }, []);

  const restart = useCallback(() => {
    setCreditsOpen(false);
    setNoteOpen(false);
    setPlayingId(null);
    setDetailId(null);
    setStage("intro");
  }, [setStage]);

  const toggleMyList = useCallback((id: string) => {
    setMyList((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeLS(LS.list, next);
      return next;
    });
  }, []);

  const saveProgress = useCallback((id: string, time: number, duration: number) => {
    if (!duration) return;
    setProgress((prev) => {
      const next = { ...prev, [id]: { time, duration, updated: Date.now() } };
      writeLS(LS.progress, next);
      return next;
    });
  }, []);

  const continueWatching = useMemo(
    () =>
      Object.entries(progress)
        .filter(([, p]) => p.time > 2 && p.time / p.duration < 0.95)
        .sort((a, b) => b[1].updated - a[1].updated)
        .map(([id]) => byId(id))
        .filter((x): x is MediaItem => Boolean(x)),
    [progress],
  );

  const value: ExperienceValue = {
    stage,
    setStage,
    restart,
    myList,
    toggleMyList,
    inMyList: (id) => myList.includes(id),
    progress,
    saveProgress,
    continueWatching,
    playingId,
    play: (id) => {
      setDetailId(null);
      setPlayingId(id);
    },
    closePlayer: () => setPlayingId(null),
    detailId,
    openDetail: setDetailId,
    closeDetail: () => setDetailId(null),
    searchOpen,
    setSearchOpen,
    noteOpen,
    setNoteOpen,
    creditsOpen,
    setCreditsOpen,
    muted,
    toggleMuted: () => setMuted((m) => !m),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useExperience() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useExperience must be used inside ExperienceProvider");
  return ctx;
}
