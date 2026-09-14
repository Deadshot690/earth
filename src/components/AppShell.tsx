import type { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { byId, brand } from "@/content/content";
import { useExperience } from "@/lib/experience";
import { IntroSequence } from "@/components/IntroSequence";
import { ProfileSelector } from "@/components/ProfileSelector";
import { Navbar } from "@/components/Navbar";
import { DetailModal } from "@/components/DetailModal";
import { SearchOverlay } from "@/components/SearchOverlay";
import { VideoPlayer } from "@/components/VideoPlayer";
import { MiAmorExperience } from "@/components/MiAmorExperience";
import { CreditsSequence } from "@/components/CreditsSequence";
import { AmbientAudio } from "@/components/AmbientAudio";
import { Wordmark } from "@/components/Wordmark";

export function AppShell({ children }: { children: ReactNode }) {
  const {
    stage,
    setStage,
    playingId,
    detailId,
    searchOpen,
    noteOpen,
    creditsOpen,
    setCreditsOpen,
  } = useExperience();

  const playing = playingId ? byId(playingId) : null;

  return (
    <div className="min-h-svh bg-background">
      <AmbientAudio />
      <AnimatePresence mode="wait">
        {stage === "intro" && <IntroSequence key="intro" onDone={() => setStage("profile")} />}
        {stage === "profile" && (
          <ProfileSelector key="profile" onSelect={() => setStage("app")} />
        )}
      </AnimatePresence>

      <Navbar />
      <main>{children}</main>

      <footer className="border-t border-border/60 px-4 py-12 sm:px-10">
        <Wordmark size="sm" />
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          {brand.universe} — made entirely out of memories, for {brand.personName}.
        </p>
        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-subtle">
          <Link to="/" className="transition hover:text-foreground">
            Home
          </Link>
          <Link to="/movies" className="transition hover:text-foreground">
            Movies
          </Link>
          <Link to="/series" className="transition hover:text-foreground">
            Series
          </Link>
          <Link to="/memories" className="transition hover:text-foreground">
            Memories
          </Link>
          <Link to="/my-list" className="transition hover:text-foreground">
            My List
          </Link>
          <button onClick={() => setCreditsOpen(true)} className="transition hover:text-foreground">
            Credits
          </button>
        </nav>
        <p className="mt-8 text-xs text-subtle">
          © {brand.year} {brand.name} {brand.sub}. No rights reserved, only feelings.
        </p>
      </footer>

      <AnimatePresence>{searchOpen && <SearchOverlay key="search" />}</AnimatePresence>
      <AnimatePresence>{detailId && <DetailModal key={detailId} id={detailId} />}</AnimatePresence>
      <AnimatePresence>
        {playing && <VideoPlayer key={playing.id} item={playing} />}
      </AnimatePresence>
      <AnimatePresence>{noteOpen && <MiAmorExperience key="mi-amor-note" />}</AnimatePresence>
      <AnimatePresence>{creditsOpen && <CreditsSequence key="credits" />}</AnimatePresence>
    </div>
  );
}
